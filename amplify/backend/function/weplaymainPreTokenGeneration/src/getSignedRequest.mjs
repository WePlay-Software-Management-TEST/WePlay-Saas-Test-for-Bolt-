/* global fetch */
import { SignatureV4 } from '@smithy/signature-v4';
import { HttpRequest } from '@smithy/protocol-http';
import { Sha256 } from '@aws-crypto/sha256-js';

/**
 * Performs a signed fetch operation to a GraphQL endpoint using AWS Signature Version 4.
 * i decieded to go this route, and not use DynamoDb directly, because of the relationships that graphQL gives me
 * over dynamoDB
 * @param {Object} graphqlObject - The GraphQL object to be sent in the request body.
 * @returns {Promise<Object>} - A promise that resolves to the response from the GraphQL endpoint.
 */
export const signedFetch = async (graphqlObject) => {
  const GRAPHQL_ENDPOINT = process.env.API_WEPLAYMAIN_GRAPHQLAPIENDPOINTOUTPUT;

  const {
    REGION,
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY
  } = process.env;

  console.log(ACCESS_KEY_ID, SECRET_ACCESS_KEY);

  const apiUrl = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    service: 'appsync',
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY
    },
    sha256: Sha256
  });
  if (!graphqlObject) return;

  const request = new HttpRequest({
    hostname: apiUrl.host,
    path: apiUrl.pathname,
    body: JSON.stringify(graphqlObject),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: apiUrl.hostname
    }
  });

  const signedRequest = await signer.sign(request);

  const { headers, body, method } = await signedRequest;

  const awsSignedRequest = await fetch(GRAPHQL_ENDPOINT, {
    headers,
    body,
    method
  }).then((res) => res.json());

  return awsSignedRequest;
};
