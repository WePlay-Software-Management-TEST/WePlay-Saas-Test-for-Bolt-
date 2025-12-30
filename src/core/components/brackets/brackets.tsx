import React, { useEffect, useRef } from 'react';
import './brackets.css';
import { type MatchDetails, type FieldFormType, type TournamentFormType } from 'features/tournament/models/tournamentForm.model';
import { type UseFormGetValues, type FieldArrayWithId, type UseFormGetFieldState, type Control, type UseFormRegister } from 'react-hook-form';
import { type MatchFormInputProps } from 'features/tournament/hooks/tournamentSchedule.hook';
import { type Option } from 'core/models/input.model';
import { MatchesFields } from 'features/tournament/components/matchesFields';
import TeamWonTourneyCard from 'features/tournament/components/teamWonTourneyCard';

interface SingleEliminationProps {
  getMatchFormInputProps: (groupIndex: number, getFieldPlace: UseFormGetFieldState<MatchDetails>, controlPlace: Control<MatchDetails>, registerPlace: UseFormRegister<MatchDetails>) => MatchFormInputProps
  getFieldState: UseFormGetFieldState<TournamentFormType>
  selectedFields: Array<Option<FieldFormType>>
  groups: Array<FieldArrayWithId<TournamentFormType, 'groups'>>
  getValues: UseFormGetValues<TournamentFormType>
  selectedGroup?: number
  control: any
  playOffset?: boolean
  showCard?: boolean
  winningTeam?: any
  updateMatches?: () => Promise<void>
};

/**
 * Renders a single elimination tournament bracket based on the provided groups.
 *
 * @param groups - Array of groups representing the tournament structure
 * @param getFieldState - Function to get the state of form fields
 * @param getMatchFormInputProps - Function to get input props for match form
 * @param selectedFields - Selected fields for the tournament
 * @param control - Form control object
 * @param getValues - Function to get form values
 * @param selectedGroup - highlight selected group by groupName
 * @returns JSX element representing the single elimination tournament bracket
 */
export function SingleElimination ({ playOffset, groups, getFieldState, getMatchFormInputProps, selectedFields, control, getValues, selectedGroup, updateMatches, winningTeam, showCard }: SingleEliminationProps): JSX.Element {
  const groupRefs = useRef<HTMLDivElement[]>([]);
  const showWinnerCard = showCard && winningTeam;

  useEffect(() => {
    if (selectedGroup !== undefined && groupRefs.current[selectedGroup]) {
      groupRefs.current[selectedGroup]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [selectedGroup]);

  return (
  <div className='w-full relative'>
    <div className='tournament-bracket tournament-bracket--rounded'>
      { groups.map((group, groupIndex) => {
        if (/Groups./.test(group.groupName ?? '')) return null;
        const isFinal = groupIndex === groups.length - 1;
        return <div className='tournament-bracket__round' role={group.groupName} key={group.id} ref={(el) => el && (groupRefs.current[groupIndex] = el)}>
          <ul className='tournament-bracket__list'>
            <MatchesFields
              playOffset={playOffset}
              highLight={selectedGroup}
              updateMatches={updateMatches}
              control={control}
              getValues={getValues}
              isBracket={true}
              groupName={group.groupName}
              getFieldState={getFieldState}
              groupIndex={groupIndex}
              getMatchFormInputProps={getMatchFormInputProps}
              selectedFields={selectedFields}
            />
          </ul>

          {
            isFinal && showWinnerCard && (
              <div className="block md:hidden -mt-56" role="region" aria-label="Champion">
                <ul className="flex h-full md:items-center xs:items-end">
                  <TeamWonTourneyCard
                    teamName={winningTeam.teamName}
                    teamImage={winningTeam.teamImage}
                    TourneyName={winningTeam.TourneyName}
                  />
                </ul>
              </div>
            )
          }
        </div>;
      })}
      {showWinnerCard && (
          <div className="hidden md:block mt-2" role="region" aria-label="Champion">
            <ul className="flex h-full md:items-center ">
              <TeamWonTourneyCard
                teamName={winningTeam.teamName}
                teamImage={winningTeam.teamImage}
                TourneyName={winningTeam.TourneyName}
              />
            </ul>
          </div>
      )}
    </div>
  </div>
  );
}
