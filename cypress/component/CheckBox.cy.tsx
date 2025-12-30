import React from 'react';
import { CheckBox } from 'core/components/button/checkbox';
import { useForm } from 'react-hook-form';

describe('CheckBox.cy.tsx', () => {
  it('Checkbox component', () => {
    const CheckBoxWrapper = (): JSX.Element => {
      const { register, getValues } = useForm<{ exampleCheckBox: string }>();
      return <>
      <CheckBox value='AYEOTEXT' registrationOption={register('exampleCheckBox')} label='Hi There!'/>
      <p data-cy='pTest'>{getValues().exampleCheckBox}</p>
      </>;
    };
    cy.mount(<CheckBoxWrapper />);
    cy.getBySel('checkboxWeplayLabel').contains('Hi There!').should('be.visible');
    cy.getBySel('checkboxWeplayInput').should('have.value', 'AYEOTEXT').click();
    cy.get('.checkbox-secondary:checked').should('exist');
    cy.getBySel('checkboxWeplayInput').should('have.value', 'AYEOTEXT').click();
    cy.get('.checkbox-secondary:checked').should('not.exist');
  });
});
