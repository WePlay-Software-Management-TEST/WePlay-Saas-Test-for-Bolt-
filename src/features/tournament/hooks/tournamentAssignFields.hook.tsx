import { useFieldArray, type FieldArrayWithId, type UseFieldArrayReplace, type UseFormGetValues, useFormContext, type UseFormGetFieldState } from 'react-hook-form';
import { dailyMatchesByFieldOptions, type DailyMatchesByFieldTypes, type TournamentFormType } from '../models/tournamentForm.model';
import { type RadioButtonProps, type InputProps, type SelectDropdownProps, type Option } from 'core/models/input.model';
import { useTranslation } from 'react-i18next';
import { type Contact } from 'graphql/table.models';
import { useState } from 'react';
import { AllCaptoOption } from 'core/utils/utils';
import { isThereErrorInSubForm } from '../shared/utils';

interface GetFieldFormProps {
  fieldNameInputProps: InputProps
  fieldMatchesPerDayInput: SelectDropdownProps
  fieldMainRefereesInput: SelectDropdownProps
  fieldLineRefereesInput: SelectDropdownProps
  manualAssignReferee: RadioButtonProps
  autoAssignReferee: RadioButtonProps
}
/**
 * Custom hook for managing tournament field assignments.
 * Returns functions and data related to assigning fields in a tournament.
 *
 * @returns {{
 *   manualAssignReferee: (fieldName: number) => RadioButtonProps,
 *   autoAssignReferee: (fieldName: number) => RadioButtonProps,
 *   fieldMatchesPerDayInput: (fieldName: number) => SelectDropdownProps,
 *   fieldLineRefereesInput: (fieldName: number) => InputProps,
 *   fieldMainRefereesInput: (fieldName: number) => InputProps,
 *   fieldNameInputProps: (fieldName: number, fieldLabel: string) => InputProps,
 *   fields: Array<FieldArrayWithId<FieldsDetailsForm>>,
 *   replace: UseFieldArrayReplace<FieldsDetailsForm>
 * }}
 */
export function useTournamentAssignFields (referees: Contact[]): {

  getFIeldFormProps: (fieldIndex: number, fieldLabel: string) => GetFieldFormProps
  fields: Array<FieldArrayWithId<TournamentFormType, 'fieldsDetails'>>
  replace: UseFieldArrayReplace<TournamentFormType, 'fieldsDetails'>
  getValues: UseFormGetValues<TournamentFormType>
  numOfFields: number
  selectedMatchesPerDay: DailyMatchesByFieldTypes
  isValid: boolean
  getFieldState: UseFormGetFieldState<TournamentFormType>
} {
  const {
    control, register,
    formState, getFieldState, getValues, watch
  } = useFormContext<TournamentFormType>();
  const isValid = isThereErrorInSubForm(['fieldsDetails'], getFieldState);

  const { fields, replace } = useFieldArray({
    control,
    name: 'fieldsDetails'
  });

  const numOfFields = watch('numOfFields') ?? 8;
  const selectedMatchesPerDay = watch('dailyMatchesByField') ?? 'AUTO';

  const [allReferees] = useState(referees.map((referee) => {
    return {
      label: `${referee.FirstName} ${referee.LastName ?? ''}`,
      value: referee.id,
      extraData: {
        city: referee.ContactAddresses?.items[0]?.City ?? '',
        state: referee.ContactAddresses?.items[0]?.State ?? '',
        experience: referee.RefereeInformation?.yearsOfExperience
      }
    };
  }) as unknown as Array<Option<void>>);

  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourFieldsStep' });
  const getFIeldFormProps = (fieldIndex: number, fieldLabel: string): GetFieldFormProps => {
    const manualAssignReferee: RadioButtonProps = {
      value: 'MANUAL',
      id: `manulaAssignReferee-${fieldIndex}`,
      cyData: 'manulaAssignReferee',
      registrationOption: register(`fieldsDetails.${fieldIndex}.assignMechanism`, { required: true }),
      label: translate('refereeRadioLabelManual') ?? ''
    };
    const autoAssignReferee: RadioButtonProps = {
      value: 'AUTO',
      id: `autoAssignReferee-${fieldIndex}`,
      cyData: 'autoAssignReferee',
      registrationOption: register(`fieldsDetails.${fieldIndex}.assignMechanism`, { required: true }),
      label: translate('refereeRadioLabelAuto') ?? ''
    };
    const fieldNameInputProps: InputProps = {
      legendText: fieldLabel,
      placeholder: translate('fieldNameInputPlaceholder'),
      id: `fieldName-${fieldIndex}`,
      cyData: 'fieldName',
      showRequired: 'required',
      fieldState: getFieldState(`fieldsDetails.${fieldIndex}.fieldName`, formState),
      registrationOption:
        register(
          `fieldsDetails.${fieldIndex}.fieldName`,
          { required: true }
        )
    };

    const fieldMatchesPerDayInput: SelectDropdownProps = {
      legendText: translate('dailyMatchesByFieldLabel'),
      placeholder: translate('dailyMatchesByFieldPlaceHolder'),
      id: `fieldMatchesPerDay-${fieldIndex}`,
      cyData: 'fieldMatchesPerDay',
      showRequired: 'required',
      fieldNameControl: `fieldsDetails.${fieldIndex}.matchesPerDay`,
      formControl: control,
      options: dailyMatchesByFieldOptions.map((key) => AllCaptoOption(key)),
      fieldState: getFieldState(`fieldsDetails.${fieldIndex}.matchesPerDay`, formState),
      registrationOption:
        register(
          `fieldsDetails.${fieldIndex}.matchesPerDay`,
          { required: true }
        )
    };
    const fieldMainRefereesInput: SelectDropdownProps = {
      legendText: translate('mainRefereeLabel'),
      isMulti: true,
      noOptionButton: true,
      fieldNameControl: `fieldsDetails.${fieldIndex}.mainReferees`,
      formControl: control,
      noOptionsMessage: 'No Referees Found',
      options: allReferees,
      disableOption: (value) => {
        const lineReferres = watch(`fieldsDetails.${fieldIndex}.lineReferees`).map((referees) => referees.value);
        if (lineReferres.includes(value.value)) {
          return true;
        };
        return false;
      },
      placeholder: '',
      id: `fieldMainRefereesList-${fieldIndex}`,
      cyData: 'fieldMainRefereesList',
      showRequired: 'required',
      fieldState: getFieldState(`fieldsDetails.${fieldIndex}.mainReferees`, formState),
      isDisabled: watch(`fieldsDetails.${fieldIndex}.assignMechanism`) === 'AUTO',
      registrationOption:
        register(
          `fieldsDetails.${fieldIndex}.mainReferees`,
          {
            required: true,
            validate: () => {
              const lengthOfLineReferees = getValues(`fieldsDetails.${fieldIndex}.mainReferees`).length <= 1;
              return lengthOfLineReferees || "Main Referees can't be more than 1 referees per field";
            }
          }
        )
    };

    const fieldLineRefereesInput: SelectDropdownProps = {
      legendText: translate('lineRefereeLabel'),
      isMulti: true,
      noOptionButton: true,
      noOptionsMessage: 'No Referees Found',
      fieldNameControl: `fieldsDetails.${fieldIndex}.lineReferees`,
      disableOption: (value) => {
        const mainReferees = watch(`fieldsDetails.${fieldIndex}.mainReferees`).map((referees) => referees.value);
        if (mainReferees.includes(value.value)) {
          return true;
        };
        return false;
      },
      formControl: control,
      placeholder: '',
      id: `fieldLineRefereesList-${fieldIndex}`,
      cyData: 'fieldLineRefereesList',
      options: allReferees,
      showRequired: 'optional',
      isDisabled: watch(`fieldsDetails.${fieldIndex}.assignMechanism`) === 'AUTO',
      fieldState: getFieldState(`fieldsDetails.${fieldIndex}.lineReferees`, formState),
      registrationOption:
        register(
          `fieldsDetails.${fieldIndex}.lineReferees`,
          {
            validate: () => {
              const lengthOfLineReferees = getValues(`fieldsDetails.${fieldIndex}.lineReferees`).length <= 2;
              return lengthOfLineReferees || "Line Referees can't be more than 2 referees per field";
            }
          }
        )
    };
    return { manualAssignReferee, autoAssignReferee, fieldNameInputProps, fieldMatchesPerDayInput, fieldMainRefereesInput, fieldLineRefereesInput };
  };

  return {
    getFIeldFormProps,
    fields,
    replace,
    getValues,
    isValid,
    selectedMatchesPerDay,
    numOfFields,
    getFieldState
  };
};
