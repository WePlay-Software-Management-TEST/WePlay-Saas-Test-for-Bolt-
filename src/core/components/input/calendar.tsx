import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as CalendarIcon } from 'assets/svgs/Calendar.svg';
import { ReactComponent as ArrowLeft } from 'assets/svgs/arrow-circle-left.svg';
import { ReactComponent as ArrowRight } from 'assets/svgs/arrow-circle-right.svg';
import { formatDate } from 'core/utils/utils';
import { type InputProps } from 'core/models/input.model';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Input from './input';

export interface CalendarInputProps extends InputProps {
  fieldNameControl: string
  datePickerReadOnly?: boolean
};

export function CalendarInput (props: CalendarInputProps): JSX.Element {
  return (
    <Controller
    control={props.formControl}
    name={props.fieldNameControl}
    render={({ field }) => {
      return (<Input {...props}>
        <DatePicker
        placeholderText={props.placeholder}
        readOnly={props.datePickerReadOnly}
        showIcon
        id={props.id}
        minDate={new Date()}
        portalId="datepicker-portal"
        showPopperArrow={false}
        icon={<CalendarIcon />}
        wrapperClassName='w-full'
        calendarClassName='p-6 !border-grey-90 !rounded-xl'
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        weekDayClassName={() => '!text-grey-70 !font-semibold !text-lg h-[35px] !w-[35px] !flex justify-center items-center tracking-[0.09] leading-[120%]'}
        className='w-full h-[38px] placeholder:text-grey-40 focus:outline-none focus:border-none !pl-0 text !font-normal text-[100%]'
        onChange={(date) => { field.onChange(date); }}
        popperPlacement='top'
        popperClassName='!z-[1000] !shadow-2xl !rounded-xl !-top-2'
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth
        }) => {
          return (<div className='flex justify-between pb-10'>
            <span className='!font-semibold !text-base !text-grey-40 leading-[120%] tracking-[0.08]'>
              { formatDate(date)}
            </span>
            <span className='flex gap-4'>
              <button onClick={decreaseMonth}><ArrowLeft/></button>
              <button onClick={increaseMonth}><ArrowRight/></button>
            </span>
          </div>);
        }}
        selected={field.value}
        />
    </Input>);
    }}
    />
  );
};
