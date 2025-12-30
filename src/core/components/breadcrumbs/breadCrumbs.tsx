import React, { useMemo } from 'react';
import { ReactComponent as ArrowLeft } from 'assets/svgs/Arrow_left.svg';
import { NavLink } from 'react-router-dom';
import { type BreadCrumbsProps } from 'core/models/breadcrumbs.model';

function BreadCrumbs (props: BreadCrumbsProps): JSX.Element {
  const { links } = props;

  const breadCrumbs = useMemo((): JSX.Element => {
    return (
    <>
      <li data-cy='back-button-breadcrumb' className='mr-1'>
      <NavLink to={links.length > 1 ? links[links.length - 2]?.path : links[links.length - 1]?.path} end>
        <ArrowLeft className='fill-grey-10 stroke-grey-10' />
      </NavLink>
    </li>
    {
      links.map((link, index) => {
        if (index === links.length - 1) {
          return (
          <li key={index} className={
            `text-sm font-bold ${links.length <= 1 ? 'before:!border-0 mobile:before:!hidden mobile:pl-2' : ''}`
            } data-cy='last-child-breadcrumb'>
          {link.name}
          </li>
          );
        }
        return (
          <li key={index} className=
          {
            `${index !== 0 ? '' : 'before:!border-0 mobile:before:!hidden mobile:pl-2'}`
          }
          data-cy='child-breadcrumb'>
            <NavLink to={link?.path} className='text-sm font-normal' end>{link?.name}</NavLink>
          </li>
        );
      })
    }
    </>
    );
  }, [links]);

  if (!(links.length >= 1 && links.length < 8)) {
    console.error('Links Prop length should be between 1 & 8');
    return <></>;
  };

  return (
    <div className="breadcrumbs flex w-full justify-start" data-cy='main-breadcrumbs-container'>
    <ul>
      { breadCrumbs }
    </ul>
  </div>
  );
};

export default BreadCrumbs;
