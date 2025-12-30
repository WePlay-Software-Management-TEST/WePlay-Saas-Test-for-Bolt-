import { v4 as uuidv4 } from 'uuid';
import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';

/**
 * @Function Handles Creating a Player Mutation, using pre-set data.
 * @param { UpdatePlayerContact } playerModel - Event that comes with AppSync Mutation Input, using InsertPlayer mutation.
 * @param { string } businessesID - Bussiness ID that is associated with the Contact Record.
 * @param { DynamoDB Client } documentClient - DynamoDB Client, to Create Command Objects.
 * @param { string } ownerId - Owner ID.
 */

export async function insertPlayer (playerModel, businessesID, documentClient, ownerId) {
  const newPlayerId = uuidv4();
  const newPlayerSkill = uuidv4();
  const newPrefferedPerfrencecs = uuidv4();

  const {
    teams,
    id, _version, PreferredPositition,
    PlayerSoccerSkills, ContactEmails, ContactAddresses, PersonPreferences, ...otherKeys
  } = playerModel?.arguments?.input;

  console.log(playerModel.arguments.input);

  const playerSoccerSkills = {
    TableName: process.env.API_WEPLAYMAIN_PLAYERSOCCERSKILLSTABLE_NAME,
    Item: {
      id: newPlayerSkill,
      __typename: 'PlayerSoccerSkills',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _lastChangedAt: Math.floor(Date.now()),
      owner: ownerId,
      businessesID,
      _version: 1,
      ExperienceLevel: PlayerSoccerSkills.ExperienceLevel,
      LeftRightFooted: PlayerSoccerSkills.LeftRightFooted
    },
    ReturnConsumedCapacity: 'TOTAL',
    ConditionExpression: 'attribute_not_exists(id)'
  };

  const playerAddresses = {
    TableName: process.env.API_WEPLAYMAIN_CONTACTADDRESSESTABLE_NAME,
    Item: {
      id: uuidv4(),
      __typename: 'ContactAddresses',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _lastChangedAt: Math.floor(Date.now()),
      owner: ownerId,
      businessesID,
      _version: 1,
      City: ContactAddresses.City,
      State: ContactAddresses.State,
      PostalCode: ContactAddresses.PostalCode,
      contactsID: newPlayerId
    },
    ReturnConsumedCapacity: 'TOTAL',
    ConditionExpression: 'attribute_not_exists(id)'
  };

  const playerEmail = {
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
      Email: ContactEmails.Email,
      contactsID: newPlayerId
    },
    ReturnConsumedCapacity: 'TOTAL',
    ConditionExpression: 'attribute_not_exists(id)'
  };

  const preferredPositition = {
    TableName: process.env.API_WEPLAYMAIN_PLAYERPOSITIONSTABLE_NAME,
    Item: {
      id: uuidv4(),
      __typename: 'PlayerPositions',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _lastChangedAt: Math.floor(Date.now()),
      businessesID,
      owner: ownerId,
      _version: 1,
      Position: PreferredPositition.Position,
      playersoccerskillsID: newPlayerSkill
    },
    ReturnConsumedCapacity: 'TOTAL',
    ConditionExpression: 'attribute_not_exists(id)'
  };

  const personPreferences = {
    TableName: process.env.API_WEPLAYMAIN_PERSONPREFERENCESTABLE_NAME,
    Item: {
      id: newPrefferedPerfrencecs,
      __typename: 'PersonPreferences',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _lastChangedAt: Math.floor(Date.now()),
      businessesID,
      owner: ownerId,
      _version: 1,
      LengthUnit: 'METRIC',
      WeightUnit: 'IMPERIAL'
    },
    ReturnConsumedCapacity: 'TOTAL',
    ConditionExpression: 'attribute_not_exists(id)'
  };

  let teamPlayers = [];

  if (teams !== undefined) {
    if (teams.length !== 0) {
      teamPlayers = teams.map((teamPlayers) => {
        return {
          Put: {
            Item:
            {
              ...teamPlayers,
              contactsID: newPlayerId,
              businessesID,
              id: uuidv4(),
              __typename: 'TeamPlayers',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              _lastChangedAt: Math.floor(Date.now()),
              owner: ownerId,
              _version: 1
            },
            TableName: process.env.API_WEPLAYMAIN_TEAMPLAYERSTABLE_NAME,
            ConditionExpression: 'attribute_not_exists(id)'
          }
        };
      });
    };
  };

  const player = {
    TableName: process.env.API_WEPLAYMAIN_CONTACTSTABLE_NAME,
    Item: {
      id: newPlayerId,
      __typename: 'Contacts',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _lastChangedAt: Math.floor(Date.now()),
      owner: ownerId,
      _version: 1,
      FirstName: otherKeys.FirstName,
      LastName: otherKeys.LastName,
      Height: otherKeys.Height,
      Weight: otherKeys.Weight,
      Biography: otherKeys.Biography,
      PhotoId: otherKeys.PhotoId,
      Birthdate: otherKeys.Birthdate,
      Gender: otherKeys.Gender,
      businessesID,
      contactsPersonPreferencesId: newPrefferedPerfrencecs,
      contactsPlayerSoccerSkillsId: newPlayerSkill
    },
    ReturnConsumedCapacity: 'TOTAL',
    ConditionExpression: 'attribute_not_exists(id)'
  };

  const transactWrite = new TransactWriteCommand({
    TransactItems: [
      {
        Put: playerSoccerSkills
      },
      {
        Put: playerAddresses
      },
      {
        Put: playerEmail
      },
      {
        Put: preferredPositition
      },
      {
        Put: personPreferences
      },
      {
        Put: player
      },
      ...teamPlayers
    ]
  });

  return {
    TransactWriteCommand: transactWrite,
    player,
    preferredPositition,
    playerEmail,
    playerAddresses,
    playerSoccerSkills,
    teamValue: teamPlayers
  };
};
