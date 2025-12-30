import React, { useMemo } from 'react';
import { type ModalProps } from 'core/models/modal.model';
import Modal from 'core/components/modal/modal';

interface UseModalsReturnType {
  ConfirmModal: JSX.Element
  CloseModel: JSX.Element
}

interface UseModalsProps {
  isCloseModalOpen: boolean
  isConfirmModalOpen: boolean
  closeModalOnClose: () => void
  closeModalOnConfirm: (() => void) | (() => Promise<void>)
  closeModalHeader: string
  closeModalParagraph: string
  closeModalOnCloseButtonText: string
  closeModalOnConfirmButtonText: string
  closeModalImage: string | JSX.Element | undefined
  confirmModalOnClose: () => void
  confirmModalOnConfirm: (() => void) | (() => Promise<void>)
  confirmModalHeader: string
  confirmModalParagraph: string | JSX.Element
  confirmModalOnCloseButtonText: string
  confirmModalOnConfirmButtonText: string
  confirmModalImage: string | JSX.Element | undefined
  confirmModalError: string
  confirmModalDisable: boolean
}
export function useModals ({
  isCloseModalOpen, isConfirmModalOpen, closeModalOnClose,
  closeModalOnConfirm, confirmModalOnClose, confirmModalOnConfirm,
  closeModalHeader, closeModalImage, closeModalOnCloseButtonText,
  confirmModalDisable, confirmModalError, closeModalOnConfirmButtonText,
  closeModalParagraph, confirmModalHeader, confirmModalImage,
  confirmModalOnCloseButtonText, confirmModalOnConfirmButtonText, confirmModalParagraph
}: UseModalsProps): UseModalsReturnType {
  const cancelModalPropsRef = useMemo<ModalProps>(() => {
    return {
      id: 'cancelPlayerCreation',
      isOpen: isCloseModalOpen,
      onClose: closeModalOnClose,
      onConfirm: closeModalOnConfirm,
      header: closeModalHeader,
      paragraph: closeModalParagraph,
      closeButtonText: closeModalOnCloseButtonText,
      confirmButtonText: closeModalOnConfirmButtonText,
      leftPanelImage: closeModalImage,
      imageRatio: 'half'
    };
  }, [isCloseModalOpen]);

  const confirmModalProps = useMemo<ModalProps>(() => {
    return {
      id: 'confirmPlayerCreation',
      isOpen: isConfirmModalOpen,
      onClose: confirmModalOnClose,
      onConfirm: confirmModalOnConfirm,
      header: confirmModalHeader,
      paragraph: confirmModalParagraph,
      closeButtonText: confirmModalOnCloseButtonText,
      confirmButtonText: confirmModalOnConfirmButtonText,
      imageRatio: 'half',
      error: confirmModalError,
      disableForm: confirmModalDisable,
      leftPanelImage: confirmModalImage
    };
  }, [confirmModalError, confirmModalDisable, isConfirmModalOpen]);

  return {
    CloseModel: <Modal {...cancelModalPropsRef} />,
    ConfirmModal: <Modal {...confirmModalProps}/>
  };
};
