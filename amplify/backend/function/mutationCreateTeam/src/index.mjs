/* Amplify Params - DO NOT EDIT
API_WEPLAYMAIN_GRAPHQLAPIIDOUTPUT
API_WEPLAYMAIN_TEAMPLAYERSTABLE_ARN
API_WEPLAYMAIN_TEAMPLAYERSTABLE_NAME
API_WEPLAYMAIN_TEAMSTABLE_ARN
API_WEPLAYMAIN_TEAMSTABLE_NAME
ENV
REGION
Amplify Params - DO NOT EDIT */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { getOwnerId } from './getOwner.mjs';
import { updateTeam } from './updateTeam.mjs';
import { insertTeam } from './insertTeam.mjs';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * This Lambda acts as a GraphQL Resolver for Create Team Mutation
 * It's main job is to handle Creating/Updating Teams Table and It's related Tables (TeamPlayers)
 */
export const handler = async (event, context, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { businessId, ownerId } = getOwnerId(event);

  const marshallOptions = {
    removeUndefinedValues: true
  };
  const translateConfig = { marshallOptions };

  const client = new DynamoDBClient({ region: process.env.REGION });
  const documentClient = DynamoDBDocumentClient.from(client, translateConfig);
  const { TeamPlayers, ...teamInput } = event?.arguments?.input;

  let mutation;

  if (event.fieldName === 'updateTeam') {
    mutation = updateTeam;
  } else {
    mutation = insertTeam;
  }

  const { TransactWriteCommand, teamPlayers, team } = await mutation(
    teamInput, TeamPlayers, documentClient, callback, ownerId, businessId
  );

  try {
    const batchResponse = await documentClient.send(TransactWriteCommand);
    console.log(batchResponse);
  } catch (err) {
    console.log(err);
    callback(null, {
      errors: `Couldn't save Team, Received the following error: 
    ${JSON.stringify(err)}`
    });
  }

  const arrayOfTeamPlayers = teamPlayers.map((teamPlayer) => {
    return teamPlayer.Put.Item;
  });

  const value = { ...team.Item, teamPlayers: arrayOfTeamPlayers };
  callback(null, value);
};
