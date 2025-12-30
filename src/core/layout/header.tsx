import React, { memo } from 'react';
import { ReactComponent as MenuIcon } from 'assets/svgs/MenuIcon.svg';
import ProfileHeader from './ProfileHeader';
import { useMatches } from 'react-router-dom';
import { type CustomUseMataches } from 'core/models/breadcrumbs.model';

export function Header (): JSX.Element {
  const matches: CustomUseMataches[] = useMatches() as CustomUseMataches[];
  return (
  <section className='flex flex-col w-full'>
    <div
    className='
    flex justify-between items-center
    w-full h-14 mobile:h-12 px-6 mobile:px-4 bg-white border-b border-grey-90'>
      <div className='flex gap-6 mobile:gap-2 items-center'>
        <label
          htmlFor="my-drawer"
          className="mobile:h-0 mobile:w-auto btn btn-circle drawer-button mobile:bg-white lg:hidden bg-grey-98 border-0">
            <MenuIcon className='mobile:h-6 mobile:w-6'/>
        </label>
        <h5
        className='
        sm:text-[24px] lg:text-[28px] mobile:text-[16px]
        font-semibold leading-8 text-grey-60'>
          {matches[1]?.handle?.headerText}
        </h5>
      </div>
      <div>
          <ProfileHeader />
      </div>
    </div>
  </section>
  );
};

export const MemorizedHeader = memo(Header);
