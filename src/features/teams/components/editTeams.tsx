import React, { useState, useEffect } from 'react';
import DashboardLoading from 'core/layout/dashboardLoading';
import { TeamsForm } from './teamForm';
import { useLoaderData } from 'react-router-dom';
import { type Team } from 'graphql/table.models';
import { type TeamsForm as TeamsFromStructure } from '../hooks/teamsForm.hook';
import { useTranslation } from 'react-i18next';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { type Option, type PlayersOptions } from 'core/models/input.model';
import { listContactsRequest } from 'features/player/player.service';
import useAuthContext from 'core/context/userContext/userContext.consumer';

/**
 * @component Edit Team Screen, uses TeamForm as a child component, and passes it the correct Props
 * @returns { JSX.Element }
 */
export function EditTeams (): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const { t } = useTranslation(['teams']);
  const imageCache = useImageCache();
  const [players, setPlayers] = useState<Array<Option<PlayersOptions>>>([]);
  const [teamForm, setTeamsForm] = useState<TeamsFromStructure>({
    teamsName: '',
    teamsDescription: '',
    teamsImage: [],
    city: '',
    state: '',
    county: '',
    teamPlayers: []
  });
  const teamInformation = useLoaderData() as Team;

  useEffect(() => {
    void listContactsRequest(user.attributes.sub).then((res) => {
      void imageCache.getImageFile(teamInformation.PhotoId ?? '')
        .then((file) => {
          const previewImages: File[] = file !== undefined ? [file] : [];
          const teamsPlayers: Array<Option<PlayersOptions>> | undefined = teamInformation.TeamPlayers?.items?.map((teamPlayer) => {
            const playerInfo = res?.listContacts?.items.find((player) => (player?.id === teamPlayer?.contactsID));
            return {
              label: `${playerInfo?.FirstName ?? ''} ${playerInfo?.LastName ?? ''}`,
              value: teamPlayer?.contactsID ?? '',
              extraData: {
                isCaptain: teamPlayer?.IsCaptain,
                Birthdate: playerInfo?.Birthdate ?? '',
                city: playerInfo?.ContactAddresses?.items[0]?.City ?? '',
                state: playerInfo?.ContactAddresses?.items[0]?.State ?? '',
                imageId: playerInfo?.PhotoId ?? ''
              }
            };
          });
          setTeamsForm(() => {
            return {
              teamsName: teamInformation.TeamName,
              teamsDescription: teamInformation.Description ?? '',
              city: teamInformation.City ?? '',
              state: teamInformation.State ?? '',
              county: teamInformation.County ?? '',
              teamsImage: previewImages,
              teamPlayers: teamsPlayers ?? []
            };
          });
          const playerOptions: Array<Option<PlayersOptions>> | undefined = res?.listContacts?.items.map((contact): Option<PlayersOptions> => {
            return {
              label: `${contact?.FirstName ?? ''} ${contact?.LastName ?? ''}`,
              value: contact?.id as string,
              extraData: {
                imageId: contact?.PhotoId ?? '',
                Birthdate: contact?.Birthdate ?? '',
                city: contact?.ContactAddresses?.items[0]?.City ?? '',
                state: contact?.ContactAddresses?.items[0]?.State ?? '',
                isCaptain: false
              }
            };
          });
          if (playerOptions === undefined) {
            setPlayers([]);
            return;
          }
          setPlayers(playerOptions);
        }).finally(() => {
          setTimeout(() => { setIsLoading(false); }, 500);
        });
    }).catch((err) => {
      console.error(err);
      setIsLoading(false);
    });
  }, []);

  return (
    <DashboardLoading isLoading={isLoading}>
      <TeamsForm header={t('editTeamHeader') ?? ''}
       teamsForm={teamForm}
       initialTeamsInfo={teamInformation}
       defaultPlayers={players}
       />
    </DashboardLoading>
  );
};
