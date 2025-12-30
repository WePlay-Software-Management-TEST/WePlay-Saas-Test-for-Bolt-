import React from 'react';
import DropdownButton from 'core/components/button/dropdownButton';
import { type DropDownButtonProps } from 'core/models/button.model';

describe('DropdownButton.cy.tsx', () => {
  it('Legend text and placeholder should appear as is', () => {
    const DropDownWrapper = (): JSX.Element => {
      const props: DropDownButtonProps = {
        buttonText: 'Hey there!',
        cyData: 'testDropDownButton',
        options: ['Hey There Booo']
      };
      return (
      <>
        <DropdownButton {...props}/>
      </>
      );
    };
    cy.mount(<DropDownWrapper />);
    cy.getBySel('dropdown-option').first().should('not.be.visible');
    cy.getBySel('arrowIconSVG')
      .should('have.class', 'fill-grey-10');
    cy.getBySel('testDropDownButton')
      .should('be.visible')
      .contains('Hey there!')
      .click();

    cy.getBySel('dropdown-option').should('have.length', 1)
      .first()
      .should('be.visible')
      .contains('Hey There Booo');
  });

  it('When children gets passed it should render them instead of default ones', () => {
    const DropDownWrapper = (): JSX.Element => {
      const children = (): JSX.Element => {
        return (<h1 data-cy='childwePassed'> Hi </h1>);
      };

      const props: DropDownButtonProps = {
        buttonText: 'Hey there!!',
        cyData: 'testDropDownButton',
        options: ['Hey There Booo']
      };
      return (
        <>
          <DropdownButton {...props}>{children()}</DropdownButton>
        </>
      );
    };
    cy.mount(<DropDownWrapper />).then(() => {
      cy.getBySel('testDropDownButton')
        .should('be.visible')
        .contains('Hey there!!')
        .click();
      cy.getBySel('childwePassed').should('have.length', 1)
        .first()
        .should('be.visible')
        .contains('Hi');
    });
  });

  it('passing classNames to Dropdown button should affect the dropdown button classes', () => {
    const DropDownWrapper = (): JSX.Element => {
      const children = (): JSX.Element => {
        return (<h1 data-cy='childwePassed'> Hi </h1>);
      };

      const props: DropDownButtonProps = {
        buttonText: 'Hey there!!',
        cyData: 'testDropDownButton',
        options: ['Hey There Booo'],
        className: '!text-dodger-blue-60 !w-15 !h-15'
      };
      return (
        <>
          <DropdownButton {...props}>{children()}</DropdownButton>
        </>
      );
    };
    cy.mount(<DropDownWrapper />).then(() => {
      cy.getBySel('testDropDownButton')
        .should('be.visible')
        .should('have.class', '!text-dodger-blue-60')
        .should('have.class', '!w-15')
        .should('have.class', '!h-15')
        .contains('Hey there!!')
        .click();
      cy.getBySel('childwePassed').should('have.length', 1)
        .first()
        .should('be.visible')
        .contains('Hi');
    });
  });
  it('Passing DropDownType props to dropdownButton', () => {
    const DropDownWrapper = (): JSX.Element => {
      const children = (): JSX.Element => {
        return (<h1 data-cy='childwePassed'> Hi </h1>);
      };

      const props: DropDownButtonProps = {
        buttonText: 'Hey there!!',
        cyData: 'testDropDownButton',
        options: ['Hey There Booo'],
        dropDownType: 'primary'
      };
      return (
        <>
          <DropdownButton {...props}>{children()}</DropdownButton>
        </>
      );
    };
    cy.mount(<DropDownWrapper />).then(() => {
      cy.getBySel('arrowIconSVG')
        .should('have.class', 'fill-white');
      cy.getBySel('testDropDownButton')
        .should('be.visible')
        .contains('Hey there!!')
        .click();
      cy.getBySel('childwePassed').should('have.length', 1)
        .first()
        .should('be.visible')
        .contains('Hi');
    });
  });
});
