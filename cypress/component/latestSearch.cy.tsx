import React, { useState } from 'react';
import { LatestSearchProvider } from 'core/context/lastestSearchContext/latestSearchContext.provider';
import { LatestSearch } from 'core/components/table/latestSearch';
import { latestSearchMockData } from '../fixtures/latestSearchMockData';
import { useLatestSearch } from 'core/context/lastestSearchContext/latestSearchContext.consumer';

describe('LatestSearch Component', () => {
  beforeEach(() => {
    const LatestSearchWrapper = (): JSX.Element => {
      const [value, setValue] = useState('');
      const queryInput = (e: string): void => {
        setValue(e);
      };
      return (
          <LatestSearchProvider>
            <>
            <LatestSearch queryInput={queryInput} />
            { value !== '' && <p data-cy='pQueryInput'>{value}</p> }
            </>
          </LatestSearchProvider>
      );
    };
    cy.mount(<LatestSearchWrapper />);
  });

  it('Should not be visible when local storage is empty & Context latest search is empty', () => {
    cy.getBySel('latest-Search-Main-Div').should('have.class', 'hidden');
  });
});

describe('LatestSeach Component with Context provided', () => {
  beforeEach(() => {
    window.localStorage.setItem('aws-amplify-cachelatestSearchCache', JSON.stringify(latestSearchMockData));

    const LatestSearchWrapper = (): JSX.Element => {
      const [value, setValue] = useState('');

      const queryInput = (e: string): void => {
        setValue(e);
      };
      return (
          <LatestSearchProvider>
            <>
            <LatestSearch queryInput={queryInput} />
            { value !== '' && <p data-cy='pQueryInput'>{value}</p> }
            </>
          </LatestSearchProvider>
      );
    };
    cy.mount(<LatestSearchWrapper />);
  });
  it('Should be visible when local storage is not empty', () => {
    window.localStorage.setItem('aws-amplify-cachelatestSearchCache', JSON.stringify(latestSearchMockData));
    cy.getBySel('latest-Search-Main-Div').should('not.have.class', 'hidden');
    cy.getBySel('latest-Search-Main-Div').contains('Last Searched').should('be.visible');
    cy.getBySel('latestSearchChip').should('have.length', 3);
    cy.getBySel('latestSearchChip').first().contains('Local Cache').should('be.visible');
  });

  it('On Latest Search Chip click, should set value to the chip value', () => {
    cy.getBySel('latestSearchChip').first().click();
    cy.getBySel('pQueryInput').contains('Local Cache').should('be.visible');
  });
});

describe('LatestSearch Context', () => {
  beforeEach(() => {
    window.localStorage.setItem('aws-amplify-cachelatestSearchCache', JSON.stringify(latestSearchMockData));

    const LatestSearchWrapper = (): JSX.Element => {
      const [value, setValue] = useState('');
      const { setLatestSearch } = useLatestSearch();
      const queryInput = (e: string): void => {
        setValue(e);
      };
      const onClear = (): void => {
        setLatestSearch({ type: 'clear' });
      };
      const onAppend = (): void => {
        setLatestSearch({ type: 'append', query: 'TestingContext!!!!!' });
      };
      const onInit = (): void => {
        setLatestSearch({ type: 'init', arrayOfQuery: ['TestContext1', 'TextContext2'] });
      };
      return (
            <>
            <LatestSearch queryInput={queryInput} />
            { value !== '' && <p data-cy='pQueryInput'>{value}</p> }
            <button onClick={onClear} data-cy='clearLatestSearch' className='pr-4'>Clear</button>
            <button onClick={onAppend} data-cy='appendLatestSearch' className='pr-4'>Append</button>
            <button onClick={onInit} data-cy='InitLatestSearch' className='pr-4'>Init</button>
            </>
      );
    };
    cy.mount(<LatestSearchWrapper />, {}, LatestSearchProvider);
  });
  it('On clear LatestSearch component should disappear & localStorage key for it should be cleared', () => {
    cy.getBySel('latest-Search-Main-Div').should('not.have.class', 'hidden');
    cy.getBySel('clearLatestSearch').click();
    cy.getBySel('latest-Search-Main-Div').should('have.class', 'hidden');
    cy.getAllLocalStorage().then((results) => {
      expect(results).to.deep.equal({});
    });
  });

  it('On Append LatestSearch component should add a chip with the name and it should show first', () => {
    cy.getBySel('latest-Search-Main-Div').should('not.have.class', 'hidden');
    cy.getBySel('appendLatestSearch').click();
    cy.getBySel('latestSearchChip').first().contains('TestingContext!!!!!').should('be.visible');
    cy.getBySel('latestSearchChip').last().contains('Ayeo').should('be.visible');
  });

  it('On init LatestSearch component should clear all chips and add new chips with new names', () => {
    cy.getBySel('latest-Search-Main-Div').should('not.have.class', 'hidden');
    cy.getBySel('InitLatestSearch').click();
    cy.getBySel('latestSearchChip').should('have.length', 2);
    cy.getBySel('latestSearchChip').first().contains('TestContext1').should('be.visible');
    cy.getBySel('latestSearchChip').last().contains('TextContext2').should('be.visible');
  });
});

describe('LatestSeach Component without Context provided', () => {
  it('Should throw error', () => {
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include('useLatestSearch must be used within an LatestSearchProvider');
      return false;
    });
    const LatestSearchWrapper = (): JSX.Element => {
      const [value, setValue] = useState('');
      const { setLatestSearch } = useLatestSearch();
      const queryInput = (e: string): void => {
        setValue(e);
      };
      const onInit = (): void => {
        setLatestSearch({ type: 'init', arrayOfQuery: ['TestContext1', 'TextContext2'] });
      };
      return (
            <>
            <LatestSearch queryInput={queryInput} />
            { value !== '' && <p data-cy='pQueryInput'>{value}</p> }
            <button onClick={onInit} data-cy='InitLatestSearch' className='pr-4'>Init</button>
            </>
      );
    };
    cy.mount(<LatestSearchWrapper />);
  });
});
