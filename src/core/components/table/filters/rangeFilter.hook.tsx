import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { type FiltersTypes, type RangeHookProps, type RangeHookReturnType } from 'core/models/filters.model';
import { BaseRangeFilter, RangeFilterUI } from './rangeFilter';
import { debounce } from 'lodash';
import produce from 'immer';

export function useRangeFilter (
  {
    header, cyData, filterResults, measurmentUnit,
    minRange, maxRange, valueFormatter, filterCol,
    setFilters, setPreFilters
  }: RangeHookProps): RangeHookReturnType {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedMin, setSelectedMin] = useState(minRange);
  const [selectedMax, setSelectedMax] = useState(maxRange);

  const [filter, setFilter] = useState<FiltersTypes | null>({
    colId: filterCol,
    filterModel: {
      type: 'range',
      values: [minRange, maxRange]
    }
  });

  const valueFormatterCallback = useCallback((value: string | number) => {
    if (typeof valueFormatter !== 'function') return value;
    return valueFormatter?.(value);
  }, [valueFormatter]);

  const debouncedUpdate = useMemo(() => {
    return debounce((value: number[]) => {
      setSelectedMax(value[1]);
      setSelectedMin(value[0]);
      if (typeof setPreFilters !== 'function') return;
      if (value[0] === minRange && value[1] === maxRange) {
        setIsActive(false);
        setPreFilters({
          colId: filterCol,
          filterModel: {
            type: 'range',
            values: []
          }
        });
        setFilters?.({
          colId: filterCol,
          filterModel: {
            type: 'range',
            values: []
          }
        });
        return;
      }

      setPreFilters({
        colId: filterCol,
        filterModel: {
          type: 'range',
          values: [value[0], value[1]]
        }
      });
      setFilters?.({
        colId: filterCol,
        filterModel: {
          type: 'range',
          values: [value[0], value[1]]
        }
      });
    }, 50);
  }, [setFilters, setPreFilters, minRange, maxRange, filterCol]);

  const onValueChange = useCallback((value: number[]) => {
    debouncedUpdate(value);
  }, [debouncedUpdate]);

  const onClear = useCallback(() => {
    setSelectedMax(maxRange);
    setSelectedMin(minRange);
    setIsActive(false);
    setFilter(produce((draft) => {
      if (draft === null) return;
      draft.filterModel.values = [];
    }));

    setFilters?.({
      colId: filterCol,
      filterModel: {
        type: 'range',
        values: []
      }
    });

    if (typeof setPreFilters !== 'function') return;
    setPreFilters({
      colId: filterCol,
      filterModel: {
        type: 'range',
        values: []
      }
    });
  }, [filterCol, maxRange, minRange, setFilters, setPreFilters]);

  const onClickShowResults = useCallback(() => {
    if (selectedMin === minRange && selectedMax === maxRange) {
      onClear();
      return;
    }
    setIsActive(true);
    setFilters?.(filter);
  }, [filter, maxRange, minRange, onClear, selectedMax, selectedMin, setFilters]);

  useEffect(() => {
    setFilter(produce((draft) => {
      if (draft === null) return null;
      draft.filterModel.values = [selectedMin, selectedMax];
    }));
  }, [selectedMin, selectedMax]);

  const baseUI = useMemo(() => {
    return <BaseRangeFilter
      cyData={cyData}
      filterResults={filterResults}
      header={header}
      minRange={minRange}
      maxRange={maxRange}
      measurmentUnit={measurmentUnit}
      valueFormatter={valueFormatterCallback as (e: string | number) => string}
      selectedMax={selectedMax}
      selectedMin={selectedMin}
      onValueChange={onValueChange} />;
  }, [cyData, filterResults, header, minRange, maxRange, measurmentUnit, valueFormatterCallback, selectedMax, selectedMin, onValueChange]);

  const mainUI = useMemo(() => {
    return <RangeFilterUI
      header={header}
      minRange={minRange}
      maxRange={maxRange}
      measurmentUnit={measurmentUnit}
      valueFormatter={valueFormatterCallback as (e: string | number) => string}
      selectedMax={selectedMax}
      selectedMin={selectedMin}
      onValueChange={onValueChange}
      onClear={onClear}
      setFilters={onClickShowResults}
      isActive={isActive}
      cyData={cyData}
      filterResults={filterResults} />;
  }, [header, minRange, maxRange, measurmentUnit, valueFormatterCallback, selectedMax, selectedMin, onValueChange, onClear, onClickShowResults, isActive, cyData, filterResults]);

  return {
    isActive,
    onValueChange,
    valueFormatterCallback,
    onClickShowResults,
    onClear,
    selectedMax,
    selectedMin,
    baseUI,
    mainUI
  };
};
