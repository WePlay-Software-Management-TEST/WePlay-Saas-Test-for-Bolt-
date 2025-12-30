import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTournamentScheduleForm } from '../hooks/tournamentSchedule.hook';
import SelectInput from 'core/components/input/selectInput';
import { CalendarInput } from 'core/components/input/calendar';
import { type TournamentFormType, type FieldFormType } from '../models/tournamentForm.model';
import { useTournamentExtraDetails } from '../hooks/tournamentExtraDetails.hook';
import { generateTourney } from 'core/utils/tourneyGenerator';
import { type Option } from 'core/models/input.model';
import { SingleElimination } from 'core/components/brackets/brackets';
import { type Fields } from 'API';
import GroupStageAccordion from './groupAccordion';

export function TournamentSchedule ({ fields, tourney }: { fields: Fields[], tourney?: TournamentFormType }): JSX.Element {
  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourPreviewStep' });
  const {
    replace, groupFields, control, getMatchFormInputProps, getFieldState, getValues
  } = useTournamentScheduleForm();

  const { daysOfMatchesProps, startDateProps, finishDateProps, sportTypeDropdown, divisionTypesDropdown, matchesDurationProps } = useTournamentExtraDetails(fields);

  const [selectedFields, setSelectedFIelds] = useState<Array<Option<FieldFormType>>>([]);

  useEffect(() => {
    if (tourney !== undefined) return;
    const tourneyFormData = getValues();
    if (tourneyFormData.id !== undefined && tourneyFormData.reGenTourney === false) return;

    const fieldOptions: Array<Option<FieldFormType>> | undefined = getValues('fieldsDetails')?.map((field) => {
      return {
        label: field.fieldName,
        value: field.fieldID ?? '',
        extraData: field
      };
    });
    if (fieldOptions !== undefined) {
      setSelectedFIelds(fieldOptions);
    };
    const tournament = generateTourney(getValues(), tourney).groups;
    replace(tournament);
  }, []);

  return (
      <>
      <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h3 className='body-xl-text text-grey-10 font-semibold'>{translate('header')}</h3>
        <p className='body-xs-text'>{translate('subParagraph')}</p>
      </div>
      <div className='grid gap-4 mobile:gap-2 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 mobile:grid-cols-1 max-w-fit mobile:max-w-none mobile:w-full'>
    { daysOfMatchesProps !== undefined &&
      startDateProps !== undefined &&
      finishDateProps !== undefined &&
      sportTypeDropdown !== undefined &&
      divisionTypesDropdown !== undefined &&
      matchesDurationProps !== undefined &&
      <>
        <SelectInput {...daysOfMatchesProps}
          id='previewDaysOfMatches'
          className='w-full'/>
        <CalendarInput {...startDateProps}
          id='previewStartDate'
          className='w-full'/>
        <CalendarInput {...finishDateProps}
          id='previewFinishDate'
          className='w-full'/>
        <SelectInput {...sportTypeDropdown}
          id='previewSportsType'
          className='w-full'/>
        <SelectInput {...divisionTypesDropdown}
          id='previewDivision'
          className='w-full'/>
        <SelectInput {...matchesDurationProps}
          id='previewMatchesDuration'
          className='w-full'/>
      </>
    }</div>
      <div className="join join-vertical w-full flex-col flex gap-6 overflow-auto">
        {
          getValues('type') === 'ROUNDROBIN'
            ? <GroupStageAccordion control={control} getValues={getValues}
            groups={groupFields} getFieldState={getFieldState} hideScore
            selectedFields={selectedFields} getMatchFormInputProps={getMatchFormInputProps} />
            : <SingleElimination control={control} getValues={getValues}
            groups={groupFields} getFieldState={getFieldState}
            selectedFields={selectedFields} getMatchFormInputProps={getMatchFormInputProps} />
        }
      </div>
      </div>
      </>
  );
};
