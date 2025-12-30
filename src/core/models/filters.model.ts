import { type Option } from './input.model';
import {
  type UseFormRegister, type FieldArrayWithId, type Control,
  type UseFormSetValue, type UseFormGetValues, type UseFormGetFieldState,
  type FormState, type UseFormWatch
} from 'react-hook-form';
import { type GridApi } from 'ag-grid-community';

export interface BaseFilterProps {
  cyData: string
  header: string
  children?: JSX.Element | JSX.Element[]
  filterResults: number
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined }>
  onClear?: () => void
  setFilters?: (filter: FiltersTypes | null) => void
  setPreFilters?: (filter: FiltersTypes | null) => void
  filterCol?: string
  isActive?: boolean
  numOfSelected?: number
  removeBottomBorder?: boolean
  className?: string
  type?: 'mobile' | 'desktop'
  closeModalHtmlFor?: string
};

export interface FilterOption {
  readonly value: boolean
  readonly label: string
}

export interface CheckBoxFilterUIProps extends BaseFilterProps {
  options: FilterOption[]
  register: UseFormRegister<any>
  fields?: Array<FieldArrayWithId<Record<string, any[]>, string, 'id'>>
  setValue: UseFormSetValue<any>
}

export interface SearchFilterProps extends BaseFilterProps {
  options: Option[]
  register: UseFormRegister<any>
  control: Control<any, any>
  setValue: UseFormSetValue<any>
  getValues: UseFormGetValues<any>
  getFieldState: UseFormGetFieldState<any>
  formState: FormState<any>
  googleSearchOptions?: google.maps.places.AutocompleteOptions
  onSelectGoogle?: (place?: google.maps.places.PlaceResult) => void
};
export interface BaseSearchFilterProps extends BaseFilterProps {
  options: Option[]
  register: UseFormRegister<any>
  control: Control<any, any>
  getFieldState: UseFormGetFieldState<any>
  formState: FormState<any>
  setGoogleSearchOptions?: () => void
  googleSearchOptions?: google.maps.places.AutocompleteOptions
  onSelectGoogle?: (place?: google.maps.places.PlaceResult) => void
};
export interface RangeFilterProps extends BaseFilterProps {
  minRange: number
  maxRange: number
  measurmentUnit: string
  valueFormatter?: (value: string | number) => string
  onValueChange?: (value: number[], index: number) => void
  selectedMin?: number
  selectedMax?: number
};

export interface RangeSkeletonFilterProps {
  minRange: number
  maxRange: number
  measurmentUnit: string
  valueFormatter: (value: string | number) => string
  onValueChange: (value: number[], index: number) => void
  selectedMin: number
  selectedMax: number
}

export interface FilterModel {
  type?: 'set' | 'text' | 'number' | 'range'
  values?: string[] | number[] | string
};

export interface FiltersTypes {
  colId: string
  filterModel: FilterModel
};

interface HeadlessFilterReturnType {
  onClickShowResults: () => void
  clearAll: () => void
}

interface HeadlessFilterHookProps {
  options: Array<FilterOption | Option>
  setFilters?: (filter: FiltersTypes | null) => void
  setPreFilters?: (filter: FiltersTypes | null) => void
  filterCol: string
  register: UseFormRegister<any>
  control: Control<any, any>
  watch: UseFormWatch<any>
  setValue: UseFormSetValue<any>
  getValues: UseFormGetValues<any>
}
export interface FilterHookProps extends HeadlessFilterHookProps {
  type?: 'checkbox' | 'search' | 'googleAutoComplete' | 'numberRange'
  register: UseFormRegister<any>
  header: string
  cyData: string
  filterResults: number
  getFieldState?: UseFormGetFieldState<any>
  formState?: FormState<any>
  autoCompleteOptions?: google.maps.places.AutocompleteOptions
}
export interface FilterHookReturnType extends HeadlessFilterReturnType {
  mainUI: JSX.Element
  baseUI: JSX.Element
};

export interface RangeHookProps {
  minRange: number
  maxRange: number
  filterCol: string
  valueFormatter?: (value: string | number) => string
  setFilters?: (filter: FiltersTypes | null) => void
  setPreFilters?: (filter: FiltersTypes | null) => void
  header: string
  cyData: string
  filterResults: number
  measurmentUnit: string
}

export interface RangeHookReturnType {
  isActive: boolean
  selectedMin: number
  selectedMax: number
  valueFormatterCallback: (value: string | number) => string | number
  onValueChange: (value: number[], index: number) => void
  onClear: () => void
  onClickShowResults: () => void
  baseUI: JSX.Element
  mainUI: JSX.Element
};

export interface MobileSearchProps {
  placeHolderText?: string
  filtersComponent?: JSX.Element
  queryInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  gridApi: GridApi | null
  reRenderFlag?: boolean
};
