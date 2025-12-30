import React from 'react';
import { BaseFilter } from './baseFilter';
import { type RangeFilterProps } from 'core/models/filters.model';
import RangeSlider from 'core/components/input/range';

export function BaseRangeFilter (
  {
    header, minRange, maxRange, measurmentUnit, valueFormatter,
    selectedMax, selectedMin, onValueChange
  }: RangeFilterProps): JSX.Element {
  return (
      <div className='flex flex-col gap-4 px-6 w-full mobile:px-4 mobile:gap-2'>
        <span className='flex items-center gap-1'>
        <p className='text-lg font-normal text-left text-grey-10 mb-1'> { header } </p>
        <p className='text-xs text-grey-40 text-center'>
        (
          {valueFormatter?.(selectedMin as number)} {measurmentUnit} -
          {valueFormatter?.(selectedMax as number)} {measurmentUnit}
        )
        </p>
        </span>
      <RangeSlider
      min={minRange}
      max={maxRange}
      defaultValue={[minRange, maxRange]}
      onChange={onValueChange}
      value={[selectedMin as number, selectedMax as number]}
      />
      </div>
  );
}

export function RangeFilterUI (
  {
    cyData, header, Icon, filterResults, setPreFilters, minRange, maxRange, measurmentUnit,
    valueFormatter, selectedMax, selectedMin, onValueChange, isActive, onClear, setFilters
  }: RangeFilterProps): JSX.Element {
  return (
    <BaseFilter
      cyData={cyData}
      header={header}
      Icon={Icon}
      filterResults={filterResults}
      onClear={onClear}
      isActive={isActive}
      setPreFilters={setPreFilters}
      setFilters={setFilters}
    >
      <div className='flex flex-col gap-4 px-6 w-full'>
        <p className='text-lg font-normal text-left text-grey-10' data-cy={`rangeFilter-header-${cyData}`}>
          {
          valueFormatter?.(selectedMin as number)} {measurmentUnit} -
          {valueFormatter?.(selectedMax as number)} {measurmentUnit}
          </p>
      <RangeSlider
      min={minRange}
      max={maxRange}
      defaultValue={[minRange, maxRange]}
      onChange={onValueChange}
      value={[selectedMin as number, selectedMax as number]}/>
      </div>
    </BaseFilter>
  );
}
