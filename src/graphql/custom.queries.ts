import {
  type SoccerExperienceLevelTypes,
  type SoccerPositionTypes,
  type FootPreferenceTypes,
  type GenderTypes,
  type MeasurementUnitTypes,
  TeamPlayers,
  type Tournaments,
  type TournamentRules,
  Fields,
  CreateFieldsInput,
  MatchPartyPoints
} from 'API';
import { Contact, Team } from './table.models';
import { RegistrationStepsFrom } from 'features/signup/models/signup.models';
import { MatchDetails } from 'features/tournament/models/tournamentForm.model';

export const customGetContacts = /* GraphQL */ `
  query CustomGetContacts($id: ID!) {
    getContacts(id: $id) {
      id
      FirstName
      LastName
      businessesID
      Height
      Weight
      Birthdate
      Gender
      ContactRoles {
          items {
            id
            rolesID
            contactsID
          }
          nextToken
          startedAt
        }
      ContactEmails {
        items {
          id
          Email
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      Biography
      PhotoId
      ContactAddresses {
        items {
          id
          City
          State
          PostalCode
          contactsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      PersonPreferences {
        id
        LengthUnit
        WeightUnit
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      PlayerSoccerSkills {
        id
        LeftRightFooted
        PlayerPositions {
          items {
            Position
            id
            _version
            
          }
          nextToken
          startedAt
        }
        ExperienceLevel
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      contactsPersonPreferencesId
      contactsPlayerSoccerSkillsId
      TeamPlayers(filter: {_deleted: {ne: true}}) {
        items {
          IsCaptain
          _deleted
          _lastChangedAt
          _version
          contactsID
          createdAt
          id
          owner
          teamsID
          updatedAt
        }
      }
      owner
    }
  }
`;

export const customListContacts = /* GraphQL */ `
  query customListContacts(
    $filter: ModelContactsFilterInput
    $limit: Int
    $nextToken: String
  ) {
     listTeams(limit: 1000, filter: {_deleted: {ne: true}}) {
      items {
        TeamPlayers(filter: {_deleted: {ne: true}}) {
          items {
            IsCaptain
            _deleted
            contactsID
            id
            owner
            teamsID
            _version
          }
        }
        TeamName
      }
    }
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
          nextToken
          startedAt
        }
        Biography
        PhotoId
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            contactsID
          }
          nextToken
          startedAt
        }
        ContactRoles {
          items {
            id
            rolesID
            contactsID
          }
          nextToken
          startedAt
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          ExperienceLevel
          PlayerPositions {
            items {
              Position
            }
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
      }
      nextToken
      startedAt
    }
  }
`;

export const customListTeamsWithContacts = (ownerId: string) => {
  return `
  query customListTeamsWithContacts {
    listTeams(limit: 1000, filter: {_deleted: {ne: true}}) {
      items {
        TeamPlayers(filter: {_deleted: {ne: true}}) {
          items {
            IsCaptain
            _deleted
            contactsID
            id
            owner
            teamsID
            _version
          }
        }
        City
        County
        Description
        PhotoId
        State
        TeamName
        _deleted
        id
        owner
        _version
      }
    }
    listContacts(filter: {_deleted: {ne: true}, and: {id: {notContains: "${ownerId}"}}}, limit: 1000) {
      items {
        FirstName
        LastName
        PhotoId
        _version
        owner
        id
        _deleted
        ContactRoles {
          items {
            id
            rolesID
            contactsID
          }
          nextToken
          startedAt
        }
      }
    }
  }
  `
};

export interface CustomListTeamsWithContacts {
  listContacts: {
    items: Array<Contact>
  }
  listTeams: {
    items: Array<Team>
  }
}

export interface CustomGetContactsQuery {
  id: string
  FirstName: string
  LastName?: string | null
  businessesID: string
  Height?: number | null
  Weight?: number | null
  Birthdate?: string | null
  Gender?: GenderTypes | null
  ContactEmails?: {
    items: Array< {
      id: string
      Email?: string | null
      contactsID: string
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
      owner?: string | null
    } | null >
    nextToken?: string | null
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
      createdAt: string
      updatedAt: string
      _version: number
      _deleted?: boolean | null
      _lastChangedAt: number
      owner?: string | null
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
    PlayerPositions?: {
      items: Array< {
        __typename: 'ContactAddresses'
        id: string
        Position?: SoccerPositionTypes | null
        createdAt: string
        updatedAt: string
        _version: number
        _deleted?: boolean | null
        _lastChangedAt: number
        owner?: string | null
      } | null >
      nextToken?: string | null
      startedAt?: number | null
    } | null
    ExperienceLevel?: SoccerExperienceLevelTypes | null
    createdAt: string
    updatedAt: string
    _version: number
    _deleted?: boolean | null
    _lastChangedAt: number
    owner?: string | null
  } | null
  createdAt: string
  updatedAt: string
  _version: number
  _deleted?: boolean | null
  _lastChangedAt: number
  contactsPersonPreferencesId?: string | null
  contactsPlayerSoccerSkillsId?: string | null
  TeamPlayers?:  {
    __typename: "ModelTeamPlayersConnection",
    items:  Array< {
      __typename: "TeamPlayers",
      id: string,
      contactsID: string,
      teamsID: string,
      IsCaptain: boolean,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
  owner?: string | null
  UrlImage?: string | null
};

export const getTeamWithDeletedEnabled = (id: string): string => {
  return `
  query getTeamWithDeletedEnabled {
    getTeams(id: "${id}") {
      TeamPlayers(filter: {_deleted: {ne: true}}) {
        items {
          IsCaptain
          _deleted
          contactsID
          id
          owner
          teamsID
          _version
        }
      }
      City
      County
      Description
      PhotoId
      State
      TeamName
      _deleted
      _version
      id
      owner
    }
  }
  `
}

export interface ListContactsWithTeamPlayer {
  listContacts: {
    items: Contact[]
  },
  listTeamPlayers: {
    items: TeamPlayers[]
  }
}
export function listContactsWithTeamPlayer (ownerId: string): string {
  return `
  query listContactsWithTeamPlayer(
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
        Biography
        PhotoId
        ContactRoles {
          items {
            id
            rolesID
            contactsID
          }
          nextToken
          startedAt
        }
        ContactAddresses {
          items {
            id
            City
            State
            PostalCode
            contactsID
          }
        }
        PersonPreferences {
          id
          LengthUnit
          WeightUnit
          createdAt
          updatedAt
          _version
          _deleted
        }
        PlayerSoccerSkills {
          id
          LeftRightFooted
          ExperienceLevel
          PlayerPositions {
            items {
              Position
            }
          }
          _version
          _deleted
          owner
        }
        owner
        _version
        contactsPersonPreferencesId
        contactsPlayerSoccerSkillsId
      }
    }
    listTeamPlayers(limit: 1000, filter: {_deleted: {ne: true}, and: {owner: {contains: "${ownerId}"}}}) {
      items {
        IsCaptain
        _version
        contactsID
        id
        teamsID
        updatedAt
        owner
        createdAt
        _deleted
      }
    }
  }
`
}

export function deleteMultiTeamPlayers (teamPlayers: TeamPlayers[]): string {
  const teamPlayersMutations = teamPlayers?.map((teamplayer, i) => {
    return `mutation${i}: deleteTeamPlayers(input: {_version: ${teamplayer._version}, id: "${teamplayer.id}"}) {
      id
    }`
  });
  return `
  mutation MyMutation {
    ${teamPlayersMutations}
  }`
}

export function createAdminAccountMutation (form: RegistrationStepsFrom, userId: string, businessID: string) {
  return `
  mutation createAdminAccount {
    createBusinesses(input: {BusinessName: "${form.companyInformation.value.businessName}", BusinessSize: "${form.companyInformation.value.businessSize}", id: "${businessID}"}) {
      id
    }
    createContacts(input: {FirstName: "${form.userInformation.value.firstName}", LastName: "${form.userInformation.value.lastName}", businessesID: "${businessID}", id: "${userId}"}) {
      id
    }
    createBusinessAddresses(input: {City: "${form.companyInformation.value.city}", Country: "USA", PostalCode: "${form.companyInformation.value.zipcode}", State: "${form.companyInformation.value.state}", StreetAddress: "${form.companyInformation.value.facilityMailingAddress}", businessesID: "${businessID}"}) {
      id
    }
    createContactRoles(input: {rolesID: "1", contactsID: "${userId}", businessesID: "${businessID}"}) {
      id
    }
    createContactEmails(input: {Email: "${form.email.value.email}", contactsID: "${userId}"}) {
    id
  }
}
`
}

export function updateMultipleFields (fields: Fields[]): string {
  return `mutation update`
}

export function createContactCustomMutation(form: RegistrationStepsFrom, businessID: string, userId: string, type: string) {
  if (type === 'ADMIN') {
    return `
    mutation createAccount {
      createContacts(input: {FirstName: "${form.userInformation.value.firstName}", LastName: "${form.userInformation.value.lastName}", businessesID: "${businessID}", id: "${userId}"}) {
        id
        }
    }
    `
  }
  const { 
    refereeInformation: 
    { 
      value: 
      { 
        city,
        zipCode, 
        state, 
        hasDoneBackgroundCheck, 
        isCertified, 
        yearsOfExperience 
      }
    } 
  } = form;

  const isBackground = (hasDoneBackgroundCheck as unknown as string) === "" || isCertified === false ? false : true ;
  const certified = (isCertified as unknown as string) === "" || isCertified === false ? false : true;
  
  return `
  mutation createAccount {
    createContacts(input: {FirstName: "${form.userInformation.value.firstName}", LastName: "${form.userInformation.value.lastName}", businessesID: "${businessID}", id: "${userId}", contactsRefereeInformationId: "${userId}"}) {
      id
    }
    createContactAddresses(input: {City: "${city}", PostalCode: "${zipCode}", State: "${state}", businessesID: "${businessID}", contactsID: "${userId}", owner: "${userId}"}) {
      id
    }
    createRefereeInformation(input: {businessesID: "${businessID}", hasDoneBackgroundCheck: ${certified}, isCertified: ${isBackground}, owner: "${userId}", yearsOfExperience: "${yearsOfExperience}", id: "${userId}"}) {
      id
  }
  }
  `
}

export const listUsers = `
query listUsers {
  listContacts(limit: 1000, filter: {_deleted: {ne: true}}) {
    items {
      ContactRoles {
        items {
          id
          contactsID
          businessesID
          rolesID
        }
      }
      FirstName
      LastName
      PhotoId
      id
      ContactEmails {
        items {
          id
          Email
          _version
        }
      }
      ContactAddresses {
        items {
          id
          City
          State
          PostalCode
        }
      }
    }
  }
   listBusinesses(limit: 1000, filter: {_deleted: {ne: true}}) {
    items {
      id
      BusinessName
      BusinessSize
      _version
      BusinessAddresses {
        items {
          id
          City
          Country
          PostalCode
          State
          StreetAddress
          StreetAddress2
          _version
        }
      }
    }
  }
  listContactRoles(limit: 1000, filter: {_deleted: {ne: true}}) {
    items {
      _deleted
      _lastChangedAt
      _version
      businessesID
      contactsID
      createdAt
      id
      owner
      rolesID
      updatedAt
    }
  }
    listContactEmails(limit: 1000, filter: {_deleted: {ne: true}}) {
    items {
      Email
      _deleted
      _lastChangedAt
      _version
      businessesID
      contactsID
      createdAt
      id
      owner
      updatedAt
    }
  }
}
`;

export interface CustomListTeamsFieldsReferees {
  listContacts: {
    items: Array<Contact>
  },
  allContacts: {
    items: Array<Contact>
  }
  listTeams: {
    items: Array<Team>
  },
  listFields: {
    items: Array<Fields>
  },
  listTournaments: {
    items: Array<Tournaments>
  },
  listTournamentRules: {
    items: Array<TournamentRules>
  },
  getTournaments?: Tournaments
}

export const customListTourney = `
query customListTourney {
  listTournaments(limit: 1000, filter: {_deleted: {ne: true}}) {
    items {
      customRules
      SportType
      haveEnded
      _deleted
      _lastChangedAt
      _version
      businessesID
      createdAt
      id
      owner
      tournamentDescription
      tournamentName
      tournamentImageId
      updatedAt
      TFGroups {
        items {
          _deleted
          _lastChangedAt
          _version
          businessesID
          createdAt
          groupName
          id
          owner
          tournamentID
          updatedAt
          TFGroupMatches {
            items {
              _deleted
              _lastChangedAt
              _version
              businessesID
              createdAt
              groupID
              id
              owner
              updatedAt
              Matches {
                items {
                  TFGroupMatches
                  _deleted
                  _lastChangedAt
                  _version
                  beginTime
                  businessesID
                  createdAt
                  id
                  matchesFieldId
                  owner
                  updatedAt
                  MatchParties {
                    items {
                      _deleted
                      _lastChangedAt
                      _version
                      businessesID
                      createdAt
                      matchID
                      matchPartiesContactId
                      matchPartiesTeamId
                      owner
                      points(filter: {_deleted: {ne: true}}) {
                        items {
                          _version
                          id
                          matchParty
                          matchPartyPointsContactId
                          matchPartyPointsTeamId
                          scoredAt
                        }
                      }
                      updatedAt
                      id
                      team {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      TournamentFormatType
      TournamentRulesVariables {
        items {
          ruleID
          ruleVariables
          tournamentID
          _version
        }
      }
    }
  }
}
`;

export function getTourneyQuery (tourneyID?: string): string {
  let getTourneyQueryString = '';
  if (tourneyID !== undefined && tourneyID !== null && tourneyID !== '') {
    getTourneyQueryString = `
      getTournaments(id: "${tourneyID}") {
    SportType
    customRules
    TournamentFormatType
    _deleted
    _lastChangedAt
    _version
    businessesID
    createdAt
    id
    owner
    tournamentDescription
    tournamentImageId
    tournamentName
    haveEnded
    updatedAt
    TFGroups(limit: 1000, filter: {_deleted: {ne: true}}) {
      items {
        _deleted
        _lastChangedAt
        _version
        businessesID
        createdAt
        groupName
        id
        owner
        tournamentID
        updatedAt
        TFGroupMatches(filter: {_deleted: {ne: true}}) {
          items {
            _deleted
            _lastChangedAt
            _version
            businessesID
            createdAt
            groupID
            id
            owner
            updatedAt
            Matches(filter: {_deleted: {ne: true}}) {
              items {
                TFGroupMatches
                _deleted
                _lastChangedAt
                _version
                beginTime
                endTime
                businessesID
                createdAt
                id
                matchDescription
                matchesFieldId
                owner
                updatedAt
                Field {
                  _deleted
                  _lastChangedAt
                  _version
                  businessesID
                  createdAt
                  fieldLocation
                  fieldName
                  id
                  owner
                  updatedAt
                }
                MatchParties(filter: {_deleted: {ne: true}}, limit: 1000) {
                  items {
                    _deleted
                    _lastChangedAt
                    _version
                    businessesID
                    createdAt
                    id
                    matchID
                    matchPartiesContactId
                    matchPartyPosition
                    matchPartiesTeamId
                    owner
                    points(filter: {_deleted: {ne: true}}) {
                      items {
                        _version
                        id
                        matchParty
                        matchPartyPointsContactId
                        matchPartyPointsTeamId
                        scoredAt
                      }
                    }
                    updatedAt
                    team {
                      City
                      County
                      Description
                      PhotoId
                      SportType
                      State
                      TeamName
                      TeamPlayers(limit: 1000, filter: {_deleted: {ne: true}}) {
                        items {
                          IsCaptain
                          _deleted
                          _lastChangedAt
                          _version
                          businessesID
                          contactsID
                          createdAt
                          id
                          owner
                          teamsID
                          updatedAt
                        }
                      }
                      _deleted
                      _lastChangedAt
                      _version
                      businessesID
                      createdAt
                      id
                      owner
                      updatedAt
                    }
                  }
                }
                MatchesToReferees(filter: {_deleted: {ne: true}}, limit: 1000) {
                  items {
                    _deleted
                    _lastChangedAt
                    _version
                    businessesID
                    createdAt
                    id
                    matchID
                    matchesToRefereesContactIDId
                    owner
                    refereeRoleId
                    updatedAt
                    contactID {
                      Biography
                      Birthdate
                      id
                      FirstName
                      LastName
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    TournamentRulesVariables(limit: 1000, filter: {_deleted: {ne: true}}) {
      items {
        _deleted
        _lastChangedAt
        _version
        businessesID
        createdAt
        id
        owner
        ruleID
        ruleVariables
        tournamentID
        updatedAt
        rule {
          Description
          Rule
          id
          _version
        }
      }
    }
  }`
  }

  return `query GetTournaments {
    listTeams(filter: {_deleted: {ne: true}}, limit: 1000) {
    items {
      City
      County
      Description
      PhotoId
      SportType
      State
      TeamName
      _deleted
      _lastChangedAt
      _version
      businessesID
      createdAt
      id
      owner
      updatedAt
      TeamPlayers(limit: 1000, filter: {_deleted: {ne: true}}) {
        items {
          IsCaptain
          _deleted
          _lastChangedAt
          _version
          businessesID
          contactsID
          createdAt
          id
          owner
          teamsID
          updatedAt
        }
      }
      TeamsToDivisions(filter: {_deleted: {eq: true}}, limit: 1000) {
        items {
          _deleted
          _lastChangedAt
          _version
          createdAt
          divisionID
          id
          teamID
          updatedAt
          division {
            DivisionName
            _deleted
            _lastChangedAt
            _version
            businessesID
            createdAt
            id
            owner
            updatedAt
          }
        }
      }
    }
  }
  listContacts(limit: 1000, filter: {_deleted: {ne: true}}) {
    items {
      Biography
      Birthdate
      ContactAddresses(limit: 1000, filter: {_deleted: {ne: true}}) {
        items {
          City
          PostalCode
          State
          _deleted
          id
          owner
          updatedAt
          _lastChangedAt
          _version
          contactsID
          createdAt
        }
      }
      ContactEmails(limit: 1000, filter: {_deleted: {ne: true}}) {
        items {
          Email
          _deleted
          _version
          owner
          id
        }
      }
      ContactRoles(limit: 1000, filter: {_deleted: {ne: true}}) {
        items {
          _deleted
          _lastChangedAt
          _version
          businessesID
          contactsID
          createdAt
          id
          owner
          rolesID
          updatedAt
        }
      }
      FirstName
      Gender
      Height
      LastName
      PersonPreferences {
        LengthUnit
        WeightUnit
        _deleted
        _lastChangedAt
        _version
        businessesID
        createdAt
        id
        owner
        updatedAt
      }
      PhotoId
      PlayerSoccerSkills {
        ExperienceLevel
        LeftRightFooted
        PlayerPositions(limit: 1000, filter: {_deleted: {ne: true}}) {
          items {
            Position
            _deleted
            _version
            _lastChangedAt
            businessesID
            createdAt
            id
            owner
            playersoccerskillsID
            updatedAt
          }
        }
        _deleted
        _lastChangedAt
        _version
        businessesID
        createdAt
        id
        owner
        updatedAt
      }
      RefereeInformation {
        _deleted
        _lastChangedAt
        _version
        businessesID
        createdAt
        hasDoneBackgroundCheck
        id
        isCertified
        owner
        updatedAt
        yearsOfExperience
      }
      TeamPlayers(limit: 1000, filter: {_deleted: {ne: true}}) {
        items {
          IsCaptain
          _deleted
          _lastChangedAt
          _version
          businessesID
          contactsID
          createdAt
          id
          owner
          teamsID
          updatedAt
        }
      }
      Weight
      _deleted
      _lastChangedAt
      _version
      businessesID
      contactsPersonPreferencesId
      contactsPlayerSoccerSkillsId
      contactsRefereeInformationId
      createdAt
      id
      owner
      updatedAt
    }
  }
  listFields(filter: {_deleted: {ne: true}}, limit: 1000) {
    items {
      _deleted
      _lastChangedAt
      _version
      businessesID
      createdAt
      fieldLocation
      fieldName
      id
      owner
      updatedAt
    }
  }
  listTournamentRules(limit: 1000, filter: {_deleted: {ne: true}}) {
    items {
      Description
      Rule
      id
      TRulesToTFormat(limit: 1000, filter: {_deleted: {ne: true}}) {
        items {
          TournamentFormatType
          _deleted
          _lastChangedAt
          _version
          createdAt
          id
          ruleID
          updatedAt
        }
      }
    }
  }
  listTournaments(limit: 1000, filter: {_deleted: {ne: true}}) {
    items {
      SportType
      TournamentFormatType
      _deleted
      _lastChangedAt
      _version
      businessesID
      createdAt
      id
      owner
      customRules
      tournamentDescription
      tournamentImageId
      tournamentName
      updatedAt
      TournamentRulesVariables(limit: 1000, filter: {_deleted: {ne: true}}) {
        items {
          _deleted
          _lastChangedAt
          _version
          businessesID
          createdAt
          id
          owner
          ruleID
          ruleVariables
          tournamentID
          updatedAt
        }
      }
      TFGroups(limit: 1000, filter: {_deleted: {ne: true}}) {
        items {
          groupName
          id
          _version
          TFGroupMatches(limit: 1000, filter: {_deleted: {ne: true}}) {
            items {
              id
              _version
              groupID
              _deleted
              Matches(filter: {_deleted: {ne: true}}, limit: 1000) {
                items {
                  TFGroupMatches
                  beginTime
                  matchDescription
                  matchesFieldId
                  owner
                }
              }
            }
          }
        }
      }
    }
  }
    ${getTourneyQueryString}
}
`;
};

export function updateFieldsMutation (fieldInput?: CreateFieldsInput[]): string {
  const returnFieldMutation = (id: string, fieldName: string, _version: number) => {
    return `
    updateFields(input: {id: "${id}", fieldName: "${fieldName}", _version: ${_version}}) {
        id
    }`
  }
  const allFieldMutation = fieldInput?.map((fieldInput) => {
    return returnFieldMutation(fieldInput?.id ?? '', fieldInput.fieldName, fieldInput?._version ?? 1);
  })
  const query = `
    mutation BulkUpdateFields {
    ${allFieldMutation?.join(' ')}
    }
  `;
  
  return query;
};

export function deleteAllMatchPoints (partyPoints?: MatchPartyPoints[]): string[] | undefined {
  if (partyPoints === undefined) return;
  if (partyPoints.length === 0) return;

  const allMutations = partyPoints?.map((point) => {
    return `
        mutation bulkDeletePoints {
      deleteMatchPartyPoints(input: {_version: ${Number(point._version)}, id: "${point.id}"}) {
        id
      }
        }
    `;
  });
  return allMutations;;
};

export function addNewmatchPoints (match?: MatchDetails, homeParty?: string | null, awayPartyId?: string | null): string[] {
  const awayTeam = match?.awayTeam?.value;
  const homeTeam = match?.homeTeam?.value;
  const allMutations = []
  if (match?.homeTeamScore !== undefined) {
    allMutations.push(...match?.homeTeamScore?.map((x) => {
      return `
      mutation bulkAddMatchPoints {
        createMatchPartyPoints(input: {matchParty: "${homeParty}", matchPartyPointsContactId: "${x.extraData?.playerId}", matchPartyPointsTeamId: "${homeTeam}"}) {
          id
        }
          }
      `
    }))
  }

  if (match?.awayTeamScore !== undefined) {
    allMutations.push(...match?.awayTeamScore?.map((x) => {
      return `
          mutation bulkAddMatchPoints {
        createMatchPartyPoints(input: {matchParty: "${awayPartyId}", matchPartyPointsContactId: "${x.extraData?.playerId}", matchPartyPointsTeamId: "${awayTeam}"}) {
          id
        }
          }
      `
    }))
  }

  return allMutations;
};


export interface updateTournamentMutationInput {
  customRules?: string,
  id?: string,
  haveEnded?: boolean
  _version?: number
}
export const updateTournamentMutation = `
    mutation UpdateTournamentCustomRules($input: UpdateTournamentsInput!) {
      updateTournaments(input: $input) {
        customRules
        haveEnded
        _version
      }
    }
  `