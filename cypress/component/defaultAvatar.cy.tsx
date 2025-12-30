import React from 'react';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import ImageCacheProvider from 'core/context/imageCacheContext/imageCacheContext.provider';

describe('DefaultAvatar Component', () => {
  it('Have the Correct Classes when prop size is "large"', () => {
    const DefaultAvatarWrapper = (): JSX.Element => {
      return (
      <>
        <InitialsAvatar initials='HS' size='large'/>
      </>
      );
    };
    cy.mount(<DefaultAvatarWrapper />, {}, ImageCacheProvider);
    cy.getBySel('defaultAvatar-container').should('have.class', 'bg-dodger-blue-98 w-12');
    cy.getBySel('defaultAvatar-span').should('have.class', 'text-2xl');
  });

  it('Have the Correct Classes when prop size is "medium"', () => {
    const DefaultAvatarWrapper = (): JSX.Element => {
      return (
      <>
        <InitialsAvatar initials='HS' size='medium'/>
      </>
      );
    };
    cy.mount(<DefaultAvatarWrapper />, {}, ImageCacheProvider);
    cy.getBySel('defaultAvatar-container').should('have.class', 'bg-dodger-blue-98 w-10');
    cy.getBySel('defaultAvatar-span').should('have.class', 'text-base');
  });

  it('Have the Correct Classes when prop size is "huge"', () => {
    const DefaultAvatarWrapper = (): JSX.Element => {
      return (
      <>
        <InitialsAvatar initials='HS' size='huge'/>
      </>
      );
    };
    cy.mount(<DefaultAvatarWrapper />, {}, ImageCacheProvider);
    cy.getBySel('defaultAvatar-container').should('have.class', 'bg-dodger-blue-90 w-17');
    cy.getBySel('defaultAvatar-span').should('have.class', 'text-6xl');
  });

  it('Should show at most 3 chars when initials props is a long text', () => {
    const DefaultAvatarWrapper = (): JSX.Element => {
      return (
      <>
        <InitialsAvatar initials='HSS5555'/>
      </>
      );
    };
    cy.mount(<DefaultAvatarWrapper />, {}, ImageCacheProvider);

    cy.getBySel('defaultAvatar-span').contains('H').should('be.visible');
  });
});
