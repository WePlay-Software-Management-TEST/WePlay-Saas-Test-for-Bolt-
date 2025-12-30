import { type UseFormGetValues, type UseFormWatch, useFormContext } from 'react-hook-form';
import { EachGroupNumbers, LeagueTypes, PlacementQualifierTypes, PlaysWithEachOtherTypes, type TournamentFormType } from '../models/tournamentForm.model';
import { type RadioButtonProps, type SelectDropdownProps } from 'core/models/input.model';
import { useTranslation } from 'react-i18next';
import { AllCaptoOption } from 'core/utils/utils';
import { useEffect, useState } from 'react';
import { getTeamsNumbers } from '../helpers/utils';
import { isTeamsSpreadableByGroups } from '../helpers/validators';
import { isThereErrorInSubForm } from '../shared/utils';
import { type Teams } from 'API';

export interface UseTournamentTypesHook {
  roundRobinRadioPropOpt1: RadioButtonProps
  singleEliminationRadioPropOpt2: RadioButtonProps
  placementQualifiersSelectProp: SelectDropdownProps
  teamPlayWithSelectProp: SelectDropdownProps
  groupTeamSelectProp: SelectDropdownProps
  numOfTeamsProps: SelectDropdownProps
  isValid: boolean
  isTypeRoundRobbin: boolean | null
  getValues: UseFormGetValues<TournamentFormType>
  watch: UseFormWatch<TournamentFormType>
}

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
*   numOfTeamsProps: SelectDropdownProps,
*   isFirstStepValid: boolean
* }} Object containing properties for image upload, league name input, league description input,
* form validation status, and first step validation status.
*/
// TODO: I'm not using register, getValues
export function useTournamentType (teams: Teams[]): UseTournamentTypesHook {
  const {
    control, register,
    formState, getFieldState, watch, getValues
  } = useFormContext<TournamentFormType>();

  const [isTypeRoundRobbin, setIsTypeRoundRobbin] = useState<boolean | null>(null);
  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourTypeStep' });
  const [isValid, setIsValid] = useState(false);

  const numOfteams = watch('numOfTeams');
  const tourneyType = watch('type');

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value?.type === 'ROUNDROBIN') {
        setIsValid(isThereErrorInSubForm<TournamentFormType>(['numOfTeams', 'groupTeams', 'type'], getFieldState));
        setIsTypeRoundRobbin(true);
      } else if (value?.type === null) {
        setIsTypeRoundRobbin(null);
      } else {
        setIsValid(isThereErrorInSubForm<TournamentFormType>(['numOfTeams', 'type'], getFieldState));
        setIsTypeRoundRobbin(false);
      }
    }
    );
    return () => { subscription.unsubscribe(); };
  }, [watch]);

  const placementQualifiersSelectProp: SelectDropdownProps = {
    legendText: 'Select',
    placeholder: 'Select',
    id: 'placementQualifier',
    cyData: 'placementQualifier',
    fieldNameControl: 'placementQualifier',
    type: 'primary',
    fieldState: getFieldState('placementQualifier', formState),
    registrationOption:
      register(
        'placementQualifier',
        { required: true }
      ),
    options: Object.keys(PlacementQualifierTypes).map((_, index) => AllCaptoOption(PlacementQualifierTypes[index])),
    formControl: control
  };

  const teamPlayWithSelectProp: SelectDropdownProps = {
    legendText: 'Select',
    placeholder: 'Select',
    id: 'playsWithEachOtherInput',
    cyData: 'playsWithEachOtherInput',
    type: 'primary',
    fieldNameControl: 'teamPlayWithEach',
    fieldState: getFieldState('teamPlayWithEach', formState),
    registrationOption:
      register(
        'teamPlayWithEach',
        { required: tourneyType === 'ROUNDROBIN' }
      ),
    options: Object.keys(PlaysWithEachOtherTypes).map((_, index) => AllCaptoOption(PlaysWithEachOtherTypes[index])),
    formControl: control
  };

  const groupTeamSelectProp: SelectDropdownProps = {
    legendText: 'Select',
    placeholder: 'Select',
    id: 'groupTeams',
    cyData: 'groupTeams',
    type: 'primary',
    fieldNameControl: 'groupTeams',
    fieldState: getFieldState('groupTeams', formState),
    disableOption: (option) => {
      return isTeamsSpreadableByGroups(Number(numOfteams) ?? 0, Number(option.value));
    },
    registrationOption:
      register(
        'groupTeams',
        {
          required: tourneyType === 'ROUNDROBIN',
          validate: (value) => {
            if (tourneyType === 'SINGLE_ELIMINATION') return true;
            return !isTeamsSpreadableByGroups(Number(numOfteams) ?? 0, Number(value));
          }
        }
      ),
    options: Object.keys(EachGroupNumbers).map((_, index) => AllCaptoOption(EachGroupNumbers[index], 'FirstUpperCase', 'Teams')),
    formControl: control
  };

  const roundRobinRadioPropOpt1: RadioButtonProps = {
    value: LeagueTypes[0],
    id: 'roundRobinOpt',
    cyData: 'roundRobinOpt',
    registrationOption: register('type', { required: tourneyType === 'ROUNDROBIN' }),
    label: translate('groupStageOptions.roundRobin') ?? ''
  };

  const singleEliminationRadioPropOpt2: RadioButtonProps = {
    value: LeagueTypes[1],
    id: 'singleEliOpt',
    cyData: 'singleEliOpt',
    registrationOption: register('type'),
    label: translate('groupStageOptions.singleElimination') ?? ''
  };

  const numOfTeamsProps: SelectDropdownProps = {
    legendText: translate('numberOfTeamsLabel'),
    placeholder: translate('numberOfTeamsPlaceHolder'),
    id: 'numOfTeams',
    cyData: 'numOfTeams',
    showRequired: 'required',
    fieldNameControl: 'numOfTeams',
    fieldState: getFieldState('numOfTeams', formState),
    registrationOption:
      register(
        'numOfTeams',
        { required: true }
      ),
    options: getTeamsNumbers(teams?.length ?? 0),
    formControl: control,
    className: 'lg:w-1/4 sm:w-1/2 mobile:w-full'
  };

  return {
    singleEliminationRadioPropOpt2,
    roundRobinRadioPropOpt1,
    groupTeamSelectProp,
    placementQualifiersSelectProp,
    teamPlayWithSelectProp,
    numOfTeamsProps,
    isValid,
    isTypeRoundRobbin,
    getValues,
    watch
  };
};
