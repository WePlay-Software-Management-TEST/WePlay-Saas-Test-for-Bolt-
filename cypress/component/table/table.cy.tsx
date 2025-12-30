import React, { useRef } from 'react';
import Table from 'core/components/table/table';
import ListPlayers from '../../fixtures/listPlayers.json';
import { type Contact } from 'graphql/table.models';
import { type ColDef } from 'ag-grid-community';
import { LatestSearchProvider } from 'core/context/lastestSearchContext/latestSearchContext.provider';

describe('Table.tsx with empty params', () => {
  it('Should show a No Row component when data is empty', () => {
    cy.mount(<Table />, {}, LatestSearchProvider);
    cy.getBySel('NoRowsComp').should('be.visible');
  });
});

describe('Table', () => {
  beforeEach(() => {
    const WrappedComponent = (): JSX.Element => {
      const rowData = ListPlayers.data.listContacts.items as Contact[];
      const colDef = useRef<Array<ColDef<Contact>>>(
        [
          {
            field: 'FirstName'
          },
          {
            field: 'Gender'
          },
          {
            field: 'Birthdate'
          }
        ]
      );

      return (
      <div className='flex flex-col h-full w-full'>
        <Table rowData={rowData} columnDefs={colDef.current} quickFilter='' pinnedColsId={['Birthdate']}/>
      </div>
      );
    };
    cy.mount(<WrappedComponent />, undefined, LatestSearchProvider);
    cy.get('.ag-header').should('be.visible');
  });

  it('Table headers should be sortable', () => {
    cy.get('.ag-header-cell').first().click();
    cy.get('.ag-sort-indicator-icon.ag-sort-ascending-icon').should('be.visible');
  });

  it('Table should show correct data from colDef attr given', () => {
    cy.wrap(ListPlayers.data.listContacts.items).then((contactInfo) => {
      cy.get('.ag-row').should('have.length', 30);
      cy.get('.ag-row').each(($el, index) => {
        if (index >= 3) {
          return false;
        };
        cy.wrap($el).contains(contactInfo[index].FirstName);
        cy.wrap($el).contains(contactInfo[index].Gender);
        cy.wrap($el).contains(contactInfo[index].Birthdate);
      });
    });
  });

  it('ColumnsId that got passed should get pinned when screen gets under 1030px', () => {
    cy.viewport(1080, 750);
    cy.get('.ag-pinned-right-header').should('be.visible');
    cy.get('.ag-pinned-right-header .ag-header-cell-text').should('have.text', 'Birthdate');
  });

  it('On Clear Filters NoRowComponent, Should clear filters and show All of that data', () => {
    const WrappedComponent = (): JSX.Element => {
      const rowData = ListPlayers.data.listContacts.items as Contact[];
      const colDef = useRef<Array<ColDef<Contact>>>(
        [
          {
            field: 'FirstName'
          },
          {
            field: 'Gender'
          },
          {
            field: 'Birthdate'
          }
        ]
      );

      return (
      <div className='flex flex-col h-full w-full'>
        <Table rowData={rowData} columnDefs={colDef.current} quickFilter='James Dean Ayeoooo' pinnedColsId={['Birthdate']}/>
      </div>
      );
    };
    cy.mount(<WrappedComponent />, undefined, LatestSearchProvider);
    cy.getBySel('NoRowsComp').should('be.visible');
    cy.getBySel('clearAllFiltersButton').click({ force: true });
    cy.get('.ag-row').should('have.length', 30);
  });
});
