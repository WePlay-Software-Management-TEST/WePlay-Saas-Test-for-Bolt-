import React, { memo } from 'react';
import { type AutoCompleteProps } from 'core/models/input.model';
import Input from '../input';
import Select, { components as Comp, type MultiValueRemoveProps } from 'react-select';
import { Controller } from 'react-hook-form';

export const MultiValueRemove = memo(function removeIcon (props: MultiValueRemoveProps): JSX.Element {
  return (
  <Comp.MultiValueRemove {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" className='!rounded-tr-full!rounded-br-full
            overflow-hidden scale-1.5'>
      <path d="M11.4294 4.57141L4.57227 11.4286" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.57227 4.57141L11.4294 11.4286" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Comp.MultiValueRemove>);
});

/**
 * @component Auto Complete Input Wrapper for React Select Library.
 * @param { Control<any> | undefined } formControl - Connect the autoComplete input to React Hook Form.
 * @param { string | undefined } placeholder - PlaceHolder text.
 * @param { Array<Option<any>> } options - Array of options.
 * @param { string | undefined } fieldNameControl - String, should contain the name of the field in the form you want to connect to.
 * @param { boolean | undefined } enableSearch - Enable the ability to search the option while typing.
 * @param { boolean | undefined } isMulti - Enable the ability to multi select multiple options.
 * @param { Partial<SelectComponents<any, boolean, GroupBase<Option<any>>>> | undefined } components - Array of custom components you would like to add, read more about React Select components here: https://react-select.com/components
 * @returns { JSX.Element }
 */
export function AutoComplete ({
  formControl, placeholder, options,
  fieldNameControl, enableSearch,
  menuPlacement = 'auto',
  cyData, isMulti, defaultOptions, noOptionsMessage = 'No Options', components, ...props
}: AutoCompleteProps<any>): JSX.Element {
  return (
    <Controller
    control={formControl}
    name={fieldNameControl}
    render={({ field }) => {
      return (<Input {...props} cyData={cyData} placeholder={placeholder}>
          <Select
          isMulti={isMulti}
          isDisabled={props.isDisabled}
          data-cy={cyData}
          classNames={{
            control: () => `!border-0 !outline-0 !shadow-none group disabled:bg-grey-10 ${(props.isDisabled ?? false) ? '!bg-grey-98' : ''}`,
            container: () => `w-full !outline-0 !border-0 focus:!outline-0 focus:!border-0 ${(props.isDisabled ?? false) ? 'bg-grey-98' : ''}`,
            indicatorSeparator: () => 'hidden',
            indicatorsContainer: () => '!hidden',
            valueContainer: () => '!px-0 !overflow-visible',
            placeholder: () => 'body-xs-text text-grey-40',
            menu: () => `
              !p-0 ${menuPlacement === 'top' ? '!mb-3' : '!mt-3'} -ml-5 mr-5 left-0 
              !rounded-box !shadow-2xl !shadow-[#0000003D] 
              w-72 !border !border-grey-90
              `,
            multiValueRemove: () => 'peer-focus-within:!bg-blue-60 peer-focus-within:!stroke-white',
            multiValueLabel: () => 'peer',
            multiValue: () => `${props.isDisabled === true ? '!pointer-events-none' : ''}`,
            input: () => 'cypressAutoComplete',
            menuPortal: () => '!z-[9999]'
          }}
          components={{
            ...components,
            MultiValueRemove
          }
        }
          {...field}
          isSearchable={true}
          options={options}
          placeholder={placeholder}
          minMenuHeight={300}
          menuPlacement='auto'
          menuPortalTarget={document.body}
          hideSelectedOptions={true}
          noOptionsMessage={() => { return noOptionsMessage; }}
          isOptionDisabled={props.disableOption}
          />
    </Input>);
    }}
    />
  );
};

export const MemorizedAutoComplete = memo(AutoComplete);
