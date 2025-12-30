import React from 'react';
import { AutoComplete } from 'core/components/input/autoComplete/autoComplete';
import { MultiValueWithButton } from 'core/components/input/autoComplete/components/multiValueWithButton';
import { OptionWithImage } from 'core/components/input/autoComplete/components/optionWithImage';
import { type PlayersOptions, type AutoCompleteProps, type Option } from 'core/models/input.model';
import { abbrState } from 'core/context/global.const';

/**
 * @component Teams AutoComplete Input, Specific to the use case of Teams Form.
 * @returns { JSX.Element }
 */
export function TeamsAutoComplete (props: AutoCompleteProps<any>): JSX.Element {
  const getSubText = (data: Option<PlayersOptions>): string => (
    `${data.extraData?.city ?? ''}, ${abbrState(data.extraData?.state ?? '')}`
  );

  const components = {
    MultiValue: (props: any) => <MultiValueWithButton {...props} noButton={true}/>,
    Option: (props: any) => <OptionWithImage {...props} subtext={getSubText} />
  };

  return <AutoComplete {...props} components={components} noOptionsMessage='No Teams Found' />;
};
