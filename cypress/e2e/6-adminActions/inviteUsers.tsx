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
  cy.wrap(Array.from([1, 2, 3], (x) => `${new Date().getTime()}${x}@${Cypress.env('MAILSOAUR_SERVER_ID') as string}.mailosaur.net`)).as('multipleUsers');

  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');

  cy.log(`Intercepting requests from endpoint ${Cypress.env('GRAPHQL_BASE_URL') as string}`);
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');

  cy.log(`Intercepting requests from endpoint ${Cypress.env('COGNITO_BASE_URL') as string}`);
});

Given('Manager have a business in WePlay', function () {
  cy.login(this.userInfo.username);
  cy.visit('/settings');
  cy.wait(['@graphQLRequests']);
  cy.contains(this.userInfo.username);
});
When(/^Manager attempts to invite users as ([^"]*)$/, function (role: string) {
  cy.getBySel('sendInviteButton').should('be.disabled');
  cy.getBySel('inviteMemebersButton').should('not.be.disabled');
  cy.getBySel('inviteMemebersButton').click({ force: true });
  const inviteEmail = `${Date.now()}@${Cypress.env('MAILSOAUR_SERVER_ID') as string}.mailosaur.net`;

  cy.wrap(inviteEmail).as('inviteEmail');

  cy.getBySel('inviteMembersEmailsInputCy').type(`${inviteEmail}{enter}`, { delay: 100 });
  cy.getBySel('inviteMembersSelectRoleCy').type(`${role}{downArrow}{enter}`, { delay: 200 });
});

Then('Manager submits invite', function () {
  cy.getBySel('sendInviteButton').should('not.be.disabled').click({ force: true });
});
Then(/^Manager should get success message for ([^"]*)$/, function (role: string) {
  const expectedMsg = role === 'Admin' ? SettingsTranslation.organization.toast.adminMsg : SettingsTranslation.organization.toast.refereeMsg;
  cy.wait('@graphQLRequests').then(() => {
    cy.getBySel('toastMsg').should('contain', expectedMsg);
    cy.getBySel('toastMsg').should('be.visible');
  });
});
Then('User invite should receive email', function () {
  cy.getLinkFromEmail(this.inviteEmail).then((link: string) => {
    cy.wrap(link).as('inviteLink');
  });
});
When('User clicks on invite link', function () {
  cy.clearLocalStorage();
});
Then('User should be re-directed to WePlay.', function () {
  cy.visit(this.inviteLink);
});
Then(/^User create his own user under the invitee business as ([^"]*)$/, function (role: string) {
  cy.getBySel(RegistrationFixture.passwordSelector).type(RegistrationFixture.testUserPassword);
  cy.getBySel(RegistrationFixture.confirmPasswordSelector).type(RegistrationFixture.testUserPassword);
  cy.getBySel(RegistrationFixture.confirmPasswordButton).click();
  cy.wait(2000);
  cy.getBySel(RegistrationFixture.firstNameInputSelector).type(RegistrationFixture.firstName);
  cy.getBySel(RegistrationFixture.lastNameInputSelector).type(RegistrationFixture.lastName);
  cy.getBySel(RegistrationFixture.confirmUserInfoButtonSelector).click();
  cy.get('body').then($body => {
    if ($body.find('[data-cy=refereeBio]').length > 0) {
      cy.getBySel('refereeBio').type('SomeBio');
      cy.getBySel('refereeYearsOfExp').type('{downArrow}{enter}', { delay: 200 });
      cy.getBySel('refereeLocation').type('12 H{downArrow}{enter}', { delay: 500 });
      cy.getBySel('createAccountButtonRegistration').click();
    }
  });

  cy.wait(8000);
});
Then('User should be able to access WePlay', function () {
  cy.contains(this.inviteEmail);
});

Then('Manager should be able to see this new user under his business', function () {
  cy.login(this.userInfo.username);
  cy.wait(3000);
  cy.visit('/settings');
  cy.wait(['@graphQLRequests']);
  cy.contains(this.userInfo.username);
  cy.contains(this.inviteEmail);
});

Then('Users invite should receive email', function () {
  cy.wrap(this.multipleUsers).each((user: string) => {
    cy.getLinkFromEmail(user);
  });
});

When('Manager attempts to invite invalid emails', function () {
  cy.getBySel('sendInviteButton').should('be.disabled');
  cy.getBySel('inviteMemebersButton').should('not.be.disabled');
  cy.getBySel('inviteMemebersButton').click({ force: true });
  cy.getBySel('inviteMembersEmailsInputCy').type('asdf.cadfdfsdf@123{enter}', { delay: 100, force: true });
});

Then('System should show correct error message.', function () {
  cy.getBySel('sendInviteButton').should('be.disabled');
});

Then('User is already have invitation sent', function () {

});

When('Manager attempts to invite user', function () {
  cy.getBySel('sendInviteButton').should('be.disabled');
  cy.getBySel('inviteMemebersButton').should('not.be.disabled').click();
  cy.getBySel('inviteMembersEmailsInputCy').type(`${this.inviteEmail as string}{enter}`, { delay: 100, force: true });
  cy.getBySel('sendInviteButton').click({ force: true });
});

Then('System should show correct invite error message', function () {

});
