import { TransactWriteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { getDynamoDbExpressions } from '../helpers/getDynamoDbExpressions.mjs';

/**
 * @Function Handles Update a Player Mutation, using pre-set data.
 * @param { UpdatePlayerContact } playerModel - Event that comes with AppSync Mutation Input, using UpdatePlayer mutation.
 * @param { string } businessesID - Bussiness ID that is associated with the Contact Record.
 * @param { DynamoDB Client } documentClient - DynamoDB Client, to Create Command Objects.
 * @param { string } ownerId - Owner ID.
 */
export async function updatePlayer (playerModel, businessesID, documentClient, ownerId) {
  console.log(playerModel.arguments.input);
  const {
    teams,
    id, PreferredPositition,
    PlayerSoccerSkills, ContactEmails, ContactAddresses, ...otherKeys
  } = playerModel?.arguments?.input;
  console.log(playerModel?.arguments?.input);
  let updateContactAddressesInput, updateContactEmailsInput, updatePreferredPositionInput, updatePlayerSoccerSkillsInput;

  const command = new ScanCommand({
    UpdateExpression: 'set #deleted = :deleted',
    ExpressionAttributeNames: {
      '#deleted': '_deleted'
    },
    ExpressionAttributeValues: {
      ':contactsID': id,
      ':deleted': true
    },
    FilterExpression: 'contactsID = :contactsID and #deleted <> :deleted',
    Limit: 1000,
    TableName: process.env.API_WEPLAYMAIN_TEAMPLAYERSTABLE_NAME
  });

  const response = await documentClient.send(command);
  const prevTeamPlayers = response.Items;

  console.log(prevTeamPlayers);

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

  let teamPlayers = [];
  if (teams !== undefined && teams?.length !== 0) {
    teamPlayers = teams.map((teamPlayers) => {
      return {
        Put: {
          Item:
            {
              ...teamPlayers,
              contactsID: id,
              id: uuidv4(),
              __typename: 'TeamPlayers',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              _lastChangedAt: Math.floor(Date.now()),
              ownerId,
              businessesID,
              _version: 1
            },
          TableName: process.env.API_WEPLAYMAIN_TEAMPLAYERSTABLE_NAME,
          ConditionExpression: 'attribute_not_exists(id)'
        }
      };
    });
  };

  if (PreferredPositition !== undefined && PreferredPositition?.length !== 0) {
    if (PreferredPositition.Position === undefined) {
      PreferredPositition.Position = null;
    }
    PreferredPositition.businessesID = businessesID;
    const { updateExp, expAttrValues } = getDynamoDbExpressions(PreferredPositition);
    updatePreferredPositionInput = {
      TableName: process.env.API_WEPLAYMAIN_PLAYERPOSITIONSTABLE_NAME,
      Key: {
        id: PreferredPositition.id
      },
      UpdateExpression: updateExp,
      ExpressionAttributeValues: expAttrValues,
      ExpressionAttributeNames: {
        '#lastChangedAt': '_lastChangedAt',
        '#version': '_version',
        '#Position': 'Position'
      },
      ReturnValues: 'UPDATED_NEW',
      ConditionExpression: 'businessesID = :businessesID'
    };
  }

  if (PlayerSoccerSkills !== undefined && PlayerSoccerSkills?.length !== 0) {
    PlayerSoccerSkills.businessesID = businessesID;
    const { updateExp, expAttrValues } = getDynamoDbExpressions(PlayerSoccerSkills);
    updatePlayerSoccerSkillsInput = {
      TableName: process.env.API_WEPLAYMAIN_PLAYERSOCCERSKILLSTABLE_NAME,
      Key: {
        id: PlayerSoccerSkills.id
      },
      UpdateExpression: updateExp,
      ExpressionAttributeValues: expAttrValues,
      ExpressionAttributeNames: {
        '#lastChangedAt': '_lastChangedAt',
        '#version': '_version'
      },
      ReturnValues: 'UPDATED_NEW',
      ConditionExpression: 'businessesID = :businessesID'
    };
  }

  if (ContactAddresses !== undefined && ContactAddresses?.length !== 0) {
    ContactAddresses.businessesID = businessesID;
    const { updateExp, expAttrValues } = getDynamoDbExpressions(ContactAddresses);
    updateContactAddressesInput = {
      TableName: process.env.API_WEPLAYMAIN_CONTACTADDRESSESTABLE_NAME,
      Key: {
        id: ContactAddresses.id
      },
      UpdateExpression: updateExp,
      ExpressionAttributeValues: expAttrValues,
      ExpressionAttributeNames: {
        '#lastChangedAt': '_lastChangedAt',
        '#version': '_version',
        '#State': 'State'
      },
      ConditionExpression: 'businessesID = :businessesID',
      ReturnValues: 'UPDATED_NEW'
    };
  }

  if (ContactEmails !== undefined && ContactEmails?.length !== 0) {
    ContactEmails.businessesID = businessesID;
    const { updateExp, expAttrValues } = getDynamoDbExpressions(ContactEmails);
    updateContactEmailsInput = {
      TableName: process.env.API_WEPLAYMAIN_CONTACTEMAILSTABLE_NAME,
      Key: {
        id: ContactEmails.id
      },
      UpdateExpression: updateExp,
      ExpressionAttributeValues: expAttrValues,
      ExpressionAttributeNames: {
        '#lastChangedAt': '_lastChangedAt',
        '#version': '_version'
      },
      ConditionExpression: 'businessesID = :businessesID',
      ReturnValues: 'UPDATED_NEW'
    };
  }
  otherKeys.businessesID = businessesID;
  const { updateExp, expAttrValues } = getDynamoDbExpressions(otherKeys);
  const updatePlayerInput = {
    TableName: process.env.API_WEPLAYMAIN_CONTACTSTABLE_NAME,
    Key: {
      id
    },
    UpdateExpression: updateExp,
    ExpressionAttributeValues: expAttrValues,
    ExpressionAttributeNames: {
      '#lastChangedAt': '_lastChangedAt',
      '#version': '_version'
    },
    ReturnValues: 'UPDATED_NEW',
    ConditionExpression: 'businessesID = :businessesID'
  };

  console.log('all', updatePreferredPositionInput, updatePlayerSoccerSkillsInput, updateContactAddressesInput, updateContactEmailsInput, updatePlayerInput);

  const all = [
    { Update: updatePreferredPositionInput },
    { Update: updatePlayerSoccerSkillsInput },
    { Update: updateContactAddressesInput },
    { Update: updateContactEmailsInput },
    { Update: updatePlayerInput }];

  const filterQueries = all.filter((trans) => {
    return trans.Update !== undefined;
  });

  console.log('Before', all);
  console.log('After', filterQueries);
  console.log('ALL TRANS', JSON.stringify({
    TransactItems: [
      ...deletePrevPlayers,
      ...filterQueries,
      ...teamPlayers
    ]
  }));
  const transactWrite = new TransactWriteCommand({
    TransactItems: [
      ...deletePrevPlayers,
      ...filterQueries,
      ...teamPlayers
    ]
  });

  return {
    TransactWriteCommand: transactWrite,
    teamValue: teamPlayers,
    player: {
      Item: {
        FirstName: '',
        businessesID: '',
        _deleted: null,
        _lastChangedAt: Math.floor(Date.now()),
        _version: 1,
        PhotoId: null,
        createdAt: new Date().toISOString(),
        id,
        updatedAt: new Date().toISOString()
      }
    }
  };
};
