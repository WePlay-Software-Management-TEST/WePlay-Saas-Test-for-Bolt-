import {
  type GenderTypes,
  type MeasurementUnitTypes,
  type FootPreferenceTypes,
  type SoccerExperienceLevelTypes,
  type SoccerPositionTypes,
  type ModelTeamPlayersConnection,
  SportType,
  TournamentFormatType
} from 'API';
import { ContactEmails } from 'API';

export interface Contact {
  id: string
  FirstName: string
  LastName?: string | null
  businessesID: string
  Height?: number | null
  Weight?: number | null
  Birthdate?: string | null
  Gender?: GenderTypes | null
  ContactRoles?:  {
    items: Array< {
      __typename: "ContactRoles",
      id: string,
      contactsID: string,
      rolesID: string,
      businessesID?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  ContactEmails?: {
    nextToken?: string | null
    items: Array<ContactEmails>
    startedAt?: number | null
  } | null
  Biography?: string | null
  PhotoId?: string | null
  ContactAddresses?: {
    items: Array< {
      id: string
      City?: string | null
      State?: string | null
      PostalCode?: string | null
      contactsID: string
    } | null >
    nextToken?: string | null
    startedAt?: number | null
  } | null
  PersonPreferences?: {
    id: string
    LengthUnit?: MeasurementUnitTypes | null
    WeightUnit?: MeasurementUnitTypes | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
  } | null
  PlayerSoccerSkills?: {
    id: string
    LeftRightFooted?: FootPreferenceTypes | null
    ExperienceLevel?: SoccerExperienceLevelTypes | null
    IsCaptain: boolean
    PlayerPositions?: {
      items: Array< {
        Position?: SoccerPositionTypes | null
      } | null >
    } | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
    owner?: string | null
  } | null
  createdAt: string
  RefereeInformation?:  {
    __typename: "RefereeInformation",
    id: string,
    yearsOfExperience?: string | null,
    isCertified?: boolean | null,
    hasDoneBackgroundCheck?: boolean | null,
    businessesID?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
  updatedAt: string
  _version: number
  _deleted?: boolean | null
  _lastChangedAt: number
  contactsPersonPreferencesId?: string | null
  contactsPlayerSoccerSkillsId?: string | null
  owner?: string | null
  isCaptain?: boolean
  teamsAssociated?: number
};


export interface Team {
  __typename: "Teams",
  id: string,
  TeamName: string,
  Description?: string | null,
  PhotoId?: string | null,
  City?: string | null,
  County?: string | null,
  State?: string | null,
  TeamPlayers?: ModelTeamPlayersConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
  players?: Array<Contact>
  isPlayerCaptain?: boolean
  versionTeamPlayer?: number
  TeamPlayerID?: string
};