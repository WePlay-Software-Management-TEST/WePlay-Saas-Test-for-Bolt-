import { type FilterOption } from 'core/models/filters.model';
import { type Option } from 'core/models/input.model';
// Set Filter is for enterprise edition of AG-Grid, this is a custom one
// That we are using for the meantime.

export interface AgTableFilter<T> {
  filterType: 'text' | 'number'
  type?: 'equals' | 'greaterThanOrEqual' | 'lessThanOrEqual'
  filter?: T
  filterTo?: T
  operator?: 'OR' | 'AND'
  conditions?: Array<AgTableFilter<T>>
}

export function getSetFilter (set: string[]): AgTableFilter<string> {
  if (set.length === 1) {
    return {
      filterType: 'text',
      type: 'equals',
      filter: set[0]
    };
  }
  const conditions: Array<AgTableFilter<string>> = set.map((set) => {
    return {
      filterType: 'text',
      type: 'equals',
      filter: set
    };
  });

  return {
    filterType: 'text',
    operator: 'OR',
    conditions
  };
};

export function getRangeFilter (set: number[]): AgTableFilter<number> {
  const conditions: Array<AgTableFilter<number>> = [
    {
      filterType: 'number',
      type: 'greaterThanOrEqual',
      filter: set[0]
    },
    {
      filterType: 'number',
      type: 'lessThanOrEqual',
      filter: set[1]
    }
  ];

  return {
    filterType: 'number',
    filter: set[0],
    filterTo: set[1],
    operator: 'AND',
    conditions
  };
}

export function getObjectKeyAsRecord<T> (key: string, value: T): Record<string, T> {
  const obj: Record<string, T> = {};
  obj[key] = value;
  return obj;
}

export function reduceOptionsIntoAcceptedArray (options: Array<FilterOption | Option>, filterToValue: boolean = false): string[] {
  if (options === undefined) return [];
  if (options.length === 0) return [];
  if (filterToValue) {
    return options.filter(opt => opt.value !== false && (opt.value as any)?.length !== 0).map(opt => opt.value as string);
  }
  return options.filter(opt => opt.value !== false && (opt.value as any)?.length !== 0).map(opt => opt.label);
};
