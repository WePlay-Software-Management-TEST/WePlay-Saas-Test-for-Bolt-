import { type PlayersOptions, type Option, type TeamsOptions } from 'core/models/input.model';
export const LeagueTypes = ['ROUNDROBIN', 'SINGLE_ELIMINATION'] as const;
type LeagueType = typeof LeagueTypes[number];

export const supportedSports = ['SOCCER'] as const;
type SupportedSportsType = typeof supportedSports[number];

export const PlacementQualifierTypes = ['TOP_1', 'TOP_2'] as const;
type PlacementQualifierType = typeof PlacementQualifierTypes[number];

export const PlaysWithEachOtherTypes = ['ONCE', 'TWICE'] as const;
type PlaysWithEachOtherType = typeof PlaysWithEachOtherTypes[number];

export const EachGroupNumbers = [3, 4] as const;
type EachGroupNumbersType = typeof EachGroupNumbers[number];

export const divisionTypes = ['MEN_30+', 'MEN_30U', 'BOYS_18U', 'WOMEN_30+', 'WOMEN_30U', 'GIRLS_18U', 'COED_30+', 'COED_30U', 'COED_18U'] as const;
type DivisionTypes = typeof divisionTypes[number];

export const dailyMatchesByField = ['AUTO', '1_MATCH', '2_MATCHES', '3_MATCHES', '4_MATCHES', '5_MATCHES'] as const;
export type DailyMatchesByFieldTypes = typeof dailyMatchesByField[number];

export const matchDuration = ['15', '20', '25', '30', '35', '40', '45'] as const;
export type matchDurationTypes = typeof matchDuration[number];

export const weekDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'] as const;
export type weekDaysTypes = typeof weekDays[number];

export interface FieldFormType {
  fieldName: string
  matchesPerDay: DailyMatchesByFieldTypes | null
  assignMechanism: 'MANUAL' | 'AUTO'
  mainReferees: Array<Option<PlayersOptions>>
  lineReferees: Array<Option<PlayersOptions>>
  id?: string
  fieldID: string
  location?: string
}
export interface FieldsDetailsForm {
  fieldsDetails: FieldFormType[]
}
export interface FieldFormModel {
  fieldName: Option<void>
  location: string
}

export interface MatchDetails {
  id: string
  matchID?: string
  homeTeam?: Option<TeamsOptions> | null
  awayTeam?: Option<TeamsOptions> | null
  startDate: Date | null
  startTime: Date | null | string
  matchField?: Option<FieldFormType> | null
  matchDesc: string | null
  awayTeamImg?: string
  homeTeamImg?: string
  won?: string
  userEdited?: boolean
  homeTeamScore?: Array<Option<PlayersOptions>>
  homeTeamPlayers?: Array<Option<PlayersOptions>>
  awayTeamPlayers?: Array<Option<PlayersOptions>>
  awayTeamScore?: Array<Option<PlayersOptions>>
  endDate?: Date
  jsonMatch?: string
  matchIsDone?: boolean
}

export interface MatchDateSlot {
  startDateTime: Date
  Field: FieldFormType
  taken: boolean
  id: string
}
export interface Group {
  teams: Array<Option<TeamsOptions>>
  matches: MatchDetails[]
  groupName?: string
  id: string
}
export interface TournamentScheduleForm {
  groups: Group[]
}
export interface TournamentTypeForm {
  type: LeagueType | null
  placementQualifier: PlacementQualifierType | null
  groupTeams: EachGroupNumbersType | null
  teamPlayWithEach: PlaysWithEachOtherType | null
  numOfTeams: number | null
}

export interface TournamentDetailsForm {
  image: File[]
  leagueName: string
  leagueDesc: string
};

export interface LeagueFormType {
  image: File[]
  leagueName: string
  leagueDesc: string
}

export interface TournamentExtraDetailsForm {
  sportType: SupportedSportsType
  division: DivisionTypes | null
  numOfFields: number | null
  startDate: Date | null
  finishDate: Date | null
  startTime: string | null
  endTime: string | null
  dailyMatchesByField: DailyMatchesByFieldTypes | null
  matchesDuration: matchDurationTypes | null
  daysOfMatches: weekDaysTypes[] | null
  teamsList: Array<Option<TeamsOptions>>
}

export const MapDaysToIndex = new Map<number, string>([
  [0, 'SUNDAY'],
  [1, 'MONDAY'],
  [2, 'TUESDAY'],
  [3, 'WEDNESDAY'],
  [4, 'THURSDAY'],
  [5, 'FRIDAY'],
  [6, 'SATURDAY']
]);

export type TournamentFormType = Partial<TournamentExtraDetailsForm & TournamentDetailsForm & TournamentTypeForm & TournamentScheduleForm & FieldsDetailsForm & {
  id?: string
  reGenTourney?: boolean
  allTourneyInfo?: string
  tourneyEnded?: boolean
  teamWhoWon?: Option<TeamsOptions>
  _version?: number | null
}>;

export const dailyMatchesByFieldOptions = ['AUTO', '1_MATCH', '2_MATCHES', '3_MATCHES', '4_MATCHES', '5_MATCHES'];
