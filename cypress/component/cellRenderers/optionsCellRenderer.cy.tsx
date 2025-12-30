import React, { useState } from 'react';
import { OptionsCellRenderer } from 'core/components/table/cellRenderers/optionsCellRenderer';

describe('OptionsCellRenderer.tsx', () => {
  beforeEach(() => {
    const OptionsCellRendererWrapper = (): JSX.Element => {
      const [someState, setSomeState] = useState('');
      return (
        <>
        {someState !== '' && <span data-cy='deleteOn'>Something got deleted</span>}
        <OptionsCellRenderer id={'someID'} editTipText='A TOOLD TIP' deleteTipText='AYEO'
        onDelete={() => { setSomeState('THIS GOT CLICKED'); }}/>
        </>
      );
    };
    cy.mount(<OptionsCellRendererWrapper />);
    cy.viewport(800, 1100);
  });
  it('OptionsCellRenderer Should have the right Classes', () => {
    cy.getBySel('optionsCellRenderer').should('have.class', 'options-cell-renderer');
    cy.getBySel('edit-cell-renderer').should('have.class', 'tooltip');
    cy.getBySel('delete-cell-renderer').should('have.class', 'tooltip');
  });

  it('OnDelete should run the provided Callback', () => {
    cy.getBySel('delete-cell-renderer').click();
    cy.getBySel('deleteOn').should('have.text', 'Something got deleted');
  });
});
