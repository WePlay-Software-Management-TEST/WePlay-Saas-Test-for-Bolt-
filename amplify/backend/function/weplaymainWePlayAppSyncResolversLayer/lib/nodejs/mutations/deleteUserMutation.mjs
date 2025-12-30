import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';

export function deleteUser (userData, businessesID) {
  const { id, ContactEmails, ContactAddresses, ContactRoles } = userData;
  const userEmails = {
    TableName: process.env.API_WEPLAYMAIN_CONTACTEMAILSTABLE_NAME,
    Key: {
      id: ContactEmails
    },
    ConditionExpression: 'businessesID = :businessesID',
    ExpressionAttributeValues: {
      ':businessesID': businessesID
    }
  };
  const userRoles = {
    TableName: process.env.API_WEPLAYMAIN_CONTACTROLESTABLE_NAME,
    Key: {
      id: ContactRoles
    },
    ConditionExpression: 'businessesID = :businessesID',
    ExpressionAttributeValues: {
      ':businessesID': businessesID
    }
  };

  const userContact = {
    TableName: process.env.API_WEPLAYMAIN_CONTACTSTABLE_NAME,
    Key: {
      id: id
    },
    ConditionExpression: 'businessesID = :businessesID',
    ExpressionAttributeValues: {
      ':businessesID': businessesID
    }
  };

  const deleteCommand = {
    TransactItems: [
      {
        Delete: userContact
      },
      {
        Delete: userRoles
      },
      {
        Delete: userEmails
      }
    ]
  };

  if (ContactAddresses !== undefined && ContactAddresses !== '') {
    const userAddresses = {
      TableName: process.env.API_WEPLAYMAIN_CONTACTADDRESSESTABLE_NAME,
      Key: {
        id: ContactAddresses
      },
      ConditionExpression: 'businessesID = :businessesID',
      ExpressionAttributeValues: {
        ':businessesID': businessesID
      }
    };
    deleteCommand.TransactItems.push({
      Delete: userAddresses
    });
  }
  const transactWrite = new TransactWriteCommand(deleteCommand);

  return {
    TransactWriteCommand: transactWrite
  };
};
