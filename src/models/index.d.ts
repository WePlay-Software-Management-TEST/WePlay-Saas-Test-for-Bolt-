import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum MeasurementUnitTypes {
  METRIC = "METRIC",
  IMPERIAL = "IMPERIAL"
}

export enum GenderTypes {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

export enum SoccerExperienceLevelTypes {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED"
}

export enum SoccerPositionTypes {
  GOALKEEPER = "GOALKEEPER",
  RIGHT_BACK = "RIGHT_BACK",
  CENTER_BACK = "CENTER_BACK",
  LEFT_BACK = "LEFT_BACK",
  SWEEPER = "SWEEPER",
  RIGHT_MIDFIELDER = "RIGHT_MIDFIELDER",
  LEFT_MIDFIELDER = "LEFT_MIDFIELDER",
  CENTRAL_MIDFIELDER = "CENTRAL_MIDFIELDER",
  RIGHT_FORWARD = "RIGHT_FORWARD",
  LEFT_FORWARD = "LEFT_FORWARD",
  STRIKER = "STRIKER"
}

export enum FootPreferenceTypes {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  BOTH = "BOTH"
}

export enum RoleTypes {
  INTERNAL_ADMIN = "INTERNAL_ADMIN",
  ADMIN = "ADMIN",
  REFEREE = "REFEREE"
}

export enum MatchPartyPosition {
  HOME = "HOME",
  AWAY = "AWAY"
}

export enum RefereeTypes {
  MAIN_REFEREES = "MAIN_REFEREES",
  LINE_REFEREES = "LINE_REFEREES"
}

export enum SportType {
  SOCCER = "SOCCER"
}

export enum TournamentFormatType {
  ROUNDROBIN = "ROUNDROBIN",
  SINGLE_ELIMINATION = "SINGLE_ELIMINATION"
}

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}



type EagerTeamPlayers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TeamPlayers, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly contactsID: string;
  readonly teamsID: string;
  readonly IsCaptain: boolean;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeamPlayers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TeamPlayers, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly contactsID: string;
  readonly teamsID: string;
  readonly IsCaptain: boolean;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TeamPlayers = LazyLoading extends LazyLoadingDisabled ? EagerTeamPlayers : LazyTeamPlayers

export declare const TeamPlayers: (new (init: ModelInit<TeamPlayers>) => TeamPlayers) & {
  copyOf(source: TeamPlayers, mutator: (draft: MutableModel<TeamPlayers>) => MutableModel<TeamPlayers> | void): TeamPlayers;
}

type EagerTeams = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Teams, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly TeamName: string;
  readonly Description?: string | null;
  readonly PhotoId?: string | null;
  readonly City?: string | null;
  readonly County?: string | null;
  readonly State?: string | null;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly TeamPlayers?: (TeamPlayers | null)[] | null;
  readonly TeamsToDivisions?: (TeamsToDivisions | null)[] | null;
  readonly SportType?: SportType | keyof typeof SportType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeams = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Teams, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly TeamName: string;
  readonly Description?: string | null;
  readonly PhotoId?: string | null;
  readonly City?: string | null;
  readonly County?: string | null;
  readonly State?: string | null;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly TeamPlayers: AsyncCollection<TeamPlayers>;
  readonly TeamsToDivisions: AsyncCollection<TeamsToDivisions>;
  readonly SportType?: SportType | keyof typeof SportType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Teams = LazyLoading extends LazyLoadingDisabled ? EagerTeams : LazyTeams

export declare const Teams: (new (init: ModelInit<Teams>) => Teams) & {
  copyOf(source: Teams, mutator: (draft: MutableModel<Teams>) => MutableModel<Teams> | void): Teams;
}

type EagerPersonPreferences = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonPreferences, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly LengthUnit?: MeasurementUnitTypes | keyof typeof MeasurementUnitTypes | null;
  readonly WeightUnit?: MeasurementUnitTypes | keyof typeof MeasurementUnitTypes | null;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPersonPreferences = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonPreferences, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly LengthUnit?: MeasurementUnitTypes | keyof typeof MeasurementUnitTypes | null;
  readonly WeightUnit?: MeasurementUnitTypes | keyof typeof MeasurementUnitTypes | null;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PersonPreferences = LazyLoading extends LazyLoadingDisabled ? EagerPersonPreferences : LazyPersonPreferences

export declare const PersonPreferences: (new (init: ModelInit<PersonPreferences>) => PersonPreferences) & {
  copyOf(source: PersonPreferences, mutator: (draft: MutableModel<PersonPreferences>) => MutableModel<PersonPreferences> | void): PersonPreferences;
}

type EagerContactAddresses = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContactAddresses, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly City?: string | null;
  readonly State?: string | null;
  readonly PostalCode?: string | null;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly contactsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyContactAddresses = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContactAddresses, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly City?: string | null;
  readonly State?: string | null;
  readonly PostalCode?: string | null;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly contactsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ContactAddresses = LazyLoading extends LazyLoadingDisabled ? EagerContactAddresses : LazyContactAddresses

export declare const ContactAddresses: (new (init: ModelInit<ContactAddresses>) => ContactAddresses) & {
  copyOf(source: ContactAddresses, mutator: (draft: MutableModel<ContactAddresses>) => MutableModel<ContactAddresses> | void): ContactAddresses;
}

type EagerContactEmails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContactEmails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Email?: string | null;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly contactsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyContactEmails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContactEmails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Email?: string | null;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly contactsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ContactEmails = LazyLoading extends LazyLoadingDisabled ? EagerContactEmails : LazyContactEmails

export declare const ContactEmails: (new (init: ModelInit<ContactEmails>) => ContactEmails) & {
  copyOf(source: ContactEmails, mutator: (draft: MutableModel<ContactEmails>) => MutableModel<ContactEmails> | void): ContactEmails;
}

type EagerPlayerPositions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlayerPositions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly businessesID?: string | null;
  readonly Position?: SoccerPositionTypes | keyof typeof SoccerPositionTypes | null;
  readonly owner?: string | null;
  readonly playersoccerskillsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlayerPositions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlayerPositions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly businessesID?: string | null;
  readonly Position?: SoccerPositionTypes | keyof typeof SoccerPositionTypes | null;
  readonly owner?: string | null;
  readonly playersoccerskillsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PlayerPositions = LazyLoading extends LazyLoadingDisabled ? EagerPlayerPositions : LazyPlayerPositions

export declare const PlayerPositions: (new (init: ModelInit<PlayerPositions>) => PlayerPositions) & {
  copyOf(source: PlayerPositions, mutator: (draft: MutableModel<PlayerPositions>) => MutableModel<PlayerPositions> | void): PlayerPositions;
}

type EagerPlayerSoccerSkills = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlayerSoccerSkills, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly LeftRightFooted?: FootPreferenceTypes | keyof typeof FootPreferenceTypes | null;
  readonly PlayerPositions?: (PlayerPositions | null)[] | null;
  readonly ExperienceLevel?: SoccerExperienceLevelTypes | keyof typeof SoccerExperienceLevelTypes | null;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlayerSoccerSkills = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlayerSoccerSkills, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly LeftRightFooted?: FootPreferenceTypes | keyof typeof FootPreferenceTypes | null;
  readonly PlayerPositions: AsyncCollection<PlayerPositions>;
  readonly ExperienceLevel?: SoccerExperienceLevelTypes | keyof typeof SoccerExperienceLevelTypes | null;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PlayerSoccerSkills = LazyLoading extends LazyLoadingDisabled ? EagerPlayerSoccerSkills : LazyPlayerSoccerSkills

export declare const PlayerSoccerSkills: (new (init: ModelInit<PlayerSoccerSkills>) => PlayerSoccerSkills) & {
  copyOf(source: PlayerSoccerSkills, mutator: (draft: MutableModel<PlayerSoccerSkills>) => MutableModel<PlayerSoccerSkills> | void): PlayerSoccerSkills;
}

type EagerContacts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Contacts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly FirstName: string;
  readonly LastName?: string | null;
  readonly businessesID: string;
  readonly Height?: number | null;
  readonly Weight?: number | null;
  readonly Birthdate?: string | null;
  readonly Gender?: GenderTypes | keyof typeof GenderTypes | null;
  readonly ContactEmails?: (ContactEmails | null)[] | null;
  readonly Biography?: string | null;
  readonly PhotoId?: string | null;
  readonly owner?: string | null;
  readonly ContactAddresses?: (ContactAddresses | null)[] | null;
  readonly PersonPreferences?: PersonPreferences | null;
  readonly PlayerSoccerSkills?: PlayerSoccerSkills | null;
  readonly RefereeInformation?: RefereeInformation | null;
  readonly TeamPlayers?: (TeamPlayers | null)[] | null;
  readonly ContactRoles?: (ContactRoles | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly contactsPersonPreferencesId?: string | null;
  readonly contactsPlayerSoccerSkillsId?: string | null;
  readonly contactsRefereeInformationId?: string | null;
}

type LazyContacts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Contacts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly FirstName: string;
  readonly LastName?: string | null;
  readonly businessesID: string;
  readonly Height?: number | null;
  readonly Weight?: number | null;
  readonly Birthdate?: string | null;
  readonly Gender?: GenderTypes | keyof typeof GenderTypes | null;
  readonly ContactEmails: AsyncCollection<ContactEmails>;
  readonly Biography?: string | null;
  readonly PhotoId?: string | null;
  readonly owner?: string | null;
  readonly ContactAddresses: AsyncCollection<ContactAddresses>;
  readonly PersonPreferences: AsyncItem<PersonPreferences | undefined>;
  readonly PlayerSoccerSkills: AsyncItem<PlayerSoccerSkills | undefined>;
  readonly RefereeInformation: AsyncItem<RefereeInformation | undefined>;
  readonly TeamPlayers: AsyncCollection<TeamPlayers>;
  readonly ContactRoles: AsyncCollection<ContactRoles>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly contactsPersonPreferencesId?: string | null;
  readonly contactsPlayerSoccerSkillsId?: string | null;
  readonly contactsRefereeInformationId?: string | null;
}

export declare type Contacts = LazyLoading extends LazyLoadingDisabled ? EagerContacts : LazyContacts

export declare const Contacts: (new (init: ModelInit<Contacts>) => Contacts) & {
  copyOf(source: Contacts, mutator: (draft: MutableModel<Contacts>) => MutableModel<Contacts> | void): Contacts;
}

type EagerRefereeInformation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RefereeInformation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly yearsOfExperience?: string | null;
  readonly isCertified?: boolean | null;
  readonly hasDoneBackgroundCheck?: boolean | null;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRefereeInformation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RefereeInformation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly yearsOfExperience?: string | null;
  readonly isCertified?: boolean | null;
  readonly hasDoneBackgroundCheck?: boolean | null;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RefereeInformation = LazyLoading extends LazyLoadingDisabled ? EagerRefereeInformation : LazyRefereeInformation

export declare const RefereeInformation: (new (init: ModelInit<RefereeInformation>) => RefereeInformation) & {
  copyOf(source: RefereeInformation, mutator: (draft: MutableModel<RefereeInformation>) => MutableModel<RefereeInformation> | void): RefereeInformation;
}

type EagerContactRoles = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContactRoles, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly contactsID: string;
  readonly rolesID: string;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyContactRoles = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContactRoles, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly contactsID: string;
  readonly rolesID: string;
  readonly businessesID?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ContactRoles = LazyLoading extends LazyLoadingDisabled ? EagerContactRoles : LazyContactRoles

export declare const ContactRoles: (new (init: ModelInit<ContactRoles>) => ContactRoles) & {
  copyOf(source: ContactRoles, mutator: (draft: MutableModel<ContactRoles>) => MutableModel<ContactRoles> | void): ContactRoles;
}

type EagerRole = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Role, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly RoleName: RoleTypes | keyof typeof RoleTypes;
  readonly Precedence: number;
  readonly Description?: string | null;
  readonly businessesID?: string | null;
  readonly ContactRoles?: (ContactRoles | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRole = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Role, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly RoleName: RoleTypes | keyof typeof RoleTypes;
  readonly Precedence: number;
  readonly Description?: string | null;
  readonly businessesID?: string | null;
  readonly ContactRoles: AsyncCollection<ContactRoles>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Role = LazyLoading extends LazyLoadingDisabled ? EagerRole : LazyRole

export declare const Role: (new (init: ModelInit<Role>) => Role) & {
  copyOf(source: Role, mutator: (draft: MutableModel<Role>) => MutableModel<Role> | void): Role;
}

type EagerPolicy = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Policy, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Role: Role;
  readonly Action: Action;
  readonly Resource: Resource;
  readonly DeniedFields?: (string | null)[] | null;
  readonly OnlyOnOwn?: boolean | null;
  readonly Description?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly policyRoleId: string;
  readonly policyActionId: string;
  readonly policyResourceId: string;
}

type LazyPolicy = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Policy, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Role: AsyncItem<Role>;
  readonly Action: AsyncItem<Action>;
  readonly Resource: AsyncItem<Resource>;
  readonly DeniedFields?: (string | null)[] | null;
  readonly OnlyOnOwn?: boolean | null;
  readonly Description?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly policyRoleId: string;
  readonly policyActionId: string;
  readonly policyResourceId: string;
}

export declare type Policy = LazyLoading extends LazyLoadingDisabled ? EagerPolicy : LazyPolicy

export declare const Policy: (new (init: ModelInit<Policy>) => Policy) & {
  copyOf(source: Policy, mutator: (draft: MutableModel<Policy>) => MutableModel<Policy> | void): Policy;
}

type EagerResource = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Resource, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ResourceName: string;
  readonly Description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyResource = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Resource, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ResourceName: string;
  readonly Description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Resource = LazyLoading extends LazyLoadingDisabled ? EagerResource : LazyResource

export declare const Resource: (new (init: ModelInit<Resource>) => Resource) & {
  copyOf(source: Resource, mutator: (draft: MutableModel<Resource>) => MutableModel<Resource> | void): Resource;
}

type EagerAction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Action, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly actionName: string;
  readonly Description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Action, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly actionName: string;
  readonly Description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Action = LazyLoading extends LazyLoadingDisabled ? EagerAction : LazyAction

export declare const Action: (new (init: ModelInit<Action>) => Action) & {
  copyOf(source: Action, mutator: (draft: MutableModel<Action>) => MutableModel<Action> | void): Action;
}

type EagerBusinessAddresses = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BusinessAddresses, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly StreetAddress: string;
  readonly StreetAddress2?: string | null;
  readonly City: string;
  readonly State?: string | null;
  readonly PostalCode?: string | null;
  readonly Country: string;
  readonly businessesID: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBusinessAddresses = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BusinessAddresses, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly StreetAddress: string;
  readonly StreetAddress2?: string | null;
  readonly City: string;
  readonly State?: string | null;
  readonly PostalCode?: string | null;
  readonly Country: string;
  readonly businessesID: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BusinessAddresses = LazyLoading extends LazyLoadingDisabled ? EagerBusinessAddresses : LazyBusinessAddresses

export declare const BusinessAddresses: (new (init: ModelInit<BusinessAddresses>) => BusinessAddresses) & {
  copyOf(source: BusinessAddresses, mutator: (draft: MutableModel<BusinessAddresses>) => MutableModel<BusinessAddresses> | void): BusinessAddresses;
}

type EagerBusinesses = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Businesses, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly BusinessName: string;
  readonly BusinessSize?: string | null;
  readonly Contacts?: (BusinessAddresses | null)[] | null;
  readonly BusinessAddresses?: (BusinessAddresses | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBusinesses = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Businesses, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly BusinessName: string;
  readonly BusinessSize?: string | null;
  readonly Contacts: AsyncCollection<BusinessAddresses>;
  readonly BusinessAddresses: AsyncCollection<BusinessAddresses>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Businesses = LazyLoading extends LazyLoadingDisabled ? EagerBusinesses : LazyBusinesses

export declare const Businesses: (new (init: ModelInit<Businesses>) => Businesses) & {
  copyOf(source: Businesses, mutator: (draft: MutableModel<Businesses>) => MutableModel<Businesses> | void): Businesses;
}

type EagerFields = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Fields, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fieldName: string;
  readonly fieldLocation: string;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFields = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Fields, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fieldName: string;
  readonly fieldLocation: string;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Fields = LazyLoading extends LazyLoadingDisabled ? EagerFields : LazyFields

export declare const Fields: (new (init: ModelInit<Fields>) => Fields) & {
  copyOf(source: Fields, mutator: (draft: MutableModel<Fields>) => MutableModel<Fields> | void): Fields;
}

type EagerTournaments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tournaments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly businessesID?: string | null;
  readonly tournamentName: string;
  readonly tournamentImageId?: string | null;
  readonly tournamentDescription?: string | null;
  readonly customRules?: string | null;
  readonly TFGroups?: (TFGroups | null)[] | null;
  readonly SportType?: SportType | keyof typeof SportType | null;
  readonly TournamentFormatType?: TournamentFormatType | keyof typeof TournamentFormatType | null;
  readonly TournamentRulesVariables?: (TournamentRulesVariables | null)[] | null;
  readonly haveEnded?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTournaments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tournaments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly businessesID?: string | null;
  readonly tournamentName: string;
  readonly tournamentImageId?: string | null;
  readonly tournamentDescription?: string | null;
  readonly customRules?: string | null;
  readonly TFGroups: AsyncCollection<TFGroups>;
  readonly SportType?: SportType | keyof typeof SportType | null;
  readonly TournamentFormatType?: TournamentFormatType | keyof typeof TournamentFormatType | null;
  readonly TournamentRulesVariables: AsyncCollection<TournamentRulesVariables>;
  readonly haveEnded?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Tournaments = LazyLoading extends LazyLoadingDisabled ? EagerTournaments : LazyTournaments

export declare const Tournaments: (new (init: ModelInit<Tournaments>) => Tournaments) & {
  copyOf(source: Tournaments, mutator: (draft: MutableModel<Tournaments>) => MutableModel<Tournaments> | void): Tournaments;
}

type EagerMatches = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Matches, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly beginTime?: string | null;
  readonly matchDescription?: string | null;
  readonly MatchParties?: (MatchParties | null)[] | null;
  readonly owner?: string | null;
  readonly Field?: Fields | null;
  readonly MatchesToReferees?: (MatchesToReferees | null)[] | null;
  readonly businessesID?: string | null;
  readonly TFGroupMatches?: string | null;
  readonly endTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchesFieldId?: string | null;
}

type LazyMatches = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Matches, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly beginTime?: string | null;
  readonly matchDescription?: string | null;
  readonly MatchParties: AsyncCollection<MatchParties>;
  readonly owner?: string | null;
  readonly Field: AsyncItem<Fields | undefined>;
  readonly MatchesToReferees: AsyncCollection<MatchesToReferees>;
  readonly businessesID?: string | null;
  readonly TFGroupMatches?: string | null;
  readonly endTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchesFieldId?: string | null;
}

export declare type Matches = LazyLoading extends LazyLoadingDisabled ? EagerMatches : LazyMatches

export declare const Matches: (new (init: ModelInit<Matches>) => Matches) & {
  copyOf(source: Matches, mutator: (draft: MutableModel<Matches>) => MutableModel<Matches> | void): Matches;
}

type EagerMatchParties = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MatchParties, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly matchID: string;
  readonly contact?: Contacts | null;
  readonly team?: Teams | null;
  readonly matchPartyPosition?: MatchPartyPosition | keyof typeof MatchPartyPosition | null;
  readonly points?: (MatchPartyPoints | null)[] | null;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchPartiesContactId?: string | null;
  readonly matchPartiesTeamId?: string | null;
}

type LazyMatchParties = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MatchParties, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly matchID: string;
  readonly contact: AsyncItem<Contacts | undefined>;
  readonly team: AsyncItem<Teams | undefined>;
  readonly matchPartyPosition?: MatchPartyPosition | keyof typeof MatchPartyPosition | null;
  readonly points: AsyncCollection<MatchPartyPoints>;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchPartiesContactId?: string | null;
  readonly matchPartiesTeamId?: string | null;
}

export declare type MatchParties = LazyLoading extends LazyLoadingDisabled ? EagerMatchParties : LazyMatchParties

export declare const MatchParties: (new (init: ModelInit<MatchParties>) => MatchParties) & {
  copyOf(source: MatchParties, mutator: (draft: MutableModel<MatchParties>) => MutableModel<MatchParties> | void): MatchParties;
}

type EagerMatchPartyPoints = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MatchPartyPoints, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly matchParty: string;
  readonly contact?: Contacts | null;
  readonly scoredAt?: string | null;
  readonly team?: Teams | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchPartyPointsContactId?: string | null;
  readonly matchPartyPointsTeamId?: string | null;
}

type LazyMatchPartyPoints = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MatchPartyPoints, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly matchParty: string;
  readonly contact: AsyncItem<Contacts | undefined>;
  readonly scoredAt?: string | null;
  readonly team: AsyncItem<Teams | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchPartyPointsContactId?: string | null;
  readonly matchPartyPointsTeamId?: string | null;
}

export declare type MatchPartyPoints = LazyLoading extends LazyLoadingDisabled ? EagerMatchPartyPoints : LazyMatchPartyPoints

export declare const MatchPartyPoints: (new (init: ModelInit<MatchPartyPoints>) => MatchPartyPoints) & {
  copyOf(source: MatchPartyPoints, mutator: (draft: MutableModel<MatchPartyPoints>) => MutableModel<MatchPartyPoints> | void): MatchPartyPoints;
}

type EagerMatchesToReferees = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MatchesToReferees, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly matchID?: string | null;
  readonly contactID?: Contacts | null;
  readonly refereeRoleId?: RefereeTypes | keyof typeof RefereeTypes | null;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchesToRefereesContactIDId?: string | null;
}

type LazyMatchesToReferees = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MatchesToReferees, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly matchID?: string | null;
  readonly contactID: AsyncItem<Contacts | undefined>;
  readonly refereeRoleId?: RefereeTypes | keyof typeof RefereeTypes | null;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchesToRefereesContactIDId?: string | null;
}

export declare type MatchesToReferees = LazyLoading extends LazyLoadingDisabled ? EagerMatchesToReferees : LazyMatchesToReferees

export declare const MatchesToReferees: (new (init: ModelInit<MatchesToReferees>) => MatchesToReferees) & {
  copyOf(source: MatchesToReferees, mutator: (draft: MutableModel<MatchesToReferees>) => MutableModel<MatchesToReferees> | void): MatchesToReferees;
}

type EagerDivisions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Divisions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly DivisionName: string;
  readonly TeamsToDivisions?: (TeamsToDivisions | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDivisions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Divisions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly DivisionName: string;
  readonly TeamsToDivisions: AsyncCollection<TeamsToDivisions>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Divisions = LazyLoading extends LazyLoadingDisabled ? EagerDivisions : LazyDivisions

export declare const Divisions: (new (init: ModelInit<Divisions>) => Divisions) & {
  copyOf(source: Divisions, mutator: (draft: MutableModel<Divisions>) => MutableModel<Divisions> | void): Divisions;
}

type EagerTeamsToDivisions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TeamsToDivisions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly teamID?: string | null;
  readonly divisionID?: string | null;
  readonly division?: Divisions | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeamsToDivisions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TeamsToDivisions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly teamID?: string | null;
  readonly divisionID?: string | null;
  readonly division: AsyncItem<Divisions | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TeamsToDivisions = LazyLoading extends LazyLoadingDisabled ? EagerTeamsToDivisions : LazyTeamsToDivisions

export declare const TeamsToDivisions: (new (init: ModelInit<TeamsToDivisions>) => TeamsToDivisions) & {
  copyOf(source: TeamsToDivisions, mutator: (draft: MutableModel<TeamsToDivisions>) => MutableModel<TeamsToDivisions> | void): TeamsToDivisions;
}

type EagerTFGroups = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TFGroups, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly tournamentID: string;
  readonly groupName: string;
  readonly TFGroupMatches?: (TFGroupMatches | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTFGroups = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TFGroups, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly tournamentID: string;
  readonly groupName: string;
  readonly TFGroupMatches: AsyncCollection<TFGroupMatches>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TFGroups = LazyLoading extends LazyLoadingDisabled ? EagerTFGroups : LazyTFGroups

export declare const TFGroups: (new (init: ModelInit<TFGroups>) => TFGroups) & {
  copyOf(source: TFGroups, mutator: (draft: MutableModel<TFGroups>) => MutableModel<TFGroups> | void): TFGroups;
}

type EagerTFGroupMatches = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TFGroupMatches, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly groupID: string;
  readonly Matches?: (Matches | null)[] | null;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTFGroupMatches = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TFGroupMatches, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly groupID: string;
  readonly Matches: AsyncCollection<Matches>;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TFGroupMatches = LazyLoading extends LazyLoadingDisabled ? EagerTFGroupMatches : LazyTFGroupMatches

export declare const TFGroupMatches: (new (init: ModelInit<TFGroupMatches>) => TFGroupMatches) & {
  copyOf(source: TFGroupMatches, mutator: (draft: MutableModel<TFGroupMatches>) => MutableModel<TFGroupMatches> | void): TFGroupMatches;
}

type EagerTFToSports = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TFToSports, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly SportType?: SportType | keyof typeof SportType | null;
  readonly TournamentFormatType?: (TournamentFormatType | null)[] | Array<keyof typeof TournamentFormatType> | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTFToSports = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TFToSports, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly SportType?: SportType | keyof typeof SportType | null;
  readonly TournamentFormatType?: (TournamentFormatType | null)[] | Array<keyof typeof TournamentFormatType> | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TFToSports = LazyLoading extends LazyLoadingDisabled ? EagerTFToSports : LazyTFToSports

export declare const TFToSports: (new (init: ModelInit<TFToSports>) => TFToSports) & {
  copyOf(source: TFToSports, mutator: (draft: MutableModel<TFToSports>) => MutableModel<TFToSports> | void): TFToSports;
}

type EagerTournamentRules = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TournamentRules, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Rule: string;
  readonly Description?: string | null;
  readonly TRulesToTFormat?: (TRulesToTFormat | null)[] | null;
  readonly TournamentRulesVariables?: (TournamentRulesVariables | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTournamentRules = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TournamentRules, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Rule: string;
  readonly Description?: string | null;
  readonly TRulesToTFormat: AsyncCollection<TRulesToTFormat>;
  readonly TournamentRulesVariables: AsyncCollection<TournamentRulesVariables>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TournamentRules = LazyLoading extends LazyLoadingDisabled ? EagerTournamentRules : LazyTournamentRules

export declare const TournamentRules: (new (init: ModelInit<TournamentRules>) => TournamentRules) & {
  copyOf(source: TournamentRules, mutator: (draft: MutableModel<TournamentRules>) => MutableModel<TournamentRules> | void): TournamentRules;
}

type EagerTournamentRulesVariables = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TournamentRulesVariables, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ruleVariables: string;
  readonly ruleID?: string | null;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly tournamentID?: string | null;
  readonly rule?: TournamentRules | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTournamentRulesVariables = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TournamentRulesVariables, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ruleVariables: string;
  readonly ruleID?: string | null;
  readonly owner?: string | null;
  readonly businessesID?: string | null;
  readonly tournamentID?: string | null;
  readonly rule: AsyncItem<TournamentRules | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TournamentRulesVariables = LazyLoading extends LazyLoadingDisabled ? EagerTournamentRulesVariables : LazyTournamentRulesVariables

export declare const TournamentRulesVariables: (new (init: ModelInit<TournamentRulesVariables>) => TournamentRulesVariables) & {
  copyOf(source: TournamentRulesVariables, mutator: (draft: MutableModel<TournamentRulesVariables>) => MutableModel<TournamentRulesVariables> | void): TournamentRulesVariables;
}

type EagerTRulesToTFormat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TRulesToTFormat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly TournamentFormatType?: TournamentFormatType | keyof typeof TournamentFormatType | null;
  readonly ruleID?: string | null;
  readonly rule?: TournamentRules | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTRulesToTFormat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TRulesToTFormat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly TournamentFormatType?: TournamentFormatType | keyof typeof TournamentFormatType | null;
  readonly ruleID?: string | null;
  readonly rule: AsyncItem<TournamentRules | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TRulesToTFormat = LazyLoading extends LazyLoadingDisabled ? EagerTRulesToTFormat : LazyTRulesToTFormat

export declare const TRulesToTFormat: (new (init: ModelInit<TRulesToTFormat>) => TRulesToTFormat) & {
  copyOf(source: TRulesToTFormat, mutator: (draft: MutableModel<TRulesToTFormat>) => MutableModel<TRulesToTFormat> | void): TRulesToTFormat;
}