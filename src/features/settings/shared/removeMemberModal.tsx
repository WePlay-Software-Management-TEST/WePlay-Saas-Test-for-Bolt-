import React, { memo, useState, useEffect } from 'react';
import Modal from 'core/components/modal/modal';
import { type ModalProps } from 'core/models/modal.model';
import { useTranslation } from 'react-i18next';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import { getInitials } from 'core/utils/utils';
import { toastService } from 'core/services/toast.service';
import { removeUser } from 'core/services/auth.service';
import { type Contact } from 'graphql/table.models';

interface RemoveMemberModalProps {
  isOpen: boolean
  image?: string
  contact?: Contact
  onClose: (success?: boolean, id?: string, name?: string) => void
  facilityName?: string
}

/**
 * Renders a modal component for removing a member.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Contact} props.Contact - The name of the member to be removed.
 * @param {boolean} props.isOpen - Indicates whether the modal is open or not.
 * @param {Function} props.onClose - The function to be called when the modal is closed.
 * @param {string} props.image - The image of the member.
 * @returns {JSX.Element} The RemoveMemberModal component.
 */
export function RemoveMemberModal ({ contact, isOpen, onClose, image, facilityName }: RemoveMemberModalProps): JSX.Element {
  const { t } = useTranslation(['settings']);
  const [disableForm, setDisableForm] = useState(false);
  const [profileImage, setProfileImage] = useState(image);
  const [error, setError] = useState('');
  const [initials, setInitials] = useState('');

  const onConfirm = async (): Promise<void> => {
    setDisableForm(true);
    if (contact === undefined) return;
    await removeUser(contact).then((res) => {
      onClose(true, contact.id);
      toastService(t('organization.deleteModal.deleteConfirmation'), 'secondary');
    }).catch((err) => {
      setError('Something went wrong!');
      console.log(err);
    }).finally(() => {
      setDisableForm(false);
    });
  };

  useEffect(() => {
    if (!isOpen) setError('');
  }, [isOpen]);

  useEffect(() => {
    setInitials(getInitials(`${contact?.FirstName ?? ''} ${contact?.LastName ?? ''}`));
  }, [contact]);

  useEffect(() => {
    setProfileImage(image);
  }, [image]);

  const RemoveMemberModalProps: ModalProps = {
    id: 'removePlayerCreation',
    isOpen,
    onClose: () => { onClose(false); },
    onConfirm,
    header: t('organization.deleteModal.header') ?? '',
    paragraph: `${contact?.FirstName ?? ''} ${contact?.LastName ?? ''} ${t('organization.deleteModal.paragraphOne')}${facilityName ?? ''} ${t('organization.deleteModal.paragraphTwo')}`,
    closeButtonText: t('organization.deleteModal.cancelButton') ?? '',
    confirmButtonText: t('organization.deleteModal.confirmButton') ?? '',
    imageRatio: 'half',
    error,
    disableForm,
    leftPanelImage: profileImage === undefined || profileImage === '' ? <InitialsAvatar size='huge' initials={initials} /> : profileImage
  };
  return (<Modal {...RemoveMemberModalProps}/>);
};

export const MemorizedRemoveMemberModal = memo(RemoveMemberModal);
