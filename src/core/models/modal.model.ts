export interface ModalProps {
  id: string
  isOpen: boolean
  onClose?: () => void
  onConfirm?: (() => void) | (() => Promise<void>)
  confirmButtonText?: string
  closeButtonText?: string
  header?: string
  paragraph?: string | JSX.Element
  leftPanelImage?: string | JSX.Element
  imageRatio?: 'half' | 'quarter'
  children?: JSX.Element | JSX.Element[]
  error?: string
  disableForm?: boolean
};
