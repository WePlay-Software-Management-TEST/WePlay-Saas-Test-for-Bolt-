import React, { useMemo, useEffect, useState } from 'react';
import ImageUpload from 'core/components/input/imageUpload';
import Input from 'core/components/input/input';
import TextArea from 'core/components/input/textArea';
import SelectInput from 'core/components/input/selectInput';
import RadioButton from 'core/components/button/radioButton';
import Button from 'core/components/button/button';
import { GooglePlacesAutoComplete } from 'core/components/input/googlePlacesAutoComplete';
import { type CustomGetContactsQuery } from 'graphql/custom.queries';
import { type PlayerInfoForm, usePlayerForm } from '../hooks/playerForm.hook';
import {
  createPlayer, createS3StoragePhoto,
  updateProfile, updateS3StorageUser
} from '../player.service';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import {
  FootPreferenceTypes
} from 'models';
import { RemoveProfileModal } from './removePlayerModal';
import { ReactComponent as DeleteIcon } from 'assets/svgs/delete-outlined.svg';
import cancelPlayerCreation from 'assets/images/cancelPlayerCreation.png';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import { getInitials } from 'core/utils/utils';
import { UseInitialFormStates } from 'features/shared/hooks/initialFormStates.hook';
import { useModals } from 'features/shared/hooks/useModals.hook';
import { toastService } from 'core/services/toast.service';
import { TeamsAutoComplete } from './teamsAutoComplete';
import { listTeamsRequest } from 'features/teams/teams.service';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import { type Option, type TeamsOptions } from 'core/models/input.model';
import produce from 'immer';
import { listUsersQuery } from 'core/services/auth.service';
import { type Contact } from 'graphql/table.models';

interface PlayerFormProps {
  header?: string
  playerForm?: PlayerInfoForm
  initialPlayerInformation?: CustomGetContactsQuery
  updatePlayerForm?: React.Dispatch<React.SetStateAction<PlayerInfoForm | undefined>>
}

/**
 * @component React Component Player Form, used in both edit/create Players.
 * @param { PlayerInfoForm | undefined } playerForm - Player Form, also indicates if the component in an Edit mode, or Create Mode.
 * @param { CustomGetContactsQuery | undefined } initialPlayerInformation - Initial Player data, also indicates if the component in an Edit mode, or Create Mode.
 * @param { React.Dispatch<React.SetStateAction<PlayerInfoForm | undefined>> | undefined } updatePlayerForm - Update Player Form State.
 * @param { string } header - Header Text.
 * @returns { JSX.Element }
 */
function PlayerForm ({ playerForm, initialPlayerInformation, updatePlayerForm, header = '' }: PlayerFormProps): JSX.Element {
  const { t } = useTranslation(['player', 'modals']);
  const { user } = useAuthContext();
  const [teamsData, setTeamsData] = useState<Array<Option<TeamsOptions>>>([]);
  const [allUsers, setAllUsers] = useState<Contact[]>([]);

  useEffect(() => {
    void listUsersQuery(true).then((res) => {
      const data = res?.listContacts?.items as Contact[];
      setAllUsers(data);
    });
    void listTeamsRequest(user.id).then((res) => {
      const teamsOptions: Array<Option<TeamsOptions>> | undefined = res?.listTeams?.items.map((team): Option<TeamsOptions> => {
        return {
          label: team.TeamName,
          value: team.id,
          extraData: {
            imageId: team?.PhotoId ?? '',
            city: team?.City ?? '',
            state: team?.State ?? ''
          }
        };
      });
      if (teamsOptions === undefined) {
        setTeamsData([]);
        return;
      }
      setTeamsData(teamsOptions);
      if (playerForm !== undefined) {
        const selectedTeams: Array<Option<TeamsOptions>> = [];
        teamsOptions.forEach((team) => {
          initialPlayerInformation?.TeamPlayers?.items.forEach((teamPlayer) => {
            if (team.value === teamPlayer?.teamsID) {
              selectedTeams.push(team);
            }
          });
        });
        updatePlayerForm?.(produce((draft) => {
          if (draft === undefined) return draft;
          draft.teams = selectedTeams;
        }));
      }
    }).catch((err) => {
      console.error(err);
      setTeamsData([]);
    });
  }, []);

  const {
    cancelDialogisOpen,
    setCancelDialogisOpen,
    confirmDialogisOpen,
    setConfirmDialogisOpen,
    removeProfileDialogOpen,
    setRemoveProfileDialogOpen,
    navigate,
    imageCache,
    matches,
    modalError,
    setModalError,
    disableModal,
    setDisableForm
  } = UseInitialFormStates();
  const {
    handleSubmit,
    register,
    getValues,
    isDirty,
    firstNameProps,
    lastNameProps,
    playerBioProps,
    preferredPositionInputProps,
    birthDateInputProps,
    experienceLevelInputProps,
    StateInputProps,
    CityInputProps,
    zipCodeInputProps,
    heightInputProps,
    weightInputProps,
    genderInputProps,
    playerTeams,
    playerEmail,
    isValid,
    playerImageProps
  } = usePlayerForm(playerForm, teamsData, allUsers, initialPlayerInformation?.id);

  const ImageuploadComp = useMemo(() => {
    return <ImageUpload {...playerImageProps}/>;
  }, []);

  const breadCrumbs = useMemo((): JSX.Element => {
    if (matches[1].handle?.crumbs === undefined) {
      return <></>;
    }

    if (playerForm !== undefined) {
      return matches[1].handle?.crumbs(initialPlayerInformation?.id, `${playerForm.firstName} ${playerForm.lastName}`);
    };

    return matches[1].handle?.crumbs();
  }, [matches]);

  const sumbitPlayer = handleSubmit(async (value) => {
    setDisableForm(true);

    if (allUsers.find((user) => user.ContactEmails?.items[0].Email === value.playerEmail && user.id !== initialPlayerInformation?.id) !== undefined) {
      setModalError('Player Email is being used by Facility staff');
      setDisableForm(false);
      return;
    }
    const imageFile = value.playerImage !== undefined ? value.playerImage[0] : undefined;
    if (playerForm !== undefined && initialPlayerInformation !== undefined) {
      const imageKey =
      initialPlayerInformation?.PhotoId === '' ||
      initialPlayerInformation?.PhotoId === undefined ||
      initialPlayerInformation?.PhotoId === null
        ? uuidv4()
        : initialPlayerInformation?.PhotoId;
      await updateS3StorageUser(imageKey, imageFile).then(async (putResults) => {
        await updateProfile(value, initialPlayerInformation, putResults?.key)
          .then(async (res) => {
            if (putResults?.key !== undefined) {
              void imageCache.updateImageFile(putResults.key);
            };
            toastService(t('toastEditPlayer'), 'secondary');
            navigate(`/player/${res.data?.updatePlayer?.id ?? ''}`);
          }).catch((err) => {
            console.log(err);
            setModalError('Something went Wrong, try again later.');
          })
          .finally(() => {
            setTimeout(() => {
              setDisableForm(false);
            }, 2000);
          });
      });
      return;
    };
    await createS3StoragePhoto(uuidv4(), imageFile).then(async (putResults) => {
      await createPlayer(value, putResults?.key)
        .then((res) => {
          toastService(t('toastCreatePlayer'), 'secondary');
          navigate(`/player/${res.data?.insertPlayer?.id ?? ''}`);
        }).catch((err) => {
          console.log(err);
          setModalError('Something went Wrong, try again later.');
        })
        .finally(() => {
          setTimeout(() => {
            setDisableForm(false);
          }, 1000);
        });
    });
  });
  const { CloseModel, ConfirmModal } = useModals(
    {
      isCloseModalOpen: cancelDialogisOpen,
      isConfirmModalOpen: confirmDialogisOpen,
      closeModalOnClose: () => { setCancelDialogisOpen(false); },
      closeModalOnConfirm: () => {
        toastService(t('toastCancelEditPlayer'), 'secondary');
        navigate(`/player/${initialPlayerInformation?.id ?? ''}`);
      },
      closeModalHeader: playerForm === undefined ? t('cancelPlayerCreationModalHeader') ?? '' : t('cancelEditProfileHeader', { ns: 'modals' }) ?? '',
      closeModalParagraph: playerForm === undefined ? t('cancelPlayerCreationModalParagraph') ?? '' : `${t('cancelEditProfilePara', { ns: 'modals' }) ?? ''}${playerForm.firstName} ${playerForm.lastName}.`,
      closeModalOnCloseButtonText: playerForm === undefined ? t('closeCancelModalText') ?? '' : t('cancelEditCancelButton', { ns: 'modals' }) ?? '',
      closeModalOnConfirmButtonText: playerForm === undefined ? t('confirmCancelModalText') ?? '' : t('cancelEditConfirmButton', { ns: 'modals' }) ?? '',
      closeModalImage: playerForm === undefined
        ? cancelPlayerCreation
        : getValues().playerImage !== undefined && getValues()?.playerImage?.length > 0
          ? URL.createObjectURL(getValues().playerImage[0])
          : <InitialsAvatar initials={getInitials(undefined, getValues().firstName, getValues().lastName)}
      size='huge'/>,
      confirmModalOnClose: () => { setConfirmDialogisOpen(false); },
      confirmModalOnConfirm: sumbitPlayer,
      confirmModalHeader: playerForm === undefined ? t('confirmPlayerCreationModalHeader') ?? '' : t('confirmEditHeader', { ns: 'modals' }) ?? '',
      confirmModalParagraph: playerForm === undefined
        ? `
        ${
          getValues().firstName} ${getValues().lastName} ${t('confirmPlayerCreationModalParagraph') ?? ''
        }
      `
        : `
      ${t('confirmEditPara1', { ns: 'modals' })}${playerForm.firstName} ${playerForm.lastName ?? ''}${t('confirmEditPara2', { ns: 'modals' })}
    `,
      confirmModalOnCloseButtonText: playerForm === undefined ? t('closePlayerCreationModalText') ?? '' : t('cancelEditCancelButton', { ns: 'modals' }) ?? '',
      confirmModalOnConfirmButtonText: playerForm === undefined ? t('confirmPlayerCreationModalText') ?? '' : t('confirmEditConfirmButton', { ns: 'modals' }) ?? '',
      confirmModalImage:
      getValues().playerImage !== undefined && getValues()?.playerImage?.length > 0
        ? URL.createObjectURL(getValues().playerImage[0])
        : <InitialsAvatar initials={getInitials(undefined, getValues().firstName, getValues().lastName)}
        size='huge'/>,
      confirmModalError: modalError,
      confirmModalDisable: disableModal
    }
  );

  return (
  <div className='flex flex-col h-full w-full'>
    <div className='w-full py-2 px-4 border-b border-grey-90'>
    { breadCrumbs }
    </div>
    <div className='w-full p-6 flex border-b border-grey-90 justify-between
     mobile:p-4'>
    <div className='flex flex-col w-[300px] '>
      <h6 data-cy='createProfileHeader' className='text-grey-10 font-bold leading-7 pb-2'>{
      header !== ''
        ? header
        : <>
        {t('createPlayerHeader')}
      </>
      }
      </h6>
      <p data-cy='subTextCreateProfile' className='text-grey-50 text-xs font-normal'>{t('createPlayerHeaderSubText')}</p>
      </div>
      {
        playerForm !== undefined && <div>
        <Button
        onClickCallable={ () => { setRemoveProfileDialogOpen(true); }}
        type='secondary'
        text='Remove Player'
        showIcon iconPosition='right'
        Icon={DeleteIcon}
        className='!border-carnation-60 !text-carnation-60 !text-base !font-semibold !hover:text-carnation-60' size='small'/>
      </div>
      }
    </div>
    <div className='flex p-6 mobile:gap-4 mobile:p-4 gap-12 lg:flex-row sm:flex-col mobile:flex-col'>
      <p className='text-sm font-bold text-grey-10 min-w-[150px]'>
      {t('createPlayerFormHeader')}
       </p>
      <div className='flex gap-6 w-full lg:flex-row sm:flex-col mobile:flex-col mobile:gap-4'>
        { ImageuploadComp }
      <div className='flex flex-col gap-6 w-full mobile:gap-4'>
        <div className='grid grid-cols-2 gap-5'>
        <Input {...firstNameProps}/>
        <Input {...lastNameProps}/>
        </div>
        <TextArea {...playerBioProps} />
        <div className='grid grid-cols-3 gap-5 mobile:flex mobile:flex-col mobile:gap-2'>
        <SelectInput {...preferredPositionInputProps}/>
        <Input {...birthDateInputProps}/>
        <SelectInput {...experienceLevelInputProps}/>
        <GooglePlacesAutoComplete {...zipCodeInputProps}/>
        <GooglePlacesAutoComplete {...CityInputProps}/>
        <GooglePlacesAutoComplete {...StateInputProps}/>
        <div className='flex flex-col gap-4 col-span-3'>
          <p
          className='text-base font-semibold text-grey-10 flex'>
            {
            t('footPreference')
            }&#160;
            <span className='text-grey-70'>{t('optionalTag')}
            </span>
          </p>
          <div className='flex gap-5'>
            <RadioButton
            value={FootPreferenceTypes.LEFT}
            id='leftPreference'
            cyData='leftPreference'
            registrationOption={register('leftRightPreference')} label={t('leftFootLabel') ?? ''}/>
            <RadioButton
            value={FootPreferenceTypes.RIGHT}
            id='rightPreference'
            cyData='rightPreference'
            registrationOption={register('leftRightPreference')} label={t('rightFootLebel') ?? ''}/>
          </div>
        </div>
        <SelectInput {...genderInputProps}/>
        <SelectInput {...heightInputProps}/>
        <Input {...weightInputProps}/>
        <div className='col-span-full'>
        <TeamsAutoComplete {...playerTeams} className='mb-5 mobile:mb-2'/>
        <Input {...playerEmail}/>
        </div>
        </div>
      </div>
      </div>
    </div>
    <div
    className='
    sticky bottom-0 flex mt-auto justify-end mobile:justify-center z-10
    gap-4 bg-grey-98 w-full p-5 shadow-md border-t border-grey-90 left-0'>
    <Button
    type='secondary'
    text={t('cancelCreatePlayerButton')}
    size='medium'
    className='!bg-transparent'
    cyData='cancelProfileCreationModal'
     onClickCallable={() => { setCancelDialogisOpen(true); }}/>
    <Button
    type='primary'
    text={playerForm === undefined ? t('confirmCreatePlayerButton') : 'Save Changes'}
    size='medium'
    isValidChecked={ playerForm === undefined ? isValid : (isValid && isDirty) }
    cyData='openConfirmProfileDialog'
    onClickCallable={() => { setConfirmDialogisOpen(true); }}/>
    </div>
    { ConfirmModal }
    { CloseModel }
    <RemoveProfileModal
    isOpen={removeProfileDialogOpen}
    profileName={`${initialPlayerInformation?.FirstName ?? ''} ${initialPlayerInformation?.LastName ?? ''}`}
    id={initialPlayerInformation?.id ?? ''}
    _version={initialPlayerInformation?._version ?? 0}
    onClose={() => { setRemoveProfileDialogOpen(false); }}
    image={`${getValues().playerImage !== undefined && getValues()?.playerImage?.length > 0
      ? URL.createObjectURL(getValues().playerImage[0])
      : ''
    }`}
    />
  </div>
  );
};

export default PlayerForm;
