import { type Option } from 'core/models/input.model';

export interface TeamTableFiltersProps {
  setFilters: (filters: any) => void
  setPreFilters: (filters: any) => void
  filterResults: number
  renderType?: 'desktop' | 'mobile'
  mobileModalHtmlFor?: string
};

export interface TeamTableFiltersForm {
  state: Option[]
  city: Option[]
  county: Option[]
};
