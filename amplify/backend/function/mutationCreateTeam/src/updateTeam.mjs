import { TransactWriteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

/**
 * @Function Handles Update a Team Mutation, using pre-set data.
 * @param { TeamInput } teamInput - Mutation Input Dataset, Only the Team Dataset.
 * @param { Array<TeamPlayers> } TeamPlayers - Mutation Input Dataset, Only the TeamPlayers Dataset.
 * @param { DynamoDB Client } documentClient - DynamoDB Client, to Create Command Objects.
 * @param { AWS Lambda Callback } callback - Lambda Callback.
 * @param { string } owner - Owner ID.
 */
export async function updateTeam (teamInput, TeamPlayers, documentClient, callback, owner, businessesID) {
  const { id, _version, State, ...otherKeys } = teamInput;

  const command = new ScanCommand({
    UpdateExpression: 'set #deleted = :deleted',
    ExpressionAttributeNames: {
      '#deleted': '_deleted'
    },
    ExpressionAttributeValues: {
      ':teamsID': teamInput.id,
      ':deleted': true
    },
    FilterExpression: 'teamsID = :teamsID and #deleted <> :deleted',
    Limit: 1000,
    TableName: process.env.API_WEPLAYMAIN_TEAMPLAYERSTABLE_NAME
  });

  const response = await documentClient.send(command);

  const prevTeamPlayers = response.Items;

  console.log(prevTeamPlayers);
  console.log('response -=--> ', response);

  let deletePrevPlayers = [];
  if (prevTeamPlayers.length !== 0 && prevTeamPlayers !== undefined) {
    deletePrevPlayers = prevTeamPlayers.map((prevTeamPlayer) => {
      const {
        id, _version, _deleted,
        _lastChangedAt, updatedAt,
        __typename, owner, ...otherKeys
      } = prevTeamPlayer;
      otherKeys.businessesID = businessesID;
      const updateExpKeys = Object.keys(otherKeys).map((key) => (`${key} = :${key}`));
      const updateExp = `set updatedAt = :updatedAt, #lastChangedAt = :lastChangedAt, #version = :version, #deleted = :deleted, ${updateExpKeys.join(', ')}`;
      const expAttrValues = {
        ':updatedAt': new Date().toISOString(),
        ':lastChangedAt': Math.floor(Date.now()),
        ':version': _version + 1,
        ':deleted': true
      };

      Object.keys(otherKeys).forEach((updateInfoKey) => {
        expAttrValues[`:${updateInfoKey}`] = otherKeys[updateInfoKey];
      });

      return {
        Update: {
          TableName: process.env.API_WEPLAYMAIN_TEAMPLAYERSTABLE_NAME,
          Key: {
            id: prevTeamPlayer.id
          },
          UpdateExpression: updateExp,
          ExpressionAttributeNames: {
            '#lastChangedAt': '_lastChangedAt',
            '#version': '_version',
            '#deleted': '_deleted'
          },
          ExpressionAttributeValues: expAttrValues,
          ConditionExpression: 'businessesID = :businessesID',
          ReturnValues: 'UPDATED_NEW'
        }
      };
    });
  }

  const updateExpKeys = Object.keys(otherKeys).map((key) => (`${key} = :${key}`));
  const updateExp = `set updatedAt = :updatedAt, #lastChangedAt = :lastChangedAt, #version = :version, #newState = :state, ${updateExpKeys.join(', ')}`;

  const expAttrValues = {
    ':updatedAt': new Date().toISOString(),
    ':lastChangedAt': Math.floor(Date.now()),
    ':version': _version + 1,
    ':state': State,
    ':businessesID': businessesID
  };

  Object.keys(teamInput).forEach((updateInfoKey) => {
    expAttrValues[`:${updateInfoKey}`] = otherKeys[updateInfoKey];
  });

  const updateTeamInput = {
    TableName: process.env.API_WEPLAYMAIN_TEAMSTABLE_NAME,
    Key: {
      id
    },
    UpdateExpression: updateExp,
    ExpressionAttributeValues: expAttrValues,
    ExpressionAttributeNames: {
      '#lastChangedAt': '_lastChangedAt',
      '#version': '_version',
      '#newState': 'State'
    },
    ConditionExpression: 'businessesID = :businessesID',
    ReturnValues: 'UPDATED_NEW'
  };

  let teamPlayersInput = [];
  if (TeamPlayers !== undefined && TeamPlayers?.length !== 0) {
    teamPlayersInput = TeamPlayers.map((teamPlayers) => {
      return {
        Put: {
          Item:
            {
              ...teamPlayers,
              teamsID: teamInput.id,
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
      ...deletePrevPlayers,
      {
        Update: updateTeamInput
      },
      ...teamPlayersInput
    ]
  });

  // Can't get the newly updated value from a TransactWriteCommand.
  return {
    TransactWriteCommand: transactWrite,
    teamPlayers: teamPlayersInput,
    team: {
      Item: {
        State: '',
        TeamName: '',
        _deleted: null,
        _lastChangedAt: Math.floor(Date.now()),
        _version: _version + 1,
        PhotoId: null,
        Description: '',
        County: '',
        City: '',
        createdAt: new Date().toISOString(),
        id,
        owner,
        businessesID,
        updatedAt: new Date().toISOString()
      }
    }
  };
};
