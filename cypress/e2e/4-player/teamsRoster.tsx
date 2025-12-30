import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { RegistrationFixture } from '../../fixtures/registration.fixture';
import { CreatePlayerFixture as fixture } from '../../fixtures/createPlayer.fixture';

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
Given('Facility has registered player with several teams', function () {
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
Then('Manager navigates to player page', function () {

});
Then('He can see all the teams the player is a member of', () => {
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
When('Manager attempts to remove a team from the list of teams', () => {
  cy.wait(1500);
  cy.getBySel('delete-cell-renderer').first().click({ force: true });
  cy.get('#deleteTeamModal').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait(1000);
});
Then('sees a success message', function () {
  if (Cypress.currentRetry === 0) {
    cy.contains('No Players');
  } else {
    cy.getBySel('delete-cell-renderer').should('have.length.lessThan', this.rowsElements);
  }
  cy.getBySel('toastMsg').should('have.text', `${fixture.firstName} ${fixture.lastName} has been removed from the team`);
});

Given('Facility has registered player with no teams', function () {
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
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait(2000);
  cy.visit('/');
  cy.getBySel('globalActionOption').eq(1).click({ force: true });

  cy.getBySel('teamsNameInput').type('TeamOneTwo');
  cy.getBySel('cityInput').type('henderson nv{downArrow}{enter}', { delay: 500 });
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait(5000);
});

When('Manager visits player view', function () {
  cy.visit('/');
  cy.wait(5000);
  cy.getBySel('profile-paragraph-renderer').first().click({ force: true });
  cy.wait(1500);
});

Then(/^Manger want to add player to a team as ([^"]*)$/, function (role: string) {
  let teamName = '';
  cy.wrap(role).as('role');
  if (role === 'Captain') {
    cy.wrap('captainSet').as('captainSet');
    cy.getBySel('dropDownAddToTeam').first().click();
    cy.getBySel('collapseContainer').first().within(() => {
      cy.getBySel('headerOptionP').invoke('text').then((text) => {
        cy.wrap(text).as('teamName');
        teamName = text;
      });
      cy.getBySel('addCaptainButton').click({ force: true });
      cy.wait(['@graphQLRequests']);
      cy.getBySel('inTeamLabel').should('be.visible');
      cy.getBySel('inTeamLabel').should('have.class', 'text-xs text-black bg-grey-98 border-white w-12 h-7 flex justify-center items-center rounded-md');
      cy.getBySel('inTeamLabel').contains('Joined');
    });
    cy.getBySel('toastMsg').last().contains(`michael keaton Has been added as a captain for ${teamName}`);
  } else {
    cy.getBySel('collapseContainer').last().within(() => {
      cy.getBySel('headerOptionP').invoke('text').then((text) => {
        cy.wrap(text).as('teamName');
        teamName = text;
      });
      cy.getBySel('addPlayerButton').click({ force: true });
      cy.wait(['@graphQLRequests']);
    });
    cy.getBySel('toastMsg').last().contains(`michael keaton Has been added as a player for ${teamName}`);
  };
});

Then('Manager should see list of teams associated with player', function () {
  cy.get('.ag-row').should('have.length.above', 1);
});
Then('System should show correct player role for each team in player view', function () {
  cy.contains(this.teamName);
  cy.contains(this.role);
});
