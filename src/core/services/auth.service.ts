import { Auth, API, Cache } from 'aws-amplify';
import { type CognitoUser } from '@aws-amplify/auth';
import { type RegistrationStepsFrom } from '../../features/signup/models/signup.models';
import { type GraphQLQuery } from '@aws-amplify/api';
import {
  type CreateUserMutation,
  type CreateBusinessesMutation,
  type DeleteUserMutation,
  type ListContactsQuery,
  type CreateContactsMutation,
  type ListContactEmailsQuery,
  type ListContactRolesQuery,
  type ContactEmails
} from 'API';
import { type UserAttributesState } from 'core/models/userContext.model';
import { createAdminAccountMutation, createContactCustomMutation, listUsers } from 'graphql/custom.queries';
import { createUser, deleteUser } from 'graphql/mutations';
import { type Contact } from 'graphql/table.models';

const passwordOnUserSignUp = process.env.REACT_APP_INITIAL_PASSWORD as string;

/**
 * Sends an email confirmation to a user by signing them up using AWS Amplify.
 *
 * This function registers a new user with the specified email address and a default password.
 * It also sets a custom attribute for the redirect URL, which is the current origin of the window.
 * If the sign-up is successful, it returns the `CognitoUser` object associated with the email.
 *
 * @param {string} userEmail - The email address of the user to be signed up and sent a confirmation email.
 *
 * @returns {Promise<CognitoUser | undefined>} A promise that resolves to the `CognitoUser` object if the sign-up is successful,
 * or `undefined` if an error occurs.
 *
 * @throws Will log and rethrow an error if the sign-up process fails.
 */
export async function sendEmailConfirmation (userEmail: string): Promise<CognitoUser | undefined> {
  try {
    const originURL = window.location.origin;
    const { user } = await Auth.signUp({
      username: userEmail,
      password: passwordOnUserSignUp,
      attributes: {
        email: userEmail,
        'custom:redirectUrl': originURL
      }
    }).then(user => {
      return user;
    }).catch(err => {
      throw err;
    });
    return user;
  } catch (error) {
    console.log('Error signing up:', error);
    throw error;
  }
};

/**
 * Resends the email verification for a user who has signed up but not yet verified their email address.
 *
 * This function attempts to resend the verification email to the specified user email address using AWS Amplify's Auth module.
 * If successful, it returns the `CognitoUser` object associated with the email. If the process fails, it logs an error message.
 *
 * @param {string} userEmail - The email address of the user to whom the verification email should be resent.
 *
 * @returns {Promise<CognitoUser | undefined>} A promise that resolves to the `CognitoUser` object if the email is successfully resent,
 * or `undefined` if an error occurs.
 *
 * @throws Will log an error if the process of resending the verification email fails.
 */
export async function reSendEmailVerification (userEmail: string): Promise<CognitoUser | undefined> {
  try {
    const { user } = await Auth.resendSignUp(userEmail);
    return user;
  } catch (error) {
    console.log('Error Resending Validation E-mail', error);
  }
}

/**
 * Changes the default password for a user by signing in and updating their password.
 *
 * This function signs in a user using their email and a default initial password, then changes
 * the password to a new one provided. After successfully changing the password, the user is signed out.
 *
 * @param {string} userEmail - The email address of the user whose password is to be changed.
 * @param {string} newPassword - The new password to set for the user.
 *
 * @returns {Promise<void>} A promise that resolves when the password has been successfully changed.
 *
 * @throws Will log an error if the sign-in or password change process fails.
 */
export async function changeDefaultPassword (userEmail: string, newPassword: string, type = 'newUser', tempPass?: string | null): Promise<void> {
  let tempPassword = passwordOnUserSignUp;
  if (type !== 'newUser' && tempPass !== undefined && tempPass !== null) {
    tempPassword = tempPass;
  }
  Auth.signIn(userEmail, tempPassword)
    .then(async (user) => {
      console.log(user);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        await Auth.completeNewPassword(user, newPassword).then((res) => { console.log(res); });
        return;
      }
      Auth.currentAuthenticatedUser(user)
        .then(async (user) => {
          await Auth.changePassword(user, tempPassword, newPassword);
        })
        .then((data) => { void Auth.signOut(); })
        .catch((err) => { console.log(err); });
    })
    .catch((e) => {
      console.log(e);
    });
}

/**
 * Creates an admin account by executing a series of GraphQL mutations.
 *
 * This function sets up a new admin account by creating business, contact, address, role, and email records
 * in the database. It uses the provided registration form data, user ID, and business ID to populate the necessary fields.
 *
 * @param {RegistrationStepsFrom} form - The registration form data containing user and company information.
 * @param {string} userId - The unique identifier for the user being registered.
 * @param {string} businessID - The unique identifier for the business associated with the user.
 *
 * @returns {Promise<void>} A promise that resolves when the admin account has been successfully created.
 *
 * @throws Will throw an error if any of the GraphQL mutations fail.
 */
export async function createAccount (form: RegistrationStepsFrom, userId: string, businessID: string): Promise<void> {
  const { idToken } = await Auth.currentSession() as any;
  await API.graphql<GraphQLQuery<CreateBusinessesMutation>>(
    {
      query: createAdminAccountMutation(form, userId, businessID), authToken: idToken.jwtToken
    }
  );
}

/**
 * Signs up a new user using AWS Amplify Auth and returns the user object.
 *
 * @param {string} userEmail - The email address of the user signing up.
 * @param {string} passwordOnUserSignUp - The password for the new user.
 * @param {string} originURL - The URL to redirect the user after signup.
 *
 * @returns {Promise<CognitoUser>} A promise that resolves to the signed-up user object.
 *
 * @throws {Error} Throws an error if the signup process fails.
 */
export async function createInviteAccount (form: RegistrationStepsFrom, type: string = 'ADMIN'): Promise<void> {
  const { idToken } = await Auth.currentSession() as any;
  const { username, attributes } = await Auth.currentAuthenticatedUser();
  const businessID = attributes['custom:BusinessId'];
  await API.graphql<GraphQLQuery<CreateContactsMutation>>(
    {
      query: createContactCustomMutation(form, businessID, username, type),
      authToken: idToken.jwtToken
    }
  );
}

/**
 * Handles the login request for a user by authenticating with AWS Amplify.
 *
 * This function attempts to sign in a user using their username and password. Upon successful
 * authentication, it retrieves the user's attributes and ID token, returning them in a structured format.
 *
 * @param {Object} credentials - The login credentials for the user.
 * @param {string} credentials.username - The username of the user attempting to log in.
 * @param {string} credentials.password - The password of the user attempting to log in.
 *
 * @returns {Promise<UserAttributesState>} A promise that resolves to the user's attributes and ID token.
 *
 * @throws Will throw an error if the sign-in process fails.
 */
export async function loginRequest (
  { username, password }:
  { username: string, password: string }
): Promise<UserAttributesState> {
  const response = await Auth.signIn(username, password);
  // Auth.signIn does not return id with it's response
  // Auth.currentUserInfo gets id with it's response
  const userAttributes: UserAttributesState = {
    id: '',
    username: response.username,
    attributes: response.attributes,
    idToken: response.signInUserSession.idToken.jwtToken
  };
  return userAttributes;
}

export async function forgotPasswordRequest (username: string): Promise<void> {
  const originURL = window.location.origin;
  await Auth.forgotPassword(username, { 'custom:redirectUrl': `${originURL}/changepassword` });
};

export async function changePasswordRequest (user: string, code: string, password: string): Promise<void> {
  await Auth.forgotPasswordSubmit(user, code, password);
};

/**
 * Signs out the current user from the application.
 *
 * This function clears the cache and signs out the user using AWS Amplify's Auth module.
 * It ensures that any cached data is removed and the user's session is terminated.
 *
 * @returns {Promise<void>} A promise that resolves when the user has been successfully signed out.
 *
 * @throws Will throw an error if the sign-out process fails.
 */
export async function signOut (): Promise<void> {
  Cache.clear();
  await Auth.signOut();
};
/**
 * Invites a new user to the system by executing a GraphQL mutation.
 *
 * This function sends an invitation to a new user by creating a user record in the database.
 * It uses the provided email, role, and redirect URL to set up the user's initial account details.
 *
 * @param {string} email - The email address of the user to be invited.
 * @param {string} role - The role assigned to the user within the system.
 * @param {string} redirectUrl - The URL to which the user will be redirected after accepting the invitation.
 *
 * @returns {Promise<void>} A promise that resolves when the invitation has been successfully sent.
 *
 * @throws Will throw an error if the GraphQL mutation fails.
 */
export async function inviteUser (email: string, role: string): Promise<void> {
  const { idToken } = await Auth.currentSession() as any;
  const { attributes } = await Auth.currentAuthenticatedUser();
  const redirectUrl = attributes['custom:redirectUrl'];
  await API.graphql<GraphQLQuery<CreateUserMutation>>(
    {
      query: createUser,
      variables: {
        input: {
          Email: email,
          Role: role,
          RedirectURL: redirectUrl
        }
      },
      authToken: idToken.jwtToken
    }
  );
}

/**
 * Removes a user from the system by executing a GraphQL mutation.
 *
 * This function deletes a user and their associated contact details such as emails,
 * addresses, and roles from the database using a GraphQL mutation. It requires the
 * user's contact information to identify which records to delete.
 *
 * @param {Contact} data - The contact information of the user to be removed. This includes
 * the user's ID and associated contact details such as emails, addresses, and roles.
 *
 * @returns {Promise<void>} A promise that resolves when the user has been successfully removed.
 *
 * @throws Will throw an error if the GraphQL mutation fails.
 */
export async function removeUser (data: Contact): Promise<void> {
  const { idToken } = await Auth.currentSession() as any;
  await API.graphql<GraphQLQuery<DeleteUserMutation>>(
    {
      query: deleteUser,
      variables: {
        input: {
          id: data.id,
          ContactEmails: data.ContactEmails?.items[0].id,
          ContactAddresses: data.ContactAddresses?.items[0]?.id,
          ContactRoles: data.ContactRoles?.items[0]?.id
        }
      },
      authToken: idToken.jwtToken
    }
  );
}
type ListUsersQueryReturn = ListContactRolesQuery & ListContactEmailsQuery & ListContactsQuery;
/**
 * Executes a GraphQL query to list users with specific filters applied.
 *
 * This function retrieves a list of contacts from the GraphQL API, filtering out
 * any contacts that have been marked as deleted. Additionally, it filters the contacts
 * to only include those that have associated roles.
 *
 * @returns {Promise<GraphQLQuery<ListContactsQuery> | undefined>} A promise that resolves to the result of the GraphQL query.
 * The result includes a list of contacts that are not deleted and have associated roles, or `undefined` if no contacts are found.
 *
 * @throws Will throw an error if the GraphQL query fails.
 */
export async function listUsersQuery (getAll = false): Promise<GraphQLQuery<ListUsersQueryReturn> | undefined> {
  const { idToken } = await Auth.currentSession() as any;
  return await API.graphql<GraphQLQuery<ListUsersQueryReturn>>(
    {
      query: listUsers,
      authToken: idToken.jwtToken
    }
  ).then((res) => {
    if (getAll) {
      return res.data;
    }
    if (res.data?.listContacts === undefined || res.data?.listContacts?.items === undefined) return res.data;
    const users = res.data?.listContacts?.items.filter((contact) => {
      if (contact?.ContactRoles?.items.length !== 0) return true;
      return false;
    });
    const roles = res.data.listContactRoles?.items.filter((role) => {
      const isRoleAlreadyAssociatedWithUser = users.find((user) => user?.ContactRoles?.items[0]?.id === role?.id);
      return (isRoleAlreadyAssociatedWithUser == null);
    });
    if (roles !== undefined) {
      const newContacts: Contact[] = roles?.map((role): Contact => {
        const newlyCreatedUserEmail = res.data?.listContactEmails?.items.find((email) => email?.contactsID === role?.contactsID);
        return {
          id: role?.contactsID ?? '',
          FirstName: '',
          LastName: '',
          ContactRoles: {
            items: [role]
          },
          ContactEmails: {
            items: [newlyCreatedUserEmail as unknown as ContactEmails]
          },
          businessesID: '',
          createdAt: '',
          updatedAt: '',
          _version: 0,
          _lastChangedAt: 0
        };
      });
      users.push(...newContacts as unknown as any);
    }

    res.data.listContacts.items = users;
    return res.data;
  });
};
