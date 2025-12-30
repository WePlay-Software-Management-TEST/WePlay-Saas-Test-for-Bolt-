import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminDeleteUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { getOwnerId } from './getOwner.mjs';
import { getDocumentClient } from './getDocumentClient.mjs';
import { getMutation } from './getMutation.mjs';
import { sendRequest } from './sendRequest.mjs';
import * as generatePassword from 'generate-password';

const documentClient = getDocumentClient();
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.REGION
});

const createUser = async (email, redirectUrl, businessId, ownerId, role, mutation, callback) => {
  const roleLabel = role === '1' ? 'ADMIN' : 'REFEREE';

  let tempPass = generatePassword.generate({
    length: 10,
    numbers: true,
    symbols: false
  });

  tempPass = tempPass + '@1lK';

  const createUserInput = new AdminCreateUserCommand({
    UserPoolId: process.env.userPoolId,
    Username: email,
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      },
      {
        Name: 'custom:redirectUrl',
        Value: redirectUrl
      },
      {
        Name: 'custom:BusinessId',
        Value: businessId
      }
    ],
    TemporaryPassword: tempPass,
    ClientMetadata: {
      role: roleLabel
    }
  });

  const { User } = await cognitoClient.send(createUserInput);
  const userID = User.Username;

  const { TransactWriteCommand } = await mutation(
    undefined, businessId, email, role, userID, ownerId
  );
  await sendRequest(documentClient, TransactWriteCommand, callback);
};

const deleteUser = async (userData, mutation, businessId, ownerId, callback) => {
  if (userData.id === ownerId) {
    throw new Error('not allowed to delete', userData.id);
  }
  const deleteUserInput = new AdminDeleteUserCommand({
    UserPoolId: process.env.userPoolId,
    Username: userData.id
  });
  const { TransactWriteCommand } = await mutation(
    userData, businessId
  );

  try {
    await sendRequest(documentClient, TransactWriteCommand, callback);
  } catch (err) {
    throw new Error("Could't delete user: ", JSON.stringify(err));
  }
  await cognitoClient.send(deleteUserInput);
};

/**
 * AWS Lambda handler for managing user operations such as creating and deleting users.
 *
 * @param {Object} event - The event object containing request data.
 * @param {Object} _ - Unused parameter.
 * @param {Function} callback - The callback function to return the response or error.
 *
 * @returns {void}
 *
 * @throws {Error} Throws an error if the user cannot be deleted.
 *
 * @description
 * This handler processes user management operations by interacting with AWS Cognito and DynamoDB.
 * It supports creating a new user with a temporary password and deleting an existing user.
 * The operation is determined by the `fieldName` in the event object.
 * The function logs the event, retrieves necessary identifiers, and constructs commands for AWS services.
 * It uses organization-specific modules for generating passwords, retrieving owner IDs, and sending requests.
 */
export const handler = async (event, _, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { businessId, ownerId } = getOwnerId(event);

  const { Email, Role, RedirectURL, ...userData } = event.arguments.input;

  const mutation = getMutation(event.fieldName);

  const response = {};

  if (event.fieldName === 'deleteUser') {
    await deleteUser(userData, mutation, businessId, callback);
  } else if (event.fieldName === 'createUser') {
    await createUser(
      Email, RedirectURL, businessId, ownerId, Role, mutation, callback
    );
  }

  callback(null, response);
};
