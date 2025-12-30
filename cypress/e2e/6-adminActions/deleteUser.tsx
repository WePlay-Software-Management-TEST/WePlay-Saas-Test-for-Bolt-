import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';
import SettingsTranslation from '../../../src/i18n/english/settings.json';
import { RegistrationFixture } from '../../fixtures/registration.fixture';

before(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');
  cy.createUser().then((userInfo) => {
    cy.wrap(userInfo).as('userInfo');
  });
});

beforeEach(() => {
  cy.wrap(`${new Date().getTime()}@${Cypress.env('MAILSOAUR_SERVER_ID') as string}.mailosaur.net`).as('inviteEmail');
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');

  cy.log(`Intercepting requests from endpoint ${Cypress.env('GRAPHQL_BASE_URL') as string}`);
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');

  cy.log(`Intercepting requests from endpoint ${Cypress.env('COGNITO_BASE_URL') as string}`);
});

Given('Business have multiple users associated with it.', function () {
  cy.login(this.userInfo.username);
  cy.wait(['@cognitoRequests', '@cognitoRequests']);
  cy.visit('/settings');
  cy.contains(this.userInfo.username);
  cy.getBySel('inviteMemebersButton').should('not.be.disabled');
  cy.getBySel('inviteMemebersButton').click({ force: true });
  cy.getBySel('inviteMembersEmailsInputCy').type(`${this.inviteEmail as string}{enter}`, { delay: 100 });

  cy.getBySel('sendInviteButton').should('not.be.disabled');
  cy.getBySel('sendInviteButton').click({ force: true });
  cy.wait(3000);

  cy.getLinkFromEmail(this.inviteEmail).then((link: string) => {
    cy.wrap(link).as('inviteLink');
    cy.clearLocalStorage();

    cy.visit(link);

    cy.getBySel(RegistrationFixture.passwordSelector).type(RegistrationFixture.testUserPassword);
    cy.getBySel(RegistrationFixture.confirmPasswordSelector).type(RegistrationFixture.testUserPassword);
    cy.getBySel(RegistrationFixture.confirmPasswordButton).click();
    cy.wait(2000);
    cy.getBySel(RegistrationFixture.firstNameInputSelector).type(RegistrationFixture.firstName);
    cy.getBySel(RegistrationFixture.lastNameInputSelector).type(RegistrationFixture.lastName);
    cy.getBySel(RegistrationFixture.confirmUserInfoButtonSelector).click();

    cy.wait(8000);
  });
});

When('Manager attempts to remove user from business', function () {
  cy.login(this.userInfo.username);
  cy.wait(5000);
  cy.visit('/settings');
  cy.wait(['@graphQLRequests']);
  cy.contains(this.userInfo.username);
  cy.wait(2000);

  cy.getBySel('delete-cell-renderer').click({ force: true });

  cy.get('#removePlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
    cy.wait(1000);
  });
});
Then('Success message should show.', function () {
  cy.getBySel('toastMsg').should('contain', SettingsTranslation.organization.deleteModal.deleteConfirmation);
});
Then('User can not access his account.', function () {
  cy.wait(1000);
  cy.clearAllLocalStorage();
  cy.visit('/login');
  cy.getBySel('loginUserNameInput').type(this.inviteEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton')
    .click();
  cy.wait(['@cognitoRequests', '@cognitoRequests', '@cognitoRequests']);
  cy.contains('User does not exist.');
});

Given('Admin is already in a business.', function () {
  cy.login(this.userInfo.username);
});
When('Manager attempts to remove himself', function () {
  cy.wait(5000);
  cy.visit('/settings');
});
Then('System should not allow him', function () {
  cy.get('.ag-row').first().within(() => {
    cy.getBySel('delete-cell-renderer').should('not.exist');
  });
});
