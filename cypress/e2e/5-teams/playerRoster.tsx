import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { RegistrationFixture } from '../../fixtures/registration.fixture';
import { CreatePlayerFixture as fixture } from '../../fixtures/createPlayer.fixture';

before(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');
  cy.wrap(['a', 'b', 'c', 'd', 'e']).as('randomChars');
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
Given('Facility has registered teams with players associated', function () {
  cy.clearAllLocalStorage();
  cy.visit('/login');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton')
    .click();
  cy.wait(3000);

  cy.visit('/player/create');
  cy.getBySel(fixture.firstNameinputSelector).type(fixture.firstName);
  cy.getBySel(fixture.lastNameInputSelector).type(fixture.lastName);
  cy.getBySel(fixture.birthDateSelector).type(fixture.birthdate);
  cy.getBySel(fixture.zipCodeInputSelector).type(
    fixture.zipcode.slice(0, 4),
    { delay: 700 }).type('{downArrow}{enter}', { delay: 700 });
  cy.getBySel(fixture.genderInputSelector).click();
  cy.getBySel(fixture.genderInputSelector).wait(600).type('{downArrow}{enter}');
  cy.wrap(`${new Date().getTime()}@${Cypress.env('MAILSOAUR_SERVER_ID') as string}.mailosaur.net`).as('playerEmail').then((email) => {
    cy.getBySel(fixture.playerEmailSelector).type(email);
  });
  cy.getBySel(fixture.openConfirmProfileDialogSelector).should('be.not.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel(fixture.confirmModalParaSelector).contains(`${fixture.firstName} ${fixture.lastName}`);
    cy.getBySel(fixture.confirmModalButtonSelector).click().then(() => {
      cy.getBySel(fixture.confirmModalButtonSelector).should('be.disabled');
      cy.getBySel(fixture.clostModalButtonSelector).should('be.disabled');
    });
    cy.wait(5000);
  });
  cy.visit('/');
  cy.getBySel('globalActionOption').eq(1).click({ force: true });

  cy.getBySel('teamsNameInput').type('SomeTeamName');
  cy.getBySel('cityInput').type('henderson nv{downArrow}{enter}', { delay: 500 });
  cy.get('.cypressAutoComplete').type('mic{downArrow}{enter}', { delay: 500 });
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait(2000);
});
Then('Manager attempts to view team details', function () {

});
Then('Roster associated with that team should show full players information', () => {
  cy.getBySel('delete-cell-renderer').then($elements => {
    cy.log(`${$elements.length}`);
    cy.wrap($elements.length).as('teamPlayersCount');
  });
  cy.contains('Nevada').should('be.visible');
  cy.getBySel('profile-paragraph-renderer').first().within(() => {
    cy.contains(`${fixture.firstName} ${fixture.lastName}`).should('be.visible');
  });
  cy.contains('1 Teams').should('be.visible');
});
When('Manager want to remove player from team roster', () => {
  cy.wait(1500);
  cy.getBySel('delete-cell-renderer').first().click({ force: true });
  cy.get('#deleteTeamModal').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait(1000);
});
Then('Should Show a success Message', function () {
  if (Cypress.currentRetry === 0) {
    cy.contains('No Players');
  } else {
    cy.getBySel('delete-cell-renderer').should('have.length.lessThan', this.rowsElements);
  }
  cy.getBySel('toastMsg').should('have.text', `${fixture.firstName} ${fixture.lastName} has been removed from the team`);
});
