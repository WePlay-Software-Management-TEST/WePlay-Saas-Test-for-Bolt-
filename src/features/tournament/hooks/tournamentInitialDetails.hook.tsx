import { type UseFormGetValues, useFormContext } from 'react-hook-form';
import { type TournamentFormType } from '../models/tournamentForm.model';
import { type PreviewFile, type ImageUploadProps } from 'core/models/uploadimage.model';
import { type InputProps } from 'core/models/input.model';
import { namePattern } from 'core/context/regex.const';
import { useTranslation } from 'react-i18next';
import { isThereErrorInSubForm } from '../shared/utils';
import { useRef } from 'react';

/**
 * Custom hook for managing tournament form data and validation.
 *
 * This hook initializes form fields for tournament image, league name, and league description.
 * It also provides validation for the form fields and checks if the first step is valid.
 * @returns {{
*   ImageCompProps: ImageUploadProps,
*   LeagueNameCompProps: InputProps,
*   LeagueDescCompProps: InputProps,
*   isValid: boolean,
* }} Object containing properties for image upload, league name input, league description input,
* form validation status, and first step validation status.
*/
export function useTournamentInitialForm (editTournament?: TournamentFormType): {
  ImageCompProps: ImageUploadProps
  LeagueNameCompProps: InputProps
  LeagueDescCompProps: InputProps
  getValues: UseFormGetValues<TournamentFormType>
  isValid: boolean
} {
  const { getValues, register, formState, setValue, getFieldState } = useFormContext<TournamentFormType>();

  const { t: translate } = useTranslation(['tournament', 'inputText']);

  const isValid = isThereErrorInSubForm<TournamentFormType>(['leagueName'], getFieldState);
  const initialImage = useRef(editTournament?.image !== undefined && editTournament?.image?.length !== 0
    ? [{
        ...editTournament?.image[0] as PreviewFile,
        preview: URL.createObjectURL(editTournament?.image[0] as Blob)
      }]
    : undefined);
  const ImageCompProps: ImageUploadProps = {
    id: 'tournamentImageInput',
    cyDataInput: 'imageTournamentInputCy',
    cyDataDraggable: 'imageTournamentZonetCy',
    formFieldName: 'image',
    filesPreview: initialImage.current,
    setValue
  };
  const LeagueNameCompProps: InputProps = {
    legendText: translate('form.gettingStartedStep.tourNameLegend', { ns: 'tournament' }),
    placeholder: translate('form.gettingStartedStep.tourNameLegend', { ns: 'tournament' }),
    id: 'tourNameLegend',
    cyData: 'tourNameLegend',
    fieldState: getFieldState('leagueName', formState),
    showRequired: 'required',
    registrationOption:
      register(
        'leagueName',
        {
          required: {
            value: true,
            message: translate('fieldRequired', { ns: 'inputText' })
          },
          maxLength: {
            value: 32,
            message: translate('NameMaxLength', { ns: 'inputText' })
          },
          pattern: namePattern
        }
      )
  };

  const LeagueDescCompProps: InputProps = {
    legendText: translate('form.gettingStartedStep.tourDesc', { ns: 'tournament' }),
    placeholder: translate('form.gettingStartedStep.tourDescPlaceHolder', { ns: 'tournament' }),
    id: 'tourDesc',
    cyData: 'tourDesc',
    errPlaceholder: '',
    correctPlaceHolder: '',
    fieldState: getFieldState('leagueDesc', formState),
    showRequired: 'optional',
    registrationOption:
      register(
        'leagueDesc',
        {
          maxLength: {
            value: 250,
            message: translate('bioMaxLength', { ns: 'inputText' })
          }
        }
      )
  };

  return {
    ImageCompProps,
    LeagueDescCompProps,
    LeagueNameCompProps,
    isValid,
    getValues
  };
}
