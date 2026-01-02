import { API, Storage } from 'aws-amplify';
import { getCurrentSession } from 'core/services/auth.service';
import {
  deleteContacts,
  insertPlayer,
  updatePlayer
} from 'graphql/mutations';
import { type GraphQLQuery, type GraphQLResult } from '@aws-amplify/api';
import {
  type GetContactsQuery,
  type ListContactsQuery,
  type UpdateContactsMutation,
  type DeleteContactsMutation,
  type DeleteContactsInput,
  type InsertPlayerMutation,
  type CreateContactsInputModel,
  type updateContactsInputModel,
  type UpdatePlayerMutation,
  type ListTeamsQuery
} from 'API';
import { type PlayerInfoForm } from './hooks/playerForm.hook';
import { customGetContacts, type CustomGetContactsQuery, customListContacts } from 'graphql/custom.queries';
import { ftToCm } from 'core/utils/utils';

export interface PutResult {
  key: string
};

/**
 * Creates a new player in the system using the provided player information and optional player image key.
 *
 * @param playerForm - The player information form containing details like first name, last name, bio, image, position, birthdate, skills, height, weight, etc.
 * @param playerImageKey - Optional key for the player image.
 * @returns A Promise that resolves to a GraphQLResult with the query result of inserting the player.
 * @throws Error if something goes wrong during the insertion process.
 */
export async function createPlayer (playerForm: PlayerInfoForm, playerImageKey?: string): Promise<GraphQLResult<GraphQLQuery<InsertPlayerMutation>>> {
  const { idToken } = await getCurrentSession();
  const teamsInput = playerForm.teams?.map((team) => {
    return {
      teamsID: team.value,
      IsCaptain: false
    };
  });

  const playerFormData: CreateContactsInputModel = {
    FirstName: playerForm.firstName,
    LastName: playerForm.lastName,
    Biography: playerForm.playerBio,
    PhotoId: playerImageKey,
    PreferredPositition: {
      Position: playerForm.PreferredPositition
    },
    Birthdate: playerForm.birthDate ?? '',
    PlayerSoccerSkills: {
      LeftRightFooted: playerForm.leftRightPreference,
      ExperienceLevel: playerForm.experienceLevel
    },
    Height: ftToCm(playerForm.height) ?? null,
    Gender: playerForm.gender,
    Weight: playerForm.weight === '' ? null : Number(playerForm.weight),
    teams: teamsInput,
    ContactEmails: {
      Email: playerForm.playerEmail
    },
    ContactAddresses: {
      City: playerForm.city,
      State: playerForm.state,
      PostalCode: playerForm.zipCode
    }
  };

  return await API.graphql<GraphQLQuery<InsertPlayerMutation>>(
    { query: insertPlayer, variables: { input: playerFormData }, authToken: idToken }
  ).then((res) => {
    return res;
  }).catch((error) => {
    console.error(error);
    throw new Error('Something Went Wrong!');
  });
};

export async function createS3StoragePhoto (imageName: string, image?: File): Promise<PutResult | undefined> {
  if (image === undefined || imageName === '') {
    return undefined;
  };

  return await Storage.put(imageName, image, {
    contentType: 'image/png'
  });
};

export async function getPlayerinformation (playerId: string): Promise<GraphQLResult<GraphQLQuery<GetContactsQuery>>> {
  const { idToken } = await getCurrentSession();
  return await API.graphql<GraphQLQuery<GetContactsQuery>>({
    query: customGetContacts,
    variables: {
      id: playerId
    },
    authToken: idToken,
    authMode: 'AWS_LAMBDA'
  });
};

export async function listContactsRequest (ownerId: string): Promise<GraphQLQuery<Partial<ListContactsQuery & ListTeamsQuery>> | undefined> {
  const { idToken } = await getCurrentSession();
  return await API.graphql<GraphQLQuery<ListContactsQuery>>(
    {
      query: customListContacts,
      variables: {
        limit: 1000,
        filter: {
          id: {
            notContains: ownerId
          },
          _deleted: {
            ne: true
          }
        }
      },
      authToken: idToken
    }
  ).then((res) => {
    if (res.data?.listContacts === undefined || res.data?.listContacts?.items === undefined) return res.data;
    const contactsWithoutBusinessUsers = res.data?.listContacts?.items.filter((contact) => {
      if (contact?.ContactRoles?.items.length === 0) return true;
      if (contact?.ContactRoles?.items[0]?.rolesID === '4') return true;
      return false;
    });
    res.data.listContacts.items = contactsWithoutBusinessUsers;
    return res.data;
  });
}

export async function updateS3StorageUser (imageName: string, image?: File): Promise<PutResult | undefined> {
  if (image === undefined || imageName === '') {
    return undefined;
  };

  return await Storage.remove(imageName).then(async () => {
    return await Storage.put(imageName, image, {
      contentType: 'image/png'
    });
  })
  ;
};

/**
 * Updates the player profile with the provided information.
 *
 * @param playerForm - The updated player information to be saved.
 * @param profilePrevInfo - The previous player profile information to be updated.
 * @param playerImageKey - Optional key for the player's image.
 * @returns A promise that resolves to the result of the GraphQL query for updating the player profile.
 */
export async function updateProfile (playerForm: PlayerInfoForm, profilePrevInfo: CustomGetContactsQuery, playerImageKey?: string): Promise<GraphQLResult<GraphQLQuery<UpdatePlayerMutation>>> {
  const { idToken } = await getCurrentSession();
  const teamsInput = playerForm.teams?.map((team) => {
    return {
      teamsID: team.value,
      IsCaptain: false
    };
  });
  const updatePlayerInput: updateContactsInputModel = {
    id: profilePrevInfo.id,
    FirstName: playerForm.firstName,
    LastName: playerForm.lastName,
    Biography: playerForm.playerBio,
    PhotoId: playerImageKey,
    PreferredPositition: {
      id: profilePrevInfo.PlayerSoccerSkills?.PlayerPositions?.items[0]?.id ?? '',
      Position: playerForm.PreferredPositition,
      playersoccerskillsID: profilePrevInfo.PlayerSoccerSkills?.id,
      _version: profilePrevInfo.PlayerSoccerSkills?.PlayerPositions?.items[0]?._version
    },
    Birthdate: playerForm.birthDate ?? '',
    PlayerSoccerSkills: {
      id: profilePrevInfo.PlayerSoccerSkills?.id ?? '',
      LeftRightFooted: playerForm.leftRightPreference,
      ExperienceLevel: playerForm.experienceLevel,
      _version: profilePrevInfo.PlayerSoccerSkills?._version
    },
    Height: ftToCm(playerForm.height) ?? null,
    Gender: playerForm.gender,
    Weight: playerForm.weight === '' ? null : Number(playerForm.weight),
    _version: profilePrevInfo._version,
    teams: teamsInput,
    ContactEmails: {
      id: profilePrevInfo.ContactEmails?.items[0]?.id ?? '',
      _version: profilePrevInfo.ContactEmails?.items[0]?._version,
      Email: playerForm.playerEmail,
      contactsID: profilePrevInfo.id
    },
    ContactAddresses: {
      id: profilePrevInfo.ContactAddresses?.items[0]?.id ?? '',
      _version: profilePrevInfo.ContactAddresses?.items[0]?._version,
      City: playerForm.city,
      State: playerForm.state,
      PostalCode: playerForm.zipCode,
      contactsID: profilePrevInfo.id
    }
  };

  return await API.graphql<GraphQLQuery<UpdateContactsMutation>>({
    query: updatePlayer,
    variables: { input: updatePlayerInput },
    authToken: idToken
  })
    .then(async (res) => {
      return res;
    });
};

export async function deleteProfile (id: string, _version: number): Promise<GraphQLQuery<DeleteContactsMutation> | undefined> {
  const { idToken } = await getCurrentSession();
  const deleteContactInput: DeleteContactsInput = {
    id,
    _version
  };

  return await API.graphql<GraphQLQuery<DeleteContactsMutation>>({
    query: deleteContacts,
    variables: { input: deleteContactInput },
    authToken: idToken
  }).then((res) => res.data);
};
