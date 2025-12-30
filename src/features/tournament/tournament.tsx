import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MobileSearch } from 'features/shared/components/mobileSearch';
import GlobalActionHeader from 'core/layout/globalActionHeader';
import DashboardLoading from 'core/layout/dashboardLoading';
import EmptyStateDashboard from 'features/shared/components/emptyStateDashboard';
import { useTranslation } from 'react-i18next';
import { ReactComponent as TourneyEmpty } from 'assets/images/tourneyEmptyImg.svg';
import { ReactComponent as LeagueEmpty } from 'assets/images/leagueEmptyImg.svg';
import { listAllTournaments } from './tournament.service';
import { type Tournaments } from 'API';
import Table from 'core/components/table/table';
import { type ColDef, type GetRowIdParams } from 'ag-grid-community';
import { ProfileDetailsRenderer } from 'core/components/table/cellRenderers/ProfileDetailsRenderer';
import AuthorizedRoute from 'core/routeGuards/authorizedRoute';
import { OptionsCellRenderer } from 'core/components/table/cellRenderers/optionsCellRenderer';
import { tournamentRulesMap } from './models/tournament.const';
import { formatDate } from 'core/utils/utils';
import useAuthContext from 'core/context/userContext/userContext.consumer';

/**
 * Function component representing the Tournament page with all the steps.
 *
 * This component renders the Tournament page, including a MobileSearch component and a GlobalActionHeader component.
 * It manages state for re-rendering the MobileSearch component, tournament data, and loading state.
 *
 * @returns JSX.Element
 */
export function Tournament (): JSX.Element {
  const [reRenderMobileSearch, setRenderMobileSearchFlag] = useState(false);
  const [tourData, setTourData] = useState<Tournaments[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const { t: translate } = useTranslation(['tournament']);
  const globalHeaderInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthContext();

  const updateQueryInput = (event: React.ChangeEvent<HTMLInputElement> | string): void => {
    if (typeof event === 'string') {
      setSearchQuery(event);
      return;
    };

    setSearchQuery(event.target.value);
  };

  const colDef = useMemo<Array<ColDef<Tournaments>>>(() => {
    const startDateRuleID = tournamentRulesMap.get('startDate');
    const startTimeRuleID = tournamentRulesMap.get('startTime');
    const endTimeRuleID = tournamentRulesMap.get('endTime');
    return [
      {
        headerName: 'Tournament Name',
        sort: 'asc',
        cellRenderer: ({ data }: GetRowIdParams<Tournaments>) => {
          return <ProfileDetailsRenderer
            paragraph={data.tournamentName}
            imageId={data.tournamentImageId ?? ''} navLink={`/tournament/${data.id}`}
          />;
        },
        valueGetter: ({ data }) => {
          return data?.tournamentName;
        },
        minWidth: 200
      },
      {
        headerName: 'Start Date',
        valueGetter: ({ data }) => {
          const ruleVariables = (data?.TournamentRulesVariables?.items ?? []).find((variable) => variable?.ruleID === startDateRuleID)?.ruleVariables;
          if (ruleVariables === undefined) {
            return '';
          }
          const startDate = new Date(JSON.parse(ruleVariables ?? '').startDate);
          return formatDate(startDate, { year: 'numeric', month: 'short', day: 'numeric' });
        }
      },
      {
        headerName: 'Game Time Range',
        colId: 'gameTimeRange',
        valueGetter: ({ data }) => {
          const startTime = (data?.TournamentRulesVariables?.items ?? []).find((variable) => variable?.ruleID === startTimeRuleID)?.ruleVariables;
          const endTime = (data?.TournamentRulesVariables?.items ?? []).find((variable) => variable?.ruleID === endTimeRuleID)?.ruleVariables;
          if (startTime === undefined || endTime === undefined) {
            return '';
          }
          const [startHour, startMins] = JSON.parse(startTime ?? '').startTime.split(':');
          const parsedStartTime = new Date(new Date().setHours(startHour, startMins));
          const [endHours, endMins] = JSON.parse(endTime ?? '').endTime.split(':');
          const parsedEndTime = new Date(new Date().setHours(endHours, endMins));

          return `${parsedStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${parsedEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        }
      },
      {
        headerName: 'Options',
        sortable: false,
        colId: 'options',
        hide: user?.role !== '1',
        cellClass: 'toolTip-cell-aggrid',
        cellRenderer: ({ data }: GetRowIdParams<Tournaments>) => {
          return <AuthorizedRoute type='authComps' id='tourney.options'>
            <OptionsCellRenderer id={data.id} hideButton='delete' onDelete={() => {}} editTipText='Edit tourney' />
            </AuthorizedRoute>;
        }
      }
    ];
  }, []);

  useEffect(() => {
    if (tourData.length === 0) {
      void listAllTournaments().then((res) => {
        setTourData(res ?? []);
        setRenderMobileSearchFlag(false);
        setIsloading(false);
      });
    }
  }, []);

  const RenderEmptyState = (): JSX.Element => (<div className="flex md:flex-row xs:flex-col h-full items-center gap-8 justify-center">
      <EmptyStateDashboard
        navigateTo={'/tournament/create'}
        header={translate('emptyState.tournament.title')}
        buttonText={translate('emptyState.tournament.button')}
        image={<TourneyEmpty className='xs:w-[216px] xs:h-[216px] md:h-auto md:w-auto'/>}/>
      <div className="md:h-full xs:w-full md:w-[2px] xs:h-[2px] bg-gray-90 border-[2px] border-grey-90 mb-2"></div>
        <EmptyStateDashboard
          navigateTo={'/league/create'}
          header={translate('emptyState.league.title')}
          buttonText={translate('emptyState.league.button')}
          image={<LeagueEmpty className='xs:w-[216px] xs:h-[216px] md:h-auto md:w-auto'/>}/>
    </div>);
  return (
    <>
    <MobileSearch reRenderFlag={reRenderMobileSearch} placeHolderText={translate('form.searchPlaceHolder') ?? ''}
  queryInput={updateQueryInput} gridApi={null}
  />
    <div className={`flex flex-col w-full ${tourData.length === 0 ? 'h-full' : ''} bg-white p-6 pb-0 mobile:px-4 mobile:pt-2`}>
    <GlobalActionHeader
    queryInput={updateQueryInput} ref={globalHeaderInputRef} placeHolderText={translate('form.searchPlaceHolder') ?? ''}/>
    <DashboardLoading isLoading={isLoading}>
    <>
    { tourData.length === 0 && <RenderEmptyState />}
    { tourData.length !== 0 && <div className='flex-col responsive-height-table -mx-6 mobile:-mx-4 pt-6 mobile:pt-2'>
        <Table
        rowData={tourData}
        columnDefs={colDef}
        quickFilter={searchQuery}
        pinnedColsId={['options']}/>
      </div>}
    </>
    </DashboardLoading>
  </div>
    </>
  );
};
