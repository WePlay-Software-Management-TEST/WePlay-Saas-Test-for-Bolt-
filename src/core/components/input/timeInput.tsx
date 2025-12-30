import React from 'react';
import TimePicker from 'rc-time-picker';
import moment, { type Moment } from 'moment';
import { Controller, type RegisterOptions, type FieldValues, type Path } from 'react-hook-form';
import Input from './input';
import 'rc-time-picker/assets/index.css';
import './timeInput.css';
import { type TimeInputProps as OriginalTimeInputProps } from 'core/models/input.model';

interface TimeInputProps extends OriginalTimeInputProps {
  rules?: Omit<RegisterOptions<FieldValues, Path<FieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

const TimeInput: React.FC<TimeInputProps> = ({
  legendText,
  placeholder,
  id,
  cyData,
  isDisabled,
  fieldState,
  className,
  formControl,
  fieldNameControl,
  minuteStep = 1,
  hourStep = 1,
  showSecond = false,
  popupClassName = 'styled-tp__panel',
  storeAsMoment = false,
  format = 'hh : mm : A',
  rules,
  ...rest
}) => {
  return (
    <Controller
      control={formControl}
      name={fieldNameControl}
      rules={rules}
      render={({ field }) => {
        const toMoment = (v: unknown): Moment | null => {
          if (!v || v === '') {
            return null;
          }
          if (moment.isMoment(v)) {
            return v.isValid() ? v : null;
          }
          if (typeof v === 'string') {
            const parsedMoment = moment(v, format, true);
            return parsedMoment.isValid() ? parsedMoment : null;
          }
          return null;
        };

        const fromMoment = (m: Moment | null): Moment | string | null => {
          if (!m) return storeAsMoment ? null : '';
          return storeAsMoment ? m : m.format(format);
        };

        const valueAsMoment = toMoment(field.value);

        const timePickerInputClass = `
          bg-transparent peer w-full -mt-1 pt-2 h-10 mr-2 focus:outline-none hover:outline-none
          placeholder:body-xs-text placeholder:text-grey-70
          focus:placeholder:text-transparent disabled:text-grey-40
          text-[100%]
        `;

        const timePicker = (
          <TimePicker
            id={id}
            className={timePickerInputClass}
            placeholder={placeholder}
            popupClassName={popupClassName}
            value={valueAsMoment ?? undefined}
            onChange={(m: Moment | null) => { field.onChange(fromMoment(m)); }}
            use12Hours
            showSecond={showSecond}
            format={format}
            minuteStep={minuteStep}
            hourStep={hourStep}
            inputReadOnly
            allowEmpty={false}
            disabled={isDisabled}
          />
        );

        return (
          <Input
            {...rest}
            legendText={legendText}
            id={id}
            cyData={cyData}
            isDisabled={isDisabled}
            fieldState={fieldState}
            className={className}
            placeholder={placeholder}
          >
            {timePicker}
          </Input>
        );
      }}
    />
  );
};

export default TimeInput;
