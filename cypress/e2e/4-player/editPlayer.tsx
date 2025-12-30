import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { RegistrationFixture } from '../../fixtures/registration.fixture';
import { CreatePlayerFixture as fixture } from '../../fixtures/createPlayer.fixture';

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
        cy.url().should('include', '/');
      });
    });
});

beforeEach(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('GRAPHQL_BASE_URL') as string}`);
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('COGNITO_BASE_URL') as string}`);
});

Given('Facility has registered profiles {string}', function (Roster?: string) {
  cy.clearAllLocalStorage();
  cy.visit('');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton').click();
  cy.wait(['@graphQLRequests', '@cognitoRequests', '@cognitoRequests']);
  cy.getBySel(fixture.globalHeaderButton).click();
  cy.getBySel(fixture.createProfileGlobalHeader).first().click();
  cy.getBySel(fixture.firstNameinputSelector).type(`${Roster ?? ''}${fixture.firstName}`);
  cy.getBySel(fixture.lastNameInputSelector).type(fixture.lastName);
  cy.getBySel(fixture.birthDateSelector).type(fixture.birthdate);
  cy.getBySel(fixture.zipCodeInputSelector).type(
    fixture.zipcode.slice(0, 4),
    { delay: 700 }).type('{downArrow}{enter}', { delay: 500 });
  cy.getBySel(fixture.playerEmailSelector).type(`${new Date().getTime()}${fixture.email}`);
  cy.getBySel(fixture.playerPrefSelector).click();
  cy.getBySel(fixture.genderInputSelector).click();
  cy.getBySel(fixture.genderInputSelector).wait(600).type('{downArrow}{enter}');

  cy.getBySel(fixture.openConfirmProfileDialogSelector).should('be.not.disabled').click();
  cy.getBySel(fixture.confirmModalParaSelector).contains(`${fixture.firstName} ${fixture.lastName}`);
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
});
When('Manager wants to edit profile details', () => {
  cy.wait(1000);
  cy.getBySel(fixture.editProfileButton).click();
  cy.contains('Save Changes').should('be.visible');
  cy.contains('Edit Player Profile').should('be.visible');
  cy.contains('Edit Profile').should('be.visible');
  cy.contains('michael keaton').should('be.visible');
  [
    { selector: fixture.firstNameinputSelector, value: 'James' },
    { selector: fixture.lastNameInputSelector, value: 'Dean' },
    { selector: fixture.bioInputSelector, value: 'SomeBio !!!!' },
    { selector: fixture.birthDateSelector, value: '1977-09-05' },
    { selector: fixture.zipCodeInputSelector, value: '347', dropdown: true, clear: true },
    { selector: fixture.weightInputSelector, value: '189' },
    { selector: fixture.playerEmailSelector, value: 'notEmail@Email.com' },
    { selector: 'leftPreference', value: 'leftPreference', click: true },
    { selector: fixture.genderInputSelector, value: 'OTHER', dropdown: true },
    { selector: fixture.heightInputSelector, value: '4', dropdown: true },
    { selector: fixture.experienceInputSelector, value: 'Beg', dropdown: true },
    { selector: fixture.preferredPositionInput, value: 'Swe', dropdown: true }
  ].forEach((el) => {
    if (el.click !== undefined && el.click) {
      cy.getBySel(el.selector).click();
    } else if (el.dropdown !== undefined && el.dropdown) {
      if (el.clear !== undefined) cy.getBySel(el.selector).clear();
      cy.getBySel(el.selector).type(`${el.value}${el.dropdown !== undefined ? '{downArrow}{enter}' : ''}`, { delay: 500 });
    } else {
      cy.getBySel(el.selector).clear().type(el.value);
    }
  });
});
Then('Manager confirms new profile details', () => {
  cy.getBySel(fixture.openConfirmProfileDialogSelector).should('be.not.disabled').click();
  cy.getBySel(fixture.confirmModalParaSelector).contains(`${fixture.firstName} ${fixture.lastName}`);
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
});
Then('System should show success message', () => {
  cy.wait('@graphQLRequests').then(() => {
    cy.getBySel('toastMsg').should('contain', 'Changes has been saved.');
    cy.getBySel('toastMsg').should('be.visible');
  });
});

Then('System should save new profile details', () => {
  cy.getBySel(fixture.editProfileButton).click();
  [
    { selector: fixture.firstNameinputSelector, value: 'James' },
    { selector: fixture.lastNameInputSelector, value: 'Dean' },
    { selector: fixture.bioInputSelector, value: 'SomeBio !!!!' },
    { selector: fixture.birthDateSelector, value: '1977-09-05' },
    { selector: fixture.weightInputSelector, value: '189' },
    { selector: fixture.playerEmailSelector, value: 'notEmail@Email.com' }
  ].forEach((el) => {
    cy.getBySel(el.selector).should('have.value', el.value);
  });
});

Then('Manager cancel Edit process', () => {
  cy.getBySel('cancelProfileCreationModal').click();
  cy.get('#cancelPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
});

Then('System should show toast message', () => {
  cy.contains('Changes wasn’t applied.').should('be.visible');
});

Then('Player is Associated with at least one team', function () {
  cy.wait(2000);
  cy.url().then((url) => {
    cy.wrap(url).as('playerURL');
  });
  cy.visit('/');
  cy.getBySel('globalActionOption').eq(1).click({ force: true });

  cy.getBySel('teamsNameInput').type('SomeTeamName');
  cy.getBySel('cityInput').type('henderson nv{downArrow}{enter}', { delay: 500 });
  cy.getBySel('teamsDecs').type('Some long Description, that no one will see it');
  cy.get('.cypressAutoComplete').within(() => {
    cy.get('input').type(`Roster${fixture.firstName}{enter}`, { delay: 200 });
  });
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait(2000);
});

When('Manager removes a player from a team', function () {
  cy.visit('/player');
  cy.getBySel('delete-cell-renderer').click({ force: true });
  cy.get('#removePlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
    cy.wait(2000);
  });
});

Then('System should show the remaining players correctly', () => {
  cy.contains('Rostermichael keaton’s profile has been archived.').should('be.visible');
});
