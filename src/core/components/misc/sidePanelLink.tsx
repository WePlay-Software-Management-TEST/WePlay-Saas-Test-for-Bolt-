import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidePanelLinkProps {
  isNavigate: boolean
  tooltipText: string
  onClickCallable?: () => void
  text: string
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined }>
  navigateTo?: string
  dataCy?: string
};

function SidePanelLink (props: SidePanelLinkProps): JSX.Element {
  const { tooltipText, onClickCallable, text, Icon, navigateTo, isNavigate } = props;

  return (
    <div
    data-cy={props?.dataCy ?? ''}
    className='
    !bg-grey-10
    flex
    lg:tooltip
    lg:tooltip-info
    lg:tooltip-right
    lg:after:delay-0
    lg:after:duration-0
    lg:before:delay-0
    g:before:duration-0
    lg:hover:before:  opacity-75
    p-0 lg:hover:before:px-3
    lg:hover:before:py-2
    lg:hover:before:rounded-md
    focus:border
    '
    data-tip={ tooltipText }>
    {
      isNavigate
        ? (
        <NavLink
            to={navigateTo ?? ''}
            target={navigateTo?.startsWith('http') ? '_blank' : undefined}
            rel={navigateTo?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={({ isActive }) => {
              return `
              btn 
              lg:btn-square 
              hover:bg-grey-20 
              lg:text-[0px] 
              xs:justify-start 
              lg:justify-center 
              xs:gap-2 lg:gap-0 
              !w-full 
              border-0 
              body-md-text 
              normal-case 
              text-white
              focus:border-blue-60  
              focus:border-2
              ${isActive ? 'bg-secondary hover:bg-secondary' : 'bg-transparent'}`;
            }
            }>
          <Icon />
          { text }
        </NavLink>
          )
        : (
          <button
          onClick={onClickCallable}
          className="
          focus:border-blue-60
            focus:border-2
          btn lg:btn-square lg:text-[0px]
          hover:bg-grey-20 xs:justify-start
          lg:justify-center xs:gap-2 lg:gap-0
          bg-transparent !w-full border-0 body-md-text
          text-white active:bg-secondary normal-case">
    <Icon />
    { text }
  </button>
          )
      }
    </div>
  );
};

export default SidePanelLink;
