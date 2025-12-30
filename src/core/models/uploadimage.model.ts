import { type UseFormSetValue } from 'react-hook-form';

export interface PreviewFile extends File {
  preview?: string
  fileName: string
  path: string
}

export interface ImageUploadProps {
  placeholder?: string
  requirementText?: string
  id?: string
  cyDataInput?: string
  cyDataDraggable?: string
  formFieldName: string
  setValue: UseFormSetValue<any>
  filesPreview?: PreviewFile[]
  removeCaptionText?: boolean
  defaultPreviewUrl?: string
}
