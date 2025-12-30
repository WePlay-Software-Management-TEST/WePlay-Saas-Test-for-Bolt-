import { type Group, type MatchDetails, type TournamentScheduleForm, type weekDaysTypes, type MatchDateSlot, type FieldFormType, type TournamentFormType } from 'features/tournament/models/tournamentForm.model';
import { combineDateAndTime, compareArrays, formatTime, sortTeamsListDependingOnOgTeamsList, splitArrayIntoChunks } from './utils';
import { type TeamsOptions, type Option } from 'core/models/input.model';
import { MapDaysToIndex } from 'features/tournament/models/tournamentForm.model';
import { v4 as uuidv4 } from 'uuid';
import { alphabetArray } from 'core/context/global.const';

function getMatchesPerDay (matchesPerDay: '1_MATCH' | '2_MATCHES' | '3_MATCHES' | '4_MATCHES' | '5_MATCHES' | 'AUTO' | null): number {
  switch (matchesPerDay) {
    case '1_MATCH':
      return 1;
    case '2_MATCHES':
      return 2;
    case '3_MATCHES':
      return 3;
    case '4_MATCHES':
      return 4;
    case '5_MATCHES':
      return 5;
    case 'AUTO':
      return 12;
    default:
      return 1;
  }
}

function getAllDaysBetweenTwoDate (startDate: Date, endDate: Date): Date[] {
  const days = Math.floor((endDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000)) + 2;
  const rangeDates = Array.from({ length: days }, (_, index) => {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + index);
    return newDate;
  });
  return rangeDates;
};

function filterAllowedDays (rangeDate: Date[], allowedDays: Option[]): Date[] {
  const filteredDays = allowedDays.map((day) => day.value);
  const allowedDates = rangeDate.filter((date) => {
    if (filteredDays.includes(MapDaysToIndex.get(date.getDay()) ?? '')) return true;
    return false;
  });
  return allowedDates;
};

function addMinutes (date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

function getDateSlots (rangeDate: Date[], startTime: string, endTime: string, matchHalfDuration: string, fields: FieldFormType[]): MatchDateSlot[] {
  const matchDuration = Number(matchHalfDuration) * 2;

  const matchSlots: MatchDateSlot[] = [];

  const [startHours, startMin] = startTime.split(':');
  const [endHours, endMin] = endTime.split(':');
  fields.forEach((field) => {
    rangeDate.forEach((date) => {
      const startDateTime = new Date(date);
      startDateTime.setHours(Number(startHours), Number(startMin));
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(Number(endHours), Number(endMin));
      let stepMatchDate = startDateTime;

      while (stepMatchDate.valueOf() <= endDateTime.valueOf()) {
        matchSlots.push({
          startDateTime: stepMatchDate,
          Field: field,
          taken: false,
          id: uuidv4()
        });
        stepMatchDate = new Date(addMinutes(stepMatchDate, matchDuration));
      }
    });
  });
  const sortedMatchesSlot = matchSlots.sort((matchSlotA, matchSlotB) => matchSlotA.startDateTime.getTime() - matchSlotB.startDateTime.getTime());
  return sortedMatchesSlot;
};

function getAllAllowedDays (startDate: Date, endDate: Date, allowedDays: weekDaysTypes[]): Date[] {
  const rangeDate = getAllDaysBetweenTwoDate(startDate, endDate);
  const allowedDates = filterAllowedDays(rangeDate, allowedDays as unknown as Option[]);

  return allowedDates;
}

function divideTeamsIntoGroups (numTeams: number, teamsPerGroup: number, teamsList: Array<Option<TeamsOptions>>): Group[] {
  const groups: Group[] = [];
  const numGroups = Math.floor(numTeams / teamsPerGroup);
  let teamsIndex = 0;
  for (let i = 0; i < numGroups; i++) {
    const group: Group = {
      matches: [],
      teams: [],
      id: uuidv4()
    };
    for (let j = 0; j < teamsPerGroup; j++) {
      group.teams.push(teamsList[teamsIndex]);
      teamsIndex += 1;
    }
    groups.push(group);
  }
  return groups;
}

function createMatch (homeTeam?: Option<TeamsOptions>, awayTeam?: Option<TeamsOptions>, matchSlot?: MatchDateSlot): MatchDetails {
  return {
    id: uuidv4(),
    awayTeam,
    homeTeam,
    homeTeamImg: homeTeam?.extraData?.imageId ?? undefined,
    awayTeamImg: awayTeam?.extraData?.imageId ?? undefined,
    startDate: matchSlot?.startDateTime ?? new Date(),
    startTime: formatTime(matchSlot?.startDateTime, undefined, 'en-GB'),
    matchDesc: `Match between ${homeTeam?.label ?? 'TBD'}, ${awayTeam?.label ?? 'TBD'} details:`,
    matchField: {
      label: matchSlot?.Field.fieldName ?? '',
      value: matchSlot?.Field.fieldID ?? '',
      extraData: matchSlot?.Field
    }
  };
}

function findMatchSlot (matchSlots: MatchDateSlot[], teamA?: Option<TeamsOptions>, teamB?: Option<TeamsOptions>, matches?: MatchDetails[]): MatchDateSlot | undefined {
  const availableSlots = matchSlots.filter((slot) => {
    let isFieldExceedLimitPerDay = false;
    const allSlotsOnDay = matchSlots.filter((date) => {
      return date.startDateTime.getDay() === slot.startDateTime.getDay() && date.Field.fieldID === slot.Field.fieldID && date.taken;
    });
    isFieldExceedLimitPerDay = allSlotsOnDay.length < getMatchesPerDay(slot.Field.matchesPerDay);

    return !slot.taken && isFieldExceedLimitPerDay;
  });
  if ((teamA == null) || (teamB == null) || (matches == null)) {
    return availableSlots.find((slot) => !slot.taken);
  }

  const teamAMatchIds = matches.filter((match) => match.homeTeam?.value === teamA.value || match.awayTeam?.value === teamA.value).map((match) => combineDateAndTime(match.startTime, match.startDate));
  const teamBMatchIds = matches.filter((match) => match.homeTeam?.value === teamB.value || match.awayTeam?.value === teamB.value).map((match) => combineDateAndTime(match.startTime, match.startDate));

  const matchSlot = availableSlots.find((slot) => {
    const teamAIsFree = !teamAMatchIds.includes(slot.startDateTime.toISOString());
    const teamBIsFree = !teamBMatchIds.includes(slot.startDateTime.toISOString());

    return teamAIsFree && teamBIsFree;
  });

  return matchSlot;
}

function roundRobinSchedule (teams: Array<Option<TeamsOptions>>, matchSlots: MatchDateSlot[], teamPlayWithEach: number): MatchDetails[] {
  const matches: MatchDetails[] = [];

  for (let round = 0; round < teamPlayWithEach; round++) {
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const matchSlot = findMatchSlot(matchSlots, teams[i], teams[j], matches);
        const match: MatchDetails = createMatch(teams[i], teams[j], matchSlot);
        matches.push(match);
        if (matchSlot !== undefined) {
          matchSlot.taken = true;
        }
      }
    }
  }
  return matches;
}

function createMatches (teamsListOne: Array<Option<TeamsOptions>>, teamsListTwo: Array<Option<TeamsOptions>>, matchSlots: MatchDateSlot[], OgTournamentForm?: TournamentFormType): { matches: MatchDetails[], groupMatches: number[] } {
  const matches: MatchDetails[] = [];
  const groupMatches: number[] = [];
  for (let j = 0; j < teamsListOne.length; j++) {
    const matchSlot = findMatchSlot(matchSlots, teamsListOne[j], teamsListTwo[j], matches);
    const match: MatchDetails = createMatch(teamsListOne[j], teamsListTwo[j], matchSlot);
    matches.push(match);

    if (matchSlot !== undefined) {
      matchSlot.taken = true;
    }
  }
  let firstGroupMatchesLength = matches.length;
  groupMatches.push(firstGroupMatchesLength);
  while (firstGroupMatchesLength >= 1) {
    firstGroupMatchesLength = Math.floor(firstGroupMatchesLength / 2);
    if (firstGroupMatchesLength > 0) {
      groupMatches.push(firstGroupMatchesLength);
    }
    for (let j = 0; j < firstGroupMatchesLength; j++) {
      const matchSlot = findMatchSlot(matchSlots);
      const match: MatchDetails = createMatch(undefined, undefined, matchSlot);
      matches.push(match);
      if (matchSlot !== undefined) {
        matchSlot.taken = true;
      }
    }
  }
  return { matches, groupMatches };
}

function getGroupName (numOfMatches: number, overwrite?: string): string {
  if (overwrite !== undefined) return overwrite;
  switch (numOfMatches * 2) {
    case 2:
      return 'Final';
    case 4:
      return 'Semi-Final';
    case 8:
      return 'Quarter-Final';
    default:
      return `Round of ${numOfMatches * 2}`;
  }
}

function findMatchesIds (matchesList: MatchDetails[], OgTournamentForm?: TournamentFormType): MatchDetails[] {
  if (OgTournamentForm === undefined) return matchesList;
  const groupName = getGroupName(matchesList.length);

  let howManyMatchesDidweMatch = 0;

  const OgMatches = OgTournamentForm.groups?.find((group) => group.groupName === groupName)?.matches;

  const updatedMatchesList = matchesList.map((match) => {
    const foundOgMatch = OgMatches?.find((ogMatch) => {
      if (match.awayTeam?.value === ogMatch.awayTeam?.value && match.homeTeam?.value === ogMatch.homeTeam?.value) {
        return true;
      }
      return false;
    });

    if (foundOgMatch !== undefined) {
      howManyMatchesDidweMatch = howManyMatchesDidweMatch + 1;
      return {
        ...match,
        id: foundOgMatch.id,
        matchID: foundOgMatch.matchID
      };
    }

    return match;
  });
  return updatedMatchesList ?? matchesList;
}

function createSingleElimination (teamsList: Array<Option<TeamsOptions>>, matchSlots: MatchDateSlot[], OgTournamentForm?: TournamentFormType): TournamentScheduleForm {
  const ogTeamsListOrder = OgTournamentForm?.groups?.map((group) => group.teams).flat();
  const sortedTeamsList = sortTeamsListDependingOnOgTeamsList(teamsList, ogTeamsListOrder);

  const [firstHalfTeams, secondHalfTeams] = splitArrayIntoChunks(sortedTeamsList);

  const { matches, groupMatches } = createMatches(firstHalfTeams, secondHalfTeams, matchSlots, OgTournamentForm);
  let stageMatches = matches;
  const schedule: TournamentScheduleForm = {
    groups: []
  };

  groupMatches.forEach((groupMatchLength) => {
    const [firstStage, restOfStages] = splitArrayIntoChunks(stageMatches, 2, groupMatchLength);
    const updatedMatchesWithIds = findMatchesIds(firstStage, OgTournamentForm);

    schedule.groups.push({
      teams: [],
      matches: updatedMatchesWithIds,
      groupName: getGroupName(updatedMatchesWithIds.length),
      id: uuidv4()
    });

    stageMatches = restOfStages;
  });

  return schedule;
}

function createGroupStage (numTeams: number, teamsPerGroup: number, teamsList: Array<Option<TeamsOptions>>,
  matchSlots: MatchDateSlot[], teamPlayWithEach: number, whoQualifiesFromGroup: number): TournamentScheduleForm {
  const groups = divideTeamsIntoGroups(numTeams, teamsPerGroup, teamsList);
  const schedule: TournamentScheduleForm = {
    groups: []
  };
  groups.forEach((group, index) => {
    const addedMatchesGroup = {
      teams: group.teams,
      matches: roundRobinSchedule(group.teams, matchSlots, teamPlayWithEach),
      groupName: `Groups Stage ${alphabetArray[index]}`,
      id: uuidv4()
    };
    schedule.groups.push(addedMatchesGroup);
  });
  const teamsMovingToNextStage = (schedule.groups.length * whoQualifiesFromGroup);
  const arrayOfUnSetTeams = Array.from(Array(teamsMovingToNextStage).map((num) => {
    return {
      value: 'TBD',
      label: 'TBB'
    };
  }));
  if (teamsMovingToNextStage <= 16) {
    const restOfTourney = createSingleElimination(arrayOfUnSetTeams, matchSlots);
    schedule.groups.push(...restOfTourney.groups);
  };

  if (teamsMovingToNextStage > 16) {
    const restOfTourney = createGroupStage(
      teamsMovingToNextStage,
      teamsPerGroup, arrayOfUnSetTeams,
      matchSlots,
      teamPlayWithEach, whoQualifiesFromGroup);
    schedule.groups.push(...restOfTourney.groups);
  }

  return schedule;
}

export function generateTourney (tournamentForm: TournamentFormType, OgTournamentForm?: TournamentFormType): TournamentScheduleForm {
  const {
    groupTeams, numOfTeams, type, teamsList,
    daysOfMatches, startDate, finishDate, startTime,
    endTime, matchesDuration, fieldsDetails, teamPlayWithEach = 'ONCE', ...otherRules
  } = tournamentForm;

  const placeHolderErr = {
    groups: []
  };
  if (startDate === null || startDate === undefined) {
    return placeHolderErr;
  }

  if (finishDate === null || finishDate === undefined) {
    return placeHolderErr;
  }

  if (startTime === null || startTime === undefined) {
    return placeHolderErr;
  }
  if (endTime === null || endTime === undefined) {
    return placeHolderErr;
  }

  if (daysOfMatches === undefined) {
    return placeHolderErr;
  };

  if (fieldsDetails === undefined) {
    return placeHolderErr;
  };

  if (teamsList === undefined) {
    return placeHolderErr;
  };

  if (teamsList?.length < Number(numOfTeams)) {
    const teamsLeftForTourney = Number(numOfTeams) - teamsList?.length;
    const teamsToAdd = Array.from({ length: teamsLeftForTourney }).map((_) => {
      return {
        value: 'BYE',
        label: 'BYE'
      };
    }) as Array<Option<TeamsOptions>>;

    teamsList.push(...teamsToAdd);
  }

  const teamPlaysWithEachNumber = teamPlayWithEach === 'ONCE' ? 1 : 2;
  const whoQualifiesFromGroup = otherRules.placementQualifier === 'TOP_1' ? 1 : 2;
  const allowedDates = getAllAllowedDays(startDate, finishDate, daysOfMatches ?? []);
  const matchSlots = getDateSlots(allowedDates, startTime, endTime, matchesDuration as unknown as string, fieldsDetails);

  if (OgTournamentForm !== undefined) {
    if (OgTournamentForm.type === tournamentForm.type && OgTournamentForm.numOfTeams === tournamentForm.numOfTeams) {
      return updateTourney(tournamentForm, OgTournamentForm, matchSlots);
    }
  };

  switch (type) {
    case 'ROUNDROBIN':
      return createGroupStage(
        Number(numOfTeams), Number(groupTeams), teamsList,
        matchSlots, teamPlaysWithEachNumber, whoQualifiesFromGroup
      );
    case 'SINGLE_ELIMINATION':
      return createSingleElimination(teamsList, matchSlots);
    default:
      return createGroupStage(
        Number(numOfTeams), Number(groupTeams), teamsList,
        matchSlots, teamPlaysWithEachNumber, whoQualifiesFromGroup
      );
  }
}

function updateTourney (tournamentForm: TournamentFormType, OgTournamentForm: TournamentFormType, matchSlots: MatchDateSlot[] = []): TournamentScheduleForm {
  // we want to update teams.

  const ogTeams = OgTournamentForm.teamsList;
  const newTeams = tournamentForm.teamsList;

  const isTeamsDif = compareArrays(ogTeams ?? [], newTeams ?? [], 'value', true) as { same: boolean, difA: Array<Option<TeamsOptions>>, difB: Array<Option<TeamsOptions>> };

  let updatedGroups: Group[] = tournamentForm.groups ?? [];

  const matches: MatchDetails[] = [];

  if (isTeamsDif.same) {
    isTeamsDif.difA.forEach((team) => {
      const replaceTeamWith = newTeams?.pop();

      updatedGroups = updatedGroups.map((group) => {
        const updatedMatches = group.matches.map((match) => {
          const awayTeam = match.awayTeam?.value === team.value ? replaceTeamWith : match.awayTeam;
          const homeTeam = match.awayTeam?.value === team.value ? replaceTeamWith : match.awayTeam;
          return {
            ...match,
            awayTeamImg: awayTeam?.extraData?.imageId,
            homeTeamImg: homeTeam?.extraData?.imageId,
            homeTeam,
            awayTeam
          };
        });
        const newTeams = group.teams.filter((inTeam) => inTeam.value !== team.value);
        if (replaceTeamWith !== undefined) {
          newTeams.push(replaceTeamWith);
        };
        return {
          ...group,
          matches: updatedMatches,
          teams: newTeams
        };
      });
    });
  }
  updatedGroups = updatedGroups.map((group) => {
    const updatedMatches = group.matches.map((match) => {
      let homeTeam = match.homeTeam;
      let awayTeam = match.awayTeam;
      const matchSlot = findMatchSlot(matchSlots, match?.homeTeam ?? { value: 'TBD', label: 'TBD' }, match?.awayTeam ?? { value: 'TBD', label: 'TBD' }, matches);
      if (match.userEdited === true) {
        return match;
      }
      if (!isTeamsDif.same) {
        const replacedTeamHome = isTeamsDif.difA?.findIndex(obj => obj.value === match.homeTeam?.value);
        const replacedTeamAway = isTeamsDif.difA?.findIndex(obj => obj.value === match.awayTeam?.value);
        if (replacedTeamHome !== -1) {
          homeTeam = newTeams?.pop();
        };

        if (replacedTeamAway !== -1) {
          awayTeam = newTeams?.pop();
        }
      };
      const updatedMatch = {
        ...match,
        awayTeamImg: homeTeam?.extraData?.imageId ?? '',
        homeTeamImg: awayTeam?.extraData?.imageId ?? '',
        homeTeam,
        awayTeam,
        startDate: matchSlot?.startDateTime ?? new Date(),
        startTime: formatTime(matchSlot?.startDateTime, undefined, 'en-GB'),
        matchField: {
          label: matchSlot?.Field.fieldName ?? '',
          value: matchSlot?.Field.fieldID ?? '',
          extraData: matchSlot?.Field
        }
      };

      if (matchSlot !== undefined) {
        matchSlot.taken = true;
      }

      matches.push(updatedMatch);
      return updatedMatch;
    });

    return {
      ...group,
      matches: updatedMatches
    };
  });
  return {
    groups: updatedGroups
  };
};
