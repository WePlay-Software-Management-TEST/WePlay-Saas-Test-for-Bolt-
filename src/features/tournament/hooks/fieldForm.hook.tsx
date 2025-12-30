import React from 'react';
import { useForm, type UseFormSetError, type UseFormHandleSubmit, type UseFormGetFieldState, type UseFormReset } from 'react-hook-form';
import { type SelectDropdownProps, type InputProps } from 'core/models/input.model';
import { type FieldFormModel } from '../models/tournamentForm.model';
import { fieldFormDefaults } from '../models/tournament.const';
import { useTranslation } from 'react-i18next';
import { type Fields } from 'API';

export function useFieldForm (allAvailableFields: Fields[], selectedFields: Fields[]): {
  fieldNameInputProps: SelectDropdownProps
  fieldLocationInputProps: InputProps
  isValid: boolean
  handleSubmit: UseFormHandleSubmit<FieldFormModel>
  setError: UseFormSetError<FieldFormModel>
  getFieldState: UseFormGetFieldState<FieldFormModel>
  reset: UseFormReset<FieldFormModel>
} {
  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourFieldsStep' });
  const { handleSubmit, getFieldState, register, formState, formState: { isValid }, control, watch, setValue, setError, reset } = useForm<FieldFormModel>({
    defaultValues: fieldFormDefaults,
    reValidateMode: 'onChange',
    mode: 'onChange'
  });

  const [avilableFieldsOptions, setAvailableFieldsOptions] = React.useState(allAvailableFields.map((field) => {
    return {
      label: field.fieldName,
      value: field.id
    };
  }));

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'fieldName') {
        const fieldID = allAvailableFields.find((field) => field.id === (value.fieldName?.value));
        if (fieldID !== undefined) {
          setValue('location', fieldID?.fieldLocation);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  React.useEffect(() => {
    const removeSelectedFields = allAvailableFields.filter((field) => {
      return !selectedFields.includes(field);
    }).map((field) => {
      return {
        label: field.fieldName ?? '',
        value: field.id ?? ''
      };
    });
    if (removeSelectedFields !== undefined) {
      setAvailableFieldsOptions(removeSelectedFields);
    }
  }, [selectedFields]);

  const fieldNameInputProps: SelectDropdownProps = {
    cyData: 'newFieldName',
    fieldNameControl: 'fieldName',
    showMenu: true,
    formControl: control,
    options: avilableFieldsOptions,
    legendText: translate('newFieldInputLabel'),
    placeholder: translate('fieldNameInputPlaceholder'),
    id: 'newFieldName',
    fieldState: getFieldState('fieldName', formState),
    showRequired: 'required',
    registrationOption: register('fieldName', {
      required: {
        value: true,
        message: translate('fieldNameRequiredError')
      },
      validate: (value) => {
        return (
          value.label !== null &&
          value.label !== undefined &&
          value.label.trim().length > 0
        );
      }
    })
  };
  const fieldLocationInputProps: InputProps = {
    cyData: 'fieldLocation',
    legendText: translate('newFieldLocationLabel'),
    placeholder: translate('newFieldLocationPlaceHolder'),
    id: 'location',
    fieldState: getFieldState('location', formState),
    showRequired: 'required',
    registrationOption:
      register(
        'location',
        { required: true }
      )
  };

  return {
    fieldNameInputProps,
    fieldLocationInputProps,
    isValid,
    handleSubmit,
    setError,
    getFieldState,
    reset
  };
};
