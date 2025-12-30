import React, { useMemo } from 'react';
import { type ModalProps } from 'core/models/modal.model';
import { type ButtonProps } from 'core/models/button.model';
import Button from '../button/button';
import { ReactComponent as ModalGraphics } from 'assets/svgs/modalGraphics.svg';
import bottomLeftGraphicsModal from 'assets/images/bottomLeftGraphicsModal.png';

function Modal ({
  id,
  isOpen,
  onClose,
  onConfirm,
  header,
  paragraph,
  closeButtonText,
  confirmButtonText,
  leftPanelImage,
  imageRatio,
  children,
  error,
  disableForm
}: ModalProps): JSX.Element {
  const dialogClass = `
  modal modal-bottom sm:modal-middle mobile:modal-middle 
  modal-open 
  justify-center
  !bg-black !bg-opacity-60  w-full h-full`;
  const confirmButtonProps: ButtonProps = {
    text: confirmButtonText ?? '',
    type: 'primary',
    asyncOnClick: async () => { await onConfirm?.(); },
    size: 'small',
    isDisabled: disableForm,
    cyData: 'modalConfirmButton'
  };

  const closeButtonProps: ButtonProps = {
    text: closeButtonText ?? '',
    type: 'tertiary',
    onClickCallable: onClose,
    isDisabled: disableForm,
    cyData: 'modalCloseButton'
  };

  const imageRatioClass = (
    imageRatio !== undefined
      ? (
          imageRatio === 'half'
            ? 'w-1/2'
            : 'w-1/3'
        )
      : 'w-1/3'
  );

  const ModalMemo = useMemo(() => {
    return (
    <dialog
      id={id}
      className={`${dialogClass} ${isOpen ? 'flex' : 'hidden'}` }>
        <form method="dialog"
        className="modal-box mobile:flex-col mobile:justify-between mobile:content-center
        flex p-0 m-0 !max-w-[960px] lg:w-[800px] md:w-[680px] xs:w-[500px] mobile:w-[312px]
        mobile:!max-w-[616px] mobile:rounded-[16px] mobile:max-h-[95%]">
          {
            children === undefined
              ? <>
                <div className={`h-[600px] mobile:h-[235px] mobile:w-full mobile:bg-contain
                mobile:object-center ${imageRatioClass} overflow-hidden mobile:min-h-[160px] relative`} >
                {
                  typeof leftPanelImage === 'string'
                    ? <img className='w-full h-full bg-contain object-cover object-center
                    scale-110'
                     src={leftPanelImage} />
                    : <div className='w-full h-full bg-dodger-blue-98 flex justify-center
                     items-center'>
                      { leftPanelImage }
                    </div>
                }
                <img src={bottomLeftGraphicsModal} className='absolute left-1 top-[82%]' loading='eager'/>
                </div>
                <div className={`relative flex flex-col mobile:w-full mobile:justify-center mobile:min-h-[360px] items-center ${imageRatio !== undefined && imageRatio === 'half' ? 'w-1/2' : 'w-2/3'} overflow-hidden`}>
                <ModalGraphics className='left-1 top-1 self-end mobile:relative mobile:-mr-13 mobile:-mt-13'/>
              <div className='flex flex-col items-center pt-12 mobile:pt-0 mobile:py-[76px]'>
              <h4 className='font-semibold text-grey-20 leading-8 pb-4 mobile:text-2xl text-center'>{header}</h4>
              <h6 data-cy='modalParagraph'
              className='body-xs-text text-center leading-6 w-[300px] mobile:w-[280px] text-grey-20 mobile:text-xs'>{paragraph}</h6>
              <div className='flex flex-col pt-12 gap-2 mobile:gap-1'>
              {confirmButtonText !== '' && <Button {...confirmButtonProps}/>}
              {closeButtonText !== '' && <Button {...closeButtonProps}/>}
              {error !== '' && error !== undefined &&
              <p
              className='body-xxs-text text-indictor-error px-2 text-center pt-2'>
                {error}
                </p>
              }
              </div>
              </div>
            </div>
              </>
              : children
          }
        </form>
      </dialog>);
  }, [isOpen, error, disableForm, children]);

  return (
  <>
  {
     ModalMemo
  }
  </>
  );
};

export default Modal;
