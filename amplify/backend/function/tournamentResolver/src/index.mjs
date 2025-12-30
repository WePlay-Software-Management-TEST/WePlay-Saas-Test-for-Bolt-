import { getOwnerId } from './getOwner.mjs';
import { getDocumentClient } from './getDocumentClient.mjs';
import { getMutation } from './getMutation.mjs';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { getNotifyPlayerEmail } from './notifyPlayersEmail.mjs';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = getDocumentClient();
const ses = new SESClient({ region: 'us-west-1' });
const PLAYER_PORTAL_URL = process.env.PLAYER_PORTAL_URL || 'http://localhost:4200';

const fetchFilterValuesInArray = (valueArray, aliasName = 'teamId') => {
  const filterExpressions = valueArray.map((id, index) => `:${aliasName}${index}`).join(', ');
  const expressionValues = valueArray.reduce((acc, id, index) => {
    acc[`:${aliasName}${index}`] = id;
    return acc;
  }, {});

  return { filterExpressions, expressionValues };
};

const sendSESMessage = async (tournamentName, teamName, emails) => {
  for (const email of emails) {
    const emailContent = getNotifyPlayerEmail(tournamentName, teamName, email, PLAYER_PORTAL_URL);
    const emailParams = {
      Destination: { ToAddresses: [email] },
      Message: {
        Body: { Html: { Charset: 'UTF-8', Data: emailContent } },
        Subject: { Charset: 'UTF-8', Data: `Tournament Invitation - ${tournamentName}` }
      },
      Source: 'no-reply@weplay.ai'
    };

    try {
      const command = new SendEmailCommand(emailParams);
      await ses.send(command);
      console.log(`Email sent successfully to ${email}`);
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
    }
  }
};

const fetchDataFromDynamoDB = async (tableName, filterExpression, expressionNames, expressionValues) => {
  const command = new ScanCommand({
    TableName: tableName,
    FilterExpression: filterExpression,
    ExpressionAttributeNames: expressionNames,
    ExpressionAttributeValues: expressionValues
  });
  const { Items } = await client.send(command);
  return Items || [];
};

const sendEmailsToAllTeams = async (teams, tournamentName) => {
  for (const team of teams) {
    const { teamName, playerContactId } = team;
    await sendSESMessage(tournamentName, teamName, playerContactId);
  }
};

export const handler = async (event, args, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    const { businessId, ownerId } = getOwnerId(event);
    const { atomicRequests } = getMutation(event.fieldName)(event.arguments.input, businessId, ownerId);

    const allSeedRequests = atomicRequests.map(async (command) => client.send(command));
    const response = await Promise.all(allSeedRequests);
    console.log(JSON.stringify(response));

    if (event.fieldName === 'createTourney') {
      const tournamentName = event.arguments.input.createTournament?.tournamentName;
      const teamsIds = event.arguments.input?.matchesParties.map((matchParty) => matchParty.matchPartiesTeamId)
        .filter(item => item !== 'BYE' && item !== null && item !== undefined);

      const { filterExpressions: teamsFilterExpressions, expressionValues: teamsExpressionValues } = fetchFilterValuesInArray(teamsIds);

      const teamsTableData = await fetchDataFromDynamoDB(
        process.env.API_WEPLAYMAIN_TEAMSTABLE_NAME,
        `#id IN (${teamsFilterExpressions}) AND #deleted <> :deleted`,
        { '#id': 'id', '#deleted': '_deleted' },
        { ...teamsExpressionValues, ':deleted': true }
      );

      if (teamsTableData.length === 0) {
        callback(null, {});
        return;
      }
      console.log('teamsTableData', JSON.stringify(teamsTableData));
      const teams = teamsTableData.map((team) => {
        return {
          teamName: team.TeamName,
          teamId: team.id,
          playerContactId: []
        };
      });

      console.log('teams', JSON.stringify(teams));
      const contactIds = await fetchDataFromDynamoDB(
        process.env.API_WEPLAYMAIN_TEAMPLAYERSTABLE_NAME,
        `#teamsID IN (${teamsFilterExpressions}) AND #deleted <> :deleted`,
        { '#teamsID': 'teamsID', '#deleted': '_deleted' },
        { ...teamsExpressionValues, ':deleted': true }
      );
      console.log('contactIds', JSON.stringify(contactIds));
      const contactIdsArray = contactIds.map((teamPlayer) => teamPlayer.contactsID);
      const contactIdMap = contactIds.reduce((acc, teamPlayer) => {
        if (!acc[teamPlayer.teamsID]) acc[teamPlayer.teamsID] = [];
        acc[teamPlayer.teamsID].push(teamPlayer.contactsID);
        return acc;
      }, {});
      console.log('contactIdMap', JSON.stringify(contactIdMap));
      const updatedTeams = teams.map((team) => {
        const teamContactIds = contactIdMap[team.teamId] || [];
        return { ...team, playerContactId: teamContactIds };
      });
      console.log('updatedTeams', JSON.stringify(updatedTeams));
      const { filterExpressions: contactFilterExpressions, expressionValues: contactExpressionsValues } = fetchFilterValuesInArray(contactIdsArray);
      const playerEmails = await fetchDataFromDynamoDB(
        process.env.API_WEPLAYMAIN_CONTACTEMAILSTABLE_NAME,
        `#contactsID IN (${contactFilterExpressions}) AND #deleted <> :deleted`,
        { '#contactsID': 'contactsID', '#deleted': '_deleted' },
        { ...contactExpressionsValues, ':deleted': true }
      );
      console.log('playerEmails', JSON.stringify(playerEmails));
      const teamsWithEmails = updatedTeams.map((team) => {
        const updatedPlayerEmails = team.playerContactId.map((contactId) => {
          const emailData = playerEmails.find(emailData => emailData.contactsID === contactId);
          return emailData ? emailData.Email : null;
        });
        return { ...team, playerContactId: updatedPlayerEmails };
      });
      console.log('EMAILS', JSON.stringify(teamsWithEmails));
      await sendEmailsToAllTeams(teamsWithEmails, tournamentName);
    }

    callback(null, {});
  } catch (err) {
    console.error('Error:', err);
    callback(null, { error: err.message });
  }
};
