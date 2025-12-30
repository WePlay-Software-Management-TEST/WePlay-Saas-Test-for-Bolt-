import React, { useMemo, useEffect, useState } from 'react';
import Button from 'core/components/button/button';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DeleteIcon } from 'assets/svgs/delete-outlined.svg';
import Input from 'core/components/input/input';
import TextArea from 'core/components/input/textArea';
import { GooglePlacesAutoComplete } from 'core/components/input/googlePlacesAutoComplete';
import ImageUpload from 'core/components/input/imageUpload';
import { type TeamsForm as TeamsFormStructure, useTeamsForm } from '../hooks/teamsForm.hook';
import { UseInitialFormStates } from 'features/shared/hooks/initialFormStates.hook';
import { getInitials } from 'core/utils/utils';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import { useModals } from 'features/shared/hooks/useModals.hook';
import DefaultTeamsCancelImage from 'assets/images/left-image.png';
import { createS3StoragePhoto, updateS3StorageUser, listContactsRequest } from 'features/player/player.service';
import { v4 as uuidv4 } from 'uuid';
import { RemoveTeamsModal } from './removeTeamModal';
import { TeamPlayerAutoComplete } from './teamPlayerAutoComplete';
import { createTeam, updateTeamRequest } from '../teams.service';
import { toastService } from 'core/services/toast.service';
import { type Team } from 'graphql/table.models';
import { type Option, type PlayersOptions } from 'core/models/input.model';

interface TeamsFormProps {
  teamsForm?: TeamsFormStructure
  header?: string
  initialTeamsInfo?: Team
  defaultPlayers?: Array<Option<PlayersOptions>>
}
export function TeamsForm ({
  teamsForm, initialTeamsInfo, defaultPlayers = [], header = ''
}: TeamsFormProps): JSX.Element {
  const [players, setPlayers] = useState<Array<Option<PlayersOptions>>>(defaultPlayers);
  const { t } = useTranslation(['teams', 'modals']);
  const {
    user,
    setModalError,
    cancelDialogisOpen,
    setCancelDialogisOpen,
    confirmDialogisOpen,
    setConfirmDialogisOpen,
    removeProfileDialogOpen,
    setRemoveProfileDialogOpen,
    navigate,
    matches,
    modalError,
    disableModal,
    setDisableForm
  } = UseInitialFormStates();

  useEffect(() => {
    if (players.length === 0) {
      void listContactsRequest(user.attributes.sub).then((res) => {
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
      }).catch((err) => {
        console.error(err);
        setPlayers([]);
      });
    }
  }, []);
  const {
    isDirty,
    isValid,
    teamsPlayers,
    teamsDescriptionProps,
    teamsImageProps,
    teamsNameProps,
    StateInputProps,
    CityInputProps,
    countyProps,
    getValues,
    handleSubmit
  } = useTeamsForm(user.attributes.sub, teamsForm, players);

  const submitTeam = handleSubmit(async (value) => {
    setDisableForm(true);
    const imageFile = value.teamsImage !== undefined ? value.teamsImage[0] : undefined;
    if (teamsForm !== undefined && initialTeamsInfo !== undefined) {
      const imageKey =
      initialTeamsInfo?.PhotoId === '' ||
      initialTeamsInfo?.PhotoId === undefined ||
      initialTeamsInfo?.PhotoId === null
        ? uuidv4()
        : initialTeamsInfo?.PhotoId;
      await updateS3StorageUser(imageKey, imageFile).then(async (putResults) => {
        await updateTeamRequest(value, initialTeamsInfo, putResults?.key ?? '').then(() => {
          toastService(t('editTeamToast'), 'secondary');
          navigate(`/teams/${initialTeamsInfo.id}`);
        }).catch((err) => {
          console.error(err);
          setModalError('Something went Wrong, try again later.');
          setDisableForm(false);
        });
      });
      return;
    };
    await createS3StoragePhoto(uuidv4(), imageFile).then(async (putResults) => {
      await createTeam(value, putResults?.key).then((res) => {
        toastService(`${value.teamsName}${t('teamHaveBeenCreatedToast')}`, 'secondary');
        navigate(`/teams/${res?.insertTeam?.id ?? ''}`);
      }).catch((err) => {
        console.error(err);
        setModalError('Something went Wrong, try again later.');
        setDisableForm(false);
      });
    });
  });

  const { CloseModel, ConfirmModal } = useModals(
    {
      isCloseModalOpen: cancelDialogisOpen,
      isConfirmModalOpen: confirmDialogisOpen,
      closeModalOnClose: () => { setCancelDialogisOpen(false); },
      closeModalOnConfirm: () => {
        if (teamsForm !== undefined) {
          toastService(t('editTeamToastCanned'), 'secondary');
        }
        navigate(`/teams/${initialTeamsInfo?.id ?? ''}`);
      },
      closeModalHeader: teamsForm === undefined
        ? t('CloseModalHeader') ?? ''
        : t('cancelEditProfileHeader', { ns: 'modals' }) ?? '',
      closeModalParagraph: teamsForm === undefined
        ? `${t('closeModalParagraph')}`
        : `${t('cancelEditProfilePara', { ns: 'modals' }) ?? ''}${teamsForm?.teamsName}.`,
      closeModalOnCloseButtonText: teamsForm === undefined
        ? t('closeModalOnclose') ?? ''
        : t('cancelEditCancelButton', { ns: 'modals' }) ?? '',
      closeModalOnConfirmButtonText: teamsForm === undefined
        ? t('closeModalOnConfirm') ?? ''
        : t('cancelEditConfirmButton', { ns: 'modals' }) ?? '',
      closeModalImage: teamsForm === undefined
        ? DefaultTeamsCancelImage
        : getValues().teamsImage !== undefined && getValues()?.teamsImage?.length > 0
          ? URL.createObjectURL(getValues().teamsImage[0])
          : <InitialsAvatar initials={getInitials(getValues().teamsName)}
            size='huge'/>,
      confirmModalOnClose: () => { setConfirmDialogisOpen(false); },
      confirmModalOnConfirm: submitTeam,
      confirmModalHeader: teamsForm === undefined
        ? t('confirmModalHeader') ?? ''
        : t('confirmEditHeader', { ns: 'modals' }) ?? '',
      confirmModalParagraph: teamsForm === undefined
        ? `
            ${getValues().teamsName} ${t('confirmModalPara') ?? ''
            }
          `
        : `
          ${t('confirmEditPara1', { ns: 'modals' })}${teamsForm.teamsName}${t('confirmEditPara2', { ns: 'modals' })}
        `,
      confirmModalOnCloseButtonText: teamsForm === undefined
        ? t('cancelTeamCreationButtonModal') ?? ''
        : t('cancelEditCancelButton', { ns: 'modals' }) ?? '',
      confirmModalOnConfirmButtonText: teamsForm === undefined
        ? t('confirmModalOnConfirmText') ?? ''
        : t('confirmEditConfirmButton', { ns: 'modals' }) ?? '',
      confirmModalImage: getValues().teamsImage !== undefined && getValues()?.teamsImage?.length > 0
        ? URL.createObjectURL(getValues().teamsImage[0])
        : <InitialsAvatar initials={getInitials(getValues().teamsName)}
          size='huge'/>,
      confirmModalError: modalError,
      confirmModalDisable: disableModal
    }
  );

  const breadCrumbs = useMemo((): JSX.Element => {
    if (matches[1].handle?.crumbs === undefined) {
      return <></>;
    }
    if (initialTeamsInfo !== undefined) {
      return matches[1].handle?.crumbs(initialTeamsInfo.id, initialTeamsInfo.TeamName);
    };

    return matches[1].handle?.crumbs();
  }, [matches]);

  return (
    <div className='flex flex-col h-full w-full md:overflow-x-auto mobile:overflow-x-clip'>
      <div className='w-full py-4 px-6 border-b border-grey-90 mobile:px-4 mobile:py-2'>
      { breadCrumbs }
      </div>
      <div className='w-full p-6 flex border-b border-grey-90 justify-between mobile:p-4'>
      <div className='flex flex-col w-[300px]'>
        <h6 data-cy='createProfileHeader' className='text-grey-10 font-bold leading-7 pb-2'>{
        header !== ''
          ? header
          : <>
          {t('createTeamHeader')}
        </>
        }
        </h6>
        <p data-cy='subTextCreateProfile' className='text-grey-50 text-xs font-normal'>{t('createTeamHeaderSubText')}</p>
        </div>
        {
          teamsForm !== undefined && <div>
          <Button
          onClickCallable={ () => { setRemoveProfileDialogOpen(true); }}
          type='secondary'
          text='Remove Team'
          showIcon iconPosition='right'
          Icon={DeleteIcon}
          className='!border-carnation-60 !text-carnation-60 !text-base !font-semibold !hover:text-carnation-60' size='small'/>
        </div>
        }
      </div>
      <div className='flex p-6 gap-12 lg:flex-row sm:flex-col mobile:gap-4 mobile:p-4 mobile:flex-col'>
        <p className='text-sm font-bold text-grey-10 min-w-[150px]'>
        {t('createTeamPara')}
         </p>
        <div className='flex gap-6 w-full lg:flex-row sm:flex-col mobile:flex-col mobile:gap-4'>
          <ImageUpload {...teamsImageProps}/>
        <div className='flex flex-col gap-6 w-full mobile:gap-4'>
          <Input {...teamsNameProps}/>
          <TextArea {...teamsDescriptionProps} />
          <div className='grid grid-cols-3 mobile:grid-cols-1 mobile:gap-2 gap-5'>
          <GooglePlacesAutoComplete {...CityInputProps}/>
          <Input {...countyProps}/>
          <Input {...StateInputProps}/>
          <div className='col-span-full'>
          <TeamPlayerAutoComplete {...teamsPlayers} className=''/>
          </div>
          </div>
        </div>
        </div>
      </div>
      <div
      className='
      sticky bottom-0 flex mt-auto justify-end mobile:justify-center z-10
      gap-4 bg-grey-98 w-full p-5 mobile:px-4 mobile:py-2 shadow-md border-t border-grey-90 left-0'>
      <Button
      type='secondary'
      text={t('cancelTeamCreationButton')}
      size='medium'
      className='!bg-transparent'
      cyData='cancelTeamCreationModal'
       onClickCallable={() => { setCancelDialogisOpen(true); }}/>
      <Button
      type='primary'
      text={teamsForm === undefined ? t('confirmCreateTeamButton') : t('confirmEditConfirmButton', { ns: 'modals' })}
      size='medium'
      isValidChecked={ teamsForm === undefined ? isValid : (isValid && isDirty) }
      cyData='openConfirmTeamDialog'
      onClickCallable={() => { setConfirmDialogisOpen(true); }}/>
      </div>
      { CloseModel }
      { ConfirmModal }
      <RemoveTeamsModal
      isOpen={removeProfileDialogOpen}
      teamName={initialTeamsInfo?.TeamName ?? ''}
      id={initialTeamsInfo?.id ?? ''}
      _version={initialTeamsInfo?._version ?? 0}
      team={initialTeamsInfo}
      onClose={() => {
        navigate('/teams');
        setRemoveProfileDialogOpen(false);
      }}
      image={`${getValues().teamsImage !== undefined && getValues()?.teamsImage?.length > 0
        ? URL.createObjectURL(getValues().teamsImage[0])
        : ''
      }`}
      />
    </div>
  );
};
