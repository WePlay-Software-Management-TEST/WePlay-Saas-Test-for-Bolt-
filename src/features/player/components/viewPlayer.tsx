import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useMatches, useLoaderData } from 'react-router';
import { AllCapStrToReadableStr, getAgeFromDate, cmToFtInches } from 'core/utils/utils';
import { type CustomUseMataches } from 'core/models/breadcrumbs.model';
import { type CustomGetContactsQuery } from 'graphql/custom.queries';
import { type InfoCardProps } from '../player.model';
import { type TeamPlayers } from 'API';
import { type Team } from 'graphql/table.models';
import { type ICellRendererParams, type ColDef, type GetRowIdParams } from 'ag-grid-community';
import { MemorizedInfoCard } from '../../../core/layout/infoCard';
import { useTranslation } from 'react-i18next';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { OptionsCellRenderer } from 'core/components/table/cellRenderers/optionsCellRenderer';
import { ProfileDetailsRenderer } from 'core/components/table/cellRenderers/ProfileDetailsRenderer';
import { RemoveTeamPlayerModal } from 'features/teams/components/removeTeamPlayerModal';
import { listTeamsRequest, addTeamPlayers } from 'features/teams/teams.service';
import { produce } from 'immer';
import { SkeletonMobileOverlay } from 'features/shared/components/skeletonMobileOverlay';
import playerTeamsEmpty from 'assets/images/emptyTeamsPlayer.png';
import DropdownButton from 'core/components/button/dropdownButton';
import Loader from 'assets/images/loader.gif';
import DashboardLoading from 'core/layout/dashboardLoading';
import Table from 'core/components/table/table';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import { TeamDropdown } from './teamsDropDown';
import { type TeamsOptions, type AutoCompletePlayers, type Option } from 'core/models/input.model';
import { toastService } from 'core/services/toast.service';
import AuthorizedRoute from 'core/routeGuards/authorizedRoute';
import useUpcomingGames from 'features/teams/hooks/fetchUpcomingGames.hook';
import UpcomingPlayerMatchRenderer from 'core/components/table/cellRenderers/UpcomingPlayerMatchRenderer';

/**
 * @component View Player Screen, shows Player information with each Team associated with that Player.
 * @returns { JSX.Element }
 */
function ViewPlayer (): JSX.Element {
  const matches: CustomUseMataches[] = useMatches() as CustomUseMataches[];
  const [imgUrl, setImageUrl] = useState(Loader);
  const { user } = useAuthContext();
  const imageCache = useImageCache();
  const playerInformation = useLoaderData() as CustomGetContactsQuery;
  const [isCaptainExist, setCaptainExist] = useState(false);
  const [teamsOptionsData, setTeamsOptionsData] = useState<Array<Option<TeamsOptions>>>([]);
  const { t } = useTranslation(['player', 'toast', 'teams']);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [deleteTeamModal, setDeleteTeamModal] = useState(false);
  const [deleteTeamName, setDeleteTeamName] = useState('');
  const [deleteTeamPlayerID, setDeleteTeamPlayerID] = useState('');
  const [deleteTeamPlayerVersion, setDeleteTeamPlayerVersion] = useState<number>(0);
  const [modalTeamImage, setModalTeamImage] = useState('');
  const [removeToastMsg, setRemoveToastMsg] = useState('');
  const [allTeams, setAllteams] = useState<Team[]>([]);

  const playerTeamIds = useMemo(
    () => playerInformation?.TeamPlayers?.items.map(tp => tp?.teamsID).filter(
      (id): id is string => typeof id === 'string'),
    [playerInformation]);

  const upcomingPlayerMatches = useUpcomingGames(playerTeamIds);

  const addPlayerButton = useCallback(
    async (contactsId?: string, teamId?: string, isCaptain?: boolean, label?: string): Promise<void> => {
      await addTeamPlayers(playerInformation.id, teamId, isCaptain)
        .then((res) => {
          const matchedTeam = allTeams.find((team) => (team.id === res?.createTeamPlayers?.teamsID));
          if (matchedTeam === undefined) { console.error('No Matched Team found!'); return; };
          const updatedMatch = {
            ...matchedTeam,
            isPlayerCaptain: isCaptain,
            versionTeamPlayer: res?.createTeamPlayers?._version,
            TeamPlayerID: res?.createTeamPlayers?.id
          };
          setTeams(produce((teamDraft) => {
            teamDraft.push(updatedMatch);
          }));

          setTeamsOptionsData(produce((teamsOptionsDraft) => {
            const matchTeamOption = teamsOptionsDraft.find((option) => (option.value === matchedTeam.id));
            if (matchTeamOption === undefined) return;
            if (matchTeamOption.extraData === undefined) return;
            matchTeamOption.extraData.inTeam = true;
            matchTeamOption.extraData.isCaptain = res?.createTeamPlayers?.IsCaptain;
            matchTeamOption.extraData.version = res?.createTeamPlayers?._version;
            if (res?.createTeamPlayers?.IsCaptain === true) {
              setCaptainExist(res?.createTeamPlayers?.IsCaptain ?? false);
            }
          }));

          if (isCaptain === true) {
            toastService(`${playerInformation.FirstName} ${playerInformation.LastName ?? ''} Has been added as a captain for ${matchedTeam.TeamName}`, 'secondary');
          } else {
            toastService(`${playerInformation.FirstName} ${playerInformation.LastName ?? ''} Has been added as a player for ${matchedTeam.TeamName}`, 'secondary');
          }
        }).catch((err) => {
          console.error(err);
        });
    }, [teams, playerInformation]);

  useEffect(() => {
    void imageCache.getImageWithCache(playerInformation?.PhotoId ?? '').then((blobUrl) => {
      setImageUrl(blobUrl);
      setModalTeamImage(blobUrl);
    }).catch(() => {
      setImageUrl('');
    });
    void listTeamsRequest(user.id).then((response) => {
      const filteredTeams: Team[] = [];
      const teamsOptions: Array<Option<TeamsOptions>> = [];
      setAllteams(response?.listTeams.items ?? []);
      response?.listTeams.items.filter((team) => {
        let captian = false;
        const teamPlayer: TeamPlayers | undefined | null = team.TeamPlayers?.items.find((teamPlayer) => {
          if (teamPlayer?.IsCaptain === true) {
            captian = true;
          };
          return teamPlayer?.contactsID === playerInformation.id && teamPlayer.teamsID === team.id;
        });

        const teamOption: Option<TeamsOptions> = {
          value: team.id,
          label: team.TeamName,
          extraData: {
            imageId: team.PhotoId ?? '',
            city: team.City ?? '',
            state: team.State ?? '',
            isCaptain: teamPlayer?.IsCaptain ?? false,
            inTeam: teamPlayer !== undefined,
            isCaptainInTeam: captian
          }
        };
        teamsOptions.push(teamOption);
        if (teamPlayer === undefined || teamPlayer === null) return false;
        const newTeam: Team = {
          ...team,
          isPlayerCaptain: teamPlayer?.IsCaptain,
          versionTeamPlayer: teamPlayer?._version,
          TeamPlayerID: teamPlayer?.id
        };
        filteredTeams.push(newTeam);
        return newTeam;
      });
      setTeams(filteredTeams ?? []);
      setTeamsOptionsData(teamsOptions ?? []);
      setIsloading(false);
    });
  }, []);

  const teamsDropdownProps: AutoCompletePlayers = {
    cyData: 'cypressAutoComplete',
    options: teamsOptionsData,
    addPlayerButton,
    isCaptainInTeam: isCaptainExist,
    menuPlacement: 'bottom'
  };

  const onDelete = (data: Team): void => {
    setDeleteTeamPlayerID(data.TeamPlayerID ?? '');
    setDeleteTeamName(data.TeamName);
    setDeleteTeamPlayerVersion(data.versionTeamPlayer ?? 1);

    setRemoveToastMsg(`
    ${playerInformation.FirstName} ${playerInformation.LastName ?? ''} ${t('removeTeamPlayerRoster')} ${data.TeamName}
    `);
    setTimeout(() => { setDeleteTeamModal(true); }, 20);
  };

  const onDeleteModalClose = (success?: boolean, id?: string, name?: string): void => {
    if (success === true && id !== '' && id !== undefined) {
      setTeams(produce((draft) => {
        const index = draft.findIndex(team => team.id === id);
        if (index !== -1) draft.splice(index, 1);
      }));
      setTeamsOptionsData(produce((draft) => {
        const option = draft.find(teamOption => teamOption.value === id);
        if (option === undefined) return;
        if (option.extraData === undefined) return;
        option.extraData.inTeam = false;
        option.extraData.isCaptain = false;
        option.extraData.isCaptainInTeam = false;
      }));
    }
    setTimeout(() => { setDeleteTeamModal(false); }, 20);
  };

  const colDef = useMemo<Array<ColDef<Team>>>(() => {
    return [
      {
        headerName: 'Team Name',
        sort: 'asc',
        cellRenderer: ({ data }: GetRowIdParams<Team>) => {
          return <ProfileDetailsRenderer
            paragraph={data.TeamName}
            imageId={data.PhotoId ?? ''} navLink={`/teams/${data.id}`}
          />;
        },
        valueGetter: ({ data }) => {
          return data?.TeamName;
        },
        minWidth: 200
      },
      {
        headerName: 'Team Role',
        colId: 'role',
        valueGetter: ({ data }) => {
          if (data?.isPlayerCaptain as boolean) return 'Captain';
          return 'Player';
        }
      },
      {
        headerName: 'Upcoming Match',
        cellRenderer: (params: ICellRendererParams<Team>) =>
          <UpcomingPlayerMatchRenderer data={params.data} upcomingMatches={upcomingPlayerMatches} />
      },
      {
        headerName: 'Team Wins'
      },
      {
        headerName: 'Options',
        sortable: false,
        colId: 'options',
        hide: user?.role !== '1',
        cellClass: 'toolTip-cell-aggrid',
        cellRenderer: ({ data }: GetRowIdParams<Team>) => {
          return <AuthorizedRoute type='authComps' id='player.options'><OptionsCellRenderer id={data.id} hideButton='edit' onDelete={() => { onDelete(data); }} /></AuthorizedRoute>;
        }
      }
    ];
  }, [upcomingPlayerMatches]);

  const playerDetails: InfoCardProps = {
    image: imgUrl ?? '',
    modalID: 'AddToTeamModal',
    id: playerInformation.id,
    textHeader: `${playerInformation.FirstName} ${playerInformation.LastName ?? ''}`,
    bio: playerInformation.Biography ?? '',
    editButtonText: 'Edit Profile',
    editButtonOnClickNavigate: '/player/edit/',
    dropdownText: t('addToTeamsButton', { ns: 'teams' }) ?? '',
    otherProps: {
      state: playerInformation.ContactAddresses?.items[0]?.State ?? '',
      city: playerInformation.ContactAddresses?.items[0]?.City ?? '',
      age: getAgeFromDate(playerInformation.Birthdate),
      weight: `${playerInformation.Weight ?? ''}`,
      height: cmToFtInches(Number(playerInformation.Height)),
      preferredPosition: AllCapStrToReadableStr(
        playerInformation.PlayerSoccerSkills?.PlayerPositions?.items[0]?.Position
      ),
      skillLevel: AllCapStrToReadableStr(playerInformation.PlayerSoccerSkills?.ExperienceLevel)
    },
    otherPropsHeaders: {
      state: 'State',
      city: 'City',
      age: 'Age',
      weight: 'Weight',
      height: 'Height',
      preferredPosition: 'Preferred Position',
      skillLevel: 'Skill Level'
    },
    children: <TeamDropdown {...teamsDropdownProps} />
  };

  const breadCrumbs = useMemo((): JSX.Element => {
    if (matches[1].handle.crumbs === undefined) {
      return <></>;
    }

    return matches[1].handle.crumbs(playerInformation.id, playerDetails.textHeader);
  }, [matches]);

  return (<div className='flex flex-col h-full w-full items-center'>
    <div className='w-full py-4 px-6 border-grey-90 border-b mobile:px-4 mobile:py-2 '>
      {breadCrumbs}
    </div>
    <MemorizedInfoCard {...playerDetails} />
    <div className='flex flex-col pt-6 items-center h-full w-full'>
      <DashboardLoading isLoading={isLoading} className='!h-full'>
        {
          teams.length === 0
            ? <>
              <img
                src={playerTeamsEmpty}
                className='
                mobile:pt-2 mobile:h-[220px] mobile:w-[280px] mobile:pb-4
                pt-4 scale-125 w-auto h-auto
                average:h-[280px] tall:w-auto tall:h-auto short:w-auto
                short:h-[200px]' />
              <h3 className='text-grey-10 font-normal mobile:text-2xl mobile:pb-4'>
                {user.role === '1'
                  ? t('addToTeamsButton', { ns: 'teams' })
                  : t('noTeamsNonAdmin', { ns: 'teams' })}
              </h3>
              <p data-cy='emptyTeamsParagraph' className='body-md-text text-grey-10 mobile:text-xs
            font-normal mobile:text-center mobile:px-4'>
                {`${user.role === '1' ? t('playerNoteamsPara1') : ''} ${playerDetails.textHeader} ${user.role === '1' ? t('playerNoteamsPara2') : t('playerNoTeamsPara2NonAdmin')}`}
              </p>
              <div className='w-[400px] mobile:w-[328px] mobile:pt-6 tall:pt-6 average:pt-3 short:pt-1'>
                <AuthorizedRoute id='player.create' type='authComps'>
                  <>
                    <DropdownButton
                      buttonText={t('addToTeamsButton', { ns: 'teams' })}
                      cyData='addToTeamButton'
                      dropDownType='primary'
                      menuPosition='dropdown-top'
                      className='w-full mobile:hidden'
                      menuClassname='!mb-2 w-full'
                      dropDownSize='large'>
                        <TeamDropdown {...teamsDropdownProps} menuPlacement='top' />
                    </DropdownButton>
                    <label
                      htmlFor='AddToTeamModal'
                      className='normal-case hidden mobile:flex
                      btn
                      btn-active
                      btn-primary
                      rounded-lg
                      w-auto
                      body-sm-text
                      text-white
                      shadow-primary
                      hover:shadow-primary-hover
                      hover:border-[#7B66FF]
                      hover:bg-[#7B66FF]'>{t('addToTeamsButton', { ns: 'teams' })}
                    </label>
                  </>
                </AuthorizedRoute>
              </div>
            </>
            : <div className={`
            flex-col 
            w-full self-start
            min-h-[250px] 
            ${teams.length > 15 ? 'responsive-half-height-table' : '!h-full'}`}>
              <div className='flex !item-start pb-4 w-full pl-6'>
                <p className='font-semibold text-[18px] mobile:text-[16px] mobile:font-medium leading-5 text-grey-20'>
                  {`${playerInformation.FirstName}${t('teamsJoinedHeader', { ns: 'player' })}`}
                </p>
              </div>
              <Table rowData={teams}
                columnDefs={colDef}
                pinnedColsId={['options']}
                key={Array.from(upcomingPlayerMatches).length}
              />
            </div>
        }
      </DashboardLoading>
    </div>
    <RemoveTeamPlayerModal
      playerName={`${playerInformation.FirstName} ${playerInformation.LastName ?? ''}`}
      isOpen={deleteTeamModal}
      id={deleteTeamPlayerID}
      image={modalTeamImage}
      _version={deleteTeamPlayerVersion}
      teamName={deleteTeamName}
      onClose={onDeleteModalClose}
      returnOnSuccessID='team'
      toastMsg={removeToastMsg}
    />

    <SkeletonMobileOverlay modalID='AddToTeamModal'>
      <TeamDropdown {...teamsDropdownProps} />
    </SkeletonMobileOverlay>
  </div>);
};

export default ViewPlayer;
