import React, { useEffect, useState } from 'react';
import Loader from 'assets/images/loader.gif';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { NavLink } from 'react-router-dom';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import { getInitials } from 'core/utils/utils';

interface ProfileDetailsRendererProps {
  imageId: string
  paragraph: string
  redirect?: (data?: any) => void
  navLink?: string
  isCaptain?: boolean
  containerClassname?: string
  version?: number
}

export function ProfileDetailsRenderer (
  {
    imageId, paragraph, redirect, navLink, containerClassname = '', isCaptain = false, version
  }: ProfileDetailsRendererProps): JSX.Element {
  const [image, setImage] = useState('');
  const [isLoading, setIsloading] = useState(true);
  const [initials, setInitials] = useState('');
  const imageCache = useImageCache();

  useEffect(() => {
    setInitials(getInitials(paragraph));

    setIsloading(true);
    setImage('');
    if (imageId === '' || imageId === null) {
      setIsloading(false);
      return;
    };

    void imageCache.getImageWithCache(imageId).then((imageUrl) => {
      setImage(imageUrl);
    }).catch(err => {
      console.error('failed to load image: ', err);
      setImage('');
    }).finally(() => {
      setIsloading(false);
    });
  }, [imageId, paragraph, version, imageCache]);

  return (
  <div className={`${containerClassname} flex gap-3 justify-center items-center`}>
      <div className="avatar">
        <div className="w-10 rounded-full bg-center bg-contain !overflow-visible">
          {isLoading ? <img src={Loader} alt='Loading Image'/> : <InitialsAvatar initials={initials} size='medium' isCaptain={isCaptain} imageId={image}/>}
        </div>
      </div>
    {navLink !== undefined
      ? <NavLink data-cy='profile-paragraph-renderer' to={navLink} className={({ isPending }) => { return isPending ? 'cursor-wait' : ''; }}>
          <p className='hover:font-semibold hover:cursor-pointer' onClick={redirect}>
            {paragraph}
          </p>
        </NavLink >
      : <p data-cy='profile-paragraph-renderer' className='hover:font-semibold hover:cursor-pointer focus:cursor-wait' onClick={redirect}>
          {paragraph}
        </p>}
  </div>
  );
};
