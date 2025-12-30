import React, { useState } from 'react';
import GlobalActionHeader from 'core/layout/globalActionHeader';
import headerTranslation from 'i18n/english/header.json';

describe('GlobalActionHeader', () => {
  beforeEach(() => {
    const WrappedHeader = (): JSX.Element => {
      const [query, setQuery] = useState('');
      const fakeQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(e);
        setQuery(e.target.value);
      };
      return (
        <div className='flex flex-col w-full h-full'>
          <GlobalActionHeader queryInput={fakeQuery} />
          {query !== '' && <p data-cy='fake-query'>{query}</p>}
        </div>
      );
    };

    cy.mount(<WrappedHeader />);
  });

  it('Should have an input field & Dropdown button', () => {
    cy.getBySel('global-filter-input').should('be.visible');
    cy.getBySel('dropwdownText').should('be.visible').should('have.text', 'Create New')
      .click();
    cy.getBySel('globalActionOption').each(($el, index) => {
      const key = `option${index + 1}` as keyof typeof headerTranslation;
      cy.wrap($el).contains(headerTranslation[key]).should('be.visible');
    });
  });

  it('Should print out correct user input', () => {
    cy.getBySel('fake-query').should('not.exist');
    cy.getBySel('global-filter-input').should('be.visible').type('HEYYYY');
    cy.getBySel('fake-query').should('be.visible').should('have.text', 'HEYYYY');
  });

  it('Filter input character limit is 40', () => {
    cy.getBySel('global-filter-input').type(`it is a long established fact that a reader will be 
    distracted by the readable content of a page 
    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
    distribution of letters, as opposed to using 'Content here, content here', making it look like 
    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as 
    their default model text, and a search for 'lorem ipsum' will `);
    cy.getBySel('fake-query').invoke('text').its('length').should('be.eq', 40);
  });

  it('On Mobile, search bar should be replaced with a button', () => {
    cy.viewport(390, 880);
    cy.getBySel('global-filter-input').should('be.not.visible');
    cy.getBySel('mobileSearchNav').should('be.visible').click();
  });
});
