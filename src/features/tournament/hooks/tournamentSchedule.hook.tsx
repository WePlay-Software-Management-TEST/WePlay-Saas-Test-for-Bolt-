import { useCallback, useMemo } from 'react';
import { type UseFormSetValue, type UseFormHandleSubmit, type UseFormReset, useFieldArray, type FieldArrayWithId, type UseFieldArrayReplace, type Control, type UseFormGetValues, type UseFormGetFieldState, type UseFieldArrayUpdate, useFormContext, type FormState, type UseFormRegister } from 'react-hook-form';
import { type MatchDetails, type TournamentFormType } from '../models/tournamentForm.model';
import { useTranslation } from 'react-i18next';
import { type CalendarInputProps } from 'core/components/input/calendar';
import { type InputProps, type SelectDropdownProps, type Option } from 'core/models/input.model';

export interface MatchFormInputProps {
  matchDescTextAreaProps: InputProps
  matchFieldSelectProps: SelectDropdownProps
  awayTeamSelectProps: SelectDropdownProps
  homeTeamSelectProps: SelectDropdownProps
  matchStartTimeProps: InputProps
  matchStartDateProps: CalendarInputProps
}
export function useTournamentScheduleForm (): {
  isValid: boolean
  getMatchFormInputProps: (groupIndex: number, getFieldPlace: UseFormGetFieldState<MatchDetails>, controlPlace: Control<MatchDetails>, registerPlace: UseFormRegister<MatchDetails>) => MatchFormInputProps
  handleSubmit: UseFormHandleSubmit<TournamentFormType>
  reset: UseFormReset<TournamentFormType>
  groupFields: Array<FieldArrayWithId<TournamentFormType, 'groups'>>
  replace: UseFieldArrayReplace<TournamentFormType, 'groups'>
  control: Control<TournamentFormType>
  getFieldState: UseFormGetFieldState<TournamentFormType>
  getValues: UseFormGetValues<TournamentFormType>
  setValue: UseFormSetValue<TournamentFormType>
  updateGroups: UseFieldArrayUpdate<TournamentFormType, 'groups'>
  formState: FormState<TournamentFormType>
} {
  const {
    control,
    formState: { isValid, isDirty },
    formState,
    getFieldState,
    handleSubmit,
    getValues,
    reset,
    setValue
  } = useFormContext<TournamentFormType>();

  const memoizedControl = useMemo(() => control, [control]);

  const { fields: groupFields, replace: replaceGroups, update: updateGroups } = useFieldArray({
    control: memoizedControl,
    name: 'groups'
  });

  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourPreviewStep' });

  const getMatchFormInputProps = useCallback((groupIndex: number, getFieldPlace: UseFormGetFieldState<MatchDetails>, controlPlace: Control<MatchDetails>, registerPlace: UseFormRegister<MatchDetails>): MatchFormInputProps => {
    return {
      matchDescTextAreaProps: {
        legendText: translate('matchDescLegend'),
        placeholder: '',
        id: 'matchDescInput',
        cyData: 'matchDescInput',
        fieldState: getFieldPlace('matchDesc'),
        showRequired: 'optional',
        resizable: true,
        className: 'flex sm:self-stretch mobile:w-full sm:w-full h-full',
        fieldSetClassNames: 'lg:w-[450px] sm:w-[350px] mobile:w-full sm:w-full h-full',
        registrationOption:
          registerPlace(
            'matchDesc'
          )
      },
      matchFieldSelectProps: {
        legendText: translate('matchFieldLegend'),
        placeholder: '',
        id: 'matchFieldSelect',
        cyData: 'matchFieldSelect',
        type: 'primary',
        selectEntireOption: true,
        fieldNameControl: 'matchField',
        fieldState: getFieldPlace('matchField'),
        registrationOption:
          registerPlace(
            'matchField',
            {
              required: true
            }
          ),
        options: [],
        formControl: controlPlace
      },
      awayTeamSelectProps: {
        legendText: translate('awayTeamLegend'),
        placeholder: translate('awayTeamPlaceholder'),
        id: 'matchAwayTeamInput',
        cyData: 'matchAwayTeamInput',
        type: 'primary',
        fieldNameControl: 'awayTeam',
        fieldState: getFieldPlace('awayTeam'),
        registrationOption:
          registerPlace(
            'awayTeam',
            {
              required: true
            }
          ),
        options: getValues(`groups.${groupIndex}.teams`) as unknown as Array<Option<void>>,
        formControl: controlPlace,
        selectEntireOption: true
      },
      homeTeamSelectProps: {
        legendText: translate('homeTeamLegend'),
        placeholder: translate('homeTeamPlaceholder'),
        id: 'matchHomeTeamInput',
        cyData: 'matchHomeTeamInput',
        type: 'primary',
        fieldNameControl: 'homeTeam',
        fieldState: getFieldPlace('homeTeam'),
        registrationOption:
          registerPlace(
            'homeTeam',
            {
              required: true
            }
          ),
        options: getValues(`groups.${groupIndex}.teams`) as unknown as Array<Option<void>>,
        formControl: controlPlace,
        selectEntireOption: true
      },
      matchStartTimeProps: {
        legendText: translate('startTimeLegend'),
        placeholder: '',
        inputType: 'time',
        id: 'startTimeMatch',
        cyData: 'startTimeMatch',
        showRequired: 'required',
        fieldState: getFieldPlace('startTime'),
        registrationOption:
          registerPlace(
            'startTime',
            { required: true }
          ),
        formControl: controlPlace
      },
      matchStartDateProps: {
        legendText: translate('startDateLegend'),
        placeholder: translate('startDatePlaceholder'),
        id: 'startDateMatch',
        cyData: 'startDateMatch',
        showRequired: 'required',
        fieldNameControl: 'startDate',
        fieldState: getFieldPlace('startDate'),
        registrationOption:
          registerPlace(
            'startDate',
            { required: true }
          ),
        formControl: controlPlace
      }

    };
  }, [translate, getValues]);

  return {
    isValid: isValid && isDirty,
    handleSubmit,
    reset,
    groupFields,
    replace: replaceGroups,
    control: memoizedControl,
    getMatchFormInputProps,
    getFieldState,
    getValues,
    setValue,
    updateGroups,
    formState
  };
};
