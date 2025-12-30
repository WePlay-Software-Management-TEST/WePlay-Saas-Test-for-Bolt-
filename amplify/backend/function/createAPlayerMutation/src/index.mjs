/* Amplify Params - DO NOT EDIT
API_WEPLAYMAIN_CONTACTADDRESSESTABLE_ARN
API_WEPLAYMAIN_CONTACTADDRESSESTABLE_NAME
API_WEPLAYMAIN_CONTACTEMAILSTABLE_ARN
API_WEPLAYMAIN_CONTACTEMAILSTABLE_NAME
API_WEPLAYMAIN_CONTACTSTABLE_ARN
API_WEPLAYMAIN_CONTACTSTABLE_NAME
API_WEPLAYMAIN_GRAPHQLAPIIDOUTPUT
API_WEPLAYMAIN_PERSONPREFERENCESTABLE_ARN
API_WEPLAYMAIN_PERSONPREFERENCESTABLE_NAME
API_WEPLAYMAIN_PLAYERPOSITIONSTABLE_ARN
API_WEPLAYMAIN_PLAYERPOSITIONSTABLE_NAME
API_WEPLAYMAIN_PLAYERSOCCERSKILLSTABLE_ARN
API_WEPLAYMAIN_PLAYERSOCCERSKILLSTABLE_NAME
API_WEPLAYMAIN_TEAMPLAYERSTABLE_NAME
API_WEPLAYMAIN_TEAMPLAYERSTABLE_ARN
ENV
REGION
Amplify Params - DO NOT EDIT */

import { getOwnerId } from './getOwner.mjs';
import { getDocumentClient } from './getDocumentClient.mjs';
import { getMutation } from './getMutation.mjs';
import { sendRequest } from './sendRequest.mjs';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * Lambda AppSync Resolver to handle Mutations related to Contacts table.
 * This Resolver Creates/Updates Contacts table record, with associated data connected,
 * Which means it's also responsible for creating records for PlayerSoccerSkills table,
 * ContactEmails, ContactAddress and PersonPreferences Records, with their respect IDs and
 * Connected by ID with the newly created Contact Record.
 */

const documentClient = getDocumentClient();

export const handler = async (event, _, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { businessId, ownerId } = getOwnerId(event);

  // TODO: We can get rid of this extra request by adding a customAttr to our
  // Cognito attr that is businessID.
  const mutation = getMutation(event.fieldName);

  const {
    TransactWriteCommand, player, preferredPositition,
    playerEmail, playerAddresses, playerSoccerSkills, teamValue
  } = await mutation(
    event, businessId, documentClient, ownerId
  );

  await sendRequest(documentClient, TransactWriteCommand, callback);

  const arrayOfTeams = teamValue.map((teamPlayer) => {
    return teamPlayer.Put.Item;
  });

  if (event.fieldName === 'insertPlayer') {
    callback(null,
      { ...player?.Item },
      { ...preferredPositition?.Item },
      { ...playerEmail?.Item },
      { ...playerAddresses?.Item },
      { ...playerSoccerSkills?.Item },
      { teams: arrayOfTeams });
  } else if (event.fieldName === 'updatePlayer') {
    callback(null, { ...player?.Item },
      { teams: arrayOfTeams });
  }
};
