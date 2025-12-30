import { type UseFormRegisterReturn, type FieldError, type Control, type UseFormSetValue } from 'react-hook-form';
import { type StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';
import { type SelectComponents } from 'react-select/dist/declarations/src/components';
import { type GroupBase } from 'react-select';
export interface Option<T = void> {
  value: string
  label: string
  extraData?: T
}

export interface PlayersOptions {
  imageId?: string
  Birthdate?: string
  city?: string
  state?: string
  isCaptain?: boolean
  inTeam?: boolean
  teamsId?: string
  version?: number
  experience?: string | null
  id?: string
  playerId?: string
  scoreId?: string
}

// TODO: Change this option to be Partial<Team & {
// inTeam?: boolean
// isCaptain?: bolean
// }>
// this way we can minimize the amount of times we have to run an adaptor function between option
// and Team model,
// Currently it's being used in PlayerForm, this should be the same for PlayersOptions
export interface TeamsOptions {
  imageId: string
  city: string
  state: string
  version?: number
  inTeam?: boolean
  isCaptain?: boolean
  isCaptainInTeam?: boolean
}

export interface InputProps {
  type?: 'primary' | 'secondary'
  legendText: string
  placeholder: string
  id: string
  registrationOption: UseFormRegisterReturn<string>
  errPlaceholder?: string
  cyData?: string
  correctPlaceHolder?: string
  fieldState: { isDirty: boolean, isTouched: boolean, invalid: boolean, error?: FieldError }
  formControl?: Control<any>
  children?:
  | JSX.Element
  | JSX.Element[]
  isDisabled?: boolean
  inputType?: string
  className?: string
  showRequired?: 'required' | 'optional'
  preventDefault?: boolean
  resizable?: boolean
  fieldSetClassNames?: string
  hideBorders?: boolean
  fieldSetFullHeight?: boolean
  onChange?: any
  onClick?: any
  readOnly?: boolean
};

export interface SelectDropdownProps<T = void> extends InputProps {
  options?: Array<Option<T>>
  fieldNameControl: string
  enableSearch?: boolean
  formControl: Control<any>
  isMulti?: boolean
  reactSelectProps?: StateManagerProps<T>
  setValue?: UseFormSetValue<any>
  disableOption?: (option: Option<void>) => boolean
  noOptionsMessage?: string
  components?: Partial<SelectComponents<any, boolean, GroupBase<Option<any>>>>
  selectEntireOption?: boolean
  noOptionButton?: boolean
  showMenu?: boolean
};

export interface ExtendedSelectDropdownProps extends SelectDropdownProps {
  isMenuAlwaysOpen?: boolean
  checkboxPosition?: 'left' | 'right'
  hasCustomHeader?: boolean
  customHeaderText?: string | undefined
  hideInputWrapper?: boolean
  children?: JSX.Element | JSX.Element[] | undefined
  usePortal?: boolean
  menuOnly?: boolean
  usePopperMenu?: boolean
  childrenInHeader?: JSX.Element | JSX.Element[] | undefined
  displayValue?: string
}

export interface TimeInputProps extends InputProps {
  formControl: any
  fieldNameControl: string
  minuteStep?: number
  hourStep?: number
  showSecond?: boolean
  popupClassName?: string
  classNamePicker?: string
  storeAsMoment?: boolean
  format?: string
}

export interface AutoCompleteProps<T = void> extends SelectDropdownProps<T> {
  menuPlacement?: 'top' | 'auto' | 'bottom'
  defaultOptions?: Array<Option<T>>
}

export interface AddPlayerDropDown {
  cyData: string
  options: Array<Option<any>>
}

export interface AutoCompletePlayers extends AddPlayerDropDown {
  menuPlacement?: 'top' | 'auto' | 'bottom'
  addPlayerButton?: (contactsId?: string, teamId?: string, isCaptain?: boolean, label?: string) => Promise<void>
  isCaptainInTeam?: boolean
  onClick?: (option: Option<any>) => void
  addScore?: boolean
  control?: any
  fieldName?: string
  addOrRemove?: boolean
}

export interface RadioButtonProps {
  isChecked?: boolean
  label?: string
  value: string
  cyData?: string
  id?: string
  registrationOption: UseFormRegisterReturn<string>
  disabled?: boolean
}

export interface GoogleAutoCompleteInputProps extends InputProps {
  onSelect: (place?: google.maps.places.PlaceResult) => void
  searchOptions?: google.maps.places.AutocompleteOptions
  formControl: Control<any>
  fieldNameControl: string
  options?: Option[]
};
