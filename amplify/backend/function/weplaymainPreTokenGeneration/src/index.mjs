import { listPolicies, listContactRoles } from './queries.mjs';
import { signedFetch } from './getSignedRequest.mjs';

/**
 * Removes duplicate objects from an array based on the `actionName` property of the `Action` object.
 *
 * @param {Array<Object>} array - The array of objects to be filtered.
 * @param {Object} array[].Action - The action object within each item.
 * @param {string} array[].Action.actionName - The name of the action used to determine uniqueness.
 *
 * @returns {Array<Object>} A new array with duplicates removed, preserving the original order.
 */
const removeDuplicates = (array) => {
  if (!array || array.length === 0) return array;
  const seen = new Set();
  return array.filter(item => {
    const keyValue = item.Action.actionName;
    if (seen.has(keyValue)) {
      return false;
    } else {
      seen.add(keyValue);
      return true;
    }
  });
};

const ALLOWED_ACTIONS_NEWLY_CREATED_USERS = ['createContacts', 'createContactRoles', 'createBusinessAddresses', 'createBusinesses', 'createContactEmails'];
/**
 * AWS Lambda function handler for processing user events and assigning policies.
 *
 * This function is triggered by user events and determines the roles and policies
 * associated with a user. It fetches contact roles and policies using GraphQL queries
 * and assigns default admin access to newly created users who are not yet attached to any tenant.
 * The function modifies the event response to include the user's policies.
 *
 * @param {Object} event - The event object containing user information.
 * @param {string} event.userName - The username of the user triggering the event.
 *
 * @returns {Promise<Object>} A promise that resolves to the modified event object with policy claims.
 *
 * @throws Will log an error if any of the fetch operations fail.
 */
export const handler = async (event) => {
  console.log('Event: ', event);
  const userId = event.userName;
  const contactId = event.request.userAttributes['custom:contactId'];
  let newlyCreatedUser = false;

  const contactRolesResponse = await signedFetch(listContactRoles(userId, contactId)).then((res) => res);

  if (contactRolesResponse === undefined) {
    return event;
  }
  let contactRoles = contactRolesResponse.data?.listContactRoles?.items?.map((role) => role.rolesID) ?? [];

  if (contactRolesResponse.data?.listContactRoles?.items.length === 0) {
    // newly created user, that is not attached to any tenant yet, we will give him admin access.
    // What is our concerns tho ?
    newlyCreatedUser = true;
    contactRoles = ['1'];
  }

  const policiesResponse = await signedFetch(listPolicies(contactRoles)).then((res) => res);
  let allowedPolicies = removeDuplicates(policiesResponse.data.listPolicies?.items);
  if (allowedPolicies === undefined || allowedPolicies?.length === 0) {
    return event;
  };
  if (newlyCreatedUser) {
    allowedPolicies = allowedPolicies.filter((policy) => {
      if (ALLOWED_ACTIONS_NEWLY_CREATED_USERS.includes(policy.Action.actionName)) {
        return true;
      }
      return false;
    });
  }

  const policesEmbbed = JSON.stringify(allowedPolicies);

  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        policies: policesEmbbed,
        roles: JSON.stringify(contactRoles)
      }
    }
  };
  return event;
};
