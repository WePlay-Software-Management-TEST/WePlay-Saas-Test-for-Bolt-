import React from 'react';
import { SkeletonMobileOverlay } from 'features/shared/components/skeletonMobileOverlay';

describe('skeletonMobileOverlay.cy.tsx', function () {
  before(() => {
    cy.viewport(460, 720);
  });

  it('Renders the SkeletonMobileOverlay component', function () {
    const SkeletonMobileOverlayWrapper = (): JSX.Element => {
      return (
            <>
            <label data-cy='modalOpen' htmlFor='modalID'>Click here to open modal</label>
            <SkeletonMobileOverlay modalID='modalID'>
              <h1 data-cy='childComponenet'>CHILLLLDDDD</h1>
            </SkeletonMobileOverlay>
            </>
      );
    };

    cy.mount(<SkeletonMobileOverlayWrapper />);
    cy.getBySel('modalOpen').contains('Click here to open modal').click().then(() => {
      cy.getBySel('childComponenet').should('be.visible');
    }
    );
    cy.getBySel('buttonForFilter').click();
    cy.getBySel('childComponenet').should('not.be.visible');
  });
});
