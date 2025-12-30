import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { type Team, type Contact } from 'graphql/table.models';
import { type GridApi, type ColDef, type GetRowIdParams, type GridReadyEvent } from 'ag-grid-community';
import { type FiltersTypes } from 'core/models/filters.model';
import { AllCapStrToReadableStr, getAgeFromDate } from 'core/utils/utils';
import { ProfileDetailsRenderer } from 'core/components/table/cellRenderers/ProfileDetailsRenderer';
import { listContactsRequest } from 'features/player/player.service';
import { useTranslation } from 'react-i18next';
import PlayerPlaceholder from 'assets/images/playerEmptyPhoto.png';
import GlobalActionHeader from 'core/layout/globalActionHeader';
import Table from 'core/components/table/table';
import DashboardLoading from 'core/layout/dashboardLoading';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import { MemorizedremoveProfileModal } from './components/removePlayerModal';
import { produce } from 'immer';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { PlayerTableFilters } from './components/playerTableFilters';
import { LatestSearch } from 'core/components/table/latestSearch';
import EmptyStateDashboard from 'features/shared/components/emptyStateDashboard';
import { OptionsCellRenderer } from 'core/components/table/cellRenderers/optionsCellRenderer';
import { type TableFiltersInterface } from 'core/components/table/table.models';
import { MobileSearch } from 'features/shared/components/mobileSearch';
import { debounce, isEqual } from 'lodash';
import AuthorizedRoute from 'core/routeGuards/authorizedRoute';

function Player (): JSX.Element {
  const imageCache = useImageCache();
  const { user } = useAuthContext();
  const [isLoading, setIsloading] = useState(true);
  const [deletePlayerModal, setDeletePlayerModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteProfileName, setdeleteProfileName] = useState('');
  const [deleteProfileId, setdeleteProfileId] = useState('');
  const [deleteProfileVersion, setdeleteProfileVersion] = useState<number>(0);
  const [playerData, setPlayerData] = useState<Contact[]>([]);
  const [modalProfileImage, setModalProfileImage] = useState('');
  const [filters, setFilters] = useState<FiltersTypes | null>(null);
  const [preFilters, setPreFilters] = useState<FiltersTypes | null>(null);
  const [filterResults, setFilterResults] = useState(0);
  const playerTableFiltersRef = useRef<TableFiltersInterface>(null);
  const globalHeaderInputRef = useRef<HTMLInputElement>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [reRenderMobileSearch, setReRenderMobileSearch] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);

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

  const setFiltersObject = useCallback((filter: FiltersTypes) => {
    setFilters(() => filter);
  }, []);
  const setPreFiltersObject = useCallback((filter: FiltersTypes) => {
    setPreFilters(() => filter);
  }, []);

  const setFiltersResults = useCallback((length: number) => {
    setFilterResults(length);
  }, []);

  const setdeleteProfile = (data: Contact): void => {
    setdeleteProfileName(`${data.FirstName} ${data.LastName ?? ''}`);
    setdeleteProfileId(data.id);
    setdeleteProfileVersion(data._version ?? 0);

    if (data.PhotoId !== undefined && data.PhotoId !== null && data.PhotoId !== '') {
      void imageCache.getImageWithCache(data.PhotoId).then((imageUrl) => {
        setModalProfileImage(imageUrl);
      });
    } else {
      setModalProfileImage('');
    }
    setTimeout(() => { setDeletePlayerModal(true); }, 20);
  };

  const onModalClose = (success?: boolean, id?: string, name?: string): void => {
    if (success === true && id !== '' && id !== undefined) {
      setPlayerData(produce((draft) => {
        const index = draft.findIndex(contact => contact.id === id);
        if (index !== -1) draft.splice(index, 1);
      }));
    }
    setDeletePlayerModal(false);
  };
  const colDef = useMemo<Array<ColDef<Contact>>>(() => {
    return [
      {
        headerName: 'Name',
        sort: 'asc',
        cellRenderer: ({ data }: GetRowIdParams<Contact>) => {
          return <ProfileDetailsRenderer
            paragraph={`${data?.FirstName ?? ''} ${data?.LastName ?? ''}`}
            imageId={data.PhotoId ?? ''} navLink={`${data.id}`}
          />;
        },
        valueGetter: ({ data }) => {
          return `${data?.FirstName ?? ''} ${data?.LastName ?? ''}`;
        },
        minWidth: 200
      },
      {
        headerName: 'Team',
        valueGetter: ({ data }) => {
          const playerTeams = teams?.filter((team) => {
            const inTeam = team.TeamPlayers?.items.find((teamPlayer) => teamPlayer?.contactsID === data?.id);
            if (inTeam !== undefined && inTeam !== null) {
              return true;
            }
            return false;
          })?.map((team) => team.TeamName) ?? [];
          return playerTeams.join(', ');
        }
      },
      {
        headerName: 'Role',
        colId: 'role',
        hide: true,
        valueGetter: ({ data }) => {
          return 'Captain';
        }
      },
      {
        headerName: 'Experience Level',
        colId: 'experience',
        valueGetter: ({ data }) => {
          return AllCapStrToReadableStr(data?.PlayerSoccerSkills?.ExperienceLevel ?? '-');
        }
      },
      {
        headerName: 'Position',
        colId: 'position',
        valueGetter: ({ data }) => {
          return AllCapStrToReadableStr(data?.PlayerSoccerSkills?.PlayerPositions?.items[0]?.Position ?? '-');
        }
      },
      {
        field: 'Gender',
        colId: 'gender',
        valueGetter: ({ data }) => {
          return AllCapStrToReadableStr(data?.Gender);
        }
      },
      {
        headerName: 'Age',
        colId: 'age',
        filter: 'agNumberColumnFilter',
        valueGetter: (params) => {
          return Number(getAgeFromDate(new Date(params.data?.Birthdate ?? '')));
        }
      },
      {
        headerName: 'Options',
        sortable: false,
        colId: 'options',
        hide: user?.role !== '1',
        cellClass: 'toolTip-cell-aggrid',
        cellRenderer: ({ data }: GetRowIdParams<Contact>) => {
          return <AuthorizedRoute type='authComps' id='player.options'>
            <OptionsCellRenderer id={data.id} onDelete={() => { setdeleteProfile(data); }}/>
            </AuthorizedRoute>;
        }
      },
      {
        headerName: 'Weight',
        field: 'Weight',
        colId: 'weight',
        hide: true,
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: 'Height',
        field: 'Height',
        colId: 'height',
        hide: true,
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: 'state',
        colId: 'state',
        sortable: false,
        hide: true,
        valueGetter: ({ data }) => {
          return data?.ContactAddresses?.items[0]?.State;
        }
      },
      {
        headerName: 'city',
        colId: 'city',
        sortable: false,
        hide: true,
        valueGetter: ({ data }) => {
          return `${data?.ContactAddresses?.items[0]?.City ?? ''}, ${data?.ContactAddresses?.items[0]?.State ?? ''}`;
        }
      }
    ];
  }, [teams]);

  const updateQueryInput = useCallback((event: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof event === 'string') {
      setSearchQuery(event);
      return;
    };

    setSearchQuery(event.target.value);
  }, []);

  useEffect(() => {
    if (playerData.length === 0) {
      void listContactsRequest(user.attributes.sub).then((res) => {
        const data = res?.listContacts?.items as Contact[];
        const teams = res?.listTeams?.items as Team[];
        setTeams(teams);
        setPlayerData(data);
        setFilterResults(data.length);
      }).catch((err) => {
        console.log(err);
        setPlayerData([]);
      })
        .finally(() => {
          setIsloading(false);
        });
    };
  }, []);

  const { t } = useTranslation(['player']);

  const latestSearchQuery = useCallback((value: string) => {
    updateQueryInput(value);
    if (globalHeaderInputRef.current !== null) {
      globalHeaderInputRef.current.value = value;
    }
  }, []);
  const tableFilters = useMemo((): JSX.Element => {
    return (<div className='flex flex-col px-6 mobile:px-4 mobile:py-4'>
    <PlayerTableFilters
    setFilters={setFiltersObject}
    setPreFilters={setPreFiltersObject}
    filterResults={filterResults}
    ref={playerTableFiltersRef}
    />
    <div className='flex justify-between mb-5'>
    <p className='text-lg font-semibold '>All Profiles</p>
    <LatestSearch queryInput={latestSearchQuery}/>
    </div>
  </div>);
  }, [filters, preFilters, filterResults]);

  const clearAll = useCallback(() => {
    playerTableFiltersRef.current?.clearAllFilters();
    updateQueryInput('');
    if (globalHeaderInputRef.current !== null) {
      globalHeaderInputRef.current.value = '';
    }
  }, []);

  const playerTable = useMemo(() => {
    return <div className='flex-col responsive-height-table'>
      <Table
      handleGridReady={handleGridReady}
      preFilters={preFilters}
      setPreFiltersLength={setFiltersResults}
      filters={filters}
      rowData={playerData}
      columnDefs={colDef}
      quickFilter={searchQuery}
      clearAllFilters={clearAll}
      pinnedColsId={['options']}/>
      </div>;
  }, [searchQuery, playerData, filters, preFilters, filterResults]);

  return (
  <>
  <MobileSearch reRenderFlag={reRenderMobileSearch} placeHolderText='Search Players...'
  queryInput={updateQueryInput} gridApi={gridApi}
  filtersComponent={<PlayerTableFilters
    setFilters={setFiltersObject}
    setPreFilters={setPreFiltersObject}
    filterResults={filterResults}
    ref={playerTableFiltersRef}
    mobileModalHtmlFor='mobileFilterModal'
    renderType='mobile'
    />}
  />
  <div className={`flex flex-col w-full ${playerData.length === 0 ? 'h-full' : ''} bg-white p-6 mobile:px-4 mobile:pt-2 pb-0`}>
    <GlobalActionHeader queryInput={updateQueryInput} ref={globalHeaderInputRef} />
    <DashboardLoading isLoading={isLoading}>
    <>
    {
      playerData.length === 0 &&
      <div className='flex w-full h-full justify-center items-center'>
        <EmptyStateDashboard
      navigateTo='/player/create'
      buttonText={t('createNewPlayerButton')}
      header={user.role === '1' ? t('header') : t('headerNonAdmin')}
      paragraph={t('paragraph1') ?? ''}
      optionalPara={user.role === '1' ? t('paragraph2') ?? '' : t('paragraphNonAdmin2') ?? ''}
      image={PlayerPlaceholder}/>
      </div>
    }
    </>
    </DashboardLoading>
    <MemorizedremoveProfileModal
    isOpen={deletePlayerModal}
    profileName={deleteProfileName}
    _version={deleteProfileVersion}
    id={deleteProfileId}
    onClose={onModalClose}
    image={modalProfileImage}
    />
  </div>
  {
  playerData.length !== 0 && <>
  {tableFilters}
  {playerTable}
  </>
  }
  </>
  );
};

export default Player;
