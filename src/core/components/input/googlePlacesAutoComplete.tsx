
import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { type Option, type GoogleAutoCompleteInputProps } from 'core/models/input.model';
import { Controller } from 'react-hook-form';
import Input from './input';
import { components, type OptionProps } from 'react-select';
import AsyncSelect from 'react-select/async';
import { abbrState } from 'core/context/global.const';

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export function GooglePlacesAutoComplete (properties: GoogleAutoCompleteInputProps): JSX.Element {
  const {
    placeholder,
    id,
    cyData,
    onSelect,
    formControl,
    searchOptions,
    fieldNameControl
  } = properties;

  const defaultSearchOptions: google.maps.places.AutocompleteOptions = {
    types: ['address'],
    componentRestrictions: { country: 'us' },
    fields: ['formatted_address', 'address_components']
  };

  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: googleApiKey,
    onPlaceSelected: onSelect,
    options: searchOptions === undefined ? defaultSearchOptions : searchOptions
  });

  return (
  <Controller
  defaultValue = {''}
  name={fieldNameControl}
  control={formControl}
  render={
    ({ field }) => (
        <Input {...properties}>
    <input
    {...field}
    ref={ref}
    id={id}
    placeholder={placeholder}
    data-cy={cyData}
    type='text'
    />
    </Input>
    )
  }
    />
  );
};

/**
 * @component Auto complete component that is intergrated with Google Places API, and have the ability to multi select options
 * @param { Control<any> } formControl - React Hook Form Control.
 * @param { string } fieldNameControl - React Hook Form Field Name
 * @param { google.maps.places.AutocompleteOptions | undefined } searchOptions - Google Places API searchOptions, defaults to cities in the USA.
 * @returns { JSX.Element }
 */
export function MultiSelectGoogleAutoComplete ({
  formControl,
  fieldNameControl,
  searchOptions = { types: ['(cities)'] },
  ...props
}: GoogleAutoCompleteInputProps): JSX.Element {
  const { getPlacePredictions, placePredictions } = usePlacesService(
    {
      apiKey: googleApiKey
    });

  const promiseOptions = async (inputValue: string): Promise<Option[]> => {
    getPlacePredictions(
      {
        input: inputValue, ...searchOptions, componentRestrictions: { country: 'us' }
      });

    return await new Promise<Option[]>((resolve) => {
      setTimeout(() => {
        if (placePredictions.length === 0) resolve([]);
        resolve(placePredictions.map((place) => {
          return {
            label: `${place.structured_formatting.main_text}, ${abbrState(place.structured_formatting.secondary_text.split(',')[0], 'name')}`,
            value: `${place.structured_formatting.main_text}, ${abbrState(place.structured_formatting.secondary_text.split(',')[0], 'name')}`
          };
        }));
      }, 1000);
    });
  };

  const Option = (props: OptionProps<Option>): JSX.Element => {
    const { children, isSelected, isFocused } = props;
    return (
      <components.Option {...props}
      className={
        `${isSelected ? '!text-secondary !bg-transparent' : ''}
        ${isFocused ? '!bg-grey-98 shadow-grey-98' : ''}
        hover:bg-grey-98 rounded-box duration-150 !text-base 
        hover:!text-grey-20`}>
        { children }
      </components.Option>
    );
  };

  const DropdownIndicator = (): JSX.Element => {
    return (
      <div></div>
    );
  };
  return <Controller
    control={formControl}
    name={fieldNameControl}
    render={({ field }) => {
      return (<Input {...props}>
        <AsyncSelect
        isMulti
        classNames={{
          control: () => '!border-0 !outline-0 !shadow-none group',
          container: () => 'w-full !outline-0 !border-0 focus:!outline-0 focus:!border-0',
          indicatorSeparator: () => 'hidden',
          indicatorsContainer: () => 'group-focus-within:!rotate-180 transition duration-500',
          valueContainer: () => '!px-0',
          placeholder: () => 'body-xs-text text-grey-40',
          menu: () => `
          !mt-4 !p-0 !w-[106%] -ml-5 mr-5 left-0 
          !rounded-box !shadow-2xl !shadow-[#0000003D] 
          w-72 !border !border-grey-90
          `,
          multiValue: () => `
          testMultiValue
          !rounded-lg
          !bg-[#D3CCFF45]
          !text-blue-60
          `,
          input: () => `${fieldNameControl}`,
          multiValueLabel: () => '!text-blue-60',
          multiValueRemove: () => `
          !rounded-tr-lg !rounded-br-lg
          hover:!bg-blue-80 hover:!fill-blue-80
          `,
          menuPortal: () => '!z-[9999]'
        }}
        components={{
          DropdownIndicator,
          Option
        }
      }
        {...field}
        defaultOptions={props.options}
        menuPlacement='auto'
        loadOptions={promiseOptions}
        menuPortalTarget={document.body}
        placeholder={props.placeholder}
        hideSelectedOptions
        />
  </Input>);
    }}
  />;
};
