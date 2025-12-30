import React, { useRef, useState, useEffect } from 'react';
import { getInitials } from 'core/utils/utils';
import CaptainIndictor from 'assets/images/captainIndictor.png';
import { ReactComponent as Avater } from 'assets/svgs/defaultUserImageIcon.svg';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';

interface InitialsAvatarProps {
  initials: string
  size?: 'medium' | 'large' | 'huge' | 'tiny'
  isCaptain?: boolean
  imageId?: string
  containerClassName?: string
  textClassName?: string
  version?: number
}
const avatarSizes = {
  medium: 'w-10',
  large: 'w-12',
  huge: 'w-17',
  tiny: 'w-6'
};

const textSizes = {
  medium: 'text-base',
  large: 'text-2xl',
  huge: 'text-6xl',
  tiny: 'text-xs h-7'
};

/**
 * @component Default Avater in WePlay Design System, Circular shape with the profile name Initials inside of it.
 * @param { 'medium' | 'large' | 'huge' | 'tiny' | undefined } size - Indicate the size of the text & size of the avatar.
 * @param { string } initials - Text to show inside of the avatar.
 * @param { boolean } isCaptain - Should show a C illustration beside the avater to indicate Player Status as Captain
 * @param { string } containerClassName - Additional CSS Class names you like to add to container div.
 * @param { string } textClassName - Additional CSS Class names you like to add to avatar initials text.
 * @returns { JSX.Element }
 */
export function InitialsAvatar ({ initials, size = 'large', isCaptain = false, imageId = '', containerClassName = '', textClassName = '', version }: InitialsAvatarProps): JSX.Element {
  const avatarSize = useRef(avatarSizes[size]);
  const textSize = useRef(textSizes[size]);
  const backgroundColor = useRef(size === 'huge' ? 'bg-dodger-blue-90' : 'bg-dodger-blue-98');
  const [shortHand, setShortHand] = useState(initials);
  const { getImageWithCache } = useImageCache();
  const [cachedImage, setCachedImage] = useState('');

  const RenderAvatar = (): JSX.Element => {
    if (cachedImage) {
      return <img src={cachedImage} alt="avatar"/>;
    }
    if (imageId === '') {
      return <span
      className={`${textSize.current} ${textClassName} 
      text-dodger-blue-60 leading-8`} data-cy='defaultAvatar-span'>{ shortHand }
      </span>;
    }
    if (/^(blob:|https?:\/\/)/.test(imageId)) {
      return <img src={imageId} alt="avatar" />;
    }
    return initials
      ? <span className={`${textSize.current} ${textClassName}`}>{shortHand}</span>
      : <Avater />;
  };

  useEffect(() => {
    if (initials.length > 3) {
      setShortHand(getInitials(initials));
      return;
    }
    setShortHand(initials);
  }, [initials]);

  useEffect(() => {
    if (!imageId) {
      setCachedImage('');
      return;
    }

    setCachedImage('');

    if (/^(blob:|https?:\/\/)/.test(imageId)) {
      setCachedImage(imageId);
      return;
    }

    getImageWithCache(imageId)
      .then(url => { setCachedImage(url); })
      .catch(() => { setCachedImage(''); });
  }, [imageId, getImageWithCache, version]);

  return (
    <div className={`avatar placeholder overflow-visible ${isCaptain ? 'indicator' : ''}`}>
      <div className={`${containerClassName} text-neutral-content overflow-visible rounded-full border border-dodger-blue-90 
      ${backgroundColor.current} ${avatarSize.current}`} data-cy='defaultAvatar-container'>
        <RenderAvatar />
      </div>
      {
      isCaptain &&
      <span
      className="
      indicator-item rounded-full
      indicator-bottom !p-0 overflow-visible
      mr-1 mb-1 !border-2 !border-white">
        <img src={CaptainIndictor} className='bg-contain scale-125'/>
        </span> }
    </div>
  );
};
