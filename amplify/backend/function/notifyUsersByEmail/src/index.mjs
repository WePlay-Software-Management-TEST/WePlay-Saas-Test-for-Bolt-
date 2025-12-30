import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { getNewPlayerBeenCreatedEmail } from './newPlayerBeenCreated.mjs';
import { getNewUserEmail } from './newUserHaveJoined.mjs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  QueryCommand
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'us-west-1' });

const dynamo = DynamoDBDocumentClient.from(client);
const contactEmailsTableName = process.env.API_WEPLAYMAIN_CONTACTEMAILSTABLE_NAME;
const businessTableName = process.env.API_WEPLAYMAIN_BUSINESSESTABLE_NAME;
const contactRolesTableName = process.env.API_WEPLAYMAIN_CONTACTROLESTABLE_NAME;

const ses = new SESClient({ region: 'us-west-1' });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(event.Records);
  return await Promise.all(
    event.Records.map(async (record) => {
      if (record.eventName !== 'INSERT') return;
      if (!record.dynamodb) return;
      if (!record.dynamodb.NewImage) return;

      console.log(record);

      const userName = `${record.dynamodb.NewImage.FirstName.S} ${record.dynamodb.NewImage.LastName.S}`;
      const businessID = record.dynamodb.NewImage.businessesID.S;
      const contactID = record.dynamodb.NewImage.id.S;
      console.log(contactID);
      console.log(businessID);

      const contactsEmail = await dynamo.send(
        new QueryCommand({
          TableName: contactEmailsTableName,
          IndexName: 'byContacts',
          KeyConditionExpression: 'contactsID = :contactsid',
          ExpressionAttributeValues: {
            ':contactsid': contactID
          }
        })
      );
      if (contactsEmail.Items.length === 0) return;

      console.log(contactsEmail.Items[0].Email);
      const toEmail = contactsEmail.Items[0].Email;

      const businessInfo = await dynamo.send(
        new QueryCommand({
          TableName: businessTableName,
          KeyConditionExpression: 'id = :id',
          ExpressionAttributeValues: {
            ':id': businessID
          }
        })
      );

      const contactRole = await dynamo.send(
        new QueryCommand({
          TableName: contactRolesTableName,
          IndexName: 'byContacts',
          KeyConditionExpression: 'contactsID = :contactsid',
          ExpressionAttributeValues: {
            ':contactsid': contactID
          }
        })
      );

      console.log(businessInfo.Items[0].BusinessName);
      const facilityName = businessInfo.Items[0].BusinessName;

      let msgSubject = getNewPlayerBeenCreatedEmail(userName, facilityName);

      if (contactRole.Items.length > 0) {
        msgSubject = getNewUserEmail();
      };
      const sesParams = {
        Source: 'no-reply@weplay.ai',
        Destination: {
          ToAddresses: [toEmail]
        },
        Message: {
          Subject: {
            Data: 'Welcome to WePlay.ai'
          },
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: msgSubject
            }
          }
        }
      };
      console.log(sesParams);
      const command = new SendEmailCommand(sesParams);
      return await ses.send(command);
    })
  );
};
