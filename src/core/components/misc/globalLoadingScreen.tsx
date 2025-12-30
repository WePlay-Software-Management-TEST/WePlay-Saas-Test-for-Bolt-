import React from 'react';
import { ReactComponent as WePlayBlackLogo } from 'assets/svgs/WeplayBlackLogo.svg';
import Lottie from 'lottie-react';
import RegistrationLoadingAnimation from 'assets/lottie/RegistrationLoading.json';

function GlobalLoadingScreen (): JSX.Element {
  return (
    <section
      className='
      col-span-full xs:row-span-5
      bg-white w-full h-full flex justify-center items-center content-center'>
        <div
          className='bg-transparent flex flex-col xl:gap-4 lg:gap-1 justify-center items-center'>
          <Lottie
          animationData={RegistrationLoadingAnimation}
          loop={true}
          width={240}
          height={240}
          className='w-[240px] h-[240px]'/>
          <WePlayBlackLogo />
        </div>
    </section>
  );
};

export default GlobalLoadingScreen;
