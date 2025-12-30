import React, { memo } from 'react';
import { type ButtonProps } from 'core/models/button.model';
import { useNavigate } from 'react-router-dom';
import Button from 'core/components/button/button';
import AuthorizedRoute from 'core/routeGuards/authorizedRoute';

interface EmptyStateDashboardProps {
  navigateTo: string
  buttonText: string
  header: string
  paragraph?: string | JSX.Element
  optionalPara?: string | JSX.Element
  image: string | JSX.Element
}
function EmptyStateDashboard ({ navigateTo, buttonText, image, paragraph, header, optionalPara }: EmptyStateDashboardProps): JSX.Element {
  const navigate = useNavigate();

  const createNewButton: ButtonProps = {
    type: 'primary',
    asyncOnClick: async () => { navigate(navigateTo); },
    text: buttonText,
    size: 'contain',
    cyData: 'createNewButton'
  };
  return (
    <>
    {
        <div className='flex flex-col h-full justify-center items-center'>
          {
            typeof image === 'string'
              ? <img
              src={image}
              className='average:w-auto short:pb-[56px] average:h-auto short:scale-1 short:-mb-12 bg-contain mobile:w-[236px]'/>
              : image
          }
          <h4 className='text-[48px] text-grey-10 mobile:text-[32px] mobile:leading-7 leading-[120%] text-center mobile:pt-10 pb-4 mobile:pb-2'>{header}</h4>
          {
            paragraph && <p className='text-[18px] mobile:text-[14px] text-grey-10 text-center mobile:pt-4 max-w-full'>{paragraph}</p>
          }
           {
            optionalPara &&
            <p className='text-[18px] mobile:text-[14px] mobile:text-wrap text-grey-10 text-center mobile:w-[328px] average:pb-12 short:pb-4'>
              {optionalPara}
            </p>
           }
          <div className='w-[400px] mobile:w-[328px] mobile:pt-12 pt-3'>
            <AuthorizedRoute id='team.create' type='authComps'><Button { ...createNewButton }/></AuthorizedRoute>
          </div>
      </div>
    }
    </>
  );
};

export default memo(EmptyStateDashboard);
