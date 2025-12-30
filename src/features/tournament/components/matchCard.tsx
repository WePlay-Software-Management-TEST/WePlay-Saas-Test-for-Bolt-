import React, { useState, useEffect } from 'react';
import { ReactComponent as TimeIcon } from 'assets/svgs/TimeiconMatch.svg';
import { ReactComponent as LocationIcon } from 'assets/svgs/Pin_light.svg';
import { ReactComponent as PlaceholderIcon } from 'assets/svgs/fluent_flag-clock.svg';
import { type MatchDetails } from '../models/tournamentForm.model';
import { formatDate, formatTime, getInitials, abbreviateGroupName } from 'core/utils/utils';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';

type Props = MatchDetails & {
  id: string
  inBracket?: boolean
  selected?: boolean
  groupName?: string
  highlightBefore?: boolean
  hideBorders?: boolean
  className?: string
  hideScore?: boolean
};
/**
 * Renders a match card component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.teamAImg - The image URL for team A.
 * @param {string} props.teamAName - The name of team A.
 * @param {string} props.teamBImg - The image URL for team B.
 * @param {string} props.teamBName - The name of team B.
 * @param {string} props.matchDate - The date of the match.
 * @param {string} props.matchLocation - The location of the match.
 * @returns {JSX.Element} The match card component.
 */
export function MatchCard ({
  homeTeamImg,
  awayTeamImg,
  id,
  inBracket = false,
  selected = false,
  highlightBefore = false,
  groupName,
  hideBorders = false,
  className = '',
  hideScore = false,
  ...props
}: Props): JSX.Element {
  const imageCache = useImageCache();
  const [awayTeamImage, setAwayTeamImage] = useState('');
  const [homeTeamImage, sethomeTeamImage] = useState('');
  const [timeOfMatch] = useState(formatTime(props.startTime));

  const placeholderText = `Winners ${String(abbreviateGroupName(groupName))}`;

  const RenderTeam = ({ teamImg, label, placeholderText }: any): JSX.Element => {
    const renderBadge = (): JSX.Element => {
      if (teamImg) {
        return (
        <figure>
          <img
            src={teamImg}
            alt={label || 'team'}
            className="w-6 h-4 rounded bg-secondary"
          />
        </figure>
        );
      }

      if (label && label !== 'TBD') {
        return (
        <div className="w-6 h-4 rounded bg-secondary text-white text-center text-xs">
          {getInitials(label)}
        </div>
        );
      }

      return <PlaceholderIcon />;
    };

    const renderLabel = (): JSX.Element => {
      if (label === 'TBD') return placeholderText || '';

      return label || placeholderText;
    };

    return (
    <>
      {renderBadge()}
      {renderLabel()}
    </>
    );
  };

  useEffect(() => {
    if (props.homeTeam?.extraData?.imageId) {
      void imageCache.getImageWithCache(props.homeTeam.extraData.imageId).then(sethomeTeamImage);
    } else {
      sethomeTeamImage('');
    }

    if (props.awayTeam?.extraData?.imageId) {
      void imageCache.getImageWithCache(props.awayTeam.extraData.imageId).then(setAwayTeamImage);
    } else {
      setAwayTeamImage('');
    }
  }, [props.homeTeam, props.awayTeam, imageCache]);
  return (
    <label role={groupName} className={`
    ${inBracket
      ? 'border !rounded-lg p-4 tournament-bracket__match before:!content-[attr(role)] min-w-[320px]'
      : 'card-divider py-6 px-4 !pl-0 !rounded-none'} card cursor-pointer ${inBracket && selected ? 'border-secondary' : 'border-grey-90'}
     ${highlightBefore ? 'tournament-match-selected' : ''}
     ${inBracket ? '' : ''}
     ${hideBorders ? '!border-none !border-transparent' : 'shadow-sm'}
     ${((props?.matchIsDone ?? false)) ? '!bg-indictor-success !bg-opacity-10' : ''}
     ${className}
     `} htmlFor={id}>
    <div className="card-body !p-0">
      <div className='flex flex-col gap-1'>
        <span className='flex justify-between items-center'>
          <span className='flex gap-2 body-xs-text text-grey-10'>
          <RenderTeam teamImg={homeTeamImage} label={props.homeTeam?.label} placeholderText={placeholderText} />
          </span>
          {!hideScore && <span className='bg-grey-98 text-center text-grey-10 font-normal text-sm border border-grey-90 rounded-md w-9'>
            {props.homeTeamScore?.length ?? 0}
          </span>
          }
        </span>
        <span className='flex justify-between items-center'>
          <span className='flex gap-2 body-xs-text text-grey-10'>
            <RenderTeam teamImg={awayTeamImage} label={props.awayTeam?.label} placeholderText={placeholderText} />
          </span>
          {!hideScore && <span className='bg-grey-98 text-center text-grey-10 font-normal text-sm border border-grey-90 rounded-md w-9 min-w-9'>
              {props.awayTeamScore?.length ?? 0}
          </span>
          }
        </span>
      </div>
      <div className='flex gap-4'>
        <span className='flex gap-1 justify-start items-center body-xxs-text text-grey-10 leading-4'><TimeIcon />
          {
            timeOfMatch === 'Invalid Date'
              ? <span className='text-indictor-error'>No Space for this match</span>
              : <span>{formatDate(props.startDate, { month: 'short', day: 'numeric' }, 'en-UK', true)} - {timeOfMatch}</span>
          }
        </span>
        <span className={`max-w-15 flex gap-1 justify-start items-center body-xxs-text text-grey-10 leading-4 text-ellipsis ${props.matchField?.label === '' ? 'text-indictor-error' : ''}`}>
          <LocationIcon />
          {props.matchField?.label === '' ? 'No Field' : props.matchField?.label}
          </span>
      </div>
    </div>
  </label>
  );
};
