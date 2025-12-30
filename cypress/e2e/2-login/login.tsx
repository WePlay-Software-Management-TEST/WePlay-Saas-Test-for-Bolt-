import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';
import { loginFixtures } from '../../fixtures/login.fixture';

before(function () {
  cy.wrap(Cypress.env('MAILSOAUR_SERVER_ID')).as('serverId');
});

beforeEach(() => {
  cy.visit(loginFixtures.loginPageRoute);
  const testEmail = `${new Date().getTime()}@${Cypress.env('MAILSOAUR_SERVER_ID') as string}.mailosaur.net`;
  cy.wrap(testEmail).as('testEmail');
});

Given('Business Has Valid Credentials', function () {
  cy.contains('Login').should('be.visible');
  cy.createUnConfirmedUser(this.testEmail, true);
  cy.visit(loginFixtures.loginPageRoute);
  cy.get(`[data-cy="${loginFixtures.usernameSelector}"]`).type(this.testEmail);
  cy.get(`[data-cy="${loginFixtures.passwordSelector}"]`).type(loginFixtures.validPassword);
});

When('Business Owner attempts to access WePlay', () => {
  cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
    .should('be.visible');
});

Then('Business can successfully login to WePlay', () => {
  cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
    .click();
  cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
    .should('be.disabled');
  cy.wait(500);
  cy.get('svg').should('be.visible');
});

Given('Business has invalid credentials', () => {
  cy.contains('Login').should('be.visible');
  cy.get(`[data-cy="${loginFixtures.usernameSelector}"]`)
    .type(loginFixtures.invalidUsername.slice(0, 6)).blur();
  cy.get(`[data-cy="${loginFixtures.passwordSelector}"]`).type(loginFixtures.invalidPassword).blur();
});

Then("Business can't access WePlay", () => {
  cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
    .should('be.disabled');
  cy.get(`[data-cy="${loginFixtures.inputErrorSelector}"]`)
    .should('be.visible');
  cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
    .should('be.visible')
    .should('be.disabled');
  cy.get(`[data-cy="${loginFixtures.usernameSelector}"]`)
    .type(loginFixtures.invalidUsername).blur();
  cy.get(`[data-cy="${loginFixtures.passwordSelector}"]`).type(loginFixtures.validPassword).blur();

  cy.disableDefaultSubmitForm();

  cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
    .should('be.not.disabled').click();
  cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
    .should('be.disabled');
});

Given('Business have unconfirmed Credentials', function () {
  cy.createUnConfirmedUser(this.testEmail).then(() => {
    cy.visit(loginFixtures.loginPageRoute);
    cy.get(`[data-cy="${loginFixtures.usernameSelector}"]`).type(this.testEmail);
    cy.get(`[data-cy="${loginFixtures.passwordSelector}"]`).type(loginFixtures.validPassword);

    cy.disableDefaultSubmitForm();
    cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
      .should('be.not.disabled').click();
  });
});
Then('"Please confirm email" screen should appear', function () {
  cy.wait(2000);
  cy.contains('Almost There!').should('be.visible');
  cy.contains(this.testEmail).should('be.visible');
});

When('Business Owner attempts to access WePlay multiple times', function () {
  cy.createUnConfirmedUser(this.testEmail, true).then(() => {
    cy.visit(loginFixtures.loginPageRoute);
    cy.get(`[data-cy="${loginFixtures.usernameSelector}"]`).type(this.testEmail);
    cy.get(`[data-cy="${loginFixtures.passwordSelector}"]`).type(loginFixtures.validPatternPassword);
    cy.disableDefaultSubmitForm();

    cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
      .should('be.not.disabled').click();
    for (let i = 0; i < 10; i++) {
      cy.get('[data-cy="loginButtonValidationErr"]').then(($span) => {
        if ($span.text().includes('Password attempts exceeded')) {
          cy.get(`[data-cy="${loginFixtures.usernameSelector}"]`).should('be.disabled');
          cy.get(`[data-cy="${loginFixtures.passwordSelector}"]`).should('be.disabled');
          cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`).should('be.disabled');
        } else {
          cy.get(`[data-cy="${loginFixtures.usernameSelector}"]`).clear();
          cy.get(`[data-cy="${loginFixtures.passwordSelector}"]`).clear();
          cy.get(`[data-cy="${loginFixtures.usernameSelector}"]`).type(this.testEmail);
          cy.get(`[data-cy="${loginFixtures.passwordSelector}"]`).type(loginFixtures.validPatternPassword);
          cy.disableDefaultSubmitForm();

          cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
            .should('be.not.disabled').click();
          cy.wait(500);
        }
      });
    };
  });
});

Then('System locks out this user', () => {
  cy.get(`[data-cy="${loginFixtures.loginButtonSelector}"]`)
    .should('be.disabled');
});

Then('sees a meaningful error message', () => {
  cy.get(`[data-cy="${loginFixtures.errorTextOnSubmit}"]`).should('be.visible');
});
