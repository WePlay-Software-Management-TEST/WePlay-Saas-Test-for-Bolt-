import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';
import { RegistrationFixture } from '../../fixtures/registration.fixture';
import registrationTranslation from '../../../src/i18n/english/registration.json';

function getToEmailHaveBeenSentScreen (email: string): void {
  cy.getBySel(RegistrationFixture.emailSelector).type(email);
  cy.getBySel(RegistrationFixture.confirmEmailButtonSelector).click();
}

before(() => {
  cy.wrap(Cypress.env('MAILSOAUR_SERVER_ID')).as('serverId');
});

beforeEach(() => {
  cy.intercept(`${Cypress.env('GRAPHQL_BASE_URL') as string}`).as('graphQLRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('GRAPHQL_BASE_URL') as string}`);
  cy.intercept(`${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');
  cy.log(`Intercepting requests from endpoint ${Cypress.env('COGNITO_BASE_URL') as string}`);
  cy.visit(RegistrationFixture.url);
});

Given('Business Have a Valid Email Address', () => {
  cy.contains('WePlay').should('be.visible');
});

When('Business Registers With Valid Business Information', function () {
  cy.wrap(`${new Date().getTime()}@${this.serverId as string}.mailosaur.net`).as('testEmail').then(() => {
    getToEmailHaveBeenSentScreen(this.testEmail);
    cy.contains('Almost There!').should('be.visible');
    cy.contains(this.testEmail).should('be.visible');

    cy.getLinkFromEmail(this.testEmail).then((link: string) => {
      cy.log(link);
      cy.visit(link);
      cy.contains(registrationTranslation.passwordStep.header).should('be.visible');

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

      cy.getBySel(RegistrationFixture.citySelector).should('not.have.length', 2);
      cy.getBySel(RegistrationFixture.zipCodeSelector).should('not.have.length', 2);
      cy.getBySel(RegistrationFixture.createAccountButtonSelector).click();
    });
  });
});

Then('New Business Account Have Been Created', function () {
  cy.wait(['@cognitoRequests', '@cognitoRequests', '@cognitoRequests', '@graphQLRequests']);
  cy.wait(5000);
  cy.url().should('include', '/player');
  cy.getBySel('sidePanelSettings').should('exist');
});

Given('Business have an Invalid Email Address', function () {
  cy.contains(registrationTranslation.wePlay).should('be.visible');
  cy.wrap(RegistrationFixture.inValidEmailAddress).as('invalidEmail');
});

When('Business tries to registers With Invalid Business Email', function () {
  cy.getBySel(RegistrationFixture.emailSelector).type(this.invalidEmail);
});

Then('Validation Error "Invalid Email Format" Appears', () => {
  cy.getBySel(RegistrationFixture.confirmEmailButtonSelector).should('be.disabled');
});

When('Business have confirmed his Email Address', function () {
  const testEmail = `${new Date().getTime()}@${this.serverId as string}.mailosaur.net`;
  getToEmailHaveBeenSentScreen(testEmail);

  cy.contains(registrationTranslation.emailSentStep.header).should('be.visible');
  cy.contains(testEmail).should('be.visible');

  cy.getLinkFromEmail(testEmail).then((link) => {
    cy.visit(link);
    cy.contains(registrationTranslation.passwordStep.header).should('be.visible');
  });
});

When('Business have entered invalid Password', function () {
  cy.getBySel(RegistrationFixture.passwordSelector).type(
    RegistrationFixture.testUserPassword.slice(0, 4));
});

Then('Validation Error "Invalid Password" Appears', () => {
  cy.getBySel(RegistrationFixture.inputErrorSpan).should('have.css', 'color', 'rgb(255, 51, 51)');
  cy.getBySel(RegistrationFixture.confirmPasswordButton).should('be.disabled');
});

When('Business tries to resend verification email', function () {
  const testEmail = `${new Date().getTime()}@${this.serverId as string}.mailosaur.net`;
  getToEmailHaveBeenSentScreen(testEmail);

  cy.contains(registrationTranslation.emailSentStep.header).should('be.visible');
  cy.contains(testEmail).should('be.visible');

  cy.wrap(new Date()).as('dateSent').then((dateSent) => {
    cy.getBySel(RegistrationFixture.resendVerificationEmailButtonSelector).click();
    cy.contains('E-mail have been re-sent.').should('be.visible');
    cy.getBySel(RegistrationFixture.resendVerificationEmailButtonSelector).should('be.disabled');
    cy.getLinkFromEmail(testEmail, dateSent).then((link) => cy.visit(link));
  });
});

Then('Business resume registration', () => {
});

Then('Business have already confirmed his Email Address', function () {
  const testEmail = `${new Date().getTime()}@${this.serverId as string}.mailosaur.net`;
  getToEmailHaveBeenSentScreen(testEmail);
  cy.getLinkFromEmail(testEmail).then((link) => cy.request(link));
});

When('Business resend confirmation email', () => {
  cy.getBySel(RegistrationFixture.resendVerificationEmailButtonSelector).click();
});

Then('"Account have been confirmed error" should Appear', () => {
  cy.getBySel(RegistrationFixture.resendVerificationEmailButtonSelector).should('be.disabled');
});

Given('Business have reached Business info step', function () {
  const testEmail = `${new Date().getTime()}@${this.serverId as string}.mailosaur.net`;
  getToEmailHaveBeenSentScreen(testEmail);
  cy.getLinkFromEmail(testEmail).then((link) => {
    cy.visit(link);

    cy.getBySel(RegistrationFixture.passwordSelector).type(RegistrationFixture.testUserPassword);
    cy.getBySel(RegistrationFixture.confirmPasswordSelector).type(RegistrationFixture.testUserPassword);
    cy.getBySel(RegistrationFixture.confirmPasswordButton).click();

    cy.getBySel(RegistrationFixture.firstNameInputSelector).type(RegistrationFixture.firstName);
    cy.getBySel(RegistrationFixture.lastNameInputSelector).type(RegistrationFixture.lastName);
    cy.getBySel(RegistrationFixture.confirmUserInfoButtonSelector).click();
  });
});

When('Business tries to enter mailing address manually', () => {
  cy.getBySel(RegistrationFixture.businessMailingAddressSelector).type(
    RegistrationFixture.businessMailingAddress);
  cy.getBySel(RegistrationFixture.createAccountButtonSelector).should('be.disabled');
  cy.getBySel(RegistrationFixture.citySelector).type(RegistrationFixture.cityValue);
  cy.getBySel(RegistrationFixture.zipCodeSelector).type(RegistrationFixture.zipcodeValue);
  cy.getBySel(RegistrationFixture.stateSelector).type(RegistrationFixture.stateValue);
  cy.getBySel(RegistrationFixture.businessNameSelector).type(RegistrationFixture.businessName);
  cy.getBySel(RegistrationFixture.createAccountButtonSelector).should('be.not.disabled');
  cy.getBySel(RegistrationFixture.createAccountButtonSelector).click();
});

Then('Business have resent confirmation email', function () {
  cy.wrap(`${new Date().getTime()}@${this.serverId as string}.mailosaur.net`).as('emailSample').then((email) => {
    getToEmailHaveBeenSentScreen(email);
    cy.wrap(new Date()).as('dateSent');
  });
});

When('Business clicks on the invalid confirmation email', function () {
  cy.getLinkFromEmail(this.emailSample).then((link) => {
    cy.wrap(link).as('invalidLink');
    cy.getBySel(RegistrationFixture.resendVerificationEmailButtonSelector).click();
  });
});

Then("Business can't resume registration", function () {
  cy.log(this.invalidLink);
  cy.request(this.invalidLink, { timeout: 120000, headers: { 'Accept-Encoding': 'gzip, deflate' } })
    .then((resp) => {
      expect(resp.status).to.not.eq(302);
    });
});

When('Business enter invalid mailing address', () => {
  cy.getBySel(RegistrationFixture.businessMailingAddressSelector).type(
    RegistrationFixture.businessMailingAddress);
  cy.getBySel(RegistrationFixture.createAccountButtonSelector).should('be.disabled');
  cy.getBySel(RegistrationFixture.citySelector).type(RegistrationFixture.cityValue);
  cy.getBySel(RegistrationFixture.zipCodeSelector).type(RegistrationFixture.invalidzipCode);
  cy.getBySel(RegistrationFixture.stateSelector).type(RegistrationFixture.stateValue);
});

Then('Address error message should appear', () => {
  cy.getBySel(RegistrationFixture.createAccountButtonSelector).should('be.disabled');
  cy.getBySel(RegistrationFixture.zipCodeSelector);
});
