import React from 'react';
import { InfoCard } from 'core/layout/infoCard';
import { type InfoCardProps } from 'features/player/player.model';
import ImageCacheProvider from 'core/context/imageCacheContext/imageCacheContext.provider';

describe('InfoCard.cy.tsx', () => {
  beforeEach(() => {
    const InfoCardWrapper = (): JSX.Element => {
      const props: InfoCardProps = {
        id: 'SomeID',
        image: '',
        textHeader: 'Ayeo, how are you doing ???',
        bio: 'This Should be some long text, but im lazy to write it out',
        otherProps: { other: '12', other2: '34', other3: '' },
        otherPropsHeaders: { other: 'NOT A NUMBER', other2: 'NUMBER', other3: 'Hmmm' },
        editButtonText: 'Want to edit this ?',
        editButtonOnClickNavigate: '/something/something',
        dropdownText: 'Oh wow, a dropdown',
        options: ['Hey', 'It is me Mario']
      };

      return (<InfoCard {...props}/>);
    };

    cy.mount(<InfoCardWrapper />, {}, ImageCacheProvider);
  });
  it('Should Show Correct Info as is passed through props', () => {
    cy.contains('Ayeo, how are you doing ???').should('be.visible');
    cy.contains('This Should be some long text, but im lazy to write it out').should('be.visible');
    cy.contains('12').should('be.visible');
    cy.contains('34').should('be.visible');
    cy.contains('NUMBER').should('be.visible');
    cy.contains('NOT A NUMBER').should('be.visible');
    cy.contains('Oh wow, a dropdown').should('be.visible');
    cy.contains('Want to edit this ?').should('be.visible');
  });

  it('Onclick Edit, should navigate to correct path', () => {
    cy.getBySel('editProfileButton').first().click();
  });
  it('Onclick Dropdown, Should show Options that were provided by props', () => {
    cy.getBySel('dropwdownText').first().click();
    cy.contains('Hey').should('be.visible');
    cy.contains('It is me Mario').should('be.visible');
  });
  it('Remove bottom Border', () => {
    const InfoCardWrapper = (): JSX.Element => {
      const props: InfoCardProps = {
        id: 'SomeID',
        image: '',
        textHeader: 'Ayeo, how are you doing ???',
        bio: 'This Should be some long text, but im lazy to write it out',
        otherProps: { other: '12', other2: '34', other3: '' },
        otherPropsHeaders: { other: 'NOT A NUMBER', other2: 'NUMBER', other3: 'Hmmm' },
        editButtonText: 'Want to edit this ?',
        editButtonOnClickNavigate: '/something/something',
        dropdownText: 'Oh wow, a dropdown',
        options: ['Hey', 'It is me Mario'],
        border: false
      };

      return (<InfoCard {...props}/>);
    };

    cy.mount(<InfoCardWrapper />, {}, ImageCacheProvider);
  });

  it('When Custom Field Value is over 7 characters, it should ellipsis the rest', () => {
    const InfoCardWrapper = (): JSX.Element => {
      const props: InfoCardProps = {
        id: 'SomeID',
        image: '',
        textHeader: 'Ayeo, how are you doing ???',
        bio: 'This Should be some long text, but im lazy to write it out',
        otherProps: { other: '12', other2: '123456578 12 This is a long one, let', other3: '' },
        otherPropsHeaders: { other: 'NOT A NUMBER', other2: 'NUMBER', other3: 'Hmmm' },
        editButtonText: 'Want to edit this ?',
        editButtonOnClickNavigate: '/something/something',
        dropdownText: 'Oh wow, a dropdown',
        options: ['Hey', 'It is me Mario'],
        border: false
      };

      return (<InfoCard {...props}/>);
    };

    cy.mount(<InfoCardWrapper />, {}, ImageCacheProvider);
    cy.contains('123456578 12 This is a long one, let').should('have.class', 'text-ellipsis');
  });

  it('On Mobile, it should show buttons minimized', () => {
    const InfoCardWrapper = (): JSX.Element => {
      const props: InfoCardProps = {
        id: 'SomeID',
        image: '',
        textHeader: 'Ayeo, how are you doing ???',
        bio: 'This Should be some long text, but im lazy to write it out',
        otherProps: { other: '12', other2: '123456578 12 This is a long one, let', other3: '' },
        otherPropsHeaders: { other: 'NOT A NUMBER', other2: 'NUMBER', other3: 'Hmmm' },
        editButtonText: 'Want to edit this ?',
        editButtonOnClickNavigate: '/something/something',
        dropdownText: 'Oh wow, a dropdown',
        options: ['Hey', 'It is me Mario'],
        modalID: 'Test',
        border: false
      };

      return (<InfoCard {...props}/>);
    };
    cy.viewport(390, 880);
    cy.mount(<InfoCardWrapper />, {}, ImageCacheProvider);

    cy.getBySel('editProfileButtonMobile').should('be.visible');
    cy.getBySel('mobileAddModal').should('be.visible');
    cy.getBySel('editProfileButton').should('be.not.visible');
    cy.getBySel('dropDownAddToTeam').should('be.not.visible');
  });

  it('On Mobile, Avatar should be minimized', () => {
    const InfoCardWrapper = (): JSX.Element => {
      const props: InfoCardProps = {
        id: 'SomeID',
        image: '',
        textHeader: 'Ayeo, how are you doing ???',
        bio: 'This Should be some long text, but im lazy to write it out',
        otherProps: { other: '12', other2: '123456578 12 This is a long one, let', other3: '' },
        otherPropsHeaders: { other: 'NOT A NUMBER', other2: 'NUMBER', other3: 'Hmmm' },
        editButtonText: 'Want to edit this ?',
        editButtonOnClickNavigate: '/something/something',
        dropdownText: 'Oh wow, a dropdown',
        options: ['Hey', 'It is me Mario'],
        modalID: 'Test',
        border: false
      };

      return (<InfoCard {...props}/>);
    };
    cy.viewport(390, 880);
    cy.mount(<InfoCardWrapper />, {}, ImageCacheProvider);

    cy.getBySel('mobileAvatarInfoCard').should('have.class', 'w-[32px]');
    cy.getBySel('mobileAvatarInfoCard').should('have.class', 'h-[32px]');
  });
});
