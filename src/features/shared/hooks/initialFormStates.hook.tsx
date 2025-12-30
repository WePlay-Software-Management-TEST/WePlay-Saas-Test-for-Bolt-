import { useState, type Dispatch, type SetStateAction } from 'react';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import { useMatches } from 'react-router';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { type CustomUseMataches } from 'core/models/breadcrumbs.model';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { type UserAttributesState } from 'core/models/userContext.model';
import { type ImageCacheContextType } from 'core/context/imageCacheContext/imageCacheContext.models';

interface UseInitialFormStatesReturnType {
  user: UserAttributesState
  cancelDialogisOpen: boolean
  setCancelDialogisOpen: Dispatch<React.SetStateAction<boolean>>
  confirmDialogisOpen: boolean
  setConfirmDialogisOpen: Dispatch<React.SetStateAction<boolean>>
  removeProfileDialogOpen: boolean
  setRemoveProfileDialogOpen: Dispatch<React.SetStateAction<boolean>>
  navigate: NavigateFunction
  imageCache: ImageCacheContextType
  modalError: string
  setModalError: Dispatch<SetStateAction<string>>
  disableModal: boolean
  setDisableForm: Dispatch<React.SetStateAction<boolean>>
  matches: CustomUseMataches[]
}
export function UseInitialFormStates (): UseInitialFormStatesReturnType {
  const { user } = useAuthContext();
  const [cancelDialogisOpen, setCancelDialogisOpen] = useState(false);
  const [confirmDialogisOpen, setConfirmDialogisOpen] = useState(false);
  const [removeProfileDialogOpen, setRemoveProfileDialogOpen] = useState(false);
  const navigate = useNavigate();
  const imageCache = useImageCache();
  const matches: CustomUseMataches[] = useMatches() as CustomUseMataches[];
  const [modalError, setModalError] = useState('');
  const [disableModal, setDisableForm] = useState(false);

  return {
    user,
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
  };
};
