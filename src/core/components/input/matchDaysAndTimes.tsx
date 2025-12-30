import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SelectInput from './selectInput';
import TimeInput from './timeInput';
import { type ExtendedSelectDropdownProps, type Option } from 'core/models/input.model';
import moment from 'moment';
import { fmt } from 'core/utils/utils';

export interface MatchDaysAndTimeProps extends ExtendedSelectDropdownProps {
  daysFieldName: string
  timeRangesFieldName: string
  dayOptions: Option[]
}

/**
 * A composite input component that displays a list of all days, allowing users to
 * select a day with a checkbox and set its start/end time.
 * Time inputs are disabled until a day is selected.
 */
export function MatchDaysAndTime ({
  daysFieldName,
  timeRangesFieldName,
  dayOptions,
  ...props
}: MatchDaysAndTimeProps): JSX.Element {
  const { control, watch, register, getFieldState, formState, getValues, trigger, setValue } = useFormContext();

  const days = watch(daysFieldName);
  const ranges = watch(timeRangesFieldName);

  const selectedDays = Array.isArray(days) ? (days as Option[]) : [];

  const summary = selectedDays.length === 0
    ? (props.placeholder ?? 'Select')
    : selectedDays.map((day) => {
      const r = ranges?.[day.value] ?? {};
      const text = fmt(r.startTime, r.endTime);
      return text ? `${day.label} ${text}` : day.label;
    }).join(', ');

  useEffect(() => {
    dayOptions.forEach((day) => {
      const startField = `${timeRangesFieldName}.${day.value}.startTime`;
      const endField = `${timeRangesFieldName}.${day.value}.endTime`;

      if (!getValues(startField)) {
        setValue(startField, '08 : 00 : AM', { shouldDirty: false });
      }
      if (!getValues(endField)) {
        setValue(endField, '08 : 00 : PM', { shouldDirty: false });
      }
    });
  }, [dayOptions, getValues, setValue, timeRangesFieldName]);

  return (
    <SelectInput {...props} displayValue={summary} placeholder={props.placeholder} selectEntireOption={false} usePopperMenu={true}>
      <div className="p-4 flex flex-col">
        {dayOptions.map((dayOption) => {
          const isSelected = selectedDays.some((d) => d.value === dayOption.value);
          const fieldNamePrefix = `${timeRangesFieldName}.${dayOption.value}`;
          const startFieldName = `${fieldNamePrefix}.startTime`;
          const endFieldName = `${fieldNamePrefix}.endTime`;

          const endTimeRules = {
            validate: (endTimeValue: string | null) => {
              if (!isSelected) return true;

              const startTimeValue = getValues(startFieldName);
              if (!startTimeValue || !endTimeValue) return true;

              const format = 'hh : mm : A';
              const startTime = moment(startTimeValue, format);
              const endTime = moment(endTimeValue, format);

              if (!startTime.isValid() || !endTime.isValid()) return true;

              if (endTime.isSameOrBefore(startTime)) {
                return 'End time must be after start time';
              }
              const minutesDifference = endTime.diff(startTime, 'minutes');
              if (minutesDifference < 45) {
                return 'Duration must be at least 45 minutes';
              }
              return true;
            }
          };

          return (
            <div key={dayOption.value} className="flex items-center gap-4 w-full">
              <Controller
                name={daysFieldName}
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="checkbox checkbox-secondary rounded-md w-5 h-5"
                    checked={isSelected}
                    onChange={() => {
                      const currentSelection: Option[] = field.value ?? [];
                      const newSelection = isSelected
                        ? currentSelection.filter((d) => d.value !== dayOption.value)
                        : [...currentSelection, dayOption];
                      field.onChange(newSelection);
                    }}
                  />
                )}
              />

              <div className="w-1/4">
                <span className={`capitalize ${isSelected ? 'text-grey-10' : 'text-grey-70'}`}>
                  {dayOption.label}
                </span>
              </div>

              <div className="w-3/4 flex-grow flex gap-4">
                <TimeInput
                  legendText="Start Time"
                  placeholder="Start Time"
                  id={`${startFieldName}-input`}
                  fieldNameControl={startFieldName}
                  formControl={control}
                  fieldState={getFieldState(startFieldName, formState)}
                  registrationOption={register(startFieldName)}
                  isDisabled={!isSelected}
                  rules={{
                    onChange: () => {
                      setTimeout(() => { void trigger(endFieldName); }, 0);
                    }
                  }}
                  cyData={`start-time-input-${dayOption.value}`}
                />
                <TimeInput
                  legendText="End Time"
                  placeholder="End Time"
                  id={`${endFieldName}-input`}
                  fieldNameControl={endFieldName}
                  formControl={control}
                  fieldState={getFieldState(endFieldName, formState)}
                  registrationOption={register(endFieldName)}
                  isDisabled={!isSelected}
                  rules={endTimeRules}
                  cyData={`end-time-input-${dayOption.value}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SelectInput>
  );
}
