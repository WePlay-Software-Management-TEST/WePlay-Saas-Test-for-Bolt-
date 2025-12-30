import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { debounce } from 'lodash';
import { LatestSearch } from 'core/components/table/latestSearch';
import { useTranslation } from 'react-i18next';
import { type Team, type Contact } from 'graphql/table.models';
import { type IRowNode } from 'ag-grid-community';
import { type MobileSearchProps } from 'core/models/filters.model';
import { ProfileDetailsRenderer } from 'core/components/table/cellRenderers/ProfileDetailsRenderer';
import { ReactComponent as ArrowLeft } from 'assets/svgs/Arrow_left.svg';
import { ReactComponent as FilterIcon } from 'assets/svgs/mobileFilter.svg';
import emptyFilterResultsImage from 'assets/images/search-player-filter-thoughtful-man-with-empty-list.png';

/**
 * Renders a mobile search component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.placeHolderText - The placeholder text for the search input.
 * @param {React.ReactNode} props.filtersComponent - The component for displaying filters.
 * @param {Function} props.queryInput - The function to handle query input.
 * @param {any} props.gridApi - The grid API object.
 * @param {boolean} props.reRenderFlag - The flag to trigger re-rendering.
 * @returns {JSX.Element} The rendered mobile search component.
 */
export function MobileSearch ({
  placeHolderText, filtersComponent, queryInput, gridApi, reRenderFlag
}: MobileSearchProps): JSX.Element {
  const [searchResults, setSearchResults] = useState<Array<Contact & Team | null>>();
  const { t } = useTranslation(['components']);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const resultsComponent = useMemo(() => {
    return (searchResults !== undefined && searchResults.length !== 0)
      ? <div className='flex flex-col gap-2 justify-start pt-2 overflow-y-scroll overflow-hidden'>
      {
        searchResults.map((searchResult) => {
          let name = `${searchResult?.FirstName ?? ''} ${searchResult?.LastName ?? ''}`;
          if (name.replace(/\s/g, '') === '') {
            name = searchResult?.TeamName ?? '';
          }
          return <ProfileDetailsRenderer key={searchResult?.id}
          containerClassname='!justify-start mt-4 text-sm font-normal leading-4'
          paragraph={name}
            imageId={searchResult?.PhotoId ?? ''} navLink={`${searchResult?.id ?? ''}`}
          />;
        })
      }
    </div>
      : <div className='flex flex-col w-full items-center justify-start gap-4 py-8 h-full'>
      <img
      src={emptyFilterResultsImage}
      className='bg-contain mobile:w-[236px]'/>
      <h6 className='text-[24px] font-semibold leading-5 text-grey-10'>
        {t('noResultsState')}</h6>
        <p className='average:text-[18px] short:text-[14px] text-grey-10 text-center mobile:text-wrap mobile:px-4'>{t('noResultsParagraph')}</p>
      </div>;
  }, [searchResults]);

  const setLatestQuery = useCallback(debounce((e: string) => {
    queryInput(e as unknown as React.ChangeEvent<HTMLInputElement>);
    if (searchInputRef.current !== null) {
      searchInputRef.current.value = e;
    }
  }, 100), []);

  useEffect(() => {
    if (!((gridApi?.isAnyFilterPresent() as boolean) ?? false)) return;
    if (gridApi?.getRenderedNodes() === undefined) return;
    setSearchResults(() => {
      const filteredData: Array<(Contact & Team) | null> = gridApi?.getRenderedNodes().map((e: IRowNode<Contact | Team>) => {
        if (e.data === undefined) return null;
        return e.data as (Contact & Team) | null;
      });
      return filteredData;
    });
  }, [reRenderFlag]);

  return <>
  <input type="checkbox" id="mobileSearchModal" className="modal-toggle" />
<div className='modal modal-bottom bg-transparent'>
<div className='modal-box flex w-full flex-col py-2 px-4 max-h-[calc(100%-56px)] h-full'>
    <div className='flex w-full justify-between items-center'>
      <label htmlFor='mobileSearchModal' data-cy='buttonForFilter'>
        <ArrowLeft className='fill-grey-10 stroke-grey-10' />
      </label>
      <div
        className="
        relative h-[40px] flex
        justify-between items-center group
      ">
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
            data-cy='quickFilterMobile'
            className="
            focus:outline-none focus:ring-0
             block w-full
            p-2 pl-10 text-sm text-gray-900 border
            rounded-[8px] border-grey-90 placeholder:text-grey-40"
            placeholder={placeHolderText}
            onInput={queryInput}
            ref={searchInputRef}
            />
      </div>
      <label
        data-cy='mobileFilterButton'
        htmlFor="mobileFilterModal"
        className="btn btn-circle bg-white border-white">
          <FilterIcon data-cy='FilterIconSVG' className={`${
            gridApi?.getFilterModel() !== undefined && Object.keys(gridApi?.getFilterModel()).length !== 0
            ? 'fill-blue-70 stroke-blue-70'
            : 'fill-grey-10 stroke-grey-10'
          }`}/>
      </label>
    </div>
    {
      ((gridApi?.isAnyFilterPresent() as boolean) ?? false)
        ? resultsComponent
        : <LatestSearch queryInput={setLatestQuery} type='mobile'/>
    }
  </div>
</div>
<input type="checkbox" id="mobileFilterModal" className="modal-toggle" />
<div data-cy='modalBox' className="modal modal-bottom bg-[#00000099] text-grey-10 h-screen">
  <div className="modal-box gap-6 p-0 flex flex-col w-full">
    { filtersComponent ?? <></> }
  </div>
</div>
  </>;
};
