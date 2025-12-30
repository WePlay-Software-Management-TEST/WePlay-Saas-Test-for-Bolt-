import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { DateRangeInput, type DateRangeInputProps } from 'core/components/input/DateRangeInput';
import { type TournamentFormType } from 'features/tournament/models/tournamentForm.model';

const WrappedDateRangeInput = (props: Partial<DateRangeInputProps>): JSX.Element => {
  const methods = useForm<TournamentFormType>({
    defaultValues: {
      startDate: null,
      finishDate: null
    }
  });

  const baseProps: DateRangeInputProps = {
    startFieldName: 'startDate',
    endFieldName: 'finishDate',
    legendText: 'Starting & Ending Dates',
    placeholder: 'Select a date range',
    cyData: 'date-range-picker',
    id: 'date-range-picker',
    fieldState: { isDirty: false, isTouched: false, invalid: false },
    ...props
  };

  return (
    <FormProvider {...methods}>
      <div className="p-4 w-[600px]">
        <DateRangeInput {...baseProps} />
      </div>
    </FormProvider>
  );
};

describe('<DateRangeInput />', () => {
  it('renders correctly with a placeholder and legend', () => {
    cy.mount(<WrappedDateRangeInput />);
    cy.getBySel('inputLegend').contains('Starting & Ending Dates');
    cy.getBySel('date-range-picker').should('have.attr', 'placeholder', 'Select a date range');
  });

  it('should open a popper with read-only date inputs when clicked', () => {
    cy.mount(<WrappedDateRangeInput />);
    cy.get('[data-popper-placement]').should('not.exist');

    cy.getBySel('date-range-picker').click();

    cy.get('[data-popper-placement]').should('be.visible');

    cy.get('#startDate').should('be.visible');
    cy.get('#finishDate').should('be.visible');

    cy.get('#startDate').should('have.attr', 'readonly');
    cy.get('#finishDate').should('have.attr', 'readonly');

    cy.get('.react-datepicker__month-container').should('have.length', 2);
  });

  it('should select a start and end date relative to today', () => {
    cy.mount(<WrappedDateRangeInput />);
    cy.getBySel('date-range-picker').click();

    const today = new Date();
    const startDay = today.getDate();
    const endDay = startDay + 5;

    cy.get('.react-datepicker__month-container')
      .first()
      .contains('.react-datepicker__day', new RegExp(`^${startDay}$`))
      .click();

    cy.get('.react-datepicker__month-container')
      .first()
      .contains('.react-datepicker__day', new RegExp(`^${endDay}$`))
      .click();

    cy.getBySel('date-range-picker')
      .invoke('val')
      .should('contain', startDay)
      .and('contain', endDay);
  });

  it('should render a single, functional set of navigation arrows across two months', () => {
    cy.mount(<WrappedDateRangeInput />);
    cy.getBySel('date-range-picker').click();

    cy.get('.react-datepicker__header')
      .first()
      .find('button')
      .should('have.length', 2);

    cy.get('.react-datepicker__header')
      .first()
      .find('button svg')
      .should('exist');

    cy.get('.react-datepicker__header')
      .last()
      .find('button')
      .should('have.length', 2);

    cy.get('.react-datepicker__header')
      .last()
      .find('button svg')
      .should('exist');

    let initialMonth: string;
    cy.get('.react-datepicker__header')
      .first()
      .find('span')
      .first()
      .then(($span) => {
        initialMonth = $span.text();
        cy.getBySel('increaseMonthBtn').last().click();
        cy.get('.react-datepicker__header').first().find('span').first().should('not.contain.text', initialMonth);
      });
  });
});
