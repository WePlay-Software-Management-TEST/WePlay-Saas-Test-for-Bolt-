/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createTeamPlayers = /* GraphQL */ `mutation CreateTeamPlayers(
  $input: CreateTeamPlayersInput!
  $condition: ModelTeamPlayersConditionInput
) {
  createTeamPlayers(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTeamPlayersMutationVariables,
  APITypes.CreateTeamPlayersMutation
>;
export const updateTeamPlayers = /* GraphQL */ `mutation UpdateTeamPlayers(
  $input: UpdateTeamPlayersInput!
  $condition: ModelTeamPlayersConditionInput
) {
  updateTeamPlayers(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTeamPlayersMutationVariables,
  APITypes.UpdateTeamPlayersMutation
>;
export const deleteTeamPlayers = /* GraphQL */ `mutation DeleteTeamPlayers(
  $input: DeleteTeamPlayersInput!
  $condition: ModelTeamPlayersConditionInput
) {
  deleteTeamPlayers(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTeamPlayersMutationVariables,
  APITypes.DeleteTeamPlayersMutation
>;
export const createTeams = /* GraphQL */ `mutation CreateTeams(
  $input: CreateTeamsInput!
  $condition: ModelTeamsConditionInput
) {
  createTeams(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTeamsMutationVariables,
  APITypes.CreateTeamsMutation
>;
export const updateTeams = /* GraphQL */ `mutation UpdateTeams(
  $input: UpdateTeamsInput!
  $condition: ModelTeamsConditionInput
) {
  updateTeams(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTeamsMutationVariables,
  APITypes.UpdateTeamsMutation
>;
export const deleteTeams = /* GraphQL */ `mutation DeleteTeams(
  $input: DeleteTeamsInput!
  $condition: ModelTeamsConditionInput
) {
  deleteTeams(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTeamsMutationVariables,
  APITypes.DeleteTeamsMutation
>;
export const createPersonPreferences = /* GraphQL */ `mutation CreatePersonPreferences(
  $input: CreatePersonPreferencesInput!
  $condition: ModelPersonPreferencesConditionInput
) {
  createPersonPreferences(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePersonPreferencesMutationVariables,
  APITypes.CreatePersonPreferencesMutation
>;
export const updatePersonPreferences = /* GraphQL */ `mutation UpdatePersonPreferences(
  $input: UpdatePersonPreferencesInput!
  $condition: ModelPersonPreferencesConditionInput
) {
  updatePersonPreferences(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePersonPreferencesMutationVariables,
  APITypes.UpdatePersonPreferencesMutation
>;
export const deletePersonPreferences = /* GraphQL */ `mutation DeletePersonPreferences(
  $input: DeletePersonPreferencesInput!
  $condition: ModelPersonPreferencesConditionInput
) {
  deletePersonPreferences(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePersonPreferencesMutationVariables,
  APITypes.DeletePersonPreferencesMutation
>;
export const createContactAddresses = /* GraphQL */ `mutation CreateContactAddresses(
  $input: CreateContactAddressesInput!
  $condition: ModelContactAddressesConditionInput
) {
  createContactAddresses(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateContactAddressesMutationVariables,
  APITypes.CreateContactAddressesMutation
>;
export const updateContactAddresses = /* GraphQL */ `mutation UpdateContactAddresses(
  $input: UpdateContactAddressesInput!
  $condition: ModelContactAddressesConditionInput
) {
  updateContactAddresses(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateContactAddressesMutationVariables,
  APITypes.UpdateContactAddressesMutation
>;
export const deleteContactAddresses = /* GraphQL */ `mutation DeleteContactAddresses(
  $input: DeleteContactAddressesInput!
  $condition: ModelContactAddressesConditionInput
) {
  deleteContactAddresses(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteContactAddressesMutationVariables,
  APITypes.DeleteContactAddressesMutation
>;
export const createContactEmails = /* GraphQL */ `mutation CreateContactEmails(
  $input: CreateContactEmailsInput!
  $condition: ModelContactEmailsConditionInput
) {
  createContactEmails(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateContactEmailsMutationVariables,
  APITypes.CreateContactEmailsMutation
>;
export const updateContactEmails = /* GraphQL */ `mutation UpdateContactEmails(
  $input: UpdateContactEmailsInput!
  $condition: ModelContactEmailsConditionInput
) {
  updateContactEmails(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateContactEmailsMutationVariables,
  APITypes.UpdateContactEmailsMutation
>;
export const deleteContactEmails = /* GraphQL */ `mutation DeleteContactEmails(
  $input: DeleteContactEmailsInput!
  $condition: ModelContactEmailsConditionInput
) {
  deleteContactEmails(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteContactEmailsMutationVariables,
  APITypes.DeleteContactEmailsMutation
>;
export const createPlayerPositions = /* GraphQL */ `mutation CreatePlayerPositions(
  $input: CreatePlayerPositionsInput!
  $condition: ModelPlayerPositionsConditionInput
) {
  createPlayerPositions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePlayerPositionsMutationVariables,
  APITypes.CreatePlayerPositionsMutation
>;
export const updatePlayerPositions = /* GraphQL */ `mutation UpdatePlayerPositions(
  $input: UpdatePlayerPositionsInput!
  $condition: ModelPlayerPositionsConditionInput
) {
  updatePlayerPositions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePlayerPositionsMutationVariables,
  APITypes.UpdatePlayerPositionsMutation
>;
export const deletePlayerPositions = /* GraphQL */ `mutation DeletePlayerPositions(
  $input: DeletePlayerPositionsInput!
  $condition: ModelPlayerPositionsConditionInput
) {
  deletePlayerPositions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePlayerPositionsMutationVariables,
  APITypes.DeletePlayerPositionsMutation
>;
export const createPlayerSoccerSkills = /* GraphQL */ `mutation CreatePlayerSoccerSkills(
  $input: CreatePlayerSoccerSkillsInput!
  $condition: ModelPlayerSoccerSkillsConditionInput
) {
  createPlayerSoccerSkills(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePlayerSoccerSkillsMutationVariables,
  APITypes.CreatePlayerSoccerSkillsMutation
>;
export const updatePlayerSoccerSkills = /* GraphQL */ `mutation UpdatePlayerSoccerSkills(
  $input: UpdatePlayerSoccerSkillsInput!
  $condition: ModelPlayerSoccerSkillsConditionInput
) {
  updatePlayerSoccerSkills(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePlayerSoccerSkillsMutationVariables,
  APITypes.UpdatePlayerSoccerSkillsMutation
>;
export const deletePlayerSoccerSkills = /* GraphQL */ `mutation DeletePlayerSoccerSkills(
  $input: DeletePlayerSoccerSkillsInput!
  $condition: ModelPlayerSoccerSkillsConditionInput
) {
  deletePlayerSoccerSkills(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePlayerSoccerSkillsMutationVariables,
  APITypes.DeletePlayerSoccerSkillsMutation
>;
export const createContacts = /* GraphQL */ `mutation CreateContacts(
  $input: CreateContactsInput!
  $condition: ModelContactsConditionInput
) {
  createContacts(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateContactsMutationVariables,
  APITypes.CreateContactsMutation
>;
export const updateContacts = /* GraphQL */ `mutation UpdateContacts(
  $input: UpdateContactsInput!
  $condition: ModelContactsConditionInput
) {
  updateContacts(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateContactsMutationVariables,
  APITypes.UpdateContactsMutation
>;
export const deleteContacts = /* GraphQL */ `mutation DeleteContacts(
  $input: DeleteContactsInput!
  $condition: ModelContactsConditionInput
) {
  deleteContacts(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteContactsMutationVariables,
  APITypes.DeleteContactsMutation
>;
export const createRefereeInformation = /* GraphQL */ `mutation CreateRefereeInformation(
  $input: CreateRefereeInformationInput!
  $condition: ModelRefereeInformationConditionInput
) {
  createRefereeInformation(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateRefereeInformationMutationVariables,
  APITypes.CreateRefereeInformationMutation
>;
export const updateRefereeInformation = /* GraphQL */ `mutation UpdateRefereeInformation(
  $input: UpdateRefereeInformationInput!
  $condition: ModelRefereeInformationConditionInput
) {
  updateRefereeInformation(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateRefereeInformationMutationVariables,
  APITypes.UpdateRefereeInformationMutation
>;
export const deleteRefereeInformation = /* GraphQL */ `mutation DeleteRefereeInformation(
  $input: DeleteRefereeInformationInput!
  $condition: ModelRefereeInformationConditionInput
) {
  deleteRefereeInformation(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteRefereeInformationMutationVariables,
  APITypes.DeleteRefereeInformationMutation
>;
export const createContactRoles = /* GraphQL */ `mutation CreateContactRoles(
  $input: CreateContactRolesInput!
  $condition: ModelContactRolesConditionInput
) {
  createContactRoles(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateContactRolesMutationVariables,
  APITypes.CreateContactRolesMutation
>;
export const updateContactRoles = /* GraphQL */ `mutation UpdateContactRoles(
  $input: UpdateContactRolesInput!
  $condition: ModelContactRolesConditionInput
) {
  updateContactRoles(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateContactRolesMutationVariables,
  APITypes.UpdateContactRolesMutation
>;
export const deleteContactRoles = /* GraphQL */ `mutation DeleteContactRoles(
  $input: DeleteContactRolesInput!
  $condition: ModelContactRolesConditionInput
) {
  deleteContactRoles(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteContactRolesMutationVariables,
  APITypes.DeleteContactRolesMutation
>;
export const createRole = /* GraphQL */ `mutation CreateRole(
  $input: CreateRoleInput!
  $condition: ModelRoleConditionInput
) {
  createRole(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateRoleMutationVariables,
  APITypes.CreateRoleMutation
>;
export const updateRole = /* GraphQL */ `mutation UpdateRole(
  $input: UpdateRoleInput!
  $condition: ModelRoleConditionInput
) {
  updateRole(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateRoleMutationVariables,
  APITypes.UpdateRoleMutation
>;
export const deleteRole = /* GraphQL */ `mutation DeleteRole(
  $input: DeleteRoleInput!
  $condition: ModelRoleConditionInput
) {
  deleteRole(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteRoleMutationVariables,
  APITypes.DeleteRoleMutation
>;
export const createPolicy = /* GraphQL */ `mutation CreatePolicy(
  $input: CreatePolicyInput!
  $condition: ModelPolicyConditionInput
) {
  createPolicy(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePolicyMutationVariables,
  APITypes.CreatePolicyMutation
>;
export const updatePolicy = /* GraphQL */ `mutation UpdatePolicy(
  $input: UpdatePolicyInput!
  $condition: ModelPolicyConditionInput
) {
  updatePolicy(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePolicyMutationVariables,
  APITypes.UpdatePolicyMutation
>;
export const deletePolicy = /* GraphQL */ `mutation DeletePolicy(
  $input: DeletePolicyInput!
  $condition: ModelPolicyConditionInput
) {
  deletePolicy(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePolicyMutationVariables,
  APITypes.DeletePolicyMutation
>;
export const createResource = /* GraphQL */ `mutation CreateResource(
  $input: CreateResourceInput!
  $condition: ModelResourceConditionInput
) {
  createResource(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateResourceMutationVariables,
  APITypes.CreateResourceMutation
>;
export const updateResource = /* GraphQL */ `mutation UpdateResource(
  $input: UpdateResourceInput!
  $condition: ModelResourceConditionInput
) {
  updateResource(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateResourceMutationVariables,
  APITypes.UpdateResourceMutation
>;
export const deleteResource = /* GraphQL */ `mutation DeleteResource(
  $input: DeleteResourceInput!
  $condition: ModelResourceConditionInput
) {
  deleteResource(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteResourceMutationVariables,
  APITypes.DeleteResourceMutation
>;
export const createAction = /* GraphQL */ `mutation CreateAction(
  $input: CreateActionInput!
  $condition: ModelActionConditionInput
) {
  createAction(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateActionMutationVariables,
  APITypes.CreateActionMutation
>;
export const updateAction = /* GraphQL */ `mutation UpdateAction(
  $input: UpdateActionInput!
  $condition: ModelActionConditionInput
) {
  updateAction(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateActionMutationVariables,
  APITypes.UpdateActionMutation
>;
export const deleteAction = /* GraphQL */ `mutation DeleteAction(
  $input: DeleteActionInput!
  $condition: ModelActionConditionInput
) {
  deleteAction(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteActionMutationVariables,
  APITypes.DeleteActionMutation
>;
export const createBusinessAddresses = /* GraphQL */ `mutation CreateBusinessAddresses(
  $input: CreateBusinessAddressesInput!
  $condition: ModelBusinessAddressesConditionInput
) {
  createBusinessAddresses(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateBusinessAddressesMutationVariables,
  APITypes.CreateBusinessAddressesMutation
>;
export const updateBusinessAddresses = /* GraphQL */ `mutation UpdateBusinessAddresses(
  $input: UpdateBusinessAddressesInput!
  $condition: ModelBusinessAddressesConditionInput
) {
  updateBusinessAddresses(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateBusinessAddressesMutationVariables,
  APITypes.UpdateBusinessAddressesMutation
>;
export const deleteBusinessAddresses = /* GraphQL */ `mutation DeleteBusinessAddresses(
  $input: DeleteBusinessAddressesInput!
  $condition: ModelBusinessAddressesConditionInput
) {
  deleteBusinessAddresses(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteBusinessAddressesMutationVariables,
  APITypes.DeleteBusinessAddressesMutation
>;
export const createBusinesses = /* GraphQL */ `mutation CreateBusinesses(
  $input: CreateBusinessesInput!
  $condition: ModelBusinessesConditionInput
) {
  createBusinesses(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateBusinessesMutationVariables,
  APITypes.CreateBusinessesMutation
>;
export const updateBusinesses = /* GraphQL */ `mutation UpdateBusinesses(
  $input: UpdateBusinessesInput!
  $condition: ModelBusinessesConditionInput
) {
  updateBusinesses(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateBusinessesMutationVariables,
  APITypes.UpdateBusinessesMutation
>;
export const deleteBusinesses = /* GraphQL */ `mutation DeleteBusinesses(
  $input: DeleteBusinessesInput!
  $condition: ModelBusinessesConditionInput
) {
  deleteBusinesses(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteBusinessesMutationVariables,
  APITypes.DeleteBusinessesMutation
>;
export const createFields = /* GraphQL */ `mutation CreateFields(
  $input: CreateFieldsInput!
  $condition: ModelFieldsConditionInput
) {
  createFields(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateFieldsMutationVariables,
  APITypes.CreateFieldsMutation
>;
export const updateFields = /* GraphQL */ `mutation UpdateFields(
  $input: UpdateFieldsInput!
  $condition: ModelFieldsConditionInput
) {
  updateFields(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateFieldsMutationVariables,
  APITypes.UpdateFieldsMutation
>;
export const deleteFields = /* GraphQL */ `mutation DeleteFields(
  $input: DeleteFieldsInput!
  $condition: ModelFieldsConditionInput
) {
  deleteFields(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteFieldsMutationVariables,
  APITypes.DeleteFieldsMutation
>;
export const createTournaments = /* GraphQL */ `mutation CreateTournaments(
  $input: CreateTournamentsInput!
  $condition: ModelTournamentsConditionInput
) {
  createTournaments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTournamentsMutationVariables,
  APITypes.CreateTournamentsMutation
>;
export const updateTournaments = /* GraphQL */ `mutation UpdateTournaments(
  $input: UpdateTournamentsInput!
  $condition: ModelTournamentsConditionInput
) {
  updateTournaments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTournamentsMutationVariables,
  APITypes.UpdateTournamentsMutation
>;
export const deleteTournaments = /* GraphQL */ `mutation DeleteTournaments(
  $input: DeleteTournamentsInput!
  $condition: ModelTournamentsConditionInput
) {
  deleteTournaments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTournamentsMutationVariables,
  APITypes.DeleteTournamentsMutation
>;
export const createMatches = /* GraphQL */ `mutation CreateMatches(
  $input: CreateMatchesInput!
  $condition: ModelMatchesConditionInput
) {
  createMatches(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMatchesMutationVariables,
  APITypes.CreateMatchesMutation
>;
export const updateMatches = /* GraphQL */ `mutation UpdateMatches(
  $input: UpdateMatchesInput!
  $condition: ModelMatchesConditionInput
) {
  updateMatches(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMatchesMutationVariables,
  APITypes.UpdateMatchesMutation
>;
export const deleteMatches = /* GraphQL */ `mutation DeleteMatches(
  $input: DeleteMatchesInput!
  $condition: ModelMatchesConditionInput
) {
  deleteMatches(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMatchesMutationVariables,
  APITypes.DeleteMatchesMutation
>;
export const createMatchParties = /* GraphQL */ `mutation CreateMatchParties(
  $input: CreateMatchPartiesInput!
  $condition: ModelMatchPartiesConditionInput
) {
  createMatchParties(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMatchPartiesMutationVariables,
  APITypes.CreateMatchPartiesMutation
>;
export const updateMatchParties = /* GraphQL */ `mutation UpdateMatchParties(
  $input: UpdateMatchPartiesInput!
  $condition: ModelMatchPartiesConditionInput
) {
  updateMatchParties(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMatchPartiesMutationVariables,
  APITypes.UpdateMatchPartiesMutation
>;
export const deleteMatchParties = /* GraphQL */ `mutation DeleteMatchParties(
  $input: DeleteMatchPartiesInput!
  $condition: ModelMatchPartiesConditionInput
) {
  deleteMatchParties(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMatchPartiesMutationVariables,
  APITypes.DeleteMatchPartiesMutation
>;
export const createMatchPartyPoints = /* GraphQL */ `mutation CreateMatchPartyPoints(
  $input: CreateMatchPartyPointsInput!
  $condition: ModelMatchPartyPointsConditionInput
) {
  createMatchPartyPoints(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMatchPartyPointsMutationVariables,
  APITypes.CreateMatchPartyPointsMutation
>;
export const updateMatchPartyPoints = /* GraphQL */ `mutation UpdateMatchPartyPoints(
  $input: UpdateMatchPartyPointsInput!
  $condition: ModelMatchPartyPointsConditionInput
) {
  updateMatchPartyPoints(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMatchPartyPointsMutationVariables,
  APITypes.UpdateMatchPartyPointsMutation
>;
export const deleteMatchPartyPoints = /* GraphQL */ `mutation DeleteMatchPartyPoints(
  $input: DeleteMatchPartyPointsInput!
  $condition: ModelMatchPartyPointsConditionInput
) {
  deleteMatchPartyPoints(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMatchPartyPointsMutationVariables,
  APITypes.DeleteMatchPartyPointsMutation
>;
export const createMatchesToReferees = /* GraphQL */ `mutation CreateMatchesToReferees(
  $input: CreateMatchesToRefereesInput!
  $condition: ModelMatchesToRefereesConditionInput
) {
  createMatchesToReferees(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMatchesToRefereesMutationVariables,
  APITypes.CreateMatchesToRefereesMutation
>;
export const updateMatchesToReferees = /* GraphQL */ `mutation UpdateMatchesToReferees(
  $input: UpdateMatchesToRefereesInput!
  $condition: ModelMatchesToRefereesConditionInput
) {
  updateMatchesToReferees(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMatchesToRefereesMutationVariables,
  APITypes.UpdateMatchesToRefereesMutation
>;
export const deleteMatchesToReferees = /* GraphQL */ `mutation DeleteMatchesToReferees(
  $input: DeleteMatchesToRefereesInput!
  $condition: ModelMatchesToRefereesConditionInput
) {
  deleteMatchesToReferees(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMatchesToRefereesMutationVariables,
  APITypes.DeleteMatchesToRefereesMutation
>;
export const createDivisions = /* GraphQL */ `mutation CreateDivisions(
  $input: CreateDivisionsInput!
  $condition: ModelDivisionsConditionInput
) {
  createDivisions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateDivisionsMutationVariables,
  APITypes.CreateDivisionsMutation
>;
export const updateDivisions = /* GraphQL */ `mutation UpdateDivisions(
  $input: UpdateDivisionsInput!
  $condition: ModelDivisionsConditionInput
) {
  updateDivisions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateDivisionsMutationVariables,
  APITypes.UpdateDivisionsMutation
>;
export const deleteDivisions = /* GraphQL */ `mutation DeleteDivisions(
  $input: DeleteDivisionsInput!
  $condition: ModelDivisionsConditionInput
) {
  deleteDivisions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteDivisionsMutationVariables,
  APITypes.DeleteDivisionsMutation
>;
export const createTeamsToDivisions = /* GraphQL */ `mutation CreateTeamsToDivisions(
  $input: CreateTeamsToDivisionsInput!
  $condition: ModelTeamsToDivisionsConditionInput
) {
  createTeamsToDivisions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTeamsToDivisionsMutationVariables,
  APITypes.CreateTeamsToDivisionsMutation
>;
export const updateTeamsToDivisions = /* GraphQL */ `mutation UpdateTeamsToDivisions(
  $input: UpdateTeamsToDivisionsInput!
  $condition: ModelTeamsToDivisionsConditionInput
) {
  updateTeamsToDivisions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTeamsToDivisionsMutationVariables,
  APITypes.UpdateTeamsToDivisionsMutation
>;
export const deleteTeamsToDivisions = /* GraphQL */ `mutation DeleteTeamsToDivisions(
  $input: DeleteTeamsToDivisionsInput!
  $condition: ModelTeamsToDivisionsConditionInput
) {
  deleteTeamsToDivisions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTeamsToDivisionsMutationVariables,
  APITypes.DeleteTeamsToDivisionsMutation
>;
export const createTFGroups = /* GraphQL */ `mutation CreateTFGroups(
  $input: CreateTFGroupsInput!
  $condition: ModelTFGroupsConditionInput
) {
  createTFGroups(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTFGroupsMutationVariables,
  APITypes.CreateTFGroupsMutation
>;
export const updateTFGroups = /* GraphQL */ `mutation UpdateTFGroups(
  $input: UpdateTFGroupsInput!
  $condition: ModelTFGroupsConditionInput
) {
  updateTFGroups(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTFGroupsMutationVariables,
  APITypes.UpdateTFGroupsMutation
>;
export const deleteTFGroups = /* GraphQL */ `mutation DeleteTFGroups(
  $input: DeleteTFGroupsInput!
  $condition: ModelTFGroupsConditionInput
) {
  deleteTFGroups(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTFGroupsMutationVariables,
  APITypes.DeleteTFGroupsMutation
>;
export const createTFGroupMatches = /* GraphQL */ `mutation CreateTFGroupMatches(
  $input: CreateTFGroupMatchesInput!
  $condition: ModelTFGroupMatchesConditionInput
) {
  createTFGroupMatches(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTFGroupMatchesMutationVariables,
  APITypes.CreateTFGroupMatchesMutation
>;
export const updateTFGroupMatches = /* GraphQL */ `mutation UpdateTFGroupMatches(
  $input: UpdateTFGroupMatchesInput!
  $condition: ModelTFGroupMatchesConditionInput
) {
  updateTFGroupMatches(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTFGroupMatchesMutationVariables,
  APITypes.UpdateTFGroupMatchesMutation
>;
export const deleteTFGroupMatches = /* GraphQL */ `mutation DeleteTFGroupMatches(
  $input: DeleteTFGroupMatchesInput!
  $condition: ModelTFGroupMatchesConditionInput
) {
  deleteTFGroupMatches(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTFGroupMatchesMutationVariables,
  APITypes.DeleteTFGroupMatchesMutation
>;
export const createTFToSports = /* GraphQL */ `mutation CreateTFToSports(
  $input: CreateTFToSportsInput!
  $condition: ModelTFToSportsConditionInput
) {
  createTFToSports(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTFToSportsMutationVariables,
  APITypes.CreateTFToSportsMutation
>;
export const updateTFToSports = /* GraphQL */ `mutation UpdateTFToSports(
  $input: UpdateTFToSportsInput!
  $condition: ModelTFToSportsConditionInput
) {
  updateTFToSports(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTFToSportsMutationVariables,
  APITypes.UpdateTFToSportsMutation
>;
export const deleteTFToSports = /* GraphQL */ `mutation DeleteTFToSports(
  $input: DeleteTFToSportsInput!
  $condition: ModelTFToSportsConditionInput
) {
  deleteTFToSports(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTFToSportsMutationVariables,
  APITypes.DeleteTFToSportsMutation
>;
export const createTournamentRules = /* GraphQL */ `mutation CreateTournamentRules(
  $input: CreateTournamentRulesInput!
  $condition: ModelTournamentRulesConditionInput
) {
  createTournamentRules(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTournamentRulesMutationVariables,
  APITypes.CreateTournamentRulesMutation
>;
export const updateTournamentRules = /* GraphQL */ `mutation UpdateTournamentRules(
  $input: UpdateTournamentRulesInput!
  $condition: ModelTournamentRulesConditionInput
) {
  updateTournamentRules(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTournamentRulesMutationVariables,
  APITypes.UpdateTournamentRulesMutation
>;
export const deleteTournamentRules = /* GraphQL */ `mutation DeleteTournamentRules(
  $input: DeleteTournamentRulesInput!
  $condition: ModelTournamentRulesConditionInput
) {
  deleteTournamentRules(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTournamentRulesMutationVariables,
  APITypes.DeleteTournamentRulesMutation
>;
export const createTournamentRulesVariables = /* GraphQL */ `mutation CreateTournamentRulesVariables(
  $input: CreateTournamentRulesVariablesInput!
  $condition: ModelTournamentRulesVariablesConditionInput
) {
  createTournamentRulesVariables(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTournamentRulesVariablesMutationVariables,
  APITypes.CreateTournamentRulesVariablesMutation
>;
export const updateTournamentRulesVariables = /* GraphQL */ `mutation UpdateTournamentRulesVariables(
  $input: UpdateTournamentRulesVariablesInput!
  $condition: ModelTournamentRulesVariablesConditionInput
) {
  updateTournamentRulesVariables(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTournamentRulesVariablesMutationVariables,
  APITypes.UpdateTournamentRulesVariablesMutation
>;
export const deleteTournamentRulesVariables = /* GraphQL */ `mutation DeleteTournamentRulesVariables(
  $input: DeleteTournamentRulesVariablesInput!
  $condition: ModelTournamentRulesVariablesConditionInput
) {
  deleteTournamentRulesVariables(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTournamentRulesVariablesMutationVariables,
  APITypes.DeleteTournamentRulesVariablesMutation
>;
export const createTRulesToTFormat = /* GraphQL */ `mutation CreateTRulesToTFormat(
  $input: CreateTRulesToTFormatInput!
  $condition: ModelTRulesToTFormatConditionInput
) {
  createTRulesToTFormat(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTRulesToTFormatMutationVariables,
  APITypes.CreateTRulesToTFormatMutation
>;
export const updateTRulesToTFormat = /* GraphQL */ `mutation UpdateTRulesToTFormat(
  $input: UpdateTRulesToTFormatInput!
  $condition: ModelTRulesToTFormatConditionInput
) {
  updateTRulesToTFormat(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTRulesToTFormatMutationVariables,
  APITypes.UpdateTRulesToTFormatMutation
>;
export const deleteTRulesToTFormat = /* GraphQL */ `mutation DeleteTRulesToTFormat(
  $input: DeleteTRulesToTFormatInput!
  $condition: ModelTRulesToTFormatConditionInput
) {
  deleteTRulesToTFormat(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTRulesToTFormatMutationVariables,
  APITypes.DeleteTRulesToTFormatMutation
>;
export const insertTeam = /* GraphQL */ `mutation InsertTeam($input: insertTeamInputModel!) {
  insertTeam(input: $input) {
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
` as GeneratedMutation<
  APITypes.InsertTeamMutationVariables,
  APITypes.InsertTeamMutation
>;
export const updateTeam = /* GraphQL */ `mutation UpdateTeam($input: updateTeamInputModel!) {
  updateTeam(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateTeamMutationVariables,
  APITypes.UpdateTeamMutation
>;
export const insertPlayer = /* GraphQL */ `mutation InsertPlayer($input: CreateContactsInputModel!) {
  insertPlayer(input: $input) {
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
` as GeneratedMutation<
  APITypes.InsertPlayerMutationVariables,
  APITypes.InsertPlayerMutation
>;
export const updatePlayer = /* GraphQL */ `mutation UpdatePlayer($input: updateContactsInputModel!) {
  updatePlayer(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdatePlayerMutationVariables,
  APITypes.UpdatePlayerMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser($input: createUserInput!) {
  createUser(input: $input)
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser($input: deleteUserInput!) {
  deleteUser(input: $input)
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createTourney = /* GraphQL */ `mutation CreateTourney($input: tourneyInputResolver!) {
  createTourney(input: $input)
}
` as GeneratedMutation<
  APITypes.CreateTourneyMutationVariables,
  APITypes.CreateTourneyMutation
>;
export const updateTourney = /* GraphQL */ `mutation UpdateTourney($input: tourneyInputResolver!) {
  updateTourney(input: $input)
}
` as GeneratedMutation<
  APITypes.UpdateTourneyMutationVariables,
  APITypes.UpdateTourneyMutation
>;
