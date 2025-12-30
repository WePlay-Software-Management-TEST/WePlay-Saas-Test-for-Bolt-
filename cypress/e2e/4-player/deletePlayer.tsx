import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { RegistrationFixture } from '../../fixtures/registration.fixture';
import { CreatePlayerFixture as fixture } from '../../fixtures/createPlayer.fixture';

before(() => {
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');
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
        cy.wait('@cognitoRequests');
      });
    });
});

beforeEach(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('GRAPHQL_BASE_URL') as string}`);
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('COGNITO_BASE_URL') as string}`);
});

Given('Facility has registered profiles', function () {
  cy.wait(5000);
  cy.clearAllLocalStorage();
  cy.visit('');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton').click();
  cy.wait(5000).then(() => {
    cy.getBySel(fixture.globalHeaderButton).click();
    cy.getBySel(fixture.createProfileGlobalHeader).first().click();
    cy.getBySel(fixture.firstNameinputSelector).type(fixture.firstName);
    cy.getBySel(fixture.lastNameInputSelector).type(fixture.lastName);
    cy.getBySel(fixture.birthDateSelector).type(fixture.birthdate);
    cy.getBySel(fixture.zipCodeInputSelector).type(
      fixture.zipcode);
    cy.getBySel('cityInput').type('New York City');
    cy.getBySel('stateInput').type('New York');
    cy.getBySel(fixture.playerEmailSelector).type(fixture.email);
    cy.getBySel(fixture.playerPrefSelector).click();
    cy.getBySel(fixture.genderInputSelector).click();
    cy.getBySel(fixture.genderInputSelector).wait(600).type('{downArrow}{enter}');

    cy.getBySel(fixture.openConfirmProfileDialogSelector).should('be.not.disabled').click();
    cy.getBySel(fixture.confirmModalParaSelector).contains(`${fixture.firstName} ${fixture.lastName}`);
    cy.get('#confirmPlayerCreation').within(() => {
      cy.getBySel('modalConfirmButton').click();
      cy.wait('@graphQLRequests');
      cy.wait(5000);
    });
  });
});
When('Facility Manager wants to remove a player', () => {
  cy.wait('@graphQLRequests').then(() => {
    cy.visit('');
    cy.getBySel('delete-cell-renderer').first().click({ force: true });
  });
});
Then('Confirms resuming the delete process', () => {
  cy.contains(`${fixture.firstName} ${fixture.lastName}`).should('be.visible');
  cy.get('#removePlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait('@graphQLRequests');
});
Then('System should stop showing that profile', () => {
  cy.wait(3000);
  cy.visit('');
  cy.wait(1000);
  cy.getBySel('profile-paragraph-renderer').should('not.exist');
});

Then('cancels the delete process', () => {
  cy.contains(`${fixture.firstName} ${fixture.lastName}`).should('be.visible');
  cy.get('#removePlayerCreation').within(() => {
    cy.getBySel('modalCloseButton').click();
  });
});
Then('System should still show that profile', () => {
  cy.getBySel('profile-paragraph-renderer').should('exist').contains(`${fixture.firstName} ${fixture.lastName}`);
});
