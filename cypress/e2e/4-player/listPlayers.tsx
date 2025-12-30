import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';
import { RegistrationFixture } from '../../fixtures/registration.fixture';
import playerTranslation from 'i18n/english/player.json';
import ListPlayer from '../../fixtures/listPlayers.json';
import { AllCapStrToReadableStr, getAgeFromDate } from 'core/utils/utils';

before(() => {
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
        cy.wait(9000);
        cy.clearAllLocalStorage();
      });
    });
});

beforeEach(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('GRAPHQL_BASE_URL') as string}`);
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('COGNITO_BASE_URL') as string}`);
});

Given('Facility has registered some profiles', function () {
  cy.clearAllLocalStorage();
  cy.visit('/login');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton')
    .click();
  cy.wait(3000);
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`, (req) => {
    if (req.body.query.indexOf('ListContacts') !== -1) {
      req.alias = 'ListContactsQuery';
      req.reply({
        fixture: 'listPlayers.json'
      });
    }
  });
});
When('Manager attempts to view facility profiles', () => {
  cy.visit('/player');
  cy.wait('@ListContactsQuery').then(() => {
    cy.contains('All Profiles').should('be.visible');
  });
});
Then('Profiles associated with that facility should appear', () => {
  cy.getBySel('table-pagination').should('be.visible');
  cy.getBySel('pagination-number-of-pages').should('have.text', ' 1 of 2');
  cy.getBySel('prev-page-button').should('be.disabled');
  cy.getBySel('next-page-button').should('not.be.disabled');
  cy.getBySel('edit-cell-renderer').first().should('be.not.visible');
  cy.getBySel('delete-cell-renderer').first().should('be.not.visible');
  cy.getBySel('profile-paragraph-renderer').first().should('be.visible');
  cy.wrap(ListPlayer.data.listContacts.items).then((unSortedInfor) => {
    cy.wrap(unSortedInfor.sort((a, b) => {
      if (a.FirstName < b.FirstName) return -1;
      if (a.FirstName > b.FirstName) return 1;
      return 0;
    })).then((info) => {
      cy.get('.ag-row').each(($el, index) => {
        cy.log(`Testing row number ${index}`);
        if (index >= 3) {
          return false;
        };
        cy.wrap($el).contains(`${info[index]?.FirstName ?? ''} ${info[index]?.LastName ?? ''}`)
          .should('be.visible');
        cy.wrap($el)
          .contains(AllCapStrToReadableStr(info[index]?.PlayerSoccerSkills?.ExperienceLevel ?? '-'))
          .should('be.visible');
        cy.wrap($el)
          .contains(
            AllCapStrToReadableStr(
              info[index]?.PlayerSoccerSkills?.PlayerPositions.items[0].Position ?? '-'
            )
          )
          .should('be.visible');
        cy.wrap($el).contains(getAgeFromDate(info[index]?.Birthdate)).should('be.visible');
        cy.wrap($el).contains(AllCapStrToReadableStr(info[index]?.Gender)).should('be.visible');
      });
    });
  });
});

Given('Facility has no registered profiles', function () {
  cy.visit('/login');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton')
    .click();
});

Then('Empty welcome screen should appear', () => {
  cy.wait('@graphQLRequests').then(() => {
    cy.contains(playerTranslation.header).should('be.visible');
    cy.contains(playerTranslation.paragraph1).should('be.visible');
    cy.contains(playerTranslation.paragraph2).should('be.visible');
  });
});

When('Manager filters profiles table', () => {
  cy.getBySel('global-filter-input').type('37');
});
Then('System should show correct results', () => {
  cy.wait(2000).then(() => {
    cy.get('.ag-row').each(($el, index) => {
      if (index >= 2) {
        return false;
      };
      cy.contains(37).should('be.visible');
    });
  });
});
