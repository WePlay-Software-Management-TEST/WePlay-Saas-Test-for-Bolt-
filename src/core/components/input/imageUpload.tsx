import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop, type PixelCrop } from 'react-image-crop';
import Button from '../button/button';
import Modal from '../modal/modal';
import { type PreviewFile, type ImageUploadProps } from 'core/models/uploadimage.model';
import { useDropzone, type FileError } from 'react-dropzone';
import { ReactComponent as UploadImage } from 'assets/svgs/uploadIcon.svg';
import { ReactComponent as EditIcon } from 'assets/svgs/Edit.svg';
import { minImageSize, maxImageSize, acceptedFileType } from 'core/context/global.const';
import { useTranslation } from 'react-i18next';
import { canvasPreview, getSafariMaxWH } from 'core/utils/helpers';
import 'react-image-crop/dist/ReactCrop.css';
import { ReactComponent as CancelButton } from 'assets/svgs/cancel.svg';
import { isSafariBrowser } from 'core/context/regex.const';

function centerAspectCrop (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): any {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 40
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function ImageUpload (props: ImageUploadProps): JSX.Element {
  const {
    id,
    cyDataInput,
    cyDataDraggable,
    formFieldName,
    setValue,
    filesPreview,
    removeCaptionText = false,
    defaultPreviewUrl
  } = props;

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [maxCanvasWidth, setMaxCanvasWidth] = useState(4096);
  const [maxCanvasHeight, setMaxCanvasHeight] = useState(4096);
  const [crop, setCrop] = useState<Crop>();
  const [openCropperModal, setOpenCropperModal] = useState(false);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [croppedImage, setCroppedImage] = useState<PreviewFile | undefined>(
    filesPreview !== undefined ? filesPreview[0] : undefined
  );
  const [firstUploadFlag, setFirstUploadFlag] = useState<boolean>(filesPreview === undefined);
  const { t } = useTranslation(['player']);

  const imageValidator = useCallback((file: File): FileError | FileError[] | null => {
    if (file.size > maxImageSize) {
      return { code: 'file-too-big', message: t('playerImageSizeBigErr') };
    }
    if (file.size < minImageSize) {
      return { code: 'file-too-small', message: t('playerImageSizeSmallErr') };
    }
    const fileExt = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!acceptedFileType.includes(fileExt)) {
      return { code: 'file-type-not-accepted', message: t('playerImageNotSupportedExtErr') };
    }
    return null;
  }, [t]);

  useEffect(() => {
    if (filesPreview === undefined) return;
    setFiles(filesPreview);
  }, [filesPreview]);

  // Decide which URL to show: local file or default preview
  const hasLocalFile = files.length > 0;
  const previewUrl = hasLocalFile ? files[0].preview : defaultPreviewUrl;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const CroppedFile: PreviewFile = {
      ...file as PreviewFile,
      preview: URL.createObjectURL(file)
    };
    setCroppedImage(CroppedFile);
    setValue(formFieldName, acceptedFiles);
    setOpenCropperModal(true);
  }, [formFieldName, setValue]);

  const { getRootProps, getInputProps, fileRejections, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    validator: imageValidator,
    noClick: true,
    noKeyboard: true
  });

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }, []);

  const onSaveCroppedImage = useCallback(async () => {
    if (!previewCanvasRef.current) throw new Error('Crop canvas does not exist');
    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) throw new Error('Failed to create blob');
      const url = URL.createObjectURL(blob);
      const CroppedFile: PreviewFile = {
        ...croppedImage as PreviewFile,
        preview: url
      };
      const image = new File([blob], croppedImage?.path ?? '');
      if (filesPreview === undefined) {
        setValue(formFieldName, [image], { shouldDirty: true, shouldTouch: true });
      } else {
        setValue(formFieldName, [], { shouldDirty: true, shouldTouch: true });
        setTimeout(() => { setValue(formFieldName, [image]); }, 100);
      }
      setFirstUploadFlag(false);
      setOpenCropperModal(false);
      setTimeout(() => { setFiles([CroppedFile]); }, 100);
    }, 'image/jpeg', 0.4);
  }, [croppedImage, formFieldName, filesPreview, setValue]);

  useEffect(() => {
    if (files.length >= 1) setCroppedImage(files[0]);
  }, [files]);

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
    }
  }, [completedCrop]);

  const onCloseCropperModal = (): void => {
    if (!croppedImage || firstUploadFlag) {
      setCroppedImage(undefined);
      setFiles([]);
      setValue(formFieldName, []);
    }
    setOpenCropperModal(false);
  };

  const ModalComponent = useMemo(() => {
    if (isSafariBrowser.test(navigator.userAgent)) {
      setMaxCanvasHeight(getSafariMaxWH(
        window.devicePixelRatio,
        imgRef.current?.naturalHeight ?? 1,
        imgRef.current?.height ?? 1
      ));
      setMaxCanvasWidth(getSafariMaxWH(
        window.devicePixelRatio,
        imgRef.current?.naturalWidth ?? 1,
        imgRef.current?.width ?? 1
      ));
    }
    return (
      <Modal id="cropperModal" isOpen={openCropperModal}>
        <div className="flex flex-col justify-center items-center w-full p-5 mobile:p-4">
          <div className="flex justify-between w-full">
            <h6 className="font-semibold text-grey-10 leading-7">
              {t('cropImageHeaderModal')}
            </h6>
            <button
              onClick={onCloseCropperModal}
              data-cy="closeDialogHeaderButton"
              className="p-2 text-grey-70 text-base"
              type="button"
            >
              <CancelButton />
            </button>
          </div>
          <ReactCrop
            crop={crop}
            data-cy="reactCrop"
            onChange={(_, pCrop) => { setCrop(pCrop); }}
            aspect={1}
            onComplete={c => { setCompletedCrop(c); }}
            maxHeight={maxCanvasHeight}
            maxWidth={maxCanvasWidth}
            className="rounded-box average:max-h-[700px] short:max-h-[450px] mobile:max-h-[400px]"
          >
            <img
              src={croppedImage?.preview}
              className="rounded-box"
              ref={imgRef}
              onLoad={onImageLoad}
              data-cy="croppingImage"
              alt="Cropped Profile Image"
            />
          </ReactCrop>
          <div className="flex justify-around w-full mobile:gap-4 mt-5 pb-5">
            <Button
              type="tertiary"
              text="Cancel"
              size="contain"
              onClickCallable={onCloseCropperModal}
              cyData="closeDialogFormButton"
              className="mobile:!w-16 !w-[240px]"
            />
            <Button
              type="primary"
              text="Save"
              size="contain"
              asyncOnClick={onSaveCroppedImage}
              cyData="confirmDialogButton"
              className="mobile:!w-16 !w-[240px]"
            />
          </div>
          <canvas ref={previewCanvasRef} data-cy="hiddenCanvas" className="hidden" />
        </div>
      </Modal>
    );
  }, [
    openCropperModal,
    croppedImage,
    crop,
    completedCrop,
    maxCanvasHeight,
    maxCanvasWidth,
    onImageLoad,
    t
  ]);

  return (
    <>
      <section className="flex flex-col items-center w-17 max-h-52 mobile:max-h-[352px] mobile:outline-0 mobile:h-auto mobile:w-auto">
        <div
          {...getRootProps()}
          data-cy={cyDataDraggable}
          onClick={open}
          className={`
            flex flex-col justify-center  
            ${files.length === 0 && !defaultPreviewUrl ? 'outline-2' : 'outline-0'} 
            rounded-lg outline-dashed outline-grey-70 h-17 w-17
            mobile:w-full mobile:h-[328px]
            items-center gap-3 hover:bg-dodger-blue-90 
            hover:outline-dodger-blue-70 duration-200
            hover:cursor-pointer
          `}
        >
          <input
            {...getInputProps()}
            type="file"
            data-cy={cyDataInput}
            id={id}
          />

          {previewUrl
            ? (
            <div className="relative w-full h-full rounded-lg" data-cy="previewImage">
              <img
                src={previewUrl}
                data-cy="previewImgTag"
                className="w-full h-full rounded-lg bg-cover bg-center"
                onLoad={() => {
                  if (hasLocalFile) URL.revokeObjectURL(previewUrl);
                }}
              />
              <button
                className="
                  absolute top-2 right-2
                  bg-white rounded-full w-9 h-9
                  flex justify-center items-center
                "
                data-cy="editImageButton"
                type="button"
              >
                <EditIcon />
              </button>
            </div>
              )
            : (
            <>
              <UploadImage />
              <p data-cy="placeholderText" className={`${removeCaptionText ? 'hidden' : ''} body-xxs-text text-center pt-2 text-grey-40 font-light`}>
                {t('uploadImagePlaceholder')}{' '}
                <a className="text-dodger-blue-60 hover:cursor-pointer">
                  {t('uploadImageAnchor')}
                </a>
              </p>
            </>
              )}
        </div>

        {fileRejections.length === 0
          ? null
          : (
          <p data-cy="errorText" className="body-xxs-text text-center pt-2 text-indictor-error font-light">
            {fileRejections[0].errors[0].message}
          </p>
            )}
      </section>
      {ModalComponent}
    </>
  );
}

export default ImageUpload;
