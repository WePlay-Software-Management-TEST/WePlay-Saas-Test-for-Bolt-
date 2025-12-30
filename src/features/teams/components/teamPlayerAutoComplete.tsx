import React, { useState, useEffect, useCallback } from 'react';
import { AutoComplete } from 'core/components/input/autoComplete/autoComplete';
import { type SingleValue, type MultiValue, type SetValueAction } from 'react-select';
import { MultiValueWithButton } from 'core/components/input/autoComplete/components/multiValueWithButton';
import { OptionWithImage } from 'core/components/input/autoComplete/components/optionWithImage';
import { type PlayersOptions, type AutoCompleteProps, type Option } from 'core/models/input.model';
import { useTranslation } from 'react-i18next';
import { getAgeFromDate } from 'core/utils/utils';
import { abbrState } from 'core/context/global.const';

export function TeamPlayerAutoComplete (props: AutoCompleteProps<any>): JSX.Element {
  const [captainID, setCaptainId] = useState('');
  const { t } = useTranslation(['teams']);

  useEffect(() => {
    if (props.defaultOptions !== undefined && props.defaultOptions.length !== 0) {
      const captain = props.defaultOptions.find((player) => (player.extraData?.isCaptain));
      setCaptainId(() => (captain?.value ?? ''));
    }
  }, []);

  const setAsCaptain = (
    data: Option<any>,
    getValue: () => Array<Option<any>>,
    setValue: (
      newValue: SingleValue<Option<any>> | MultiValue<Option<any>>,
      action: SetValueAction, option?: Option<any> | undefined
    ) => void): void => {
    const selectedValues = getValue().map((selectedPlayerData) => {
      if (selectedPlayerData.value === data.value) {
        if (data.extraData === undefined) return selectedPlayerData;
        const { imageId, isCaptain, Birthdate, city, state } = data.extraData;
        if (!(isCaptain as boolean)) {
          setCaptainId(data.value);
        } else {
          setCaptainId('');
        }

        return {
          ...data,
          extraData: { imageId, Birthdate, city, state, isCaptain: !(isCaptain as boolean) }
        };
      } else return selectedPlayerData;
    });
    setValue([...selectedValues], 'select-option');
  };

  const getButtonDisabled = (data: Option<any>): boolean => {
    return captainID !== '' && captainID !== data.value && !(data.extraData?.isCaptain as boolean);
  };

  const getButtonText = useCallback(
    (data: Option<PlayersOptions>): string => (
      (data.extraData?.isCaptain ?? false)
        ? t('UnAssignAsCaptain')
        : t('assignAsCaptain')),
    []);

  const getSubText = useCallback(
    (data: Option<PlayersOptions>): string => {
      const location = `${data.extraData?.city ?? ''}, ${abbrState(data.extraData?.state ?? '')}`;
      if (data.extraData?.experience === undefined) {
        return `
        Age: ${getAgeFromDate(data.extraData?.Birthdate)} •
        Location: ${location}`;
      };
      let exp = getAgeFromDate(data.extraData?.experience);

      if (Number(exp) === 0) {
        exp = '1';
      }

      return `
        Experience: ${exp} Years •
        Location: ${location}`;
    },
    []);

  const components = {
    MultiValue: (props: any) => <MultiValueWithButton
      {...props} onClick={setAsCaptain}
      buttonText={getButtonText}
      isButtonDisabled={getButtonDisabled}
      noButton={false}
      noProfile={false}
    />,
    Option: (props: any) => <OptionWithImage
      {...props}
      subtext={getSubText}
    />
  };

  return <AutoComplete
    {...props}
    components={components}
    noOptionsMessage={ props.noOptionsMessage === undefined ? t('emptyNoPlayers') ?? '' : props.noOptionsMessage}
  />;
};
