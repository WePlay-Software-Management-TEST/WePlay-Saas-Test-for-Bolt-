import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';
import { RegistrationFixture } from '../../fixtures/registration.fixture';
import { CreatePlayerFixture as fixture } from '../../fixtures/createPlayer.fixture';
import playerTranslation from 'i18n/english/player.json';
import breadCrumbsTranslation from 'i18n/english/breadcrumbs.json';
import { getAgeFromDate } from 'core/utils/utils';

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
        cy.wait(6000);
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

Given('Admin logged in', function () {
  cy.visit('/login');
  cy.getBySel('loginUserNameInput').type(this.testEmail);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton')
    .click();
  cy.wait(5000);
});

When('Admin navigates to create profile screen', () => {
  cy.getBySel(fixture.globalHeaderButton).click();
  cy.getBySel(fixture.createProfileGlobalHeader).first().click();
  cy.getBySel(fixture.subTextCreateProfileHeaderSelector)
    .contains(playerTranslation.createPlayerHeaderSubText);
  cy.getBySel(fixture.lastBreadCrumbSelector).contains(breadCrumbsTranslation.createProfile);
  cy.getBySel(fixture.breadCrumbSelector).first().contains(breadCrumbsTranslation.allProfiles);
});

Then('Fill out profile form', function () {
  cy.getBySel(fixture.uploadImageBoxSelector).selectFile(fixture.photoLocation, { action: 'drag-drop' }).then(() => {
    cy.wait(500);
    cy.getBySel(fixture.saveImageSelector).click({ force: true }).then(() => {
      cy.getBySel(fixture.firstNameinputSelector).type(fixture.firstName);
      cy.getBySel(fixture.lastNameInputSelector).type(fixture.lastName);
      cy.getBySel(fixture.bioInputSelector).type(fixture.bio);
      cy.getBySel(fixture.birthDateSelector).type(fixture.birthdate);
      cy.getBySel(fixture.zipCodeInputSelector).type(
        fixture.zipcode.slice(0, 4),
        { delay: 700 }).type('{downArrow}{enter}', { delay: 700 });
      cy.getBySel(fixture.weightInputSelector).type(fixture.weight);
      cy.getBySel(fixture.playerPrefSelector).click();
      cy.getBySel(fixture.genderInputSelector).click();
      cy.getBySel(fixture.genderInputSelector).wait(600).type('{downArrow}{enter}');
      cy.getBySel(fixture.heightInputSelector).click();
      // Height is 3.0
      cy.getBySel(fixture.heightInputSelector).wait(600).type('{downArrow}{enter}');
      cy.getBySel(fixture.experienceInputSelector).click();
      cy.getBySel(fixture.experienceInputSelector).wait(600).type('{downArrow}{enter}');
      cy.getBySel(fixture.preferredPositionInput).click();
      cy.getBySel(fixture.preferredPositionInput).wait(600).type('{downArrow}{downArrow}{enter}');
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
    });
  });
});

Then('Admin should see Profile info screen', function () {
  cy.wait(5000);
  cy.url().then((url) => {
    cy.wrap(url).as('playerURL');
  });
  cy.url().should('include', '/player');
});

Then('Profile info screen view the correct data', () => {
  cy.contains('240Lbs');
  cy.contains(`${fixture.firstName} ${fixture.lastName}`);
  cy.contains('3\'0"Ft');
  cy.contains('Right back');
  cy.contains('Beginner');
  cy.contains(getAgeFromDate(fixture.birthdate));
  cy.getBySel('playerCardBio').should('be.visible');
  cy.getBySel('emptyTeamsParagraph').contains(`${fixture.firstName} ${fixture.lastName}`);
});

When('Admin Fill out profile form with invalid information', () => {
  cy.getBySel(fixture.uploadImageBoxSelector).selectFile(fixture.invalidPhotoLocation, { action: 'drag-drop' }).then(() => {
    cy.wait(500);
    cy.getBySel('errorText').should('be.visible');
    cy.getBySel(fixture.firstNameinputSelector).type(fixture.firstName);
    cy.getBySel(fixture.lastNameInputSelector).type(fixture.lastName);
    cy.getBySel(fixture.bioInputSelector).type(fixture.over250Bio);

    cy.getBySel(fixture.birthDateSelector).type(fixture.invalidBirthDate);
    cy.getBySel(fixture.zipCodeInputSelector).type('NOtA ZipCOde');
    cy.getBySel(fixture.weightInputSelector).type('95');
    cy.getBySel(fixture.playerEmailSelector).type('invalid@email');
    cy.getBySel(fixture.playerPrefSelector).click();
    cy.getBySel(fixture.genderInputSelector).click();
    cy.getBySel(fixture.playerPrefSelector).click();
  });
});

Then('Admin sees a meaningful error message', () => {
  cy.getBySel(fixture.inputErrorSpan).should('have.length', '3');
  cy.getBySel(fixture.openConfirmProfileDialogSelector).should('be.disabled');
});

Then('Admin Cancels the process', () => {
  cy.getBySel(fixture.openCloseProfileModalSelector).click();
  cy.contains(playerTranslation.cancelPlayerCreationModalHeader);
  cy.contains(playerTranslation.cancelPlayerCreationModalParagraph);
  cy.get('#cancelPlayerCreation').within(() => {
    cy.getBySel(fixture.closeButtonModal).click();
  });
  cy.getBySel(fixture.subTextCreateProfileHeaderSelector)
    .contains(playerTranslation.createPlayerHeaderSubText);
  cy.getBySel(fixture.openCloseProfileModalSelector).click();
  cy.get('#cancelPlayerCreation').within(() => {
    cy.getBySel(fixture.confirmModalButtonSelector).click();
    cy.url().should('include', '/player');
  });
});

Then('Team Roster should Show the correct Teams', function () {
  cy.visit('/');
  cy.getBySel('globalActionOption').eq(1).click({ force: true });

  cy.getBySel('teamsNameInput').type('SomeTeamName');
  cy.getBySel('cityInput').type('henderson nv{downArrow}{enter}', { delay: 500 });
  cy.getBySel('teamsDecs').type('Some long Description, that no one will see it');
  cy.get('.cypressAutoComplete').within(() => {
    cy.get('input').type('michael{enter}', { delay: 200 });
  });
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
  });
  cy.wait(['@graphQLRequests']);
  cy.log(this.playerURL);
  cy.visit(this.playerURL);
  cy.contains('Player');
  cy.getBySel('profile-paragraph-renderer').first().within(() => {
    cy.contains('SomeTeamName').should('be.visible');
  });
});

Then('Email should be sent to the newly created player', function () {
  cy.mailosaurGetMessage(Cypress.env('MAILSOAUR_SERVER_ID') as string, {
    sentTo: this.playerEmail
  }, {
    receivedAfter: undefined,
    timeout: 30000
  }).then((email) => {
    expect(email.subject).to.equal('Welcome to WePlay.ai');
    expect(email.html?.body).to.contain(RegistrationFixture.businessName);
    expect(email.html?.body).to.contain(`${fixture.firstName} ${fixture.lastName}`);
  });
});
