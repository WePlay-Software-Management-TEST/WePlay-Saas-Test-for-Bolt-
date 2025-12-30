import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { RegistrationFixture } from '../../fixtures/registration.fixture';

before(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');
  cy.wrap(`${new Date().getTime()}@${Cypress.env('MAILSOAUR_SERVER_ID') as string}.mailosaur.net`)
    .as('testEmail')
    .then((email) => {
      cy.visit('/signup');
      cy.log(`Creating new admin account with email ${email}`);
      cy.getBySel(RegistrationFixture.emailSelector).type(email);
      cy.getBySel(RegistrationFixture.confirmEmailButtonSelector).click();

      cy.getLinkFromEmail(email).then((link: string) => {
        cy.visit(link);

        cy.getBySel(RegistrationFixture.passwordSelector).type(RegistrationFixture.testUserPassword);
        cy.getBySel(RegistrationFixture.confirmPasswordSelector).type(RegistrationFixture.testUserPassword);
        cy.getBySel(RegistrationFixture.confirmPasswordButton).click();

        cy.getBySel(RegistrationFixture.firstNameInputSelector).type(RegistrationFixture.firstName);
        cy.getBySel(RegistrationFixture.lastNameInputSelector).type(RegistrationFixture.lastName);

        cy.getBySel(RegistrationFixture.confirmUserInfoButtonSelector).click();
        cy.getBySel(RegistrationFixture.businessNameSelector).type(RegistrationFixture.businessName);
        cy.getBySel(RegistrationFixture.businessSizeSelector).type('{downArrow}{enter}');

        cy.getBySel(RegistrationFixture.businessMailingAddressSelector).type(
          RegistrationFixture.businessMailingAddress.slice(0, 12),
          { delay: 500 }).type('{downArrow}{enter}', { delay: 500 });
        cy.getBySel(RegistrationFixture.createAccountButtonSelector).click();
        cy.wait(['@graphQLRequests']);
      });
    });
});

beforeEach(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('GRAPHQL_BASE_URL') as string}`);
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('COGNITO_BASE_URL') as string}`);
});
Given('Facility has valid credentials', function () {
  cy.clearAllLocalStorage();
  cy.visit('/login');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton')
    .click();
  cy.wait(3000);
});
Then('Facility have registered teams', () => {
  cy.getBySel('globalActionOption').eq(1).click({ force: true });

  cy.getBySel('teamsNameInput').type('SomeTeamName');
  cy.getBySel('cityInput').type('henderson nv{downArrow}{enter}', { delay: 500 });
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
});
When('manager wants to delete a team', function () {
  cy.wait(2000);
  cy.visit('/teams');
  cy.getBySel('delete-cell-renderer').then($elements => {
    cy.log(`${$elements.length}`);
    cy.wrap($elements.length).as('rowsElements');
  });
  cy.getBySel('delete-cell-renderer').first().click({ force: true });
});
Then('manager confirms deletion of team', () => {
  cy.get('#deleteTeamModal').within(() => {
    cy.contains('SomeTeamName').should('be.visible');
    cy.getBySel('modalConfirmButton').click();
    cy.wait(['@graphQLRequests']);
  });
});
Then('System should show a success Message', () => {
  cy.contains('SomeTeamName').should('be.visible');
});
Then('System should not show that team', function () {
  cy.visit('/teams');
  cy.log(this.rowsElements);
  cy.getBySel('delete-cell-renderer').should('have.length.lessThan', this.rowsElements);
});

Then('manager cancels deletion of team', () => {
  cy.get('#deleteTeamModal').within(() => {
    cy.contains('SomeTeamName').should('be.visible');
    cy.getBySel('modalCloseButton').click();
    cy.wait(1000);
  });
});
Then('System should show that team', function () {
  cy.visit('/teams');
  cy.log(this.rowsElements);
  cy.getBySel('delete-cell-renderer').should('have.length', this.rowsElements);
});
