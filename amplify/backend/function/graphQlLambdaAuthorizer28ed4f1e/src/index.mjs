import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { isUserAllowedToPrefromAction } from './getDeniedFields.mjs';

/**
 * AWS Lambda handler for authorizing GraphQL requests using Cognito JWTs.
 *
 * @param {Object} event - The event object containing request data.
 * @param {string} event.authorizationToken - The JWT token used for authorization.
 * @param {Object} event.requestContext - Contextual information about the request.
 * @param {string} event.requestContext.apiId - The API ID associated with the request.
 * @param {string} event.requestContext.accountId - The account ID associated with the request.
 * @param {string} event.requestContext.queryString - The GraphQL query string.
 *
 * @returns {Promise<Object>} The authorization result.
 * @returns {boolean} return.isAuthorized - Indicates if the request is authorized.
 * @returns {Object} [return.resolverContext] - Context for the resolver if authorized.
 * @returns {string} return.resolverContext.ownerId - The ID of the user making the request.
 * @returns {string} return.resolverContext.businessId - The business ID associated with the user.
 * @returns {string} return.resolverContext.role - The roles of the user in JSON string format.
 * @returns {string} return.resolverContext.allowedOnOwn - Actions allowed on own resources in JSON string format.
 * @returns {Array} return.deniedFields - Fields that the user is denied access to.
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const {
    authorizationToken,
    requestContext: { apiId, accountId, queryString }
  } = event;

  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AUTH_WEPLAYMAIN_USERPOOLID,
    tokenUse: 'id',
    clientId: process.env.clientID
  });
  let payload;
  let businessID;
  let policies;
  let roles;

  try {
    payload = await verifier.verify(authorizationToken);

    businessID = payload['custom:BusinessId'];
    policies = JSON.parse(payload.policies);
    roles = JSON.parse(payload.roles);
  } catch {
    return {
      isAuthorized: false
    };
  }
  const {
    isAuth,
    deniedFields,
    allowedOnOwn
  } = isUserAllowedToPrefromAction(policies, apiId, accountId, queryString);

  if (!isAuth) {
    return {
      isAuthorized: false
    };
  }

  return {
    isAuthorized: true,
    resolverContext: {
      ownerId: payload.sub,
      businessId: businessID,
      role: JSON.stringify(roles),
      allowedOnOwn: JSON.stringify(allowedOnOwn)
    },
    deniedFields
  };
};
