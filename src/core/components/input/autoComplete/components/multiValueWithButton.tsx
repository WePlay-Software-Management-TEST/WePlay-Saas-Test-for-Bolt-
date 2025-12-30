import React, { useState, type MouseEventHandler, useEffect } from 'react';
import { components, type MultiValueProps, type SingleValue, type MultiValue, type SetValueAction, type Options } from 'react-select';
import { type Option } from 'core/models/input.model';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import Button from 'core/components/button/button';

export interface MultiValueWithButtonProps {
  onClick?: (data: Option<any>, getValue: () => Options<Option<any>>, setValue: (newValue: SingleValue<Option<any>> | MultiValue<Option<any>>, action: SetValueAction, option?: Option<any> | undefined) => void) => void
  isButtonDisabled?: (data: Option<any>) => boolean
  buttonText?: (data: Option<any>) => string
  noButton?: boolean
  showProfileImg?: boolean
}
/**
 * @component MultiValue Chip Component,for React Select AutoComplete.
 * for more information check: https://react-select.com/home
 * @param { (data: Option<any>, getValue: () => Options<Option<any>>, setValue: (newValue: SingleValue<Option<any>> | MultiValue<Option<any>>, action: SetValueAction, option?: Option<any> | undefined) => void) => void } onClick - OnClick callback.
 * @param { (data: Option<any>) => boolean } isButtonDisabled - Callback, returns boolean, indicate if the button should be disabled or not.
 * @param { (data: Option<any>) => string } buttonText - Callback, returns string that will show on the button.
 * @param { boolean } noButton - Is multiValue Chip Clickable
 * @returns { JSX.Element }
 */
export const MultiValueWithButton = ({ showProfileImg = true, onClick, isButtonDisabled, buttonText, noButton = true, ...props }: MultiValueProps<Option<any>> & MultiValueWithButtonProps): JSX.Element => {
  const { data, children } = props;
  const imageCache = useImageCache();
  const [imageId, setImageId] = useState('');

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (data.extraData?.imageId === '' || data.extraData?.imageId === undefined) return;

    void imageCache.getImageWithCache(data.extraData?.imageId ?? '').then((src) => {
      setImageId(src);
    });
  });

  const innerProps = { ...props.innerProps, onMouseDown };

  return (
    <components.MultiValue
    {...props }
    innerProps={innerProps}
    className={`${props.className as string} testMultiValue 
    !rounded-3xl p-0.5 !overflow-visible focus-within:!bg-blue-60 
    focus-within:!text-white focus-within:!stroke-white 
    !text-grey-10 !stroke-grey-10 !bg-grey-98
    `}>
      {
        noButton
          ? <>
          <label tabIndex={0} className='flex items-center gap-2'>
        {
          showProfileImg && <InitialsAvatar
          size='tiny'
          initials={data.label}
          isCaptain={data.extraData?.isCaptain}
          imageId={imageId}
        />
        }
        <p className='font-normal text-sm'>{ children }</p>
        </label>
          </>
          : <div className='dropdown dropdown-top !overflow-visible focus:!bg-blue-60'>
        <label tabIndex={0} className='flex items-center gap-2 hover:cursor-pointer'>
        {
          showProfileImg && <InitialsAvatar
          size='tiny'
          initials={data.label}
          isCaptain={data.extraData?.isCaptain}
          imageId={imageId}
        />
        }
        <p className='font-normal text-sm'>{ children }</p>
        </label>
        <ul tabIndex={0} className="dropdown-content bg-white opacity-100 mt-3 !shadow-2xl !shadow-[#0000003D] p-4 text-grey-10 gap-4 rounded-box flex flex-col justify-center items-start">
          <li>
          <div className='flex items-center gap-2'>
          <InitialsAvatar
            size='tiny'
            initials={data.label}
            isCaptain={data.extraData?.isCaptain}
            imageId={imageId}
          />
        <p className='font-normal text-sm'>{ children }</p>
        </div>
          </li>
          <li>
            <Button isDisabled={isButtonDisabled?.(data)} text={buttonText?.(data) ?? ''}
            type='secondary' size='small'
           onClickCallable={
            () => { onClick?.(data, props.getValue, props.setValue); }
            }/> </li>
      </ul>
      </div>
      }
    </components.MultiValue>
  );
};
