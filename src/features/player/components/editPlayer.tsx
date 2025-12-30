import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { type CustomGetContactsQuery } from 'graphql/custom.queries';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { type PlayerInfoForm } from '../hooks/playerForm.hook';
import { cmToFtInches } from 'core/utils/utils';
import DashboardLoading from 'core/layout/dashboardLoading';
import PlayerForm from './playerForm';
import { useTranslation } from 'react-i18next';
import { type Option, type TeamsOptions } from 'core/models/input.model';

export function EditPlayer (): JSX.Element {
  const { t } = useTranslation(['player']);
  const playerInformation = useLoaderData() as CustomGetContactsQuery;
  const imageCache = useImageCache();
  const [isLoading, setIsloading] = useState(true);
  const [playerForm, setplayerForm] = useState<PlayerInfoForm>();

  useEffect(() => {
    void imageCache.getImageFile(playerInformation?.PhotoId ?? '').then((file) => {
      const previewImages: File[] = file !== undefined ? [file] : [];
      const teamsOptions: Array<Option<TeamsOptions>> = playerInformation.TeamPlayers?.items.map((teamPlayer): Option<TeamsOptions> => ({
        label: '',
        value: teamPlayer?.teamsID ?? '',
        extraData: {
          city: '',
          state: '',
          imageId: ''
        }
      })) ?? [];
      setplayerForm(() => {
        return {
          firstName: playerInformation.FirstName,
          lastName: playerInformation.LastName ?? '',
          playerBio: playerInformation.Biography ?? '',
          playerImage: previewImages,
          PreferredPositition: playerInformation.PlayerSoccerSkills?.PlayerPositions?.items[0]?.Position ?? undefined,
          birthDate: playerInformation.Birthdate ?? '',
          experienceLevel: playerInformation.PlayerSoccerSkills?.ExperienceLevel ?? undefined,
          city: playerInformation.ContactAddresses?.items[0]?.City ?? '',
          state: playerInformation.ContactAddresses?.items[0]?.State ?? '',
          zipCode: playerInformation.ContactAddresses?.items[0]?.PostalCode ?? '',
          leftRightPreference: playerInformation.PlayerSoccerSkills?.LeftRightFooted,
          height: cmToFtInches(playerInformation.Height),
          gender: playerInformation.Gender,
          weight: `${playerInformation.Weight ?? ''}`,
          teams: teamsOptions,
          playerEmail: playerInformation.ContactEmails?.items[0]?.Email ?? ''
        };
      });
    })
      .finally(() => {
        setTimeout(() => { setIsloading(false); }, 700);
      });
  }, []);

  return (
    <DashboardLoading isLoading={isLoading}>
      <PlayerForm header={t('editProfileHeader') ?? ''}
       playerForm={playerForm}
       initialPlayerInformation={playerInformation}
       updatePlayerForm={setplayerForm}
       />
    </DashboardLoading>
  );
};
