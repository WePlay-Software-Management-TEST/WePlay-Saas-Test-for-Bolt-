import React, { forwardRef } from 'react';
import { ReactComponent as PlusIcon } from 'assets/svgs/plusIcon.svg';
import { useTranslation } from 'react-i18next';
import DropdownButton from 'core/components/button/dropdownButton';
import { NavLink } from 'react-router-dom';
import AuthorizedRoute from 'core/routeGuards/authorizedRoute';

interface GlobalActionHeaderProps {
  queryInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeHolderText?: string
};

const GlobalActionHeader = forwardRef<HTMLInputElement, GlobalActionHeaderProps>(
  function GlobalActionHeader ({ queryInput, placeHolderText = 'Search Players...' }, ref): JSX.Element {
    const { t } = useTranslation(['header']);
    return (
    <div className='flex w-full justify-between'>
      <div
        className="mobile:hidden
        relative md:w-[520px] sm:w-[250px] h-[50px] flex
        justify-between items-center group
      group-hover:bg-grey-98">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                  </path></svg>
          </div>
          <input
            id="default-search"
            maxLength={40}
            data-cy='global-filter-input'
            className="
            group-hover:bg-grey-98 block w-full
            p-3 pl-10 text-sm text-gray-900 border focus:outline-blue-40
            rounded-md border-grey-90 placeholder:text-grey-40"
            onInput={queryInput}
            ref={ref}
            placeholder={placeHolderText}/>
      </div>
      <label
      data-cy='mobileSearchNav'
      htmlFor='mobileSearchModal'
      className='hidden mobile:btn mobile:btn-square mobile:btn-outline
      mobile:border-grey-90 mobile:flex justify-between group/item hover:bg-grey-98'>
      <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                  </path></svg>

      </label>
      <AuthorizedRoute type='authComps' id='create.all'>
      <DropdownButton buttonText={t('createNewButton')} cyData='globalCreateDropdown' menuClassname='mobile:w-48'>
    <li>
      <NavLink
      data-cy='globalActionOption'
      to={'/player/create'}
      className='flex justify-between group/item hover:bg-grey-98 h-11 max-h-11 px-4 text-base mobile:text-sm font-normal'>
        { t('option1') }
        <PlusIcon
        className='group-hover/item:block hidden stroke-grey-70'/>
      </NavLink>
    </li>
    <li>
      <NavLink
      data-cy='globalActionOption'
      to={'/teams/create'}
      className='flex justify-between group/item hover:bg-grey-98 h-11 max-h-11 px-4 text-base mobile:text-sm font-normal'>
        { t('option2') }
        <PlusIcon
        className='group-hover/item:block hidden stroke-grey-70'/>
      </NavLink>
    </li>
    <li>
    <NavLink
      data-cy='globalActionOption'
      to={'/tournament/create'}
      className='flex justify-between group/item hover:bg-grey-98 h-11 max-h-11 px-4 text-base mobile:text-sm font-normal'>
        { t('option3') }
        <PlusIcon
        className='group-hover/item:block hidden stroke-grey-70'/>
      </NavLink>
    </li>
    <li>
    <NavLink
      data-cy='globalActionOption'
      to={'/league/create'}
      className='flex justify-between group/item hover:bg-grey-98 h-11 max-h-11 px-4 text-base mobile:text-sm font-normal'>
        { t('option4') }
        <PlusIcon
        className='group-hover/item:block hidden stroke-grey-70'/>
      </NavLink>
    </li>
</DropdownButton>
      </AuthorizedRoute>
    </div>
    );
  }
);

export default GlobalActionHeader;
