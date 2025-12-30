import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';

before(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as(
    'graphQLRequests'
  );
  cy.createUser().then((userInfo) => {
    cy.wrap(userInfo).as('userInfo');
  });
});

beforeEach(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as(
    'graphQLRequests'
  );
  cy.log(
    `Intercepting requests from endpoint ${
      Cypress.env('GRAPHQL_BASE_URL') as string
    }`
  );
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as(
    'cognitoRequests'
  );
  cy.log(
    `Intercepting requests from endpoint ${
      Cypress.env('COGNITO_BASE_URL') as string
    }`
  );
});

Given('Facility Already Logged in', function () {
  cy.login(this.testEmail);
});

Given('Facility have registered teams', function () {
  cy.intialTeams('team one');
  cy.intialTeams('team two');
});

When('Manager create tournament', () => {
  cy.createTournament('Tournament Name', 'singleElimination');
});

Then('Manager save tournament', () => {
  cy.saveModalTournament();
});

When('Manager wants to delete a tournament', function () {
  cy.getBySel('editProfileButton').click();
  cy.contains('Delete Tournament').should('be.visible');
  cy.getBySel('deleteTourneyBtn').should('not.be.disabled').click();
});
Then('Manager confirms deletion of tournament', () => {
  cy.get('#cancelPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
    cy.wait(500);
  });
  cy.wait(['@graphQLRequests']);
});

Then('Manager cancel deletion of tournament', () => {
  cy.get('#cancelPlayerCreation').within(() => {
    cy.getBySel('modalCloseButton').click();
    cy.wait(500);
  });
});

Then('System should not show that tournament', function () {
  cy.getBySel('createNewButton').should('be.visible');
});

Then('System should return to tournament form', function () {
  cy.getBySel('deleteTourneyBtn').should('be.visible');
});
