import React, { Fragment } from 'react';
import { type MatchDetails, type FieldFormType, type TournamentFormType } from '../models/tournamentForm.model';
import { MatchCard } from './matchCard';
import { MatchFieldModal } from './matchFormModal';
import { type MatchFormInputProps } from '../hooks/tournamentSchedule.hook';
import { type UseFormGetFieldState, useFieldArray, type UseFormGetValues, type Control, type UseFormRegister } from 'react-hook-form';
import { type Option } from 'core/models/input.model';

interface MatchesFieldsProps {
  getMatchFormInputProps: (groupIndex: number, getFieldPlace: UseFormGetFieldState<MatchDetails>, controlPlace: Control<MatchDetails>, registerPlace: UseFormRegister<MatchDetails>) => MatchFormInputProps

  getFieldState: UseFormGetFieldState<TournamentFormType>
  selectedFields: Array<Option<FieldFormType>>
  getValues: UseFormGetValues<TournamentFormType>
  control: any
  groupIndex: number
  isBracket?: boolean
  groupName?: string
  highLight?: number
  playOffset?: boolean
  updateMatches?: () => Promise<void>
  hideBorders?: boolean
  hideScore?: boolean
  hideDivider?: boolean
  byDay?: boolean
};

/**
 * Renders a list of matches fields based on the provided parameters.
 * Two versions, one is for roundRobin, and the other is for brackets tree
 *
 * @param {number} groupIndex - The index of the group.
 * @param {any} control - The control object.
 * @param {Function} getValues - Function to get form values.
 * @param {Function} getFieldState - Function to get field state.
 * @param {Function} getMatchFormInputProps - Function to get match form input props.
 * @param {Array<Option<FieldFormType>>} selectedFields - Array of selected field options.
 * @param {string} groupName - The name of the group.
 * @param {boolean} isBracket - Indicates if the matches are in a bracket format.
 * @param {number} highLight - hightlight match by groupName
 * @returns {JSX.Element} The rendered matches fields component.
 */
export function MatchesFields ({
  updateMatches, playOffset, groupIndex, control,
  getValues, getFieldState, getMatchFormInputProps,
  selectedFields, groupName, isBracket = false, highLight = 0,
  hideBorders = false, hideScore = false, hideDivider = false, byDay = false
}: MatchesFieldsProps): JSX.Element {
  const { fields, update } = useFieldArray<TournamentFormType, `groups.${number}.matches`>({
    control,
    name: `groups.${groupIndex}.matches`
  });
  const onSave = async (matchIndex: number, didItUpdate?: boolean): Promise<void> => {
    const match = getValues(`groups.${groupIndex}.matches.${matchIndex}`);
    const userUpdatedMatch = { ...match, userEdited: true };
    update(matchIndex, userUpdatedMatch);

    if (didItUpdate === true) {
      await updateMatches?.();
    }
  };

  return <>
  {
    fields.map((match, matchIndex) => {
      return isBracket
        ? <li className={`tournament-bracket__item  ${groupIndex === highLight ? 'tournament-bracket-item-selected' : ''}`} key={match.id}>
        <MatchCard
          {...match}
          id={match.id}
          inBracket={true}
          selected={groupIndex === highLight}
          highlightBefore={groupIndex === (highLight + 1)}
          groupName={groupName}
          hideBorders={hideBorders}
        />
        <MatchFieldModal
        groupIndex={groupIndex} matchIndex={matchIndex} playOffset={playOffset} getValues={getValues}
        id={match.id} onSave={onSave} getFieldState={getFieldState}
        getMatchFormInputProps={getMatchFormInputProps} selectedFields={selectedFields}/>
      </li>
        : <Fragment key={match.id}>
      <MatchCard
      hideBorders={hideBorders}
         {...match}
         id={match.id}
         inBracket={false}
         hideScore={hideScore}
       />
       <MatchFieldModal
       groupIndex={groupIndex} matchIndex={matchIndex} getValues={getValues} playOffset={playOffset}
       id={match.id} onSave={onSave} getFieldState={getFieldState}
       getMatchFormInputProps={getMatchFormInputProps} selectedFields={selectedFields}/>
       { ((matchIndex + 1) % 3 !== 0) && !hideDivider &&
        <div className="divider my-4 divider-horizontal justify-self-end"></div>
       }
   </Fragment>
      ;
    })
  }
  </>;
};
