import React, { Fragment } from 'react';
import { type TournamentFormType, type FieldFormType, type MatchDetails } from '../models/tournamentForm.model';
import { Accordion } from './accordion';
import { alphabetArray } from 'core/context/global.const';
import { MatchesFields } from './matchesFields';
import { useTranslation, Trans } from 'react-i18next';
import { type MatchFormInputProps } from '../hooks/tournamentSchedule.hook';
import { type FieldArrayWithId, type UseFormGetValues, type UseFormGetFieldState, type Control, type UseFormRegister } from 'react-hook-form';
import { type Option } from 'core/models/input.model';

interface GroupStageAccordionProps {
  getMatchFormInputProps: (groupIndex: number, getFieldPlace: UseFormGetFieldState<MatchDetails>, controlPlace: Control<MatchDetails>, registerPlace: UseFormRegister<MatchDetails>) => MatchFormInputProps
  getFieldState: UseFormGetFieldState<TournamentFormType>
  selectedFields: Array<Option<FieldFormType>>
  groups: Array<FieldArrayWithId<TournamentFormType, 'groups'>>
  getValues: UseFormGetValues<TournamentFormType>
  control: any
  playOffset?: boolean
  updateMatches?: () => Promise<void>
  hideScore?: boolean
};

export default function GroupStageAccordion ({ playOffset, groups, control, getValues, getFieldState, getMatchFormInputProps, selectedFields, updateMatches, hideScore = false }: GroupStageAccordionProps): JSX.Element {
  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourPreviewStep' });
  return <>
    { groups.length !== 0 && groups.map((group, groupIndex) => {
      if ((!((group.groupName?.includes('Groups Stage')) ?? false) ?? false)) return <Fragment key={group.id}></Fragment>;
      return <Accordion
      key={group.id}
      title={<Trans t={translate} i18nKey={'group'} values={{ round: alphabetArray[groupIndex] }}
      />} >
        <div className='grid md:grid-cols-gridWithDivider mobile:grid-cols-1 sm:grid-cols-1'>
       <MatchesFields
       groupIndex={groupIndex} control={control} playOffset={playOffset} updateMatches={updateMatches}
       getValues={getValues} getFieldState={getFieldState} hideBorders={true} hideScore={hideScore}
       getMatchFormInputProps={getMatchFormInputProps} selectedFields={selectedFields} />
        </div>
      </Accordion>;
    })}
  </>;
}
