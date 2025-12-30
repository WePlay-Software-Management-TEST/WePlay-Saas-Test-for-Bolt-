import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

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

When('Manager update tournament', () => {
  cy.getBySel('editProfileButton').click();
  cy.wait(1000);
  cy.contains('Edit Tournament').should('be.visible');
  cy.getBySel('tourNameLegend').type(' two');
  cy.getBySel('tourDesc').type(' two');
  cy.getBySel('nextStepBtn1').should('not.be.disabled').click();
  cy.getBySel('nextStepBtn2').should('not.be.disabled').click();
  cy.getById('startTimeInput').type('01:00');
  cy.getBySel('saveTourneyBtn').should('be.disabled');
  cy.getById('daysOfMatches').type('{downArrow}{downArrow}{enter}');

  cy.getBySel('nextStepBtn3').should('not.be.disabled').click();
  cy.tournamentAssignFields('FieldName2');
  cy.getBySel('generateTourneyBtn').should('not.be.disabled').click();
});

Then('System should show correct results', () => {
  cy.wait('@graphQLRequests').then(() => {
    cy.contains('Tournament Name two').should('be.visible');
    cy.contains('tourney description two').should('be.visible');
    cy.contains('01:00').should('be.visible');
    cy.contains('FieldName2').should('be.visible');
    cy.getBySel('SportsType').should('have.text', 'SoccerSoccer');
    cy.getBySel('totalTeams').should('have.text', '88');
    cy.getBySel('totalFields').should('have.text', '22');
  });
});
