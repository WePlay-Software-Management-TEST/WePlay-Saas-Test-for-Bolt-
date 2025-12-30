import { type FilterOption } from 'core/models/filters.model';
import { type Option } from 'core/models/input.model';

export interface InfoCardProps {
  image: string
  id: string
  textHeader: string
  bio: string
  otherProps: Record<string, string>
  otherPropsHeaders: Record<string, string>
  editButtonText: string
  endTournamentButtonText?: string
  editButtonOnClickNavigate: string
  dropdownText?: string
  options?: string[]
  children?: JSX.Element
  border?: boolean
  classNames?: Record<string, string>
  modalID?: string
  showAddButton?: boolean
  onEndTourneyDisabled?: boolean
  onEndTourney?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
};

export interface PlayerTableFiltersProps {
  setFilters: (filters: any) => void
  setPreFilters: (filters: any) => void
  filterResults: number
  renderType?: 'mobile' | 'desktop'
  mobileModalHtmlFor?: string
};

export interface PlayerTableFiltersForm {
  position: FilterOption[]
  experience: FilterOption[]
  gender: FilterOption[]
  role: FilterOption[]
  state: Option[]
  city: Option[]
}
