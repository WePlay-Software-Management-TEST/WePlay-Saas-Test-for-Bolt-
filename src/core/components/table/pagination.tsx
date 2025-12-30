import React, { memo } from 'react';
import { ReactComponent as ChevronArrow } from 'assets/svgs/pagination-chevron-arrow.svg';
import Select, { components, type OptionProps } from 'react-select';
import { ReactComponent as ArrowDrop } from 'assets/svgs/Arrow_drop_down_big.svg';
import { type Option } from 'core/models/input.model';
import { PageSizes } from 'core/context/global.const';
interface PaginationProps {
  onSetPageSize: (pageSize: Option) => void
  onNextPage: () => void
  onPreviousPage: () => void
  pageSize: number
  totalPages: number
  currentPage: number

}

function Pagination (
  {
    onSetPageSize, onNextPage, onPreviousPage,
    totalPages, currentPage, pageSize
  }: PaginationProps): JSX.Element {
  const PageSizeDropDown = memo(function PaginationSelect () {
    const Option = (props: OptionProps<Option>): JSX.Element => {
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
    const DropdownIndicator = (): JSX.Element => {
      return (
        <ArrowDrop className='fill-grey-40 scale-75' data-cy='pagination-dropdown-page-size'/>
      );
    };
    return (
    <>
      <Select
          classNames={{
            control: () => '!border-0 !outline-0 !shadow-none group !bg-grey-98 w-12 ',
            container: () => '!outline-0 !border-0 focus:!outline-0 focus:!border-0 ',
            indicatorSeparator: () => 'hidden',
            indicatorsContainer: () => 'group-focus-within:!rotate-180 transition duration-500',
            valueContainer: () => '!px-0 classForTestValue ',
            placeholder: () => 'body-xs-text text-grey-40',
            menu: () => `
            !p-0 !w-[106%] mr-5 left-0 
            !rounded-box !shadow-2xl !shadow-[#0000003D] 
            w-72 !border !border-grey-90
            `
          }}
          components={{
            DropdownIndicator,
            Option
          }
        }
        onChange={(value: Option | unknown) => { onSetPageSize(value as Option); }}
        options={PageSizes}
        menuPlacement='top'
        isSearchable={false}
        defaultValue={{
          label: String(pageSize),
          value: String(pageSize)
        }}
        />
    </>
    );
  });

  return (
    <div
    data-cy='table-pagination'
    className='w-full average:h-[76px] short:h-[60px] p-4 pr-6 flex justify-end
    bg-grey-98 border-t border-grey-90 shadow-md shadow-[#00000003] fixed mx-auto bottom-0'>
      <div className='flex h-full items-center justify-between gap-6'>
        <span
        className='text-center flex justify-between items-center'>Rows per page: <PageSizeDropDown />
        </span>
        <p className='text-center' data-cy='pagination-number-of-pages'> {currentPage} of {totalPages}</p>
        <div className='flex gap-3 lg:mr-15 xs:mr-5'>
          <button className='tooltip tooltip-info group tooltip-left'
          data-cy='prev-page-button' data-tip='Previous page'
          onClick={onPreviousPage} disabled={currentPage === 1}>
          <ChevronArrow className='group-disabled:fill-grey-90 fill-grey-40' />
          </button>
          <button className='tooltip tooltip-info tooltip-left group'
          data-cy='next-page-button' data-tip='Next page'
          onClick={onNextPage} disabled={totalPages === currentPage}>
          <ChevronArrow className='rotate-180 group-disabled:fill-grey-90 fill-grey-40'/>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Pagination;
