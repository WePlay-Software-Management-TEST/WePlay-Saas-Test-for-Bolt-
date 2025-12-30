import React, { useState } from 'react';
import { type ButtonProps } from 'core/models/button.model';
import { ReactComponent as LeftArrow } from 'assets/svgs/Arrow_left.svg';
import { ReactComponent as RightArrow } from 'assets/svgs/Arrow_right.svg';
import Lottie from 'lottie-react';
import LoadingButton from 'assets/lottie/loadingButton.json';

/**
 * Renders a button component with different themes and sizes.
 * @example
 * // Usage example
 * <Button
 *   type="primary"
 *   text="Click me"
 *   onClickCallable={() => console.log('Button clicked')}
 * />
 *
 * @param { 'primary' | 'secondary' | 'tertiary' } type - The theme of the button, the themes are based on our standard design system.
 * @param { boolean } isValidChecked - Indicates if the button is validly checked, used with react-hook-form, to enable or disable the button
 * @param { string } text - The text to be displayed on the button.
 * @param { (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void } onClickCallable - The function to be called when the button is clicked.
 * @param { string } id - The ID of the button.
 * @param { string } cyData - The data attribute for Cypress testing.
 * @param { boolean | undefined } showIcon - Indicates if the button should show an icon.
 * @param { 'large' | 'medium' | 'small' | 'contain' }size - The size of the button.
 * @param { 'right' | 'left' } iconPosition - The position of the icon relative to the text.
 * @param { boolean }toast - Indicates if the button is a toast button.
 * @param { (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> } asyncOnClick - The asynchronous function to be called when the button is clicked.
 * @param { boolean | undefined } isDisabled - Indicates if the button is disabled, doesn't override isValid param.
 * @param { 'submit' | 'button' } buttontype - The type of the button element.
 * @param { string } className - The additional CSS class for the button.
 * @param { React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>} Icon - The icon component to be displayed on the button.
 * @param { string } htmlFor - The ID of the associated form element, used with buttonHtmlTag set to 'Label'
 * @param { 'label' | 'button' } buttonHtmlTag - The HTML tag for the button element, , it can be a <Label> or <Button>.
 * @returns The rendered button component.
 */
function Button ({
  type,
  isValidChecked,
  text,
  onClickCallable,
  id,
  cyData,
  showIcon,
  size,
  iconPosition,
  toast,
  asyncOnClick,
  isDisabled,
  buttontype,
  className,
  Icon,
  htmlFor,
  showTextOnMobile = false,
  buttonHtmlTag = 'button'
}: ButtonProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  // TODO: Integrate DaisyUI Button theme in the index.css instead of using it here.
  // In a way, we will still have the same props, but instead of having huge classNames const that indicate
  // which theme we are applying, "Secondary, Primary, Tertiary", we just combine those to one className, that
  // corresponds to CSS classes.
  // This will help in limiting re-renders of the button, and also makes it more readable.
  // Main usage wont differes, because the button will be used in the same way.
  const buttonClasses = {
    primary: `
      pointer-events-auto
      normal-case  
      btn 
      btn-active
      btn-primary
      rounded-lg 
      w-auto 
      body-sm-text
      text-white
      shadow-primary 
      disabled:shadow-none
      hover:shadow-primary-hover 
      hover:border-[#7B66FF]  
      hover:bg-[#7B66FF] 
      disabled:!text-grey-40
      disabled:!text-opacity-100
      disabled:!bg-opacity-100
      ${
        isLoading
        ? 'disabled:bg-grey-90 disabled:border-2 disabled:border-grey-90'
        : 'disabled:bg-grey-90'
    }     
    `,
    secondary: `
    pointer-events-auto
      btn
      normal-case
      body-sm-text
      flex 
      justify-center
      items-center
      border
      bg-white
      border-grey-90
      rounded-lg
      text-grey-10
      gap-2 
      font-semibold
      hover:shadow-secondary-hover
      hover:bg-grey-90
      hover:text-grey-40
      hover:border-0
      disabled:text-grey-70
      disabled:border
      disabled:border-grey-90
      ${
        isLoading
        ? 'disabled:bg-grey-90 disabled:border-2 disabled:border-grey-98'
        : 'disabled:bg-grey-90 '
    }
    `,
    tertiary: `
      btn
      normal-case
      body-sm-text
      flex
      border-0
      bg-transparent
      justify-center
      items-center
      gap-2
      rounded-lg
      text-grey-10
      font-semibold
      hover:bg-grey-90
      disabled:text-grey-70
      disabled:hover:bg-white
    `,
    toast: `
      btn
      normal-case
      body-sm-text
      flex
      bg-transparent
      border-0
      justify-center
      items-center
      gap-2
      rounded-lg
      text-grey-70
      font-semibold
      hover:text-grey-90
      hover:bg-transparent
      disabled:text-grey-70
    `
  };

  const sizeClasses = {
    large: 'px-11',
    medium: 'px-8',
    small: 'py-[10px] px-3',
    contain: 'w-full'
  };

  const sizeClassType = size !== undefined ? size : 'large';
  const sizeClass = sizeClasses[sizeClassType];

  const buttonClass = toast as boolean ? buttonClasses.toast : buttonClasses[type];

  const generalClass = buttonClass.concat(' ', sizeClass);

  const InternalOnClick = (): void => {
    if (asyncOnClick !== undefined) {
      setIsLoading(() => true);

      void asyncOnClick()
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });

      return;
    };
    if (onClickCallable !== undefined) {
      onClickCallable();
    }
  };

  const loadingAnimation = (): JSX.Element => {
    return (
      <Lottie
        animationData={LoadingButton}
        loop={true}
        width={240}
        height={240}
        className='w-14 h-full'
       />
    );
  };

  const renderButtonContent = (): JSX.Element | JSX.Element[] | string => {
    if (showIcon === undefined || !showIcon) {
      return text;
    }
    if (iconPosition === 'left') {
      return (
        <>
          { Icon === undefined ? <LeftArrow className='fill-grey-40 stroke-grey-40'/> : <Icon /> }
          {text !== '' && <span className={(showTextOnMobile) ? '' : 'mobile:hidden'}>{text}</span>}
        </>
      );
    }
    return (
      <>
        {text !== '' && <span className={(showTextOnMobile) ? '' : 'mobile:hidden'}>{text}</span>}
        { Icon === undefined ? <RightArrow className='fill-white'/> : <Icon /> }
      </>
    );
  };
  return (
    buttonHtmlTag === 'button'
      ? <button
    type={buttontype === undefined ? 'button' : buttontype}
    id={id}
    data-cy={cyData}
    className={`${generalClass} ${className ?? ''}`}
    disabled={
      (isLoading || (isDisabled ?? false) || (isValidChecked !== undefined && !isValidChecked))
    }
    onClick={InternalOnClick}
    >
      { isLoading ? loadingAnimation() : renderButtonContent()}
    </button>
      : <label
      id={id}
      data-cy={cyData}
      className={`${generalClass} ${className ?? ''}`}
      htmlFor={htmlFor}
      >
        { isLoading ? loadingAnimation() : renderButtonContent()}
      </label>
  );
};

export default Button;
