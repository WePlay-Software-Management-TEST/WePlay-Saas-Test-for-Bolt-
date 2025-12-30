import React from 'react';
import { TeamDropdown } from 'features/player/components/teamsDropDown';
import ImageCacheProvider from 'core/context/imageCacheContext/imageCacheContext.provider';

describe('teamsDropDown.cy.tsx', () => {
  beforeEach(() => {
    const DropdownWrapper = (): JSX.Element => (<TeamDropdown addPlayerButton={
        async (contactsId?: string | undefined, teamId?: string | undefined, isCaptain?: boolean | undefined, label?: string | undefined) => {}
    } options={[]} cyData='testDropdown' isCaptainInTeam={false} />);
    cy.mount(<ImageCacheProvider><DropdownWrapper /></ImageCacheProvider>);
  });
  it('no teams options available', () => {
    cy.get('.testDropdown').should('exist');
    cy.contains('No Teams Found').should('be.visible');
  });
  it('with teams options available', () => {
    const options = [
      {
        value: '2823c3c9-e00d-4dd1-950f-690c0b574405',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          city: 'Hamilton',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          isCaptainInTeam: true,
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b', // team ID
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          isCaptainInTeam: false
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3', // team ID
        label: 'James Dean',
        extraData: {
          imageId: '',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          isCaptainInTeam: false
        }
      }
    ];
    const DropdownWrapper = (): JSX.Element => (<TeamDropdown addPlayerButton={
        async (contactsId?: string | undefined, teamId?: string | undefined, isCaptain?: boolean | undefined, label?: string | undefined) => {}
    } options={options} cyData='testDropdown' isCaptainInTeam={false} />);
    cy.mount(<ImageCacheProvider><DropdownWrapper /></ImageCacheProvider>);
    cy.get('.testDropdown').should('exist');
    cy.contains('No Teams Found').should('not.exist');
    cy.get('.testCyOption').should('have.length', 3);
    cy.getBySel('addCaptainButton').should('not.be.visible');
    cy.getBySel('addPlayerButton').should('not.be.visible');
    cy.get('.testCyOption').first().contains('Wait Hello').should('be.visible');
    cy.get('.testCyOption').first().contains('Joined').should('be.visible');
    cy.get('.testCyOption').first().should('have.class', 'hover:bg-neutral-200');
    cy.get('.testCyOption').first().should('have.class', '!text-base');
    cy.get('.testCyOption').first().should('have.class', 'hover:!text-grey-20');
    cy.get('.testCyOption').last().should('not.have.class', 'hover:bg-neutral-200');
    cy.get('.testCyOption').last().should('have.class', '!text-base');
    cy.get('.testCyOption').last().should('have.class', 'hover:!text-grey-20');
  });
  it('Search bar input field should search', () => {
    const options = [
      {
        value: '2823c3c9-e00d-4dd1-950f-690c0b574405',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          city: 'Hamilton',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          isCaptainInTeam: true,
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b',
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          isCaptainInTeam: false
          // teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3',
        label: 'James Dean',
        extraData: {
          imageId: '',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          //  teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
          isCaptainInTeam: false
        }
      }
    ];
    const DropdownWrapper = (): JSX.Element => (<TeamDropdown addPlayerButton={
        async (contactsId?: string | undefined, teamId?: string | undefined, isCaptain?: boolean | undefined, label?: string | undefined) => {}
    } options={options} cyData='testDropdown' isCaptainInTeam={false} />);
    cy.mount(<ImageCacheProvider><DropdownWrapper /></ImageCacheProvider>);
    cy.get('.cypressAutoComplete').within(() => {
      cy.get('input').type('Wait Hello', { delay: 200, force: true });
    });
    cy.get('.testCyOption').should('have.length', 1);
    cy.get('.testCyOption').first().contains('Wait Hello').should('be.visible');
    cy.get('.testCyOption').first().contains('Joined').should('be.visible');
  });
  it('Should have max height of 500px in too many options', () => {
    const options = [
      {
        value: '5c08932c-94ed-4bf8-9aad-ce5384ad1aa8',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          city: 'Hamilton',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          isCaptainInTeam: true,
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b',
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          isCaptainInTeam: false
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3',
        label: 'James Dean',
        extraData: {
          imageId: '',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          isCaptainInTeam: false
        }
      },
      {
        value: '5c08932c-94ed-4bf8-9aad-ce5384ad1aa8',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          city: 'Hamilton',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          isCaptainInTeam: true,
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b',
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          isCaptainInTeam: false
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3',
        label: 'James Dean',
        extraData: {
          imageId: '',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          isCaptainInTeam: false
        }
      },
      {
        value: '5c08932c-94ed-4bf8-9aad-ce5384ad1aa8',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          city: 'Hamilton',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          isCaptainInTeam: true,
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b',
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          isCaptainInTeam: false
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3',
        label: 'James Dean',
        extraData: {
          imageId: '',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          isCaptainInTeam: false
        }
      }
    ];
    const DropdownWrapper = (): JSX.Element => (<TeamDropdown addPlayerButton={
        async (contactsId?: string | undefined, teamId?: string | undefined, isCaptain?: boolean | undefined, label?: string | undefined) => {}
    } options={options} cyData='testDropdown' isCaptainInTeam={false} />);
    cy.mount(<ImageCacheProvider><DropdownWrapper /></ImageCacheProvider>);
    cy.get('.menuList').should('have.class', 'overflow-y-scroll');
    cy.get('.menuList').should('have.class', '!max-h-[250px]');
    cy.get('.menuList').should('have.class', 'short:!max-h-[400px]');
    cy.get('.menuList').should('have.class', 'average:!max-h-[500px]');
  });
});
