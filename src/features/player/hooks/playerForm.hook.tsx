import { useRef, useMemo } from 'react';
import {
  useForm,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type UseFormGetValues,
  type UseFormWatch
} from 'react-hook-form';
import {
  type AutoCompleteProps,
  type TeamsOptions,
  type GoogleAutoCompleteInputProps,
  type InputProps,
  type SelectDropdownProps,
  type Option
} from 'core/models/input.model';
import {
  SoccerExperienceLevelTypes,
  SoccerPositionTypes,
  type FootPreferenceTypes
} from 'models';
import { AllCaptoOption, validateMinAge, minMaxWeight, getLocationInfo } from 'core/utils/utils';
import { type PreviewFile, type ImageUploadProps } from 'core/models/uploadimage.model';
import { emailPattern, namePattern, numberPattern } from 'core/context/regex.const';
import { heightOptions } from 'core/context/global.const';
import { useTranslation } from 'react-i18next';
import { GenderTypes } from 'API';
import { type Contact } from 'graphql/table.models';
export interface PlayerInfoForm {
  firstName: string
  lastName: string
  playerBio: string
  playerImage: File[]
  PreferredPositition: SoccerPositionTypes | null | undefined
  birthDate: string
  experienceLevel: SoccerExperienceLevelTypes | null | undefined
  city: string
  state: string
  zipCode: string
  leftRightPreference: FootPreferenceTypes | null | undefined
  height: string
  gender: GenderTypes | null | undefined
  weight: number | string
  teams: Array<Option<TeamsOptions>>
  playerEmail: string
};

const searchPlacesByZipCode: google.maps.places.AutocompleteOptions = {
  types: ['(regions)'],
  componentRestrictions: { country: 'us' },
  fields: ['formatted_address', 'address_components']
};

const searchPlacesByState: google.maps.places.AutocompleteOptions = {
  types: ['administrative_area_level_1'],
  componentRestrictions: { country: 'us' },
  fields: ['formatted_address', 'address_components']
};

export function usePlayerForm (initialPlayerForm?: PlayerInfoForm, teamsData?: Array<Option<TeamsOptions>>, usersData?: Contact[], playerId?: string): {
  handleSubmit: UseFormHandleSubmit<PlayerInfoForm>
  register: UseFormRegister<PlayerInfoForm>
  getValues: UseFormGetValues<PlayerInfoForm>
  watch: UseFormWatch<PlayerInfoForm>
  isDirty: boolean
  isValid: boolean
  firstNameProps: InputProps
  lastNameProps: InputProps
  playerBioProps: InputProps
  playerTeams: AutoCompleteProps<TeamsOptions>
  heightInputProps: SelectDropdownProps
  weightInputProps: InputProps
  genderInputProps: SelectDropdownProps
  preferredPositionInputProps: SelectDropdownProps
  zipCodeInputProps: GoogleAutoCompleteInputProps
  CityInputProps: GoogleAutoCompleteInputProps
  StateInputProps: GoogleAutoCompleteInputProps
  experienceLevelInputProps: SelectDropdownProps
  birthDateInputProps: InputProps
  playerEmail: InputProps
  playerImageProps: ImageUploadProps
} {
  const {
    register,
    formState,
    control,
    watch,
    formState: {
      isValid,
      isDirty
    },
    handleSubmit,
    getFieldState,
    getValues,
    setValue
  } = useForm<PlayerInfoForm>({
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: initialPlayerForm ?? { playerImage: undefined, PreferredPositition: undefined, experienceLevel: undefined, teams: [] },
    values: initialPlayerForm ?? undefined,
    resetOptions: {
      keepDirty: false,
      keepIsValid: false
    }
  });

  const { t } = useTranslation(['inputText']);

  const initialImage = useRef(initialPlayerForm !== undefined && initialPlayerForm.playerImage.length !== 0
    ? [{
        ...initialPlayerForm?.playerImage[0] as PreviewFile,
        preview: URL.createObjectURL(initialPlayerForm?.playerImage[0] as Blob)
      }]
    : undefined);

  const onZipCodeSelect = (place?: google.maps.places.PlaceResult): void => {
    const { city, state, zipCode } = getLocationInfo(place);
    setValue('zipCode', zipCode, {
      shouldValidate: true,
      shouldDirty: true
    });

    setValue('city', city, {
      shouldValidate: true,
      shouldDirty: true
    });

    setValue('state', state, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const playerImageProps: ImageUploadProps = {
    id: 'playerProfileImage',
    cyDataInput: 'imageInputCy',
    cyDataDraggable: 'imageDraggableZoneCy',
    formFieldName: 'playerImage',
    filesPreview: initialImage.current,
    setValue
  };

  const firstNameProps: InputProps = {
    legendText: t('firstNameLegendText'),
    placeholder: t('firstNamePlaceholder'),
    id: 'firstNameInput',
    cyData: 'firstNameInput',
    fieldState: getFieldState('firstName', formState),
    showRequired: 'required',
    registrationOption:
      register(
        'firstName',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          },
          maxLength: {
            value: 32,
            message: t('NameMaxLength')
          },
          pattern: namePattern
        }
      )
  };

  const lastNameProps: InputProps = {
    legendText: t('lastNameLegendText'),
    placeholder: t('lastNamePlaceholder'),
    id: 'lastNameInput',
    cyData: 'lastNameInput',
    fieldState: getFieldState('lastName', formState),
    showRequired: 'required',
    registrationOption:
      register(
        'lastName',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          },
          maxLength: {
            value: 32,
            message: t('NameMaxLength')
          },
          pattern: namePattern
        }
      )
  };

  const playerBioProps: InputProps = {
    legendText: t('playerBioLegendText'),
    placeholder: t('playerBioPlaceholder'),
    id: 'PlayerBioInput',
    cyData: 'PlayerBioInput',
    errPlaceholder: t('bioCharacterPlaceHolder') ?? '',
    correctPlaceHolder: t('bioCharacterPlaceHolder') ?? '',
    fieldState: getFieldState('playerBio', formState),
    showRequired: 'optional',
    registrationOption:
      register(
        'playerBio',
        {
          maxLength: {
            value: 250,
            message: t('bioMaxLength')
          }
        }
      )
  };

  const preferredPositionInputProps: SelectDropdownProps = {
    legendText: t('positionLegendText'),
    placeholder: t('positionPlaceholder'),
    id: 'preferredPositionInput',
    cyData: 'preferredPositionInput',
    showRequired: 'optional',
    fieldNameControl: 'PreferredPositition',
    fieldState: getFieldState('PreferredPositition', formState),
    registrationOption:
      register(
        'PreferredPositition'
      ),
    options: Object.keys(SoccerPositionTypes).map((key) => AllCaptoOption(key)),
    formControl: control
  };

  const birthDateInputProps: InputProps = {
    legendText: t('birthDateLegendText'),
    placeholder: t('birthDatePlaceholder'),
    id: 'birthDateInput',
    cyData: 'birthDateInput',
    showRequired: 'required',
    fieldState: getFieldState('birthDate', formState),
    registrationOption:
      register(
        'birthDate',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          },
          validate: validateMinAge
        }
      ),
    inputType: 'date'
  };

  const experienceLevelInputProps: SelectDropdownProps = {
    legendText: t('experienceLevelLegend'),
    placeholder: t('experienceLevelPlaceholder'),
    id: 'experienceLevelInput',
    cyData: 'experienceLevelInput',
    showRequired: 'optional',
    fieldNameControl: 'experienceLevel',
    fieldState: getFieldState('experienceLevel', formState),
    registrationOption:
      register(
        'experienceLevel'
      ),
    options: Object.keys(SoccerExperienceLevelTypes).map((key) => AllCaptoOption(key)),
    formControl: control
  };

  const StateInputProps: GoogleAutoCompleteInputProps = {
    legendText: t('stateLegend'),
    placeholder: t('statePlaceholder'),
    id: 'stateInput',
    cyData: 'stateInput',
    showRequired: 'required',
    onSelect: onZipCodeSelect,
    fieldNameControl: 'state',
    formControl: control,
    searchOptions: searchPlacesByState,
    fieldState: getFieldState('state', formState),
    registrationOption:
      register(
        'state',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          },
          maxLength: 16,
          pattern: namePattern
        }
      )
  };

  const CityInputProps: GoogleAutoCompleteInputProps = {
    legendText: t('cityLegend'),
    placeholder: t('cityPlaceholder'),
    id: 'cityInput',
    cyData: 'cityInput',
    showRequired: 'required',
    onSelect: onZipCodeSelect,
    formControl: control,
    fieldNameControl: 'city',
    searchOptions: searchPlacesByZipCode,
    fieldState: getFieldState('city', formState),
    registrationOption:
      register(
        'city',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          },
          maxLength: 32
        }
      )
  };

  const zipCodeInputProps: GoogleAutoCompleteInputProps = {
    legendText: t('zipcodeLegend'),
    placeholder: t('zipcodePlaceholder'),
    id: 'zipCodelInput',
    cyData: 'zipCodeInput',
    showRequired: 'required',
    searchOptions: searchPlacesByZipCode,
    onSelect: onZipCodeSelect,
    fieldState: getFieldState('zipCode', formState),
    formControl: control,
    fieldNameControl: 'zipCode',
    registrationOption:
      register(
        'zipCode',
        {
          minLength: 5,
          maxLength: 5,
          pattern: {
            value: numberPattern,
            message: t('zipcodeMustNumber')
          },
          required: {
            value: true,
            message: t('fieldRequired')
          }
        }
      )
  };

  const heightInputProps: SelectDropdownProps = {
    legendText: t('heightLegend'),
    placeholder: t('heightPlaceholder'),
    id: 'heightInput',
    cyData: 'heightInput',
    showRequired: 'optional',
    fieldState: getFieldState('height', formState),
    fieldNameControl: 'height',
    formControl: control,
    options: heightOptions,
    registrationOption:
      register(
        'height'
      )
  };

  const weightInputProps: InputProps = {
    legendText: t('weightLegend'),
    placeholder: t('weightPlaceholder'),
    id: 'weightInput',
    cyData: 'weightInput',
    showRequired: 'optional',
    fieldState: getFieldState('weight', formState),
    registrationOption:
      register(
        'weight',
        {
          pattern: {
            value: numberPattern,
            message: t('weightMustNumber')
          },
          validate: minMaxWeight
        }
      )
  };

  const genderInputProps: SelectDropdownProps = {
    legendText: t('genderLegend'),
    placeholder: t('genderPlaceholder'),
    id: 'sexlInput',
    cyData: 'sexInput',
    fieldState: getFieldState('gender', formState),
    showRequired: 'required',
    options: Object.keys(GenderTypes).map((key) => AllCaptoOption(key)),
    fieldNameControl: 'gender',
    formControl: control,
    registrationOption:
      register(
        'gender',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          }
        }
      )
  };

  const playerTeams = useMemo<AutoCompleteProps<TeamsOptions>>(() => ({
    legendText: t('teamLegend'),
    placeholder: t('teamPlaceholder'),
    id: 'PlayerTeamsInput',
    cyData: 'PlayerTeamsInput',
    showRequired: 'optional',
    fieldState: getFieldState('teams', formState),
    fieldNameControl: 'teams',
    formControl: control,
    options: teamsData,
    defaultOptions: initialPlayerForm?.teams,
    isMulti: true,
    registrationOption:
      register(
        'teams'
      )
  }), [teamsData, initialPlayerForm]);

  const playerEmail: InputProps = {
    legendText: t('emailAddressLegend'),
    placeholder: t('emailAddressPlaceholder'),
    id: 'playerEmailInput',
    cyData: 'playerEmailInput',
    showRequired: 'required',
    fieldState: getFieldState('playerEmail', formState),
    registrationOption:
      register(
        'playerEmail',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          },
          pattern:
        {
          value: emailPattern,
          message: t('fieldRequired')
        },
          validate: (value) => {
            const emailIsBeingUsedByStaff = usersData?.find((user) => user.ContactEmails?.items[0].Email === value && user.id !== playerId);
            return emailIsBeingUsedByStaff === undefined || 'Email is already being used, please use a new email';
          }
        }
      )
  };
  return {
    handleSubmit,
    register,
    getValues,
    watch,
    isDirty,
    isValid,
    firstNameProps,
    lastNameProps,
    playerBioProps,
    playerTeams,
    heightInputProps,
    weightInputProps,
    genderInputProps,
    preferredPositionInputProps,
    zipCodeInputProps,
    CityInputProps,
    StateInputProps,
    experienceLevelInputProps,
    birthDateInputProps,
    playerEmail,
    playerImageProps
  };
};
