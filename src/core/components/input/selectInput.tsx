import React, { useState, useEffect } from 'react';
import { type ExtendedSelectDropdownProps, type Option } from 'core/models/input.model';
import { ReactComponent as ArrowDrop } from 'assets/svgs/Arrow_drop_down_big.svg';
import { ReactComponent as ArrowDropSecondary } from 'assets/svgs/Expand_down.svg';
import { ReactComponent as Cancel } from 'assets/svgs/cancel.svg';
import { usePopper } from 'react-popper';
import Input from './input';
import Select, { components, type OptionProps, type GroupBase, type MultiValueRemoveProps, type MenuProps } from 'react-select';
import { Controller } from 'react-hook-form';
import { MultiValueRemove } from './autoComplete';
import { MultiValueWithButton } from './autoComplete/components/multiValueWithButton';

/**
 * Renders a select input component.
 *
 * @component
 * @param { SelectDropdownProps } props - The component props.
 * @param { FormControl } props.formControl - The form control object, from react-hook-form.
 * @param { string } props.placeholder - The placeholder text for the input.
 * @param { Array<Option> } props.options - The array of options for the select input.
 * @param { string } props.fieldNameControl - The name of the field control. from react-hook-form.
 * @param { boolean } props.enableSearch - Determines if search functionality is enabled.
 * @param { string } props.cyData - The data attribute for Cypress testing.
 * @param { boolean } props.isMulti - Determines if multiple options can be selected.
 * @returns { JSX.Element } The rendered SelectInput component.
 */
function SelectInput ({
  formControl,
  placeholder,
  options,
  fieldNameControl,
  enableSearch,
  cyData,
  isMulti,
  type,
  disableOption,
  selectEntireOption = false,
  hasCustomHeader,
  customHeaderText,
  checkboxPosition,
  isMenuAlwaysOpen = false,
  hideInputWrapper = false,
  usePortal = true,
  menuOnly = false,
  children,
  usePopperMenu = false,
  childrenInHeader,
  displayValue,
  ...props
}: ExtendedSelectDropdownProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(isMenuAlwaysOpen);

  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(triggerElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
  });

  useEffect(() => {
    if (!usePopperMenu) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (target.closest('.rc-time-picker-panel')) {
        return;
      }
      if (popperElement && !popperElement.contains(event.target as Node)) {
        setIsPopperOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popperElement, usePopperMenu]);

  useEffect(() => {
    if (menuOnly) setIsMenuOpen(true);
  }, [menuOnly]);

  const HeaderComponent = ({ onClose }: { onClose: () => void }): JSX.Element => (
    <>
      <div className='flex justify-between p-6'>
        {customHeaderText ? <span>{customHeaderText}</span> : ''}
        {childrenInHeader && !customHeaderText ? childrenInHeader : ''}
        <button data-cy='header-cancel-button' className='cursor-pointer' onClick={onClose}>
          <Cancel/>
        </button>
      </div>
      <div className='divider border-grey-90 mx-6 my-0'></div>
    </>
  );

  if (usePopperMenu && children) {
    return (
    <Controller
      control={formControl}
      name={fieldNameControl}
      render={({ field, fieldState }) => {
        const valueArray = Array.isArray(field.value)
          ? field.value
          : field.value ? [field.value] : [];

        const labels = valueArray.map((v: any) =>
          v?.label ??
          options?.find(o => o.value === (v?.value ?? v))?.label ??
          String(v?.value ?? v)
        );

        const displayText = displayValue ?? (field.value && labels.length > 0 ? labels.join(', ') : placeholder);

        return (
          <>
            <div ref={setTriggerElement}>
              <Input
                {...props}
                placeholder={placeholder}
                registrationOption={{} as any}
                fieldState={fieldState}
                onClick={() => { setIsPopperOpen(!isPopperOpen); }}
              >
                <input
                  data-cy={cyData}
                  readOnly
                  value={displayValue ? displayText : ''}
                  placeholder={placeholder}
                />
              </Input>
            </div>

            {isPopperOpen && (
              <div
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className='z-[1000] bg-white rounded-box shadow-2xl border border-grey-90 flex flex-col'
              >
                {hasCustomHeader && <HeaderComponent onClose={() => { setIsPopperOpen(false); }} />}
                {children}
              </div>
            )}
          </>
        );
      }}
    />
    );
  }

  const closeMenu = (): void => {
    if (!isMenuAlwaysOpen) {
      setIsMenuOpen(false);
    }
  };
  const openMenu = (): void => {
    if (!isMenuAlwaysOpen) {
      setIsMenuOpen(true);
    }
  };

  const Menu = (menuProps: any): JSX.Element => {
    return (
      <components.Menu {...menuProps}>
        {hasCustomHeader && <HeaderComponent onClose={closeMenu}/>}
        {menuProps.children}
      </components.Menu>
    );
  };

  const Option = (optProps: OptionProps<Option>): JSX.Element => {
    const { children: optChildren, isSelected, isFocused } = optProps;

    const checkboxElement = (
      <input
        type="checkbox"
        checked={isSelected}
        data-cy="OptionWithCheckbox"
        className={`
          outline checkbox checkbox-secondary rounded-md w-5 h-5 border-grey-10
          ${isSelected ? 'outline-blue-80 outline-[2.5px]' : 'outline-grey-70 outline-2 border-0'}
        `}
        readOnly
      />
    );

    const labelElement = (
      <span className="label-text text-sm font-normal text-grey-10">
        {optProps.data.label}
      </span>
    );

    return (
      <components.Option
        {...optProps}
        className={`
          ${isSelected ? '!text-secondary !bg-transparent' : ''}
          ${isFocused ? '!bg-grey-98 shadow-grey-98' : ''}
          hover:bg-grey-98 rounded-box duration-150 !text-base hover:!text-grey-20
        `}
      >
        {checkboxPosition
          ? (
          <span
            className={`flex ${checkboxPosition ? 'justify-between' : 'items-center'} gap-3 ${
              checkboxPosition === 'right' ? 'justify-between' : ''
            }`}
          >
            {checkboxPosition === 'left' && checkboxElement}
            {labelElement}
            {checkboxPosition === 'right' && checkboxElement}
          </span>
            )
          : (
              optChildren
            )}
      </components.Option>
    );
  };

  const DropdownIndicator = (): JSX.Element => {
    if (isMenuAlwaysOpen || (props?.isDisabled !== undefined && props?.isDisabled)) return <></>;
    return (<>
      {
        type === 'secondary'
          ? <ArrowDropSecondary data-cy={'secondaryDropDown'}/>
          : <ArrowDrop className={`fill-grey-70 ${isMulti as boolean ? 'hidden' : ''}`} data-cy={cyData}/>
      }
    </>);
  };

  return (
    <Controller
    control={formControl}
    name={fieldNameControl}
    render={({ field }) => {
      const customMenuList = (menuListProps: MenuProps<Option, boolean, GroupBase<Option>>): JSX.Element => {
        return <Menu {...menuListProps}>
          {children}
        </Menu>;
      };

      const selectEl = (
        <Select
          menuIsOpen={isMenuAlwaysOpen || isMenuOpen}
          onMenuClose={closeMenu}
          onMenuOpen={openMenu}
          isMulti={isMulti}
          data-cy={cyData}
          menuPlacement='auto'
          id={props.id}
          menuPortalTarget={usePortal ? document.body : null}
          isDisabled={props.isDisabled}
          hideSelectedOptions={!checkboxPosition}
          closeMenuOnSelect={!isMenuAlwaysOpen && !checkboxPosition}
          blurInputOnSelect={!isMenuAlwaysOpen && !checkboxPosition}
          // TODO: This was used to add a way to disable the options menu
          isOptionDisabled={(value) => {
            if (disableOption === undefined) {
              return props.fieldState.error?.type === 'validate';
            }
            return disableOption(value);
          }}
          classNames={{
            control: () =>
              menuOnly
                ? '!border-0 !outline-0 !shadow-none !h-0 !min-h-0 !p-0 !m-0 overflow-hidden'
                : `!border-0 !outline-0 !shadow-none group ${(props.isDisabled ?? false) ? '!bg-grey-98' : ''}`,
            container: () =>
              menuOnly
                ? ''
                : 'w-full !outline-0 !border-0 focus:!outline-0 focus:!border-0',
            indicatorSeparator: () => menuOnly ? 'hidden' : 'hidden',
            indicatorsContainer: () => menuOnly ? 'hidden' : `${isMenuOpen ? '!rotate-180' : ''} transition duration-500 ml-2`,
            valueContainer: () => menuOnly ? 'hidden' : '!px-0',
            placeholder: () => menuOnly ? 'hidden' : 'body-xs-text !text-grey-40',
            menu: () =>
              (children ?? menuOnly)
                ? '!relative !static !mt-0 !p-0 !shadow-none !border-0'
                : `
               !mt-4 !p-0 !w-[106%] -ml-5 mr-5 left-0
               !rounded-box !shadow-2xl !shadow-[#0000003D]
               w-72 !border !border-grey-90
               min-w-[150px] z-[99]
              `,
            menuList: () => 'p-0 max-h-80 overflow-auto z-[99]',
            option: () => 'my-1',
            menuPortal: () => '!z-[9999]'
          }}
          components={{
            DropdownIndicator,
            MultiValueRemove: MultiValueRemove as React.ComponentType<MultiValueRemoveProps<Option, boolean, GroupBase<Option>>>,
            MultiValue: (multiValueProps: any) => <MultiValueWithButton {...multiValueProps} noButton showProfileImg={false} />,
            ...(children
              ? { Menu: customMenuList, Option: () => null }
              : { Menu: hasCustomHeader ? Menu : components.Menu, Option }
            )
          }}
          onChange={(value: Option | unknown) => {
            if (isMulti !== undefined && isMulti) {
              field.onChange(value);
              return;
            };
            if (selectEntireOption) {
              field.onChange(value);
              return;
            }
            field.onChange((value as Option).value);
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
          }}
          value={(isMulti !== undefined && isMulti) || selectEntireOption ? field.value : options?.filter(c => c.value === field.value)}
          isSearchable={enableSearch}
          options={options}
          placeholder={placeholder}
          />
      );

      if (menuOnly) return selectEl;

      return (<Input
            {...props}
            className={hideInputWrapper ? 'hidden' : ''}
            placeholder={placeholder}
            cyData={cyData}
            type={type}
          >
            {selectEl}
          </Input>);
    }}
    />
  );
};

export default SelectInput;
