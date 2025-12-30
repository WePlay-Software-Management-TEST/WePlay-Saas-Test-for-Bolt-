import React from 'react';
import { ReactComponent as ArrowLeft } from 'assets/svgs/Arrow_left.svg';

/**
 * Renders a skeleton mobile overlay component.
 *
 * @param modalID - The ID of the modal.
 * @param children - The child elements to render inside the component (Modal).
 * @returns The JSX element representing the skeleton mobile overlay.
 */
export function SkeletonMobileOverlay ({ modalID, children }: { modalID: string, children: JSX.Element }): JSX.Element {
  return <>
    <input type="checkbox" id={modalID} className="modal-toggle" />
    <div className='modal modal-bottom bg-transparent'>
      <div className='modal-box flex w-full flex-col py-2 px-4 max-h-[calc(100%-56px)] h-full'>
        <div className='flex w-full justify-between items-start gap-2'>
          <label htmlFor={modalID} data-cy='buttonForFilter' className='mt-2'>
            <ArrowLeft className='fill-grey-10 stroke-grey-10' />
          </label>
          {children}
        </div>
      </div>
    </div>
  </>;
};
