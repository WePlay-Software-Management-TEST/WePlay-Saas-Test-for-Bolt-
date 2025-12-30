import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { RegistrationFixture } from '../../fixtures/registration.fixture';
import { CreatePlayerFixture as fixture } from '../../fixtures/createPlayer.fixture';
import { getAgeFromDate } from 'core/utils/utils';

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
  cy.wait(2000);
});
When('manager wants to edit a team', function () {
  cy.visit('/teams');
  cy.getBySel('edit-cell-renderer').first().click({ force: true });
  cy.getBySel('openConfirmTeamDialog').should('be.disabled');
  cy.getBySel('teamsNameInput').type(`A New Edit${this.randomChars[Cypress.currentRetry] as string}`);
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled');
  cy.getBySel('teamsDecs').type(`A newly Edit Description!!!${this.randomChars[Cypress.currentRetry] as string}`);
  cy.getBySel('cityInput').clear().type('houston t{downArrow}{enter}', { delay: 500 });
  cy.location('pathname').then((path) => {
    const paths = path.split('/');
    cy.wrap(paths[paths.length - 1]).as('teamID');
  });
});
Then('manager confirms new changes of team', () => {
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait(2000);
});
Then('System should show a success Message', () => {
  cy.getBySel('toastMsg').should('have.text', 'Changes have been saved');
});
Then('System should correct results', function () {
  cy.contains(`A New Edit${this.randomChars[Cypress.currentRetry] as string}`).should('be.visible');
  cy.contains(`A newly Edit Description!!!${this.randomChars[Cypress.currentRetry] as string}`).should('be.visible');
});

Then('manager cancels new changes of team', () => {
  cy.getBySel('cancelTeamCreationModal').click();
  cy.get('#cancelPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait(500);
});
Then('System should show a failure Message', () => {
  cy.getBySel('toastMsg').should('have.text', 'Changes has been cancelled');
});

Then('manager cancels new changes of team mid request', function () {
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait(50);
  cy.visit(`/teams/${this.teamID as string}`);
});
Then('System should show act as though edits have been cancelled', () => {
  cy.wait(1000);
  cy.contains('SomeTeamName').should('be.visible');
});

When('Manager wants to add player from dropdown', () => {
  cy.visit('/');
  cy.getBySel('globalActionOption').eq(0).click({ force: true });
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
  });
  cy.wait(2000);
});
Then('System should add Player to team Roster', () => {
  cy.visit('/teams');
  cy.getBySel('profile-paragraph-renderer').first().click({ force: true });
  cy.wait(1000);
  cy.contains('No Players').should('exist');
  cy.getBySel('dropwdownText').first().click();
  cy.get('.testCyOption').first().click();
  cy.get('.testCyOption').first().within(() => {
    cy.getBySel('addPlayerButton').first().click({ force: true });
  });
  cy.wait(['@graphQLRequests', '@graphQLRequests']);
});
Then('View new changes instantly', () => {
  cy.wait(500);
  cy.contains('michael keaton');
  cy.contains('Nebraska');
  cy.contains(getAgeFromDate(fixture.birthdate));
  cy.contains('1 Teams');
  cy.contains('No Players').should('not.exist');
});
