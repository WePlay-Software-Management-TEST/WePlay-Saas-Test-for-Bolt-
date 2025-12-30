import React from 'react';
import { type RangeFilterProps, type FiltersTypes } from 'core/models/filters.model';
import { BaseRangeFilter, RangeFilterUI } from 'core/components/table/filters/rangeFilter';
describe('Check if BreadCrumbs renders correctly', () => {
  beforeEach(() => {
    const BreadCrumbsWrapper = (): JSX.Element => {
      const onClear = (): void => {
        console.log('test');
      };
      const setFilters = (filter: FiltersTypes | null): void => {
        console.log(filter);
      };
      const props: RangeFilterProps = {
        cyData: 'Test',
        header: 'Hello There!',
        filterResults: 20,
        onClear,
        setFilters,
        filterCol: 'fakee',
        isActive: false,
        numOfSelected: 10,
        minRange: 10,
        maxRange: 200,
        selectedMin: 10,
        selectedMax: 200,
        measurmentUnit: 'WoW'
      };
      return (
        <>
        <RangeFilterUI {...props}/>
        <BaseRangeFilter {...props}/>
        </>
      );
    };
    cy.mount(<BreadCrumbsWrapper />);
  });
  it('Range Filter should have render component based on props', () => {
    cy.getBySel('baseFilter-cy-data').contains('Hello There!').should('be.visible').click();
    cy.getBySel('baseFilter-showResults-Test').contains(20).should('be.visible');
    cy.getBySel('baseFilter-clearResults-Test').contains('Hello There!').should('be.visible');
    cy.getBySel('baseFilter-close-Test').click();
    cy.getBySel('baseFilter-showResults-Test').contains(20).should('be.not.visible');
    cy.getBySel('baseFilter-clearResults-Test').contains('Hello There!').should('be.not.visible');

    cy.getBySel('baseFilter-cy-data').contains('Hello There!').should('be.visible').click();
    cy.getBySel('rangeFilter-header-Test').should('have.text', ' WoW - WoW');
  });

  it('Base Range Filter should have render component based on props', () => {
    cy.getBySel('baseFilter-cy-data').contains('Hello There!').should('be.visible').click();
    cy.getBySel('rangeFilter-header-Test').should('have.text', ' WoW - WoW');
  });
});
