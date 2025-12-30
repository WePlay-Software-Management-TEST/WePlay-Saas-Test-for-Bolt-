import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import React, { memo, useState, useEffect } from 'react';
import { components, type OptionProps } from 'react-select';
import { type Option } from 'core/models/input.model';
import { InitialsAvatar } from '../../../misc/initialsAvatar';
import Button from '../../../button/button';

export interface DropDownMenuOptionProps {
  disableSecondaryButton?: boolean
  disableSecondaryButtonCallback?: (data: Option<any>) => boolean
  disablePrimaryButton?: boolean
  secondaryButtonText?: string
  primaryButtonText?: string
  onClickSecondaryButton?: (data: Option<any>) => Promise<void>
  onClickPrimaryButton?: (data: Option<any>) => Promise<void>
  subText?: string
  getSubText?: (data: Option<any>) => string
  disabledSubText?: string
}

/**
 * @component Dropdown Menu Option Component, for React Select AutoComplete.
 * for more information check: https://react-select.com/home
 * @param { ReactNode } children - Child Components.
 * @param { boolean } isSelected - Is Option selected.
 * @param { boolean } isFocused - Is Option in focus.
 * @param { Option<any> } data - Data Passed to the Option Component.
 * @param { boolean } disableSecondaryButton - Disable Secondary Button.
 * @param { boolean } disablePrimaryButton - Disable Primary Button Button.
 * @param { string } secondaryButtonText - Text to show on the Secondary Button.
 * @param { string } primaryButtonText - Text to show on the Primary Button.
 * @param { ((data: Option<any>) => Promise<void>) | undefined } onClickSecondaryButton - Callback on Secondary button click.
 * @param { ((data: Option<any>) => Promise<void>) | undefined  } onClickPrimaryButton - Callback on Primary button click.
 * @param { ((data: Option<any>) => string) | undefined} getSubText - Callback, returns string, shows subtext under the main option header.
 * @param { string | undefined } subText - Subtext under the main option header.
 * @param { string | undefined } disabledSubText - Text to show next to Option header, when the Option is Disabled.
 * @param { ((data: Option<any>) => boolean) } disableSecondaryButtonCallback - Callback, returns boolean, indicates if the Secondary button should be disabled or not.
 * @returns { JSX.Element }
 */
export const DropdownMenuOption = memo(function OptionMenu ({
  children, isSelected, isFocused, data,
  disableSecondaryButton, disablePrimaryButton = false,
  secondaryButtonText, primaryButtonText, onClickSecondaryButton, getSubText,
  onClickPrimaryButton, subText, disabledSubText, disableSecondaryButtonCallback, ...props
}: OptionProps<Option<any>> & DropDownMenuOptionProps): JSX.Element {
  const [imageId, setImageId] = useState('');
  const imageCache = useImageCache();
  const [inTeam] = useState<boolean>(data.extraData?.inTeam ?? false);

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
      peer
      hover:bg-grey-98 duration-150 !text-base mobile:hover:border-secondary mobile:hover:!border mobile:rounded-2xl
      testCyOption
      hover:!text-grey-20 !p-0 !py-2 mobile:!py-0 mobile:!px-0 ${inTeam ? '!bg-neutral-200 hover:bg-neutral-200' : ''}`}>

      <div data-cy='collapseContainer' className={
        `collapse peer-hover:collapse-open hover:collapse-open mobile:rounded-2xl
        ${inTeam ? '!bg-neutral-200 hover:bg-neutral-200' : 'hover:bg-grey-98 mobile:hover:bg-blue-90 mobile:hover:!bg-opacity-10'}`}>
            <span className={'collapse-title flex items-center justify-between gap-2 !p-0 !pl-3 !pr-4 mobile:!p-0 mobile:!px-2'}>
            <div className='flex items-center gap-2'>
              <InitialsAvatar size='tiny' initials={data.label} isCaptain={data.extraData?.isCaptain ?? false} imageId={imageId} />
              <div className='flex flex-col'>
                <p data-cy='headerOptionP' className={`text-sm text-grey-40 truncate ${inTeam ? 'max-w-[150px]' : 'max-w-[200px]'}  mobile:max-w-none`}>
                  {children}
                </p>
                <p className={`text-xs text-grey-20 truncate ${inTeam ? 'max-w-[150px]' : 'max-w-[200px]'}  mobile:max-w-none`}>
                  {getSubText !== undefined ? getSubText(data) : subText}
                </p>
              </div>
            </div>
            { inTeam && <div>
              <p data-cy='inTeamLabel' className='text-xs text-black bg-grey-98 border-white w-12 h-7 flex justify-center items-center rounded-md'>{disabledSubText}</p>
            </div>}
          </span>
          { !inTeam && <div className="collapse-content flex justify-center items-center gap-2 mobile:justify-between">
              <Button
              isDisabled={disableSecondaryButton === undefined ? disableSecondaryButtonCallback?.(data) : disableSecondaryButton}
              type='secondary'
              text={secondaryButtonText ?? ''}
              className='w-[120px] text-xs !p-0 mt-1 mobile:w-[150px] mobile:!bg-transparent mobile:!border-grey-90'
              cyData='addCaptainButton'
              asyncOnClick={async () => { await onClickSecondaryButton?.(data); }} />
              <Button
              isDisabled={disablePrimaryButton}
              type='primary'
              text={primaryButtonText ?? ''}
              className='w-16 text-xs !p-0 !px-5 mt-1 mobile:w-[150px]'
              cyData='addPlayerButton'
              asyncOnClick={async () => { await onClickPrimaryButton?.(data); }} />
            </div>}
      </div>
    </components.Option>
  );
});
