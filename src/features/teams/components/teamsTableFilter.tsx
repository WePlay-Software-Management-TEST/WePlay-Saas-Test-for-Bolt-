import React, { forwardRef, useImperativeHandle } from 'react';
import { defaultCitites, listOfStates, defaultCounties } from 'core/context/global.const';
import { type Option } from 'core/models/input.model';
import { AllCapStrToReadableStr } from 'core/utils/utils';
import { BaseFilter } from 'core/components/table/filters/baseFilter';
import { ReactComponent as FilterIcon } from 'assets/svgs/search-player-player-search-filters-icon.svg';
import { type TeamTableFiltersForm, type TeamTableFiltersProps } from '../teams.models';
import { useForm } from 'react-hook-form';
import { useFilter } from 'core/components/table/filters/filter.hook';
import { useRangeFilter } from 'core/components/table/filters/rangeFilter.hook';

/**
 * @component Table Filters Component.
 * @param { TeamTableFiltersProps } - Filters Props.
 * @returns { JSX.Element }
 */
export const TeamsTableFilter = forwardRef(function PlayerTableFilters ({ renderType = 'desktop', mobileModalHtmlFor, ...props }: TeamTableFiltersProps, ref): JSX.Element {
  const { getValues, ...formStates } = useForm<TeamTableFiltersForm>({
    mode: 'onChange',
    defaultValues: {
      state: [],
      city: [],
      county: []
    }
  });

  const clearAllFilters = (): void => {
    const allClearFilters = [
      clearAllCity, clearAllAddress, clearAllcounty, clearAllPlayers
    ];
    setTimeout(() => {
      allClearFilters.forEach((e, index) => {
        setTimeout(() => {
          e();
        }, index * 100);
      });
    }, 150);
  };

  const showAllResults = (): void => {
    const allFiltersFunction = [
      onClickShowResultsAddress,
      onClickShowResultsCity,
      onClickShowResultscounty,
      onClickShowPlayers
    ];
    allFiltersFunction.forEach((e, index) => {
      setTimeout(() => { e(); }, index * 100);
    });
  };

  const {
    onClickShowResults: onClickShowResultsAddress,
    clearAll: clearAllAddress,
    baseUI: addressBaseUI,
    mainUI: addressMainUI
  } = useFilter({
    header: 'State',
    cyData: 'State-filter-player',
    options: (listOfStates.map((key): Option => {
      return {
        label: AllCapStrToReadableStr(key[0]),
        value: AllCapStrToReadableStr(key[0])
      };
    })),
    filterCol: 'state',
    type: 'search',
    getValues,
    ...props,
    ...formStates
  });

  const {
    onClickShowResults: onClickShowResultsCity,
    clearAll: clearAllCity,
    baseUI: cityBaseUI,
    mainUI: cityMainUI
  } = useFilter({
    header: 'City',
    cyData: 'City-filter-player',
    options: defaultCitites,
    filterCol: 'city',
    type: 'googleAutoComplete',
    getValues,
    ...props,
    ...formStates
  });

  const {
    onClickShowResults: onClickShowResultscounty,
    clearAll: clearAllcounty,
    baseUI: countyBaseUI,
    mainUI: countyMainUI
  } = useFilter({
    header: 'County',
    cyData: 'County-filter-player',
    options: defaultCounties,
    filterCol: 'county',
    autoCompleteOptions: { types: ['administrative_area_level_2'] },
    type: 'googleAutoComplete',
    getValues,
    ...props,
    ...formStates
  });

  const {
    onClickShowResults: onClickShowPlayers,
    onClear: clearAllPlayers,
    baseUI: playersBaseUI,
    mainUI: playersMainUI
  } = useRangeFilter({
    header: 'Players',
    cyData: 'Players-filter',
    filterResults: props.filterResults,
    filterCol: 'players',
    minRange: 1,
    maxRange: 16,
    measurmentUnit: '',
    valueFormatter: v => `${v}`,
    setFilters: props.setFilters,
    setPreFilters: props.setPreFilters
  });

  useImperativeHandle(ref, () => {
    return {
      clearAllFilters
    };
  }, []);

  return (
    renderType === 'desktop'
      ? (
      <div className='flex flex-wrap gap-2 py-4 mobile:hidden'>
    <BaseFilter removeBottomBorder header='All filters'
        Icon={FilterIcon}
        cyData='allFilters'
        filterResults={props.filterResults}
        onClear={clearAllFilters} setFilters={showAllResults} >
          <div className='flex flex-col gap-4 average:max-h-[550px] short:max-h-[340px]'>
          { addressBaseUI }
          <div className="divider border-grey-90"></div>
          { cityBaseUI }
          <div className="divider border-grey-90"></div>
          { countyBaseUI }
          <div className='divider border-grey-90' />
          { playersBaseUI }
    </div>
    </BaseFilter>
      { addressMainUI }
      { cityMainUI }
      { countyMainUI }
      { playersMainUI }
  </div>
        )
      : (
      <BaseFilter removeBottomBorder header='All filters'
      Icon={FilterIcon}
      cyData='allFilters'
      filterResults={props.filterResults}
      closeModalHtmlFor={mobileModalHtmlFor}
      type={renderType}
      onClear={clearAllFilters} setFilters={showAllResults} >
        { addressBaseUI }
        <div className="divider border-grey-90"></div>
        { cityBaseUI }
        <div className="divider border-grey-90"></div>
        { countyBaseUI }
        <div className='divider border-grey-90' />
        { playersBaseUI }
  </BaseFilter>
        )
  );
}
);
