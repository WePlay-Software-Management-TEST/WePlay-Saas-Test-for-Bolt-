import React, { memo } from 'react';
import Button from 'core/components/button/button';
import { ReactComponent as CancelIcon } from 'assets/svgs/cancel.svg';
import { type ButtonProps } from 'core/models/button.model';

/**
 * Renders a secondary type modal.
 * This modal contains a header, a main button, and a cancel button, and can contain any other children within.
 * @param header The header text of the modal.
 * @param mainButtonProps The props for the main button of the modal.
 * @param children The children of the modal.
 * @returns The JSX element representing the secondary modal.
 */
function Modal ({
  header,
  id,
  mainButtonProps,
  children,
  onCancel
}: {
  header: string
  id: string
  mainButtonProps: ButtonProps
  children?: React.ReactNode
  onCancel?: () => void
}): JSX.Element {
  return (
    <>
    <input type="checkbox" id={id} className="modal-toggle" />
    <div className="modal">
  <div className="modal-box !max-w-fit rounded-2xl relative p-6 flex flex-col">
    <div className='flex justify-between items-center pb-6'>
    <h3 className="font-semibold text-3xl text-grey-20">{header}</h3>
    <label htmlFor={id} className="btn btn-sm btn-circle outline-none border-none bg-transparent">
      <CancelIcon />
    </label>
    </div>
    {children}
    <div className='flex w-full justify-end gap-2 h-[40px]'>
      <Button type='tertiary' htmlFor={id} buttonHtmlTag='label' size='small' onClickCallable={onCancel} text='Cancel'></Button>
      <Button
        {...mainButtonProps}
        type='primary'
        size='small'
        />
    </div>
  </div>
</div>
</>
  );
};

/**
 * Renders a memoized secondary type modal.
 * This modal contains a header, a main button, and a cancel button, and can contain any other children within.
 * @param header The header text of the modal.
 * @param mainButtonProps The props for the main button of the modal.
 * @param children The children of the modal.
 * @returns The JSX element representing the secondary modal.
 * @example
 * <label htmlFor='modal'>Open Modal</label>
 * <SecondaryModal header='Modal Header' id='modal' mainButtonProps={{ text: 'Main Button', onClick: () => console.log('Main Button Clicked') }}>
 * </SecondaryModal>
 */
export const SecondaryModal = memo(Modal);
