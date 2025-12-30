import React from 'react';
import { MobileSearch } from 'features/shared/components/mobileSearch';
import { GridApi } from 'ag-grid-community';
import { LatestSearchProvider } from 'core/context/lastestSearchContext/latestSearchContext.provider';
import { latestSearchMockData } from '../../fixtures/latestSearchMockData';
import { type MobileSearchProps } from 'core/models/filters.model';
import ImageCacheProvider from 'core/context/imageCacheContext/imageCacheContext.provider';
import ListTeams from '../../fixtures/listTeams.json';
import ListPlayers from '../../fixtures/listPlayers.json';

describe('MobileSearch.cy.tsx', function () {
  before(() => {
    window.localStorage.setItem('aws-amplify-cachelatestSearchCache', JSON.stringify(latestSearchMockData));
  });

  beforeEach(() => {
    cy.viewport(460, 720);
    const queryInput = (e: React.ChangeEvent<HTMLInputElement>): void => {};
    const MobileSearchWrapper = (JSXprops: { gridAPI: GridApi, filterCom?: JSX.Element }): JSX.Element => {
      const props: MobileSearchProps = {
        placeHolderText: '',
        filtersComponent: JSXprops.filterCom ?? <></>,
        queryInput,
        gridApi: JSXprops.gridAPI,
        reRenderFlag: false
      };

      return <ImageCacheProvider>
        <LatestSearchProvider>
        <>
        <label data-cy="showModal" htmlFor='mobileSearchModal'>Show</label>
        <MobileSearch {...props} />
        </>
        </LatestSearchProvider>
      </ImageCacheProvider>;
    };
    cy.wrap(MobileSearchWrapper).as('MobileSearchWrapper');
  }
  );

  it('Latest Search shows when no input have been entered, and no filters are active', function () {
    const stubGridApi = new GridApi();
    cy.stub(stubGridApi, 'getFilterModel').returns(undefined);
    cy.stub(stubGridApi, 'isAnyFilterPresent').returns(false);
    cy.stub(stubGridApi, 'getRenderedNodes').returns([]);
    const MobileSearchWrapper = this.MobileSearchWrapper as (JSXprops: {
      gridAPI: GridApi
      filterCom?: JSX.Element
    }) => JSX.Element;

    cy.mount(<MobileSearchWrapper gridAPI={stubGridApi}/>);

    cy.getBySel('showModal').click();
    cy.getBySel('quickFilterMobile').type('test');
    cy.contains('Last Searched').should('be.visible');
  });

  it('Check if Filter SVG Changes color depending on if filters are enabled or not', function () {
    let stubGridApi = new GridApi();
    cy.stub(stubGridApi, 'getFilterModel').returns(undefined);
    cy.stub(stubGridApi, 'isAnyFilterPresent').returns(false);
    cy.stub(stubGridApi, 'getRenderedNodes').returns([]);
    const MobileSearchWrapper = this.MobileSearchWrapper as (JSXprops: {
      gridAPI: GridApi
      filterCom?: JSX.Element
    }) => JSX.Element;

    cy.mount(<MobileSearchWrapper gridAPI={stubGridApi}/>);

    cy.getBySel('showModal').click();
    cy.getBySel('quickFilterMobile').type('test');
    cy.getBySel('FilterIconSVG').should('have.class', 'fill-grey-10');
    cy.getBySel('FilterIconSVG').should('have.class', 'stroke-grey-10');

    stubGridApi = new GridApi();
    cy.stub(stubGridApi, 'getFilterModel').returns({ sth: '' });
    cy.stub(stubGridApi, 'isAnyFilterPresent').returns(true);
    cy.stub(stubGridApi, 'getRenderedNodes').returns([]);

    cy.mount(<MobileSearchWrapper gridAPI={stubGridApi}/>);
    cy.getBySel('showModal').click();
    cy.getBySel('FilterIconSVG').should('have.class', 'fill-blue-70');
    cy.getBySel('FilterIconSVG').should('have.class', 'stroke-blue-70');
  });

  it('No Results found should show empty state', function () {
    const emptyGridAPI = new GridApi();

    cy.stub(emptyGridAPI, 'getFilterModel').returns({ sth: '' });
    cy.stub(emptyGridAPI, 'isAnyFilterPresent').returns(true);
    cy.stub(emptyGridAPI, 'getRenderedNodes').returns([]);
    const MobileSearchWrapper = this.MobileSearchWrapper as (JSXprops: {
      gridAPI: GridApi
      filterCom?: JSX.Element
    }) => JSX.Element;

    cy.mount(<MobileSearchWrapper gridAPI={emptyGridAPI}/>);

    cy.getBySel('showModal').click();
    cy.contains('No Results Found!').should('be.visible');
    cy.contains('No results matching with the filters. You can edit the filters to view more results.').should('be.visible');
  });

  it('When getRenderedNodes return Contact Data And filter is enabled, it should show results', function () {
    const emptyGridAPI = new GridApi();

    cy.stub(emptyGridAPI, 'getFilterModel').returns({ sth: '' });
    cy.stub(emptyGridAPI, 'isAnyFilterPresent').returns(true);
    cy.stub(emptyGridAPI, 'getRenderedNodes').returns([
      { data: ListPlayers.data.listContacts.items[0] }
    ]);
    const MobileSearchWrapper = this.MobileSearchWrapper as (JSXprops: {
      gridAPI: GridApi
      filterCom?: JSX.Element
    }) => JSX.Element;

    cy.mount(<MobileSearchWrapper gridAPI={emptyGridAPI}/>);

    cy.getBySel('showModal').click();
    cy.getBySel('profile-paragraph-renderer').should('length', 1);
    cy.getBySel('profile-paragraph-renderer').first().should('be.visible');
  });

  it('When getRenderedNodes return Team Data And filter is enabled, it should show results', function () {
    const emptyGridAPI = new GridApi();

    cy.stub(emptyGridAPI, 'getFilterModel').returns({ sth: '' });
    cy.stub(emptyGridAPI, 'isAnyFilterPresent').returns(true);
    cy.stub(emptyGridAPI, 'getRenderedNodes').returns([
      { data: ListTeams.data.listTeams.items[0] }
    ]);
    const MobileSearchWrapper = this.MobileSearchWrapper as (JSXprops: {
      gridAPI: GridApi
      filterCom?: JSX.Element
    }) => JSX.Element;

    cy.mount(<MobileSearchWrapper gridAPI={emptyGridAPI}/>);

    cy.getBySel('showModal').click();
    cy.getBySel('profile-paragraph-renderer').should('length', 1);
    cy.getBySel('profile-paragraph-renderer').first().should('be.visible');
  });

  it('Search Data comes in incorrect, it should not show the search results', function () {
    const emptyGridAPI = new GridApi();
    const team = ListTeams.data.listTeams.items[0] as any;
    team.TeamName = undefined;
    team.id = undefined;
    cy.stub(emptyGridAPI, 'getFilterModel').returns({ sth: '' });
    cy.stub(emptyGridAPI, 'isAnyFilterPresent').returns(true);
    cy.stub(emptyGridAPI, 'getRenderedNodes').returns([
      { data: team }
    ]);
    const MobileSearchWrapper = this.MobileSearchWrapper as (JSXprops: {
      gridAPI: GridApi
      filterCom?: JSX.Element
    }) => JSX.Element;

    cy.mount(<MobileSearchWrapper gridAPI={emptyGridAPI}/>);

    cy.getBySel('showModal').click();
    cy.getBySel('profile-paragraph-renderer').should('length', 1);
    cy.getBySel('profile-paragraph-renderer').first().should('not.be.visible');
    cy.getBySel('quickFilterMobile').type('test');
  });

  it('Latest Search tags should affect the search when clicked', function () {
    window.localStorage.setItem('aws-amplify-cachelatestSearchCache', JSON.stringify(latestSearchMockData));
    const emptyGridAPI = new GridApi();
    cy.stub(emptyGridAPI, 'getFilterModel').returns(undefined);
    cy.stub(emptyGridAPI, 'isAnyFilterPresent').returns(false);
    cy.stub(emptyGridAPI, 'getRenderedNodes').returns([]);
    const MobileSearchWrapper = this.MobileSearchWrapper as (JSXprops: {
      gridAPI: GridApi
      filterCom?: JSX.Element
    }) => JSX.Element;

    cy.mount(<MobileSearchWrapper gridAPI={emptyGridAPI}/>);
    cy.getBySel('showModal').click();
    cy.getBySel('latestSearchChip').first().click();
    cy.getBySel('quickFilterMobile').should('have.value', 'Local Cache');
  });

  it('Error handling during GridAPI fail', function () {
    window.localStorage.setItem('aws-amplify-cachelatestSearchCache', JSON.stringify(latestSearchMockData));
    const emptyGridAPI = new GridApi();
    cy.stub(emptyGridAPI, 'getFilterModel').returns(undefined);
    cy.stub(emptyGridAPI, 'isAnyFilterPresent').returns(undefined);
    cy.stub(emptyGridAPI, 'getRenderedNodes').returns([
      { data: undefined }
    ]);
    const MobileSearchWrapper = this.MobileSearchWrapper as (JSXprops: {
      gridAPI: GridApi
      filterCom?: JSX.Element
    }) => JSX.Element;

    cy.mount(<MobileSearchWrapper gridAPI={emptyGridAPI}/>);
    cy.getBySel('showModal').click();
    cy.getBySel('quickFilterMobile').type('test');
  });

  it('On filter button click, should show modal with Filter component passed to it', function () {
    window.localStorage.setItem('aws-amplify-cachelatestSearchCache', JSON.stringify(latestSearchMockData));
    const emptyGridAPI = new GridApi();
    cy.stub(emptyGridAPI, 'getFilterModel').returns(undefined);
    cy.stub(emptyGridAPI, 'isAnyFilterPresent').returns(undefined);
    cy.stub(emptyGridAPI, 'getRenderedNodes').returns([
      { data: undefined }
    ]);
    const MobileSearchWrapper = this.MobileSearchWrapper as (JSXprops: {
      gridAPI: GridApi
      filterCom?: JSX.Element
    }) => JSX.Element;

    cy.mount(<MobileSearchWrapper gridAPI={emptyGridAPI} filterCom={<div data-cy='TEST'>HIII THERE</div>}/>);
    cy.getBySel('showModal').click();
    cy.getBySel('mobileFilterButton').click();
    cy.getBySel('modalBox').should('be.visible');
    cy.getBySel('TEST').should('be.visible');
    cy.getBySel('TEST').contains('HIII THERE');
  });
});
