import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DropdownButton from 'core/components/button/dropdownButton';
import Loader from 'assets/images/loader.gif';
import PlayerPlaceholder from 'assets/images/playerEmptyPhoto.png';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import DashboardLoading from 'core/layout/dashboardLoading';
import Table from 'core/components/table/table';
import { useMatches, useLoaderData } from 'react-router';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { MemorizedInfoCard } from 'core/layout/infoCard';
import { useTranslation } from 'react-i18next';
import { TeamPlayersDropdown } from './teamPlayersDropdown';
import { OptionsCellRenderer } from 'core/components/table/cellRenderers/optionsCellRenderer';
import { ProfileDetailsRenderer } from 'core/components/table/cellRenderers/ProfileDetailsRenderer';
import { AllCapStrToReadableStr, cmToFtInches, getAgeFromDate, setImperialLabels } from 'core/utils/utils';
import { addTeamPlayers, listContactsWithTeamPlayers } from '../teams.service';
import { produce } from 'immer';
import { RemoveTeamPlayerModal } from './removeTeamPlayerModal';
import { toastService } from 'core/services/toast.service';
import { type TeamPlayers, type Teams } from 'API';
import { type InfoCardProps } from 'features/player/player.model';
import { type Option, type AutoCompletePlayers, type PlayersOptions } from 'core/models/input.model';
import { type Contact } from 'graphql/table.models';
import { type ColDef, type GetRowIdParams } from 'ag-grid-community';
import { type CustomUseMataches } from 'core/models/breadcrumbs.model';
import { SkeletonMobileOverlay } from 'features/shared/components/skeletonMobileOverlay';
import AuthorizedRoute from 'core/routeGuards/authorizedRoute';
import { useTeamStatus } from '../hooks/useTeamStatus.hook';

/**
 * @component View Team Screen, shows Team information with each player associated with that team.
 * @returns { JSX.Element }
 */
export function ViewTeam (): JSX.Element {
  const matches: CustomUseMataches[] = useMatches() as CustomUseMataches[];
  const [imgUrl, setImageUrl] = useState(Loader);
  const { user } = useAuthContext();
  const imageCache = useImageCache();
  const teamInformation = useLoaderData() as Teams;
  const { t } = useTranslation(['teams']);
  const [playerData, setPlayerData] = useState<Array<Option<PlayersOptions>>>([]);
  const [isLoading, setIsloading] = useState(true);
  const [players, setPlayers] = useState<Contact[]>([]);
  const [deleteTeamPlayerModal, setDeleteTeamPlayerModal] = useState(false);
  const [deleteTeamPlayerName, setDeleteTeamPlayerName] = useState('');
  const [deleteTeamPlayerID, setDeleteTeamPlayerID] = useState('');
  const [deleteTeamPlayerVersion, setDeleteTeamPlayerVersion] = useState<number>(0);
  const [modalTeamPlayerImage, setModalTeamPlayerImage] = useState('');
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [isCaptainExist, setCaptainExist] = useState(false);
  const [allTeamPlayers, setAllTeamPlayers] = useState<TeamPlayers[]>([]);
  const { isActive, loading: statusLoading } = useTeamStatus(teamInformation.id);
  const gameStatus = isActive ? t('teamStatusActive') : t('teamStatusInActive');

  const addPlayerButton = useCallback(async (contactsId?: string, teamId?: string, isCaptain?: boolean, label?: string): Promise<void> => {
    await addTeamPlayers(contactsId, teamId, isCaptain)
      .then((res) => {
        const matchedContact = allContacts.find((contact) => (contact.id === res?.createTeamPlayers?.contactsID));
        if (matchedContact === undefined) return;
        const numOfTeams = allTeamPlayers.filter((teamPlayer) => (teamPlayer.contactsID === matchedContact.id));
        const updatedMatch = {
          ...matchedContact,
          isCaptain,
          teamsAssociated: numOfTeams.length + 1
        };
        setPlayers(produce((playerDraft) => {
          playerDraft.push(updatedMatch);
        }));
        teamInformation.TeamPlayers?.items.push(res?.createTeamPlayers as TeamPlayers);
        setPlayerData(produce((playerOptionsDraft) => {
          const matchPlayerOption = playerOptionsDraft.find((option) => (option.value === matchedContact.id));
          if (matchPlayerOption === undefined) return;
          if (matchPlayerOption.extraData === undefined) return;
          matchPlayerOption.extraData.inTeam = true;
          matchPlayerOption.extraData.isCaptain = res?.createTeamPlayers?.IsCaptain;
          matchPlayerOption.extraData.version = res?.createTeamPlayers?._version;
          if (res?.createTeamPlayers?.IsCaptain === true) {
            setCaptainExist(res?.createTeamPlayers?.IsCaptain ?? false);
          }
        }));
        if (isCaptain === true) {
          toastService(`${label ?? ''} Has been added as a captain`, 'secondary');
        } else {
          toastService(`${label ?? ''} Has been added as a player`, 'secondary');
        }
      }).catch((err) => {
        console.error(err);
      });
  }, [allContacts, allTeamPlayers]);

  const teamPlayersDropdownProps: AutoCompletePlayers = {
    cyData: 'cypressAutoComplete',
    options: playerData,
    addPlayerButton,
    isCaptainInTeam: isCaptainExist,
    menuPlacement: 'bottom'
  };
  const colDef = useMemo<Array<ColDef<Contact>>>(() => {
    return [
      {
        headerName: 'Player Name',
        sort: 'asc',
        cellRenderer: ({ data }: GetRowIdParams<Contact>) => {
          return <ProfileDetailsRenderer
            paragraph={`${data?.FirstName ?? ''} ${data?.LastName ?? ''}`}
            imageId={data.PhotoId ?? ''} navLink={`/player/${data.id}`} isCaptain={data.isCaptain}
          />;
        },
        valueGetter: ({ data }) => {
          return `${data?.FirstName ?? ''} ${data?.LastName ?? ''}`;
        },
        minWidth: 200
      },
      {
        headerName: 'Player Role',
        colId: 'role',
        valueGetter: ({ data }) => {
          if (data?.isCaptain !== undefined && data?.isCaptain) return 'Captain';
          return 'Player';
        }
      },
      {
        headerName: 'Location',
        colId: 'location',
        valueGetter: ({ data }) => {
          return data?.ContactAddresses?.items[0]?.State;
        }
      },
      {
        headerName: 'Preferred Position',
        colId: 'position',
        valueGetter: ({ data }) => {
          return AllCapStrToReadableStr(data?.PlayerSoccerSkills?.PlayerPositions?.items[0]?.Position ?? '-');
        }
      },
      {
        headerName: 'Age',
        colId: 'age',
        filter: 'agNumberColumnFilter',
        valueGetter: (params) => {
          if (params.data?.Birthdate === null) return '-';
          return Number(getAgeFromDate(new Date(params.data?.Birthdate ?? '')));
        }
      },
      {
        headerName: 'Height',
        field: 'Height',
        colId: 'height',
        valueGetter: (params) => {
          if (params.data?.Height === undefined || params.data?.Height === null) return '-';
          return setImperialLabels('height', cmToFtInches(params.data?.Height));
        }
      },
      {
        headerName: 'Total Teams',
        field: 'teamsAssociated',
        colId: 'teamsAssociated',
        valueGetter: (params) => {
          return `${params.data?.teamsAssociated as number ?? '0'} Teams`;
        }
      },
      {
        headerName: 'Options',
        hide: user?.role !== '1',
        sortable: false,
        colId: 'options',
        cellClass: 'toolTip-cell-aggrid',
        cellRenderer: ({ data }: GetRowIdParams<Contact>) => {
          return <AuthorizedRoute type='authComps' id='teams.options'><OptionsCellRenderer id={data.id} hideButton='edit' onDelete={() => { onDelete(data); }} /></AuthorizedRoute>;
        }
      }
    ];
  }, []);

  const teamInfoCard: InfoCardProps = {
    image: imgUrl ?? '',
    modalID: 'addPlayersToTeamModal',
    id: teamInformation.id,
    textHeader: teamInformation.TeamName,
    bio: teamInformation.Description ?? '',
    editButtonText: t('viewTeamEditButton'),
    editButtonOnClickNavigate: '/teams/edit/',
    dropdownText: t('viewTeamDropdown') ?? '',
    border: false,
    otherProps: {
      gameStatus: statusLoading ? '...' : gameStatus,
      state: teamInformation.State ?? '',
      city: teamInformation.City ?? '',
      county: teamInformation.County ?? '',
      totalPlayers: String(teamInformation.TeamPlayers?.items?.length) ?? '0'
    },
    otherPropsHeaders: {
      gameStatus: t('teamStatusActive'),
      state: t('viewTeamState'),
      city: t('viewTeamCity'),
      county: t('viewTeamCounty'),
      totalPlayers: t('viewTeamTotalPlayers')
    },
    classNames: {
      gameStatus: `${gameStatus === 'Active' ? 'text-indictor-success' : 'text-indictor-error'} text-left`,
      state: '!text-left',
      city: '!text-left',
      county: '!text-left',
      totalPlayers: '!text-left'
    },
    children: <TeamPlayersDropdown {...teamPlayersDropdownProps} />
  };

  useEffect(() => {
    void imageCache.getImageWithCache(teamInformation.PhotoId ?? '').then((blobUrl) => {
      setImageUrl(blobUrl);
    }).catch(() => {
      setImageUrl('');
    });

    void listContactsWithTeamPlayers(user.attributes.sub).then((res) => {
      const contacts = res?.listContacts?.items as Contact[];
      const allTeamPlayersRes = res?.listTeamPlayers.items as TeamPlayers[];
      const teamPlayers: TeamPlayers[] = teamInformation?.TeamPlayers?.items as TeamPlayers[];
      const playerOptions: Array<Option<PlayersOptions>> = [];
      setAllContacts(contacts);
      setAllTeamPlayers(allTeamPlayersRes);

      const playersInTeam: Contact[] = contacts.filter((player) => {
        const PlayerInTeam = teamPlayers.find((teamPlayer) => {
          return player?.id === teamPlayer?.contactsID;
        });

        playerOptions.push(
          {
            value: player.id,
            label: `${player?.FirstName} ${player?.LastName ?? ''}`,
            extraData: {
              imageId: player.PhotoId ?? '',
              Birthdate: player.Birthdate ?? '',
              city: player.ContactAddresses?.items[0]?.City ?? '',
              state: player.ContactAddresses?.items[0]?.State ?? '',
              isCaptain: PlayerInTeam?.IsCaptain ?? false,
              inTeam: PlayerInTeam !== undefined,
              teamsId: teamInformation.id,
              version: PlayerInTeam?._version
            }
          }
        );

        if (PlayerInTeam === undefined) return false;

        if (PlayerInTeam.IsCaptain) {
          player.isCaptain = true;
          setCaptainExist(true);
        }

        const numOfTeams = allTeamPlayersRes.filter((teamPlayer) => (teamPlayer.contactsID === player.id));
        player.teamsAssociated = numOfTeams.length ?? 1;

        return true;
      });
      setPlayerData(playerOptions);
      setPlayers(playersInTeam);
    }).finally(() => {
      setTimeout(() => {
        setIsloading(false);
      }, (1000));
    });
  }, [teamInformation.id]);

  const breadCrumbs = useMemo((): JSX.Element => {
    if (matches[1].handle.crumbs === undefined) {
      return <></>;
    }

    return matches[1].handle.crumbs(teamInformation.id, teamInformation.TeamName);
  }, [matches]);

  const onDelete = (data: Contact): void => {
    const teamPlayer = teamInformation.TeamPlayers?.items.find((teamPlayer) => (teamPlayer?.contactsID === data.id));
    if (teamPlayer === null || teamPlayer === undefined) return;

    setDeleteTeamPlayerName(`${data.FirstName} ${data.LastName ?? ''}`);
    setDeleteTeamPlayerID(teamPlayer.id);
    setDeleteTeamPlayerVersion(teamPlayer._version);

    setPlayerData(produce((playerOptionsDraft) => {
      const matchPlayerOption = playerOptionsDraft.find((option) => (option.value === teamPlayer.contactsID));
      if (matchPlayerOption === undefined) return;
      if (matchPlayerOption.extraData === undefined) return;

      matchPlayerOption.extraData.inTeam = false;

      if (matchPlayerOption.extraData.isCaptain === true) {
        matchPlayerOption.extraData.isCaptain = false;
        setCaptainExist(false);
      }
    }));

    if (data.PhotoId !== undefined && data.PhotoId !== null && data.PhotoId !== '') {
      void imageCache.getImageWithCache(data.PhotoId).then((imageUrl) => {
        setModalTeamPlayerImage(imageUrl);
      });
    } else {
      setModalTeamPlayerImage('');
    }
    setTimeout(() => { setDeleteTeamPlayerModal(true); }, 20);
  };

  const onDeleteModalClose = (success?: boolean, id?: string, name?: string): void => {
    if (success === true && id !== '' && id !== undefined) {
      setPlayers(produce((draft) => {
        const index = draft.findIndex(contact => contact.id === id);
        if (index !== -1) draft.splice(index, 1);
      }));
      if (teamInformation.TeamPlayers === null || teamInformation.TeamPlayers === undefined) return;
      if (teamInformation.TeamPlayers?.items === null) return;
      teamInformation.TeamPlayers.items = teamInformation.TeamPlayers?.items?.filter((teamPlayer) => (teamPlayer?.contactsID !== id));
    }
    setTimeout(() => { setDeleteTeamPlayerModal(false); }, 20);
  };

  return (
    <div className='flex flex-col h-full w-full items-center'>
      <div className='w-full py-4 px-6 border-b border-grey-90 mobile:py-2 mobile:px-4'>
        {breadCrumbs}
      </div>
      <MemorizedInfoCard {...teamInfoCard} />
      <div className="tabs w-full border-b border-grey-90 h-[54px] px-6">
        <a className="tab tab-bordered tab-active w-15 !border-blue-60 h-full border-b-[5px] rounded-sm  text-blue-60 text-[18px] font-semibold">
          {t('viewTeamTabRoster')}
        </a>
      </div>

      <div className='flex flex-col pt-4 items-center h-full w-full px-4 mobile:gap-4'>
        <DashboardLoading isLoading={isLoading} className='!h-full'>
          {
            players.length === 0
              ? <>
                <img
                  src={PlayerPlaceholder}
                  className='
                  pt-4 scale-125 w-auto h-auto average:w-[300px]
                  average:h-[300px] tall:w-auto tall:h-auto short:w-[200px]
                  short:h-[200px] mobile:w-[220px] mobile:h-[200px]'/>
                <h3
                  className='
                  text-grey-10 text-[32px] leading-9 font-normal
                  tall:pb-3 short:pb-1 average:pb-2 mobile:text-2xl mobile:leading-5'>
                  {t('viewTeamEmptyState')}
                </h3>
                <p data-cy='emptyTeamsParagraph' className='body-sm-text text-grey-10 mobile:text-center mobile:px-4 mobile:text-xs'>
                  {teamInformation.TeamName} {t('viewTeamEmptyPara')}
                </p>
                <div className='w-[400px] mobile:w-[328px] mobile:pt-6 tall:pt-6 average:pt-3 short:pt-1'>
                  <AuthorizedRoute type='authComps' id='player.create'>
                    <DropdownButton
                      buttonText={t('viewTeamAddPlayer')}
                      cyData='addToTeamButton'
                      dropDownType='primary'
                      menuPosition='dropdown-top'
                      className='w-full mobile:hidden'
                      menuClassname='!mb-2 w-full'
                      dropDownSize='large'>
                      <TeamPlayersDropdown {...teamPlayersDropdownProps} menuPlacement='top' />
                    </DropdownButton>
                  </AuthorizedRoute>
                  <label
                    htmlFor='addPlayersToTeamModal'
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
                    hover:bg-[#7B66FF]'>{t('addToTeamsButton')}
                  </label>
                </div>
              </>
              : <div className={`
                flex-col 
                w-full self-start 
                min-h-[250px] 
                ${players.length > 15 ? 'responsive-half-height-table' : '!h-full'}`}>
                <Table rowData={players}
                  columnDefs={colDef}
                  pinnedColsId={['options']}
                />
              </div>
          }
        </DashboardLoading>
      </div>
      <RemoveTeamPlayerModal
        playerName={deleteTeamPlayerName}
        isOpen={deleteTeamPlayerModal}
        id={deleteTeamPlayerID}
        image={modalTeamPlayerImage}
        _version={deleteTeamPlayerVersion}
        teamName={teamInformation.TeamName}
        onClose={onDeleteModalClose}
      />
      <SkeletonMobileOverlay modalID='addPlayersToTeamModal' >
        <TeamPlayersDropdown {...teamPlayersDropdownProps} menuPlacement='top' />
      </SkeletonMobileOverlay>
    </div>
  );
};
