import gql from 'graphql-tag';

/**
 * Retrieves the ARNs (Amazon Resource Names) for denied fields based on the provided parameters.
 * @param {Array<Object>} deniedFields - An array of objects containing actionName and deniedField properties.
 * @param {string} apiId - The ID of the API.
 * @param {string} accountId - The ID of the AWS account.
 * @returns {Array<string>} - An array of ARNs for the denied fields.
 */
function getDeniedFields (deniedFields, apiId, accountId) {
  const fieldsARNs = deniedFields.map(({ actionName, deniedFields }) => {
    if (deniedFields === undefined) return [];
    const fileteredDeniedFields = deniedFields.filter((field) => field !== '*');
    return fileteredDeniedFields.map((field) => {
      const type = actionName.replace(/list|get|update|delete|create/gi, '');
      return `arn:aws:appsync:${process.env.AWS_REGION}:${accountId}:apis/${apiId}/types/${type}/fields/${field}`;
    });
  });

  return [].concat(...fieldsARNs);
}

/**
 * Checks if a user is allowed to perform a specific action based on policies.
 * @param {Array<Object>} policies - An array of policy objects.
 * @param {string} apiId - The ID of the API.
 * @param {string} accountId - The ID of the AWS account.
 * @param {string} queryString - The GraphQL query string.
 * @returns {Object} - An object containing information about user authorization and denied fields.
 */
export function isUserAllowedToPrefromAction (policies, apiId, accountId, queryString) {
  const query = gql(queryString);
  const operations = query.definitions[0].selectionSet.selections.map((operation) => operation.name.value);

  const allowedOnOwn = [];

  const deniedFields = [];

  const NonDuplicateOperations = operations.filter(
    (item, index) => operations.indexOf(item) === index);
  let isAllowedAction = NonDuplicateOperations.length;

  policies.forEach((policy) => {
    if (NonDuplicateOperations.includes(policy.Action.actionName)) {
      isAllowedAction -= 1;
      deniedFields.push({
        actionName: policy.Action.actionName,
        deniedFields: policy.DeniedFields
      });
      allowedOnOwn.push(
        {
          allowedOnOwn: policy.OnlyOnOwn,
          action: policy.Action.actionName
        });
    }
  });

  return {
    isAuth: isAllowedAction === 0,
    deniedFields: getDeniedFields(deniedFields, apiId, accountId),
    allowedOnOwn
  };
};
