/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTeamPlayers = /* GraphQL */ `query GetTeamPlayers($id: ID!) {
  getTeamPlayers(id: $id) {
    id
    contactsID
    teamsID
    IsCaptain
    owner
    businessesID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTeamPlayersQueryVariables,
  APITypes.GetTeamPlayersQuery
>;
export const listTeamPlayers = /* GraphQL */ `query ListTeamPlayers(
  $filter: ModelTeamPlayersFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeamPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      contactsID
      teamsID
      IsCaptain
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTeamPlayersQueryVariables,
  APITypes.ListTeamPlayersQuery
>;
export const syncTeamPlayers = /* GraphQL */ `query SyncTeamPlayers(
  $filter: ModelTeamPlayersFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTeamPlayers(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      contactsID
      teamsID
      IsCaptain
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTeamPlayersQueryVariables,
  APITypes.SyncTeamPlayersQuery
>;
export const teamPlayersByContactsID = /* GraphQL */ `query TeamPlayersByContactsID(
  $contactsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTeamPlayersFilterInput
  $limit: Int
  $nextToken: String
) {
  teamPlayersByContactsID(
    contactsID: $contactsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      contactsID
      teamsID
      IsCaptain
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TeamPlayersByContactsIDQueryVariables,
  APITypes.TeamPlayersByContactsIDQuery
>;
export const teamPlayersByTeamsID = /* GraphQL */ `query TeamPlayersByTeamsID(
  $teamsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTeamPlayersFilterInput
  $limit: Int
  $nextToken: String
) {
  teamPlayersByTeamsID(
    teamsID: $teamsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      contactsID
      teamsID
      IsCaptain
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TeamPlayersByTeamsIDQueryVariables,
  APITypes.TeamPlayersByTeamsIDQuery
>;
export const getTeams = /* GraphQL */ `query GetTeams($id: ID!) {
  getTeams(id: $id) {
    id
    TeamName
    Description
    PhotoId
    City
    County
    State
    owner
    businessesID
    TeamPlayers {
      items {
        id
        contactsID
        teamsID
        IsCaptain
        owner
        businessesID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    TeamsToDivisions {
      items {
        id
        teamID
        divisionID
        division {
          id
          owner
          businessesID
          DivisionName
          TeamsToDivisions {
            items {
              id
              teamID
              divisionID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    SportType
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTeamsQueryVariables, APITypes.GetTeamsQuery>;
export const listTeams = /* GraphQL */ `query ListTeams(
  $filter: ModelTeamsFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      TeamName
      Description
      PhotoId
      City
      County
      State
      owner
      businessesID
      TeamPlayers {
        items {
          id
          contactsID
          teamsID
          IsCaptain
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      TeamsToDivisions {
        items {
          id
          teamID
          divisionID
          division {
            id
            owner
            businessesID
            DivisionName
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      SportType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTeamsQueryVariables, APITypes.ListTeamsQuery>;
export const syncTeams = /* GraphQL */ `query SyncTeams(
  $filter: ModelTeamsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTeams(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      TeamName
      Description
      PhotoId
      City
      County
      State
      owner
      businessesID
      TeamPlayers {
        items {
          id
          contactsID
          teamsID
          IsCaptain
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      TeamsToDivisions {
        items {
          id
          teamID
          divisionID
          division {
            id
            owner
            businessesID
            DivisionName
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      SportType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncTeamsQueryVariables, APITypes.SyncTeamsQuery>;
export const getPersonPreferences = /* GraphQL */ `query GetPersonPreferences($id: ID!) {
  getPersonPreferences(id: $id) {
    id
    LengthUnit
    WeightUnit
    businessesID
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPersonPreferencesQueryVariables,
  APITypes.GetPersonPreferencesQuery
>;
export const listPersonPreferences = /* GraphQL */ `query ListPersonPreferences(
  $filter: ModelPersonPreferencesFilterInput
  $limit: Int
  $nextToken: String
) {
  listPersonPreferences(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      LengthUnit
      WeightUnit
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPersonPreferencesQueryVariables,
  APITypes.ListPersonPreferencesQuery
>;
export const syncPersonPreferences = /* GraphQL */ `query SyncPersonPreferences(
  $filter: ModelPersonPreferencesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPersonPreferences(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      LengthUnit
      WeightUnit
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncPersonPreferencesQueryVariables,
  APITypes.SyncPersonPreferencesQuery
>;
export const getContactAddresses = /* GraphQL */ `query GetContactAddresses($id: ID!) {
  getContactAddresses(id: $id) {
    id
    City
    State
    PostalCode
    businessesID
    owner
    contactsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetContactAddressesQueryVariables,
  APITypes.GetContactAddressesQuery
>;
export const listContactAddresses = /* GraphQL */ `query ListContactAddresses(
  $filter: ModelContactAddressesFilterInput
  $limit: Int
  $nextToken: String
) {
  listContactAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      City
      State
      PostalCode
      businessesID
      owner
      contactsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListContactAddressesQueryVariables,
  APITypes.ListContactAddressesQuery
>;
export const syncContactAddresses = /* GraphQL */ `query SyncContactAddresses(
  $filter: ModelContactAddressesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncContactAddresses(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      City
      State
      PostalCode
      businessesID
      owner
      contactsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncContactAddressesQueryVariables,
  APITypes.SyncContactAddressesQuery
>;
export const contactAddressesByContactsID = /* GraphQL */ `query ContactAddressesByContactsID(
  $contactsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelContactAddressesFilterInput
  $limit: Int
  $nextToken: String
) {
  contactAddressesByContactsID(
    contactsID: $contactsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      City
      State
      PostalCode
      businessesID
      owner
      contactsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ContactAddressesByContactsIDQueryVariables,
  APITypes.ContactAddressesByContactsIDQuery
>;
export const getContactEmails = /* GraphQL */ `query GetContactEmails($id: ID!) {
  getContactEmails(id: $id) {
    id
    Email
    businessesID
    owner
    contactsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetContactEmailsQueryVariables,
  APITypes.GetContactEmailsQuery
>;
export const listContactEmails = /* GraphQL */ `query ListContactEmails(
  $filter: ModelContactEmailsFilterInput
  $limit: Int
  $nextToken: String
) {
  listContactEmails(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Email
      businessesID
      owner
      contactsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListContactEmailsQueryVariables,
  APITypes.ListContactEmailsQuery
>;
export const syncContactEmails = /* GraphQL */ `query SyncContactEmails(
  $filter: ModelContactEmailsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncContactEmails(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      Email
      businessesID
      owner
      contactsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncContactEmailsQueryVariables,
  APITypes.SyncContactEmailsQuery
>;
export const contactEmailsByContactsID = /* GraphQL */ `query ContactEmailsByContactsID(
  $contactsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelContactEmailsFilterInput
  $limit: Int
  $nextToken: String
) {
  contactEmailsByContactsID(
    contactsID: $contactsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      Email
      businessesID
      owner
      contactsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ContactEmailsByContactsIDQueryVariables,
  APITypes.ContactEmailsByContactsIDQuery
>;
export const getPlayerPositions = /* GraphQL */ `query GetPlayerPositions($id: ID!) {
  getPlayerPositions(id: $id) {
    id
    businessesID
    Position
    owner
    playersoccerskillsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlayerPositionsQueryVariables,
  APITypes.GetPlayerPositionsQuery
>;
export const listPlayerPositions = /* GraphQL */ `query ListPlayerPositions(
  $filter: ModelPlayerPositionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlayerPositions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      businessesID
      Position
      owner
      playersoccerskillsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlayerPositionsQueryVariables,
  APITypes.ListPlayerPositionsQuery
>;
export const syncPlayerPositions = /* GraphQL */ `query SyncPlayerPositions(
  $filter: ModelPlayerPositionsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPlayerPositions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      businessesID
      Position
      owner
      playersoccerskillsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncPlayerPositionsQueryVariables,
  APITypes.SyncPlayerPositionsQuery
>;
export const playerPositionsByPlayersoccerskillsID = /* GraphQL */ `query PlayerPositionsByPlayersoccerskillsID(
  $playersoccerskillsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPlayerPositionsFilterInput
  $limit: Int
  $nextToken: String
) {
  playerPositionsByPlayersoccerskillsID(
    playersoccerskillsID: $playersoccerskillsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      businessesID
      Position
      owner
      playersoccerskillsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PlayerPositionsByPlayersoccerskillsIDQueryVariables,
  APITypes.PlayerPositionsByPlayersoccerskillsIDQuery
>;
export const getPlayerSoccerSkills = /* GraphQL */ `query GetPlayerSoccerSkills($id: ID!) {
  getPlayerSoccerSkills(id: $id) {
    id
    LeftRightFooted
    PlayerPositions {
      items {
        id
        businessesID
        Position
        owner
        playersoccerskillsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    ExperienceLevel
    businessesID
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlayerSoccerSkillsQueryVariables,
  APITypes.GetPlayerSoccerSkillsQuery
>;
export const listPlayerSoccerSkills = /* GraphQL */ `query ListPlayerSoccerSkills(
  $filter: ModelPlayerSoccerSkillsFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlayerSoccerSkills(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      LeftRightFooted
      PlayerPositions {
        items {
          id
          businessesID
          Position
          owner
          playersoccerskillsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ExperienceLevel
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlayerSoccerSkillsQueryVariables,
  APITypes.ListPlayerSoccerSkillsQuery
>;
export const syncPlayerSoccerSkills = /* GraphQL */ `query SyncPlayerSoccerSkills(
  $filter: ModelPlayerSoccerSkillsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPlayerSoccerSkills(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      LeftRightFooted
      PlayerPositions {
        items {
          id
          businessesID
          Position
          owner
          playersoccerskillsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ExperienceLevel
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncPlayerSoccerSkillsQueryVariables,
  APITypes.SyncPlayerSoccerSkillsQuery
>;
export const getContacts = /* GraphQL */ `query GetContacts($id: ID!) {
  getContacts(id: $id) {
    id
    FirstName
    LastName
    businessesID
    Height
    Weight
    Birthdate
    Gender
    ContactEmails {
      items {
        id
        Email
        businessesID
        owner
        contactsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    Biography
    PhotoId
    owner
    ContactAddresses {
      items {
        id
        City
        State
        PostalCode
        businessesID
        owner
        contactsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    PersonPreferences {
      id
      LengthUnit
      WeightUnit
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    PlayerSoccerSkills {
      id
      LeftRightFooted
      PlayerPositions {
        items {
          id
          businessesID
          Position
          owner
          playersoccerskillsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ExperienceLevel
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    RefereeInformation {
      id
      yearsOfExperience
      isCertified
      hasDoneBackgroundCheck
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    TeamPlayers {
      items {
        id
        contactsID
        teamsID
        IsCaptain
        owner
        businessesID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    ContactRoles {
      items {
        id
        contactsID
        rolesID
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    contactsPersonPreferencesId
    contactsPlayerSoccerSkillsId
    contactsRefereeInformationId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetContactsQueryVariables,
  APITypes.GetContactsQuery
>;
export const listContacts = /* GraphQL */ `query ListContacts(
  $filter: ModelContactsFilterInput
  $limit: Int
  $nextToken: String
) {
  listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      FirstName
      LastName
      businessesID
      Height
      Weight
      Birthdate
      Gender
      ContactEmails {
        items {
          id
          Email
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Biography
      PhotoId
      owner
      ContactAddresses {
        items {
          id
          City
          State
          PostalCode
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      PersonPreferences {
        id
        LengthUnit
        WeightUnit
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      PlayerSoccerSkills {
        id
        LeftRightFooted
        PlayerPositions {
          items {
            id
            businessesID
            Position
            owner
            playersoccerskillsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ExperienceLevel
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      RefereeInformation {
        id
        yearsOfExperience
        isCertified
        hasDoneBackgroundCheck
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      TeamPlayers {
        items {
          id
          contactsID
          teamsID
          IsCaptain
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ContactRoles {
        items {
          id
          contactsID
          rolesID
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      contactsPersonPreferencesId
      contactsPlayerSoccerSkillsId
      contactsRefereeInformationId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListContactsQueryVariables,
  APITypes.ListContactsQuery
>;
export const syncContacts = /* GraphQL */ `query SyncContacts(
  $filter: ModelContactsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncContacts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      FirstName
      LastName
      businessesID
      Height
      Weight
      Birthdate
      Gender
      ContactEmails {
        items {
          id
          Email
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Biography
      PhotoId
      owner
      ContactAddresses {
        items {
          id
          City
          State
          PostalCode
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      PersonPreferences {
        id
        LengthUnit
        WeightUnit
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      PlayerSoccerSkills {
        id
        LeftRightFooted
        PlayerPositions {
          items {
            id
            businessesID
            Position
            owner
            playersoccerskillsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ExperienceLevel
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      RefereeInformation {
        id
        yearsOfExperience
        isCertified
        hasDoneBackgroundCheck
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      TeamPlayers {
        items {
          id
          contactsID
          teamsID
          IsCaptain
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ContactRoles {
        items {
          id
          contactsID
          rolesID
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      contactsPersonPreferencesId
      contactsPlayerSoccerSkillsId
      contactsRefereeInformationId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncContactsQueryVariables,
  APITypes.SyncContactsQuery
>;
export const contactsByBusinessesID = /* GraphQL */ `query ContactsByBusinessesID(
  $businessesID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelContactsFilterInput
  $limit: Int
  $nextToken: String
) {
  contactsByBusinessesID(
    businessesID: $businessesID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      FirstName
      LastName
      businessesID
      Height
      Weight
      Birthdate
      Gender
      ContactEmails {
        items {
          id
          Email
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Biography
      PhotoId
      owner
      ContactAddresses {
        items {
          id
          City
          State
          PostalCode
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      PersonPreferences {
        id
        LengthUnit
        WeightUnit
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      PlayerSoccerSkills {
        id
        LeftRightFooted
        PlayerPositions {
          items {
            id
            businessesID
            Position
            owner
            playersoccerskillsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ExperienceLevel
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      RefereeInformation {
        id
        yearsOfExperience
        isCertified
        hasDoneBackgroundCheck
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      TeamPlayers {
        items {
          id
          contactsID
          teamsID
          IsCaptain
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ContactRoles {
        items {
          id
          contactsID
          rolesID
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      contactsPersonPreferencesId
      contactsPlayerSoccerSkillsId
      contactsRefereeInformationId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ContactsByBusinessesIDQueryVariables,
  APITypes.ContactsByBusinessesIDQuery
>;
export const getRefereeInformation = /* GraphQL */ `query GetRefereeInformation($id: ID!) {
  getRefereeInformation(id: $id) {
    id
    yearsOfExperience
    isCertified
    hasDoneBackgroundCheck
    businessesID
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRefereeInformationQueryVariables,
  APITypes.GetRefereeInformationQuery
>;
export const listRefereeInformations = /* GraphQL */ `query ListRefereeInformations(
  $filter: ModelRefereeInformationFilterInput
  $limit: Int
  $nextToken: String
) {
  listRefereeInformations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      yearsOfExperience
      isCertified
      hasDoneBackgroundCheck
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRefereeInformationsQueryVariables,
  APITypes.ListRefereeInformationsQuery
>;
export const syncRefereeInformations = /* GraphQL */ `query SyncRefereeInformations(
  $filter: ModelRefereeInformationFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncRefereeInformations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      yearsOfExperience
      isCertified
      hasDoneBackgroundCheck
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncRefereeInformationsQueryVariables,
  APITypes.SyncRefereeInformationsQuery
>;
export const getContactRoles = /* GraphQL */ `query GetContactRoles($id: ID!) {
  getContactRoles(id: $id) {
    id
    contactsID
    rolesID
    businessesID
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetContactRolesQueryVariables,
  APITypes.GetContactRolesQuery
>;
export const listContactRoles = /* GraphQL */ `query ListContactRoles(
  $filter: ModelContactRolesFilterInput
  $limit: Int
  $nextToken: String
) {
  listContactRoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      contactsID
      rolesID
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListContactRolesQueryVariables,
  APITypes.ListContactRolesQuery
>;
export const syncContactRoles = /* GraphQL */ `query SyncContactRoles(
  $filter: ModelContactRolesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncContactRoles(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      contactsID
      rolesID
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncContactRolesQueryVariables,
  APITypes.SyncContactRolesQuery
>;
export const contactRolesByContactsID = /* GraphQL */ `query ContactRolesByContactsID(
  $contactsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelContactRolesFilterInput
  $limit: Int
  $nextToken: String
) {
  contactRolesByContactsID(
    contactsID: $contactsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      contactsID
      rolesID
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ContactRolesByContactsIDQueryVariables,
  APITypes.ContactRolesByContactsIDQuery
>;
export const contactRolesByRolesID = /* GraphQL */ `query ContactRolesByRolesID(
  $rolesID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelContactRolesFilterInput
  $limit: Int
  $nextToken: String
) {
  contactRolesByRolesID(
    rolesID: $rolesID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      contactsID
      rolesID
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ContactRolesByRolesIDQueryVariables,
  APITypes.ContactRolesByRolesIDQuery
>;
export const getRole = /* GraphQL */ `query GetRole($id: ID!) {
  getRole(id: $id) {
    id
    RoleName
    Precedence
    Description
    businessesID
    ContactRoles {
      items {
        id
        contactsID
        rolesID
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetRoleQueryVariables, APITypes.GetRoleQuery>;
export const listRoles = /* GraphQL */ `query ListRoles(
  $filter: ModelRoleFilterInput
  $limit: Int
  $nextToken: String
) {
  listRoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      RoleName
      Precedence
      Description
      businessesID
      ContactRoles {
        items {
          id
          contactsID
          rolesID
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListRolesQueryVariables, APITypes.ListRolesQuery>;
export const syncRoles = /* GraphQL */ `query SyncRoles(
  $filter: ModelRoleFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncRoles(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      RoleName
      Precedence
      Description
      businessesID
      ContactRoles {
        items {
          id
          contactsID
          rolesID
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncRolesQueryVariables, APITypes.SyncRolesQuery>;
export const getPolicy = /* GraphQL */ `query GetPolicy($id: ID!) {
  getPolicy(id: $id) {
    id
    Role {
      id
      RoleName
      Precedence
      Description
      businessesID
      ContactRoles {
        items {
          id
          contactsID
          rolesID
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    Action {
      id
      actionName
      Description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    Resource {
      id
      ResourceName
      Description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    DeniedFields
    OnlyOnOwn
    Description
    businessesID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    policyRoleId
    policyActionId
    policyResourceId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPolicyQueryVariables, APITypes.GetPolicyQuery>;
export const listPolicies = /* GraphQL */ `query ListPolicies(
  $filter: ModelPolicyFilterInput
  $limit: Int
  $nextToken: String
) {
  listPolicies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Role {
        id
        RoleName
        Precedence
        Description
        businessesID
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Action {
        id
        actionName
        Description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Resource {
        id
        ResourceName
        Description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      DeniedFields
      OnlyOnOwn
      Description
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      policyRoleId
      policyActionId
      policyResourceId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPoliciesQueryVariables,
  APITypes.ListPoliciesQuery
>;
export const syncPolicies = /* GraphQL */ `query SyncPolicies(
  $filter: ModelPolicyFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPolicies(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      Role {
        id
        RoleName
        Precedence
        Description
        businessesID
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Action {
        id
        actionName
        Description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      Resource {
        id
        ResourceName
        Description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      DeniedFields
      OnlyOnOwn
      Description
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      policyRoleId
      policyActionId
      policyResourceId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncPoliciesQueryVariables,
  APITypes.SyncPoliciesQuery
>;
export const getResource = /* GraphQL */ `query GetResource($id: ID!) {
  getResource(id: $id) {
    id
    ResourceName
    Description
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetResourceQueryVariables,
  APITypes.GetResourceQuery
>;
export const listResources = /* GraphQL */ `query ListResources(
  $filter: ModelResourceFilterInput
  $limit: Int
  $nextToken: String
) {
  listResources(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      ResourceName
      Description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListResourcesQueryVariables,
  APITypes.ListResourcesQuery
>;
export const syncResources = /* GraphQL */ `query SyncResources(
  $filter: ModelResourceFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncResources(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      ResourceName
      Description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncResourcesQueryVariables,
  APITypes.SyncResourcesQuery
>;
export const getAction = /* GraphQL */ `query GetAction($id: ID!) {
  getAction(id: $id) {
    id
    actionName
    Description
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetActionQueryVariables, APITypes.GetActionQuery>;
export const listActions = /* GraphQL */ `query ListActions(
  $filter: ModelActionFilterInput
  $limit: Int
  $nextToken: String
) {
  listActions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      actionName
      Description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListActionsQueryVariables,
  APITypes.ListActionsQuery
>;
export const syncActions = /* GraphQL */ `query SyncActions(
  $filter: ModelActionFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncActions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      actionName
      Description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncActionsQueryVariables,
  APITypes.SyncActionsQuery
>;
export const getBusinessAddresses = /* GraphQL */ `query GetBusinessAddresses($id: ID!) {
  getBusinessAddresses(id: $id) {
    id
    StreetAddress
    StreetAddress2
    City
    State
    PostalCode
    Country
    businessesID
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessAddressesQueryVariables,
  APITypes.GetBusinessAddressesQuery
>;
export const listBusinessAddresses = /* GraphQL */ `query ListBusinessAddresses(
  $filter: ModelBusinessAddressesFilterInput
  $limit: Int
  $nextToken: String
) {
  listBusinessAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      StreetAddress
      StreetAddress2
      City
      State
      PostalCode
      Country
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBusinessAddressesQueryVariables,
  APITypes.ListBusinessAddressesQuery
>;
export const syncBusinessAddresses = /* GraphQL */ `query SyncBusinessAddresses(
  $filter: ModelBusinessAddressesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncBusinessAddresses(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      StreetAddress
      StreetAddress2
      City
      State
      PostalCode
      Country
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncBusinessAddressesQueryVariables,
  APITypes.SyncBusinessAddressesQuery
>;
export const businessAddressesByBusinessesID = /* GraphQL */ `query BusinessAddressesByBusinessesID(
  $businessesID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelBusinessAddressesFilterInput
  $limit: Int
  $nextToken: String
) {
  businessAddressesByBusinessesID(
    businessesID: $businessesID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      StreetAddress
      StreetAddress2
      City
      State
      PostalCode
      Country
      businessesID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BusinessAddressesByBusinessesIDQueryVariables,
  APITypes.BusinessAddressesByBusinessesIDQuery
>;
export const getBusinesses = /* GraphQL */ `query GetBusinesses($id: ID!) {
  getBusinesses(id: $id) {
    id
    owner
    BusinessName
    BusinessSize
    Contacts {
      items {
        id
        StreetAddress
        StreetAddress2
        City
        State
        PostalCode
        Country
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    BusinessAddresses {
      items {
        id
        StreetAddress
        StreetAddress2
        City
        State
        PostalCode
        Country
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBusinessesQueryVariables,
  APITypes.GetBusinessesQuery
>;
export const listBusinesses = /* GraphQL */ `query ListBusinesses(
  $filter: ModelBusinessesFilterInput
  $limit: Int
  $nextToken: String
) {
  listBusinesses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      BusinessName
      BusinessSize
      Contacts {
        items {
          id
          StreetAddress
          StreetAddress2
          City
          State
          PostalCode
          Country
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      BusinessAddresses {
        items {
          id
          StreetAddress
          StreetAddress2
          City
          State
          PostalCode
          Country
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBusinessesQueryVariables,
  APITypes.ListBusinessesQuery
>;
export const syncBusinesses = /* GraphQL */ `query SyncBusinesses(
  $filter: ModelBusinessesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncBusinesses(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      owner
      BusinessName
      BusinessSize
      Contacts {
        items {
          id
          StreetAddress
          StreetAddress2
          City
          State
          PostalCode
          Country
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      BusinessAddresses {
        items {
          id
          StreetAddress
          StreetAddress2
          City
          State
          PostalCode
          Country
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncBusinessesQueryVariables,
  APITypes.SyncBusinessesQuery
>;
export const getFields = /* GraphQL */ `query GetFields($id: ID!) {
  getFields(id: $id) {
    id
    fieldName
    fieldLocation
    owner
    businessesID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetFieldsQueryVariables, APITypes.GetFieldsQuery>;
export const listFields = /* GraphQL */ `query ListFields(
  $filter: ModelFieldsFilterInput
  $limit: Int
  $nextToken: String
) {
  listFields(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      fieldName
      fieldLocation
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFieldsQueryVariables,
  APITypes.ListFieldsQuery
>;
export const syncFields = /* GraphQL */ `query SyncFields(
  $filter: ModelFieldsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncFields(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      fieldName
      fieldLocation
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncFieldsQueryVariables,
  APITypes.SyncFieldsQuery
>;
export const getTournaments = /* GraphQL */ `query GetTournaments($id: ID!) {
  getTournaments(id: $id) {
    id
    businessesID
    tournamentName
    tournamentImageId
    tournamentDescription
    customRules
    TFGroups {
      items {
        id
        owner
        businessesID
        tournamentID
        groupName
        TFGroupMatches {
          items {
            id
            groupID
            Matches {
              nextToken
              startedAt
              __typename
            }
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    SportType
    TournamentFormatType
    TournamentRulesVariables {
      items {
        id
        ruleVariables
        ruleID
        owner
        businessesID
        tournamentID
        rule {
          id
          Rule
          Description
          TRulesToTFormat {
            items {
              id
              TournamentFormatType
              ruleID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          TournamentRulesVariables {
            items {
              id
              ruleVariables
              ruleID
              owner
              businessesID
              tournamentID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    haveEnded
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTournamentsQueryVariables,
  APITypes.GetTournamentsQuery
>;
export const listTournaments = /* GraphQL */ `query ListTournaments(
  $filter: ModelTournamentsFilterInput
  $limit: Int
  $nextToken: String
) {
  listTournaments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      businessesID
      tournamentName
      tournamentImageId
      tournamentDescription
      customRules
      TFGroups {
        items {
          id
          owner
          businessesID
          tournamentID
          groupName
          TFGroupMatches {
            items {
              id
              groupID
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      SportType
      TournamentFormatType
      TournamentRulesVariables {
        items {
          id
          ruleVariables
          ruleID
          owner
          businessesID
          tournamentID
          rule {
            id
            Rule
            Description
            TRulesToTFormat {
              nextToken
              startedAt
              __typename
            }
            TournamentRulesVariables {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      haveEnded
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTournamentsQueryVariables,
  APITypes.ListTournamentsQuery
>;
export const syncTournaments = /* GraphQL */ `query SyncTournaments(
  $filter: ModelTournamentsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTournaments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      businessesID
      tournamentName
      tournamentImageId
      tournamentDescription
      customRules
      TFGroups {
        items {
          id
          owner
          businessesID
          tournamentID
          groupName
          TFGroupMatches {
            items {
              id
              groupID
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      SportType
      TournamentFormatType
      TournamentRulesVariables {
        items {
          id
          ruleVariables
          ruleID
          owner
          businessesID
          tournamentID
          rule {
            id
            Rule
            Description
            TRulesToTFormat {
              nextToken
              startedAt
              __typename
            }
            TournamentRulesVariables {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      haveEnded
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTournamentsQueryVariables,
  APITypes.SyncTournamentsQuery
>;
export const getMatches = /* GraphQL */ `query GetMatches($id: ID!) {
  getMatches(id: $id) {
    id
    beginTime
    matchDescription
    MatchParties {
      items {
        id
        matchID
        contact {
          id
          FirstName
          LastName
          businessesID
          Height
          Weight
          Birthdate
          Gender
          ContactEmails {
            items {
              id
              Email
              businessesID
              owner
              contactsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          Biography
          PhotoId
          owner
          ContactAddresses {
            items {
              id
              City
              State
              PostalCode
              businessesID
              owner
              contactsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          PersonPreferences {
            id
            LengthUnit
            WeightUnit
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          PlayerSoccerSkills {
            id
            LeftRightFooted
            PlayerPositions {
              nextToken
              startedAt
              __typename
            }
            ExperienceLevel
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          RefereeInformation {
            id
            yearsOfExperience
            isCertified
            hasDoneBackgroundCheck
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          TeamPlayers {
            items {
              id
              contactsID
              teamsID
              IsCaptain
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ContactRoles {
            items {
              id
              contactsID
              rolesID
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          contactsPersonPreferencesId
          contactsPlayerSoccerSkillsId
          contactsRefereeInformationId
          __typename
        }
        team {
          id
          TeamName
          Description
          PhotoId
          City
          County
          State
          owner
          businessesID
          TeamPlayers {
            items {
              id
              contactsID
              teamsID
              IsCaptain
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          TeamsToDivisions {
            items {
              id
              teamID
              divisionID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          SportType
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        matchPartyPosition
        points {
          items {
            id
            matchParty
            contact {
              id
              FirstName
              LastName
              businessesID
              Height
              Weight
              Birthdate
              Gender
              Biography
              PhotoId
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              contactsPersonPreferencesId
              contactsPlayerSoccerSkillsId
              contactsRefereeInformationId
              __typename
            }
            scoredAt
            team {
              id
              TeamName
              Description
              PhotoId
              City
              County
              State
              owner
              businessesID
              SportType
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            matchPartyPointsContactId
            matchPartyPointsTeamId
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        owner
        businessesID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        matchPartiesContactId
        matchPartiesTeamId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    owner
    Field {
      id
      fieldName
      fieldLocation
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    MatchesToReferees {
      items {
        id
        matchID
        contactID {
          id
          FirstName
          LastName
          businessesID
          Height
          Weight
          Birthdate
          Gender
          ContactEmails {
            items {
              id
              Email
              businessesID
              owner
              contactsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          Biography
          PhotoId
          owner
          ContactAddresses {
            items {
              id
              City
              State
              PostalCode
              businessesID
              owner
              contactsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          PersonPreferences {
            id
            LengthUnit
            WeightUnit
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          PlayerSoccerSkills {
            id
            LeftRightFooted
            PlayerPositions {
              nextToken
              startedAt
              __typename
            }
            ExperienceLevel
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          RefereeInformation {
            id
            yearsOfExperience
            isCertified
            hasDoneBackgroundCheck
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          TeamPlayers {
            items {
              id
              contactsID
              teamsID
              IsCaptain
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ContactRoles {
            items {
              id
              contactsID
              rolesID
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          contactsPersonPreferencesId
          contactsPlayerSoccerSkillsId
          contactsRefereeInformationId
          __typename
        }
        refereeRoleId
        owner
        businessesID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        matchesToRefereesContactIDId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    businessesID
    TFGroupMatches
    endTime
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    matchesFieldId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMatchesQueryVariables,
  APITypes.GetMatchesQuery
>;
export const listMatches = /* GraphQL */ `query ListMatches(
  $filter: ModelMatchesFilterInput
  $limit: Int
  $nextToken: String
) {
  listMatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      beginTime
      matchDescription
      MatchParties {
        items {
          id
          matchID
          contact {
            id
            FirstName
            LastName
            businessesID
            Height
            Weight
            Birthdate
            Gender
            ContactEmails {
              nextToken
              startedAt
              __typename
            }
            Biography
            PhotoId
            owner
            ContactAddresses {
              nextToken
              startedAt
              __typename
            }
            PersonPreferences {
              id
              LengthUnit
              WeightUnit
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            PlayerSoccerSkills {
              id
              LeftRightFooted
              ExperienceLevel
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            RefereeInformation {
              id
              yearsOfExperience
              isCertified
              hasDoneBackgroundCheck
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            ContactRoles {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            contactsPersonPreferencesId
            contactsPlayerSoccerSkillsId
            contactsRefereeInformationId
            __typename
          }
          team {
            id
            TeamName
            Description
            PhotoId
            City
            County
            State
            owner
            businessesID
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            SportType
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          matchPartyPosition
          points {
            items {
              id
              matchParty
              scoredAt
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchPartyPointsContactId
              matchPartyPointsTeamId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchPartiesContactId
          matchPartiesTeamId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      owner
      Field {
        id
        fieldName
        fieldLocation
        owner
        businessesID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      MatchesToReferees {
        items {
          id
          matchID
          contactID {
            id
            FirstName
            LastName
            businessesID
            Height
            Weight
            Birthdate
            Gender
            ContactEmails {
              nextToken
              startedAt
              __typename
            }
            Biography
            PhotoId
            owner
            ContactAddresses {
              nextToken
              startedAt
              __typename
            }
            PersonPreferences {
              id
              LengthUnit
              WeightUnit
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            PlayerSoccerSkills {
              id
              LeftRightFooted
              ExperienceLevel
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            RefereeInformation {
              id
              yearsOfExperience
              isCertified
              hasDoneBackgroundCheck
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            ContactRoles {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            contactsPersonPreferencesId
            contactsPlayerSoccerSkillsId
            contactsRefereeInformationId
            __typename
          }
          refereeRoleId
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchesToRefereesContactIDId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      businessesID
      TFGroupMatches
      endTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchesFieldId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMatchesQueryVariables,
  APITypes.ListMatchesQuery
>;
export const syncMatches = /* GraphQL */ `query SyncMatches(
  $filter: ModelMatchesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMatches(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      beginTime
      matchDescription
      MatchParties {
        items {
          id
          matchID
          contact {
            id
            FirstName
            LastName
            businessesID
            Height
            Weight
            Birthdate
            Gender
            ContactEmails {
              nextToken
              startedAt
              __typename
            }
            Biography
            PhotoId
            owner
            ContactAddresses {
              nextToken
              startedAt
              __typename
            }
            PersonPreferences {
              id
              LengthUnit
              WeightUnit
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            PlayerSoccerSkills {
              id
              LeftRightFooted
              ExperienceLevel
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            RefereeInformation {
              id
              yearsOfExperience
              isCertified
              hasDoneBackgroundCheck
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            ContactRoles {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            contactsPersonPreferencesId
            contactsPlayerSoccerSkillsId
            contactsRefereeInformationId
            __typename
          }
          team {
            id
            TeamName
            Description
            PhotoId
            City
            County
            State
            owner
            businessesID
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            SportType
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          matchPartyPosition
          points {
            items {
              id
              matchParty
              scoredAt
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchPartyPointsContactId
              matchPartyPointsTeamId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchPartiesContactId
          matchPartiesTeamId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      owner
      Field {
        id
        fieldName
        fieldLocation
        owner
        businessesID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      MatchesToReferees {
        items {
          id
          matchID
          contactID {
            id
            FirstName
            LastName
            businessesID
            Height
            Weight
            Birthdate
            Gender
            ContactEmails {
              nextToken
              startedAt
              __typename
            }
            Biography
            PhotoId
            owner
            ContactAddresses {
              nextToken
              startedAt
              __typename
            }
            PersonPreferences {
              id
              LengthUnit
              WeightUnit
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            PlayerSoccerSkills {
              id
              LeftRightFooted
              ExperienceLevel
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            RefereeInformation {
              id
              yearsOfExperience
              isCertified
              hasDoneBackgroundCheck
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            ContactRoles {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            contactsPersonPreferencesId
            contactsPlayerSoccerSkillsId
            contactsRefereeInformationId
            __typename
          }
          refereeRoleId
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchesToRefereesContactIDId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      businessesID
      TFGroupMatches
      endTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchesFieldId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncMatchesQueryVariables,
  APITypes.SyncMatchesQuery
>;
export const matchesByTFGroupMatches = /* GraphQL */ `query MatchesByTFGroupMatches(
  $TFGroupMatches: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMatchesFilterInput
  $limit: Int
  $nextToken: String
) {
  matchesByTFGroupMatches(
    TFGroupMatches: $TFGroupMatches
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      beginTime
      matchDescription
      MatchParties {
        items {
          id
          matchID
          contact {
            id
            FirstName
            LastName
            businessesID
            Height
            Weight
            Birthdate
            Gender
            ContactEmails {
              nextToken
              startedAt
              __typename
            }
            Biography
            PhotoId
            owner
            ContactAddresses {
              nextToken
              startedAt
              __typename
            }
            PersonPreferences {
              id
              LengthUnit
              WeightUnit
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            PlayerSoccerSkills {
              id
              LeftRightFooted
              ExperienceLevel
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            RefereeInformation {
              id
              yearsOfExperience
              isCertified
              hasDoneBackgroundCheck
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            ContactRoles {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            contactsPersonPreferencesId
            contactsPlayerSoccerSkillsId
            contactsRefereeInformationId
            __typename
          }
          team {
            id
            TeamName
            Description
            PhotoId
            City
            County
            State
            owner
            businessesID
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            SportType
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          matchPartyPosition
          points {
            items {
              id
              matchParty
              scoredAt
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchPartyPointsContactId
              matchPartyPointsTeamId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchPartiesContactId
          matchPartiesTeamId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      owner
      Field {
        id
        fieldName
        fieldLocation
        owner
        businessesID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      MatchesToReferees {
        items {
          id
          matchID
          contactID {
            id
            FirstName
            LastName
            businessesID
            Height
            Weight
            Birthdate
            Gender
            ContactEmails {
              nextToken
              startedAt
              __typename
            }
            Biography
            PhotoId
            owner
            ContactAddresses {
              nextToken
              startedAt
              __typename
            }
            PersonPreferences {
              id
              LengthUnit
              WeightUnit
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            PlayerSoccerSkills {
              id
              LeftRightFooted
              ExperienceLevel
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            RefereeInformation {
              id
              yearsOfExperience
              isCertified
              hasDoneBackgroundCheck
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            ContactRoles {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            contactsPersonPreferencesId
            contactsPlayerSoccerSkillsId
            contactsRefereeInformationId
            __typename
          }
          refereeRoleId
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchesToRefereesContactIDId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      businessesID
      TFGroupMatches
      endTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchesFieldId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MatchesByTFGroupMatchesQueryVariables,
  APITypes.MatchesByTFGroupMatchesQuery
>;
export const getMatchParties = /* GraphQL */ `query GetMatchParties($id: ID!) {
  getMatchParties(id: $id) {
    id
    matchID
    contact {
      id
      FirstName
      LastName
      businessesID
      Height
      Weight
      Birthdate
      Gender
      ContactEmails {
        items {
          id
          Email
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Biography
      PhotoId
      owner
      ContactAddresses {
        items {
          id
          City
          State
          PostalCode
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      PersonPreferences {
        id
        LengthUnit
        WeightUnit
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      PlayerSoccerSkills {
        id
        LeftRightFooted
        PlayerPositions {
          items {
            id
            businessesID
            Position
            owner
            playersoccerskillsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ExperienceLevel
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      RefereeInformation {
        id
        yearsOfExperience
        isCertified
        hasDoneBackgroundCheck
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      TeamPlayers {
        items {
          id
          contactsID
          teamsID
          IsCaptain
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ContactRoles {
        items {
          id
          contactsID
          rolesID
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      contactsPersonPreferencesId
      contactsPlayerSoccerSkillsId
      contactsRefereeInformationId
      __typename
    }
    team {
      id
      TeamName
      Description
      PhotoId
      City
      County
      State
      owner
      businessesID
      TeamPlayers {
        items {
          id
          contactsID
          teamsID
          IsCaptain
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      TeamsToDivisions {
        items {
          id
          teamID
          divisionID
          division {
            id
            owner
            businessesID
            DivisionName
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      SportType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    matchPartyPosition
    points {
      items {
        id
        matchParty
        contact {
          id
          FirstName
          LastName
          businessesID
          Height
          Weight
          Birthdate
          Gender
          ContactEmails {
            items {
              id
              Email
              businessesID
              owner
              contactsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          Biography
          PhotoId
          owner
          ContactAddresses {
            items {
              id
              City
              State
              PostalCode
              businessesID
              owner
              contactsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          PersonPreferences {
            id
            LengthUnit
            WeightUnit
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          PlayerSoccerSkills {
            id
            LeftRightFooted
            PlayerPositions {
              nextToken
              startedAt
              __typename
            }
            ExperienceLevel
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          RefereeInformation {
            id
            yearsOfExperience
            isCertified
            hasDoneBackgroundCheck
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          TeamPlayers {
            items {
              id
              contactsID
              teamsID
              IsCaptain
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ContactRoles {
            items {
              id
              contactsID
              rolesID
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          contactsPersonPreferencesId
          contactsPlayerSoccerSkillsId
          contactsRefereeInformationId
          __typename
        }
        scoredAt
        team {
          id
          TeamName
          Description
          PhotoId
          City
          County
          State
          owner
          businessesID
          TeamPlayers {
            items {
              id
              contactsID
              teamsID
              IsCaptain
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          TeamsToDivisions {
            items {
              id
              teamID
              divisionID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          SportType
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        matchPartyPointsContactId
        matchPartyPointsTeamId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    owner
    businessesID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    matchPartiesContactId
    matchPartiesTeamId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMatchPartiesQueryVariables,
  APITypes.GetMatchPartiesQuery
>;
export const listMatchParties = /* GraphQL */ `query ListMatchParties(
  $filter: ModelMatchPartiesFilterInput
  $limit: Int
  $nextToken: String
) {
  listMatchParties(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      matchID
      contact {
        id
        FirstName
        LastName
        businessesID
        Height
        Weight
        Birthdate
        Gender
        ContactEmails {
          items {
            id
            Email
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        Biography
        PhotoId
        owner
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          PlayerPositions {
            items {
              id
              businessesID
              Position
              owner
              playersoccerskillsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ExperienceLevel
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        RefereeInformation {
          id
          yearsOfExperience
          isCertified
          hasDoneBackgroundCheck
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
        contactsRefereeInformationId
        __typename
      }
      team {
        id
        TeamName
        Description
        PhotoId
        City
        County
        State
        owner
        businessesID
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TeamsToDivisions {
          items {
            id
            teamID
            divisionID
            division {
              id
              owner
              businessesID
              DivisionName
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        SportType
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      matchPartyPosition
      points {
        items {
          id
          matchParty
          contact {
            id
            FirstName
            LastName
            businessesID
            Height
            Weight
            Birthdate
            Gender
            ContactEmails {
              nextToken
              startedAt
              __typename
            }
            Biography
            PhotoId
            owner
            ContactAddresses {
              nextToken
              startedAt
              __typename
            }
            PersonPreferences {
              id
              LengthUnit
              WeightUnit
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            PlayerSoccerSkills {
              id
              LeftRightFooted
              ExperienceLevel
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            RefereeInformation {
              id
              yearsOfExperience
              isCertified
              hasDoneBackgroundCheck
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            ContactRoles {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            contactsPersonPreferencesId
            contactsPlayerSoccerSkillsId
            contactsRefereeInformationId
            __typename
          }
          scoredAt
          team {
            id
            TeamName
            Description
            PhotoId
            City
            County
            State
            owner
            businessesID
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            SportType
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchPartyPointsContactId
          matchPartyPointsTeamId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchPartiesContactId
      matchPartiesTeamId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMatchPartiesQueryVariables,
  APITypes.ListMatchPartiesQuery
>;
export const syncMatchParties = /* GraphQL */ `query SyncMatchParties(
  $filter: ModelMatchPartiesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMatchParties(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      matchID
      contact {
        id
        FirstName
        LastName
        businessesID
        Height
        Weight
        Birthdate
        Gender
        ContactEmails {
          items {
            id
            Email
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        Biography
        PhotoId
        owner
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          PlayerPositions {
            items {
              id
              businessesID
              Position
              owner
              playersoccerskillsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ExperienceLevel
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        RefereeInformation {
          id
          yearsOfExperience
          isCertified
          hasDoneBackgroundCheck
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
        contactsRefereeInformationId
        __typename
      }
      team {
        id
        TeamName
        Description
        PhotoId
        City
        County
        State
        owner
        businessesID
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TeamsToDivisions {
          items {
            id
            teamID
            divisionID
            division {
              id
              owner
              businessesID
              DivisionName
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        SportType
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      matchPartyPosition
      points {
        items {
          id
          matchParty
          contact {
            id
            FirstName
            LastName
            businessesID
            Height
            Weight
            Birthdate
            Gender
            ContactEmails {
              nextToken
              startedAt
              __typename
            }
            Biography
            PhotoId
            owner
            ContactAddresses {
              nextToken
              startedAt
              __typename
            }
            PersonPreferences {
              id
              LengthUnit
              WeightUnit
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            PlayerSoccerSkills {
              id
              LeftRightFooted
              ExperienceLevel
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            RefereeInformation {
              id
              yearsOfExperience
              isCertified
              hasDoneBackgroundCheck
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            ContactRoles {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            contactsPersonPreferencesId
            contactsPlayerSoccerSkillsId
            contactsRefereeInformationId
            __typename
          }
          scoredAt
          team {
            id
            TeamName
            Description
            PhotoId
            City
            County
            State
            owner
            businessesID
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            SportType
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchPartyPointsContactId
          matchPartyPointsTeamId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchPartiesContactId
      matchPartiesTeamId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncMatchPartiesQueryVariables,
  APITypes.SyncMatchPartiesQuery
>;
export const matchPartiesByMatchID = /* GraphQL */ `query MatchPartiesByMatchID(
  $matchID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMatchPartiesFilterInput
  $limit: Int
  $nextToken: String
) {
  matchPartiesByMatchID(
    matchID: $matchID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      matchID
      contact {
        id
        FirstName
        LastName
        businessesID
        Height
        Weight
        Birthdate
        Gender
        ContactEmails {
          items {
            id
            Email
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        Biography
        PhotoId
        owner
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          PlayerPositions {
            items {
              id
              businessesID
              Position
              owner
              playersoccerskillsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ExperienceLevel
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        RefereeInformation {
          id
          yearsOfExperience
          isCertified
          hasDoneBackgroundCheck
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
        contactsRefereeInformationId
        __typename
      }
      team {
        id
        TeamName
        Description
        PhotoId
        City
        County
        State
        owner
        businessesID
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TeamsToDivisions {
          items {
            id
            teamID
            divisionID
            division {
              id
              owner
              businessesID
              DivisionName
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        SportType
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      matchPartyPosition
      points {
        items {
          id
          matchParty
          contact {
            id
            FirstName
            LastName
            businessesID
            Height
            Weight
            Birthdate
            Gender
            ContactEmails {
              nextToken
              startedAt
              __typename
            }
            Biography
            PhotoId
            owner
            ContactAddresses {
              nextToken
              startedAt
              __typename
            }
            PersonPreferences {
              id
              LengthUnit
              WeightUnit
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            PlayerSoccerSkills {
              id
              LeftRightFooted
              ExperienceLevel
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            RefereeInformation {
              id
              yearsOfExperience
              isCertified
              hasDoneBackgroundCheck
              businessesID
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            ContactRoles {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            contactsPersonPreferencesId
            contactsPlayerSoccerSkillsId
            contactsRefereeInformationId
            __typename
          }
          scoredAt
          team {
            id
            TeamName
            Description
            PhotoId
            City
            County
            State
            owner
            businessesID
            TeamPlayers {
              nextToken
              startedAt
              __typename
            }
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            SportType
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchPartyPointsContactId
          matchPartyPointsTeamId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchPartiesContactId
      matchPartiesTeamId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MatchPartiesByMatchIDQueryVariables,
  APITypes.MatchPartiesByMatchIDQuery
>;
export const getMatchPartyPoints = /* GraphQL */ `query GetMatchPartyPoints($id: ID!) {
  getMatchPartyPoints(id: $id) {
    id
    matchParty
    contact {
      id
      FirstName
      LastName
      businessesID
      Height
      Weight
      Birthdate
      Gender
      ContactEmails {
        items {
          id
          Email
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Biography
      PhotoId
      owner
      ContactAddresses {
        items {
          id
          City
          State
          PostalCode
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      PersonPreferences {
        id
        LengthUnit
        WeightUnit
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      PlayerSoccerSkills {
        id
        LeftRightFooted
        PlayerPositions {
          items {
            id
            businessesID
            Position
            owner
            playersoccerskillsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ExperienceLevel
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      RefereeInformation {
        id
        yearsOfExperience
        isCertified
        hasDoneBackgroundCheck
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      TeamPlayers {
        items {
          id
          contactsID
          teamsID
          IsCaptain
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ContactRoles {
        items {
          id
          contactsID
          rolesID
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      contactsPersonPreferencesId
      contactsPlayerSoccerSkillsId
      contactsRefereeInformationId
      __typename
    }
    scoredAt
    team {
      id
      TeamName
      Description
      PhotoId
      City
      County
      State
      owner
      businessesID
      TeamPlayers {
        items {
          id
          contactsID
          teamsID
          IsCaptain
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      TeamsToDivisions {
        items {
          id
          teamID
          divisionID
          division {
            id
            owner
            businessesID
            DivisionName
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      SportType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    matchPartyPointsContactId
    matchPartyPointsTeamId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMatchPartyPointsQueryVariables,
  APITypes.GetMatchPartyPointsQuery
>;
export const listMatchPartyPoints = /* GraphQL */ `query ListMatchPartyPoints(
  $filter: ModelMatchPartyPointsFilterInput
  $limit: Int
  $nextToken: String
) {
  listMatchPartyPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      matchParty
      contact {
        id
        FirstName
        LastName
        businessesID
        Height
        Weight
        Birthdate
        Gender
        ContactEmails {
          items {
            id
            Email
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        Biography
        PhotoId
        owner
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          PlayerPositions {
            items {
              id
              businessesID
              Position
              owner
              playersoccerskillsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ExperienceLevel
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        RefereeInformation {
          id
          yearsOfExperience
          isCertified
          hasDoneBackgroundCheck
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
        contactsRefereeInformationId
        __typename
      }
      scoredAt
      team {
        id
        TeamName
        Description
        PhotoId
        City
        County
        State
        owner
        businessesID
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TeamsToDivisions {
          items {
            id
            teamID
            divisionID
            division {
              id
              owner
              businessesID
              DivisionName
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        SportType
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchPartyPointsContactId
      matchPartyPointsTeamId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMatchPartyPointsQueryVariables,
  APITypes.ListMatchPartyPointsQuery
>;
export const syncMatchPartyPoints = /* GraphQL */ `query SyncMatchPartyPoints(
  $filter: ModelMatchPartyPointsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMatchPartyPoints(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      matchParty
      contact {
        id
        FirstName
        LastName
        businessesID
        Height
        Weight
        Birthdate
        Gender
        ContactEmails {
          items {
            id
            Email
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        Biography
        PhotoId
        owner
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          PlayerPositions {
            items {
              id
              businessesID
              Position
              owner
              playersoccerskillsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ExperienceLevel
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        RefereeInformation {
          id
          yearsOfExperience
          isCertified
          hasDoneBackgroundCheck
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
        contactsRefereeInformationId
        __typename
      }
      scoredAt
      team {
        id
        TeamName
        Description
        PhotoId
        City
        County
        State
        owner
        businessesID
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TeamsToDivisions {
          items {
            id
            teamID
            divisionID
            division {
              id
              owner
              businessesID
              DivisionName
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        SportType
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchPartyPointsContactId
      matchPartyPointsTeamId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncMatchPartyPointsQueryVariables,
  APITypes.SyncMatchPartyPointsQuery
>;
export const matchPartyPointsByMatchParty = /* GraphQL */ `query MatchPartyPointsByMatchParty(
  $matchParty: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMatchPartyPointsFilterInput
  $limit: Int
  $nextToken: String
) {
  matchPartyPointsByMatchParty(
    matchParty: $matchParty
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      matchParty
      contact {
        id
        FirstName
        LastName
        businessesID
        Height
        Weight
        Birthdate
        Gender
        ContactEmails {
          items {
            id
            Email
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        Biography
        PhotoId
        owner
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          PlayerPositions {
            items {
              id
              businessesID
              Position
              owner
              playersoccerskillsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ExperienceLevel
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        RefereeInformation {
          id
          yearsOfExperience
          isCertified
          hasDoneBackgroundCheck
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
        contactsRefereeInformationId
        __typename
      }
      scoredAt
      team {
        id
        TeamName
        Description
        PhotoId
        City
        County
        State
        owner
        businessesID
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TeamsToDivisions {
          items {
            id
            teamID
            divisionID
            division {
              id
              owner
              businessesID
              DivisionName
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        SportType
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchPartyPointsContactId
      matchPartyPointsTeamId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MatchPartyPointsByMatchPartyQueryVariables,
  APITypes.MatchPartyPointsByMatchPartyQuery
>;
export const getMatchesToReferees = /* GraphQL */ `query GetMatchesToReferees($id: ID!) {
  getMatchesToReferees(id: $id) {
    id
    matchID
    contactID {
      id
      FirstName
      LastName
      businessesID
      Height
      Weight
      Birthdate
      Gender
      ContactEmails {
        items {
          id
          Email
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      Biography
      PhotoId
      owner
      ContactAddresses {
        items {
          id
          City
          State
          PostalCode
          businessesID
          owner
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      PersonPreferences {
        id
        LengthUnit
        WeightUnit
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      PlayerSoccerSkills {
        id
        LeftRightFooted
        PlayerPositions {
          items {
            id
            businessesID
            Position
            owner
            playersoccerskillsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ExperienceLevel
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      RefereeInformation {
        id
        yearsOfExperience
        isCertified
        hasDoneBackgroundCheck
        businessesID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      TeamPlayers {
        items {
          id
          contactsID
          teamsID
          IsCaptain
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      ContactRoles {
        items {
          id
          contactsID
          rolesID
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      contactsPersonPreferencesId
      contactsPlayerSoccerSkillsId
      contactsRefereeInformationId
      __typename
    }
    refereeRoleId
    owner
    businessesID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    matchesToRefereesContactIDId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMatchesToRefereesQueryVariables,
  APITypes.GetMatchesToRefereesQuery
>;
export const listMatchesToReferees = /* GraphQL */ `query ListMatchesToReferees(
  $filter: ModelMatchesToRefereesFilterInput
  $limit: Int
  $nextToken: String
) {
  listMatchesToReferees(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      matchID
      contactID {
        id
        FirstName
        LastName
        businessesID
        Height
        Weight
        Birthdate
        Gender
        ContactEmails {
          items {
            id
            Email
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        Biography
        PhotoId
        owner
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          PlayerPositions {
            items {
              id
              businessesID
              Position
              owner
              playersoccerskillsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ExperienceLevel
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        RefereeInformation {
          id
          yearsOfExperience
          isCertified
          hasDoneBackgroundCheck
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
        contactsRefereeInformationId
        __typename
      }
      refereeRoleId
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchesToRefereesContactIDId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMatchesToRefereesQueryVariables,
  APITypes.ListMatchesToRefereesQuery
>;
export const syncMatchesToReferees = /* GraphQL */ `query SyncMatchesToReferees(
  $filter: ModelMatchesToRefereesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMatchesToReferees(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      matchID
      contactID {
        id
        FirstName
        LastName
        businessesID
        Height
        Weight
        Birthdate
        Gender
        ContactEmails {
          items {
            id
            Email
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        Biography
        PhotoId
        owner
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          PlayerPositions {
            items {
              id
              businessesID
              Position
              owner
              playersoccerskillsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ExperienceLevel
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        RefereeInformation {
          id
          yearsOfExperience
          isCertified
          hasDoneBackgroundCheck
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
        contactsRefereeInformationId
        __typename
      }
      refereeRoleId
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchesToRefereesContactIDId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncMatchesToRefereesQueryVariables,
  APITypes.SyncMatchesToRefereesQuery
>;
export const matchesToRefereesByMatchID = /* GraphQL */ `query MatchesToRefereesByMatchID(
  $matchID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMatchesToRefereesFilterInput
  $limit: Int
  $nextToken: String
) {
  matchesToRefereesByMatchID(
    matchID: $matchID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      matchID
      contactID {
        id
        FirstName
        LastName
        businessesID
        Height
        Weight
        Birthdate
        Gender
        ContactEmails {
          items {
            id
            Email
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        Biography
        PhotoId
        owner
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            businessesID
            owner
            contactsID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          PlayerPositions {
            items {
              id
              businessesID
              Position
              owner
              playersoccerskillsID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          ExperienceLevel
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        RefereeInformation {
          id
          yearsOfExperience
          isCertified
          hasDoneBackgroundCheck
          businessesID
          owner
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        TeamPlayers {
          items {
            id
            contactsID
            teamsID
            IsCaptain
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        ContactRoles {
          items {
            id
            contactsID
            rolesID
            businessesID
            owner
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
        contactsRefereeInformationId
        __typename
      }
      refereeRoleId
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      matchesToRefereesContactIDId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MatchesToRefereesByMatchIDQueryVariables,
  APITypes.MatchesToRefereesByMatchIDQuery
>;
export const getDivisions = /* GraphQL */ `query GetDivisions($id: ID!) {
  getDivisions(id: $id) {
    id
    owner
    businessesID
    DivisionName
    TeamsToDivisions {
      items {
        id
        teamID
        divisionID
        division {
          id
          owner
          businessesID
          DivisionName
          TeamsToDivisions {
            items {
              id
              teamID
              divisionID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDivisionsQueryVariables,
  APITypes.GetDivisionsQuery
>;
export const listDivisions = /* GraphQL */ `query ListDivisions(
  $filter: ModelDivisionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      businessesID
      DivisionName
      TeamsToDivisions {
        items {
          id
          teamID
          divisionID
          division {
            id
            owner
            businessesID
            DivisionName
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDivisionsQueryVariables,
  APITypes.ListDivisionsQuery
>;
export const syncDivisions = /* GraphQL */ `query SyncDivisions(
  $filter: ModelDivisionsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncDivisions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      owner
      businessesID
      DivisionName
      TeamsToDivisions {
        items {
          id
          teamID
          divisionID
          division {
            id
            owner
            businessesID
            DivisionName
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncDivisionsQueryVariables,
  APITypes.SyncDivisionsQuery
>;
export const getTeamsToDivisions = /* GraphQL */ `query GetTeamsToDivisions($id: ID!) {
  getTeamsToDivisions(id: $id) {
    id
    teamID
    divisionID
    division {
      id
      owner
      businessesID
      DivisionName
      TeamsToDivisions {
        items {
          id
          teamID
          divisionID
          division {
            id
            owner
            businessesID
            DivisionName
            TeamsToDivisions {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTeamsToDivisionsQueryVariables,
  APITypes.GetTeamsToDivisionsQuery
>;
export const listTeamsToDivisions = /* GraphQL */ `query ListTeamsToDivisions(
  $filter: ModelTeamsToDivisionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeamsToDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      teamID
      divisionID
      division {
        id
        owner
        businessesID
        DivisionName
        TeamsToDivisions {
          items {
            id
            teamID
            divisionID
            division {
              id
              owner
              businessesID
              DivisionName
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTeamsToDivisionsQueryVariables,
  APITypes.ListTeamsToDivisionsQuery
>;
export const syncTeamsToDivisions = /* GraphQL */ `query SyncTeamsToDivisions(
  $filter: ModelTeamsToDivisionsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTeamsToDivisions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      teamID
      divisionID
      division {
        id
        owner
        businessesID
        DivisionName
        TeamsToDivisions {
          items {
            id
            teamID
            divisionID
            division {
              id
              owner
              businessesID
              DivisionName
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTeamsToDivisionsQueryVariables,
  APITypes.SyncTeamsToDivisionsQuery
>;
export const teamsToDivisionsByTeamID = /* GraphQL */ `query TeamsToDivisionsByTeamID(
  $teamID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTeamsToDivisionsFilterInput
  $limit: Int
  $nextToken: String
) {
  teamsToDivisionsByTeamID(
    teamID: $teamID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      teamID
      divisionID
      division {
        id
        owner
        businessesID
        DivisionName
        TeamsToDivisions {
          items {
            id
            teamID
            divisionID
            division {
              id
              owner
              businessesID
              DivisionName
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TeamsToDivisionsByTeamIDQueryVariables,
  APITypes.TeamsToDivisionsByTeamIDQuery
>;
export const teamsToDivisionsByDivisionID = /* GraphQL */ `query TeamsToDivisionsByDivisionID(
  $divisionID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTeamsToDivisionsFilterInput
  $limit: Int
  $nextToken: String
) {
  teamsToDivisionsByDivisionID(
    divisionID: $divisionID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      teamID
      divisionID
      division {
        id
        owner
        businessesID
        DivisionName
        TeamsToDivisions {
          items {
            id
            teamID
            divisionID
            division {
              id
              owner
              businessesID
              DivisionName
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TeamsToDivisionsByDivisionIDQueryVariables,
  APITypes.TeamsToDivisionsByDivisionIDQuery
>;
export const getTFGroups = /* GraphQL */ `query GetTFGroups($id: ID!) {
  getTFGroups(id: $id) {
    id
    owner
    businessesID
    tournamentID
    groupName
    TFGroupMatches {
      items {
        id
        groupID
        Matches {
          items {
            id
            beginTime
            matchDescription
            MatchParties {
              nextToken
              startedAt
              __typename
            }
            owner
            Field {
              id
              fieldName
              fieldLocation
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            MatchesToReferees {
              nextToken
              startedAt
              __typename
            }
            businessesID
            TFGroupMatches
            endTime
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            matchesFieldId
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        owner
        businessesID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTFGroupsQueryVariables,
  APITypes.GetTFGroupsQuery
>;
export const listTFGroups = /* GraphQL */ `query ListTFGroups(
  $filter: ModelTFGroupsFilterInput
  $limit: Int
  $nextToken: String
) {
  listTFGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      businessesID
      tournamentID
      groupName
      TFGroupMatches {
        items {
          id
          groupID
          Matches {
            items {
              id
              beginTime
              matchDescription
              owner
              businessesID
              TFGroupMatches
              endTime
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchesFieldId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTFGroupsQueryVariables,
  APITypes.ListTFGroupsQuery
>;
export const syncTFGroups = /* GraphQL */ `query SyncTFGroups(
  $filter: ModelTFGroupsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTFGroups(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      owner
      businessesID
      tournamentID
      groupName
      TFGroupMatches {
        items {
          id
          groupID
          Matches {
            items {
              id
              beginTime
              matchDescription
              owner
              businessesID
              TFGroupMatches
              endTime
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchesFieldId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTFGroupsQueryVariables,
  APITypes.SyncTFGroupsQuery
>;
export const tFGroupsByTournamentID = /* GraphQL */ `query TFGroupsByTournamentID(
  $tournamentID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTFGroupsFilterInput
  $limit: Int
  $nextToken: String
) {
  tFGroupsByTournamentID(
    tournamentID: $tournamentID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      businessesID
      tournamentID
      groupName
      TFGroupMatches {
        items {
          id
          groupID
          Matches {
            items {
              id
              beginTime
              matchDescription
              owner
              businessesID
              TFGroupMatches
              endTime
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchesFieldId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TFGroupsByTournamentIDQueryVariables,
  APITypes.TFGroupsByTournamentIDQuery
>;
export const getTFGroupMatches = /* GraphQL */ `query GetTFGroupMatches($id: ID!) {
  getTFGroupMatches(id: $id) {
    id
    groupID
    Matches {
      items {
        id
        beginTime
        matchDescription
        MatchParties {
          items {
            id
            matchID
            contact {
              id
              FirstName
              LastName
              businessesID
              Height
              Weight
              Birthdate
              Gender
              Biography
              PhotoId
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              contactsPersonPreferencesId
              contactsPlayerSoccerSkillsId
              contactsRefereeInformationId
              __typename
            }
            team {
              id
              TeamName
              Description
              PhotoId
              City
              County
              State
              owner
              businessesID
              SportType
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            matchPartyPosition
            points {
              nextToken
              startedAt
              __typename
            }
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            matchPartiesContactId
            matchPartiesTeamId
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        owner
        Field {
          id
          fieldName
          fieldLocation
          owner
          businessesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        MatchesToReferees {
          items {
            id
            matchID
            contactID {
              id
              FirstName
              LastName
              businessesID
              Height
              Weight
              Birthdate
              Gender
              Biography
              PhotoId
              owner
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              contactsPersonPreferencesId
              contactsPlayerSoccerSkillsId
              contactsRefereeInformationId
              __typename
            }
            refereeRoleId
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            matchesToRefereesContactIDId
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        businessesID
        TFGroupMatches
        endTime
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        matchesFieldId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    owner
    businessesID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTFGroupMatchesQueryVariables,
  APITypes.GetTFGroupMatchesQuery
>;
export const listTFGroupMatches = /* GraphQL */ `query ListTFGroupMatches(
  $filter: ModelTFGroupMatchesFilterInput
  $limit: Int
  $nextToken: String
) {
  listTFGroupMatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      groupID
      Matches {
        items {
          id
          beginTime
          matchDescription
          MatchParties {
            items {
              id
              matchID
              matchPartyPosition
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchPartiesContactId
              matchPartiesTeamId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          owner
          Field {
            id
            fieldName
            fieldLocation
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          MatchesToReferees {
            items {
              id
              matchID
              refereeRoleId
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchesToRefereesContactIDId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          businessesID
          TFGroupMatches
          endTime
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchesFieldId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTFGroupMatchesQueryVariables,
  APITypes.ListTFGroupMatchesQuery
>;
export const syncTFGroupMatches = /* GraphQL */ `query SyncTFGroupMatches(
  $filter: ModelTFGroupMatchesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTFGroupMatches(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      groupID
      Matches {
        items {
          id
          beginTime
          matchDescription
          MatchParties {
            items {
              id
              matchID
              matchPartyPosition
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchPartiesContactId
              matchPartiesTeamId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          owner
          Field {
            id
            fieldName
            fieldLocation
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          MatchesToReferees {
            items {
              id
              matchID
              refereeRoleId
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchesToRefereesContactIDId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          businessesID
          TFGroupMatches
          endTime
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchesFieldId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTFGroupMatchesQueryVariables,
  APITypes.SyncTFGroupMatchesQuery
>;
export const tFGroupMatchesByGroupID = /* GraphQL */ `query TFGroupMatchesByGroupID(
  $groupID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTFGroupMatchesFilterInput
  $limit: Int
  $nextToken: String
) {
  tFGroupMatchesByGroupID(
    groupID: $groupID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      groupID
      Matches {
        items {
          id
          beginTime
          matchDescription
          MatchParties {
            items {
              id
              matchID
              matchPartyPosition
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchPartiesContactId
              matchPartiesTeamId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          owner
          Field {
            id
            fieldName
            fieldLocation
            owner
            businessesID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          MatchesToReferees {
            items {
              id
              matchID
              refereeRoleId
              owner
              businessesID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              matchesToRefereesContactIDId
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          businessesID
          TFGroupMatches
          endTime
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          matchesFieldId
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      owner
      businessesID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TFGroupMatchesByGroupIDQueryVariables,
  APITypes.TFGroupMatchesByGroupIDQuery
>;
export const getTFToSports = /* GraphQL */ `query GetTFToSports($id: ID!) {
  getTFToSports(id: $id) {
    id
    SportType
    TournamentFormatType
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTFToSportsQueryVariables,
  APITypes.GetTFToSportsQuery
>;
export const listTFToSports = /* GraphQL */ `query ListTFToSports(
  $filter: ModelTFToSportsFilterInput
  $limit: Int
  $nextToken: String
) {
  listTFToSports(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      SportType
      TournamentFormatType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTFToSportsQueryVariables,
  APITypes.ListTFToSportsQuery
>;
export const syncTFToSports = /* GraphQL */ `query SyncTFToSports(
  $filter: ModelTFToSportsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTFToSports(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      SportType
      TournamentFormatType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTFToSportsQueryVariables,
  APITypes.SyncTFToSportsQuery
>;
export const getTournamentRules = /* GraphQL */ `query GetTournamentRules($id: ID!) {
  getTournamentRules(id: $id) {
    id
    Rule
    Description
    TRulesToTFormat {
      items {
        id
        TournamentFormatType
        ruleID
        rule {
          id
          Rule
          Description
          TRulesToTFormat {
            items {
              id
              TournamentFormatType
              ruleID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          TournamentRulesVariables {
            items {
              id
              ruleVariables
              ruleID
              owner
              businessesID
              tournamentID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    TournamentRulesVariables {
      items {
        id
        ruleVariables
        ruleID
        owner
        businessesID
        tournamentID
        rule {
          id
          Rule
          Description
          TRulesToTFormat {
            items {
              id
              TournamentFormatType
              ruleID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          TournamentRulesVariables {
            items {
              id
              ruleVariables
              ruleID
              owner
              businessesID
              tournamentID
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            nextToken
            startedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTournamentRulesQueryVariables,
  APITypes.GetTournamentRulesQuery
>;
export const listTournamentRules = /* GraphQL */ `query ListTournamentRules(
  $filter: ModelTournamentRulesFilterInput
  $limit: Int
  $nextToken: String
) {
  listTournamentRules(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Rule
      Description
      TRulesToTFormat {
        items {
          id
          TournamentFormatType
          ruleID
          rule {
            id
            Rule
            Description
            TRulesToTFormat {
              nextToken
              startedAt
              __typename
            }
            TournamentRulesVariables {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      TournamentRulesVariables {
        items {
          id
          ruleVariables
          ruleID
          owner
          businessesID
          tournamentID
          rule {
            id
            Rule
            Description
            TRulesToTFormat {
              nextToken
              startedAt
              __typename
            }
            TournamentRulesVariables {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTournamentRulesQueryVariables,
  APITypes.ListTournamentRulesQuery
>;
export const syncTournamentRules = /* GraphQL */ `query SyncTournamentRules(
  $filter: ModelTournamentRulesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTournamentRules(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      Rule
      Description
      TRulesToTFormat {
        items {
          id
          TournamentFormatType
          ruleID
          rule {
            id
            Rule
            Description
            TRulesToTFormat {
              nextToken
              startedAt
              __typename
            }
            TournamentRulesVariables {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      TournamentRulesVariables {
        items {
          id
          ruleVariables
          ruleID
          owner
          businessesID
          tournamentID
          rule {
            id
            Rule
            Description
            TRulesToTFormat {
              nextToken
              startedAt
              __typename
            }
            TournamentRulesVariables {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTournamentRulesQueryVariables,
  APITypes.SyncTournamentRulesQuery
>;
export const getTournamentRulesVariables = /* GraphQL */ `query GetTournamentRulesVariables($id: ID!) {
  getTournamentRulesVariables(id: $id) {
    id
    ruleVariables
    ruleID
    owner
    businessesID
    tournamentID
    rule {
      id
      Rule
      Description
      TRulesToTFormat {
        items {
          id
          TournamentFormatType
          ruleID
          rule {
            id
            Rule
            Description
            TRulesToTFormat {
              nextToken
              startedAt
              __typename
            }
            TournamentRulesVariables {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      TournamentRulesVariables {
        items {
          id
          ruleVariables
          ruleID
          owner
          businessesID
          tournamentID
          rule {
            id
            Rule
            Description
            TRulesToTFormat {
              nextToken
              startedAt
              __typename
            }
            TournamentRulesVariables {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTournamentRulesVariablesQueryVariables,
  APITypes.GetTournamentRulesVariablesQuery
>;
export const listTournamentRulesVariables = /* GraphQL */ `query ListTournamentRulesVariables(
  $filter: ModelTournamentRulesVariablesFilterInput
  $limit: Int
  $nextToken: String
) {
  listTournamentRulesVariables(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      ruleVariables
      ruleID
      owner
      businessesID
      tournamentID
      rule {
        id
        Rule
        Description
        TRulesToTFormat {
          items {
            id
            TournamentFormatType
            ruleID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TournamentRulesVariables {
          items {
            id
            ruleVariables
            ruleID
            owner
            businessesID
            tournamentID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTournamentRulesVariablesQueryVariables,
  APITypes.ListTournamentRulesVariablesQuery
>;
export const syncTournamentRulesVariables = /* GraphQL */ `query SyncTournamentRulesVariables(
  $filter: ModelTournamentRulesVariablesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTournamentRulesVariables(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      ruleVariables
      ruleID
      owner
      businessesID
      tournamentID
      rule {
        id
        Rule
        Description
        TRulesToTFormat {
          items {
            id
            TournamentFormatType
            ruleID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TournamentRulesVariables {
          items {
            id
            ruleVariables
            ruleID
            owner
            businessesID
            tournamentID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTournamentRulesVariablesQueryVariables,
  APITypes.SyncTournamentRulesVariablesQuery
>;
export const tournamentRulesVariablesByRuleID = /* GraphQL */ `query TournamentRulesVariablesByRuleID(
  $ruleID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTournamentRulesVariablesFilterInput
  $limit: Int
  $nextToken: String
) {
  tournamentRulesVariablesByRuleID(
    ruleID: $ruleID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      ruleVariables
      ruleID
      owner
      businessesID
      tournamentID
      rule {
        id
        Rule
        Description
        TRulesToTFormat {
          items {
            id
            TournamentFormatType
            ruleID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TournamentRulesVariables {
          items {
            id
            ruleVariables
            ruleID
            owner
            businessesID
            tournamentID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TournamentRulesVariablesByRuleIDQueryVariables,
  APITypes.TournamentRulesVariablesByRuleIDQuery
>;
export const tournamentRulesVariablesByTournamentID = /* GraphQL */ `query TournamentRulesVariablesByTournamentID(
  $tournamentID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTournamentRulesVariablesFilterInput
  $limit: Int
  $nextToken: String
) {
  tournamentRulesVariablesByTournamentID(
    tournamentID: $tournamentID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      ruleVariables
      ruleID
      owner
      businessesID
      tournamentID
      rule {
        id
        Rule
        Description
        TRulesToTFormat {
          items {
            id
            TournamentFormatType
            ruleID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TournamentRulesVariables {
          items {
            id
            ruleVariables
            ruleID
            owner
            businessesID
            tournamentID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TournamentRulesVariablesByTournamentIDQueryVariables,
  APITypes.TournamentRulesVariablesByTournamentIDQuery
>;
export const getTRulesToTFormat = /* GraphQL */ `query GetTRulesToTFormat($id: ID!) {
  getTRulesToTFormat(id: $id) {
    id
    TournamentFormatType
    ruleID
    rule {
      id
      Rule
      Description
      TRulesToTFormat {
        items {
          id
          TournamentFormatType
          ruleID
          rule {
            id
            Rule
            Description
            TRulesToTFormat {
              nextToken
              startedAt
              __typename
            }
            TournamentRulesVariables {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      TournamentRulesVariables {
        items {
          id
          ruleVariables
          ruleID
          owner
          businessesID
          tournamentID
          rule {
            id
            Rule
            Description
            TRulesToTFormat {
              nextToken
              startedAt
              __typename
            }
            TournamentRulesVariables {
              nextToken
              startedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTRulesToTFormatQueryVariables,
  APITypes.GetTRulesToTFormatQuery
>;
export const listTRulesToTFormats = /* GraphQL */ `query ListTRulesToTFormats(
  $filter: ModelTRulesToTFormatFilterInput
  $limit: Int
  $nextToken: String
) {
  listTRulesToTFormats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      TournamentFormatType
      ruleID
      rule {
        id
        Rule
        Description
        TRulesToTFormat {
          items {
            id
            TournamentFormatType
            ruleID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TournamentRulesVariables {
          items {
            id
            ruleVariables
            ruleID
            owner
            businessesID
            tournamentID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTRulesToTFormatsQueryVariables,
  APITypes.ListTRulesToTFormatsQuery
>;
export const syncTRulesToTFormats = /* GraphQL */ `query SyncTRulesToTFormats(
  $filter: ModelTRulesToTFormatFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTRulesToTFormats(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      TournamentFormatType
      ruleID
      rule {
        id
        Rule
        Description
        TRulesToTFormat {
          items {
            id
            TournamentFormatType
            ruleID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TournamentRulesVariables {
          items {
            id
            ruleVariables
            ruleID
            owner
            businessesID
            tournamentID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncTRulesToTFormatsQueryVariables,
  APITypes.SyncTRulesToTFormatsQuery
>;
export const tRulesToTFormatsByRuleID = /* GraphQL */ `query TRulesToTFormatsByRuleID(
  $ruleID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTRulesToTFormatFilterInput
  $limit: Int
  $nextToken: String
) {
  tRulesToTFormatsByRuleID(
    ruleID: $ruleID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      TournamentFormatType
      ruleID
      rule {
        id
        Rule
        Description
        TRulesToTFormat {
          items {
            id
            TournamentFormatType
            ruleID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        TournamentRulesVariables {
          items {
            id
            ruleVariables
            ruleID
            owner
            businessesID
            tournamentID
            rule {
              id
              Rule
              Description
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TRulesToTFormatsByRuleIDQueryVariables,
  APITypes.TRulesToTFormatsByRuleIDQuery
>;
