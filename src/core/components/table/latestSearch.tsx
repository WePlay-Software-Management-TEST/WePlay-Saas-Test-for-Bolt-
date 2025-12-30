import React from 'react';
import { ReactComponent as LatestSearchIcon } from 'assets/svgs/search-player-default-player-history.svg';
import { useLatestSearch } from 'core/context/lastestSearchContext/latestSearchContext.consumer';
import { useTranslation } from 'react-i18next';
interface LatestSearchProps {
  queryInput: (e: string) => void
  type?: 'mobile' | 'desktop'
}
/**
 * Renders the latest search component.
 * @param {LatestSearchProps} props - The props of the component.
 * @param {Function} props.queryInput - The function to handle query input when latest search chip gets clicked.
 * @param {string} [props.type='desktop'] - The type of the component (desktop or mobile).
 * @returns {JSX.Element} The latest search component.
 */
export function LatestSearch ({ queryInput, type = 'desktop' }: LatestSearchProps): JSX.Element {
  const { latestSearch } = useLatestSearch();
  const { t } = useTranslation(['components']);

  return <div className={
      `
      ${latestSearch.length === 0 ? 'hidden' : 'flex'}
      ${type === 'mobile' ? 'flex flex-col mobile:gap-2 pt-2' : 'mobile:hidden gap-4 items-center'}
      `}
      data-cy='latest-Search-Main-Div'>
        <p className='text-xs text-grey-10 font-light'>{ t('latestSearchParagraph') }</p>
        <div className={`${type === 'mobile' ? 'flex mobile:gap-2' : 'flex gap-4 items-center'}`}>
        {
        latestSearch.slice(0, 3).map((query, index) => {
          return (
            <button
            data-cy='latestSearchChip'
            onClick={() => { queryInput(query); }}
            key={index}
            className={`group peer flex bg-grey-98 text-grey-10 gap-3
              p-2 mobile:pl-0 rounded-lg text-xs items-center font-normal
              hover:bg-grey-10 hover:text-white hover:shadow-sm hover:shadow-grey-98
              hover:stroke-white
              `}>
              <LatestSearchIcon className='stroke-grey-70 group-hover:stroke-white
              peer-hover:stroke-white'/>
              {query}
              </button>
          );
        })
        }
      </div>
      </div>;
};
