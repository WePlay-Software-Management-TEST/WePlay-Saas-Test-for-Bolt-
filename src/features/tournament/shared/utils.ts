import { RefereeTypes, type Tournaments, TournamentFormatType, MatchPartyPosition } from 'API';
import { type Path, type FieldValues, type UseFormGetFieldState } from 'react-hook-form';
import { type Group, type FieldFormType, type TournamentFormType, type MatchDetails } from '../models/tournamentForm.model';
import { getRulesVariables } from '../models/tournament.const';
import { type PlayersOptions, type Option, type TeamsOptions } from 'core/models/input.model';
import { splitDateTime } from 'core/utils/utils';
import { type Contact } from 'graphql/table.models';

export function sortGroupsDependingOnTourneyType (groups: Group[], type?: TournamentFormatType | null): Group[] {
  if (type === TournamentFormatType.ROUNDROBIN) {
    const groupStageGroups = groups.filter(group => group.groupName?.includes('Groups Stage'));
    const otherStagesGroups = groups.filter(group => !((group.groupName?.includes('Groups Stage')) ?? false));

    groupStageGroups.sort(function (a, b) {
      if ((a?.groupName ?? '') < (b?.groupName ?? '')) {
        return -1;
      }
      if ((a.groupName ?? '') > (b.groupName ?? '')) {
        return 1;
      }
      return 0;
    });

    otherStagesGroups.sort((groupA, groupB) => (groupB?.matches?.length ?? 0) - (groupA?.matches?.length ?? 0));

    return [...groupStageGroups, ...otherStagesGroups];
  };

  return groups.sort((groupA, groupB) => (groupB?.matches?.length ?? 0) - (groupA?.matches?.length ?? 0));
}
export function isThereErrorInSubForm<T extends FieldValues> (listOfFields: Array<Path<T>>, getFieldState: UseFormGetFieldState<T>): boolean {
  const isAllFieldsErrorFree: boolean[] = [];
  const isAllfieldsDirty: boolean[] = [];
  const isAllFieldsValid: boolean[] = [];

  listOfFields.forEach((fieldName) => {
    const fieldState = getFieldState(fieldName);

    isAllFieldsValid.push(!(fieldState.invalid));
    isAllfieldsDirty.push(fieldState.isDirty);
    isAllFieldsErrorFree.push(fieldState.error === undefined);
  });

  return isAllFieldsErrorFree.every((value) => value) && isAllfieldsDirty.every((value) => value) && isAllFieldsValid.every((value) => value);
};

function makeArrayUnique<T = void> (array: Array<Record<string, any>>, key: string): T[] {
  const filteredTeams = array.filter(obj => obj[key] !== '');

  const uniqueTeamsMap = new Map<string, any>();
  filteredTeams.forEach(obj => {
    uniqueTeamsMap.set(obj[key], obj);
  });

  return Array.from(uniqueTeamsMap.values());
}

export function turnTourneyDBModelToTourneyForm (tourney?: Tournaments, img?: File, allPlayers?: Contact[]): TournamentFormType | undefined {
  if (tourney === undefined) return;
  const previewImages: File[] = img !== undefined ? [img] : [];
  const tourneyRules = getRulesVariables(tourney?.TournamentRulesVariables?.items);
  const fieldVariables = tourney?.TournamentRulesVariables?.items.filter((ruleVar) => ruleVar?.ruleID === 'd24e3083-c8b4-438e-b1d0-fa53e9c7e2e6').map((rule) => rule?.ruleVariables);
  const allMatches = tourney?.TFGroups?.items.flat().map((group) => {
    return group?.TFGroupMatches?.items;
  }).flat().map((tfGroup) => tfGroup?.Matches?.items).flat();
  const allTeams = allMatches?.map((match) => match?.MatchParties?.items).flat().map((matchParty) => matchParty?.team).flat();

  const teamsList: Array<Option<TeamsOptions>> | undefined = allTeams?.map((team): Option<TeamsOptions> => {
    return {
      label: team?.TeamName ?? '',
      value: team?.id ?? '',
      extraData: {
        imageId: team?.PhotoId ?? '',
        city: team?.City ?? '',
        state: team?.State ?? ''
      }
    };
  });

  const uniqueTeamsList = makeArrayUnique<Option<TeamsOptions>>(teamsList ?? [], 'value');

  const fields: FieldFormType[] = [];
  allMatches?.forEach((match) => {
    const mainReferees = match?.MatchesToReferees?.items.filter((referee) => {
      return referee?.refereeRoleId === RefereeTypes.MAIN_REFEREES;
    }).map((ref): Option<PlayersOptions> => {
      return {
        label: `${ref?.contactID?.FirstName ?? ''} ${ref?.contactID?.LastName ?? ''}`,
        value: ref?.contactID?.id ?? '',
        extraData: {
          city: ref?.contactID?.ContactAddresses?.items[0]?.City ?? '',
          state: ref?.contactID?.ContactAddresses?.items[0]?.State ?? '',
          experience: ref?.contactID?.RefereeInformation?.yearsOfExperience
        }
      };
    });

    const lineReferees = match?.MatchesToReferees?.items.filter((referee) => referee?.refereeRoleId === RefereeTypes.LINE_REFEREES).map((ref): Option<PlayersOptions> => {
      return {
        label: `${ref?.contactID?.FirstName ?? ''} ${ref?.contactID?.LastName ?? ''}`,
        value: ref?.contactID?.id ?? '',
        extraData: {
          city: ref?.contactID?.ContactAddresses?.items[0]?.City ?? '',
          state: ref?.contactID?.ContactAddresses?.items[0]?.State ?? '',
          experience: ref?.contactID?.RefereeInformation?.yearsOfExperience
        }
      };
    });

    const findMatchesPerDay = fieldVariables?.find((variable) => {
      return JSON.parse(variable ?? '').field === match?.Field?.id;
    });

    const matchesPerDay = findMatchesPerDay === undefined ? '1_MATCHES' : JSON.parse(findMatchesPerDay ?? '')?.matchesPerDay ?? JSON.parse(findMatchesPerDay ?? '')?.num;
    const fieldDetails: FieldFormType = {
      fieldName: match?.Field?.fieldName ?? '',
      matchesPerDay,
      assignMechanism: 'MANUAL',
      mainReferees: makeArrayUnique(mainReferees ?? [], 'value') ?? [],
      lineReferees: makeArrayUnique(lineReferees ?? [], 'value') ?? [],
      fieldID: match?.Field?.id ?? ''
    };

    fields.push(fieldDetails);
  });
  const groups: Group[] = [];
  tourney?.TFGroups?.items.forEach((group) => {
    const matches = group?.TFGroupMatches?.items.map((TFGroupMatches) => {
      return TFGroupMatches?.Matches?.items;
    }).flat();
    const teams = matches?.map((match) => match?.MatchParties?.items).flat().map((matchParty): Option<TeamsOptions> => {
      return {
        label: matchParty?.team?.TeamName ?? '',
        value: matchParty?.team?.id ?? '',
        extraData: {
          city: matchParty?.team?.City ?? '',
          state: matchParty?.team?.State ?? '',
          imageId: matchParty?.team?.PhotoId ?? ''
        }
      };
    });
    const matchesInGroup: MatchDetails[] = [];
    matches?.forEach((match) => {
      const { date, time } = splitDateTime(match?.beginTime ?? undefined);
      const fieldBeingPlayed = fields.find((field) => field.fieldID === match?.Field?.id);
      const homeTeam = match?.MatchParties?.items.find((matchParty) => matchParty?.matchPartyPosition === MatchPartyPosition.HOME);
      const awayTeam = match?.MatchParties?.items.find((matchParty) => matchParty?.matchPartyPosition === MatchPartyPosition.AWAY);

      const homeTeamPlayers = homeTeam?.team?.TeamPlayers?.items.map((teamPlayer): Option<PlayersOptions> => {
        const player = allPlayers?.find((player) => player.id === teamPlayer?.contactsID);
        return {
          value: player?.id ?? '',
          label: `${player?.FirstName ?? ''} ${player?.LastName ?? ''}`,
          extraData: {
            imageId: player?.PhotoId ?? '',
            Birthdate: player?.Birthdate ?? '',
            city: player?.ContactAddresses?.items[0]?.City ?? '',
            state: player?.ContactAddresses?.items[0]?.State ?? '',
            isCaptain: teamPlayer?.IsCaptain ?? false,
            inTeam: true,
            teamsId: homeTeam.team?.id,
            version: 1,
            playerId: player?.id
          }
        };
      });
      const awayTeamPlayers = awayTeam?.team?.TeamPlayers?.items.map((teamPlayer): Option<PlayersOptions> => {
        const player = allPlayers?.find((player) => player.id === teamPlayer?.contactsID);

        return {
          value: player?.id ?? '',
          label: `${player?.FirstName ?? ''} ${player?.LastName ?? ''}`,
          extraData: {
            imageId: player?.PhotoId ?? '',
            Birthdate: player?.Birthdate ?? '',
            city: player?.ContactAddresses?.items[0]?.City ?? '',
            state: player?.ContactAddresses?.items[0]?.State ?? '',
            isCaptain: teamPlayer?.IsCaptain ?? false,
            inTeam: true,
            teamsId: awayTeam?.team?.id,
            version: 1,
            playerId: player?.id
          }
        };
      });
      const homeTeamScore = homeTeam?.points?.items.map((point) => {
        const player = allPlayers?.find((player) => player.id === point?.matchPartyPointsContactId);

        return {
          value: `${Math.random()}`,
          label: `${player?.FirstName ?? ''} ${player?.LastName ?? ''}`,
          extraData: {
            imageId: player?.PhotoId ?? '',
            Birthdate: player?.Birthdate ?? '',
            city: player?.ContactAddresses?.items[0]?.City ?? '',
            state: player?.ContactAddresses?.items[0]?.State ?? '',
            inTeam: true,
            teamsId: awayTeam?.team?.id,
            version: point?._version ?? 1,
            id: point?.id ?? '',
            playerId: point?.id ?? ''
          }
        };
      });
      const awayTeamScore = awayTeam?.points?.items.map((point) => {
        const player = allPlayers?.find((player) => player.id === point?.matchPartyPointsContactId);

        return {
          value: player?.id ?? '',
          label: `${player?.FirstName ?? ''} ${player?.LastName ?? ''}`,
          extraData: {
            imageId: player?.PhotoId ?? '',
            Birthdate: player?.Birthdate ?? '',
            city: player?.ContactAddresses?.items[0]?.City ?? '',
            state: player?.ContactAddresses?.items[0]?.State ?? '',
            inTeam: true,
            version: point?._version ?? 1,
            id: point?.id ?? '',
            playerId: player?.id
          }
        };
      });
      const matchForm: MatchDetails = {
        id: match?.id ?? '',
        jsonMatch: JSON.stringify(match) ?? '',
        matchID: match?.id ?? '',
        homeTeam: {
          label: homeTeam?.team?.TeamName ?? 'TBD',
          value: homeTeam?.team?.id ?? '',
          extraData: {
            city: homeTeam?.team?.City ?? '',
            state: homeTeam?.team?.State ?? '',
            imageId: homeTeam?.team?.PhotoId ?? ''
          }
        },
        awayTeam: {
          label: awayTeam?.team?.TeamName ?? 'TBD',
          value: awayTeam?.team?.id ?? '',
          extraData: {
            city: awayTeam?.team?.City ?? '',
            state: awayTeam?.team?.State ?? '',
            imageId: awayTeam?.team?.PhotoId ?? ''
          }
        },
        startDate: date,
        startTime: time,
        matchField: {
          label: fieldBeingPlayed?.fieldName ?? '',
          value: fieldBeingPlayed?.fieldID ?? '',
          extraData: {
            fieldName: fieldBeingPlayed?.fieldName ?? '',
            assignMechanism: fieldBeingPlayed?.assignMechanism ?? 'MANUAL',
            matchesPerDay: fieldBeingPlayed?.matchesPerDay ?? '1_MATCH',
            mainReferees: fieldBeingPlayed?.mainReferees ?? [],
            lineReferees: fieldBeingPlayed?.lineReferees ?? [],
            fieldID: fieldBeingPlayed?.fieldID ?? ''
          }
        },
        matchDesc: match?.matchDescription ?? '',
        homeTeamPlayers: homeTeamPlayers ?? [],
        awayTeamPlayers: awayTeamPlayers ?? [],
        homeTeamScore: homeTeamScore ?? [],
        awayTeamScore: awayTeamScore ?? [],
        endDate: new Date(match?.endTime ?? '').toString() !== 'Invalid Date' ? new Date(match?.endTime ?? '') : undefined,
        matchIsDone: new Date(match?.endTime ?? '').toString() !== 'Invalid Date'
      };
      matchesInGroup.push(matchForm);
    });

    const formGroup: Group = {
      teams: makeArrayUnique((teams ?? []), 'value'),
      matches: matchesInGroup,
      groupName: group?.groupName,
      id: group?.id ?? ''
    };

    groups.push(formGroup);
  });
  const uniqueFields = makeArrayUnique(fields, 'fieldID');
  if (!isNaN(Number(tourneyRules.numOfFields))) {
    const numOfFields = tourneyRules.numOfFields === uniqueFields.length ? tourneyRules.numOfFields : uniqueFields.length.toString();
    tourneyRules.numOfFields = numOfFields as number;
  }
  const settedGroups = sortGroupsDependingOnTourneyType(groups, tourney.TournamentFormatType);
  const teamWhoWon = (settedGroups.slice(-1)[0].matches[0]?.awayTeamScore ?? 0) > (settedGroups.slice(-1)[0]?.matches[0]?.homeTeamScore ?? 0)
    ? settedGroups.slice(-1)[0].matches[0].awayTeam
    : settedGroups.slice(-1)[0].matches[0].homeTeam;
  const formTourney: TournamentFormType = {
    leagueDesc: tourney?.tournamentDescription ?? '',
    leagueName: tourney?.tournamentName ?? '',
    image: previewImages,
    type: tourney?.TournamentFormatType,
    sportType: 'SOCCER',
    id: tourney?.id,
    teamsList: uniqueTeamsList,
    fieldsDetails: makeArrayUnique(fields, 'fieldID'),
    groups: settedGroups,
    reGenTourney: false,
    allTourneyInfo: JSON.stringify(allMatches),
    _version: tourney._version,
    tourneyEnded: tourney.haveEnded ?? false,
    teamWhoWon: teamWhoWon ?? {
      value: '',
      label: ''
    },
    ...tourneyRules
  };

  return formTourney;
};

export interface TeamStat {
  team?: Option<TeamsOptions>
  groupName: string
  ranking: number
  w: number
  l: number
  pts: number
  MP: number
  d: number
  fullWidth?: boolean
}

export function getTeamsStats (groups?: Group[]): TeamStat[] {
  const teamStats: TeamStat[] = [];
  const groupStageGroups = groups?.filter(group => group.groupName?.includes('Groups Stage'));
  groupStageGroups?.forEach((group) => {
    const groupName = group.groupName;
    const teamsInGroup: TeamStat[] = [];
    group.teams.forEach((team, i) => {
      let wins = 0;
      let draws = 0;
      let loses = 0;
      let matchesPlayed = 0;
      let points = 0;
      const allMatchesPlayedByThisTeam = group.matches.filter((match) => match.awayTeam?.value === team.value || match.homeTeam?.value === team.value);
      allMatchesPlayedByThisTeam.forEach((match) => {
        matchesPlayed = matchesPlayed + 1;
        const teamPosition = match.awayTeam?.value === team.value ? 'AWAY' : 'HOME';
        if (teamPosition === 'AWAY') {
          if ((match.awayTeamScore?.length ?? 0) > (match.homeTeamScore?.length ?? 0)) {
            wins = wins + 1;
            points = points + 3;
          }
          if ((match.awayTeamScore?.length ?? 0) === (match.homeTeamScore?.length ?? 0)) {
            draws = draws + 1;
            points = points + 1;
          }
          if ((match.awayTeamScore?.length ?? 0) < (match.homeTeamScore?.length ?? 0)) {
            loses = loses + 1;
          }
        };

        if (teamPosition === 'HOME') {
          if ((match.homeTeamScore?.length ?? 0) > (match.awayTeamScore?.length ?? 0)) {
            wins = wins + 1;
            points = points + 3;
          }
          if ((match.homeTeamScore?.length ?? 0) === (match.awayTeamScore?.length ?? 0)) {
            draws = draws + 1;
            points = points + 1;
          }
          if ((match.homeTeamScore?.length ?? 0) < (match.awayTeamScore?.length ?? 0)) {
            loses = loses + 1;
          }
        };
      });
      teamsInGroup.push({
        groupName: groupName ?? '',
        team: team ?? {},
        ranking: 0,
        w: wins,
        l: loses,
        pts: points,
        MP: matchesPlayed,
        d: draws
      });
    });

    const sortedTeams = teamsInGroup.sort((teamA, teamB) => {
      if (teamA.pts < teamB.pts) {
        return -1;
      };
      if (teamA.pts > teamB.pts) {
        return 1;
      }
      return 0;
    }).map((team, i) => {
      return {
        ...team,
        ranking: i + 1
      };
    });
    teamStats.push({
      groupName: groupName ?? '',
      ranking: 0,
      w: 0,
      l: 0,
      pts: 0,
      MP: 0,
      d: 0,
      fullWidth: true
    });
    teamStats.push(...sortedTeams);
  });
  return teamStats;
};
