import { type TournamentRulesVariables } from 'API';
import { type TournamentTypeForm, type TournamentDetailsForm, type TournamentExtraDetailsForm, type FieldFormModel, type TournamentFormType, type LeagueFormType } from './tournamentForm.model';

export const fieldFormDefaults: FieldFormModel = {
  fieldName: {
    label: '',
    value: ''
  },
  location: ''
};

export const tournamentDetailsForm: TournamentDetailsForm = {
  image: [],
  leagueName: '',
  leagueDesc: ''
};

export const tournamentTypeFormDefaults: TournamentTypeForm = {
  type: null,
  placementQualifier: 'TOP_1',
  groupTeams: null,
  teamPlayWithEach: 'ONCE',
  numOfTeams: null
};

export const tournamentExtraDetailsDefaults: TournamentExtraDetailsForm = {
  sportType: 'SOCCER',
  division: null,
  numOfFields: null,
  startDate: new Date(),
  finishDate: null,
  startTime: '12:30',
  endTime: null,
  dailyMatchesByField: 'AUTO',
  matchesDuration: '45',
  daysOfMatches: null,
  teamsList: []
};

export const DefaultLeagueForm: LeagueFormType = {
  image: [],
  leagueName: '',
  leagueDesc: ''
};

export const tournamentRulesMap = new Map([
  ['numOfFields', '88651982-862f-4ee3-bb2e-588add5fbfd6'],
  ['startDate', '9c542448-818b-44f6-807d-28ef431642cd'],
  ['finishDate', 'f6e6b93b-d1e3-440b-84c8-ff6d9673e06b'],
  ['startTime', '4495f7e9-867e-40a8-9a20-eb791ff91001'],
  ['endTime', 'b41fc823-e804-47cf-980d-4d5fd20d304e'],
  ['dailyMatchesByField', 'b49aaa8e-1daf-449a-9690-426dac6b5849'],
  ['matchesDuration', '45c478c6-7578-4747-add6-4ee35c0ba4f6'],
  ['daysOfMatches', 'f7247d21-b6f0-4c78-aae7-50251d3a6ebc'],
  ['byFieldDaysOfMatches', 'd24e3083-c8b4-438e-b1d0-fa53e9c7e2e6'],
  ['placementQualifier', '655981e0-559f-4434-8b47-e08a947618b2'],
  ['groupTeams', '8e382f33-66f3-4b86-aafd-17a21379607e'],
  ['teamPlayWithEach', 'a0fc5b97-197e-4ea6-a1a8-aa41e4d77b1a'],
  ['numOfTeams', 'f2813385-2dfb-4521-9a32-3f0d9ed4e39a'],
  ['division', '72ac6a21-e899-4be0-b2ea-019c635b2adb']
]);

export function getKeyFromValueMap (map: Map<string, string> = tournamentRulesMap, searchValue: string): string | undefined {
  for (const [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
  return undefined;
};

const knownRulesVar = [
  'numOfTeams', 'dailyMatchesByField', 'daysOfMatches', 'groups',
  'groupTeams', 'placementQualifier', 'teamPlayWithEach', 'startDate', 'startTime', 'endTime',
  'finishDate', 'division', 'teamsList', 'fieldsDetails', 'numOfFields', 'matchesDuration'];
export function getRulesVariables (rulesVars?: Array<TournamentRulesVariables | null>): TournamentFormType {
  const formTourney: TournamentFormType = {};

  rulesVars?.forEach((ruleVar) => {
    const rule = knownRulesVar.find((ruleKey) => {
      const ruleid = tournamentRulesMap.get(ruleKey);
      if (ruleid === ruleVar?.ruleID) return true;
      return false;
    });
    if (rule === undefined) return;

    const variables = JSON.parse(ruleVar?.ruleVariables ?? '')[rule];
    const isVariableDate: Date = new Date(variables);
    const isVariableNumber = Number(variables);
    if (isVariableDate.toString() === 'Invalid Date' || !isNaN(isVariableNumber)) {
      formTourney[rule as unknown as keyof TournamentFormType] = variables;
    } else {
      formTourney[rule as unknown as keyof TournamentFormType] = isVariableDate as any;
    }
  });
  return formTourney;
};
