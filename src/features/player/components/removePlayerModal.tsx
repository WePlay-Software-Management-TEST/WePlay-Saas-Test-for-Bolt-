import React, { memo, useState, useEffect } from 'react';
import Modal from 'core/components/modal/modal';
import { type ModalProps } from 'core/models/modal.model';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../player.service';
import { useTranslation } from 'react-i18next';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import { getInitials } from 'core/utils/utils';
import { toastService } from 'core/services/toast.service';

interface RemoveProfileModalProps {
  profileName: string
  isOpen: boolean
  id: string
  image?: string
  _version: number
  onClose: (success?: boolean, id?: string, name?: string) => void
}

export function RemoveProfileModal ({ profileName, isOpen, id, _version, onClose, image }: RemoveProfileModalProps): JSX.Element {
  const { t } = useTranslation(['modals', 'player']);
  const [disableForm, setDisableForm] = useState(false);
  const [profileImage, setProfileImage] = useState(image);
  const [error, setError] = useState('');
  const [initials, setInitials] = useState('');
  const navigate = useNavigate();

  const onConfirm = async (): Promise<void> => {
    setDisableForm(true);
    await deleteProfile(id, _version).then((res) => {
      toastService(`${profileName}${t('toastArchivePlayer', { ns: 'player' })}`, 'secondary');
      navigate('/player');
      onClose(true, res?.deleteContacts?.id ?? '', profileName);
    }).catch(() => {
      setError('Something went Wrong!');
    })
      .finally(() => {
        setDisableForm(false);
      });
  };

  useEffect(() => {
    if (!isOpen) setError('');
  }, [isOpen]);

  useEffect(() => {
    setInitials(getInitials(profileName));
  }, [profileName]);

  useEffect(() => {
    setProfileImage(image);
  }, [image]);

  const removeProfileModalProps: ModalProps = {
    id: 'removePlayerCreation',
    isOpen,
    onClose: () => { onClose(false); },
    onConfirm,
    header: t('removeProfileHeader') ?? '',
    paragraph: `${profileName} ${t('removeProfilePara1')}${profileName} ${t('removeProfilePara2')}`,
    closeButtonText: t('removeProfileCancelButton') ?? '',
    confirmButtonText: t('removeProfileConfirmButton') ?? '',
    imageRatio: 'half',
    error,
    disableForm,
    leftPanelImage: profileImage === undefined || profileImage === '' ? <InitialsAvatar size='huge' initials={initials} /> : profileImage
  };
  return (<Modal {...removeProfileModalProps}/>);
};

export const MemorizedremoveProfileModal = memo(RemoveProfileModal);
