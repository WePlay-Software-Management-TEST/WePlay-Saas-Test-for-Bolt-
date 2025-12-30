const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app');
console.log('Lambda is starting up...');

exports.handler = serverlessExpress({ app });
