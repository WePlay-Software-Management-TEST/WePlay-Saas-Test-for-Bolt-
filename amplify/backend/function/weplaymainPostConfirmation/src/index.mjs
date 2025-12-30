import { v4 as uuidv4 } from 'uuid';
import { getDocumentClient } from './getDocumentClient.mjs';
import { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand, AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const dynamodbClient = getDocumentClient();
export const handler = async (event, context, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const userPoolsId = event.userPoolId;
  const region = process.env.REGION;
  const userName = event.userName;

  const getUserDetailsCommand = new AdminGetUserCommand({
    UserPoolId: userPoolsId,
    Username: userName
  });

  const client = new CognitoIdentityProviderClient({ region });
  let userDetails;
  try {
    userDetails = await client.send(getUserDetailsCommand);
  } catch (err) {
    console.error('Could not get User Details for user: ', userName);
  }

  if (userDetails?.UserAttributes?.['custom:BusinessId'] !== undefined) {
    return event;
  }
  const userEmail = event.request.userAttributes.email;
  console.log('Email', userEmail, event.request);
  const scanEmailCommand = new ScanCommand({
    FilterExpression: 'Email = :email and attribute_not_exists(#deleted)',
    ExpressionAttributeNames: {
      '#deleted': '_deleted'
    },
    ExpressionAttributeValues: {
      ':email': userEmail
    },
    TableName: process.env.API_WEPLAYMAIN_CONTACTEMAILSTABLE_NAME
  });

  const { Items: emails } = await dynamodbClient.send(scanEmailCommand);
  const businessesID = emails[0]?.businessesID;
  const maybeContactId = emails[0]?.contactsID;
  let isPlayer = false;

  if (!!businessesID && !!maybeContactId) {
    const scanRoleCommand = new ScanCommand({
      FilterExpression: 'contactsID = :contactsID and attribute_not_exists(#deleted)',
      ExpressionAttributeNames: {
        '#deleted': '_deleted'
      },
      ExpressionAttributeValues: {
        ':contactsID': maybeContactId
      },
      TableName: process.env.API_WEPLAYMAIN_CONTACTROLESTABLE_NAME
    });

    const { Items: roles } = await dynamodbClient.send(scanRoleCommand);
    isPlayer = roles[0]?.rolesID === '4';
  }

  console.log('-->>', maybeContactId, businessesID, isPlayer);
  const businessID = isPlayer ? businessesID : uuidv4();
  const contactId = isPlayer ? maybeContactId : userName;

  const input = {
    UserAttributes: [
      {
        Name: 'custom:BusinessId',
        Value: businessID
      },
      {
        Name: 'custom:contactId',
        Value: contactId
      }
    ],
    UserPoolId: userPoolsId,
    Username: userName
  };

  const command = new AdminUpdateUserAttributesCommand(input);
  try {
    await client.send(command);
    console.log(`Successfully added custom attribute to user ${userName}`);
  } catch (error) {
    console.error(`Error adding custom attribute to user ${userName}:`, error);
    throw error;
  }
  return event;
};
