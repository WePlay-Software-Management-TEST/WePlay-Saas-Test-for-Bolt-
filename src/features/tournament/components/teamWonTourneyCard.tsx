import React, { useState, useEffect } from 'react';
import { ReactComponent as Crown } from 'assets/svgs/crown.svg';
import { getInitials } from 'core/utils/utils';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';

interface TeamWonTourneyCardProps {
  teamName: string
  teamImage?: string
  TourneyName: string
}

export default function TeamWonTourneyCard ({ teamImage, teamName, TourneyName }: TeamWonTourneyCardProps): JSX.Element {
  const [image, setImage] = useState('');
  const imageCache = useImageCache();

  useEffect(() => {
    if (image === '') {
      void imageCache.getImageWithCache(teamImage ?? '').then((image) => {
        setImage(image);
      }).catch(() => {
      });
    }
    return () => {
      setImage('');
    };
  }, []);
  return <div className='absolute bottom-0 z-[49] flex items-end justify-center md:h-full pb-10'>
    <div className='text-center mt-0 md:mt-2 px-3 h-[176px] md:h-[500px] w-[360px] md:w-[375px] shadow-2xl bg-dodger-blue-40 rounded-3xl flex boxShadow-primary-hover justify-center items-center flex-col gap-4 text-white py-12'>
      <Crown />
      <span className='flex text-base font-medium items-center justify-center gap-2'>
      {
              teamImage !== ''
                ? <><figure> <img src={image} alt='Champion Team Image' className='w-6 h-6 rounded bg-secondary' /> </figure></>
                : <div className='w-6 h-4 rounded bg-secondary text-white text-center text-xs'>{getInitials(teamName ?? 'TBD')}</div>
            }
      <p>{teamName}</p>
      </span>
      <p className='text-sm font-normal'>Champions of the “{TourneyName}“</p>
    </div>

  </div>;
};
