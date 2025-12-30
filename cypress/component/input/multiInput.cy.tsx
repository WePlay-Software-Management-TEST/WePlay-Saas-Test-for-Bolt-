import React from 'react';
import MultiInput from 'core/components/input/multiInput';
import { useForm } from 'react-hook-form';
import { type Option } from 'core/models/input.model';

describe('MultiInput.cy.tsx', () => {
  beforeEach(() => {
    const MultiValueWrapper = (): JSX.Element => {
      const { register, getValues, control, formState, getFieldState } = useForm<{ multiInputTest: Option[] }>(
        { defaultValues: { multiInputTest: [] } }
      );
      console.log(getValues('multiInputTest'));
      return <>
      <MultiInput
        isMulti
        fieldState={getFieldState('multiInputTest', formState)}
        placeholder='TestPlaceHolder' id='TestID' cyData='cydataTest'
        formControl={control} registrationOption={register('multiInputTest')}
        legendText='TEst MultiInput' fieldNameControl='multiInputTest'/>
      { getValues('multiInputTest')?.map((item, index) => <div data-cy='labelCell' key={index}>{item.value}</div>) }
      </>;
    };
    cy.mount(<MultiValueWrapper />);
  });

  it('MultiValue Should Display Legend & the placeholder', () => {
    cy.contains('TEst MultiInput').should('be.visible');
    cy.contains('TestPlaceHolder').should('be.visible');
  });

  it('MultiValue Should not show menu, but menu should be in the DOM', () => {
    cy.get('input').first().focus();
    cy.get('input').first().type('Hey there', { delay: 100 });
    cy.get('.cyMenuMulti').should('exist');
    cy.get('.cyMenuMulti').should('not.be.visible');
  });

  // TODO: Tab keydown is not supported in Cypress.
  it('MultiValue Should add new chip when "Tab" or "Enter" have been clicked', () => {
    cy.get('input').first().type('Test1343243', { delay: 100 }).type('{enter}');
    cy.get('input').first().type('Test1343243', { delay: 100 }).type('{enter}');
    cy.get('input').first().type('Test1343246', { delay: 100 }).type('{enter}');
    cy.get('input').first().type('Test2343243', { delay: 100 }).type('{enter}');
    cy.get('.testMultiValue').should('have.length', 3);
  });

  it('MultiValue should remove chips', () => {
    cy.get('input').first().type('Test1343243', { delay: 100 }).type('{enter}');
    cy.get('input').first().type('Test1343243', { delay: 100 }).type('{enter}');
    cy.get('input').first().type('Test1343246', { delay: 100 }).type('{enter}');
    cy.get('input').first().type('Test2343243', { delay: 100 }).type('{enter}');
    cy.get('.testMultiValue').should('have.length', 3);
    cy.get('.multiValueRemoveTest').first().click();
    cy.get('.testMultiValue').should('have.length', 2);

    cy.get('.multiValueRemoveTest').first().click();
    cy.get('.testMultiValue').should('have.length', 1);

    cy.get('.multiValueRemoveTest').first().click();
    cy.get('.testMultiValue').should('have.length', 0);
  });
});
