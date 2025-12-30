import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import GlobalActionHeader from 'core/layout/globalActionHeader';
import DashboardLoading from 'core/layout/dashboardLoading';
import EmptyStateDashboard from 'features/shared/components/emptyStateDashboard';
import playerTeamsEmpty from 'assets/images/emptyTeamsPlayer.png';
import Table from 'core/components/table/table';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { useTranslation } from 'react-i18next';
import { type Contact, type Team } from 'graphql/table.models';
import { type ICellRendererParams, type ColDef, type GetRowIdParams, type GridApi, type GridReadyEvent } from 'ag-grid-community';
import { ProfileDetailsRenderer } from 'core/components/table/cellRenderers/ProfileDetailsRenderer';
import { OptionsCellRenderer } from 'core/components/table/cellRenderers/optionsCellRenderer';
import { listTeamsRequest } from './teams.service';
import { LatestSearch } from 'core/components/table/latestSearch';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import { RemoveTeamsModal } from './components/removeTeamModal';
import { produce } from 'immer';
import { type FiltersTypes } from 'core/models/filters.model';
import { type TableFiltersInterface } from 'core/components/table/table.models';
import { TeamsTableFilter } from './components/teamsTableFilter';
import { MobileSearch } from 'features/shared/components/mobileSearch';
import { isEqual, debounce } from 'lodash';
import AuthorizedRoute from 'core/routeGuards/authorizedRoute';
import UpcomingPlayerMatchRenderer from 'core/components/table/cellRenderers/UpcomingPlayerMatchRenderer';
import useUpcomingGames from './hooks/fetchUpcomingGames.hook';

export function Teams (): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTeamModal, setDeleteTeamModal] = useState(false);
  const [deleteTeamName, setDeleteTeamName] = useState('');
  const [deleteTeamID, setDeleteTeamID] = useState('');
  const [deleteTeamVersion, setDeleteTeamVersion] = useState(0);
  const [modalTeamImage, setModalTeamImage] = useState('');
  const [teamToDelete, setTeamToDelete] = useState<Team>();
  const { user } = useAuthContext();
  const imageCache = useImageCache();
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Contact[]>([]);
  const [filters, setFilters] = useState<FiltersTypes | null>(null);
  const [preFilters, setPreFilters] = useState<FiltersTypes | null>(null);
  const [filterResults, setFilterResults] = useState(0);
  const teamsTableFiltersRef = useRef<TableFiltersInterface>(null);
  const { t } = useTranslation(['teams']);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [reRenderMobileSearch, setReRenderMobileSearch] = useState(false);
  const playerTeamIds = useMemo(() => teamsData.map((team) => team.id), [teamsData]);
  const upcomingPlayerMatches = useUpcomingGames(playerTeamIds);

  const setFiltersObject = useCallback((filter: FiltersTypes) => {
    setFilters(() => filter);
  }, []);

  const setPreFiltersObject = useCallback((filter: FiltersTypes) => {
    setPreFilters(() => filter);
  }, []);

  const setFiltersResults = useCallback((length: number) => {
    setFilterResults(length);
  }, []);

  const setRenderMobileSearchFlag = (): void => {
    setReRenderMobileSearch((prev) => !prev);
  };

  const handleGridReady = debounce((gridEvent: GridReadyEvent): void => {
    if (gridApi?.getRenderedNodes() === undefined) return;
    if (isEqual(gridApi?.getRenderedNodes(), gridEvent.api.getRenderedNodes())) {
      return;
    }
    setGridApi(() => gridEvent.api);
    setRenderMobileSearchFlag();
  }, 300);

  useEffect(() => {
    if (!gridApi || !filters) return;

    const { colId, filterModel } = filters;

    if (filterModel.type === 'set') {
      if (filterModel?.values?.length === 0) {
        const currentFilterModel = gridApi.getFilterModel();
        Reflect.deleteProperty(currentFilterModel, colId);
        gridApi.setFilterModel(currentFilterModel);
      } else {
        gridApi.setFilterModel({
          ...gridApi.getFilterModel(),
          [colId]: { values: filterModel.values }
        });
      }
    } else if (filterModel.type === 'range') {
      const [min, max] = filterModel.values as number[];

      if (filterModel?.values?.length === 0) {
        const currentFilterModel = gridApi.getFilterModel();
        Reflect.deleteProperty(currentFilterModel, colId);
        gridApi.setFilterModel(currentFilterModel);
      } else {
        gridApi.setFilterModel({
          ...gridApi.getFilterModel(),
          [colId]: {
            filterType: 'number',
            type: 'inRange',
            filter: min,
            filterTo: max
          }
        });
      }
    }

    gridApi.onFilterChanged();
  }, [filters, gridApi]);

  const colDef = useMemo<Array<ColDef<Team>>>(() => {
    return [
      {
        headerName: 'Team',
        field: 'TeamName',
        sort: 'asc',
        cellRenderer: ({ data }: GetRowIdParams<Team>) => {
          return <ProfileDetailsRenderer
            paragraph={data?.TeamName}
            imageId={data.PhotoId ?? ''} navLink={data.id}
          />;
        },
        valueGetter: ({ data }) => {
          return data?.TeamName;
        },
        minWidth: 200
      },
      {
        headerName: 'Upcoming Games',
        cellRenderer: (params: ICellRendererParams<Team>) =>
        <UpcomingPlayerMatchRenderer data={params.data} upcomingMatches={upcomingPlayerMatches}/>
      },
      {
        headerName: 'Players',
        colId: 'players',
        filter: 'agNumberColumnFilter',
        valueGetter: ({ data }) => {
          return data?.TeamPlayers?.items?.length ?? 0;
        }
      },
      {
        headerName: 'Captain',
        field: 'TeamPlayers.items',
        colId: 'captain',
        valueGetter: ({ data }) => {
          const teamPlayers = data?.TeamPlayers?.items.filter((player) => (player?.IsCaptain)) ?? [];
          if (teamPlayers.length === 0) {
            return '-';
          };
          const captain = players.find((player) => (player.id.includes(teamPlayers?.[0]?.contactsID ?? '')));

          return `${captain?.FirstName ?? ''} ${captain?.LastName ?? ''}`;
        },
        cellRenderer: ({ data }: GetRowIdParams<Team>) => {
          const teamPlayers = data?.TeamPlayers?.items.filter((player) => (player?.IsCaptain)) ?? [];
          if (teamPlayers.length === 0) {
            return '-';
          };
          const captain = players.find((player) => (player.id.includes(teamPlayers?.[0]?.contactsID ?? '')));
          return <div className='flex justify-start items-start gap-2 overflow-hidden'>
              <ProfileDetailsRenderer
              paragraph={`${captain?.FirstName ?? ''} ${captain?.LastName ?? ''}`}
              imageId={captain?.PhotoId ?? ''}
              navLink={`/player/${captain?.id ?? ''}`}
            />
          </div>;
        }
      },
      {
        headerName: 'Options',
        sortable: false,
        colId: 'options',
        hide: user?.role !== '1',
        cellClass: 'toolTip-cell-aggrid',
        cellRenderer: ({ data }: GetRowIdParams<Team>) => {
          return <AuthorizedRoute type='authComps' id='teams.options'><OptionsCellRenderer
          editTipText={t('cellToolTipEdit') ?? ''}
          deleteTipText={t('cellToolTipDelete') ?? ''}
          id={data.id}
          onDelete={() => { setDeleteTeam(data); }}
          /></AuthorizedRoute>;
        }
      },
      {
        headerName: 'state',
        colId: 'state',
        sortable: false,
        field: 'State',
        hide: true
      },
      {
        headerName: 'city',
        colId: 'city',
        sortable: false,
        field: 'City',
        valueGetter: ({ data }) => {
          return `${data?.City ?? ''}, ${data?.State ?? ''}`;
        },
        hide: true
      },
      {
        headerName: 'county',
        colId: 'county',
        sortable: false,
        field: 'County',
        valueGetter: ({ data }) => {
          return `${data?.County ?? ''}, ${data?.State ?? ''}`;
        },
        hide: true
      }
    ];
  }, [players, playerTeamIds, upcomingPlayerMatches]);

  const updateQueryInput = useCallback((event: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof event === 'string') {
      setSearchQuery(event);
      return;
    };

    setSearchQuery(event.target.value);
  }, []);

  const latestSearchQuery = useCallback((value: string) => {
    updateQueryInput(value);
    if (globalHeaderInputRef.current !== null) {
      globalHeaderInputRef.current.value = value;
    }
  }, []);

  const clearAll = useCallback(() => {
    teamsTableFiltersRef.current?.clearAllFilters();
    updateQueryInput('');
    if (globalHeaderInputRef.current !== null) {
      globalHeaderInputRef.current.value = '';
    }
  }, []);

  const tableFilters = useMemo((): JSX.Element => {
    return (<div className='flex flex-col pb-5 px-6 mobile:px-4 mobile:py-4'>
    <TeamsTableFilter
    setFilters={setFiltersObject}
    setPreFilters={setPreFiltersObject}
    filterResults={filterResults}
    ref={teamsTableFiltersRef}
    />
    <div className='flex justify-between'>
    <p className='text-lg font-semibold '>All Teams</p>
    <LatestSearch queryInput={latestSearchQuery}/>
    </div>
  </div>);
  }, [setFiltersObject, setPreFiltersObject, filterResults, latestSearchQuery]);

  const teamsTable = useMemo(() => {
    return <div className='flex-col responsive-height-table'>
    <Table
    key={upcomingPlayerMatches.size}
    handleGridReady={handleGridReady}
    rowData={teamsData}
    columnDefs={colDef}
    quickFilter={searchQuery}
    clearAllFilters={clearAll}
    preFilters={preFilters}
    filters={filters}
    setPreFiltersLength={setFiltersResults}
    pinnedColsId={['options']}
    />
    </div>;
  }, [upcomingPlayerMatches.size, handleGridReady, teamsData, colDef, searchQuery, clearAll, preFilters, filters, setFiltersResults]);

  const [isLoading, setIsloading] = useState(true);
  const globalHeaderInputRef = useRef<HTMLInputElement>(null);

  const onModalClose = (success?: boolean, id?: string, name?: string): void => {
    if (success === true && id !== '' && id !== undefined) {
      setTeamsData(produce((draft) => {
        const index = draft.findIndex(team => team.id === id);
        if (index !== -1) draft.splice(index, 1);
      }));
    }
    setDeleteTeamModal(false);
  };

  const setDeleteTeam = (data: Team): void => {
    setTeamToDelete(data);
    setDeleteTeamName(data.TeamName);
    setDeleteTeamID(data.id);
    setDeleteTeamVersion(data._version ?? 0);

    if (data.PhotoId !== undefined && data.PhotoId !== null && data.PhotoId !== '') {
      void imageCache.getImageWithCache(data.PhotoId).then((imageUrl) => {
        setModalTeamImage(imageUrl);
      });
    } else {
      setModalTeamImage('');
    }
    setTimeout(() => { setDeleteTeamModal(true); }, 20);
  };

  useEffect(() => {
    void listTeamsRequest(user.id).then((data) => {
      if (data === undefined) return;
      setTeamsData(() => { return data?.listTeams?.items; });
      setPlayers(() => { return data?.listContacts.items; });
      setFilterResults(data?.listTeams.items.length);
    }).finally(() => {
      setIsloading(false);
    });
  }, []);

  return (
    <>
    <MobileSearch reRenderFlag={reRenderMobileSearch} placeHolderText='Search Teams...'
  queryInput={updateQueryInput} gridApi={gridApi} filtersComponent={<TeamsTableFilter
    setFilters={setFiltersObject}
    setPreFilters={setPreFiltersObject}
    filterResults={filterResults}
    ref={teamsTableFiltersRef}
    renderType='mobile'
    mobileModalHtmlFor='mobileFilterModal'
     />}
  />
    <div className={`flex flex-col w-full ${teamsData.length === 0 ? 'h-full' : ''} bg-white p-6 pb-0 mobile:px-4 mobile:pt-2`}>
    <GlobalActionHeader
    queryInput={updateQueryInput} ref={globalHeaderInputRef} placeHolderText='Search Teams...'/>
    <DashboardLoading isLoading={isLoading}>
    <>
    {
      teamsData.length === 0 &&
      <EmptyStateDashboard
      navigateTo='/teams/create'
      buttonText={t('emptyStateButtonText')}
      header={user.role === '1' ? t('emptyStateheader') : t('emptyStateHeaderNonAdmin')}
      paragraph={user.role === '1' ? t('emptyStatepara') ?? '' : t('emptyStateParaNonAdmin') ?? ''}
      image={playerTeamsEmpty}/>
    }
    </>
    </DashboardLoading>
  </div>
  {
  teamsData.length !== 0 && <>
  {tableFilters}
  {teamsTable}
  <RemoveTeamsModal
      isOpen={deleteTeamModal}
      teamName={deleteTeamName}
      id={deleteTeamID}
      _version={deleteTeamVersion}
      onClose={onModalClose}
      image={modalTeamImage}
      team={teamToDelete}
      />
  </>
  }
    </>
  );
};
