export interface ButtonProps {
  size?: 'large' | 'medium' | 'small' | 'contain'
  text: string
  isValidChecked?: boolean
  id?: string
  onClickCallable?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  cyData?: string
  showIcon?: boolean
  type: 'primary' | 'secondary' | 'tertiary'
  iconPosition?: 'right' | 'left'
  toast?: boolean
  asyncOnClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
  isDisabled?: boolean
  buttontype?: 'submit' | 'button'
  buttonHtmlTag?: 'label' | 'button'
  htmlFor?: string
  className?: string
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined }>
  showTextOnMobile?: boolean
};

export interface DropDownButtonProps {
  options?: string[]
  children?: JSX.Element[] | JSX.Element
  buttonText: string
  cyData: string
  className?: string
  dropDownType?: 'secondary' | 'primary'
  dropDownSize?: 'small' | 'medium' | 'large'
  menuPosition?: 'dropdown-top' | 'dropdown-bottom'
  menuClassname?: string
  textClassName?: string
  labelClassName?: string
  forceDisable?: boolean
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined }>
};
