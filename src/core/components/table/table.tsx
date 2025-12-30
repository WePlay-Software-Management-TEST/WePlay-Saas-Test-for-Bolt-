import React, { useRef, useEffect, useState, useCallback } from 'react';
import { AgGridReact, type AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-grid.css';
import { debounce } from 'lodash';
import {
  type ColDef,
  type GridOptions,
  type ColumnResizedEvent,
  type ApplyColumnStateParams,
  type ModelUpdatedEvent,
  type GridReadyEvent
} from 'ag-grid-community';
import Pagination from './pagination';
import { type Option } from 'core/models/input.model';
import { getRangeFilter, getSetFilter } from './helpers';
import { type FiltersTypes } from 'core/models/filters.model';
import emptyFilterResultsImage from 'assets/images/search-player-filter-thoughtful-man-with-empty-list.png';
import Button from '../button/button';
import { useLatestSearch } from 'core/context/lastestSearchContext/latestSearchContext.consumer';
import { useTranslation } from 'react-i18next';

type TableProps = Partial<{
  columnDefs?: ColDef[]
  rowData?: any[]
  quickFilter?: string
  pinnedColsId?: string[]
  filters?: FiltersTypes | null
  preFilters?: FiltersTypes | null
  setPreFiltersLength?: (e: number) => void
  clearAllFilters?: () => void
  listOfClearButton?: JSX.Element[]
  className?: string
  customTheme?: string
  handleGridReady?: (api: GridReadyEvent | ModelUpdatedEvent) => void
  customNoRowComponent?: () => JSX.Element
} & AgGridReactProps>;

/**
 * Renders a AG-Grid table component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.rowData - The data to be displayed in the table rows.
 * @param {Array} props.columnDefs - The column definitions for the table.
 * @param {string} props.quickFilter - The quick filter value for filtering the table rows.
 * @param {Array} props.pinnedColsId - The IDs of the columns to be pinned.
 * @param {string} props.className - The custom CSS class name for the table.
 * @param {string} props.customTheme - The custom theme for the table.
 * @param {Object} props.filters - The filters to be applied to the table.
 * @param {Object} props.preFilters - The pre-filters to be applied to the table.
 * @param {Function} props.setPreFiltersLength - The function to set the length of pre-filters.
 * @param {Function} props.clearAllFilters - The function to clear all filters.
 * @param {Function} props.handleGridReady - The function to handle the grid ready event.
 * @returns {JSX.Element} The rendered table component.
 */
function Table (
  {
    rowData = [], columnDefs = [], quickFilter = '', pinnedColsId = [], className = '', customTheme = '',
    filters = null, preFilters = null, setPreFiltersLength, clearAllFilters, handleGridReady, customNoRowComponent, ...props
  }: TableProps): JSX.Element {
  const { setLatestSearch } = useLatestSearch();
  const agGridApi = useRef<AgGridReact>(null);
  const agGridHiddenApi = useRef<AgGridReact>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filtersRowResultsLength, setfiltersRowResultsLength] = useState(0);
  const { t } = useTranslation(['components']);

  const debounceFilter = useCallback(debounce((value: string) => {
    agGridApi.current?.api?.setQuickFilter?.(value);
    setfiltersRowResultsLength(agGridApi.current?.api?.getDisplayedRowCount() ?? 0);
    if (value !== '') {
      setLatestSearch({ type: 'append', query: value });
    }
  }, 400), []);

  const setColFilters = useCallback((tableAPI: AgGridReact | null, filters: FiltersTypes, setFiltersLength: boolean = false) => {
    if (tableAPI === undefined || tableAPI === null) return;
    if (typeof setPreFiltersLength !== 'function') {
      throw new Error('setPreFiltersLength is not a function');
    }
    if (filters === null) {
      tableAPI.api?.hideOverlay();
      tableAPI.api?.setFilterModel(null);
      tableAPI.api?.onFilterChanged();

      setTimeout(() => {
        setPreFiltersLength(tableAPI.api?.getDisplayedRowCount() ?? 0);
        if (setFiltersLength) {
          setfiltersRowResultsLength(tableAPI.api?.getDisplayedRowCount() ?? 0);
        }
      }, 100);
      return;
    };

    if (filters.filterModel.type === 'set') {
      const values = [...filters?.filterModel?.values as string[]];
      const isNaN = values.findIndex((el) => { return el === 'N/A'; });
      if (isNaN > -1) {
        values[isNaN] = '-';
        if (filters?.filterModel.values !== null && filters.filterModel.values !== undefined) {
          filters = {
            ...filters,
            filterModel: {
              type: 'set',
              values
            }
          };
        }
      }
    }

    const filterInstance = tableAPI?.api?.getFilterInstance(filters?.colId ?? '');

    if (filters?.filterModel.type === 'set' && Array.isArray(filters?.filterModel.values)) {
      filterInstance?.setModel(getSetFilter((filters?.filterModel?.values as string[])));
    } else if (filters?.filterModel.type === 'range' && Array.isArray(filters?.filterModel.values)) {
      filterInstance?.setModel(getRangeFilter((filters?.filterModel?.values as number[])));
    } else {
      filterInstance?.setModel(filters);
    }
    tableAPI.api.onFilterChanged();

    setTimeout(() => {
      setPreFiltersLength(tableAPI.api?.getDisplayedRowCount() ?? 0);
      if (setFiltersLength) {
        setfiltersRowResultsLength(tableAPI.api?.getDisplayedRowCount() ?? 0);
      }
    }, 100);
  }, []);

  const onPaginationChanged = useCallback(() => {
    if (agGridApi?.current?.api !== undefined) {
      setCurrentPage((agGridApi.current.api.paginationGetCurrentPage()) + 1);
      setPageSize(agGridApi.current.api.paginationGetPageSize());
      if (agGridApi.current.api.paginationGetTotalPages() === null) {
        return;
      }
      setTotalPages(agGridApi.current.api.paginationGetTotalPages());
    }
  }, []);

  useEffect(() => {
    setfiltersRowResultsLength(rowData.length);
    if (rowData.length !== 0 && agGridApi?.current?.api !== undefined) {
      agGridApi?.current?.api.setRowData(rowData);
    }
  }, [rowData]);

  useEffect(() => {
    if (agGridApi.current === null || filters === null) return;
    setColFilters(agGridApi.current, filters, true);
  }, [filters]);

  useEffect(() => {
    if (agGridHiddenApi.current === null || preFilters === null) return;
    setColFilters(agGridHiddenApi.current, preFilters);
  }, [preFilters]);

  const onBtLast = useCallback(() => {
    agGridApi.current?.api.paginationGoToPreviousPage();
  }, []);

  const onBtNext = useCallback(() => {
    agGridApi.current?.api.paginationGoToNextPage();
  }, []);

  const onPageSizeChanged = useCallback((pageSize: Option) => {
    setPageSize(Number(pageSize.value));
    agGridApi.current?.api.paginationSetPageSize(Number(pageSize.value));
  }, []);

  const onColumnResized = useCallback(debounce((e: ColumnResizedEvent) => {
    if (e === null || e === undefined) return;
    if (e?.columns === null || e?.columns === undefined) return;
    const colStatePinnedParams: ApplyColumnStateParams = {
      state: pinnedColsId.map((colId) => { return { colId, pinned: 'right' }; })
    };

    const colStateUnpinnParams: ApplyColumnStateParams = {
      state: pinnedColsId.map((colId) => { return { colId, pinned: false }; })
    };

    let viewPort: number = window.innerWidth;

    if (viewPort <= 1133) {
      viewPort = viewPort - 82;
      agGridApi.current?.columnApi.applyColumnState(colStatePinnedParams);
      return;
    };
    agGridApi.current?.columnApi.applyColumnState(colStateUnpinnParams);
  }, 300), []);

  useEffect(() => {
    if (filtersRowResultsLength === 0 && rowData.length !== 0) {
      agGridApi.current?.api?.showNoRowsOverlay();
      agGridApi.current?.api?.setDomLayout('normal');
    } else {
      agGridApi.current?.api?.hideOverlay();
      agGridApi.current?.api?.setDomLayout('autoHeight');
    }
  }, [filtersRowResultsLength]);

  const gridOptions = useRef<GridOptions>({
    rowData,
    onModelUpdated: (modelUpdated) => {
      if (handleGridReady === undefined) return;
      handleGridReady(modelUpdated);
    },
    domLayout: 'autoHeight',
    columnDefs,
    headerHeight: 50,
    rowHeight: 71,
    suppressCellFocus: true,
    rowBuffer: 50,
    suppressPaginationPanel: true,
    animateRows: true,
    valueCache: true,
    paginationPageSize: 15,
    onPaginationChanged,
    unSortIcon: true,
    onColumnResized,
    defaultColDef: {
      filterParams: {
        maxNumConditions: 25
      },
      sortable: true,
      suppressMovable: true,
      suppressCellFlash: true,
      flex: 1,
      minWidth: 150,
      filter: true
    },
    pagination: true
  });

  useEffect(() => {
    debounceFilter(quickFilter);
  }, [quickFilter]);

  useEffect(() => {
    if (agGridApi?.current?.api !== undefined) {
      setCurrentPage((agGridApi.current.api.paginationGetCurrentPage()) + 1);
      setPageSize(agGridApi.current.api.paginationGetPageSize());
      if (agGridApi.current.api.paginationGetTotalPages() === null) {
        return;
      }
      setTotalPages(agGridApi.current.api.paginationGetTotalPages());
    }

    return () => {
      console.log('table got unmounted');
    };
  }, []);
  const asyncClear = async (): Promise<void> => {
    clearAllFilters?.();
  };

  const noRowsComponent = (): JSX.Element => {
    if (customNoRowComponent !== undefined) {
      return customNoRowComponent();
    }
    return (
      <div className='flex w-full h-full flex-col average:justify-center short:justify-end items-center average:gap-6 short:gap-2 short:mt-4 mobile:mt-0 NoRowsComp' data-cy='NoRowsComp'>
        <img src={emptyFilterResultsImage} className='tall:w-auto tall:h-auto average:w-[250px] short:w-[170px]'/>
        <p className='average:text-[48px] short:text-2xl font-normal text-grey-10'>{t('noResultsState')}</p>
        <p className='average:text-[18px] short:text-[14px] text-grey-10 mobile:text-wrap mobile:px-4'>{t('noResultsParagraph')}</p>
        <Button type='primary' text='Clear All Filters' asyncOnClick={asyncClear} cyData='clearAllFiltersButton' className='mobile:mt-4'/>
      </div>
    );
  };

  return (
  <>
  <div className={`weplay-ag-grid-theme ag-theme-alpine w-full h-full ${customTheme}`}>
      <AgGridReact
          className={`w-full h-full ${className}`}
          ref={agGridApi}
          {...gridOptions.current}
          noRowsOverlayComponent={noRowsComponent}
          onGridReady={handleGridReady as unknown as (event: GridReadyEvent<any, any>) => void}
          {...props}
          >
      </AgGridReact>
  </div>
  {
    rowData.length > 15 && <Pagination
    pageSize={pageSize} totalPages={totalPages}
    currentPage={currentPage} onNextPage={onBtNext}
    onPreviousPage={onBtLast} onSetPageSize={onPageSizeChanged}
  />
  }
  <div className="hidden">
      <AgGridReact
          ref={agGridHiddenApi}
          {...gridOptions.current }
          onModelUpdated={() => {}}
          >
      </AgGridReact>
  </div>
  </>
  );
};

export default Table;
