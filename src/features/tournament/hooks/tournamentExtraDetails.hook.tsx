import { useMemo } from 'react';
import { type UseFormGetValues, type UseFormSetValue, type UseFormWatch, useFormContext } from 'react-hook-form';
import { type AutoCompleteProps, type TeamsOptions, type InputProps, type SelectDropdownProps } from 'core/models/input.model';
import { type CalendarInputProps } from 'core/components/input/calendar';
import { type Fields } from 'API';
import { divisionTypes, supportedSports, matchDuration as matchDurationOptions, weekDays, dailyMatchesByFieldOptions, type TournamentFormType } from '../models/tournamentForm.model';
import { getMinutesDifference, timeToDate } from '../helpers/utils';
import { useTranslation } from 'react-i18next';
import { AllCaptoOption } from 'core/utils/utils';
import { isThereErrorInSubForm } from '../shared/utils';

export interface Props {
  sportTypeDropdown: SelectDropdownProps
  divisionTypesDropdown: SelectDropdownProps
  numOfFieldsDropdown: SelectDropdownProps
  startDateProps: CalendarInputProps
  finishDateProps: CalendarInputProps
  startTimeProps: InputProps
  endTimeProps: InputProps
  dailyMatchesByFieldProps: SelectDropdownProps
  matchesDurationProps: SelectDropdownProps
  daysOfMatchesProps: SelectDropdownProps
  teamsListProps: AutoCompleteProps<TeamsOptions>
  getValues: UseFormGetValues<TournamentFormType>
  setValue: UseFormSetValue<TournamentFormType>
  watch: UseFormWatch<TournamentFormType>
  isValid: boolean
  numOfTeams?: number | null
};

/**
 * Custom hook to manage tournament extra details form fields.
 *
 * @returns {{
 *  isValid: boolean,
 *  sportTypeDropdown: SelectDropdownProps,
 *  divisionTypesDropdown: SelectDropdownProps,
 *  numOfFieldsDropdown: SelectDropdownProps,
 *  startDateProps: CalendarInputProps,
 *  finishDateProps: CalendarInputProps,
 *  startTimeProps: InputProps,
 *  endTimeProps: InputProps,
 *  dailyMatchesByFieldProps: SelectDropdownProps,
 *  matchesDurationProps: SelectDropdownProps,
 *  daysOfMatchesProps: SelectDropdownProps,
 *  teamsListProps: AutoCompleteProps<TeamsOptions>,
 *  showTeamsList: boolean
 * }}
 */
export function useTournamentExtraDetails (fields: Fields[]): Props {
  const {
    control, register,
    formState, getFieldState, watch, getValues, setValue
  } = useFormContext<TournamentFormType>();
  const startTime = watch('startTime');
  const startDate = watch('startDate');
  const matchDuration = watch('matchesDuration');
  const numOfTeams = watch('numOfTeams');

  const isValid = isThereErrorInSubForm(['division', 'numOfFields', 'finishDate', 'endTime', 'daysOfMatches'], getFieldState);

  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourDetailsStep' });

  const sportTypeDropdown: SelectDropdownProps = {
    legendText: translate('sportTypeLabel'),
    placeholder: translate('sportTypePlaceHolder'),
    id: 'sportTypeDropdown',
    cyData: 'sportTypeDropdown',
    fieldNameControl: 'sportType',
    showRequired: 'required',
    fieldState: getFieldState('sportType', formState),
    registrationOption:
      register(
        'sportType',
        { required: true }
      ),
    options: supportedSports.map((key) => AllCaptoOption(key)),
    formControl: control
  };

  const divisionTypesDropdown: SelectDropdownProps = {
    legendText: translate('divisionTypeLabel'),
    placeholder: translate('divisionPlaceHolder'),
    id: 'division',
    cyData: 'division',
    showRequired: 'required',
    fieldNameControl: 'division',
    fieldState: getFieldState('division', formState),
    registrationOption:
      register(
        'division',
        { required: true }
      ),
    options: Object.keys(divisionTypes).map((_, index) => AllCaptoOption(divisionTypes[index], 'LastUpperCase')),
    formControl: control
  };

  const numOfFieldsDropdown: SelectDropdownProps = {
    legendText: translate('numOfFieldsLabel'),
    placeholder: translate('numOfFIeldslaceHolder'),
    id: 'numOfFields',
    cyData: 'numOfFields',
    showRequired: 'required',
    fieldNameControl: 'numOfFields',
    fieldState: getFieldState('numOfFields', formState),
    noOptionsMessage: 'No Fields Found',
    registrationOption:
      register(
        'numOfFields',
        { required: true }
      ),
    options: Array.from({ length: fields.length === 0 ? 1 : fields.length }, (_, index) => AllCaptoOption((index + 1))),
    formControl: control
  };

  const startDateProps: CalendarInputProps = {
    legendText: translate('startDateLabel'),
    placeholder: translate('startDatePlaceHolder'),
    id: 'startDate',
    cyData: 'startDate',
    showRequired: 'required',
    fieldNameControl: 'startDate',
    fieldState: getFieldState('startDate', formState),
    registrationOption:
      register(
        'startDate',
        { required: true }
      ),
    formControl: control
  };

  const finishDateProps: CalendarInputProps = {
    legendText: translate('finishDateLabel'),
    placeholder: translate('finishDatePlaceHolder'),
    id: 'finishDate',
    cyData: 'finishDate',
    showRequired: 'required',
    fieldNameControl: 'finishDate',
    fieldState: getFieldState('finishDate', formState),
    registrationOption:
      register(
        'finishDate',
        {
          required: true,
          validate: (value) => {
            const selectedDate = new Date(value ?? '');
            const minimumDate = new Date(startDate ?? '') ?? new Date();

            return selectedDate.getTime() > minimumDate.getTime() || 'End date should not be less than start date';
          }
        }
      ),
    formControl: control
  };

  const startTimeProps: InputProps = {
    legendText: translate('startTimeabel'),
    placeholder: translate('startTimelaceHolder'),
    inputType: 'time',
    id: 'startTimeInput',
    cyData: 'startTimeInput',
    showRequired: 'required',
    fieldState: getFieldState('startTime', formState),
    registrationOption:
      register(
        'startTime',
        { required: true }
      ),
    formControl: control
  };

  const endTimeProps: InputProps = {
    legendText: translate('endTimeLabel'),
    placeholder: translate('endTimePlaceHolder'),
    id: 'endTimeInput',
    cyData: 'endTimeInput',
    inputType: 'time',
    showRequired: 'required',
    fieldState: getFieldState('endTime', formState),
    registrationOption:
      register(
        'endTime',
        {
          required: true,
          validate: (value) => {
            const selectedDate = timeToDate(value ?? '');
            const minimumDate = timeToDate(startTime ?? '') ?? new Date();
            const fullMatchDuration = isNaN(Number(matchDuration)) ? 90 : (Number(matchDuration) ?? 45) * 2;
            return getMinutesDifference(selectedDate, minimumDate) > (fullMatchDuration) || `Time difference should be at least ${fullMatchDuration}`;
          }
        }
      ),
    formControl: control
  };

  const dailyMatchesByFieldProps: SelectDropdownProps = {
    legendText: translate('dailyMatchesByFieldLabel'),
    placeholder: translate('dailyMatchesByFieldPlaceHolder'),
    id: 'dailyMatchesByField',
    cyData: 'dailyMatchesByField',
    fieldNameControl: 'dailyMatchesByField',
    fieldState: getFieldState('dailyMatchesByField', formState),
    registrationOption:
      register(
        'dailyMatchesByField'
      ),
    options: dailyMatchesByFieldOptions.map((key) => AllCaptoOption(key)),
    formControl: control
  };

  const matchesDurationProps: SelectDropdownProps = {
    legendText: translate('matchesDurationLabel'),
    placeholder: translate('matchesDurationPlaceHolder'),
    id: 'matchDuration',
    cyData: 'matchDuration',
    showRequired: 'required',
    fieldNameControl: 'matchesDuration',
    fieldState: getFieldState('matchesDuration', formState),
    registrationOption:
      register(
        'matchesDuration',
        { required: true }
      ),
    options: matchDurationOptions.map((key) => AllCaptoOption(key, 'FirstUpperCase', ' Mins halves')),
    formControl: control
  };

  const daysOfMatchesProps: SelectDropdownProps = {
    legendText: translate('daysOfMatchesLabel'),
    placeholder: translate('daysOfMatchesPlaceHolder'),
    id: 'daysOfMatches',
    cyData: 'daysOfMatches',
    isMulti: true,
    fieldNameControl: 'daysOfMatches',
    showRequired: 'required',
    fieldState: getFieldState('daysOfMatches', formState),
    registrationOption:
      register(
        'daysOfMatches',
        { required: true }
      ),
    options: weekDays.map((key) => AllCaptoOption(key)),
    formControl: control,
    className: 'col-span-2'
  };

  const teamsListProps = useMemo<AutoCompleteProps<TeamsOptions>>(() => (
    {
      legendText: translate('teamsListLabel'),
      placeholder: translate('teamsListPlaceHolder'),
      id: 'teamsList',
      cyData: 'teamsList',
      isMulti: true,
      fieldNameControl: 'teamsList',
      formControl: control,
      fieldState: getFieldState('teamsList', formState),
      showRequired: 'optional',
      className: 'col-span-full',
      registrationOption:
        register(
          'teamsList'
        )
    }
  ), []);

  return {
    isValid,
    sportTypeDropdown,
    divisionTypesDropdown,
    startDateProps,
    finishDateProps,
    startTimeProps,
    endTimeProps,
    dailyMatchesByFieldProps,
    matchesDurationProps,
    daysOfMatchesProps,
    numOfFieldsDropdown,
    teamsListProps,
    getValues,
    setValue,
    watch,
    numOfTeams
  };
};
