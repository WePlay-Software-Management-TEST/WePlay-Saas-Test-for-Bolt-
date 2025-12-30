import React, { useState } from 'react';
import { ProfileDetailsRenderer } from 'core/components/table/cellRenderers/ProfileDetailsRenderer';
import ImageCacheProvider from 'core/context/imageCacheContext/imageCacheContext.provider';

describe('ProfileDetailsRenderer.tsx', () => {
  beforeEach(() => {
    const OptionsCellRendererWrapper = (): JSX.Element => {
      const [someState, setSomeState] = useState('');
      return (
        <>
        { someState !== '' && <span data-cy='Redirect'>Ayeo, something got clicked</span>}
        <ProfileDetailsRenderer imageId='' paragraph='Some Guy' redirect={() => { setSomeState('Noo'); }}/>
        </>
      );
    };

    cy.mount(<OptionsCellRendererWrapper />, {}, ImageCacheProvider);
    cy.viewport(800, 1100);
  });
  it('Should Show the Correct Info', () => {
    cy.getBySel('profile-paragraph-renderer').should('have.text', 'Some Guy');
    cy.contains('SG').should('be.visible');
  });

  it('OnClick should call the passed down callback', () => {
    cy.getBySel('profile-paragraph-renderer').click();
    cy.getBySel('Redirect').should('have.text', 'Ayeo, something got clicked');
  });
});
