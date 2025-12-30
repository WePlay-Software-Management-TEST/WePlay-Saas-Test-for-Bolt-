import { LambdaClient, GetFunctionUrlConfigCommand, CreateFunctionUrlConfigCommand } from '@aws-sdk/client-lambda';
import { setUpLink, getEmailMessage, getEmailSubject } from './utils.mjs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  QueryCommand
} from '@aws-sdk/lib-dynamodb';

const lambdaClient = new LambdaClient({ region: 'us-west-1' });

const createFunctionURLinput = {
  FunctionName: process.env.FUNCTION_CONFIRMANDREDIRECTUSER_NAME,
  AuthType: 'NONE'
};

const getFunctionURLInput = {
  FunctionName: process.env.FUNCTION_CONFIRMANDREDIRECTUSER_NAME
};

const client = new DynamoDBClient({ region: 'us-west-1' });
const dynamo = DynamoDBDocumentClient.from(client);
const businessTableName = process.env.API_WEPLAYMAIN_BUSINESSESTABLE_NAME;

/**
 * AWS Lambda handler for processing custom messages for user actions such as sign-up, password reset, and user creation.
 *
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 * @param {Object} event - The event object containing request data.
 * @param {Object} context - The context object containing runtime information.
 * @param {Function} callback - The callback function to return the response or error.
 *
 * @returns {void}
 *
 * @description
 * This handler generates custom email messages and subjects based on the trigger source.
 * It retrieves business information from DynamoDB if necessary and constructs URLs for email links.
 * The function handles different trigger sources and sets up appropriate email content.
 */
export const handler = async (event, context, callback) => {
  console.log(callback);
  console.log(event);
  console.log(context);

  const defaultUrl = process.env.DEFAULT_URL;
  console.log('default Url: ' + defaultUrl);

  const triggerSources = ['CustomMessage_SignUp', 'CustomMessage_ResendCode', 'CustomMessage_ForgotPassword', 'CustomMessage_AdminCreateUser'];

  if (triggerSources.includes(event.triggerSource)) {
    console.log('function triggered');
    const isForgotPassowrd = event.triggerSource === 'CustomMessage_ForgotPassword';

    console.log(event);
    const { codeParameter } = event.request;
    const { userName, region, request } = event;
    let { clientId } = event.callerContext;

    if (clientId === undefined || clientId === 'CLIENT_ID_NOT_APPLICABLE') {
      clientId = process.env.clientID;
    }

    const { email } = event.request.userAttributes;
    const businessID = request.userAttributes['custom:BusinessId'];
    let facilityName = '';
    let roleLabel = '';

    if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
      const businessInfo = await dynamo.send(
        new QueryCommand({
          TableName: businessTableName,
          KeyConditionExpression: 'id = :id',
          ExpressionAttributeValues: {
            ':id': businessID
          }
        })
      );
      console.log(businessInfo.Items[0].BusinessName);
      facilityName = businessInfo.Items[0].BusinessName;
      roleLabel = event.request?.clientMetadata.role;
    }

    let redirectURL = defaultUrl;
    redirectURL = event.request.userAttributes['custom:redirectUrl'] ?? defaultUrl;
    console.log(redirectURL);
    console.log('After setting the redirect url');

    const getURLCommand = new GetFunctionUrlConfigCommand(getFunctionURLInput);
    let functionUrl = '';
    try {
      const response = await lambdaClient.send(getURLCommand);
      functionUrl = response.FunctionUrl;
    } catch (err) {
      console.log(err);
      const createFunctionURL = new CreateFunctionUrlConfigCommand(createFunctionURLinput);
      const response = await lambdaClient.send(createFunctionURL);
      functionUrl = response.FunctionUrl;
    }

    console.log(functionUrl);
    const apiGatewayURL = functionUrl;

    console.log(apiGatewayURL);

    const url = isForgotPassowrd ? `${redirectURL}/changepassword` : `${apiGatewayURL}confirmUser`;
    const textButton = isForgotPassowrd ? 'Reset Password' : 'Confirm Email';
    const link = setUpLink(url, codeParameter, userName, clientId, region, email, redirectURL, textButton, event.triggerSource, roleLabel);

    console.log(link);

    event.response.emailSubject = getEmailSubject(event.triggerSource, facilityName);
    event.response.emailMessage = getEmailMessage(event.triggerSource, link, facilityName);
    console.log(event);
  }

  callback(null, event);
};
