import React, { useEffect, useState } from 'react';
import { type SelectDropdownProps, type Option } from 'core/models/input.model';
import Input from './input';
import { type GroupBase, type ClassNamesConfig, type OptionProps, components } from 'react-select';
import { Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { type SelectComponents } from 'react-select/dist/declarations/src/components';

/**
   * Renders a multi-input component.
   * @Component
   * @param formControl - The form control for the input.
   * @param placeholder - The placeholder text for the input.
   * @param fieldNameControl - The field name control for the input.
   * @param cyData - The Cypress data attribute for testing.
   * @param isMulti - Indicates whether the input supports multiple values.
   * @param reactSelectProps - Additional props for the React Select component.
   *  @returns {JSX.Element} The rendered multi-input component.
   */
function MultiInput (properties: SelectDropdownProps): JSX.Element {
  const {
    formControl,
    placeholder,
    fieldNameControl,
    cyData,
    isMulti,
    reactSelectProps,
    options = [],
    showMenu = false,
    id
  } = properties;
  const [componentsList, setComponentsList] = useState<Partial<SelectComponents<any, any, any>>>({});
  const [classNamesList, setClassNamesList] = useState<ClassNamesConfig<any>>({});

  const DropdownIndicator = (): JSX.Element => {
    return <></>;
  };

  const MultiSelectOption = (props: OptionProps<Option>): JSX.Element => {
    const { children, isSelected, isFocused } = props;
    return (
      <components.Option {...props}
      className={
        `${isSelected ? '!text-secondary !bg-transparent' : ''}
        ${isFocused ? '!bg-grey-98 shadow-grey-98' : ''}
        hover:bg-grey-98 rounded-box duration-150 !text-base 
        hover:!text-grey-20`}>
        { children }
      </components.Option>
    );
  };

  useEffect(() => {
    setComponentsList({
      DropdownIndicator,
      Option: MultiSelectOption,
      ...reactSelectProps?.components
    });
    setClassNamesList({
      control: () => '!border-0 !outline-0 !shadow-none group',
      container: () => 'w-full !outline-0 !border-0 focus:!outline-0 focus:!border-0',
      indicatorSeparator: () => 'hidden',
      indicatorsContainer: () => 'group-focus-within:!rotate-180 transition duration-500',
      valueContainer: () => '!px-0',
      placeholder: () => 'body-xs-text text-grey-40',
      menu: () => `${(showMenu ?? false) ? '' : '!hidden'} cyMenuMulti
        !mt-4 !p-0 !w-[106%] -ml-5 mr-5 left-0 
        !rounded-box !shadow-2xl !shadow-[#0000003D] 
        w-72 !border !border-grey-90
        `,
      multiValue: () => `
        testMultiValue
        !rounded-lg
        !bg-grey-40
        !bg-opacity-5
        !text-grey-40
        `,
      multiValueLabel: () => '!text-grey-40',
      menuPortal: () => '!z-[999]',
      multiValueRemove: () => `
        multiValueRemoveTest
        !rounded-tr-lg !rounded-br-lg
        hover:!bg-grey-40 hover:!fill-grey-40
        `,
      ...reactSelectProps?.classNames
    });
  }, []);
  return (
    <Controller
    control={formControl}
    name={fieldNameControl}
    render={({ field }) => {
      return (<Input {...properties}>
          <CreatableSelect
          noOptionsMessage={undefined}
          options={(options as unknown as Array<GroupBase<any>>)}
          isMulti={isMulti}
          data-cy={cyData}
          menuPortalTarget={document.body}
          classNames={classNamesList}
          components={componentsList}
          placeholder={placeholder}
          {...field}
          { ...reactSelectProps }
          inputId={id ?? cyData}
          />
    </Input>);
    }}
    />
  );
};

export default MultiInput;
