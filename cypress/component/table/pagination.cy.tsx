import React, { useState } from 'react';
import Pagination from 'core/components/table/pagination';
import { type Option } from 'core/models/input.model';

describe('GlobalActionHeader', () => {
  beforeEach(() => {
    const WrappedComponent = (): JSX.Element => {
      const [pageSize, setPageSize] = useState(15);
      const [totalPages] = useState(10);
      const [currentPage, setCurrentPage] = useState(1);

      const onNextPage = (): void => {
        setCurrentPage(prevState => { return prevState + 1; });
      };
      const onPrevPage = (): void => {
        setCurrentPage(prevState => { return prevState - 1; });
      };
      const setPageSizeOptions = (pageSize: Option): void => {
        setPageSize((Number(pageSize.value)));
      };
      return (
      <div className='flex flex-col h-full w-full'>
        <Pagination
        pageSize={pageSize}
        totalPages={totalPages}
        currentPage={currentPage}
        onSetPageSize={setPageSizeOptions}
        onNextPage={onNextPage}
        onPreviousPage={onPrevPage}
        />
      </div>
      );
    };
    cy.mount(<WrappedComponent />);
  });

  it('Should view current page & total pages and navigation button', () => {
    cy.getBySel('prev-page-button').should('be.disabled');
    cy.getBySel('next-page-button').should('not.be.disabled');
    cy.getBySel('table-pagination').contains('Rows per page: ');
    cy.get('.classForTestValue').contains('15');
    cy.getBySel('pagination-number-of-pages').should('have.text', ' 1 of 10');
  });

  it('Should change total number of pages when page size get changes', () => {
    cy.getBySel('pagination-dropdown-page-size').click();
    cy.getBySel('pagination-dropdown-page-size').type('{downArrow}{downArrow}{enter}');
    cy.get('.classForTestValue').contains('30');
  });

  it('Should have a background color that is grey-98', () => {
    cy.getBySel('table-pagination').should('have.css', 'background-color', 'rgb(250, 250, 250)');
  });

  it('When Next button gets clicked, current page increments', () => {
    cy.getBySel('next-page-button').should('not.be.disabled').click();
    cy.getBySel('pagination-number-of-pages').should('have.text', ' 2 of 10');
  });

  it('When Prev button gets clicked, current page decrements', () => {
    cy.getBySel('next-page-button').should('not.be.disabled').click();
    cy.getBySel('pagination-number-of-pages').should('have.text', ' 2 of 10');
    cy.getBySel('prev-page-button').should('not.be.disabled').click();
    cy.getBySel('pagination-number-of-pages').should('have.text', ' 1 of 10');
  });

  it('When current page reaches max pages, Next page button should be disabled', () => {
    cy.getBySel('next-page-button').should('not.be.disabled').click().click().click().click().click()
      .click().click().click().click();
    cy.getBySel('pagination-number-of-pages').should('have.text', ' 10 of 10');
    cy.getBySel('next-page-button').should('be.disabled');
    cy.getBySel('prev-page-button').should('not.be.disabled');
  });
});
