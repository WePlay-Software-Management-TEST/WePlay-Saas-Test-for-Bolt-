import React from 'react';
import { BaseFilter } from './baseFilter';
import { type BaseSearchFilterProps, type SearchFilterProps } from 'core/models/filters.model';
import { MultiSelectGoogleAutoComplete } from 'core/components/input/googlePlacesAutoComplete';
import SelectInput from 'core/components/input/selectInput';

export function BaseSearchFilter (
  {
    header, filterCol = '', options, register, control,
    getFieldState, formState
  }: BaseSearchFilterProps): JSX.Element {
  return (
    <>
      <div className='flex flex-col gap-4 px-6 w-full mobile:px-4 mobile:gap-2'>
        <SelectInput
        isMulti={true}
        fieldNameControl={filterCol}
        formControl={control}
        options={options}
        registrationOption={register(filterCol)}
        placeholder={header}
        id={`search-filter-${filterCol}`}
        cyData={`search-filter-${filterCol}`}
        legendText={header}
        fieldState={getFieldState(filterCol, formState)}/>
      </div>
    </>
  );
}

export function SearchFilterUI (
  {
    cyData, header, Icon, filterResults,
    setFilters, filterCol = '', options, register,
    control, getFieldState, formState, numOfSelected, onClear, isActive
  }: SearchFilterProps): JSX.Element {
  return (
    <BaseFilter
      cyData={cyData}
      header={header}
      Icon={Icon}
      numOfSelected={numOfSelected}
      filterResults={filterResults}
      onClear={onClear}
      isActive={isActive}
      setFilters={setFilters}
    >
      <div className='flex flex-col gap-4 px-6 w-full mobile:px-4 mobile:gap-2'>
        <SelectInput
        isMulti={true}
        fieldNameControl={filterCol}
        formControl={control}
        options={options}
        registrationOption={register(filterCol)}
        placeholder={header}
        id={`search-filter-${filterCol}`}
        cyData={`search-filter-${filterCol}`}
        legendText={header}
        fieldState={getFieldState(filterCol, formState)}
        />
      </div>
    </BaseFilter>
  );
}

/**
 * @component Filter Component that acts as a wrapper for our Google Auto Complete component.
 * @returns { JSX.Element }
 */
export function BaseGoogleSearchFilter (
  {
    header, filterCol = '', register, control, getFieldState,
    formState, onSelectGoogle, options, googleSearchOptions
  }: BaseSearchFilterProps): JSX.Element {
  return (
    <>
          <div className='flex flex-col gap-4 px-6 w-full mobile:px-4 mobile:gap-2'>
          <MultiSelectGoogleAutoComplete id='cities-filter'
          fieldState={getFieldState(filterCol, formState)}
          onSelect={onSelectGoogle as (place?: google.maps.places.PlaceResult | undefined) => void}
          legendText={header}
          placeholder={header}
          cyData='google-auto-complete'
          registrationOption={register(filterCol)}
          formControl={control}
          options={options}
          searchOptions={googleSearchOptions}
          fieldNameControl={filterCol} />
      </div>
    </>
  );
}

export function GoogleSearchFilterUI (
  {
    cyData, header, Icon, filterResults,
    setFilters, filterCol = '', register,
    control, getFieldState, formState, numOfSelected, onClear, isActive, onSelectGoogle, options, googleSearchOptions = { types: ['(cities)'] }
  }: SearchFilterProps): JSX.Element {
  return (
    <BaseFilter
      cyData={cyData}
      header={header}
      Icon={Icon}
      numOfSelected={numOfSelected}
      filterResults={filterResults}
      onClear={onClear}
      isActive={isActive}
      setFilters={setFilters}
    >
      <div className='flex flex-col gap-4 px-6 w-full mobile:px-4 mobile:gap-2'>
        <MultiSelectGoogleAutoComplete
        id='cities-filter'
        fieldState={getFieldState(filterCol, formState)}
        searchOptions={
          {
            ...googleSearchOptions,
            componentRestrictions: { country: 'us' },
            fields: ['formatted_address', 'address_components']
          }
        }
        onSelect={onSelectGoogle as (place?: google.maps.places.PlaceResult | undefined) => void}
        legendText={header}
        placeholder={header}
        cyData='google-auto-complete'
        registrationOption={register(filterCol)}
        formControl={control}
        options={options}
        fieldNameControl={filterCol} />
      </div>
    </BaseFilter>
  );
};
