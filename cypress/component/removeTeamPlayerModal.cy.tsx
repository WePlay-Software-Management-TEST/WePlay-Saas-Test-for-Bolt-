import React from 'react';
import { RemoveTeamPlayerModal } from 'features/teams/components/removeTeamPlayerModal';
import ImageCacheProvider from 'core/context/imageCacheContext/imageCacheContext.provider';

describe('removeTeamPlayerModal.cy.tsx', () => {
  it('It should show Modal with correct information', function () {
    const onCloseSpy = cy.stub();
    cy.mount(<ImageCacheProvider>
      <RemoveTeamPlayerModal
        playerName='Jon Dom'
        isOpen={true} id='5c08932c-94ed-4bf8-9aad-ce5384ad1aa8'
        _version={1} teamName='Falcons'
        toastMsg={'Success!!!'} returnOnSuccessID='contact'
        onClose={onCloseSpy}
    />
    </ImageCacheProvider>);
    cy.get('button').should('have.length', 2);
    cy.getBySel('modalConfirmButton').contains('Remove Player');
    cy.getBySel('modalCloseButton').contains('Cancel');
    cy.get('h6').contains('Do you really want to remove Jon Dom from team "Falcons"?');
    cy.get('h4').contains('Remove Player?');

    cy.getBySel('modalCloseButton').click().then(() => {
      expect(onCloseSpy).to.be.calledOnce;
    });

    cy.getBySel('modalConfirmButton').click().then(() => {
    });
  });
});
