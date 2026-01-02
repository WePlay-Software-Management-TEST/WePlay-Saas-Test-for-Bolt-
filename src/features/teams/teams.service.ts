import { API } from 'aws-amplify';
import { getCurrentSession } from 'core/services/auth.service';
import { type TeamsForm } from './hooks/teamsForm.hook';
import { type GraphQLQuery } from '@aws-amplify/api';
import {
  type TeamPlayerBulkInputModel, type insertTeamInputModel, type InsertTeamMutation,
  type updateTeamInputModel,
  type UpdateTeamMutation,
  type GetTeamsQuery,
  type DeleteTeamsMutation,
  type DeleteTeamsInput,
  type TeamPlayers,
  type DeleteTeamPlayersInput,
  type DeleteTeamPlayersMutation,
  type CreateTeamPlayersInput,
  type CreateTeamPlayersMutation
} from 'API';
import { createTeamPlayers, deleteTeamPlayers, deleteTeams, insertTeam, updateTeam } from 'graphql/mutations';
import {
  customListTeamsWithContacts, getTeamWithDeletedEnabled, type CustomListTeamsWithContacts,
  listContactsWithTeamPlayer, type ListContactsWithTeamPlayer, deleteMultiTeamPlayers
} from 'graphql/custom.queries';
import { type Team } from 'graphql/table.models';
import { USER_ROLES } from 'core/context/authContext/auth.context.models';

/**
 * Create a singular Team Record
 * @param { TeamsForm } teamsForm - Team Form interface.
 * @param { string } photoId - Team Photo that have been uploaded.
 * */
export async function createTeam (teamsForm?: TeamsForm, photoId?: string): Promise<
GraphQLQuery<InsertTeamMutation> | undefined> {
  const { idToken } = await getCurrentSession();
  if (teamsForm === undefined) return;
  const teamInput: insertTeamInputModel = {
    TeamName: teamsForm.teamsName,
    Description: teamsForm.teamsDescription,
    PhotoId: photoId,
    City: teamsForm.city,
    County: teamsForm.county,
    State: teamsForm.state,
    TeamPlayers: teamsForm.teamPlayers !== undefined
      ? teamsForm?.teamPlayers.map((teamPlayer): TeamPlayerBulkInputModel => {
        return {
          contactsID: teamPlayer.value,
          IsCaptain: teamPlayer.extraData?.isCaptain ?? false
        };
      })
      : []
  };
  return await API.graphql<GraphQLQuery<InsertTeamMutation>>({
    query: insertTeam, variables: { input: teamInput }, authToken: idToken
  }).then(async (res) => {
    return res.data;
  });
};

/**
 * Add a singular TeamPlayer Record
 * @param { String } contactsId - Contact ID that you want to add.
 * @param { String } teamId - Team ID to where the Team Player will be added.
 * @param { Boolean } isCaptain - Is Captain if assagined as Captain.
 * */
export async function addTeamPlayers (contactsId?: string, teamId?: string, isCaptain: boolean = false): Promise<GraphQLQuery<CreateTeamPlayersMutation> | undefined> {
  if (contactsId === undefined || teamId === undefined) { return undefined; }
  const { idToken } = await getCurrentSession();
  const createTeamPlayerInput: CreateTeamPlayersInput = {
    contactsID: contactsId,
    teamsID: teamId,
    IsCaptain: isCaptain
  };
  return await API.graphql<GraphQLQuery<CreateTeamPlayersMutation>>({
    query: createTeamPlayers, variables: { input: createTeamPlayerInput }, authToken: idToken
  }).then(async (res) => {
    return res.data;
  });
};

/**
 * Update Team Data, Sends request to our "mutationCreateTeam" GraphQL Resolver
 * It updates TeamPlayers and Teams in the same time, with one request.
 * @param {TeamsForm} teamsForm - Teams Form, newly added data goes here.
 * @param {Team} team - Full Team Information, which includes _version & ID
 * @param {string | undefined} photoId - New PhotoID, to save in with the team.
 * */
export async function updateTeamRequest (teamsForm: TeamsForm, team: Team, photoId: string): Promise<GraphQLQuery<UpdateTeamMutation> | undefined> {
  const { idToken } = await getCurrentSession();
  const TeamPlayers: TeamPlayerBulkInputModel[] | null = teamsForm.teamPlayers.map((teamPlayer) => {
    return {
      contactsID: teamPlayer.value,
      IsCaptain: teamPlayer.extraData?.isCaptain ?? false
    };
  });
  const updateTeamInput: updateTeamInputModel = {
    id: team.id,
    TeamName: teamsForm.teamsName,
    Description: teamsForm.teamsDescription,
    PhotoId: photoId,
    City: teamsForm.city,
    State: teamsForm.state,
    County: teamsForm.county,
    _version: team._version,
    TeamPlayers
  };

  return await API.graphql<GraphQLQuery<UpdateTeamMutation>>(
    {
      query: updateTeam,
      variables: {
        input: updateTeamInput
      },
      authToken: idToken
    }
  ).then((res) => {
    return res.data;
  });
};

/**
 * @Request Get list of teams & List of Contacts.
 * @param { string } ownerId - User id who created the data that you want to get (Current User Id).
 * @returns { Promise<GraphQLQuery<CustomListTeamsWithContacts> | undefined> }
 */
export async function listTeamsRequest (ownerId: string): Promise<
GraphQLQuery<CustomListTeamsWithContacts> | undefined> {
  const listTeamsQuery = customListTeamsWithContacts(ownerId);
  const { idToken } = await getCurrentSession();
  return await API.graphql<GraphQLQuery<CustomListTeamsWithContacts>>(
    { query: listTeamsQuery, authToken: idToken }
  ).then((res) => {
    if (res.data?.listContacts === undefined || res.data?.listContacts?.items === undefined) return res.data;
    const contactsWithoutBusinessUsers = res.data?.listContacts?.items.filter((contact) => {
      const isUserAdmin = contact?.ContactRoles?.items?.find((item) => parseInt(item?.rolesID ?? '') !== USER_ROLES.PLAYER);
      if (!isUserAdmin) return true;
      return false;
    });
    res.data.listContacts.items = contactsWithoutBusinessUsers;
    return res.data;
  });
}

/**
 * Get Team with TeamPlayers that have _deleted flag that are not 'true'
 * @param {String} id - Team ID that you want to get.
 * */
export async function getTeamWithDeletedRequest (id: string): Promise<GraphQLQuery<GetTeamsQuery> | undefined> {
  const { idToken } = await getCurrentSession();
  return await API.graphql<GraphQLQuery<GetTeamsQuery>>({
    query: getTeamWithDeletedEnabled(id),
    authToken: idToken
  }).then((res) => (res.data));
}

/**
 * Set _deleted flag to 'true' for a certain team.
 * @param { String } id - Team ID that you want to delete.
 * @param { number } _version - _version attribute that is associated with that team.
 * @param { Team } team - Entire Team Object that you want to delete.
 * */
export async function deleteTeamRequest (id: string, _version: number, team?: Team): Promise<GraphQLQuery<DeleteTeamsMutation> | undefined> {
  const { idToken } = await getCurrentSession();
  if (team === undefined) {
    return;
  }
  const deleteTeamInput: DeleteTeamsInput = {
    id, _version
  };
  const teamPlayers = team.TeamPlayers?.items as unknown as TeamPlayers[];
  if (teamPlayers.length === 0) {
    return await API.graphql<GraphQLQuery<DeleteTeamsMutation>>({
      query: deleteTeams,
      variables: { input: deleteTeamInput },
      authToken: idToken
    }).then((res) => {
      return res.data;
    });
  }
  return await API.graphql<GraphQLQuery<any>>({
    query: deleteMultiTeamPlayers(teamPlayers),
    authToken: idToken
  }).then(async (res) => {
    return await API.graphql<GraphQLQuery<DeleteTeamsMutation>>({
      query: deleteTeams,
      variables: { input: deleteTeamInput },
      authToken: idToken
    }).then((res) => {
      return res.data;
    });
  });
}

/**
 * List Contacts & List TeamPlayers.
 * @param { String } ownerId - Owner ID to filter out the results.
 * */
export async function listContactsWithTeamPlayers (ownerId: string): Promise<GraphQLQuery<ListContactsWithTeamPlayer> | undefined> {
  const { idToken } = await getCurrentSession();
  return await API.graphql<GraphQLQuery<ListContactsWithTeamPlayer>>({
    query: listContactsWithTeamPlayer(ownerId),
    variables:
    {
      limit: 1000,
      filter:
      {
        id:
        {
          notContains: ownerId
        },
        _deleted:
        {
          ne: true
        }
      }
    },
    authToken: idToken
  }).then((res) => {
    if (res.data?.listContacts.items === undefined) return res.data;
    const contactsWithoutBusinessUsers = res.data?.listContacts?.items.filter((contact) => {
      const isUserAdmin = contact?.ContactRoles?.items?.find((item) => parseInt(item?.rolesID ?? '') !== USER_ROLES.PLAYER);
      if (!isUserAdmin) return true;
      return false;
    });
    res.data.listContacts.items = contactsWithoutBusinessUsers;
    return res.data;
  });
}

/**
 * Delete a singular TeamPlayer Record
 * @param { String } id - Team ID that you want to delete.
 * @param { number } _version - _version attribute that is associated with that TeamPlayer.
 * */
export async function deleteTeamPlayerRequest (id?: string, _version?: number): Promise<GraphQLQuery<DeleteTeamPlayersMutation> | undefined> {
  const { idToken } = await getCurrentSession();
  if (id === undefined) { return; }
  const teamPlayersDeleteInput: DeleteTeamPlayersInput = {
    id,
    _version
  };
  return await API.graphql<GraphQLQuery<DeleteTeamPlayersMutation>>({
    query: deleteTeamPlayers,
    variables: { input: teamPlayersDeleteInput },
    authToken: idToken
  }).then((res) => (res.data));
}
