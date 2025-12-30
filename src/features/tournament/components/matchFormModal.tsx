import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectInput from 'core/components/input/selectInput';
import { CalendarInput } from 'core/components/input/calendar';
import Input from 'core/components/input/input';
import { SecondaryModal } from 'core/components/modal/secondaryModal';
import TextArea from 'core/components/input/textArea';
import { type AutoCompletePlayers, type Option } from 'core/models/input.model';
import { type MatchFormInputProps } from '../hooks/tournamentSchedule.hook';
import { type UseFormGetValues, type UseFormGetFieldState, useForm, useFormContext, type Control, type UseFormRegister } from 'react-hook-form';
import { type TournamentFormType, type FieldFormType, type TournamentScheduleForm, type MatchDetails } from '../models/tournamentForm.model';
import { ReactComponent as PlusIcon } from 'assets/svgs/plusIconSmall.svg';
import { ReactComponent as MinusIcon } from 'assets/svgs/minusIcon.svg';
import DropdownButton from 'core/components/button/dropdownButton';
import { AddScoreDropDown } from './addScoreDropdown';
import Button from 'core/components/button/button';
import { updateMatchRequest } from '../tournament.service';
import { ReactComponent as FlagIcon } from 'assets/svgs/Flag.svg';
import { toastService } from 'core/services/toast.service';
import useAuthContext from 'core/context/userContext/userContext.consumer';

interface MatchFieldModalProps {
  groupIndex: number
  matchIndex: number
  id: string
  onSave: (matchIndex: number, didItUpdate?: boolean) => Promise<void>
  getMatchFormInputProps: (groupIndex: number, getFieldPlace: UseFormGetFieldState<MatchDetails>, controlPlace: Control<MatchDetails>, registerPlace: UseFormRegister<MatchDetails>) => MatchFormInputProps
  getFieldState: UseFormGetFieldState<TournamentScheduleForm>
  selectedFields: Array<Option<FieldFormType>>
  playOffset?: boolean
  getValues: UseFormGetValues<TournamentFormType>
};

/**
 * Renders a modal for editing match fields.
 *
 * @param selectedFields - Array of allowed fields for the match.
 * @param getFieldState - Function to get the state of a field React-hook-form.
 * @param groupIndex - Index of the group the match belongs to.
 * @param matchIndex - Index of the match within the group.
 * @param id - Unique identifier for the match.
 * @param onSave - Function to save the edited match fields.
 * @param getMatchFormInputProps - Function to get input props for the match form.
 * @returns JSX element representing the match field modal.
 */
export const MatchFieldModal = function MatchFieldModal ({ playOffset, selectedFields, groupIndex, matchIndex, id, onSave, getMatchFormInputProps, getValues }: MatchFieldModalProps): JSX.Element {
  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourPreviewStep' });
  const [savedMatchIndex] = useState(matchIndex);
  const [defaultMatchValue] = useState(getValues?.(`groups.${groupIndex}.matches.${matchIndex}`));
  const { setValue } = useFormContext<TournamentFormType>();

  const { user } = useAuthContext();

  const {
    control: placeHolderControl,
    getValues: getPlaceHolderValues,
    reset, formState: { isValid, isDirty }, getFieldState, register, setValue: setValuePlaceholder, watch
  } = useForm<MatchDetails>({
    defaultValues: defaultMatchValue
  });

  const placeHolderEndDate = watch('endDate');
  const [inputProps] = useState(getMatchFormInputProps(groupIndex, getFieldState, placeHolderControl, register));

  const [homeTeamPlayersOptions] = useState(getPlaceHolderValues?.('homeTeamPlayers'));
  const [awayTeamPlayersOptions] = useState(getPlaceHolderValues?.('awayTeamPlayers'));

  const homeTeamScoreCount = watch('homeTeamScore');
  const awayTeamScoreCount = watch('awayTeamScore');
  const homeTeamPlayers: AutoCompletePlayers = {
    cyData: 'cypressAutoComplete',
    options: homeTeamPlayersOptions ?? [],
    menuPlacement: 'bottom',
    addScore: true,
    control: placeHolderControl,
    fieldName: 'homeTeamScore',
    addOrRemove: true
  };

  const homeTeamScores: AutoCompletePlayers = {
    cyData: 'cypressAutoComplete',
    options: homeTeamScoreCount ?? [],
    menuPlacement: 'bottom',
    addScore: true,
    control: placeHolderControl,
    fieldName: 'homeTeamScore',
    addOrRemove: false
  };
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  const awayTeamsPlayers: AutoCompletePlayers = {
    cyData: 'cypressAutoComplete',
    options: awayTeamPlayersOptions ?? [],
    menuPlacement: 'bottom',
    addScore: true,
    control: placeHolderControl,
    fieldName: 'awayTeamScore',
    addOrRemove: true

  };

  const awayTeamScores: AutoCompletePlayers = {
    cyData: 'cypressAutoComplete',
    options: awayTeamScoreCount ?? [],
    menuPlacement: 'bottom',
    addScore: true,
    control: placeHolderControl,
    fieldName: 'awayTeamScore',
    addOrRemove: false
  };
  const onClick = async (): Promise<void> => {
    setValue(`groups.${groupIndex}.matches.${matchIndex}`, getPlaceHolderValues());
    let didMatchPartyUpdate: boolean | undefined = false;
    if (playOffset === true) {
      try {
        didMatchPartyUpdate = await updateMatchRequest(getPlaceHolderValues(), getValues());
        toastService('Match have been updated!', 'secondary');
      } catch (err) {
        console.warn(JSON.stringify(err));
        toastService('Something went wrong!', 'error');
        return;
      }
    };
    await onSave(savedMatchIndex, didMatchPartyUpdate);
  };

  const onCancel = (): void => {
    reset(defaultMatchValue);
  };

  const onFinishMatch = (): void => {
    const currentEndDateValue = getPlaceHolderValues('endDate');
    if (currentEndDateValue === null || currentEndDateValue === undefined) {
      setValuePlaceholder('endDate', new Date(), { shouldDirty: true });
      return;
    };
    setValuePlaceholder('endDate', undefined, { shouldDirty: true });
    setValuePlaceholder('matchIsDone', false);
  };

  return <SecondaryModal onCancel={onCancel} header={translate('matchDetailsHeader')} id={id} mainButtonProps={{
    text: translate('saveChangesBtn'),
    type: 'primary',
    asyncOnClick: onClick,
    isValidChecked: (isValid && isDirty)
  }}>
    <form className='flex lg:flex-row sm:flex-col mobile:flex-col py-6 border-t border-grey-90 lg:gap-11 mobile:gap-4 items-center content-center justify-center'>
      <div className='flex flex-col lg:min-w-[405px] mobile:min-w-0 sm:min-w-0 lg:border-r mobile:border-0 sm:border-0 border-grey-90'>
        <div className='flex flex-col lg:max-w-[90%] mobile:max-w-full sm:max-w-full lg:gap-8 sm:gap-4 mobile:gap-2'>
        <span className='flex justify-between items-center w-full gap-6'>
        <SelectInput {...inputProps.homeTeamSelectProps} isDisabled={playOffset}/>
        { playOffset === true && <span className='flex items-center gap-2'>
          <DropdownButton forceDisable={(homeTeamScoreCount?.length ?? 0) === 0}
          cyData='addScoreToHomeTeam' labelClassName='!px-5' Icon={MinusIcon} textClassName='fill-grey-10 stroke-grey-10' dropDownSize='small' dropDownType='secondary'
          buttonText={''} options={(homeTeamScoreCount ?? []) as unknown as string[]}>{<AddScoreDropDown {...homeTeamScores} addScore={false} />}
        </DropdownButton>
          <p className='text-base text-grey-10 font-medium'>{homeTeamScoreCount?.length ?? 0}</p>
        <DropdownButton
          cyData='addScoreToHomeTeam' labelClassName='!px-4' Icon={PlusIcon} textClassName='fill-white stroke-white' dropDownSize='small' dropDownType='primary'
          buttonText={''} options={(homeTeamPlayers.options ?? []) as unknown as string[]}>
            <AddScoreDropDown {...homeTeamPlayers}/>
        </DropdownButton>
        </span> }
        </span>
        <span className='flex justify-between items-center w-full gap-6'>
        <SelectInput {...inputProps.awayTeamSelectProps} isDisabled={playOffset}/>
        { playOffset === true && <span className='flex items-center gap-2'>
          <DropdownButton forceDisable={(awayTeamScoreCount?.length ?? 0) === 0}
          cyData='addScoreToHomeTeam' className='!z-[3]' labelClassName='!px-5' Icon={MinusIcon} textClassName='fill-grey-10 stroke-grey-10' dropDownSize='small' dropDownType='secondary'
          buttonText={''} options={(awayTeamScoreCount ?? []) as unknown as string[]}>{<AddScoreDropDown {...awayTeamScores} addScore={false}/>}
        </DropdownButton>
          <p className='text-base text-grey-10 font-medium'>{awayTeamScoreCount?.length ?? 0}</p>
        <DropdownButton
          cyData='addScoreToHomeTeam' className='!z-[3]' labelClassName='!px-4' Icon={PlusIcon} textClassName='fill-white stroke-white' dropDownSize='small' dropDownType='primary'
          buttonText={''} options={(awayTeamsPlayers.options ?? []) as unknown as string[]}>
            <AddScoreDropDown {...awayTeamsPlayers}/>
        </DropdownButton>
        </span> }
        </span>
        <div className='divider mobile:hidden'></div>
        <span className='flex md:flex-row mobile:flex-col lg:gap-4 mobile:gap-1'>
          <CalendarInput {...inputProps.matchStartDateProps} isDisabled={user.role === '2'} />
          <Input {...inputProps.matchStartTimeProps} isDisabled={user.role === '2'} />
        </span>
        <SelectInput {...inputProps.matchFieldSelectProps} options={selectedFields as unknown as Option[]} isDisabled={user.role === '2'}/>
        </div>
      </div>
        <div className='flex flex-col gap-3 justify-between h-[500px] w-full'>
        { playOffset === true && <Button
        className={`${placeHolderEndDate !== null && placeHolderEndDate !== undefined ? 'stroke-grey-10' : 'stroke-white'}`}
        type={placeHolderEndDate === null || placeHolderEndDate === undefined ? 'primary' : 'secondary'}
        showIcon iconPosition='right' Icon={FlagIcon}
        text={placeHolderEndDate === null || placeHolderEndDate === undefined ? 'End Match' : 'Resume Match'}
        onClickCallable={onFinishMatch}/>}
        <TextArea {...inputProps.matchDescTextAreaProps}/>
        </div>
    </form>
  </SecondaryModal>;
};
