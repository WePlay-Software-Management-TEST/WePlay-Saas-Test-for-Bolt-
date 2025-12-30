import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { notifyPlayersEmails } from './notifyPlayersEmail.mjs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  QueryCommand
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'us-west-1' });

const dynamo = DynamoDBDocumentClient.from(client);
const contactsTableName = process.env.API_WEPLAYMAIN_CONTACTSTABLE_NAME;
const teamTableName = process.env.API_WEPLAYMAIN_TEAMSTABLE_NAME;
const businessTableName = process.env.API_WEPLAYMAIN_BUSINESSESTABLE_NAME;
const contactEmailTableName = process.env.API_WEPLAYMAIN_CONTACTEMAILSTABLE_NAME;

const ses = new SESClient({ region: 'us-west-1' });

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * This Lambda function is responsible to send emails to players,
 * that have been added to new teams.
 * It connects to a DynamoDB stream, and acts as it's trigger.
 */
export const handler = async (event) => {
  console.log(event.Records);
  return await Promise.all(
    event.Records.map(async (record) => {
      if (record.eventName !== 'INSERT') return;
      if (!record.dynamodb) return;
      if (!record.dynamodb.NewImage) return;

      console.log(record);
      const contactID = record.dynamodb.NewImage.contactsID.S;
      const teamID = record.dynamodb.NewImage.teamsID.S;
      console.log(contactID);
      console.log(teamID);

      const contactRecord = await dynamo.send(
        new QueryCommand({
          TableName: contactsTableName,
          KeyConditionExpression: 'id = :id',
          ExpressionAttributeValues: {
            ':id': contactID
          }
        })
      );
      if (contactRecord.Items.length === 0) return;

      console.log(contactRecord.Items[0].businessesID);
      const businessID = contactRecord.Items[0].businessesID;

      const contactsEmail = await dynamo.send(
        new QueryCommand({
          TableName: contactEmailTableName,
          IndexName: 'byContacts',
          KeyConditionExpression: 'contactsID = :contactsid',
          ExpressionAttributeValues: {
            ':contactsid': contactID
          }
        })
      );

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

      const teamRecord = await dynamo.send(
        new QueryCommand({
          TableName: teamTableName,
          KeyConditionExpression: 'id = :id',
          ExpressionAttributeValues: {
            ':id': teamID
          }
        })
      );

      console.log(businessInfo.Items[0].BusinessName);
      const facilityName = businessInfo.Items[0].BusinessName;
      const userName = `${contactRecord.Items[0].FirstName} ${contactRecord.Items[0].LastName}`;
      const teamName = teamRecord.Items[0].TeamName;
      const sesParams = {
        Source: 'no-reply@weplay.ai',
        Destination: {
          ToAddresses: [toEmail]
        },
        Message: {
          Subject: {
            Data: `You have been Added to ${teamName}`
          },
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: notifyPlayersEmails(userName, teamName, facilityName)
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
