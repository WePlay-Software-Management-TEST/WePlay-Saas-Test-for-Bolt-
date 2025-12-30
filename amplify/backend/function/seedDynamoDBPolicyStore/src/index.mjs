import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { actionsFixture } from './actions.mjs';
import { policiesFixture } from './policies.mjs';
import { resourcesFixture } from './resource.mjs';
import { rolesFixture } from './roles.mjs';
import { tournamentRulesFixtures, tRulesToTFormatFixtures, tftToSportsFixtures } from './tournamentRules.mjs';

/**
* Lambda function handler that writes multiple items to DynamoDB using a transaction, this function is runs when a new build gets triggered
* by amplify, ie amplify push command.
* @param {Object} event - The event object containing data to be written to DynamoDB.
* @returns {Promise<void>} - A promise that resolves after writing items to DynamoDB.
*/

export const handler = async (event) => {
  const writeParams = {
    TransactItems: []
  };

  const marshallOptions = {
    removeUndefinedValues: true
  };
  const translateConfig = { marshallOptions };

  const client = new DynamoDBClient({ region: process.env.REGION });
  const dynamoDbClient = DynamoDBDocumentClient.from(client, translateConfig);
  const defaultValuesForCreation = {
    _lastChangedAt: new Date().getTime(),
    _version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  writeParams.TransactItems.push(...actionsFixture.map((action) => {
    return {
      Put: {
        Item: {
          __typename: 'Action',
          ...defaultValuesForCreation,
          ...action
        },
        TableName: process.env.API_WEPLAYMAIN_ACTIONTABLE_NAME
      }
    };
  }));

  writeParams.TransactItems.push(...resourcesFixture.map((resource) => {
    return {
      Put: {
        Item: {
          __typename: 'Resource',
          ...defaultValuesForCreation,
          ...resource
        },
        TableName: process.env.API_WEPLAYMAIN_RESOURCETABLE_NAME
      }
    };
  }));

  writeParams.TransactItems.push(...rolesFixture.map((role) => {
    return {
      Put: {
        Item: {
          __typename: 'Role',
          ...defaultValuesForCreation,
          ...role
        },
        TableName: process.env.API_WEPLAYMAIN_ROLETABLE_NAME
      }
    };
  }));

  writeParams.TransactItems.push(...policiesFixture.map((policy) => {
    return {
      Put: {
        Item: {
          __typename: 'Policy',
          ...defaultValuesForCreation,
          ...policy
        },
        TableName: process.env.API_WEPLAYMAIN_POLICYTABLE_NAME
      }
    };
  }));

  writeParams.TransactItems.push(...tournamentRulesFixtures.map((rule) => {
    return {
      Put: {
        Item: {
          __typename: 'TournamentRules',
          ...defaultValuesForCreation,
          ...rule
        },
        TableName: process.env.API_WEPLAYMAIN_TOURNAMENTRULESTABLE_NAME
      }
    };
  }));

  writeParams.TransactItems.push(...tRulesToTFormatFixtures.map((ruleToFormat) => {
    return {
      Put: {
        Item: {
          __typename: 'TRulesToTFormat',
          ...defaultValuesForCreation,
          ...ruleToFormat
        },
        TableName: process.env.API_WEPLAYMAIN_TRULESTOTFORMATTABLE_NAME
      }
    };
  }));

  writeParams.TransactItems.push(...tftToSportsFixtures.map((tftToSports) => {
    return {
      Put: {
        Item: {
          __typename: 'TFToSports',
          ...defaultValuesForCreation,
          ...tftToSports
        },
        TableName: process.env.API_WEPLAYMAIN_TFTOSPORTSTABLE_NAME
      }
    };
  }));

  const chunkSize = 99;
  const chuncksOfSeedCommand = [];

  for (let i = 0; i < writeParams.TransactItems.length; i += chunkSize) {
    const chunk = writeParams.TransactItems.slice(i, i + chunkSize);
    chuncksOfSeedCommand.push({
      TransactItems: chunk
    });
  }

  const seedCommands = chuncksOfSeedCommand.map((write) => {
    return new TransactWriteCommand(write);
  });

  try {
    const allSeedRequests = seedCommands.map(async (command) => {
      return dynamoDbClient.send(command);
    });
    const response = await Promise.all(allSeedRequests);
    console.log(JSON.stringify(response));
  } catch (err) {
    console.log(err);
  }
};
