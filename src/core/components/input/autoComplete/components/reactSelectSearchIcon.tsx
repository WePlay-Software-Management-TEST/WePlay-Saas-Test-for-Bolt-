import React from 'react';
import { components, type InputProps } from 'react-select';
import { type Option } from 'core/models/input.model';

/**
 * Renders the search icon for the React Select component.
 * This is only used with React-Select Library.
 * @template T - The type of the option value.
 * @param {InputProps<Option<T>>} props - The input props for the React Select component.
 * @returns {JSX.Element} - The rendered search icon with React-Select Input component nested within.
 */
export function ReactSelectSearchIcon<T> (props: InputProps<Option<T>>): JSX.Element {
  return (
    <div className='flex-row flex items-center pl-3 -order-1 mobile:h-8'>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='!rounded-tr-full!rounded-br-full
          overflow-hidden scale-1.5 stroke-grey-20 mobile:hidden'>
        <path d="M11.1429 18C14.93 18 18.0001 14.9299 18.0001 11.1428C18.0001 7.35575 14.93 4.28571 11.1429 4.28571C7.35581 4.28571 4.28577 7.35575 4.28577 11.1428C4.28577 14.9299 7.35581 18 11.1429 18Z" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.7143 19.7143L15.9857 15.9857" stroke="#B3B3B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     </svg>
     <svg
        aria-hidden="true"
        className="hidden mobile:block w-5 h-5 text-gray-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
        </path>
      </svg>
   <components.Input {...props} />
  </div>
  );
};
