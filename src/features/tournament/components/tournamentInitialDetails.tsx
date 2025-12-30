import React, { useMemo } from 'react';
import ImageUpload from 'core/components/input/imageUpload';
import Input from 'core/components/input/input';
import TextArea from 'core/components/input/textArea';
import { useTournamentInitialForm } from '../hooks/tournamentInitialDetails.hook';
import { useTranslation } from 'react-i18next';
import { NextStepBtn } from '../shared/nextStepBtn';
import { type TournamentFormType } from '../models/tournamentForm.model';

/**
 * Renders a component for capturing initial details of a tournament.
 * Includes fields for uploading an image, entering a league name, and providing a league description.
 * Also displays a button to proceed to the next step upon validation.
 *
 * @param {() => void} incrementStep - Function to increment the step to proceed to the next section.
 *
 * @returns {JSX.Element} A React component representing the initial details form for a tournament.
 */
export function TournamentInitialDetails ({ incrementStep, tourney }: { incrementStep: () => void, tourney?: TournamentFormType }): JSX.Element {
  const {
    ImageCompProps, LeagueDescCompProps, LeagueNameCompProps, isValid
  } = useTournamentInitialForm(tourney);

  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.gettingStartedStep' });
  const MemoizedImageInput = useMemo((): JSX.Element => {
    return <ImageUpload {...ImageCompProps} />;
  }, []);

  return (
    <>
    <div className='flex flex-col text-grey-10 gap-6'>
      <span className='flex gap-1 items-start'><h6 className='body-md-text text-grey-10'>{translate('tourPhoto')}</h6><sub className='text-sm text-grey-40'>(optional)</sub></span>
      { MemoizedImageInput }
      <h6 className='body-md-text text-grey-10 mobile:pb-3'>{translate('tourDetails')}</h6>
      <Input {...LeagueNameCompProps} />
      <TextArea {...LeagueDescCompProps} />
      <NextStepBtn isValid={isValid || tourney !== undefined} incrementStep={incrementStep} cyData='nextStepBtn1' />
      </div>
    </>
  );
}
