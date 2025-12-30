/**
 * Constructs a GraphQL query to list contact roles for a specific user.
 *
 * This function generates a query string for fetching contact roles associated with a given user ID.
 * It filters out any deleted contact roles and retrieves the roles and businesses IDs linked to the user.
 *
 * @param {string} userId - The unique identifier of the user whose contact roles are to be fetched.
 *
 * @returns {Object} An object containing the GraphQL query string and the operation name.
 * The query string is constructed to fetch contact roles for the specified user ID.
 */
export function listContactRoles (userId, contactId) {
  return {
    query: `query listContactRoles {
      listContactRoles(
        limit: 10000
        filter: {
          _deleted: {ne: true},
          or: [
            {contactsID: {eq: "${userId}"}},
            {contactsID: {eq: "${contactId}"}}
          ]
        }
      ) {
        items {
          rolesID
          businessesID
        }
      }
    }
`,
    operationName: 'listContactRoles'
  };
};

/**
 * Constructs a GraphQL query to list policies based on the provided roles.
 *
 * This function generates a query string for fetching policies associated with specific roles.
 * It supports filtering policies by one or two role IDs, constructing the appropriate filter input
 * for the GraphQL query. The query retrieves a list of policies, including denied fields and actions.
 *
 * @param {string[]} roles - An array of role IDs used to filter the policies. The array can contain one or two role IDs.
 *
 * @returns {Object} An object containing the GraphQL query string and the operation name.
 * The query string is constructed to fetch policies with the specified role IDs.
 */
export function listPolicies (roles) {
  let filterInput = `{policyRoleId: {eq: "${roles[0]}"}}`;
  if (roles.length === 2) {
    filterInput = `{policyRoleId: {eq: "${roles[0]}"}, or: {policyRoleId: {eq: "${roles[1]}"}}}`;
  };
  return {
    query: `query listPolicies {
  listPolicies(limit: 1000, filter: ${filterInput}) {
    items {
      DeniedFields
      OnlyOnOwn
      Action {
        actionName
      }
    }
  }
}
`,
    operationName: 'listPolicies'
  };
};
