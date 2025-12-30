import React, { useEffect, useState } from 'react';
import { type FieldFormType, type TournamentFormType } from '../models/tournamentForm.model';
import { type Tournaments } from 'API';
import produce from 'immer';
import { SingleElimination } from 'core/components/brackets/brackets';
import { useTournamentScheduleForm } from '../hooks/tournamentSchedule.hook';
import { type Option } from 'core/models/input.model';
import GroupStageAccordionByDay from './ViewGroupStageByDay';

interface PlayOffsProps {
  tourneyForm?: TournamentFormType
  tourneyData?: Tournaments
  updateTourneyData: (brandNewLoad?: boolean) => Promise<TournamentFormType | undefined>
};
export default function PlayOffs ({ tourneyForm, tourneyData, updateTourneyData }: PlayOffsProps): JSX.Element {
  const [tourneyStages, setTourneyStages] = useState<any[]>([]);
  const [activeLink, setActiveLink] = useState(tourneyForm?.type === 'ROUNDROBIN' ? 'groupStage' : tourneyForm?.groups?.[0]?.id ?? '');
  const [highLightGroup, setHighlightGroup] = useState(0);
  const [selectedFields, setSelectedFIelds] = useState<Array<Option<FieldFormType>>>([]);
  const [finalStageSet, setFinalStageSet] = useState(false);

  const winningTeam = {
    TourneyName: tourneyForm?.leagueName,
    teamName: tourneyForm?.teamWhoWon?.label,
    teamImage: tourneyForm?.teamWhoWon?.extraData?.imageId
  };

  const {
    groupFields, control, getMatchFormInputProps, getFieldState, getValues
  } = useTournamentScheduleForm();

  const setActiveGroup = (groupID: string): void => {
    setActiveLink(groupID);
    if (groupID === 'groupStage') return;
    const groupIndex = tourneyForm?.groups?.findIndex((group) => group.id === groupID);
    setHighlightGroup(groupIndex ?? 0);

    if (groupIndex !== undefined) {
      const stage = tourneyForm?.groups?.[groupIndex];
      if (stage?.groupName === 'Final') {
        setFinalStageSet(true);
      } else {
        setFinalStageSet(false);
      }
    }
  };

  const updateMatches = async (): Promise<void> => {
    const form = await updateTourneyData(false);
    setSelectedFIelds(produce((draft) => {
      const fields = form?.fieldsDetails?.map((field) => {
        return {
          label: field.fieldName,
          value: field.fieldID ?? '',
          extraData: field
        };
      });
      return fields;
    }));

    if (form?.type === 'ROUNDROBIN') {
      setTourneyStages(produce((draft) => {
        const otherStages = form?.groups?.filter((group) => !/Groups./.test(group.groupName ?? ''));
        return otherStages;
      }));
      return;
    };
    setTourneyStages(form?.groups ?? []);
  };

  const RenderTourneySchedule = (): JSX.Element => {
    if (activeLink === 'groupStage') {
      return <div className='flex flex-col gap-4'>
      <GroupStageAccordionByDay control={control} getValues={getValues} updateMatches={updateMatches}
      groups={groupFields} getFieldState={getFieldState}
      selectedFields={selectedFields} getMatchFormInputProps={getMatchFormInputProps} playOffset={true} />
      </div>;
    };
    return <div className='relative w-full h-2/3 flex md:px-4 mobile:px-2 items-center overflow-x-auto overflow-hidden min-h-96'>
      <SingleElimination control={control} getValues={getValues} updateMatches={updateMatches} showCard={finalStageSet} winningTeam={winningTeam}
    groups={groupFields} getFieldState={getFieldState}
    selectedFields={selectedFields} getMatchFormInputProps={getMatchFormInputProps} playOffset selectedGroup={highLightGroup} />
    </div>;
  };
  useEffect(() => {
    setSelectedFIelds(produce((draft) => {
      const fields = tourneyForm?.fieldsDetails?.map((field) => {
        return {
          label: field.fieldName,
          value: field.fieldID ?? '',
          extraData: field
        };
      });
      return fields;
    }));

    if (tourneyForm?.type === 'ROUNDROBIN') {
      setTourneyStages(produce((draft) => {
        const otherStages = tourneyForm?.groups?.filter((group) => !/Groups./.test(group.groupName ?? ''));
        return otherStages;
      }));
      return;
    };
    setTourneyStages(tourneyForm?.groups ?? []);
  }, []);

  return <div className='flex flex-col gap-6 md:px-6 mobile:px-4'>
  <div className="tabs w-full border-b border-grey-90 h-[54px] md:px-6 mobile:px-2">
    {
      tourneyForm?.type === 'ROUNDROBIN' &&
      <a
      onClick={() => { setActiveGroup('groupStage'); }}
      className={`tab tab-bordered font-semibold tab-active border-b-[5px] rounded-sm text-base h-full ${activeLink === 'groupStage' ? ' !border-blue-60  text-blue-60' : '!border-grey-90 text-grey-10'}`}>
        <p>Group Stage</p>
      </a>
    }
    {
      tourneyStages.map((group) => {
        return (
          <a
          key={group.id}
          data-cy={group.groupName}
          onClick={() => { setActiveGroup(group.id); }}
          className={`tab tab-bordered font-semibold tab-active border-b-[5px] rounded-sm text-base h-full ${activeLink === group.id ? ' !border-blue-60  text-blue-60' : '!border-grey-90 text-grey-10'}`}>
            <p>{group.groupName}</p>
        </a>
        );
      })
    }
</div>
    <RenderTourneySchedule />
  </div>;
};
