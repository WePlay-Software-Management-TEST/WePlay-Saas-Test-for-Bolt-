import React from 'react';
import Lottie from 'lottie-react';
import RegistrationLoadingAnimation from 'assets/lottie/RegistrationLoading.json';

interface DashboardLoadingProps {
  children?: JSX.Element | JSX.Element[]
  isLoading?: boolean
  className?: string
}

function DashboardLoading ({ children, isLoading = true, className = '' }: DashboardLoadingProps): JSX.Element {
  return (
    <>
    {
    isLoading
      ? <div className={`flex h-[80vh] w-full justify-center items-center ${className}`}>
      <Lottie
      animationData={RegistrationLoadingAnimation}
      loop={true}
      width={240}
      height={240}
      className='w-[300px] h-[300px]'/>
      </div>
      : children
    }
    </>
  );
};

export default DashboardLoading;
