import React, { useState, useRef } from 'react';
import { ReactComponent as ArrowDrop } from 'assets/svgs/Arrow_drop_down_big.svg';
import { ReactComponent as Cancel } from 'assets/svgs/cancel.svg';
import Button from 'core/components/button/button';
import { type BaseFilterProps } from 'core/models/filters.model';

export function BaseFilter (
  {
    cyData, header, Icon, children, filterResults, onClear,
    setFilters, isActive, numOfSelected, removeBottomBorder, closeModalHtmlFor, type = 'desktop'
  }: BaseFilterProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const closeMobileModal = useRef<HTMLLabelElement>(null);

  const mobileFilter = async (): Promise<void> => {
    (setFilters as () => void)();
    setTimeout(() => {
      if (closeMobileModal.current !== null) {
        closeMobileModal.current.click();
      }
    }, 1200);
  };

  return type === 'desktop'
    ? <div
  className={
    `dropdown dropdown-bottom respDropDownMenu
    group/dropdown
     group flex flex-col
     h-[26px]
     justify-left items-left
     max-h-[26px]
     `}
     data-cy={cyData}>
    <label
    tabIndex={0}
    onFocus={() => { setIsOpen(true); }}
    className={`group/dropdownbutton
    focus:border-blue-70
    ${isActive as boolean ? '!bg-[#D3CCFF45]' : ''}
    focus:bg-[#D3CCFF45]
    btn px-2 max-h-[26px] h-[26px] min-h-[26px] flex flex-col justify-between
    items-center content-center bg-white hover:bg-grey-98 normal-case border 
    hover:border-grey-90 rounded-lg
    focus:pointer-events-none
    w-full`}>
      <div
      data-cy='dropwdownText'
      className={
        `flex justify-between items-center w-full h-full gap-1 text-xs font-normal
      text-grey-10 group-focus/dropdownbutton:text-blue-70 
      ${isActive as boolean ? '!text-blue-70' : ''}`
      }>
        {
        Icon !== undefined
          ? <Icon
              className={
                `fill-grey-70 stroke-grey-70 group-focus/dropdownbutton:fill-blue-70 
                group-focus/dropdownbutton:stroke-blue-70 
                ${isActive as boolean ? '!stroke-blue-70 !fill-blue-70' : ''}`}/>
          : <></>
        }
        <p
        data-cy='baseFilter-cy-data'>
          {`${header} ${
            (isActive as boolean && numOfSelected !== undefined && numOfSelected !== 0)
            ? `(${numOfSelected})`
            : ''}
          `}
        </p>
      <ArrowDrop
      className={
        `${isActive as boolean ? '!fill-blue-70 ' : ''} 
        group-focus/dropdownbutton:rotate-180 group-focus/dropdownbutton:fill-blue-70 
        transition duration-500 fill-grey-70 scale-125 w-3 h-3`
      }
        data-cy='filterArrowDropDown'
        />
      </div>
    </label>
    <ul
    tabIndex={0}
    className={`${isOpen ? 'flex' : 'hidden'}
    z-10
    dropdown-content menu menushadow peer bg-base-100 mt-2 min-w-[412px]
    rounded-lg shadow-2xl shadow-[#0000003D] border border-grey-90 z-50`}>
     <div className={`flex flex-col ${removeBottomBorder as boolean ? 'gap-0' : 'gap-6'}`}>
      <div className='flex justify-between items-center py-4 px-6 w-full border-b  border-grey-90'>
        <p className='body-md-text text-grey-10 font-medium'>{header}</p>
        <button onClick={() => { setIsOpen(false); }} data-cy={`baseFilter-close-${cyData}`}>
          <Cancel />
        </button>
      </div>
      { children }
    <div className={'flex justify-between items-center py-4 px-6 w-full border-t border-grey-90'}>
            <Button
                text={header === undefined ? 'Clear all' : `Clear ${header}`}
                cyData={`baseFilter-clearResults-${cyData}`}
                type='tertiary' size='small' onClickCallable={onClear}/>
            <Button
                cyData={`baseFilter-showResults-${cyData}`}
                text={`View ${filterResults ?? ''} results`}
                type='primary' size='small' onClickCallable={setFilters as () => void}/>
      </div>
     </div>
    </ul>
  </div>
    : <div className='bg-white flex-col max-h-[calc(100%-110px)] overflow-hidden overflow-y-scroll
    z-50 border-b border-grey-98 flex justify-between items-center w-full'>
    <span className='flex justify-between w-full sticky top-0 border-b px-4 border-grey-90 pb-1 bg-white pt-4 z-50'>
      <div className='w-1/3'></div>
      <p className='self-center w-1/3 text-center text-base text-grey-10 leading-5
      font-semibold'>All Filters</p>
      <label ref={closeMobileModal} htmlFor={closeModalHtmlFor} className='w-1/3 p-0 m-0 text-right text-sm
      text-grey-40 leading-4 font-semibold'>Cancel</label>
    </span>
    <div className={`flex flex-col ${removeBottomBorder as boolean ? 'gap-0' : 'gap-6'} mobile:w-full`}>
      <div className='w-full overflow-hidden overflow-y-auto'>
        { children }
      </div>
      <div className={'bottom-0 z-50 pb-4 sticky bg-white px-4 flex justify-between gap-4 items-center py-4 w-full border-t border-grey-90 h-14'}>
      <Button
                text='Clear All'
                cyData={`baseFilter-clearResults-${cyData}`}
                type='tertiary' size='small' onClickCallable={onClear}/>
        <Button
          asyncOnClick={mobileFilter}
          cyData={`baseFilter-showResults-${cyData}`}
          text='Apply Filters'
          type='primary' size='small'/>
        </div>
      </div>
    </div>
  ;
};
