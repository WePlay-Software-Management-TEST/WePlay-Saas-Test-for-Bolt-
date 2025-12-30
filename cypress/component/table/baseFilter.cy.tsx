import React from 'react';
import { BaseFilter } from 'core/components/table/filters/baseFilter';
import { type FiltersTypes, type BaseFilterProps } from 'core/models/filters.model';
describe('Check if BreadCrumbs renders correctly', () => {
  beforeEach(() => {
    const BreadCrumbsWrapper = (): JSX.Element => {
      const onClear = (): void => {
        console.log('test');
      };
      const setFilters = (filter: FiltersTypes | null): void => {
        console.log(filter);
      };
      const props: BaseFilterProps = {
        cyData: 'Test',
        header: 'Hello There!',
        filterResults: 20,
        onClear,
        setFilters,
        filterCol: 'fakee',
        isActive: false,
        numOfSelected: 10
      };
      return (
        <>
        <BaseFilter {...props}/>
        </>
      );
    };
    cy.mount(<BreadCrumbsWrapper />);
  });
  it('Base Filter should have render component based on props', () => {
    cy.getBySel('baseFilter-cy-data').contains('Hello There!').should('be.visible').click();
    cy.getBySel('baseFilter-showResults-Test').contains(20).should('be.visible');
    cy.getBySel('baseFilter-clearResults-Test').contains('Hello There!').should('be.visible');
    cy.getBySel('baseFilter-close-Test').click();
    cy.getBySel('baseFilter-showResults-Test').contains(20).should('be.not.visible');
    cy.getBySel('baseFilter-clearResults-Test').contains('Hello There!').should('be.not.visible');
  });
});
