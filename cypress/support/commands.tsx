/// <reference types="cypress" />
import React from 'react';
import i18next from 'i18n';
import 'index.css';
import 'cypress-mailosaur';
import { mount } from 'cypress/react18';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { RegistrationFixture } from '../fixtures/registration.fixture';

Cypress.Commands.add('createUnConfirmedUser', (username: string, shouldConfirm?: boolean) => {
  cy.visit('/signup');
  const emailSelector = '[data-cy="registrationEmail"]';
  const confirmEmailButton = '[data-cy="confirmEmailRegistration"]';

  cy.get(emailSelector).type(username);
  cy.get(confirmEmailButton).click();

  if (shouldConfirm ?? false) {
    const serverID = Cypress.env('MAILSOAUR_SERVER_ID') as string;
    cy.mailosaurGetMessage(serverID, {
      sentTo: username
    }).then((email) => {
      const confirmEmail = email.html?.links;
      if (confirmEmail !== undefined) {
        cy.request(
          confirmEmail[1].href as '',
          { timeout: 120000, headers: { 'Accept-Encoding': 'gzip, deflate' } });
      }
    });
  };
});

Cypress.Commands.add('getBySel', (selector: string, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('getLinkFromEmail', (email: string, receivedAfterDate?: Date) => {
  let redirectlink: string = '';
  cy.log(`Fetching Email from ${email}`);
  cy.mailosaurGetMessage(Cypress.env('MAILSOAUR_SERVER_ID') as string, {
    sentTo: email
  }, {
    receivedAfter: receivedAfterDate
  }).then((email) => {
    const confirmEmail = email.html?.links;

    if (confirmEmail !== undefined) {
      redirectlink = confirmEmail[1].href ?? '';
    }

    return cy.wrap(redirectlink);
  });
});

Cypress.Commands.add('mount', (component, options = {}, WrapperProvider) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;
  let reactRouterWrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>;

  if (WrapperProvider !== undefined) {
    reactRouterWrapped = <WrapperProvider><MemoryRouter {...routerProps}>{component}</MemoryRouter></WrapperProvider>;
  }
  const translationWrap = (
    <I18nextProvider i18n={i18next}>
        <div className='flex h-screen w-full justify-center items-center'>
        { reactRouterWrapped }
        </div>
    </I18nextProvider>
  );
  return mount(translationWrap, mountOptions);
}
);

Cypress.Commands.add('disableDefaultSubmitForm', () => {
  return cy.get('form').then(form$ => {
    form$.on('submit', e => {
      e.preventDefault();
    });
  });
}
);

Cypress.Commands.add('createUser', () => {
  const userInfo = { username: `${new Date().getTime()}@${Cypress.env('MAILSOAUR_SERVER_ID') as string}.mailosaur.net`, password: RegistrationFixture.testUserPassword };
  cy.wrap(userInfo.username)
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
  return cy.wrap(userInfo);
});

Cypress.Commands.add('login', (userName: string) => {
  cy.intercept('POST', `${Cypress.env('COGNITO_BASE_URL') as string}`).as('cognitoRequests');
  cy.intercept('POST', `${Cypress.env('COGNITO_IDENTITY_URL') as string}`).as('cognitoIdentityRequests');

  cy.clearAllLocalStorage();
  cy.visit('/login');
  cy.getBySel('loginUserNameInput').type(userName);
  cy.getBySel('loginPasswordInput').type(RegistrationFixture.testUserPassword);
  cy.disableDefaultSubmitForm();

  cy.getBySel('loginToAccountButton')
    .click();
  cy.wait(['@cognitoRequests', '@cognitoRequests', '@cognitoRequests']);
}
);

Cypress.Commands.add('getById', (id: string, ...args) => {
  cy.log(`Getting element with id: ${id}`);
  cy.get(`#${id}`, ...args).then((element) => {
    cy.log(`Element found: ${element}`);
  });
  return cy.get(`#${id}`, ...args);
});

Cypress.Commands.add('tournamentInitialDetails', (name: string) => {
  cy.getBySel('tourNameLegend').type(name + '2');
  cy.getBySel('nextStepBtn1').should('be.disabled');
  cy.getBySel('tourNameLegend').clear();
  cy.getBySel('tourNameLegend').type(name);
  cy.getBySel('tourDesc').type('tourney description');
  cy.getBySel('nextStepBtn1').should('not.be.disabled').click();
});

Cypress.Commands.add('tournamentType', (type: string) => {
  if (type === 'singleElimination') {
    cy.getBySel('singleEliOpt').click();
    cy.getBySel('numOfTeams').type('{downArrow}{enter}');
  } else if (type === 'roundrobin') {
    cy.getBySel('roundRobinOpt').click();
    cy.getBySel('numOfTeams').type('{downArrow}{enter}');
    cy.getById('playsWithEachOtherInput').type('{downArrow}{enter}');
    cy.getById('groupTeams').type('{downArrow}{enter}');
    cy.getById('placementQualifier').type('{downArrow}{enter}');
  }
  cy.getBySel('nextStepBtn2').should('not.be.disabled').click();
});

Cypress.Commands.add('tournamentExtraDetails', () => {
  cy.getById('endTimeInput').type('14:22');
  cy.getById('daysOfMatches').type('{enter}{downArrow}{enter}{downArrow}{enter}');
  const date = new Date();
  date.setDate(date.getDate() + 10);
  cy.getById('finishDate').type(
    date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  );
  cy.getById('division').type('{downArrow}{enter}');
  cy.getBySel('numOfFields').type('{downArrow}{enter}');
  cy.getBySel('nextStepBtn3').should('not.be.disabled').click();
});

Cypress.Commands.add('tournamentSchedule', () => {

});

Cypress.Commands.add('tournamentAssignFields', (fieldName: string) => {
  cy.get('#root') // Start from a broad scope
    .then(($body) => {
      cy.log(fieldName + ' creation');
      if ($body.text().includes(fieldName)) {
        cy.log(`Team ${fieldName} already exists.`);
      } else {
        cy.getBySel('addNewFieldBtn').click();
        cy.wait(1000);
        cy.getBySel('fieldLocation').type('test');
        cy.getBySel('saveFieldBtn').should('be.disabled');
        cy.getById('newFieldName').type(fieldName).type('{downArrow}{enter}');
        cy.getBySel('saveFieldBtn').should('not.be.disabled').click();
      }
    });
});

Cypress.Commands.add('createTournament', (name: string, type: string) => {
  cy.visit('/tournament/create');
  cy.contains('Tournament Creation').should('be.visible');
  cy.tournamentInitialDetails(name);
  cy.tournamentType(type);
  cy.tournamentExtraDetails();
  cy.tournamentAssignFields('FieldName');
  cy.getBySel('generateTourneyBtn').should('not.be.disabled').click();
});

Cypress.Commands.add('createTeam', (name: string) => {
  cy.visit('/teams/create');
  cy.contains('New Team Profile').should('be.visible');
  cy.contains('Team Information').should('be.visible');

  cy.getBySel('teamsNameInput').type(name);
  cy.getBySel('cityInput').type('henderson nv{downArrow}{enter}', {
    delay: 500
  });
});
Cypress.Commands.add('saveModalTeam', () => {
  cy.getBySel('openConfirmTeamDialog').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
    cy.wait(500);
  });
});
Cypress.Commands.add('saveModalTournament', () => {
  cy.getBySel('saveTourneyBtn').should('not.be.disabled').click();
  cy.get('#confirmPlayerCreation').within(() => {
    cy.getBySel('modalConfirmButton').click();
    cy.wait(500);
  });

  cy.wait(500);
});
Cypress.Commands.add('intialTeams', (name: string) => {
  cy.visit('/teams');
  cy.wait(3000);
  cy.get('#root') // Start from a broad scope
    .then(($body) => {
      cy.log(name + ' creation');
      if ($body.text().includes(name)) {
        cy.log(`Team ${name} already exists.`);
      } else {
        cy.createTeam(name);
        cy.saveModalTeam();
      }
    });
});
