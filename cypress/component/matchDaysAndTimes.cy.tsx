import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { mount } from 'cypress/react18';
import { MatchDaysAndTime } from 'core/components/input/matchDaysAndTimes';
import { AllCaptoOption } from 'core/utils/utils';

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const dayOptions = weekDays.map(k => AllCaptoOption(k));

const noopReg = {
  onChange: () => {},
  onBlur: () => {},
  name: 'noop',
  ref: () => {}
} as const;

function TestHost (): JSX.Element {
  const methods = useForm({
    defaultValues: {
      daysOfMatches: [],
      matchDaysAndTimes: {} satisfies Record<string, { startTime?: string, endTime?: string }>
    },
    mode: 'onChange'
  });

  const props = {
    legendText: 'Match days & times',
    placeholder: 'Select',
    id: 'matchDaysAndTimes',
    cyData: 'matchDaysAndTimes',
    formControl: methods.control,
    fieldNameControl: 'daysOfMatches',
    usePopperMenu: true,
    hasCustomHeader: true,
    customHeaderText: 'Match days & times',
    daysFieldName: 'daysOfMatches',
    timeRangesFieldName: 'matchDaysAndTimes',
    dayOptions,
    showRequired: 'required' as const,
    registrationOption: noopReg as any,
    fieldState: methods.getFieldState
      ? methods.getFieldState('daysOfMatches')
      : { isDirty: false, isTouched: false, invalid: false }
  };

  return (
    <FormProvider {...methods}>
      <div style={{ padding: 24, width: 800 }}>
        <MatchDaysAndTime {...props} />
      </div>
    </FormProvider>
  );
}

const openPopper = (): void => {
  cy.contains('[data-cy="inputLegend"]', 'Match days & times').click();
};

const dayRow = (label: RegExp | string): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.contains('span.capitalize', label).parents('div.flex.items-center');

const timeInputId = (
  rangesField: string,
  day: string,
  which: 'start' | 'end'
): string => `${rangesField}.${day}.${which === 'start' ? 'startTime' : 'endTime'}-input`;

const openTimePanel = (
  rowAlias: string,
  which: 'start' | 'end',
  day: string,
  rangesField = 'matchDaysAndTimes'
): void => {
  const id = timeInputId(rangesField, day, which);
  cy.get(rowAlias).within(() => {
    cy.get(`input.rc-time-picker-input[id="${id}"]`).click();
  });
};

const getTimeInputs = (rowAlias: string): Cypress.Chainable<JQuery<HTMLElement>> =>
  cy.get(rowAlias).find('.rc-time-picker-input');

const pickTime = (opts: { hour?: string, minute?: string, meridian?: 'AM' | 'PM' }): void => {
  if (opts.hour) cy.get('.rc-time-picker-panel').contains('li', new RegExp(`^${opts.hour}$`)).click({ force: true });
  if (opts.minute) cy.get('.rc-time-picker-panel').contains('li', new RegExp(`^${opts.minute}$`)).click({ force: true });
  if (opts.meridian)cy.get('.rc-time-picker-panel').contains('li', opts.meridian).click({ force: true });
  // cy.get('body').click(0, 0);
};

describe('<MatchDaysAndTime />', () => {
  it('opens popper on click and shows all day rows', () => {
    mount(<TestHost />);
    openPopper();
    cy.get('[data-cy="header-cancel-button"]').should('exist');
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(d => {
      cy.contains('span.capitalize', new RegExp(d, 'i')).should('exist');
    });
  });

  it('enables time inputs with seeded defaults when a day is selected', () => {
    mount(<TestHost />);
    openPopper();

    dayRow(/monday/i).as('mon');
    getTimeInputs('@mon').eq(0).should('be.disabled');
    getTimeInputs('@mon').eq(1).should('be.disabled');

    cy.get('@mon').find('input[type="checkbox"]').click({ force: true });
    cy.get('@mon').find('.rc-time-picker-input').eq(0).should('not.be.disabled');
    cy.get('@mon').find('.rc-time-picker-input').eq(1).should('not.be.disabled');
  });

  it('validates end > start and ≥ 45 mins using the rc-time-picker panel', () => {
    mount(<TestHost />);
    openPopper();

    dayRow(/tuesday/i).as('tue');
    cy.get('@tue').find('input[type="checkbox"]').click({ force: true });

    openTimePanel('@tue', 'end', 'tuesday');
    pickTime({ hour: '08', minute: '00', meridian: 'AM' });
    cy.get('[data-cy="input-error-span"]').should('contain.text', 'End time must be after start time');

    openTimePanel('@tue', 'start', 'tuesday');
    pickTime({ hour: '07', minute: '07', meridian: 'AM' });
    openTimePanel('@tue', 'end', 'tuesday');
    pickTime({ hour: '07', minute: '22', meridian: 'AM' });
    cy.get('[data-cy="input-error-span"]').should('contain.text', 'Duration must be at least 45 minutes');
  });

  it('re-validates end when start changes (trigger on start onChange)', () => {
    mount(<TestHost />);
    openPopper();

    dayRow(/wednesday/i).as('wed');
    cy.get('@wed').find('input[type="checkbox"]').click({ force: true });

    openTimePanel('@wed', 'end', 'wednesday');
    pickTime({ hour: '09', minute: '00', meridian: 'AM' });
    cy.get('[data-cy="input-error-span"]').should('not.exist');

    openTimePanel('@wed', 'start', 'wednesday');
    pickTime({ hour: '08', minute: '45', meridian: 'AM' });

    cy.get('[data-cy="input-error-span"]').should('contain.text', 'Duration must be at least 45 minutes');
  });

  it('shows a live summary in the readonly trigger input', () => {
    mount(<TestHost />);
    openPopper();

    dayRow(/friday/i).as('fri');
    cy.get('@fri').find('input[type="checkbox"]').click({ force: true });

    cy.get('[data-cy="header-cancel-button"]').click();

    cy.contains('[data-cy="inputLegend"]', 'Match days & times')
      .parents('fieldset')
      .find('input[readonly]')
      .should('have.value', 'friday  08 : 00 : AM-08 : 00 : PM');
  });
});
