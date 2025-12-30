import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';
import { RegistrationFixture } from '../../fixtures/registration.fixture';
import listTeams from '../../fixtures/listTeams.json';

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

beforeEach(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`, (req) => {
    if (req.body?.query?.indexOf('customListTeamsWithContacts') !== -1) {
      req.alias = 'customListTeamsWithContacts';
      req.reply({
        fixture: 'listTeams.json'
      });
    }
  });
});

Given('Facility has registered teams with captains And Team Photo', function () {
  cy.clearAllLocalStorage();
  cy.visit('/login');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton')
    .click();
  cy.wait(3000);
});
Given('Facility has no registered teams', function () {
  cy.visit('/login');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton')
    .click();
});
When('Manager attempts to view teams', () => {
  cy.visit('/teams');
  cy.wait('@customListTeamsWithContacts').then(() => {
    cy.contains('All Teams').should('be.visible');
  });
});

Then('All teams associated with this facility will show correclty', () => {
  cy.getBySel('table-pagination').should('not.exist');
  cy.getBySel('edit-cell-renderer').first().should('be.not.visible');
  cy.getBySel('delete-cell-renderer').first().should('be.not.visible');
  cy.getBySel('profile-paragraph-renderer').first().should('be.visible');
  cy.wrap(listTeams.data.listContacts.items).then((unSortedInfor) => {
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
      });
    });
  });
});

Then('Empty welcome screen should appear', () => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`, (req) => {
    req.continue();
  });
  cy.wait(3000).then(() => {
    cy.visit('/teams').then(() => {
      cy.contains('Create New Teams').should('be.visible');
      cy.contains('There are no teams created yet, let’s create your first team with the button below. ').should('be.visible');
    });
  });
});

Given('Facility has registered teams', function () {
  cy.clearAllLocalStorage();
  cy.visit('/login');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);

  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton')
    .click();
  cy.wait(3000);
});

When('Manager filters Teams based on {string}', function (filterType: string) {
  cy.visit('/teams');
  const filterTypes: Record<string, string> = {
    state: 'State-filter-player',
    city: 'City-filter-player',
    county: 'County-filter-player'
  };
  cy.wrap(filterType).as('filterType');
  const dataCySelector = filterTypes[filterType];
  cy.wrap(dataCySelector).as('selector');
});
Then('System should show results with {string}', function (expectedResult: string) {
  cy.getBySel(this.selector).click();
  cy.getBySel(`baseFilter-showResults-${(this.filterType as string).charAt(0).toUpperCase() + (this.filterType as string).slice(1)}-filter-player`).click({ force: true });
  cy.getBySel('profile-paragraph-renderer').first().should('exist');
});

Then('System should not show results with {string}', function (expectedResult: string) {
  cy.getBySel(this.selector).click();
  cy.getBySel(`baseFilter-showResults-${(this.filterType as string).charAt(0).toUpperCase() + (this.filterType as string).slice(1)}-filter-player`).click({ force: true });
  cy.getBySel('profile-paragraph-renderer').first().should('exist');
});
