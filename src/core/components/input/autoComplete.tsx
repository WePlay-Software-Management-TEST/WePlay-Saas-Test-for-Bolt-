import React, { useState, useEffect, memo, type MouseEventHandler } from 'react';
import { type Option, type AutoCompleteProps, type PlayersOptions } from 'core/models/input.model';
import Input from './input';
import Select, { components, type MultiValueProps, type OptionProps, type MultiValueRemoveProps } from 'react-select';
import { Controller } from 'react-hook-form';
import { InitialsAvatar } from '../misc/initialsAvatar';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { getAgeFromDate } from 'core/utils/utils';
import { abbrState } from 'core/context/global.const';
import Button from '../button/button';
import { useTranslation } from 'react-i18next';

/**
 * Renders an autocomplete input component.
 * This component is very specific to Add Player input in the Team form.
 * Need encapulate each mini component to seperate component.
 *
 * @param formControl - The form control object from react-hook-form.
 * @param placeholder - The placeholder text for the input.
 * @param options - The list of options for the autocomplete.
 * @param fieldNameControl - The name of the field in the form control from react-hook-form.
 * @param enableSearch - Determines whether to enable search functionality.
 * @param menuPlacement - The placement of the dropdown menu.
 * @param cyData - The data attribute for Cypress testing.
 * @param isMulti - Determines whether multiple values can be selected.
 * @param defaultOptions - The default options for the autocomplete.
 * @param props - Additional props for the autocomplete component, Which extends the SelectDropdownProps<T> props
 * @returns The rendered autocomplete component.
 */

export const MultiValueRemove = memo(function removeIcon (props: MultiValueRemoveProps): JSX.Element {
  return (
  <components.MultiValueRemove {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" className='!rounded-tr-full !rounded-br-full
            overflow-hidden scale-1.5'>
      <path d="M11.4294 4.57141L4.57227 11.4286" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.57227 4.57141L11.4294 11.4286" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </components.MultiValueRemove>);
});
export function AutoComplete ({
  formControl, placeholder, options,
  fieldNameControl, enableSearch,
  menuPlacement = 'auto',
  cyData, isMulti, defaultOptions, ...props
}: AutoCompleteProps<any>): JSX.Element {
  const imageCache = useImageCache();
  const { t } = useTranslation(['teams']);
  const [captainId, setCaptainId] = useState('');

  useEffect(() => {
    if (defaultOptions !== undefined && defaultOptions.length !== 0) {
      const captain = defaultOptions.find((player) => (player.extraData?.isCaptain));
      setCaptainId(() => (captain?.value ?? ''));
    }
  }, []);
  // TODO: Encapulate Option to seperate component for reusablity sake.
  const Option = memo(function optionMenu ({ children, isSelected, isFocused, data, ...props }: OptionProps<Option<PlayersOptions>>): JSX.Element {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [imageId, setImageId] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (data.extraData?.imageId === '' || data.extraData?.imageId === undefined) return;
      void imageCache.getImageWithCache(data.extraData?.imageId ?? '').then((src) => {
        setImageId(src);
      });
    });

    return (
      <components.Option {...props} isFocused={isFocused} isSelected={isSelected} data={data}
      className={
        `${isSelected ? '!text-secondary !bg-transparent' : ''}
        ${isFocused ? '!bg-grey-98 shadow-grey-98' : ''}
        hover:bg-grey-98 duration-150 !text-base 
        hover:!text-grey-20 overflow-hidden`}>
        <span className='flex items-center gap-2 p-1'>
        <InitialsAvatar size='tiny' initials={data.label} isCaptain={false} imageId={imageId}/>
          <div className='flex flex-col'>
            <p className='text-sm text-grey-20'>{children}</p>
            <p className='text-xs text-grey-20'>
              Age: { getAgeFromDate(data.extraData?.Birthdate) }&nbsp;•&nbsp;
              Location: {data.extraData?.city}, {abbrState(data.extraData?.state ?? '')}
              </p>
          </div>
        </span>
      </components.Option>
    );
  });
  // TODO: Encapulate MultiValue to seperate component for reusablity sake.
  const MultiValue = (props: MultiValueProps<Option<PlayersOptions>>): JSX.Element => {
    const { data, children } = props;
    const [imageId, setImageId] = useState('');

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
    };

    const setAsCaptain = (playerData: Option<PlayersOptions>): void => {
      const selectedValues = props.getValue().map((selectedPlayerData) => {
        if (selectedPlayerData.value === playerData.value) {
          if (playerData.extraData === undefined) return selectedPlayerData;
          const { imageId, isCaptain, Birthdate, city, state } = playerData.extraData;

          if (!(isCaptain as boolean)) {
            setCaptainId(playerData.value);
          } else {
            setCaptainId('');
          }

          return {
            ...playerData,
            extraData: { imageId, Birthdate, city, state, isCaptain: !(isCaptain as boolean) }
          };
        } else return selectedPlayerData;
      });
      props.setValue([...selectedValues], 'select-option');
    };

    useEffect(() => {
      if (data.extraData?.imageId === '' || data.extraData?.imageId === undefined) return;

      void imageCache.getImageWithCache(data.extraData?.imageId ?? '').then((src) => {
        setImageId(src);
      });
    });

    const innerProps = { ...props.innerProps, onMouseDown, onTouchEnd: (e: any) => { e.stopPropagation(); } };

    return (
      <components.MultiValue
      {...props }
      innerProps={innerProps}
      className={`${props.className ?? ''} testMultiValue 
      !rounded-3xl p-0.5 !overflow-visible focus-within:!bg-blue-60 
      focus-within:!text-white focus-within:!stroke-white 
      !bg-grey-98 !text-grey-10 !stroke-grey-10
      `}>
        <a className='dropdown dropdown-top !overflow-visible focus:!bg-blue-60'>
          <label tabIndex={0} className='flex items-center gap-2 hover:cursor-pointer'>
          <InitialsAvatar
            size='tiny'
            initials={data.label}
            isCaptain={data.extraData?.isCaptain}
            imageId={imageId}
          />
          <p className='font-normal text-sm'>{ children }</p>
          </label>
          <ul
            tabIndex={0}
            className="
            dropdown-content bg-white opacity-100 mb-3 !shadow-2xl
            !shadow-[#0000003D] p-4 text-grey-10 gap-4 rounded-box
             flex flex-col justify-center items-start">
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
            <li><Button isDisabled={
              captainId !== '' &&
              captainId !== data.value &&
              !(data.extraData?.isCaptain as boolean)
            } text={
              data.extraData?.isCaptain ?? false
                ? t('UnAssignAsCaptain')
                : t('assignAsCaptain')
              }
              type='secondary' size='small'
             onClickCallable={
              () => { setAsCaptain(data); }
              }/> </li>
        </ul>
        </a>
      </components.MultiValue>
    );
  };

  return (
    <Controller
    control={formControl}
    name={fieldNameControl}
    render={({ field }) => {
      return (<Input {...props} cyData={cyData} placeholder={placeholder}>
          <Select
          isMulti={isMulti}
          data-cy={cyData}
          classNames={{
            control: () => '!border-0 !outline-0 !shadow-none group',
            container: () => 'w-full !outline-0 !border-0 focus:!outline-0 focus:!border-0',
            indicatorSeparator: () => 'hidden',
            indicatorsContainer: () => '!hidden',
            valueContainer: () => '!px-0 !overflow-visible',
            placeholder: () => 'body-xs-text text-grey-40',
            menu: () => `
              !p-0 ${menuPlacement === 'top' ? '!mb-3' : '!mt-3'} mobile:!mb-5 mobile:!m-0 -ml-5 mr-5 left-0 
              !rounded-box !shadow-2xl !shadow-[#0000003D] 
              w-72 mobile:!w-full !border !border-grey-90
              `,
            multiValueRemove: () => 'peer-focus-within:!bg-blue-60 peer-focus-within:!stroke-white',
            multiValueLabel: () => 'peer',
            input: () => 'cypressAutoComplete'
          }}
          components={{
            Option,
            MultiValue,
            MultiValueRemove
          }
        }
          {...field}
          isSearchable={true}
          options={options}
          placeholder={placeholder}
          minMenuHeight={300}
          menuPlacement='auto'
          hideSelectedOptions={true}
          noOptionsMessage={() => { return t('emptyNoPlayers'); }}
          />
    </Input>);
    }}
    />
  );
};

export const MemorizedAutoComplete = memo(AutoComplete);
