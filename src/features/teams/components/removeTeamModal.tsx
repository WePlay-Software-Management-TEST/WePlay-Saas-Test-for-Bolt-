import React, { memo, useState, useEffect } from 'react';
import Modal from 'core/components/modal/modal';
import { type ModalProps } from 'core/models/modal.model';
import { useTranslation } from 'react-i18next';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import { getInitials } from 'core/utils/utils';
import { deleteTeamRequest } from '../teams.service';
import { toastService } from 'core/services/toast.service';
import { type Team } from 'graphql/table.models';

interface RemoveTeamsModalProps {
  teamName: string
  isOpen: boolean
  id: string
  image?: string
  team?: Team
  _version: number
  onClose: (success?: boolean, id?: string, name?: string) => void
}

export function RemoveTeamsModal ({ teamName, isOpen, id, _version, onClose, image, team }: RemoveTeamsModalProps): JSX.Element {
  const { t } = useTranslation(['teams']);
  const [disableForm, setDisableForm] = useState(false);
  const [profileImage, setProfileImage] = useState(image);
  const [error, setError] = useState('');
  const [initials, setInitials] = useState('');

  const onConfirm = async (): Promise<void> => {
    setDisableForm(true);
    if (team === undefined) return;
    await deleteTeamRequest(id, _version, team)
      .then((res) => {
        toastService(`${teamName}${t('deleteTeamToast')}`, 'secondary');
        onClose(true, res?.deleteTeams?.id ?? '', teamName);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setDisableForm(false);
      });
  };

  useEffect(() => {
    if (!isOpen) setError('');
  }, [isOpen]);

  useEffect(() => {
    setInitials(getInitials(teamName));
  }, [teamName]);

  useEffect(() => {
    setProfileImage(image);
  }, [image]);

  const RemoveTeamsModalProps: ModalProps = {
    id: 'deleteTeamModal',
    isOpen,
    onClose: () => { onClose(false); },
    onConfirm,
    header: t('removeTeamHeader') ?? '',
    paragraph: `${teamName} ${t('removeTeamParagraph')}`,
    closeButtonText: t('removeTeamCancel') ?? '',
    confirmButtonText: t('removeTeamConfirm') ?? '',
    imageRatio: 'half',
    error,
    disableForm,
    leftPanelImage: profileImage === undefined || profileImage === '' ? <InitialsAvatar size='huge' initials={initials} /> : profileImage
  };
  return (<Modal {...RemoveTeamsModalProps}/>);
};

export const MemorizedRemoveTeamsModal = memo(RemoveTeamsModal);
