/**
 * A fixture representing a list of actions with their details.
 * Each action includes an ID, name, and description.
 * When ever we have a new action we would like to add, we add it here.
 * Our seed Lambda hanldes updating/creating new Actions
 *
 * @type {Array<Object>}
 * @property {string} id - The unique identifier for the action.
 * @property {string} actionName - The name of the action.
 * @property {string} Description - A brief description of what the action does.
 */
export const actionsFixture = [
  {
    id: '8e0ce2b5-a85f-403e-8e00-6f41d6309c53',
    actionName: 'createBusinesses',
    Description: 'Create new Business / Tenant'
  },
  {
    id: '7fe5cb09-637f-4f5b-8271-49443692ad92',
    actionName: 'listBusinesses',
    Description: 'List Businessess'
  },
  {
    id: 'd8faad11-edb4-4e8d-a116-a2f1855df226',
    actionName: 'createContactEmails',
    Description: 'Create new Contact email connected to a Contact'
  },
  {
    id: '4e5aadd2-f131-4627-81a9-ff28567f7b7a',
    actionName: 'createContacts',
    Description: 'Create new Contact, either User in the tenant, or player information'
  },
  {
    id: 'c463cb7f-36e0-470b-96b0-091f2841e7b3',
    actionName: 'createContactRoles',
    Description: 'Create new Role, that is attached to ContactID, and RoleID, also thoses roles can be business Specific'
  },
  {
    id: 'f07002b4-2467-4fa0-88e1-d871526c8ee3',
    actionName: 'createBusinessAddresses',
    Description: 'Create new Buisness Addresses'
  },
  {
    id: '541db06d-79b6-4fed-8951-8d452c3efc78',
    actionName: 'insertPlayer',
    Description: 'Create new Player Contact, with New Contact emails, Contact Address'
  },
  {
    id: '41617310-2be9-4cc1-8d0c-4f46cf9f6abe',
    actionName: 'getContacts',
    Description: 'Retrive Contact info'
  },
  {
    id: '9be0e1b5-e9fe-49d4-af7f-ba830087dce3',
    actionName: 'listContacts',
    Description: 'List Contact info'
  },
  {
    id: '3a9b3a51-48b7-4daf-9a16-915ee9250d3e',
    actionName: 'updateContacts',
    Description: 'Update Contact info'
  },
  {
    id: '777d4c47-97e1-4885-aaa4-63e96e7dd869',
    actionName: 'deleteContacts',
    Description: 'Delete Contact/ flip _deleted flag to true'
  },
  {
    id: '11c823c2-b0ca-404e-bf8d-ca8b37cec96f',
    actionName: 'insertTeam',
    Description: 'Create new Team'
  },
  {
    id: '72ff940b-882b-414a-ac28-cd11b89ca4fc',
    actionName: 'createTeamPlayers',
    Description: 'Create new relationship entry between Team & Player'
  },
  {
    id: '5f210ef0-9c77-4edd-924c-e2221540a97e',
    actionName: 'updateTeam',
    Description: 'Update Team'
  },
  {
    id: 'bf03b101-be59-4d7b-815c-f46cc54e5f6b',
    actionName: 'updatePlayer',
    Description: 'Update Player information'
  },
  {
    id: 'b807789b-3154-4df2-9fe0-40998e2bce1d',
    actionName: 'listTeams',
    Description: 'List all teams'
  },
  {
    id: '67fddb08-646d-47d6-8e34-4d84d69cf161',
    actionName: 'getTeams',
    Description: 'Get Teams'
  },
  {
    id: '5e27bed9-596e-4fbd-9272-ededa4841c81',
    actionName: 'deleteTeams',
    Description: 'Delete Team, set _deleted flag to true'
  },
  {
    id: '37e1ed11-4d73-4026-b8de-44cf981064f2',
    actionName: 'deleteTeamPlayers',
    Description: 'Delete TeamPlayer entry'
  },
  {
    id: 'a84fb902-fef3-42f5-83df-0ec0d911175f',
    actionName: 'listTeamPlayers',
    Description: 'List all TeamPlayers'
  },
  {
    id: '6f4f7d0b-4347-435a-9735-755d425acd18',
    actionName: 'createUser',
    Description: 'Create new user'
  },
  {
    id: '62f81dee-d5be-4282-b14e-340e2adf2fde',
    actionName: 'deleteUser',
    Description: 'Delete user'
  },
  {
    id: '153705a5-fae3-4f6d-916a-587906c7cf3a',
    actionName: 'listUsers',
    Description: 'List all users in business'
  },
  {
    id: '2b0c1a2c-d7e7-4844-9a74-4c6991528c9e',
    actionName: 'createContactAddresses',
    Description: 'Create Contact Address'
  },
  {
    id: '1fe6ae5c-8e7f-46c7-ae88-c6003ebdfe54',
    actionName: 'createRefereeInformation',
    Description: 'Create Referee information'
  },
  {
    id: 'cc016fd5-18dc-464d-ade8-3e065952c847',
    actionName: 'createFields',
    Description: 'Create Facility Field'
  },
  {
    id: 'd214bcac-89dd-4d11-b58f-978cc0925e72',
    actionName: 'deleteFields',
    Description: 'Delete Facility Field'
  },
  {
    id: 'cc4c5959-34a8-4e75-8abb-720e97b89a75',
    actionName: 'updateFields',
    Description: 'Update Facility Field'
  },
  {
    id: 'bf245422-8a5b-4f51-ab35-bf32beac632b',
    actionName: 'listFields',
    Description: 'List All Fields'
  },
  {
    id: '38731d53-d720-4e4d-a3f4-f9fa7982fb89',
    actionName: 'getFields',
    Description: 'Get Field'
  },
  {
    id: 'c7290b04-4dfc-41fb-818d-68ead0d1406c',
    actionName: 'listTournaments',
    Description: 'List all tournaments'
  },
  {
    id: 'd785d26a-1bc3-4260-94ba-05ded865ee14',
    actionName: 'listTournamentRules',
    Description: 'List all tournaments Rules'
  },
  {
    id: 'bdf9c448-a017-440a-8dbb-e7fcdf7c6976',
    actionName: 'createTourney',
    Description: 'Create Tournament'
  },
  {
    id: '9cd3ef10-f77e-4a16-a423-c8a10905dfbb',
    actionName: 'getTournaments',
    Description: 'get tourney'
  },
  {
    id: '0f2e310d-be6e-420d-9133-9acb66b027bf',
    actionName: 'updateTourney',
    Description: 'update tourney'
  },
  {
    id: 'b2ed5909-55eb-45aa-a6a0-98850773c69a',
    actionName: 'deleteTournaments',
    Description: 'Delete Tourney'
  },

  {
    id: '69036ad6-ea17-472d-acff-c2a40f414a2f',
    actionName: 'updateMatches',
    Description: 'Update Match'
  },
  {
    id: 'ef9b39cf-059a-4920-bcc1-51e61eff4d68',
    actionName: 'createMatchPartyPoints',
    Description: 'add Match points'
  },
  {
    id: '8054a0c3-e82d-48f7-a632-a248b3174855',
    actionName: 'deleteMatchPartyPoints',
    Description: 'delete Match points'
  },
  {
    id: '689b1155-2a20-44d6-a498-741f2082e318',
    actionName: 'updateMatchParties',
    Description: 'Update MatchParty'
  },
  {
    id: '84767b85-4984-4aba-add8-46a7d08e76f2',
    actionName: 'updateTournaments',
    Description: 'Update tournaments using VTL resolver'
  },
  {
    id: '93b47263-6670-40a0-b914-4a8a1cbd01ee',
    actionName: 'listContactRoles',
    Description: 'List Contact Roles'
  },
  {
    id: 'c91f68da-d59b-454b-8a31-90e92464bffc',
    actionName: 'listContactEmails',
    Description: 'List Contact Emails'
  },
  {
    id: 'fc682193-ac02-4e34-922b-a47033e26b6b',
    actionName: 'updateBusinesses',
    Description: 'Update business details'
  },
  {
    id: '77a3e03b-31b4-4e6e-ad0c-1d9d7d98d2d9',
    actionName: 'updateBusinessAddresses',
    Description: 'Update the address of a business'
  }
];
