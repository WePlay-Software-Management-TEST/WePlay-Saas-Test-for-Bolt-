import React from 'react';
import { type ButtonProps } from 'core/models/button.model';
import Button from 'core/components/button/button';
import { type ToastOptions, toast } from 'react-toastify';

export const ToastTypes = ['info', 'success', 'warning', 'error', 'secondary'] as const;
type ToastType = typeof ToastTypes[number];
/**
 * Render a toast message with a dismiss button.
 * @param text - The text content of the toast message.
 * @param type - The type of the toast message (info, success, warning, error, secondary).
 * @param closeToast - Function to close the toast message.
 */
const toastDismissMsg = (text: string, type?: ToastType, closeToast?: () => void, msgComponent?: JSX.Element): JSX.Element => {
  const backButtonProps: ButtonProps = {
    text: 'Dismiss',
    onClickCallable: closeToast as () => void,
    showIcon: false,
    type: 'tertiary',
    size: 'small',
    toast: true,
    cyData: 'dismissBtn'
  };
  let typeClass = 'bg-grey-10';
  switch (type) {
    case 'info':
      typeClass = 'bg-grey-10';
      break;
    case 'success':
      typeClass = 'bg-indictor-success';
      break;
    case 'error':
      typeClass = 'bg-indictor-error';
      break;
    case 'warning':
      typeClass = 'bg-indictor-warning';
      break;
    case 'secondary':
      typeClass = 'bg-secondary';
  }
  return <div className={`pl-4 mobile:px-3 mobile:pl-4 pr-7 gap-7 w-full h-12
  ${typeClass} flex justify-between overflow-auto h-max-content h-max mobile:py-1
  items-center content-center !rounded-lg`} data-cy='toastMessage'>
  <h1 data-cy='toastMsg' className='text-white text-left body-sm-text
   text-ellipsis whitespace-wrap overflow-auto'>
    { msgComponent === undefined ? text : msgComponent }
  </h1>
  <Button { ...backButtonProps } />
  </div>;
};

/**
 * Triggers a toast message to show, this function is used to trigger the global
 * Toasify component.
 * @param text - The text content of the toast message.
 * @param type - The type of the toast message (info, success, warning, error, secondary).
 * @param ToastOptions - Toastify Options, includes styles
 */
export function toastService (msg: string, type?: ToastType, option?: ToastOptions, msgComponent?: JSX.Element): void {
  const toastPosition = window.innerWidth > 480
    ? toast.POSITION.BOTTOM_LEFT
    : toast.POSITION.TOP_CENTER;

  if (option === undefined) {
    option = {
      position: toastPosition,
      hideProgressBar: true,
      closeButton: false
    };
  };

  toast(({ closeToast }) => toastDismissMsg(
    msg,
    type ?? 'info',
    closeToast,
    msgComponent
  ),
  { ...option }
  );
};
