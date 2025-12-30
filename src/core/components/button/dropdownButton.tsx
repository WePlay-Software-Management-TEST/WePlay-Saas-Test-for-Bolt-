import React, { useMemo } from 'react';
import { ReactComponent as ArrowDrop } from 'assets/svgs/Arrow_drop_down_big.svg';
import { type DropDownButtonProps } from 'core/models/button.model';

/**
 * @component Dropdown component, a wrapper for DaisyUI dropdown, with custom styling.
 * for more information check: https://v2.daisyui.com/components/dropdown/
 * @param { string[] } options - List of options
 * @param { JSX.Element[] | JSX.Element } children - Dropdown menu content.
 * @param { string } buttonText - Dropdown button text.
 * @param { string } cyData - cypress testing tag.
 * @param { 'secondary' | 'primary' } dropDownType - which color, styling.
 * @param { 'medium' | 'large' | 'huge' | 'tiny' | undefined } dropDownSize - Indicate the size of the dropdown button.
 * @param { 'dropdown-top' | 'dropdown-bottom' } menuPosition - dropdown menu position.
 * @param { string } menuClassname - extra classes you would like to add to the dropdown menu.
 * @returns { JSX.Element }
 */
function DropdownButton ({
  options,
  children,
  cyData,
  buttonText,
  className,
  dropDownType,
  dropDownSize,
  menuPosition = 'dropdown-bottom',
  menuClassname = '',
  textClassName = '',
  labelClassName = '',
  forceDisable = false,
  Icon
}: DropDownButtonProps): JSX.Element {
  const primaryClass = `
  normal-case  
  btn 
  btn-active
  btn-primary
  rounded-lg 
  w-auto 
  body-sm-text
  text-white
  shadow-primary 
  hover:shadow-primary-hover 
  hover:border-[#7B66FF]
  bg-grey-10 
  hover:bg-[#7B66FF] 
  disabled:!text-grey-40
  disabled:!btn-disabled
  disabled:!text-opacity-100
  disabled:!bg-opacity-100
`;
  const secondaryClass = `
    hover:bg-grey-98
    hover:text-grey-40 hover:shadow-md

    hover:shadow-[#CCCCCC33]
    bg-white
    `;
  const optionsComp = useMemo((): JSX.Element[] | undefined => {
    return (options?.map((option) => {
      return (
      <li key={option} data-cy='dropdown-option'>
        <a
        className='flex justify-between z-10 hover:bg-grey-98 rounded-box duration-150'>
          { option }
        </a>
      </li>
      );
    }));
  }, [options]);

  return (
    <div
    className={
      `dropdown ${menuPosition ?? ''} dropdown-end
      group/menuDropdown z-10
       group flex flex-col 
       justify-center items-center
       ${className ?? ''}
       `}
       data-cy={cyData}>
      <label
      tabIndex={0}
      className={`
      group/dropdownbutton
      btn px-3 flex flex-col justify-between
      items-center content-center normal-case
      focus:pointer-events-none
      w-full
      ${forceDisable ? '!bg-grey-98 !border-0' : ''}
      ${labelClassName ?? ''} 
       ${dropDownType === 'primary' ? primaryClass : secondaryClass}`}>
        <div
        data-cy='dropwdownText'
        className='flex justify-between items-center w-full h-full gap-2'>
          <div className={dropDownSize === 'large' ? 'block' : 'hidden'}></div>
          { buttonText !== '' && <span className={textClassName}>{ buttonText }</span>}
          {
          Icon === undefined
            ? <ArrowDrop
          className={
            `group-focus/dropdownbutton:rotate-180 transition duration-500
            ${dropDownType === 'primary' ? 'fill-white' : 'fill-grey-10'
            }`}
            data-cy='arrowIconSVG'
            />
            : <Icon className={textClassName}/>
          }
        </div>
      </label>
      <ul
      tabIndex={0}
      className={`
      group-focus-within/menuDropdown:block hidden p-0 transition-none
      ${menuClassname}
      ${forceDisable ? '!hidden' : ''}
      !dropdown-content content-hidden menu menushadow bg-base-100 mt-1 z-20
      rounded-box shadow-2xl shadow-[#0000003D] w-72 border border-grey-90`}>
       {
       children !== undefined
         ? children
         : optionsComp
      }
      </ul>
    </div>
  );
};

export default DropdownButton;
