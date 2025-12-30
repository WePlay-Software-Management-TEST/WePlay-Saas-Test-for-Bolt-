import React from 'react';
import { type SearchFilterProps, type FiltersTypes } from 'core/models/filters.model';
import { BaseGoogleSearchFilter, BaseSearchFilter, GoogleSearchFilterUI, SearchFilterUI } from 'core/components/table/filters/searchFilter';
import { useForm } from 'react-hook-form';
import { listOfStates } from 'core/context/global.const';
import ImageCacheProvider from 'core/context/imageCacheContext/imageCacheContext.provider';

describe('Search Filter', () => {
  beforeEach(() => {
    const SearchFilterWrapper = ({ Child }: { Child: (any: any) => JSX.Element }): JSX.Element => {
      const { ...formObjectTest } = useForm();
      const onClear = (): void => {
        console.log('test');
      };
      const setFilters = (filter: FiltersTypes | null): void => {
        console.log(filter);
      };
      const searchProps: SearchFilterProps = {
        cyData: 'Test',
        header: 'Hello There!',
        filterResults: 20,
        onClear,
        setFilters,
        filterCol: 'fakee',
        isActive: false,
        numOfSelected: 10,
        ...formObjectTest,
        options: (listOfStates.map((key): any => {
          return {
            label: key[0],
            value: key[1]
          };
        }))
      };

      return (
        <ImageCacheProvider>
          <Child {...searchProps} />
        </ImageCacheProvider>
      );
    };
    cy.wrap(SearchFilterWrapper).as('BaseSearchFilter');
  });
  it('Select Filter should have render component based on props', function () {
    const Comp = this.BaseSearchFilter as ({ Child }: { Child: (any: any) => JSX.Element }) => JSX.Element;
    cy.mount(<Comp Child={SearchFilterUI}></Comp>);

    cy.getBySel('baseFilter-cy-data').first().contains('Hello There!').should('be.visible').click();
    cy.getBySel('baseFilter-showResults-Test').contains(20).should('be.visible');
    cy.getBySel('baseFilter-clearResults-Test').contains('Hello There!').should('be.visible');
    cy.getBySel('baseFilter-close-Test').first().click();
    cy.getBySel('baseFilter-showResults-Test').contains(20).should('be.not.visible');
    cy.getBySel('baseFilter-clearResults-Test').contains('Hello There!').should('be.not.visible');
  });

  it('Base Select Filter should have render component based on props', function () {
    const Comp = this.BaseSearchFilter as ({ Child }: { Child: (any: any) => JSX.Element }) => JSX.Element;
    cy.mount(<Comp Child={BaseSearchFilter}></Comp>);

    cy.get('input').first().focus();

    cy.get('input').first().type('Alabama ', { delay: 100 });
    cy.contains('Alabama');
    cy.get('input').first().type('{downArrow}{enter}');
    cy.get('input').first().type('new york');
    cy.get('input').first().type('{downArrow}{enter}');
    cy.get('input').first().type('Cal');
    cy.get('input').first().type('{downArrow}{enter}');
    cy.get('.testMultiValue').should('have.length', 9);
  });
});

describe('Google Search Filter', () => {
  beforeEach(() => {
    const SearchFilterWrapper = ({ Child }: { Child: (any: any) => JSX.Element }): JSX.Element => {
      const { ...formObjectTest } = useForm();
      const onClear = (): void => {
        console.log('test');
      };
      const setFilters = (filter: FiltersTypes | null): void => {
        console.log(filter);
      };
      const searchProps: SearchFilterProps = {
        cyData: 'Test',
        header: 'Hello There!',
        filterResults: 20,
        onClear,
        setFilters,
        filterCol: 'fakee',
        isActive: false,
        numOfSelected: 10,
        ...formObjectTest,
        options: (listOfStates.map((key): any => {
          return {
            label: key[0],
            value: key[1]
          };
        }))
      };

      return (
        <>
        <Child {...searchProps} />
        </>
      );
    };
    cy.wrap(SearchFilterWrapper).as('SearchFilterWrapper');
  });
  it('Google Select Filter should have render component based on props', function () {
    const Comp = this.SearchFilterWrapper as ({ Child }: { Child: (any: any) => JSX.Element }) => JSX.Element;
    cy.mount(<Comp Child={GoogleSearchFilterUI}></Comp>);

    cy.getBySel('baseFilter-cy-data').contains('Hello There!').should('be.visible').click();
    cy.getBySel('baseFilter-showResults-Test').contains(20).should('be.visible');
    cy.getBySel('baseFilter-clearResults-Test').contains('Hello There!').should('be.visible');
    cy.getBySel('baseFilter-close-Test').click();
    cy.getBySel('baseFilter-showResults-Test').contains(20).should('be.not.visible');
    cy.getBySel('baseFilter-clearResults-Test').contains('Hello There!').should('be.not.visible');
  });

  it('Google Base Select Filter should have render component based on props', function () {
    const Comp = this.SearchFilterWrapper as ({ Child }: { Child: (any: any) => JSX.Element }) => JSX.Element;
    cy.mount(<Comp Child={BaseGoogleSearchFilter}></Comp>);

    cy.get('input').first().type('Henderson', { delay: 300 });
    cy.contains('Henderson, Nevada');
    cy.get('input').first().type('{downArrow}{enter}');
    cy.get('.testMultiValue').should('have.length', 1);
  });
});
