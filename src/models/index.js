// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MeasurementUnitTypes = {
  "METRIC": "METRIC",
  "IMPERIAL": "IMPERIAL"
};

const GenderTypes = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "OTHER": "OTHER"
};

const SoccerExperienceLevelTypes = {
  "BEGINNER": "BEGINNER",
  "INTERMEDIATE": "INTERMEDIATE",
  "ADVANCED": "ADVANCED"
};

const SoccerPositionTypes = {
  "GOALKEEPER": "GOALKEEPER",
  "RIGHT_BACK": "RIGHT_BACK",
  "CENTER_BACK": "CENTER_BACK",
  "LEFT_BACK": "LEFT_BACK",
  "SWEEPER": "SWEEPER",
  "RIGHT_MIDFIELDER": "RIGHT_MIDFIELDER",
  "LEFT_MIDFIELDER": "LEFT_MIDFIELDER",
  "CENTRAL_MIDFIELDER": "CENTRAL_MIDFIELDER",
  "RIGHT_FORWARD": "RIGHT_FORWARD",
  "LEFT_FORWARD": "LEFT_FORWARD",
  "STRIKER": "STRIKER"
};

const FootPreferenceTypes = {
  "LEFT": "LEFT",
  "RIGHT": "RIGHT",
  "BOTH": "BOTH"
};

const RoleTypes = {
  "INTERNAL_ADMIN": "INTERNAL_ADMIN",
  "ADMIN": "ADMIN",
  "REFEREE": "REFEREE"
};

const MatchPartyPosition = {
  "HOME": "HOME",
  "AWAY": "AWAY"
};

const RefereeTypes = {
  "MAIN_REFEREES": "MAIN_REFEREES",
  "LINE_REFEREES": "LINE_REFEREES"
};

const SportType = {
  "SOCCER": "SOCCER"
};

const TournamentFormatType = {
  "ROUNDROBIN": "ROUNDROBIN",
  "SINGLE_ELIMINATION": "SINGLE_ELIMINATION"
};

const ModelSortDirection = {
  "ASC": "ASC",
  "DESC": "DESC"
};

const { TeamPlayers, Teams, PersonPreferences, ContactAddresses, ContactEmails, PlayerPositions, PlayerSoccerSkills, Contacts, RefereeInformation, ContactRoles, Role, Policy, Resource, Action, BusinessAddresses, Businesses, Fields, Tournaments, Matches, MatchParties, MatchPartyPoints, MatchesToReferees, Divisions, TeamsToDivisions, TFGroups, TFGroupMatches, TFToSports, TournamentRules, TournamentRulesVariables, TRulesToTFormat } = initSchema(schema);

export {
  TeamPlayers,
  Teams,
  PersonPreferences,
  ContactAddresses,
  ContactEmails,
  PlayerPositions,
  PlayerSoccerSkills,
  Contacts,
  RefereeInformation,
  ContactRoles,
  Role,
  Policy,
  Resource,
  Action,
  BusinessAddresses,
  Businesses,
  Fields,
  Tournaments,
  Matches,
  MatchParties,
  MatchPartyPoints,
  MatchesToReferees,
  Divisions,
  TeamsToDivisions,
  TFGroups,
  TFGroupMatches,
  TFToSports,
  TournamentRules,
  TournamentRulesVariables,
  TRulesToTFormat,
  MeasurementUnitTypes,
  GenderTypes,
  SoccerExperienceLevelTypes,
  SoccerPositionTypes,
  FootPreferenceTypes,
  RoleTypes,
  MatchPartyPosition,
  RefereeTypes,
  SportType,
  TournamentFormatType,
  ModelSortDirection
};