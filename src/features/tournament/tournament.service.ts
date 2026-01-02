import { API } from 'aws-amplify';
import { getCurrentSession } from 'core/services/auth.service';
import { type GraphQLResult, type GraphQLQuery } from '@aws-amplify/api';
import {
  customListTourney, type CustomListTeamsFieldsReferees, getTourneyQuery,
  updateFieldsMutation, deleteAllMatchPoints, addNewmatchPoints, updateTournamentMutation,
  type updateTournamentMutationInput
} from 'graphql/custom.queries';
import {
  TournamentFormatType,
  type TournamentRules, type CreateFieldsInput, type CreateFieldsMutation,
  type TournamentRulesVariablesInput, type TFGroupsInput,
  type TFGroupMatchesInput, type MatchesInput, type
  MatchPartiesInput, type MatchesToRefereesInput,
  RefereeTypes, type ListTournamentsQuery, type Tournaments,
  type MatchParties,
  type Matches,
  MatchPartyPosition,
  type TFGroupMatches,
  type Fields,
  type DeleteTournamentsInput,
  type UpdateMatchesInput,
  type MatchPartyPoints,
  type UpdateMatchPartiesInput
} from 'API';
import { createFields, createTourney, deleteTournaments, updateMatches, updateMatchParties, updateTournaments, updateTourney } from 'graphql/mutations';
import { type FieldFormType, type Group, type TournamentScheduleForm, type TournamentFormType, type MatchDetails } from './models/tournamentForm.model';
import { type FieldArrayWithId } from 'react-hook-form';
import { getKeyFromValueMap } from './models/tournament.const';
import { createS3StoragePhoto, updateS3StorageUser } from 'features/player/player.service';
import { v4 as uuidv4 } from 'uuid';
import { combineDateAndTime } from 'core/utils/utils';
import { sortGroupsDependingOnTourneyType } from './shared/utils';

function getTFormatRules (formatType: 'ROUNDROBIN' | 'SINGLE_ELIMINATION' | null | undefined, rules: TournamentRules[]): TournamentRules[] {
  return rules.filter((rule) => {
    const formats = rule.TRulesToTFormat?.items?.map((rule) => rule?.TournamentFormatType);
    return formats?.includes(formatType as unknown as TournamentFormatType);
  });
};

function getTournamentRulesVariables (
  rules: TournamentRules[], form: TournamentFormType,
  fieldsDetails: FieldFormType[] | undefined, tournamentID: string, tourney?: Tournaments): TournamentRulesVariablesInput[] {
  const createTournamentVarsInput = rules.filter((rule) => rule.id !== 'd24e3083-c8b4-438e-b1d0-fa53e9c7e2e6').map((rule) => {
    const tournamentInputVariable = getKeyFromValueMap(undefined, rule.id ?? '') ?? '';
    const valueVariable = form[tournamentInputVariable as unknown as keyof TournamentFormType];
    let variableRuleID = uuidv4();
    let _version;
    if (tourney !== undefined) {
      const updatedRulesVariables = tourney.TournamentRulesVariables?.items.find((ruleVar) => ruleVar?.ruleID === rule.id);
      variableRuleID = updatedRulesVariables?.id ?? uuidv4();
      _version = updatedRulesVariables?._version;
    };

    const value: Record<string, any> = {};
    value[`${tournamentInputVariable}`] = valueVariable;

    return {
      ruleVariables: JSON.stringify(value),
      ruleID: rule.id,
      tournamentID,
      id: variableRuleID,
      _version
    };
  });
  fieldsDetails?.forEach((field) => {
    let variableRuleID = uuidv4();
    let _version;
    if (tourney !== undefined) {
      const updatedRulesVariables = tourney.TournamentRulesVariables?.items.filter((ruleVar) => ruleVar?.ruleID === 'd24e3083-c8b4-438e-b1d0-fa53e9c7e2e6').find((ruleVar) => {
        return JSON.parse(ruleVar?.ruleVariables ?? '')?.field === field.fieldID;
      });
      variableRuleID = updatedRulesVariables?.id ?? uuidv4();
      _version = updatedRulesVariables?._version;
    };
    const fieldRule = {
      ruleVariables: JSON.stringify({
        field: field.fieldID,
        matchesPerDay: field.matchesPerDay
      }),
      ruleID: 'd24e3083-c8b4-438e-b1d0-fa53e9c7e2e6',
      tournamentID,
      id: variableRuleID,
      _version
    };
    createTournamentVarsInput.push(fieldRule);
  });

  return createTournamentVarsInput ?? [];
}

function getGroupsInput (tournamentID: string, tourneyGroups?: Array<FieldArrayWithId<TournamentScheduleForm, 'groups'>> | Group[], tourney?: Tournaments): {
  tfGroupMatchs: TFGroupMatchesInput[]
  matches: MatchesInput[]
  matchesParties: MatchPartiesInput[]
  matchesToReferees: MatchesToRefereesInput[]
  groups: TFGroupsInput[]
} {
  const tfGroupMatchs: TFGroupMatchesInput[] = [];
  const matches: MatchesInput[] = [];
  const matchesParties: MatchPartiesInput[] = [];
  const matchesToReferees: MatchesToRefereesInput[] = [];
  const groups: TFGroupsInput[] = [];

  const alreadyCreatedGroups = tourney?.TFGroups?.items;

  const allMatches = alreadyCreatedGroups?.map((group) => group?.TFGroupMatches?.items).flat().map((tfGroupMatchs) => tfGroupMatchs?.Matches?.items).flat();
  tourneyGroups?.forEach((group) => {
    const groupEdit = alreadyCreatedGroups?.find((TfGroups) => TfGroups?.id === group.id || TfGroups?.groupName === group.groupName);

    groups.push({
      tournamentID,
      groupName: group.groupName ?? '',
      id: groupEdit?.id ?? group.id,
      _version: groupEdit?._version
    });

    group.matches.forEach((match) => {
      const selectedMatch: Matches | null | undefined = allMatches?.find((matchTourney) => matchTourney?.id === match.matchID);

      const homeTeamParty: MatchParties | null | undefined = selectedMatch?.MatchParties?.items.find((party) => {
        if (party?.matchPartiesTeamId === match?.homeTeam?.value && party?.matchPartyPosition === MatchPartyPosition.HOME) {
          return true;
        };
        if ((party?.matchPartiesTeamId === null || party?.matchPartiesTeamId === undefined) && party?.matchPartyPosition === MatchPartyPosition.HOME) {
          return true;
        }
        return false;
      });
      const awayTeamParty: MatchParties | null | undefined = selectedMatch?.MatchParties?.items.find((party) => {
        if ((party?.matchPartiesTeamId === null || party?.matchPartiesTeamId === undefined) && party?.matchPartyPosition === MatchPartyPosition.AWAY) {
          return true;
        }
        if (party?.matchPartiesTeamId === match?.awayTeam?.value && party?.matchPartyPosition === MatchPartyPosition.AWAY) {
          return true;
        };
        return false;
      });
      const tfGroup: TFGroupMatches | null | undefined = groupEdit?.TFGroupMatches?.items.find((tfGro) => {
        const findMatch = tfGro?.Matches?.items.find((findM) => (findM?.id === match?.matchID));

        if (findMatch !== undefined && findMatch !== null) {
          return true;
        }
        return false;
      });

      const groupMatchID = tfGroup?.id ?? uuidv4();

      tfGroupMatchs.push({
        groupID: group.id,
        id: groupMatchID,
        _version: tfGroup?._version
      });
      matches.push({
        id: match.id,
        TFGroupMatches: groupMatchID,
        matchesFieldId: match.matchField?.extraData?.fieldID,
        beginTime: combineDateAndTime(match.startTime, match.startDate),
        matchDescription: match.matchDesc,
        _version: selectedMatch?._version
      });
      const homeTeamUUID = uuidv4();
      const awayTeamUUID = uuidv4();

      matchesParties.push({
        id: homeTeamParty?.id ?? homeTeamUUID,
        matchID: match.id,
        matchPartyPosition: MatchPartyPosition.HOME,
        matchPartiesTeamId: match.homeTeam?.value,
        _version: homeTeamParty?._version
      });
      matchesParties.push({
        id: awayTeamParty?.id ?? awayTeamUUID,
        matchID: match.id,
        matchPartyPosition: MatchPartyPosition.AWAY,
        matchPartiesTeamId: match.awayTeam?.value,
        _version: awayTeamParty?._version
      });

      match.matchField?.extraData?.lineReferees.forEach((referee) => {
        const findMatchesToReferres = selectedMatch?.MatchesToReferees?.items.find((ref) => (ref?.refereeRoleId === RefereeTypes.LINE_REFEREES && ref.contactID?.id === referee.value));
        matchesToReferees.push({
          id: uuidv4(),
          matchID: match.id,
          refereeRoleId: RefereeTypes.LINE_REFEREES,
          matchesToRefereesContactIDId: referee.value,
          _version: findMatchesToReferres?._version
        });
      });

      match.matchField?.extraData?.mainReferees.forEach((referee) => {
        const findMatchesToReferres = selectedMatch?.MatchesToReferees?.items.find((ref) => (ref?.refereeRoleId === RefereeTypes.MAIN_REFEREES && ref.contactID?.id === referee.value));
        matchesToReferees.push({
          id: uuidv4(),
          matchID: match.id,
          refereeRoleId: RefereeTypes.MAIN_REFEREES,
          matchesToRefereesContactIDId: referee.value,
          _version: findMatchesToReferres?._version
        });
      });
    });
  });

  return { tfGroupMatchs, matches, matchesParties, matchesToReferees, groups };
}

export async function createGameField (fieldInput: CreateFieldsInput): Promise<GraphQLQuery<CreateFieldsMutation> | undefined> {
  const { idToken } = await getCurrentSession();

  return await API.graphql<GraphQLQuery<CreateFieldsMutation>>({
    query: createFields,
    authToken: idToken,
    variables: {
      input: fieldInput
    }
  }).then((res) => {
    return res.data;
  });
};

export async function createTournamentRequest (
  tournamentForm: TournamentFormType,
  rules: TournamentRules[],
  tourney?: Tournaments,
  changedFormat: boolean = false,
  fieldDetailsChanged: boolean = false,
  ogTourney?: TournamentFormType,
  allFields?: Fields[]
): Promise<{ imageId?: string, tournamentId?: string } | undefined> {
  const tournamentId = tourney?.id ?? uuidv4();
  const { leagueName, leagueDesc, sportType, type, image, fieldsDetails, ...remaining } = tournamentForm;
  const { idToken } = await getCurrentSession();
  const TformatType = type;
  const formatRules = getTFormatRules(TformatType, rules);

  const tournamentRulesVariables = getTournamentRulesVariables(formatRules, remaining, fieldsDetails, tournamentId, tourney);
  const {
    tfGroupMatchs,
    matches,
    matchesParties,
    matchesToReferees,
    groups
  } = getGroupsInput(tournamentId, tournamentForm.groups, tourney);
  const tournamentImage = image !== undefined ? image[0] : undefined;
  let imageId: string | undefined;
  if (tournamentImage !== undefined) {
    const putResults = tourney === undefined ? await createS3StoragePhoto(uuidv4(), tournamentImage) : await updateS3StorageUser(tourney.tournamentImageId ?? uuidv4(), tournamentImage);
    imageId = putResults?.key;
  }

  const createTournament = {
    tournamentName: leagueName ?? '',
    tournamentImageId: imageId,
    tournamentDescription: leagueDesc ?? '',
    SportType: sportType,
    TournamentFormatType: type,
    id: tournamentId,
    _version: tourney?._version
  };

  return await API.graphql<GraphQLQuery<void>>({
    query: tournamentForm.id === undefined ? createTourney : updateTourney,
    authToken: idToken,
    variables: {
      input: {
        createTournament,
        tournamentRulesVariables,
        groups,
        matchesToReferees,
        matchesParties,
        matches,
        tfGroupMatchs,
        changedFormat,
        fieldDetailsChanged,
        originalTourney: tourney === undefined ? undefined : JSON.stringify(tourney)
      }
    }

  }).then(async (res) => {
    await updateFields(tournamentForm, ogTourney, allFields);

    return { imageId, tournamentId };
  });
};

export async function updateFields (
  tourneyForm?: TournamentFormType,
  ogTourneyForm?: TournamentFormType,
  allFields?: Fields[]
): Promise<GraphQLQuery<void> | void> {
  if (tourneyForm === undefined) return;
  if (ogTourneyForm === undefined) return;
  const fieldsNeedNameChange = tourneyForm.fieldsDetails?.filter((fieldA) => {
    const fieldsNeedChange = ogTourneyForm.fieldsDetails?.find((fieldB) => {
      return (fieldB.fieldID === fieldA.fieldID && fieldB.fieldName !== fieldA.fieldName);
    });
    return fieldsNeedChange !== undefined;
  });

  if (fieldsNeedNameChange === undefined || fieldsNeedNameChange.length === 0) return;
  const fieldsNeedChange = allFields?.filter((fields) => {
    const matchFields = fieldsNeedNameChange.find((fieldDetails) => fieldDetails.fieldID === fields.id);
    return matchFields !== undefined;
  });

  const FieldsInput: CreateFieldsInput[] | undefined = fieldsNeedChange?.map((input) => {
    const findNewName = fieldsNeedNameChange.find((fi) => fi.fieldID === input.id);
    return {
      _version: input._version,
      id: input.id,
      fieldName: findNewName?.fieldName ?? '',
      fieldLocation: input.fieldLocation
    };
  });
  const { idToken } = await getCurrentSession();

  await API.graphql<GraphQLQuery<void>>({
    authToken: idToken,
    query: updateFieldsMutation(FieldsInput)
  });
};

export async function listAllTournaments (): Promise<Tournaments[] | undefined> {
  const { idToken } = await getCurrentSession();
  return await API.graphql<GraphQLQuery<ListTournamentsQuery>>({
    query: customListTourney,
    authToken: idToken
  }).then((res) => res.data?.listTournaments?.items as unknown as Tournaments[]);
};

export async function getTourney (id?: string): Promise<CustomListTeamsFieldsReferees | undefined> {
  const { idToken } = await getCurrentSession();

  return await API.graphql<GraphQLQuery<CustomListTeamsFieldsReferees>>({
    query: getTourneyQuery(id),
    authToken: idToken,
    variables: {
      id
    }
  }).then((res) => {
    if (res.data?.listContacts === undefined || res.data?.listContacts?.items === undefined) return res.data;
    const allContacts = { ...res.data.listContacts };

    const contactsThatAreReferees = res.data?.listContacts?.items.filter((contact) => {
      if (contact?.ContactRoles?.items.length !== 0) {
        const role = contact?.ContactRoles?.items.filter((role) => role?.rolesID === '2');
        if (role?.length !== undefined && role?.length > 0) return true;
      }
      return false;
    });
    res.data.listContacts.items = contactsThatAreReferees;
    res.data.allContacts = allContacts;
    return res.data;
  });
};

export async function deleteTourneyRequest (id: string, _version: number): Promise<void> {
  const { idToken } = await getCurrentSession();
  const deleteTourneyInput: DeleteTournamentsInput = {
    id,
    _version
  };

  await API.graphql<GraphQLQuery<DeleteTournamentsInput>>({
    query: deleteTournaments,
    variables: { input: deleteTourneyInput },
    authToken: idToken
  }).then((res) => res.data);
};

// At the end of the update match request, return to me an object like: {groupIndex, matchIndex, teamInfo, playerWhoMov}
export async function updateMatchRequest (matchDetails: MatchDetails, form: TournamentFormType): Promise<boolean | undefined> {
  const { idToken } = await getCurrentSession();
  if (matchDetails.jsonMatch === undefined || matchDetails.jsonMatch === '') return;
  const apiMatch: Matches = JSON.parse(matchDetails.jsonMatch);
  const homePartyID = apiMatch.MatchParties?.items.find((party) => party?.matchPartyPosition === MatchPartyPosition.HOME)?.id;

  const awayPartyId = apiMatch.MatchParties?.items.find((party) => party?.matchPartyPosition === MatchPartyPosition.AWAY)?.id;

  const updateMatchesInput: UpdateMatchesInput = {
    id: apiMatch.id,
    _version: apiMatch._version,
    matchDescription: matchDetails.matchDesc,
    beginTime: combineDateAndTime(matchDetails.startTime, matchDetails.startDate),
    matchesFieldId: matchDetails.matchField?.value,
    endTime: matchDetails?.endDate?.toISOString()
  };

  if (matchDetails.endDate !== undefined || matchDetails.endDate !== '') {
    updateMatchesInput.endTime = matchDetails.endDate?.toISOString();
  };
  const allOldMatchPoints = apiMatch.MatchParties?.items.map((party) => party?.points?.items).flat() as MatchPartyPoints[];
  const removeOldMatchPointsMutation = deleteAllMatchPoints(allOldMatchPoints ?? []);
  const addNewMatchPartyPointsMutation = addNewmatchPoints(matchDetails, homePartyID, awayPartyId);

  await API.graphql<GraphQLQuery<void>>({
    authToken: idToken,
    query: updateMatches,
    variables: {
      input: updateMatchesInput
    }
  });

  if (removeOldMatchPointsMutation !== undefined) {
    await Promise.all(removeOldMatchPointsMutation.map(async (matchQuery) => {
      return await API.graphql<GraphQLQuery<void>>({
        authToken: idToken,
        query: matchQuery
      });
    }));
  }

  if (addNewMatchPartyPointsMutation !== undefined) {
    await Promise.all(addNewMatchPartyPointsMutation.map(async (matchQuery) => {
      return await API.graphql<GraphQLQuery<void>>({
        authToken: idToken,
        query: matchQuery
      });
    }));
  }

  if (matchDetails.endDate !== undefined && matchDetails.endDate !== null && new Date(matchDetails.endDate).toString() !== 'Invalid Time') {
    const allMatches: Matches[] = JSON.parse(form.allTourneyInfo ?? '');
    const teamWhoWon = (matchDetails?.homeTeamScore?.length ?? 0) >= (matchDetails?.awayTeamScore?.length ?? 0) ? matchDetails.homeTeam : matchDetails.awayTeam;
    const whoWon = (matchDetails?.homeTeamScore?.length ?? 0) >= (matchDetails?.awayTeamScore?.length ?? 0) ? MatchPartyPosition.HOME : MatchPartyPosition.AWAY;
    let matchIndexAtGroup = 0;
    const currentGroupIndex = form.groups?.findIndex((group) => {
      const matchIndex = group.matches.find((mat, index) => {
        if (mat.id === matchDetails.id) {
          matchIndexAtGroup = index;
          return true;
        }
        return false;
      });
      if (matchIndex !== undefined) {
        return true;
      };
      return false;
    });

    let nextMatch: MatchDetails | undefined;
    let matchAPI: Matches | undefined;
    const currentGroup = form.groups?.[currentGroupIndex ?? 0];

    let nextParty = matchAPI?.MatchParties?.items.find((party) => party?.matchPartyPosition === whoWon);
    if (!/Groups./.test(currentGroup?.groupName ?? '')) {
      const nextGroup = form.groups?.[Number(currentGroupIndex) + 1];

      if (nextGroup === undefined) {
        return await API.graphql<GraphQLQuery<void>>({
          authToken: idToken,
          query: updateTournaments,
          variables: {
            input: {
              id: form.id,
              haveEnded: true,
              _version: form._version
            }
          }
        }).then((res) => true);
      };

      const nextMatchIndex = Math.floor((matchIndexAtGroup / (form?.groups?.[currentGroupIndex ?? 0]?.matches?.length ?? 1)) * (nextGroup?.matches.length ?? 1));
      nextMatch = nextGroup?.matches?.[nextMatchIndex];

      matchAPI = allMatches.find((match) => match.id === nextMatch?.id);

      nextParty = matchAPI?.MatchParties?.items.find((party) => party?.matchPartiesTeamId === null || party?.matchPartiesTeamId === undefined);

      if (nextParty === undefined) {
        nextParty = matchAPI?.MatchParties?.items.find((party) => party?.matchPartyPosition === whoWon);
      }
    } else {
      const isAllMatchesInGroupStageDone = form.groups?.[currentGroupIndex ?? 0].matches.every((match) => (match.endDate !== undefined && match.endDate !== null && new Date(match.endDate).toString() !== 'Invalid Time'));
      if (isAllMatchesInGroupStageDone !== true) {
        return;
      }

      const whoQualifes = form.placementQualifier === 'TOP_1' ? 1 : 2;
      const allTeamsScores = currentGroup?.teams.map((team) => {
        const matchesPlayed = currentGroup.matches.filter((match) => (match.awayTeam?.value ?? '') === team.value || match.homeTeam?.value === team.value);
        let allTeamScores = 0;
        matchesPlayed.forEach((match) => {
          if ((match.awayTeam?.value ?? '') === team.value) {
            allTeamScores = allTeamScores + Number(match.awayTeamScore?.length);
          }
          if (match.homeTeam?.value === team.value) {
            allTeamScores = allTeamScores + Number(match.homeTeamScore?.length);
          }
        });

        return {
          teamId: team.value,
          totalScores: allTeamScores
        };
      });

      const sortedTeams = allTeamsScores?.sort((arr1, arr2) => (arr1.totalScores - arr2.totalScores));
      const teamsWhoQualify = sortedTeams?.slice(0, whoQualifes);
      const groupsWithoutGroupStage = sortGroupsDependingOnTourneyType(form.groups?.filter((group) => !/Groups./.test(group?.groupName ?? '')) ?? [], TournamentFormatType.ROUNDROBIN);
      const allMatchesInNextGroup = groupsWithoutGroupStage[0].matches.map((match) => match.id);
      const allMatchPartiesInNextGroup = allMatches.filter((match) => allMatchesInNextGroup.includes(match.id)).map((matchX) => matchX?.MatchParties?.items).flat();
      const updatedMatchParties = teamsWhoQualify?.map((team) => {
        const matchParty = allMatchPartiesInNextGroup.find((matchParty) => matchParty?.matchPartiesTeamId === null);
        return {
          id: matchParty?.id ?? '',
          _version: matchParty?._version ?? 1,
          matchPartiesTeamId: team?.teamId
        };
      });
      if (updatedMatchParties !== undefined) {
        return await Promise.all(updatedMatchParties?.map(async (input) => {
          return await API.graphql<GraphQLQuery<void>>({
            authToken: idToken,
            query: updateMatchParties,
            variables: {
              input
            }
          });
        })).then((res) => true);
      }
      return;
    };

    const matchPartyInput: UpdateMatchPartiesInput = {
      id: nextParty?.id ?? '',
      _version: nextParty?._version ?? 1,
      matchPartiesTeamId: teamWhoWon?.value
    };

    return await API.graphql<GraphQLQuery<void>>({
      authToken: idToken,
      query: updateMatchParties,
      variables: {
        input: matchPartyInput
      }
    }).then(() => true);
  };
};

export const updateTournament = async (tournamentData: updateTournamentMutationInput): Promise<GraphQLResult<any>> => {
  const { idToken } = await getCurrentSession();

  return await API.graphql<GraphQLQuery<void>>({
    authToken: idToken,
    query: updateTournamentMutation,
    variables: { input: tournamentData }
  });
};
