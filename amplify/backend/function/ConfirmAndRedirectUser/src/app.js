const express = require('express');
const bodyParser = require('body-parser');

const { CognitoIdentityProviderClient, ConfirmSignUpCommand } = require('@aws-sdk/client-cognito-identity-provider');
const client = new CognitoIdentityProviderClient({
  region: 'us-west-1'
});

const app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/confirmUser', async function (req, res) {
  const confirmationCode = req.query.code;
  const clientId = req.query.clientId;
  const email = req.query.email;
  const redirectURL = req.query.redirectURL;

  const params = {
    ClientId: clientId,
    ConfirmationCode: confirmationCode,
    Email: email,
    Username: email
  };
  const command = new ConfirmSignUpCommand(params);

  try {
    await client.send(command);
    res.redirect(`${redirectURL}/signup?email=${email}`);
  } catch (error) {
    res.redirect(`${redirectURL}/404`);
  }
});

app.listen(3000, function () {
  console.log('App started');
});

module.exports = app;
