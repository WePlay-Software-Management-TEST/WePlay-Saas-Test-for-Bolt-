import React from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';
import { type TournamentFormType } from 'features/tournament/models/tournamentForm.model';
import { ReactComponent as CalendarIcon } from 'assets/svgs/Calendar.svg';
import { ReactComponent as ArrowLeft } from 'assets/svgs/arrow-circle-left.svg';
import { ReactComponent as ArrowRight } from 'assets/svgs/arrow-circle-right.svg';
import { formatDate } from 'core/utils/utils';

/**
 * Renders an inline DatePicker with two months for selecting a start and end date.
 * It connects to a react-hook-form context to get and set date values.
 */
export function DateRangeCalendar ({
  minDate = new Date()
}): JSX.Element {
  const { watch, setValue } = useFormContext<TournamentFormType>();

  const startDate = watch('startDate');
  const endDate = watch('finishDate');

  const handleDateChange = (dates: [Date | null, Date | null]): void => {
    const [start, end] = dates;
    setValue('startDate', start, { shouldDirty: true });
    setValue('finishDate', end, { shouldDirty: true });
  };

  return (
    <DatePicker
      showPopperArrow={false}
      icon={<CalendarIcon />}
      wrapperClassName='w-full'
      calendarClassName='p-6 !border-grey-90 !rounded-xl !border-t-0 !flex gap-4'
      formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
      weekDayClassName={() => '!text-grey-70 !font-semibold !text-lg h-[35px] !w-[35px] !flex justify-center items-center tracking-[0.09] leading-[120%]'}
      className='w-full placeholder:text-grey-40 focus:outline-none focus:border-none !pl-0 text !font-normal text-[100%]'
      popperPlacement='top'
      popperClassName='!z-[1000] !shadow-2xl !rounded-xl !-top-2'
      selected={startDate}
      startDate={startDate ?? undefined}
      endDate={endDate ?? undefined}
      onChange={handleDateChange}
      monthsShown={2}
      selectsRange
      minDate={minDate}
      inline
      renderCustomHeader={({ monthDate, customHeaderCount, date, decreaseMonth, increaseMonth }) => {
        const HeaderDate = monthDate ?? date;
        return (
          <div className="flex justify-between items-center m-1">
            <span className="!font-semibold !text-base !text-grey-40 leading-[120%] tracking-[0.08]">
              {formatDate(HeaderDate, { month: 'long', year: 'numeric' })}
            </span>
            <span className="flex gap-4">
              <button data-cy='decreaseMonthBtn' type='button' onClick={decreaseMonth}>
                <ArrowLeft />
              </button>
              <button data-cy='increaseMonthBtn' type='button' onClick={increaseMonth}>
                <ArrowRight />
              </button>
            </span>
          </div>
        );
      }}
    />
  );
}
