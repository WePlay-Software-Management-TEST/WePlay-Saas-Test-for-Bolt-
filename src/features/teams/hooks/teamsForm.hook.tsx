import { useMemo } from 'react';
import {
  useForm,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type UseFormGetValues,
  type UseFormWatch
} from 'react-hook-form';
import {
  type GoogleAutoCompleteInputProps,
  type InputProps,
  type AutoCompleteProps,
  type Option,
  type PlayersOptions
} from 'core/models/input.model';
import { type PreviewFile, type ImageUploadProps } from 'core/models/uploadimage.model';
import { namePattern } from 'core/context/regex.const';
import { useTranslation } from 'react-i18next';
import { getLocationInfo } from 'core/utils/utils';

export interface TeamsForm {
  teamsName: string
  teamsDescription: string
  teamsImage: File[]
  city: string
  state: string
  county: string
  teamPlayers: Array<Option<PlayersOptions>>
};

const searchPlacesByZipCode: google.maps.places.AutocompleteOptions = {
  types: ['(cities)'],
  componentRestrictions: { country: 'us' },
  fields: ['formatted_address', 'address_components']
};

export function useTeamsForm (userId: string, initialTeamsForm?: TeamsForm, players?: Array<Option<PlayersOptions>>): {
  handleSubmit: UseFormHandleSubmit<TeamsForm>
  register: UseFormRegister<TeamsForm>
  getValues: UseFormGetValues<TeamsForm>
  watch: UseFormWatch<TeamsForm>
  isDirty: boolean
  isValid: boolean
  teamsNameProps: InputProps
  teamsDescriptionProps: InputProps
  teamsPlayers: AutoCompleteProps<PlayersOptions>
  countyProps: InputProps
  CityInputProps: GoogleAutoCompleteInputProps
  StateInputProps: InputProps
  teamsImageProps: ImageUploadProps
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
  } = useForm<TeamsForm>({
    reValidateMode: 'onChange',
    mode: 'onChange',
    resetOptions: {
      keepDirty: false,
      keepIsValid: false
    },
    defaultValues: initialTeamsForm
  });

  const { t } = useTranslation(['inputText']);
  const initialImage = initialTeamsForm !== undefined && initialTeamsForm.teamsImage.length !== 0
    ? [{
        ...initialTeamsForm?.teamsImage[0] as PreviewFile,
        preview: URL.createObjectURL(initialTeamsForm?.teamsImage[0] as Blob)
      }]
    : undefined;
  const onZipCodeSelect = (place?: google.maps.places.PlaceResult): void => {
    const { city, state, county } = getLocationInfo(place);
    setValue('county', county, {
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

  const teamsImageProps: ImageUploadProps = {
    id: 'playerProfileImage',
    cyDataInput: 'imageInputCy',
    cyDataDraggable: 'imageDraggableZoneCy',
    formFieldName: 'teamsImage',
    filesPreview: initialImage,
    setValue
  };

  const teamsNameProps: InputProps = {
    legendText: t('teamsNameLegendText'),
    placeholder: t('teamsNamePlaceholder'),
    id: 'teamsNameInput',
    cyData: 'teamsNameInput',
    fieldState: getFieldState('teamsName', formState),
    showRequired: 'required',
    registrationOption:
      register(
        'teamsName',
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

  const teamsDescriptionProps: InputProps = {
    legendText: t('teamsDescLegend'),
    placeholder: t('teamsDescPlaceholder'),
    id: 'teamsDecs',
    cyData: 'teamsDecs',
    errPlaceholder: t('bioCharacterPlaceHolder') ?? '',
    correctPlaceHolder: t('bioCharacterPlaceHolder') ?? '',
    fieldState: getFieldState('teamsDescription', formState),
    showRequired: 'optional',
    registrationOption:
      register(
        'teamsDescription',
        {
          maxLength: {
            value: 250,
            message: t('bioMaxLength')
          }
        }
      )
  };

  const StateInputProps: InputProps = {
    legendText: t('stateLegend'),
    placeholder: t('statePlaceholder'),
    id: 'stateInput',
    cyData: 'stateInput',
    showRequired: 'required',
    fieldState: getFieldState('state', formState),
    registrationOption:
      register(
        'state',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          },
          maxLength: 15,
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
    formControl: control,
    fieldNameControl: 'city',
    searchOptions: searchPlacesByZipCode,
    onSelect: onZipCodeSelect,
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

  const countyProps: InputProps = {
    legendText: t('countyLegend'),
    placeholder: t('countyPlaceholder'),
    id: 'countyTeams',
    cyData: 'countyTeams',
    showRequired: 'required',
    fieldState: getFieldState('county', formState),
    formControl: control,
    registrationOption:
      register(
        'county',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          },
          maxLength: 32
        }
      )
  };

  const teamsPlayers = useMemo<AutoCompleteProps<PlayersOptions>>(() => ({
    legendText: t('TeamPlayersLegend'),
    placeholder: t('TeamPlayersPlaceholder'),
    id: 'teamCaptains',
    cyData: 'teamCaptains',
    fieldState: getFieldState('teamPlayers', formState),
    showRequired: 'optional',
    fieldNameControl: 'teamPlayers',
    formControl: control,
    isMulti: true,
    options: players,
    defaultOptions: initialTeamsForm?.teamPlayers,
    registrationOption:
        register(
          'teamPlayers'
        )
  }), [players]);

  return {
    handleSubmit,
    register,
    getValues,
    watch,
    isDirty,
    isValid,
    teamsNameProps,
    teamsDescriptionProps,
    countyProps,
    CityInputProps,
    StateInputProps,
    teamsPlayers,
    teamsImageProps
  };
};
