import React, { memo, useState, useEffect } from 'react';
import Modal from 'core/components/modal/modal';
import { type ModalProps } from 'core/models/modal.model';
import { useTranslation } from 'react-i18next';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import { getInitials } from 'core/utils/utils';
import { deleteTeamPlayerRequest } from '../teams.service';
import { toastService } from 'core/services/toast.service';

interface RemoveTeamPlayerModalprops {
  playerName: string
  isOpen: boolean
  id: string
  image?: string
  _version: number
  teamName: string
  returnOnSuccessID?: 'team' | 'contact'
  toastMsg?: string
  onClose: (success?: boolean, id?: string, name?: string) => void
}

/**
 * @component Remove Player From Team Modal, Shared across Team Feature.
 * @param { string} playerName - Player name that you want to remove, shows up in the Modal paragraph.
 * @param { boolean } isOpen - Flag that indicates if the modal is open or not.
 * @param { string } id - ID of the TeamPlayer Record that you want to remove from the Database.
 * @param { string } image - Image ID that you want to show in the modal
 * @param { number } _version - _version Attribute that AWS AppSync uses for conflict resolution
 * @param { string } teamName - Team Name associated with the player.
 * @param { team | contact } returnOnSuccessID - What ID should it return after it deletes TeamPlayer Record
 * @param { string | undefined } toastMsg - toast message text.
 * @returns { JSX.Element }
 */
export function RemoveTeamPlayerModal ({
  playerName, isOpen, id, _version, onClose, image, teamName, toastMsg, returnOnSuccessID = 'contact'
}: RemoveTeamPlayerModalprops): JSX.Element {
  const { t } = useTranslation(['teams']);
  const [disableForm, setDisableForm] = useState(false);
  const [profileImage, setProfileImage] = useState(image);
  const [error, setError] = useState('');
  const [initials, setInitials] = useState('');

  const onConfirm = async (): Promise<void> => {
    setDisableForm(true);
    await deleteTeamPlayerRequest(id, _version)
      .then((res) => {
        const toastMessage = toastMsg === undefined ? `${playerName} ${t('removeTeamPlayerToast')}` : toastMsg;
        toastService(toastMessage, 'secondary');
        const returnID = returnOnSuccessID === 'contact' ? res?.deleteTeamPlayers?.contactsID : res?.deleteTeamPlayers?.teamsID;
        onClose(true, returnID ?? '', playerName);
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
    setInitials(getInitials(playerName));
  }, [playerName]);

  useEffect(() => {
    setProfileImage(image);
  }, [image]);

  const RemoveTeamsModalProps: ModalProps = {
    id: 'deleteTeamModal',
    isOpen,
    onClose: () => { onClose(false); },
    onConfirm,
    header: t('removeTeamPlayerModalHeader') ?? '',
    paragraph: `${t('removeTeamPlayerModalPara1')} ${playerName} ${t('removeTeamPlayerModalPara2')} "${teamName}"?`,
    closeButtonText: t('cancelTeamCreationButton') ?? '',
    confirmButtonText: t('removeTeamPlayerConfirmText') ?? '',
    imageRatio: 'half',
    error,
    disableForm,
    leftPanelImage: profileImage === undefined || profileImage === '' ? <InitialsAvatar size='huge' initials={initials} /> : profileImage
  };
  return (<Modal {...RemoveTeamsModalProps}/>);
};

export const MemorizedRemoveTeamPlayerModal = memo(RemoveTeamPlayerModal);
