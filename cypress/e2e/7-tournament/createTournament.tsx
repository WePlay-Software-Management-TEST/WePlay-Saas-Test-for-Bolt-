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

When('Manager create tournament singleElimination', () => {
  cy.createTournament('Tournament Name', 'singleElimination');
});

When('Manager create tournament roundrobin', () => {
  cy.createTournament('Tournament Name', 'roundrobin');
});
Then('Manager save tournament', () => {
  cy.saveModalTournament();
});

Then('System should show the singleElimination tournament', () => {
  cy.wait('@graphQLRequests').then(() => {
    cy.contains('Tournament Name').should('be.visible');
    cy.contains('tourney description').should('be.visible');
    cy.contains('02:00').should('be.visible');
    cy.contains('FieldName').should('be.visible');
    cy.getBySel('SportsType').should('have.text', 'SoccerSoccer');
    cy.getBySel('totalTeams').should('have.text', '88');
    cy.getBySel('totalFields').should('have.text', '11');
    cy.getBySel('Semi-Final').should('not.be.disabled').click({ force: true });
    cy.window().then((win) => {
      const scrollHeight = win.document.documentElement.scrollHeight;
      const clientHeight = win.document.documentElement.clientHeight;
      const scrollTop = win.scrollY || win.pageYOffset;
      expect(scrollTop + clientHeight).to.be.closeTo(scrollHeight, 1);
    });
  });
});

Then('System should show the roundrobin tournament', () => {
  cy.wait('@graphQLRequests').then(() => {
    cy.contains('Tournament Name').should('be.visible');
    cy.contains('tourney description').should('be.visible');
    cy.contains('Playoffs').should('be.visible');
    cy.contains('Standings').should('be.visible');
    cy.contains('Group A').should('be.visible');
    cy.getBySel('SportsType').should('have.text', 'SoccerSoccer');
    cy.getBySel('totalTeams').should('have.text', '88');
    cy.getBySel('totalFields').should('have.text', '11');
  });
});
