import React from 'react';
import ScreenSizeWarning from 'core/components/misc/screenSizeWarning';

describe('Screen Warning ', () => {
  beforeEach(() => {
    const ScreenWarningWrapper = (): JSX.Element => {
      return (<>
      <ScreenSizeWarning />
      <div>This is just a test</div>
      </>);
    };

    cy.mount(<ScreenWarningWrapper />);
  });

  it('Warning should appear when screen breakpoint is not supported', () => {
    cy.viewport(1280, 720);
    cy.getBySel('warningScreenHeader').should('not.exist');
    cy.getBySel('warningScreenParagraph').should('not.exist');

    cy.viewport(350, 400);
    cy.getBySel('warningScreenHeader').should('exist');
    cy.getBySel('warningScreenParagraph').should('exist');
    cy.getBySel('warningScreenHeader').contains('Your browser is too small');
    cy.getBySel('warningScreenParagraph').contains('Try resizing your screen to be at least 360px wide.');
  });

  it('Warning should not appear when screen breakpoint is supported', () => {
    cy.viewport(350, 400);
    cy.getBySel('warningScreenHeader').should('exist');
    cy.getBySel('warningScreenParagraph').should('exist');
    cy.getBySel('warningScreenHeader').contains('Your browser is too small');
    cy.getBySel('warningScreenParagraph').contains('Try resizing your screen to be at least 360px wide.');

    cy.viewport(720, 1280);
    cy.getBySel('warningScreenHeader').should('not.exist');
    cy.getBySel('warningScreenParagraph').should('not.exist');

    cy.viewport(1280, 720);
    cy.getBySel('warningScreenHeader').should('not.exist');
    cy.getBySel('warningScreenParagraph').should('not.exist');

    cy.viewport(1920, 1280);
    cy.getBySel('warningScreenHeader').should('not.exist');
    cy.getBySel('warningScreenParagraph').should('not.exist');

    cy.viewport(2440, 1920);
    cy.getBySel('warningScreenHeader').should('not.exist');
    cy.getBySel('warningScreenParagraph').should('not.exist');
  });
});
