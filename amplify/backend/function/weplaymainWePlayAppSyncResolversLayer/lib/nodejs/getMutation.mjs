import { insertPlayer } from './mutations/insertPlayerMutation.mjs';
import { updatePlayer } from './mutations/updatePlayerMutation.mjs';
import { createUser } from './mutations/createUserMutation.mjs';
import { deleteUser } from './mutations/deleteUserMutation.mjs';
import { createTourney } from './mutations/createTourneyMutation.mjs';
import { updateTourney } from './mutations/updateTourneyMutation.mjs';

const MutationMap = {
  insertPlayer,
  updatePlayer,
  createUser,
  deleteUser,
  updateTourney,
  createTourney
};

/**
 * Retrieves the mutation function based on the provided mutation name.
 *
 * @param {string} mutationName - The name of the mutation function to retrieve.
 * @returns {function} The mutation function corresponding to the provided name.
 */
export function getMutation (mutationName) {
  return MutationMap[mutationName];
};
