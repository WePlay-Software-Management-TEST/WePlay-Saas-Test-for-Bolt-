import React from 'react';
import { TeamPlayersDropdown } from 'features/teams/components/teamPlayersDropdown';
import ImageCacheProvider from 'core/context/imageCacheContext/imageCacheContext.provider';

describe('teamPlayersDropdown.cy.tsx', () => {
  beforeEach(() => {
    const DropdownWrapper = (): JSX.Element => (<TeamPlayersDropdown addPlayerButton={
        async (contactsId?: string | undefined, teamId?: string | undefined, isCaptain?: boolean | undefined, label?: string | undefined) => {}
    } options={[]} cyData='testDropdown' isCaptainInTeam={false} />);
    cy.mount(<ImageCacheProvider><DropdownWrapper /></ImageCacheProvider>);
  });
  it('no players options available', () => {
    cy.get('.testDropdown').should('exist');
    cy.contains('No Players Found').should('be.visible');
  });
  it('with players options available', () => {
    const dateNow = new Date();
    const testableAge = `${dateNow.getFullYear() - 44}-01-01`;

    const options = [
      {
        value: '5c08932c-94ed-4bf8-9aad-ce5384ad1aa8',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          Birthdate: testableAge,
          city: 'Gaza',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405',
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b',
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          Birthdate: '1999-01-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3',
        label: 'James Dean',
        extraData: {
          imageId: '',
          Birthdate: '1999-12-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      }
    ];
    const DropdownWrapper = (): JSX.Element => (<TeamPlayersDropdown addPlayerButton={
        async (contactsId?: string | undefined, teamId?: string | undefined, isCaptain?: boolean | undefined, label?: string | undefined) => {}
    } options={options} cyData='testDropdown' isCaptainInTeam={false} />);
    cy.mount(<ImageCacheProvider><DropdownWrapper /></ImageCacheProvider>);
    cy.get('.testDropdown').should('exist');
    cy.contains('No Players Found').should('not.exist');
    cy.get('.testCyOption').should('have.length', 3);
    cy.getBySel('addCaptainButton').should('not.be.visible');
    cy.getBySel('addPlayerButton').should('not.be.visible');
    cy.get('.testCyOption').first().contains('Wait Hello').should('be.visible');
    cy.get('.testCyOption').first().contains('44').should('be.visible');
    cy.get('.testCyOption').first().contains('Joined').should('be.visible');
    cy.get('.testCyOption').first().should('have.class', 'hover:bg-neutral-200');
    cy.get('.testCyOption').first().should('have.class', '!text-base');
    cy.get('.testCyOption').first().should('have.class', 'hover:!text-grey-20');
    cy.get('.testCyOption').last().should('not.have.class', 'hover:bg-neutral-200');
    cy.get('.testCyOption').last().should('have.class', '!text-base');
    cy.get('.testCyOption').last().should('have.class', 'hover:!text-grey-20');
  });
  it('Search bar input field should search', () => {
    const dateNow = new Date();
    const testableAge = `${dateNow.getFullYear() - 44}-01-01`;
    const options = [
      {
        value: '5c08932c-94ed-4bf8-9aad-ce5384ad1aa8',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          Birthdate: testableAge,
          city: 'Hamilton',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405',
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b',
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          Birthdate: '1999-01-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3',
        label: 'James Dean',
        extraData: {
          imageId: '',
          Birthdate: '1999-12-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      }
    ];
    const DropdownWrapper = (): JSX.Element => (<TeamPlayersDropdown addPlayerButton={
        async (contactsId?: string | undefined, teamId?: string | undefined, isCaptain?: boolean | undefined, label?: string | undefined) => {}
    } options={options} cyData='testDropdown' isCaptainInTeam={false} />);
    cy.mount(<ImageCacheProvider><DropdownWrapper /></ImageCacheProvider>);
    cy.get('.cypressAutoComplete').within(() => {
      cy.get('input').type('Wait Hello', { delay: 200, force: true });
    });
    cy.get('.testCyOption').should('have.length', 1);
    cy.get('.testCyOption').first().contains('Wait Hello').should('be.visible');
    cy.get('.testCyOption').first().contains('44').should('be.visible');
    cy.get('.testCyOption').first().contains('Joined').should('be.visible');
  });
  it('Should have max height of 500px in too many options', () => {
    const dateNow = new Date();
    const testableAge = `${dateNow.getFullYear() - 44}-01-01`;

    const options = [
      {
        value: '5c08932c-94ed-4bf8-9aad-ce5384ad1aa8',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          Birthdate: testableAge,
          city: 'Hamilton',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405',
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b',
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          Birthdate: '1999-01-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3',
        label: 'James Dean',
        extraData: {
          imageId: '',
          Birthdate: '1999-12-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      },
      {
        value: '5c08932c-94ed-4bf8-9aad-ce5384ad1aa8',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          Birthdate: '1979-01-02',
          city: 'Hamilton',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405',
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b',
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          Birthdate: '1999-01-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3',
        label: 'James Dean',
        extraData: {
          imageId: '',
          Birthdate: '1999-12-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      },
      {
        value: '5c08932c-94ed-4bf8-9aad-ce5384ad1aa8',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          Birthdate: '1979-01-02',
          city: 'Hamilton',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405',
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b',
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          Birthdate: '1999-01-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3',
        label: 'James Dean',
        extraData: {
          imageId: '',
          Birthdate: '1999-12-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      }
    ];
    const DropdownWrapper = (): JSX.Element => (<TeamPlayersDropdown addPlayerButton={
        async (contactsId?: string | undefined, teamId?: string | undefined, isCaptain?: boolean | undefined, label?: string | undefined) => {}
    } options={options} cyData='testDropdown' isCaptainInTeam={false} />);
    cy.mount(<ImageCacheProvider><DropdownWrapper /></ImageCacheProvider>);
    cy.get('.menuList').should('have.class', 'overflow-y-scroll');
    cy.get('.menuList').should('have.class', '!max-h-[250px]');
    cy.get('.menuList').should('have.class', 'short:!max-h-[400px]');
    cy.get('.menuList').should('have.class', 'average:!max-h-[500px]');
  });
});

describe('TeamPlayersDropdown On Mobile', () => {
  beforeEach(() => {
    cy.viewport(390, 890);
    const options = [
      {
        value: '5c08932c-94ed-4bf8-9aad-ce5384ad1aa8',
        label: 'Wait Hello',
        extraData: {
          imageId: '',
          Birthdate: '999-01-02',
          city: 'Gaza',
          state: 'Ohio',
          isCaptain: true,
          inTeam: true,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405',
          version: 1
        }
      },
      {
        value: 'f550a35f-ebe5-4dfe-ac8c-9e1de105376b',
        label: 'Oday hayek',
        extraData: {
          imageId: '',
          Birthdate: '1999-01-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      },
      {
        value: '975f0d56-5343-4a49-b68b-c1beb22d2bb3',
        label: 'James Dean',
        extraData: {
          imageId: '',
          Birthdate: '1999-12-02',
          city: 'Virginia Beach',
          state: 'Virginia',
          isCaptain: false,
          inTeam: false,
          teamsId: '2823c3c9-e00d-4dd1-950f-690c0b574405'
        }
      }
    ];
    const addPlayerButton = cy.stub().as('addPlayerButton');
    const DropdownWrapper = (): JSX.Element => (<TeamPlayersDropdown addPlayerButton={addPlayerButton} options={options} cyData='testDropdown' isCaptainInTeam={false} />);
    cy.mount(<ImageCacheProvider><DropdownWrapper /></ImageCacheProvider>);
  });

  it('Should have correct classes on mobile', () => {
    cy.get('h6').first().contains('Add to Team');
    cy.get('h6').should('have.class', 'mobile:flex hidden py-2 text-grey-40 font-medium text-xs text-left -ml-[30px]');
    cy.get('.testCyOption').should('have.length', 3);
    cy.getBySel('addPlayerButton').last().click({ force: true });
    cy.get('@addPlayerButton').should('have.been.calledOnce');
    cy.get('.collapse').last().should('have.class', 'collapse peer-hover:collapse-open hover:collapse-open mobile:rounded-2xl');
    cy.get('.collapse').last().within(() => {
      cy.getBySel('addPlayerButton').should('be.not.visible');
      cy.getBySel('addCaptainButton').should('be.not.visible');
    });
  });
});
