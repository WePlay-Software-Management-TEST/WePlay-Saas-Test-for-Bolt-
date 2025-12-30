import React from 'react';
import { useTranslation } from 'react-i18next';

function RegistrationSidePanel (): JSX.Element {
  const { t } = useTranslation(['registration']);
  return (
    <div
    className='
    relative mobile:flex bg-gradient-to-tr from-[#1802A7]
    from-30% to-secondary col-span-4
    lg:h-full md:h-[220px] min-h-[220px] mobile:min-h-[125px] mobile:h-16 flex items-center overflow-hidden'>
      <div className='bg-registration_sidepanel_bg bg-cover bg-repeat-y overflow-hidden h-full w-17 self-start' ></div>
      <section className='absolute m-auto left-0 right-0 flex flex-col gap-11 mobile:gap-6 items-center'>
      <div className="bg-registration_sidepanel_logo h-[56px] mobile:h-[44px] w-[362px] bg-no-repeat bg-contain mobile:bg-center"></div>
      <p className='text-white body-md-text mobile:text-[14px]'>{t('sidePanelText')}</p>
      </section>
    </div>
  );
}

export default RegistrationSidePanel;
