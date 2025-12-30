import React, { useState, useEffect, memo } from 'react';
import { components, type OptionProps } from 'react-select';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { type Option } from 'core/models/input.model';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';

interface OptionWithImageProps {
  subtext?: (data: Option<any>) => string
}
/**
 * @component Option Component,for React Select AutoComplete.
 * for more information check: https://react-select.com/home
 * @param { (data: Option<any>) => string } subtext - subtext that will show for the Option.
 * @returns { JSX.Element }
 */
export const OptionWithImage = memo(function OptionMenu ({ children, isSelected, isFocused, data, subtext, isDisabled, ...props }: OptionProps<Option<any>> & OptionWithImageProps): JSX.Element {
  const imageCache = useImageCache();
  const [imageId, setImageId] = useState('');

  useEffect(() => {
    if (data.extraData?.imageId === '' || data.extraData?.imageId === undefined) return;
    void imageCache.getImageWithCache(data.extraData?.imageId ?? '').then((src) => {
      setImageId(src);
    });
  });

  return (
    <components.Option {...props} isFocused={isFocused} isSelected={isSelected} data={data} isDisabled={isDisabled}
    className={
      `${isSelected ? '!text-secondary !bg-transparent' : ''}
      ${isFocused ? ' shadow-grey-98' : ''}
      ${isDisabled ? '!bg-grey-90' : ''}
      hover:!bg-grey-90
      !bg-grey-98 duration-150 !text-base 
      hover:!text-grey-20 overflow-hidden rounded-2xl !-my-1`}>
      <span className='flex items-center gap-2'>
      <InitialsAvatar size='tiny' initials={data.label} isCaptain={false} imageId={imageId}/>
        <div className='flex flex-col'>
          <p className='text-sm text-grey-20'>{children}</p>
          <p className='text-xs text-grey-20'>
          {subtext?.(data)}
            </p>
        </div>
      </span>
    </components.Option>
  );
});
