import React, { useEffect } from 'react';
import SelectInput from 'core/components/input/selectInput';
import { CalendarInput } from 'core/components/input/calendar';
import Input from 'core/components/input/input';
import { NextStepBtn } from '../shared/nextStepBtn';
import { useTranslation } from 'react-i18next';
import { TeamsAutoComplete } from 'features/player/components/teamsAutoComplete';
import { type Option, type TeamsOptions } from 'core/models/input.model';
import { useTournamentExtraDetails } from '../hooks/tournamentExtraDetails.hook';
import { type TournamentFormType } from '../models/tournamentForm.model';
import { type Fields, type Teams } from 'API';

interface Props { incrementStep: () => void, tourney?: TournamentFormType, teams: Teams[], fields: Fields[] };

/**
 * Renders a form component for entering tournament extra details.
 *
 * @param {Function} incrementStep - Function to increment the step in the form
 *
 * @returns {JSX.Element} - Returns the JSX element representing the tournament extra details form
 */
export function TournamentExtraDetails ({ incrementStep, tourney, teams, fields }: Props): JSX.Element {
  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourDetailsStep' });
  const {
    sportTypeDropdown, divisionTypesDropdown,
    numOfFieldsDropdown, startDateProps, finishDateProps, startTimeProps,
    endTimeProps, matchesDurationProps, daysOfMatchesProps,
    teamsListProps, isValid, numOfTeams, setValue
  } = useTournamentExtraDetails(fields);

  useEffect(() => {
    if (tourney !== undefined) return;

    setValue('teamsList', teams?.slice(0, numOfTeams ?? 8).map((team): Option<TeamsOptions> => {
      return {
        label: team.TeamName,
        value: team.id,
        extraData: {
          imageId: team?.PhotoId ?? '',
          city: team?.City ?? '',
          state: team?.State ?? ''
        }
      };
    }) ?? []);
  }, [teams, numOfTeams, setValue, tourney]);

  return (
    <form id='tournamentExtraDetails-form' onSubmit={(e) => { e.preventDefault(); }} method='post'>
    <div className='grid grid-cols-3 gap-x-10 gap-y-8 pb-8 mobile:grid-cols-1 mobile:gap-y-1'>
    <SelectInput {...sportTypeDropdown}/>
    <SelectInput {...divisionTypesDropdown}/>
    <SelectInput {...numOfFieldsDropdown}/>
    <CalendarInput {...startDateProps}/>
    <CalendarInput {...finishDateProps}/>
    <Input {...startTimeProps}/>
    <Input {...endTimeProps}/>
    <SelectInput {...matchesDurationProps}/>
    <SelectInput {...daysOfMatchesProps} className='col-span-1'/>
    <div
    className='grid grid-cols-3 col-span-full gap-6 mobile:gap-3 gap-x-10 gap-y-4 mobile:grid-cols-1 mobile:gap-y-1'>
      <p className='body-md-text text-grey-10 col-span-full'>{translate('assignTeamsLabel')}</p>
      <TeamsAutoComplete {...teamsListProps} options={
       teams?.map === undefined
         ? []
         : teams?.map((team): Option<TeamsOptions> => {
           return {
             label: team.TeamName,
             value: team.id,
             extraData: {
               imageId: team?.PhotoId ?? '',
               city: team?.City ?? '',
               state: team?.State ?? ''
             }
           };
         })}
       />
    </div>
    </div>
    <NextStepBtn isValid={isValid || tourney !== undefined} incrementStep={incrementStep} cyData="nextStepBtn3"/>
    </form>
  );
}
