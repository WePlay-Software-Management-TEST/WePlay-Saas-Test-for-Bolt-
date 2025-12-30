#!/bin/bash
# This code snippets connects to amplify push command, where after push is complete
# it runs this bash script.
# this bash scripts runs the seedDynamoDB policy store.
if [[ -z "${LAMBDA_NAME}" ]]; then
  LAMBDA_FUNCTION_NAME="seedDynamoDBPolicyStore-devenv"
else
  LAMBDA_FUNCTION_NAME="${LAMBDA_NAME}"
fi

# Invoke the Lambda function using AWS CLI
aws lambda invoke \
  --function-name $LAMBDA_FUNCTION_NAME \
  --payload '{}' \
  response.json

# Check the response
if [ $? -eq 0 ]; then
  echo "Lambda function invoked successfully."
else
  echo "Failed to invoke Lambda function."
fi