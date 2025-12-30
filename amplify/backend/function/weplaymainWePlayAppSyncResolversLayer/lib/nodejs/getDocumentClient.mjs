import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

/**
 * Returns a DynamoDBDocumentClient configured with specified marshall options.
 *
 * @returns {DynamoDBDocumentClient} The configured DynamoDBDocumentClient instance.
 */
export function getDocumentClient () {
  const marshallOptions = {
    removeUndefinedValues: true
  };
  const translateConfig = { marshallOptions };

  const client = new DynamoDBClient({ region: process.env.REGION });
  const documentClient = DynamoDBDocumentClient.from(client, translateConfig);

  return documentClient;
};
