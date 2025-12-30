/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
import { getDocumentClient } from './getDocumentClient.mjs';
import { ScanCommand, TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { sendRequest } from './sendRequest.mjs';
import { v4 as uuidv4 } from 'uuid';

const client = getDocumentClient();

export const handler = async (event, context, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { request } = event;
  const isPlayer = request.clientMetadata?.userType === 'PLAYER';

  if (!isPlayer) {
    console.log('User is not a player, allowing sign up');
    callback(null, event);
    return;
  }

  const email = request.userAttributes.email;
  console.log('HHELLLL', email);
  const scanEmailCommand = new ScanCommand({
    FilterExpression: 'Email = :email and attribute_not_exists(#deleted)',
    ExpressionAttributeNames: {
      '#deleted': '_deleted'
    },
    ExpressionAttributeValues: {
      ':email': email
    },
    TableName: process.env.API_WEPLAYMAIN_CONTACTEMAILSTABLE_NAME
  });

  const { Items, ...response } = await client.send(scanEmailCommand);
  console.log('rsults', response, Items);
  if (Items.length === 0) {
    throw new Error(`
    No email found! Please contact your facility or reach out to us at 
support@weplay.ai for assistance.
    `);
  }
  const businessesID = Items[0]?.businessesID;
  const contactId = Items[0]?.contactsID;
  const ownerId = Items[0]?.owner;

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
      contactsID: contactId,
      rolesID: '4'

    },
    ReturnConsumedCapacity: 'TOTAL',
    ConditionExpression: 'attribute_not_exists(id)'
  };
  const writeRoleCommand = new TransactWriteCommand({
    TransactItems: [
      {
        Put: userRoles
      }
    ]
  });

  try {
    await sendRequest(client, writeRoleCommand, callback);
  } catch (err) {
    console.log('ERROR', err);
  }
  callback(null, event);
};
