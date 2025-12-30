// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '@bahmutov/cypress-code-coverage/support';
import { type MountOptions, type MountReturn } from 'cypress/react';
import { type MemoryRouterProps } from 'react-router-dom';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { type mount } from 'cypress/react18';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps },
        wrapperProvider?: ({ children }: {
          children: JSX.Element
        }) => JSX.Element
      ): Cypress.Chainable<MountReturn>
      createUnConfirmedUser: chainable<any>
      getBySel(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
      getById(id: string, args?: any): Chainable<JQuery<HTMLElement>>
      getLinkFromEmail(email: string, receivedAfterDate?: Date): Chainable<any>
      disableDefaultSubmitForm(): Chainable<any>
      createUser(): Chainable<{ username: string, password: string }>
      login(username: string): Chainable<any>
      createTournament(name: string, type: string): Chainable<any>
      createTeam(name: string): Chainable<any>
      saveModalTeam(): Chainable<any>
      saveModalTournament(): Chainable<any>
      intialTeams(name: string): Chainable<any>
      tournamentInitialDetails(name: string): Chainable<any>
      tournamentType(type: string): Chainable<any>
      tournamentExtraDetails(): Chainable<any>
      tournamentSchedule(): Chainable<any>
      tournamentAssignFields(fieldName: string): Chainable<any>
    }
  }
}
