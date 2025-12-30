import React, { useMemo } from 'react';
import ImageUpload from 'core/components/input/imageUpload';
import Input from 'core/components/input/input';
import TextArea from 'core/components/input/textArea';
import { NextStepBtn } from 'features/tournament/shared/nextStepBtn';
import { useTranslation } from 'react-i18next';
import { useLeagueInitialForm } from '../hooks/useLeagueInitialForm';

/**
 * Renders a component for capturing initial details of a league.
 * Includes fields for uploading an image, entering a league name, and providing a league description.
 * Also displays a button to proceed to the next step upon validation.
 *
 * @param {() => void} incrementStep - Function to increment the step to proceed to the next section.
 *
 * @returns {JSX.Element} A React component representing the initial details form for a league.
 */
export function LeagueInitialDetails ({ incrementStep }: { incrementStep: () => void }): JSX.Element {
  const { ImageCompProps, LeagueDescCompProps, LeagueNameCompProps, isValid } = useLeagueInitialForm();

  const { t: translate } = useTranslation(['league'], { keyPrefix: 'form.gettingStartedStep' });

  const MemoizedImageInput = useMemo((): JSX.Element => {
    return <ImageUpload {...ImageCompProps} />;
  }, [ImageCompProps]);

  return (
    <>
      <div className='flex flex-col text-gray-800 gap-6'>
        <span className='flex gap-1 items-baseline'>
          <h6 className='text-base font-semibold text-gray-800'>{translate('leaguePhoto')}</h6>
          <sub className='text-sm text-gray-500'>(optional)</sub>
        </span>
        { MemoizedImageInput }
        <h6 className='text-base font-semibold text-gray-800'>{translate('leagueDetails')}</h6>
        <Input {...LeagueNameCompProps} />
        <TextArea {...LeagueDescCompProps} />
        <NextStepBtn isValid={isValid} incrementStep={incrementStep} cyData='nextStepBtn1' />
      </div>
    </>
  );
}
