import React from 'react';
import SelectInput from 'core/components/input/selectInput';
import { type ExtendedSelectDropdownProps } from 'core/models/input.model';
import { useForm } from 'react-hook-form';
import ImageCacheProvider from 'core/context/imageCacheContext/imageCacheContext.provider';

const WrappedSelect = (props: Partial<ExtendedSelectDropdownProps> & { children?: React.ReactNode }): JSX.Element => {
  const { control, register, getFieldState } = useForm<{ testSelect: any }>({
    defaultValues: { testSelect: props.isMulti ? [] : '' }
  });

  const baseProps: ExtendedSelectDropdownProps = {
    formControl: control,
    options: [
      { value: 'test1', label: 'TEST1' },
      { value: 'test2', label: 'TEST2' },
      { value: 'test3', label: 'TEST3' }
    ],
    fieldNameControl: 'testSelect',
    legendText: 'Legend Text',
    placeholder: 'Some placeholder',
    cyData: 'TestDropdown',
    id: 'Someid',
    fieldState: getFieldState('testSelect'),
    registrationOption: register('testSelect'),
    ...props
  };

  return <div className='w-96 p-4'><SelectInput {...baseProps}>{props.children}</SelectInput></div>;
};

const openSelect = (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('#Someid').find('[class*="-control"]').click();
};

describe('Renders Correctly', () => {
  it('Does it meet our Design System', () => {
    cy.mount(<WrappedSelect />);
    cy.getBySel('inputLegend').contains('Legend Text');
    cy.getBySel('TestDropdown').parents('[class*="-container"]').contains('Some placeholder');

    openSelect();

    cy.get('[class*="-option"]').contains('TEST1').should('be.visible');
    cy.get('[class*="-option"]').contains('TEST2').click();

    cy.getBySel('TestDropdown').parents('[class*="-container"]').contains('TEST2');
    cy.getBySel('TestDropdown').parents('[class*="-container"]').contains('Some placeholder').should('not.exist');
  });

  it('Should show "no options" when options prop is empty', () => {
    cy.mount(<WrappedSelect options={[]} />);
    openSelect();
    cy.contains('No options');
  });
});

describe('Custom Header Functionality', () => {
  beforeEach(() => {
    cy.mount(
      <WrappedSelect
        hasCustomHeader
        customHeaderText='My Custom Header'
      />
    );
  });

  it('should display the custom header and cancel button when opened', () => {
    openSelect();
    cy.contains('My Custom Header').should('be.visible');
    cy.getBySel('header-cancel-button').should('be.visible');
  });

  it('should close the menu when the cancel button is clicked', () => {
    openSelect();
    cy.get('[class*="-menu"]').should('be.visible');
    cy.getBySel('header-cancel-button').click();
    cy.get('[class*="-menu"]').should('not.exist');
  });

  it('should rotate the dropdown arrow correctly when the menu is opened and closed', () => {
    const indicator = (): Cypress.Chainable<JQuery<HTMLElement>> => cy.get('[class*="IndicatorsContainer"]');

    indicator().should('not.have.class', '!rotate-180');
    openSelect();
    indicator().should('have.class', '!rotate-180');
    cy.getBySel('header-cancel-button').click();
    indicator().should('not.have.class', '!rotate-180');
  });
});

describe('Checkbox Functionality', () => {
  it('should display checkboxes on the left of the label', () => {
    cy.mount(<WrappedSelect isMulti checkboxPosition='left' />, {}, ImageCacheProvider);
    openSelect();

    cy.contains('span.label-text', 'TEST1')
      .parent()
      .children()
      .first()
      .should('have.attr', 'type', 'checkbox');
  });

  it('should display checkboxes on the right of the label', () => {
    cy.mount(<WrappedSelect isMulti checkboxPosition='right' />);
    openSelect();

    cy.contains('span.label-text', 'TEST1').parent().find('input[type="checkbox"]').should('exist');
  });

  it('should check the box when an option is selected', () => {
    cy.mount(<WrappedSelect isMulti checkboxPosition='left' />, {}, ImageCacheProvider);
    openSelect();

    const test1Option = cy.contains('span.label-text', 'TEST1');
    test1Option.parent().find('input[type="checkbox"]').should('not.be.checked');
    test1Option.click();
    test1Option.parent().find('input[type="checkbox"]').should('be.checked');
  });
});

describe('Menu Only Mode', () => {
  it('should hide the input control box and display the menu immediately', () => {
    cy.mount(<WrappedSelect menuOnly />, {}, ImageCacheProvider);
    cy.get('[class*="-control"]').should('have.class', '!h-0');
    cy.getBySel('inputLegend').should('not.exist');
    cy.get('[class*="-menu"]').should('be.visible');
    cy.contains('TEST1').should('be.visible');
  });
});

describe('Popper Menu Functionality', () => {
  const PopperContent = (): JSX.Element => <div data-cy="popper-child" className="p-4">Hello from Popper</div>;

  it('should open the popper on click and display children', () => {
    cy.mount(<WrappedSelect usePopperMenu><PopperContent /></WrappedSelect>);
    cy.getBySel('popper-child').should('not.exist');
    cy.getBySel('TestDropdown').click();
    cy.getBySel('popper-child').should('be.visible').and('contain', 'Hello from Popper');
  });

  it('should close the popper when clicking outside', () => {
    cy.mount(<WrappedSelect usePopperMenu><PopperContent /></WrappedSelect>);
    cy.getBySel('TestDropdown').click();
    cy.getBySel('popper-child').should('be.visible');
    cy.get('body').click(0, 0);
    cy.getBySel('popper-child').should('not.exist');
  });

  it('should display and use the custom header in popper mode', () => {
    cy.mount(
      <WrappedSelect usePopperMenu hasCustomHeader customHeaderText='Popper Header'>
        <PopperContent />
      </WrappedSelect>
    );
    cy.getBySel('TestDropdown').click();
    cy.contains('Popper Header').should('be.visible');
    cy.getBySel('header-cancel-button').click();
    cy.getBySel('popper-child').should('not.exist');
  });
});
