import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../button/button';
import { ReactComponent as PageError } from 'assets/svgs/404Error.svg';
import { ReactComponent as ArrowLeft } from 'assets/svgs/Arrow_left.svg';
import { ReactComponent as ArrowRight } from 'assets/svgs/Arrow_right.svg';
import { useNavigate } from 'react-router-dom';
function PageNotFound (): JSX.Element {
  const { t } = useTranslation(['error'], { keyPrefix: 'pageNotFound' });
  const navigate = useNavigate();
  return (
   <div className='flex flex-col justify-center w-full h-screen items-center content-center gap-6'>
    <PageError />
    <h4 className='text-3xl text-grey-10 font-semibold'>{t('header')}</h4>
    <p className='text-lg font-normal text-grey-60 text-center'>{t('paragraph')}</p>
    <div className='flex gap-2'>
      <Button className='stroke-grey-10' text={t('goBackBtn')} cyData='goBack-btn' type='tertiary' iconPosition='left' showIcon Icon={ArrowLeft} onClickCallable={() => { navigate(-1); }} ></Button>
      <Button className='stroke-grey-10' text={t('goHomeBtn')} cyData='goHome-btn' type='tertiary' iconPosition='right' Icon={ArrowRight} showIcon onClickCallable={() => { navigate('/player'); }} ></Button>
    </div>
   </div>
  );
};

export default PageNotFound;
