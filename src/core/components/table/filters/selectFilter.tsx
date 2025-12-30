import React from 'react';
import { BaseFilter } from './baseFilter';
import { type CheckBoxFilterUIProps, type FilterOption } from 'core/models/filters.model';
import { type UseFormRegister, type FieldArrayWithId, type UseFormSetValue } from 'react-hook-form';

interface BaseCheckBoxFilterProps {
  options: FilterOption[]
  register: UseFormRegister<any>
  fields: Array<FieldArrayWithId<Record<string, any[]>, string, 'id'>>
  filterCol: string
  header: string
  setValue: UseFormSetValue<any>
}

export function BaseCheckBoxFilter (
  { fields, filterCol, options, register, header, setValue }: BaseCheckBoxFilterProps): JSX.Element {
  return (
    <div className='flex flex-col px-6 last:pb-6 mobile:px-4 filterCheckbox'>
      <p className='pb-4 text-lg text-grey-10 font-normal'>{ header }</p>
      <div className='grid grid-cols-3 items-center justify-center w-full flex-wrap gap-4 border-grey-90 mobile:gap-2'>
        {
          fields.map((field, index) =>
            <label className="flex gap-2 items-center cursor-pointer" key={field.id}>
            <input type="checkbox"
            value={options[index].label}
            { ...register(`${filterCol}.${index}.value` as const)}
            onChange={
              (e) => {
                if (e.target?.checked) { setValue(e.target.name, e.target.defaultValue); return; }
                setValue(e.target.name, false);
              }}
            className="checkbox checkbox-secondary rounded-md w-5 h-5 border-grey-10" />
            <span className="label-text text-sm font-normal text-grey-10">{options[index].label}</span>
          </label>
          )
        }
      </div>
    </div>
  );
};

export function CheckBoxFilterUI (
  {
    cyData, register, setValue, header, Icon, options, filterResults, setFilters,
    filterCol = '', isActive, onClear, numOfSelected, fields
  }: CheckBoxFilterUIProps): JSX.Element {
  return (
    <BaseFilter
      cyData={cyData}
      header={header}
      Icon={Icon}
      filterResults={filterResults}
      onClear={onClear}
      isActive={isActive}
      numOfSelected={numOfSelected}
      setFilters={setFilters}
    >
      <div className='grid grid-cols-3 items-center justify-center px-6 w-full flex-wrap gap-4 border-grey-90'>
        {
          fields?.map((field, index) => {
            return (
              <label className="flex gap-2 items-center cursor-pointer" key={field.id}>
              <input type="checkbox"
              value={options[index].label}
              { ...register(`${filterCol}.${index}.value`)}
              onChange={(e) => {
                if (e.target?.checked) { setValue(e.target.name, e.target.defaultValue); return; }
                setValue(e.target.name, []);
              }}
              className="checkbox checkbox-secondary rounded-md w-5 h-5 border-grey-10" />
              <span className="label-text text-sm font-normal text-grey-10">{options[index].label}</span>
            </label>
            );
          }
          )
        }
      </div>
    </BaseFilter>
  );
};
