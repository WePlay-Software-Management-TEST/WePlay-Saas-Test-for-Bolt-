import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import {
  type FiltersTypes, type FilterOption,
  type FilterHookProps, type FilterHookReturnType
} from 'core/models/filters.model';
import {
  useFieldArray,
  useWatch,
  type UseFormGetFieldState,
  type FormState
} from 'react-hook-form';
import { reduceOptionsIntoAcceptedArray } from '../helpers';
import { produce } from 'immer';
import { type Option } from 'core/models/input.model';
import { BaseCheckBoxFilter, CheckBoxFilterUI } from './selectFilter';
import { BaseGoogleSearchFilter, BaseSearchFilter, GoogleSearchFilterUI, SearchFilterUI } from './searchFilter';
import { RangeFilterUI, BaseRangeFilter } from './rangeFilter';

/**
 * @component React Hook that returns 2 UI components a barebones filter, and full fledge filter, and 2 callbacks
 * One for clearing the results, and the other is for applying the filter.
 * @returns { FilterHookReturnType }
 */
export const useFilter = (
  {
    getFieldState, formState, filterResults, options,
    setFilters, setPreFilters, filterCol = '', control,
    getValues, setValue, watch, register, header, cyData, type = 'checkbox', autoCompleteOptions
  }: FilterHookProps): FilterHookReturnType => {
  const RANGE_MIN = 1;
  const RANGE_MAX = 16;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [numOfSelected, setNumOfSelected] = useState(0);

  const [minValue, setMinValue] = useState(RANGE_MIN);
  const [maxValue, setMaxValue] = useState(RANGE_MAX);

  const clearAllOptions = useRef(options);

  const { fields, replace } = useFieldArray({
    name: filterCol,
    control
  });

  const [filter, setFilter] = useState<FiltersTypes | null>({
    colId: filterCol,
    filterModel: {
      type: 'set',
      values: typeof options[0]?.value === 'boolean'
        ? reduceOptionsIntoAcceptedArray(getValues()[filterCol])
        : []
    }
  });

  const checkedValues = useWatch({
    name: filterCol,
    control
  });

  useEffect(() => {
    const subscription = watch((value: any, { name }) => {
      if (typeof setPreFilters !== 'function') return;

      const changeCol = name?.split('.')[0];
      if (filterCol !== changeCol) return;
      const values = type === 'googleAutoComplete'
        ? reduceOptionsIntoAcceptedArray(value[filterCol] as Array<FilterOption | Option>, true)
        : reduceOptionsIntoAcceptedArray(value[filterCol] as Array<FilterOption | Option>);

      setPreFilters({
        colId: filterCol,
        filterModel: {
          type: 'set',
          values
        }
      });
    });

    return () => { subscription.unsubscribe(); };
  }, [filterCol, setPreFilters, type, watch]);

  useEffect(() => {
    const values = type === 'googleAutoComplete'
      ? reduceOptionsIntoAcceptedArray(checkedValues, true)
      : reduceOptionsIntoAcceptedArray(checkedValues);

    setFilter(produce((draft) => {
      if (draft === null) return null;
      draft.filterModel.values = values;
    }));
  }, [checkedValues, type]);

  const clearAll = useCallback(() => {
    if (type === 'numberRange') {
      setMinValue(RANGE_MIN);
      setMaxValue(RANGE_MAX);
      setFilters?.({
        colId: filterCol,
        filterModel: { type: 'range', values: [] }
      });
      setIsActive(false);
      return;
    }

    if (typeof clearAllOptions.current[0]?.value === 'boolean') {
      replace(clearAllOptions.current);
    } else {
      setValue(filterCol, []);
    };

    setFilter(produce((draft) => {
      if (draft === null) return null;
      draft.filterModel.values = [];
    }));

    setFilters?.({
      colId: filterCol,
      filterModel: {
        type: 'set',
        values: []
      }
    });
    setIsActive(false);
    setNumOfSelected(0);

    if (typeof setPreFilters !== 'function') return;
    setPreFilters({
      colId: filterCol,
      filterModel: {
        type: 'set',
        values: []
      }
    });
  }, [filterCol, replace, setFilters, setPreFilters, setValue, type]);

  const onClickShowResults = useCallback(() => {
    if (type === 'numberRange') {
      setFilters?.({
        colId: filterCol,
        filterModel: { type: 'range', values: [minValue, maxValue] }
      });
      setIsActive(true);
      return;
    }

    if (filter?.filterModel.values === undefined || filter?.filterModel.values.length === 0) {
      setIsActive(false);
      setNumOfSelected(0);
      setFilters?.(filter);
      return;
    };

    setIsActive(true);
    setNumOfSelected(() => (filter?.filterModel.values as string[])?.length ?? 0);
    setFilters?.(filter);
  }, [type, filter, setFilters, filterCol, minValue, maxValue]);

  const baseUI = useMemo(() => {
    return <>
    {
     (() => {
       switch (type) {
         case 'checkbox':
           return (
            <BaseCheckBoxFilter
          fields={fields}
          filterCol={filterCol}
          options={options as FilterOption[]}
          register={register}
          header={header}
          setValue={setValue} />
           );

         case 'search':
           return (
              <BaseSearchFilter
              filterResults={filterResults}
            filterCol={filterCol}
            options={options as Option[]}
            register={register}
            header={header}
            control={control}
            getFieldState={getFieldState as UseFormGetFieldState<any>}
            formState={formState as FormState<any>}
            cyData={cyData}/>
           );

         case 'googleAutoComplete':
           return (<BaseGoogleSearchFilter
                filterResults={filterResults}
            filterCol={filterCol}
            options={options as Option[]}
            register={register}
            header={header}
            control={control}
            getFieldState={getFieldState as UseFormGetFieldState<any>}
            formState={formState as FormState<any>}
            googleSearchOptions={autoCompleteOptions}
            cyData={cyData}
                />);

         case 'numberRange':
           return <BaseRangeFilter
             header={header}
             minRange={RANGE_MIN}
             maxRange={RANGE_MAX}
             measurmentUnit=""
             filterCol={filterCol}
             valueFormatter={v => `${v}`}
             selectedMin={minValue}
             selectedMax={maxValue}
             onValueChange={(vals) => {
               setMinValue(vals[0]);
               setMaxValue(vals[1]);
               setPreFilters?.({
                 colId: filterCol,
                 filterModel: { type: 'range', values: vals }
               });
             } } cyData={cyData} filterResults={filterResults} />;
       }
     })()
    }
    </>;
  }, [type, fields, filterCol, options, register, header, setValue, filterResults, control, getFieldState, formState, cyData, autoCompleteOptions, minValue, maxValue, setPreFilters]);

  const mainUI = useMemo(() => {
    return <>
    {
      (() => {
        switch (type) {
          case 'checkbox':
            return (<CheckBoxFilterUI
              numOfSelected={numOfSelected}
              fields={fields}
              filterCol={filterCol}
              options={options as FilterOption[]}
              register={register}
              header={header}
              setValue={setValue}
              cyData={cyData}
              filterResults={filterResults}
              isActive={isActive}
              onClear={clearAll}
              setFilters={onClickShowResults} />);

          case 'search':
            return (<SearchFilterUI
              isActive={isActive}
              control={control}
              getValues={getValues}
              filterCol={filterCol}
              options={options as Option[]}
              register={register}
              header={header}
              setValue={setValue}
              cyData={cyData}
              filterResults={filterResults}
              onClear={clearAll}
              getFieldState={getFieldState as UseFormGetFieldState<any>}
              formState={formState as FormState<any>}
              setFilters={onClickShowResults}/>);

          case 'googleAutoComplete':
            return (<GoogleSearchFilterUI
              isActive={isActive}
              control={control}
              getValues={getValues}
              filterCol={filterCol}
              googleSearchOptions={autoCompleteOptions}
              options={options as Option[]}
              register={register}
              header={header}
              setValue={setValue}
              cyData={cyData}
              filterResults={filterResults}
              onClear={clearAll}
              getFieldState={getFieldState as UseFormGetFieldState<any>}
              formState={formState as FormState<any>}
              setFilters={onClickShowResults}
              />);

          case 'numberRange':
            return <RangeFilterUI
            cyData={cyData}
            header={header}
            filterResults={filterResults}
            setPreFilters={setPreFilters}
            minRange={RANGE_MIN}
            maxRange={RANGE_MAX}
            measurmentUnit=""
            valueFormatter={v => `${v}`}
            selectedMin={minValue}
            selectedMax={maxValue}
            onValueChange={(vals) => {
              setMinValue(vals[0]);
              setMaxValue(vals[1]);
            }}
            isActive={isActive}
            onClear={clearAll}
            setFilters={onClickShowResults}
        />;
        }
      })()
    }
    </>;
  }, [type, numOfSelected, fields, filterCol, options, register, header, setValue, cyData, filterResults, isActive, clearAll, onClickShowResults, control, getValues, getFieldState, formState, autoCompleteOptions, setPreFilters, minValue, maxValue]);

  return {
    onClickShowResults,
    clearAll,
    baseUI,
    mainUI
  };
};
