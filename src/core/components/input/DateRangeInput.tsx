import React from 'react';
import { useFormContext } from 'react-hook-form';
import { type InputProps } from 'core/models/input.model';
import { type CalendarInputProps } from './calendar';
import { DateRangeCalendar } from './DateRangeCalendar';
import SelectInput from './selectInput';
import { CalendarInput } from './calendar';
import { formatDate } from 'core/utils/utils';

export interface DateRangeInputProps extends Omit<InputProps, 'registrationOption'> {
  startFieldName: string
  endFieldName: string
}

/**
 * A self-contained component for selecting a start and end date range.
 * It uses a popper to show two calendar inputs in the header and a
 * two-month inline calendar in the body.
 */
export function DateRangeInput (props: DateRangeInputProps): JSX.Element {
  const { control, register, getFieldState, formState, watch } = useFormContext();
  const { startFieldName, endFieldName, legendText, placeholder, cyData } = props;

  const startDateValue = watch(startFieldName);
  const finishDateValue = watch(endFieldName);

  const startDateProps: CalendarInputProps = {
    ...props,
    legendText: 'Start Date',
    placeholder: 'Select Date',
    id: 'startDate',
    fieldNameControl: startFieldName,
    cyData: `${cyData as string}-start`,
    fieldState: getFieldState(startFieldName, formState),
    registrationOption: register(startFieldName, { required: true }),
    formControl: control,
    className: 'mobile:text-sm md:text-base',
    datePickerReadOnly: true
  };

  const endDateProps: CalendarInputProps = {
    ...props,
    legendText: 'End Date',
    placeholder: 'Select Date',
    id: 'finishDate',
    fieldNameControl: endFieldName,
    cyData: `${cyData as string}-end`,
    fieldState: getFieldState(endFieldName, formState),
    registrationOption: register(endFieldName, {
      required: true,
      validate: (value) => {
        const selectedDate = new Date(value ?? '');
        const minimumDate = new Date(startDateValue ?? '');
        return selectedDate.getTime() > minimumDate.getTime() || 'End date must be after start date';
      }
    }),
    formControl: control,
    className: 'mobile:text-sm md:text-base',
    datePickerReadOnly: true
  };

  let dynamicDisplayValue: string | undefined;
  if (startDateValue && finishDateValue) {
    dynamicDisplayValue = `${formatDate(startDateValue, { dateStyle: 'medium' })} - ${formatDate(finishDateValue, { dateStyle: 'medium' })}`;
  } else if (startDateValue) {
    dynamicDisplayValue = formatDate(startDateValue, { dateStyle: 'medium' });
  }

  return (
    <SelectInput
      legendText={legendText}
      placeholder={placeholder}
      id={props.id}
      cyData={cyData}
      usePopperMenu
      hasCustomHeader
      options={[]}
      displayValue={dynamicDisplayValue ?? ''}
      fieldNameControl={endFieldName}
      formControl={control}
      fieldState={getFieldState(endFieldName, formState)}
      registrationOption={register(endFieldName)}
      childrenInHeader={
        <div className="flex justify-start mobile:items-center gap-4 mobile:gap-0">
          <CalendarInput {...startDateProps} />
          <CalendarInput {...endDateProps} />
        </div>
      }
    >
      <DateRangeCalendar />
    </SelectInput>
  );
}
