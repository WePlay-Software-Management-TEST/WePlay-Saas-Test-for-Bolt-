import React, { useEffect, useState } from 'react';
import { ReactComponent as ScreenWarning } from 'assets/svgs/screenSizeWarning.svg';
import { useTranslation } from 'react-i18next';

interface Size {
  width: number
  height: number
}

function ScreenSizeWarning (): JSX.Element {
  const [size, setSize] = useState<Size>(
    {
      width: window.innerWidth,
      height: window.innerHeight
    });

  const { t } = useTranslation(['warning']);

  const resizeHanlder = (): void => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    setSize({
      width: windowWidth,
      height: windowHeight
    });
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHanlder);

    return () => {
      window.removeEventListener('resize', resizeHanlder);
    };
  }, []);

  if (size?.width >= 360) {
    return <></>;
  } else {
    return (
    <div
    className='z-50 absolute w-screen h-screen
    bg-black backdrop-opacity-40 top-0 bg-opacity-80'>
      <div
      className='w-full h-full flex flex-col justify-center
      items-center content-center gap-14'>
      <ScreenWarning />
      <h1
      data-cy='warningScreenHeader'
      className='text-white font-semibold text-3xl leading-6 text-center'>
        {t('warningHeader')}
      </h1>
      <p
      data-cy='warningScreenParagraph'
      className='text-white font-normal text-[18px] leading-7 text-center px-10'>
        {t('warningParagraph')}
      </p>
      </div>
    </div>
    );
  }
};

export default ScreenSizeWarning;
