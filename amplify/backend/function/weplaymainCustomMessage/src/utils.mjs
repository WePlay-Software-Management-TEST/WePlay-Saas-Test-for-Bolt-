import { getConfirmationEmail } from './confirmEmailTemplate.mjs';
import { getForgotPasswordTemplate } from './forgotPasswordTemplate.mjs';
import { getInviteEmail } from './inviteEmailTempalate.mjs';

/**
 * Constructs an HTML link for user actions such as sign-up or password reset.
 *
 * @param {string} url - The base URL for the link.
 * @param {string} codeParameter - The code parameter to be included in the link.
 * @param {string} userName - The username of the user.
 * @param {string} clientId - The client ID.
 * @param {string} region - The AWS region.
 * @param {string} email - The email of the user.
 * @param {string} redirectURL - The redirect URL for the user.
 * @param {string} text - The text to display for the link.
 * @param {string} event - The event type triggering the message.
 * @returns {string} The constructed HTML link.
 *
 * @description
 * This function generates an HTML anchor tag with appropriate query parameters
 * based on the event type. It is used for creating links in custom email messages
 * for user actions such as account confirmation and password reset.
 */
export function setUpLink (url, codeParameter, userName, clientId, region, email, redirectURL, text, event, role) {
  if (event === 'CustomMessage_AdminCreateUser') {
    return `<a href="${redirectURL}/signup?temp=${codeParameter}&email=${email}&role=${role}" target="_blank">${text}</a>`;
  }
  return `<a href="${url}?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}&redirectURL=${redirectURL}" target="_blank">${text}</a>`;
};

/**
 * Determines the subject line for an email based on the event type.
 *
 * @param {string} event - The event type triggering the message.
 * @param {string} [facility=''] - The name of the facility, if applicable.
 * @returns {string} The subject line for the email.
 *
 * @description
 * This function returns a subject line for an email based on the event type.
 * It customizes the subject for different user actions such as password reset
 * and user invitations.
 */
export function getEmailSubject (event, facility = '') {
  switch (event) {
    case 'CustomMessage_ForgotPassword':
      return 'WePlay: Reset Password';
    case 'CustomMessage_AdminCreateUser':
      return `WePlay: Invitation to be part of ${facility}`;
    default:
      return 'WePlay: Verification Link';
  }
};
/**
 * Generates the email message content based on the event type.
 *
 * @param {string} event - The event type triggering the message.
 * @param {string} link - The HTML link to be included in the email.
 * @param {string} facilityName - The name of the facility, if applicable.
 * @returns {string} The email message content.
 *
 * @description
 * This function constructs the body of an email message based on the event type.
 * It uses different templates for actions such as password reset, user invitation,
 * and account confirmation.
 */
export function getEmailMessage (event, link, facilityName) {
  switch (event) {
    case 'CustomMessage_ForgotPassword':
      return getForgotPasswordTemplate(link);
    case 'CustomMessage_AdminCreateUser':
      return getInviteEmail(link, facilityName);
    default:
      return getConfirmationEmail(link);
  }
};
