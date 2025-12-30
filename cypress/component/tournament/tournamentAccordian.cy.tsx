import React from 'react';
import { TournamentAccordion } from 'features/tournament/components/accordion';

describe('TournamentAccordion.cy.tsx', function () {
  it('should render correctly when step is equal to stepOpen (Selected)', () => {
    const TournamentAccordianWrapper = (): JSX.Element => {
      return (
        <TournamentAccordion
          step={1}
          stepOpen={1}
          stepComplete={0}
          stepName="Step 1"
          stepDescription="Description for Step 1"
        >
        <div data-cy="childComponent">Child Component</div>
      </TournamentAccordion>
      );
    };
    cy.mount(<TournamentAccordianWrapper />);
    cy.getBySel('accordianTitle').should('be.visible').should('have.text', 'Step 1');
    cy.getBySel('accordianParagraph').should('not.exist');
    cy.getBySel('childComponent').should('be.visible');
    cy.getBySel('childComponent').should('be.visible');
    cy.getBySel('tournamentAccordianCollapse').should('have.class', 'collapse-open border-secondary');
    cy.getBySel('tournamentAccordianCollapse').should('not.have.class', 'collapse-close max-h-[133px]');
  });

  it('should render correctly when step is less than stepOpen (Pending)', () => {
    const props = {
      step: 2,
      stepComplete: 3,
      stepOpen: 4,
      stepName: 'Step Name',
      stepDescription: 'Step Description'
    };

    cy.mount(<TournamentAccordion {...props} />);
    cy.getBySel('accordianTitle').should('be.visible').should('have.text', 'Step Name');
    cy.getBySel('accordianParagraph').should('exist');
    cy.getBySel('childComponent').should('not.exist');
    cy.getBySel('spanTitleAccordian').should('have.class', 'flex-col items-start');
    cy.getBySel('spanTitleAccordian').should('not.have.class', 'items-center');
    cy.getBySel('spanTitleAccordian').within(() => {
      cy.getBySel('accordianTitle').should('have.class', 'text-sm font-semibold text-grey-40');
      cy.getBySel('accordianTitle').should('not.have.class', 'text-grey-10 text-xl');
    });
  });

  it('should render correctly when step is greater than stepOpen (Complete)', () => {
    const props = {
      step: 3,
      incrementStep: () => {},
      stepComplete: 4,
      stepOpen: 2,
      stepName: 'Step 3',
      stepDescription: 'Description for Step 3'
    };
    cy.mount(<TournamentAccordion {...props} />);
    cy.getBySel('accordianTitle').should('be.visible').should('have.text', 'Step 3');
    cy.getBySel('accordianParagraph').should('not.exist');
    cy.getBySel('childComponent').should('not.exist');
    cy.getBySel('tournamentAccordianCollapse').should('have.class', 'collapse border border-grey-90 mobile:p-4 p-4 sm:px-2 md:px-4 border-success max-h-[60px] flex justify-between items-center hover:cursor-pointer col-span-full collapse-close max-h-[133px]');
    cy.getBySel('tournamentAccordianCollapse').should('not.have.class', 'p-8');
    cy.getBySel('checkMarkDone').should('exist');
    cy.getBySel('checkMarkDone').should('be.visible');
  });
});
