import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import React, { memo, useState, useEffect } from 'react';
import { components, type OptionProps } from 'react-select';
import { type Option } from 'core/models/input.model';
import { InitialsAvatar } from '../../../misc/initialsAvatar';

export interface AddScoreOptionsProps {
  addScore: boolean
}

export const AddScoreOptions = memo(function OptionMenu ({
  children, isSelected, isFocused, data, addScore, ...props
}: OptionProps<Option<any>> & AddScoreOptionsProps): JSX.Element {
  const [imageId, setImageId] = useState('');
  const imageCache = useImageCache();

  useEffect(() => {
    if (data.extraData?.imageId === '' || data.extraData?.imageId === undefined) return;
    void imageCache.getImageWithCache(data.extraData?.imageId ?? '').then((src) => {
      setImageId(src);
    });
  });

  return (
    <components.Option {...props} isFocused={false} isSelected={false} data={data} data-cy='optionMenuContainer'
    className={
      `${isSelected ? 'border-y border-grey-90' : ''}
      ${isFocused ? '!bg-grey-9' : ''}
      hover:bg-grey-98 duration-150 !text-base mobile:hover:border-secondary mobile:hover:!border mobile:rounded-2xl
      testCyOption
      hover:!text-grey-20`}>

      <div data-cy='collapseContainer' className={
        `collapse max-h-11 group/score peer-hover:collapse-open hover:collapse-open mobile:rounded-2xl flex justify-between items-center
        hover:bg-grey-98 mobile:hover:bg-blue-90 mobile:hover:!bg-opacity-10`}>
            <div className='flex items-center gap-2 text-ellipsis text-nowrap'>
              <InitialsAvatar size='tiny' initials={data.label} imageId={imageId} />
              { data.label }
        </div>
        <p className={`${addScore ? 'group-hover/score:text-secondary' : 'group-hover/score:text-indictor-error'} text-transparent text-nowrap`}>{addScore ? '+ Add Score' : '- Remove Score'}</p>
      </div>
    </components.Option>
  );
});
