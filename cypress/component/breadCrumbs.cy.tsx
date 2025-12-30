import React from 'react';
import BreadCrumbs from 'core/components/breadcrumbs/breadCrumbs';
import { type BreadCrumbsProps } from 'core/models/breadcrumbs.model';

describe('Check if BreadCrumbs renders correctly', () => {
  beforeEach(() => {
    const BreadCrumbsWrapper = (): JSX.Element => {
      const props: BreadCrumbsProps = {
        links: [
          {
            path: '/create',
            name: 'Create'
          },
          {
            path: '/create/James',
            name: 'James Dean'
          },
          {
            path: '/create/James/Dean',
            name: 'Edit James Dean'
          },
          {
            path: '/create/James/Dean',
            name: 'Edit James Dean'
          }
        ]
      };
      return (
        <>
        <BreadCrumbs {...props}/>
        </>
      );
    };
    cy.mount(<BreadCrumbsWrapper />);
  });
  it('Does the styles meet our Design System', () => {
    cy.getBySel('main-breadcrumbs-container').should('be.visible');

    cy.getBySel('last-child-breadcrumb')
      .should('be.visible')
      .should('have.length', 1)
      .should('have.class', 'font-bold')
      .should('have.class', 'text-sm')
      .contains('Edit James Dean');

    cy.getBySel('child-breadcrumb').should('have.length', 3);

    cy.getBySel('child-breadcrumb').first()
      .should('have.class', 'before:!border-0')
      .contains('Create');

    cy.getBySel('child-breadcrumb').last()
      .should('not.have.class', 'before:!border-0')
      .contains('Edit James Dean');

    cy.getBySel('back-button-breadcrumb').should('be.visible').should('have.length', 1);
  });
});

describe('When things go unexpected', () => {
  it('When links props gets passed as an empty array', () => {
    const BreadCrumbsWrapper = (): JSX.Element => {
      const props: BreadCrumbsProps = {
        links: []
      };
      return (
        <>
        <BreadCrumbs {...props}/>
        </>
      );
    };
    cy.mount(<BreadCrumbsWrapper />);
    cy.getBySel('main-breadcrumbs-container').should('not.exist');
  });
  it('When links props gets passed as array over 8 elements', () => {
    const BreadCrumbsWrapper = (): JSX.Element => {
      const props: BreadCrumbsProps = {
        links: [
          {
            path: '/create',
            name: 'Create'
          },
          {
            path: '/create/James',
            name: 'James Dean'
          },
          {
            path: '/create/James/Dean',
            name: 'Edit James Dean'
          },
          {
            path: '/create/James/Dean',
            name: 'Edit James Dean'
          },
          {
            path: '/create/James/Dean',
            name: 'Edit James Dean'
          },
          {
            path: '/create/James/Dean',
            name: 'Edit James Dean'
          },
          {
            path: '/create',
            name: 'Create'
          },
          {
            path: '/create/James',
            name: 'James Dean'
          }
        ]
      };
      return (
        <>
        <BreadCrumbs {...props}/>
        </>
      );
    };
    cy.mount(<BreadCrumbsWrapper />);
    cy.getBySel('main-breadcrumbs-container').should('not.exist');
  });
});
