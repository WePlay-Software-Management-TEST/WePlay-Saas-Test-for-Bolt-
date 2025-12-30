import { useFormContext } from 'react-hook-form';
import { type TournamentDetailsForm } from 'features/tournament/models/tournamentForm.model';
import { type ImageUploadProps } from 'core/models/uploadimage.model';
import { type InputProps } from 'core/models/input.model';
import { useTranslation } from 'react-i18next';

interface UseLeagueInitialFormReturn {
  ImageCompProps: ImageUploadProps
  LeagueNameCompProps: InputProps
  LeagueDescCompProps: InputProps
  isValid: boolean
}

interface LeagueDetailsForm extends Partial<TournamentDetailsForm> {
  leagueName: string
  leagueDesc: string
  image?: File[] | undefined
}

export const useLeagueInitialForm = (): UseLeagueInitialFormReturn => {
  const { register, setValue, watch, formState, getFieldState } = useFormContext<LeagueDetailsForm>();
  const { t: translate } = useTranslation(['tournament', 'inputText']);

  const leagueName = watch('leagueName') ?? '';

  const isValid = leagueName.trim() !== '';

  return {
    ImageCompProps: {
      id: 'leagueImage',
      cyDataInput: 'leagueImageInput',
      cyDataDraggable: 'leagueImageDrop',
      formFieldName: 'image',
      setValue,
      removeCaptionText: false,
      defaultPreviewUrl: undefined
    },
    LeagueNameCompProps: {
      id: 'leagueName',
      legendText: 'League Name',
      placeholder: 'Type Name...',
      showRequired: 'required',
      fieldState: getFieldState('leagueName', formState),
      registrationOption: register('leagueName', {
        required: 'League name is required'
      }),
      errPlaceholder: 'Please add a league name',
      cyData: 'leagueNameInput'
    },
    LeagueDescCompProps: {
      id: 'leagueDesc',
      legendText: 'League Description',
      placeholder: 'Type Description...',
      fieldState: getFieldState('leagueDesc', formState),
      registrationOption: register('leagueDesc', {
        maxLength: {
          value: 250,
          message: translate('bioMaxLength', { ns: 'inputText' })
        }
      }),
      showRequired: 'optional',
      cyData: 'leagueDescInput'
    },
    isValid
  };
};
