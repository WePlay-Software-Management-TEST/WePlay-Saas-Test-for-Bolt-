import React from 'react';
import SelectInput from 'core/components/input/selectInput';
import RadioButton from 'core/components/button/radioButton';
import { useTranslation } from 'react-i18next';
import { useTournamentType } from '../hooks/tournamentType.hook';
import { NextStepBtn } from '../shared/nextStepBtn';
import { type TournamentFormType } from '../models/tournamentForm.model';
import { type Teams } from 'API';

interface Props { incrementStep: () => void, tourney?: TournamentFormType, teams: Teams[] };

/**
 * React component for rendering a form to select tournament types and related options.
 * @param incrementStep - Function to advance the form to the next step.
 * @returns JSX element representing the tournament type selection form.
 */
export function TournamentType ({ incrementStep, tourney, teams }: Props): JSX.Element {
  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourTypeStep' });

  const {
    roundRobinRadioPropOpt1,
    singleEliminationRadioPropOpt2,
    teamPlayWithSelectProp,
    groupTeamSelectProp,
    placementQualifiersSelectProp,
    isValid,
    isTypeRoundRobbin,
    numOfTeamsProps
  } = useTournamentType(teams);

  return (
    <>
      <div className='flex flex-col'>
        <p className='pb-4 text-base font-semibold text-grey-10 flex'>
          {translate('groupStageTitle')}&#160;
          <span className='text-indictor-error'>*</span>
        </p>
        <form
          role='tournamentType-Form'
          id='tournamentType-Form'
          className='flex flex-col gap-8'
          method='POST'
          onSubmit={(e) => { e.preventDefault(); }}>
          <span className='flex gap-6 mobile:gap-2.5'>
            <RadioButton {...roundRobinRadioPropOpt1} disabled={tourney !== undefined}/>
            <RadioButton {...singleEliminationRadioPropOpt2} disabled={tourney !== undefined}/>
          </span>
          { isTypeRoundRobbin !== null && <SelectInput {...numOfTeamsProps}/>}
          {isTypeRoundRobbin !== null && isTypeRoundRobbin && (
            <span className='flex mobile:flex-col mobile:gap-2 sm:flex-wrap lg:flex-nowrap sm:gap-y-2 lg:gap-y-0'>
                  <span className='flex gap-2 items-center justify-center mobile:items-start mobile:flex-col'>
                    <p className='whitespace-nowrap mobile:whitespace-wrap body-xxs-text text-center mobile:text-left'>
                      {translate('playWithEachOtherLabel')}
                    </p>
                    <SelectInput {...teamPlayWithSelectProp} type='secondary' />
                  </span>
                  <div className='divider divider-horizontal'></div>
              <span className='flex gap-2 items-center justify-center mobile:items-start mobile:flex-col'>
                <p className='whitespace-nowrap mobile:whitespace-wrap body-xxs-text text-center mobile:text-left'>
                  {translate('eachGroupingLabel')}
                </p>
                <SelectInput {...groupTeamSelectProp} type='secondary'/>
              </span>
              <div className='divider divider-horizontal'></div>
              <span className='flex gap-2 items-center justify-center mobile:items-start mobile:flex-col'>
                <p className='whitespace-nowrap mobile:whitespace-wrap body-xxs-text text-center mobile:text-left'>
                  {translate('placementQualifierLabel')}
                </p>
                <SelectInput {...placementQualifiersSelectProp} type='secondary'/>
              </span>
            </span>
          )}
          <NextStepBtn isValid={isValid || tourney !== undefined} incrementStep={incrementStep} cyData='nextStepBtn2'/>
        </form>
      </div>
    </>
  );
}
