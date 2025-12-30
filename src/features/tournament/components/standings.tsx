import React, { useState, useEffect, useMemo } from 'react';
import { type MatchDetails, type Group } from '../models/tournamentForm.model';
import Button from 'core/components/button/button';
import { TournamentFormatType, type Tournaments } from 'API';
import { formatDate, formatTime, getInitials } from 'core/utils/utils';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { type ColDef } from 'ag-grid-community';
import Table from 'core/components/table/table';
import { getTeamsStats, type TeamStat } from '../shared/utils';
import { ReactComponent as Toggle } from '../../../assets/svgs/toggle.svg';
import DropdownButton from 'core/components/button/dropdownButton';
import { timeToDate } from '../helpers/utils';
import { tournamentRulesMap } from '../models/tournament.const';

export default function Standings ({ groups, type, rules }: { groups?: Group[], type?: TournamentFormatType, rules?: Tournaments }): JSX.Element {
  const [standingHeader, setStandingHeader] = useState('Game Scores');
  const [allMatches, setAllMatches] = useState<MatchDetails[]>([]);

  const columnDefs: ColDef[] = [
    { field: 'ranking' },
    {
      field: 'Team Name',
      cellRenderer: ({ data }: any) => {
        if (data.team === undefined) return <></>;
        return <span className='flex justify-center items-center gap-2'>
          <RenderTeamImage image={data.team.extraData.imageId} teamName={data.team.label}/>
          <p>{data.team.label}</p>
        </span>;
      }
    },
    { field: 'MP' },
    { field: 'w' },
    { field: 'l' },
    { field: 'd' },
    { field: 'pts' }
  ];

  const [teamsInTourney, setTeamsInTourney] = useState<TeamStat[]>([]);
  const matchesDuration = JSON.parse(rules?.TournamentRulesVariables?.items?.find((rule) => rule?.ruleID === tournamentRulesMap.get('matchesDuration'))?.ruleVariables ?? '{}').matchesDuration;
  const imageCache = useImageCache();

  useEffect(() => {
    const allMatchesMappedout = groups?.map((group) => group.matches).flat();
    setAllMatches(allMatchesMappedout ?? []);
  }, []);

  useEffect(() => {
    const teamsStats = getTeamsStats(groups);

    setTeamsInTourney(teamsStats);
  }, [groups]);

  const RenderTeamImage = ({ image, teamName }: { image?: string, teamName?: string }): JSX.Element => {
    const [teamImage, setTeamImage] = useState('');
    useEffect(() => {
      if (image !== '' && image !== undefined) {
        void imageCache.getImageWithCache(image).then((image) => {
          setTeamImage(image);
        });
      }
    }, []);
    return <>
    {
      teamImage !== ''
        ? <><figure> <img src={teamImage} alt='team' className='w-6 h-4 rounded bg-secondary' /> </figure></>
        : <div className='w-6 h-4 rounded bg-secondary text-white text-center text-xs'>{getInitials(teamName ?? 'TBD')}</div>
    }</>;
  };

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100
    };
  }, []);

  const fullWidthCellRenderer = ({ data }: any): JSX.Element => {
    return <div className='w-full h-full flex justify-start items-center text-grey-10 font-semibold text-base'>
      {data.groupName}
    </div>;
  };

  const RenderContent = (): JSX.Element => {
    if (standingHeader === 'Team Standings') {
      return <>
        <Table
          rowData={teamsInTourney}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          noRowsOverlayComponent={() => <></>}
          isFullWidthRow={ ({ rowNode }) => rowNode.data.fullWidth === true }
          fullWidthCellRenderer={fullWidthCellRenderer}
        />
      </>;
    }

    const RenderGamesScores = (): JSX.Element => {
      const finishedMatches = allMatches.filter((match) => match.matchIsDone);

      if (finishedMatches.length === 0 || finishedMatches === undefined) {
        return <h3 className='text-center mobile:text-lg md:text-xl'>No Matches Have been Completed</h3>;
      }

      return <>
      {
        finishedMatches?.map((match) => {
          const whoWon = (match.awayTeamScore?.length ?? 0) > (match.homeTeamScore?.length ?? 0) ? 'AWAY' : 'HOME';
          const today = new Date();
          const minimumDate = timeToDate(String(match.startTime), 'h:m', match.startDate);
          const fullMatchDuration = isNaN(Number(matchesDuration)) ? 90 : (Number(matchesDuration) ?? 45) * 2;

          const expectedEndDate = new Date(minimumDate.getTime() + fullMatchDuration * 60000);

          const isMatchLive = today.getTime() > minimumDate.getTime() && today.getTime() < expectedEndDate.getTime();

          if (match.awayTeam?.label === 'TBD' && match.homeTeam?.label === 'TBD') return <></>;

          return <span key={match.id} className='flex justify-between items-center flex-nowrap py-4'>
             <span className='text-sm text-grey-70 font-normal uppercase flex gap-6 items-center'>
              <span>
              {formatDate(match.startDate, { month: 'short', day: 'numeric' }, 'en-US')} {formatTime(match.startTime)}
              </span>
              {
                isMatchLive && <span className='text-indictor-success bg-indictor-success bg-opacity-10 p-2 rounded-lg animate-pulse'>live</span>
              }
             </span>
             <span className='grid gap-4 auto 50px auto flex-nowrap items-center justify-end w-96 max-w-96 grid-cols-[150px_30px_180px]'>
              <p className={`${whoWon === 'AWAY' ? 'font-semibold' : ''} flex gap-2 items-center justify-end text-nowrap text-ellipsis`}>
              { match.awayTeam?.label}
              <RenderTeamImage image={match.awayTeam?.extraData?.imageId} teamName={match.awayTeam?.label}/>
              </p>
                <strong className='w-9'>
                {match.awayTeamScore?.length}:{match.homeTeamScore?.length}
                </strong>
              <p className={`${whoWon === 'HOME' ? 'font-semibold' : ''} flex gap-2 items-center justify-start text-nowrap text-ellipsis`}>
              <RenderTeamImage image={match.homeTeam?.extraData?.imageId} teamName={match.homeTeam?.label}/>
              { match.homeTeam?.label}
              </p>
             </span>
             </span>;
        })
      }</>;
    };

    if (standingHeader === 'Game Scores') {
      return <div className='py-4'>
      <RenderGamesScores />
      </div>;
    }
    return <></>;
  };
  return <div className='w-full flex flex-col px-6'>
    <div className='flex justify-between items-center py-4 border-t border-b border-grey-90'>
      <p className='font-semibold md:text-lg sm:text-base text-grey-20'>
        { standingHeader}
      </p>
      <span className='flex gap-2 md:flex mobile:hidden'>
            {
              type === TournamentFormatType.ROUNDROBIN && <Button
              type={standingHeader === 'Team Standings' ? 'primary' : 'tertiary'}
              text='Team Standings'
              className=''
              cyData='addCaptainButton'
              size='medium'
              onClickCallable={() => { setStandingHeader('Team Standings'); }} />
            }
            <Button
                type={standingHeader === 'Game Scores' ? 'primary' : 'tertiary'}
                text='Game Scores'
                className=''
                cyData='addCaptainButton'
                size='medium'
                onClickCallable={() => { setStandingHeader('Game Scores'); }} />
      </span>

      <DropdownButton className='md:hidden mobile:flex' labelClassName='border-transparent shadow-none' Icon={Toggle} buttonText='' cyData='tourneyToggle'>
              <span className='flex flex-col w-full'>
                <label className={`px-4 py-3 ${standingHeader === 'Team Standings' ? 'text-secondary' : ''}`}
                onClick={() => { setStandingHeader('Team Standings'); }}
                >
                Team Standings
                </label>
                <label className={`px-4 py-3 ${standingHeader === 'Game Scores' ? 'text-secondary' : ''}`}
                onClick={() => { setStandingHeader('Game Scores'); }}
                >
                Game Scores
                </label>
              </span>

            </DropdownButton>
    </div>

    <RenderContent />
  </div>;
}
