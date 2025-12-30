import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';
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
          { delay: 500 }).type('{downArrow}', { delay: 500 }).type('{enter}');
        cy.getBySel(RegistrationFixture.createAccountButtonSelector).click();
        cy.wait('@graphQLRequests').then(() => {
          cy.clearAllLocalStorage();
        });
      });
    });
});

beforeEach(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');

  cy.log(`Intercepting requests from endpoint ${Cypress.env('GRAPHQL_BASE_URL') as string}`);
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');

  cy.log(`Intercepting requests from endpoint ${Cypress.env('COGNITO_BASE_URL') as string}`);
});

Given('Facility has no registered players', () => {
  cy.visit('/');
  cy.contains('Add New Player').should('be.visible');
});

When('manager creates a minimal team', () => {
  cy.getBySel('globalActionOption').eq(1).click({ force: true });
  cy.contains('New Team Profile').should('be.visible');
  cy.contains('Team Information').should('be.visible');

  cy.getBySel('teamsNameInput').type('SomeTeamName');
  cy.getBySel('cityInput').type('henderson nv{downArrow}{enter}', { delay: 500 });
});

Then('Manager Saves team', () => {
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.contains('SomeTeamName').should('be.visible');
    cy.contains('Create Team').should('be.visible');
    cy.contains('Create Team?').should('be.visible');
    cy.contains('Make Edits').should('be.visible');
    cy.getBySel('modalConfirmButton').click();
    cy.getBySel('modalConfirmButton').should('be.disabled');
    cy.getBySel('modalCloseButton').should('be.disabled');
    cy.wait(500);
  });
});

Then('System should show a success Message', () => {
  cy.wait('@graphQLRequests').then(() => {
    cy.contains('SomeTeamName has been created').should('be.visible');
  });
});

Then('System should show correct results', () => {
  cy.getBySel('state').first().should('have.text', 'Nevada');
  cy.getBySel('city').first().should('have.text', 'Henderson');
  cy.getBySel('county').first().should('have.text', 'Clark County');
  cy.getBySel('totalPlayers').first().should('have.length', '1');
});

Given('Facility Already Logged in', function () {
  cy.visit('/');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton').click();
  cy.wait(2000);
});

Then('tries to cancel the team creation', () => {
  cy.getBySel('cancelTeamCreationModal').click();
  cy.get('#cancelPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
});

When('Manager Create Team', () => {
  cy.visit('/');
  cy.getBySel('globalActionOption').eq(1).click({ force: true });
  cy.contains('New Team Profile').should('be.visible');
  cy.contains('Team Information').should('be.visible');

  cy.getBySel('teamsNameInput').type('SomeTeamName');
  cy.getBySel('cityInput').type('henderson nv{downArrow}{enter}', { delay: 500 });
  cy.getBySel('teamsDecs').type('Some long Description, that no one will see it');
  cy.get('.cypressAutoComplete').within(() => {
    cy.get('input').type('michael{enter}', { delay: 200 });
  });
});

Then('Team creation should be cancelled successfully', () => {
  cy.url().should('include', '/teams/');
});

Then('Manager Create Player', function () {
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
    cy.wrap(new Date().getTime()).as('recivedAfter');
  });
});

Then('Players Added to the Team should get notified', function () {
  cy.log(JSON.stringify(new Date(this.recivedAfter)));
  cy.mailosaurGetMessage(Cypress.env('MAILSOAUR_SERVER_ID') as string, {
    sentTo: this.playerEmail,
    subject: 'You have been Added to SomeTeamName'
  }, {
    receivedAfter: new Date(this.recivedAfter),
    timeout: 30000
  }).then((email) => {
    expect(email.subject).to.equal('You have been Added to SomeTeamName');
    expect(email.html?.body).to.contain(RegistrationFixture.businessName);
    expect(email.html?.body).to.contain(`${fixture.firstName} ${fixture.lastName}`);
  });
});
