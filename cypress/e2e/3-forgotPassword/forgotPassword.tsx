import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';
import { forgotPasswordFixture } from '../../fixtures/forgotpassword.fixture';
import forgotPasswordTranslation from '../../../src/i18n/english/forgotPassword.json';

before(function () {
  cy.wrap(Cypress.env('MAILSOAUR_SERVER_ID')).as('serverId');
});

beforeEach(() => {
  cy.visit(forgotPasswordFixture.url);
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('COGNITO_BASE_URL') as string}`);
});

Given('Business Has Valid Credentials', function () {
  cy.wrap(`${new Date().getTime()}@${this.serverId as string}.mailosaur.net`)
    .as('validEmail').then(() => {
      cy.createUnConfirmedUser(this.validEmail, true);
      cy.visit(forgotPasswordFixture.url);
      cy.get(`[data-cy="${forgotPasswordFixture.usernameInputSelector}"]`)
        .type(this.validEmail);
    });
});

Then('Business Owner attempts to reset password', function () {
  cy.get(`[data-cy="${forgotPasswordFixture.submitUsernameSelector}"]`)
    .click().should('be.disabled');
  cy.wrap(new Date()).as('emailSentTime');
  cy.wait(500);
});

When('Business can successfully login to WePlay', function () {
  cy.get(`[data-cy="${forgotPasswordFixture.confirmationParagraphSelector}"]`)
    .contains(forgotPasswordTranslation.emailHaveBeenSent);
  cy.wait(['@cognitoRequests']);

  cy.wait(3000);

  cy.mailosaurGetMessage(this.serverId, {
    sentTo: this.validEmail
  }, { receivedAfter: this.emailSentTime }).then((email) => {
    expect(email.subject).to.equal('WePlay: Reset Password');
    const confirmEmail = email.html?.links;
    if (confirmEmail !== undefined) {
      cy.visit(
        confirmEmail[1].href as '',
        { timeout: 120000, headers: { 'Accept-Encoding': 'gzip, deflate' } });
    }
  });
  cy.get(`[data-cy="${forgotPasswordFixture.changePasswordInputSelector}"]`)
    .type(forgotPasswordFixture.validPassword);
  cy.get(`[data-cy="${forgotPasswordFixture.confirmChangePasswordSelector}"]`)
    .type(forgotPasswordFixture.validPassword);
  cy.get(`[data-cy="${forgotPasswordFixture.changePasswordSubmitSelector}"]`)
    .click();
  cy.wait(2000);
  cy.contains(forgotPasswordTranslation.changePassword.changingPasswordDoneHeaderText);
});

Given('Business has invalid Credentials', () => {
  cy.get(`[data-cy="${forgotPasswordFixture.usernameInputSelector}"]`)
    .type(forgotPasswordFixture.invalidUsername);
});

Then('Business cant reset password', () => {
  cy.get(`[data-cy="${forgotPasswordFixture.errParagraphSelector}"]`)
    .should('be.visible');
});

When('Business remember old password', function () {
  cy.get(`[data-cy="${forgotPasswordFixture.confirmationParagraphSelector}"]`)
    .contains(forgotPasswordTranslation.emailHaveBeenSent);
  cy.wait(['@cognitoRequests']);

  cy.wait(3000);
  cy.mailosaurGetMessage(this.serverId, {
    sentTo: this.validEmail
  }, { receivedAfter: this.emailSentTime }).then((email) => {
    expect(email.subject).to.equal('WePlay: Reset Password');
    const confirmEmail = email.html?.links;
    if (confirmEmail !== undefined) {
      cy.visit(
        confirmEmail[1].href as '',
        { timeout: 120000, headers: { 'Accept-Encoding': 'gzip, deflate' } });
    }
  });
  cy.get(`[data-cy="${forgotPasswordFixture.rememberedPasswordSelector}"]`).click();
});
Then('Business can access weplay using old password', () => {
  cy.url().should('include', '/login');
});

Then('Meaningful error message should appear', () => {
  cy.get(`[data-cy="${forgotPasswordFixture.errParagraphSelector}"]`).should('be.visible');
});
