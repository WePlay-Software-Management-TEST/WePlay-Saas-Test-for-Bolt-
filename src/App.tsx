import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getPlayerinformation } from 'features/player/player.service';
import { useTranslation } from 'react-i18next';
import { type CustomGetContactsQuery } from 'graphql/custom.queries';
import SignUp from './features/signup/signup';
import ScreenSizeWarning from 'core/components/misc/screenSizeWarning';
import Login from 'features/login/login';
import ForgotPassword from 'features/forgotpassword/forgotPassword';
import ChangePassord from 'features/forgotpassword/components/changePassword';
import Dashboard from 'features/dashboard/dashboard';
import ProtectedRoute from 'core/routeGuards/protectedRoute';
import PublicRoute from 'core/routeGuards/publicRoute';
import Player from 'features/player/Player';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import BreadCrumbs from 'core/components/breadcrumbs/breadCrumbs';
import PageNotFound from 'core/components/misc/pageNotFound';
import ViewPlayer from 'features/player/components/viewPlayer';
import { EditPlayer } from 'features/player/components/editPlayer';
import PlayerForm from 'features/player/components/playerForm';
import { LatestSearchProvider } from 'core/context/lastestSearchContext/latestSearchContext.provider';
import { Teams } from 'features/teams/teams';
import { TeamsForm } from 'features/teams/components/teamForm';
import { ViewTeam } from 'features/teams/components/viewTeam';
import { EditTeams } from 'features/teams/components/editTeams';
import { getTeamWithDeletedRequest } from 'features/teams/teams.service';
import { Tournament } from 'features/tournament/tournament';
import { TournamentForm } from 'features/tournament/components/tournamentForm';
import { Settings } from 'features/settings/settings';
import AuthorizedRoute from 'core/routeGuards/authorizedRoute';
import ViewTourney from 'features/tournament/components/viewTourney';
import { LeagueForm } from 'features/league/components/leagueForm';

/**
 * Main App component
 * @returns {JSX.Element}
 * @constructor
 */
function App (): JSX.Element {
  const { user } = useAuthContext();
  const { t } = useTranslation(['breadCrumbs', 'header', 'player']);
  // const imageCache = useImageCache();
  const router = createBrowserRouter([
    {
      path: 'signup',
      errorElement: <PageNotFound />,
      element:
        <PublicRoute user={user}>
          <SignUp />
        </PublicRoute>
    },
    {
      path: 'login',
      errorElement: <PageNotFound />,
      element:
        <PublicRoute user={user}>
          <Login />
        </PublicRoute>
    },
    {
      path: 'forgotpassword',
      element:
      <PublicRoute user={user}>
      <ForgotPassword />
      </PublicRoute>,
      errorElement: <PageNotFound />
    },
    {
      path: 'changepassword',
      element:
      <PublicRoute user={user}>
        <ChangePassord />
      </PublicRoute>,
      errorElement: <PageNotFound />
    },
    {
      path: '',
      errorElement: <PageNotFound />,
      element:
        <ProtectedRoute user={user}>
          <LatestSearchProvider>
            <Dashboard />
          </LatestSearchProvider>
        </ProtectedRoute>,
      children: [
        {
          path: '/player/edit/:id',
          element: <AuthorizedRoute id='/player/edit/:id'>
            <EditPlayer />
            </AuthorizedRoute>,
          loader: async ({ params }) => {
            return await getPlayerinformation(params.id ?? '').then(async (res) => {
              const contactInfo = res.data?.getContacts as CustomGetContactsQuery;
              return contactInfo;
            });
          },
          errorElement: <PageNotFound />,
          handle: {
            headerText: t('headerOptionPlayers', { ns: 'header' }),
            crumbs: (
              id?: string,
              routeName?: string
            ) => <BreadCrumbs
            links={
              [
                { path: '/player', name: 'All Profiles' },
                { path: `/player/${id ?? ''}`, name: routeName ?? '' },
                { path: '', name: 'Edit Profile' }
              ]
            } />
          }
        },
        {
          path: '/player/:id',
          element: <ViewPlayer />,
          loader: async ({ params }) => {
            return await getPlayerinformation(params.id ?? '').then(async (res) => {
              const contactInfo = res.data?.getContacts as CustomGetContactsQuery;
              return contactInfo;
            });
          },
          handle: {
            headerText: t('headerOptionPlayers', { ns: 'header' }),
            crumbs: (
              id?: string,
              routeName?: string
            ) => <BreadCrumbs
            links={
              [
                { path: '/player', name: 'All Profiles' },
                { path: `/player/${id ?? ''}`, name: routeName ?? '' }
              ]
            } />
          }
        },
        {
          index: true,
          path: '/player',
          element: <Player />,
          handle: {
            headerText: t('headerOptionPlayers', { ns: 'header' })
          }
        },
        {
          path: '/player/create',
          element: <AuthorizedRoute id='/player/create'><PlayerForm /></AuthorizedRoute>,
          handle: {
            headerText: t('headerOptionPlayers', { ns: 'header' }),
            crumbs: () => <BreadCrumbs
            links={
              [
                { path: '/player', name: t('allProfiles') },
                { path: 'player/create', name: t('createProfile') }
              ]
            }
            />
          }
        },
        {
          path: '/teams/:id',
          element: <ViewTeam />,
          loader: async ({ params }) => {
            return await getTeamWithDeletedRequest(params.id ?? '').then((res) => {
              return res?.getTeams;
            });
          },
          handle: {
            headerText: t('headerOptionTeams', { ns: 'header' }),
            crumbs: (
              id?: string,
              routeName?: string
            ) => <BreadCrumbs
            links={
              [
                { path: '/teams', name: 'All Teams' },
                { path: `/teams/${id ?? ''}`, name: routeName ?? '' }
              ]
            } />
          }
        },
        {
          path: '/teams',
          element: <Teams />,
          handle: {
            headerText: t('headerOptionTeams', { ns: 'header' })
          }
        },
        {
          path: '/teams/create',
          element: <AuthorizedRoute id='/teams/create'><TeamsForm /></AuthorizedRoute>,
          handle: {
            headerText: t('headerOptionTeams', { ns: 'header' }),
            crumbs: () => <BreadCrumbs
            links={
              [
                { path: '/teams', name: t('createTeamBreadcrumb', { ns: 'teams' }) }
              ]
            }
            />
          }
        },
        {
          path: '/teams/edit/:id',
          element: <AuthorizedRoute id='/teams/edit/:id'><EditTeams /></AuthorizedRoute>,
          loader: async ({ params }) => {
            return await getTeamWithDeletedRequest(params.id ?? '').then((res) => {
              return res?.getTeams;
            });
          },
          errorElement: <PageNotFound />,
          handle: {
            headerText: t('headerOptionTeams', { ns: 'header' }),
            crumbs: (
              id?: string,
              routeName?: string
            ) => <BreadCrumbs
            links={
              [
                { path: '/teams', name: 'All Teams' },
                { path: `/teams/${id ?? ''}`, name: routeName ?? '' },
                { path: '', name: 'Edit Team' }
              ]
            } />
          }
        },
        {
          index: true,
          path: '/tournament',
          element: <AuthorizedRoute id='/tournament'><Tournament /></AuthorizedRoute>,
          handle: {
            headerText: t('headerOptionTournament', { ns: 'header' })
          }
        },
        {
          index: true,
          id: 'tournamentCreate',
          path: '/tournament/create',
          element: <AuthorizedRoute id='/tournament/create'><TournamentForm /></AuthorizedRoute>,
          errorElement: <PageNotFound />,
          handle: {
            headerText: t('tournamentCreation', { ns: 'header' })
          }
        },
        {
          id: 'editTourney',
          path: '/tournament/edit/:id',
          element: <AuthorizedRoute id='/tournament/edit/:id'><TournamentForm /></AuthorizedRoute>,
          errorElement: <PageNotFound />,
          handle: {
            headerText: t('editTourney', { ns: 'header' })
          }
        },
        {
          id: 'viewTourney',
          path: '/tournament/:id',
          element: <AuthorizedRoute id='/tournament/:id'><ViewTourney /></AuthorizedRoute>,
          errorElement: <PageNotFound />,
          handle: {
            headerText: t('headerOptionTournament', { ns: 'header' }),
            crumbs: (
              id?: string,
              routeName?: string
            ) => <BreadCrumbs
            links={
              [
                { path: '/tournament', name: 'Games' },
                { path: '', name: 'Tournament Details' }
              ]
            } />
          }
        },
        {
          index: true,
          id: 'leagueCreate',
          path: '/league/create',
          element: <AuthorizedRoute id='/league/create'><LeagueForm /></AuthorizedRoute>,
          errorElement: <PageNotFound />,
          handle: {
            headerText: t('leagueCreation', { ns: 'header' })
          }
        },
        {
          path: '/settings',
          element: <AuthorizedRoute id='/settings'><Settings /></AuthorizedRoute>,
          errorElement: <PageNotFound />,
          handle: {
            headerText: t('headerOptionSettings', { ns: 'header' })
          }
        }
      ]
    },
    {
      path: '*',
      element:
      <PageNotFound />
    }
  ]);
  return (
    <>
      <RouterProvider router={router}/>
      <ScreenSizeWarning />
      <ToastContainer toastStyle={{
        fontFamily: 'Inter, Times New Roman, Serif',
        borderRadius: '8px'
      }}
      className={
        'mobile:!p-4 mobile:flex mobile:justify-center mobile:flex-col mobile:gap-4'}
      toastClassName={
        'w-[600px] ml-[80px] mobile:w-full mobile:ml-0'
      }
      />
    </>
  );
}

export default App;
