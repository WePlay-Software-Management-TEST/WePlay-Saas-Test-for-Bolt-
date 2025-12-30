import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
/**
 * @Function Handles creates a new Team Mutation, using pre-set data.
 * @param { TeamInput } teamInput - Mutation Input Dataset, Only the Team Dataset.
 * @param { Array<TeamPlayers> } TeamPlayers - Mutation Input Dataset, Only the TeamPlayers Dataset.
 * @param { DynamoDB Client } documentClient - DynamoDB Client, to Create Command Objects.
 * @param { AWS Lambda Callback } callback - Lambda Callback.
 * @param { string } owner - Owner ID.
 */
export async function insertTeam (teamInput, TeamPlayers, documentClient, callback, owner, businessesID) {
  const newTeamId = uuidv4();

  const insertTeamInput = {
    TableName: process.env.API_WEPLAYMAIN_TEAMSTABLE_NAME,
    Item: {
      id: newTeamId,
      __typename: 'Teams',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _lastChangedAt: Math.floor(Date.now()),
      owner,
      businessesID,
      _version: 1,
      SportType: 'SOCCER',
      ...teamInput
    },
    ReturnConsumedCapacity: 'TOTAL',
    ConditionExpression: 'attribute_not_exists(id)'
  };
  let teamPlayersInput = [];

  if (TeamPlayers !== undefined || TeamPlayers.length !== 0) {
    teamPlayersInput = TeamPlayers.map((teamPlayers) => {
      return {
        Put: {
          Item:
            {
              ...teamPlayers,
              teamsID: newTeamId,
              id: uuidv4(),
              __typename: 'TeamPlayers',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              _lastChangedAt: Math.floor(Date.now()),
              owner,
              businessesID,
              _version: 1
            },
          TableName: process.env.API_WEPLAYMAIN_TEAMPLAYERSTABLE_NAME,
          ConditionExpression: 'attribute_not_exists(id)'
        }
      };
    });
  };

  const transactWrite = new TransactWriteCommand({
    TransactItems: [
      {
        Put: insertTeamInput
      },
      ...teamPlayersInput
    ]
  });
  return {
    TransactWriteCommand: transactWrite,
    teamPlayers: teamPlayersInput,
    team: insertTeamInput
  };
};
