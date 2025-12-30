import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';

before(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as(
    'graphQLRequests'
  );
  cy.createUser().then((userInfo) => {
    cy.wrap(userInfo).as('userInfo');
  });
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

When('Manager attempts to view tournaments', () => {
  cy.visit('/tournament');
  cy.wait(1000);
});

Then('Display all tournaments', () => {
  cy.contains('Tournament Name').should('be.visible');
});

Then('Display empty tournaments page', () => {
  cy.contains('Let’s create a new Tourney! 👋').should('be.visible');
});
