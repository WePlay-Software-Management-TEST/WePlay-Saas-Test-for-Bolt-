import React from 'react';
import { useForm } from 'react-hook-form';
import { mount } from 'cypress/react18';
import TimeInput from 'core/components/input/timeInput';

const TestWrapper: React.FC<{
  defaultValue?: string | null
  disabled?: boolean
  fieldName?: string
  rules?: object
  error?: any
  [key: string]: any
}> = ({
  defaultValue = '',
  disabled = false,
  fieldName = 'testTime',
  rules = {},
  ...rest
}) => {
  const { control, formState, getFieldState } = useForm({
    defaultValues: { [fieldName]: defaultValue },
    mode: 'onChange'
  });

  if (rest.error) {
    formState.errors[fieldName] = rest.error;
  }

  return (
    <div className="p-4">
      <TimeInput
        formControl={control}
        fieldNameControl={fieldName}
        legendText="Start Time"
        placeholder="Select a time..."
        id="startTime"
        cyData="time-input-test"
        isDisabled={disabled}
        fieldState={getFieldState(fieldName, formState)}
        registrationOption={rest.registrationOption ?? {}}
        {...rest}
      />
    </div>
  );
};

describe('<TimeInput />', () => {
  it('should render correctly with legend and placeholder', () => {
    mount(<TestWrapper />);
    cy.get('[data-cy="inputLegend"]').should('contain', 'Start Time');
    cy.get('input[placeholder="Select a time..."]').should('be.visible');
    cy.get('[data-cy="input-error-span"]').should('not.exist');
  });

  it('should open the time picker on click and allow selecting a time', () => {
    mount(<TestWrapper />);

    cy.get('#startTime').click();

    cy.get('.rc-time-picker-panel-inner').should('be.visible');

    cy.get('.rc-time-picker-panel-select').eq(0).contains('li', '10').click();
    cy.get('.rc-time-picker-panel-select').eq(1).contains('li', '30').click();
    cy.get('.rc-time-picker-panel-select').eq(2).contains('li', 'AM').click();

    cy.get('#startTime').should('have.value', '10 : 30 : AM');
  });

  it('should be disabled when the isDisabled prop is true', () => {
    mount(<TestWrapper disabled={true} />);

    cy.get('fieldset').should('be.disabled');

    cy.get('#startTime').should('be.disabled');

    cy.get('#startTime').click({ force: true });
    cy.get('.rc-time-picker-panel-inner').should('not.exist');
  });

  it('should display an error message when fieldState has an error', () => {
    const error = {
      type: 'manual',
      message: 'Time is required.'
    };
    mount(<TestWrapper error={error} />);

    cy.get('[data-cy="input-error-span"]').should('be.visible').and('contain', 'Time is required.');

    cy.get('fieldset').should('have.class', 'input-error');
  });

  it('should handle an empty initial value without showing "Invalid date"', () => {
    mount(<TestWrapper defaultValue="" />);
    cy.get('#startTime').should('have.value', '');
    cy.get('#startTime').should('not.have.value', 'Invalid date');
  });

  it('should handle a null initial value', () => {
    mount(<TestWrapper defaultValue={null} />);
    cy.get('#startTime').should('have.value', '');
  });
});
