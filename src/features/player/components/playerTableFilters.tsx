import React, { forwardRef, useImperativeHandle } from 'react';
import { SoccerPositionTypes } from 'models';
import { GenderTypes, SoccerExperienceLevelTypes } from 'API';
import { defaultCitites, listOfStates } from 'core/context/global.const';
import { type Option } from 'core/models/input.model';
import { AllCapStrToReadableStr, cmToFtInches } from 'core/utils/utils';
import { BaseFilter } from 'core/components/table/filters/baseFilter';
import { ReactComponent as FilterIcon } from 'assets/svgs/search-player-player-search-filters-icon.svg';
import { type PlayerTableFiltersProps, type PlayerTableFiltersForm } from '../player.model';
import { useForm } from 'react-hook-form';
import { useRangeFilter } from 'core/components/table/filters/rangeFilter.hook';
import { useFilter } from 'core/components/table/filters/filter.hook';

export const PlayerTableFilters = forwardRef(function PlayerTableFilters ({ renderType = 'desktop', mobileModalHtmlFor, ...props }: PlayerTableFiltersProps, ref): JSX.Element {
  const {
    onClear, onClickShowResults, baseUI: ageBaseUI, mainUI: ageMainUI
  } = useRangeFilter(
    {
      header: 'Age',
      measurmentUnit: 'Years',
      minRange: 18,
      maxRange: 80,
      filterCol: 'age',
      cyData: 'Age-Filter-profile',
      ...props
    });
  const {
    onClear: onClearWeight, onClickShowResults: onClickShowResultsWeight,
    baseUI: weightBaseUI, mainUI: weightMainUI
  } = useRangeFilter(
    {
      minRange: 100,
      maxRange: 400,
      filterCol: 'weight',
      cyData: 'Weight-Filter-profile',
      header: 'Weight',
      measurmentUnit: 'Lbs',
      ...props
    });
  const {
    onClear: onClearHeightt, onClickShowResults: onClickShowResultsHeight,
    baseUI: heightBaseUI, mainUI: heightMainUI
  } = useRangeFilter(
    {
      minRange: 92,
      maxRange: 241,
      filterCol: 'height',
      valueFormatter: cmToFtInches as (value: string | number) => string,
      cyData: 'Height-Filter-profile',
      header: 'Height',
      measurmentUnit: '',
      ...props
    });

  const { getValues, ...formStates } = useForm<PlayerTableFiltersForm>({
    mode: 'onChange',
    defaultValues: {
      position:
      (Object.keys(SoccerPositionTypes) as Array<keyof typeof SoccerPositionTypes>).map((key) => {
        return {
          label: AllCapStrToReadableStr(key),
          value: false
        };
      }).concat([{
        label: 'N/A',
        value: false
      }]),
      experience:
      (Object.keys(SoccerExperienceLevelTypes) as Array<keyof typeof SoccerExperienceLevelTypes>).map((key) => {
        return {
          label: AllCapStrToReadableStr(key),
          value: false
        };
      }).concat([{
        label: 'N/A',
        value: false
      }]),
      gender: (Object.keys(GenderTypes) as Array<keyof typeof GenderTypes>).map((key) => {
        return {
          label: AllCapStrToReadableStr(key),
          value: false
        };
      }),
      role: (['Player', 'Captain']).map((key) => {
        return {
          label: AllCapStrToReadableStr(key),
          value: false
        };
      }),
      state: [],
      city: []
    }
  });

  const clearAllFilters = (): void => {
    const allClearFilters = [
      clearAllCity, clearAllAddress, onClearWeight, onClearHeightt, clearAllRole, clearAllGender,
      clearAllExperience, onClear, clearAllPosition
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
      onClickShowResultsHeight, onClickShowResults,
      onClickShowResultsPosition,
      onClickShowResultsExperience, onClickShowResultsGender, onClickShowResultsRole,
      onClickShowResultsWeight, onClickShowResultsAddress,
      onClickShowResultsCity
    ];
    allFiltersFunction.forEach((e, index) => {
      setTimeout(() => { e(); }, index * 100);
    });
  };
  const {
    onClickShowResults: onClickShowResultsPosition,
    clearAll: clearAllPosition,
    baseUI: positionBaseUI,
    mainUI: positionMainUI
  } = useFilter({
    header: 'Position',
    cyData: 'Position-filter-player',
    options: getValues('position') ?? [],
    filterCol: 'position',
    getValues,
    ...props,
    ...formStates
  });

  const {
    onClickShowResults: onClickShowResultsExperience,
    clearAll: clearAllExperience,
    baseUI: experienceBaseUI,
    mainUI: experienceMainUI
  } = useFilter({
    header: 'Experience',
    cyData: 'Experience-filter-player',
    options: getValues('experience') ?? [],
    filterCol: 'experience',
    getValues,
    ...props,
    ...formStates
  });

  const {
    onClickShowResults: onClickShowResultsGender,
    clearAll: clearAllGender,
    baseUI: genderBaseUI,
    mainUI: genderMainUI
  } = useFilter({
    header: 'Gender',
    cyData: 'Gender-filter-player',
    options: getValues('gender') ?? [],
    filterCol: 'gender',
    ...props,
    getValues,
    ...formStates
  });

  const {
    onClickShowResults: onClickShowResultsAddress,
    clearAll: clearAllAddress,
    baseUI: addressBaseUI,
    mainUI: addressMainUI
  } = useFilter({
    header: 'States',
    cyData: 'Address-filter-player',
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
    header: 'Cities',
    cyData: 'City-filter-player',
    options: defaultCitites,
    filterCol: 'city',
    type: 'googleAutoComplete',
    getValues,
    ...props,
    ...formStates
  });

  const {
    onClickShowResults: onClickShowResultsRole,
    clearAll: clearAllRole,
    baseUI: roleBaseUI,
    mainUI: roleMainUI
  } = useFilter({
    header: 'Role',
    cyData: 'role-filter-player',
    options: getValues('role') ?? [],
    filterCol: 'role',
    getValues,
    ...props,
    ...formStates
  });

  useImperativeHandle(ref, () => {
    return {
      clearAllFilters
    };
  }, []);
  return (
    renderType === 'desktop'
      ? <div className='flex flex-wrap gap-2 py-4 mobile:hidden'>
  <BaseFilter removeBottomBorder header='All filters' className=''
      Icon={FilterIcon}
      cyData='allFilters'
      filterResults={props.filterResults}
      onClear={clearAllFilters} setFilters={showAllResults} >
        <div className='flex flex-col gap-4 average:max-h-[550px] short:max-h-[340px] overflow-y-scroll'>
        { addressBaseUI }
        <div className="divider border-grey-90"></div>
        { cityBaseUI }
        <div className="divider border-grey-90"></div>
        { positionBaseUI }
        <div className="divider border-grey-90"></div>
        { ageBaseUI }
        <div className="divider border-grey-90"></div>
        { experienceBaseUI}
        <div className="divider border-grey-90"></div>
        { heightBaseUI }
        <div className="divider border-grey-90"></div>
        { genderBaseUI }
        <div className="divider border-grey-90"></div>
        { weightBaseUI }
        <div className="divider border-grey-90"></div>
        { roleBaseUI }
  </div>
  </BaseFilter>
    { positionMainUI }
    { ageMainUI }
    { experienceMainUI }
    { genderMainUI }
    { roleMainUI }
    { heightMainUI }
    { weightMainUI}
    { addressMainUI }
    { cityMainUI }
</div>
      : <BaseFilter removeBottomBorder header='All filters' className='' closeModalHtmlFor={mobileModalHtmlFor} type={renderType}
      Icon={FilterIcon}
      cyData='allFilters'
      filterResults={props.filterResults}
      onClear={clearAllFilters} setFilters={showAllResults} >
        { addressBaseUI }
        <div className="divider border-grey-90 my-1"></div>
        { cityBaseUI }
        <div className="divider border-grey-90 my-1"></div>
        { positionBaseUI }
        <div className="divider border-grey-90 my-1"></div>
        { ageBaseUI }
        <div className="divider border-grey-90 my-1"></div>
        { experienceBaseUI}
        <div className="divider border-grey-90 my-1"></div>
        { heightBaseUI }
        <div className="divider border-grey-90 my-1"></div>
        { genderBaseUI }
        <div className="divider border-grey-90 my-1"></div>
        { weightBaseUI }
        <div className="divider border-grey-90 my-1"></div>
        { roleBaseUI }
  </BaseFilter>
  );
}
);
