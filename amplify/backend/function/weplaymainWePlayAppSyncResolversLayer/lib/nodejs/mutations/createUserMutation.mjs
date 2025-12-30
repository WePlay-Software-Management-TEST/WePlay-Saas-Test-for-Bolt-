import { v4 as uuidv4 } from 'uuid';
import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';

/**
 * Creates a new user by returning a transactional write operation that can be used in the main entry point
 * of Mutation createUser
 *
 * This function sets up a new user by creating entries in the `ContactEmails` and `ContactRoles` tables.
 * It uses a transactional write to ensure both entries are created atomically. The function generates unique
 * identifiers for each entry and sets the initial metadata, such as creation and update timestamps.
 *
 * @param {Object} _ - Unused parameter, typically used for context or parent object in some frameworks.
 * @param {string} businessesID - The unique identifier for the business associated with the user.
 * @param {string} email - The email address of the user to be created.
 * @param {string} role - The role ID assigned to the user within the system.
 * @param {string} newlyCreatedUserId - The unique identifier for the newly created user.
 * @param {string} ownerId - The unique identifier for the owner of the user record.
 *
 * @returns {Object} An object containing the `TransactWriteCommand` for executing the transaction,
 * and the `userRoles` and `userEmails` objects representing the items to be written to the database.
 *
 * @throws Will throw an error if the transaction fails.
 */
export function createUser (_, businessesID, email, role, newlyCreatedUserId, ownerId) {
  const userEmails = {
    TableName: process.env.API_WEPLAYMAIN_CONTACTEMAILSTABLE_NAME,
    Item: {
      id: uuidv4(),
      __typename: 'ContactEmails',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _lastChangedAt: Math.floor(Date.now()),
      businessesID,
      owner: ownerId,
      _version: 1,
      Email: email,
      contactsID: newlyCreatedUserId
    },
    ReturnConsumedCapacity: 'TOTAL',
    ConditionExpression: 'attribute_not_exists(id)'
  };
  const userRoles = {
    TableName: process.env.API_WEPLAYMAIN_CONTACTROLESTABLE_NAME,
    Item: {
      id: uuidv4(),
      __typename: 'ContactRoles',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _lastChangedAt: Math.floor(Date.now()),
      businessesID,
      owner: ownerId,
      _version: 1,
      contactsID: newlyCreatedUserId,
      rolesID: role

    },
    ReturnConsumedCapacity: 'TOTAL',
    ConditionExpression: 'attribute_not_exists(id)'
  };

  const transactWrite = new TransactWriteCommand({
    TransactItems: [
      {
        Put: userEmails
      },
      {
        Put: userRoles
      }
    ]
  });

  return {
    TransactWriteCommand: transactWrite,
    userRoles,
    userEmails
  };
};
