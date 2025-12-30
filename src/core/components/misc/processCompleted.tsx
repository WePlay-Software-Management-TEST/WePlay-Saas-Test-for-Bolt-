import React from 'react';
import Lottie from 'lottie-react';

export interface ProcessCompletedProps {
  header: string
  paragraph: string
  lottieInfo?: unknown
  Image?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined }>
  isLottie: boolean
}
function ProcessCompleted (props: ProcessCompletedProps): JSX.Element {
  const { header, paragraph, lottieInfo, Image, isLottie } = props;

  return (
    <section
    className='
    col-span-9 xs:row-span-5
    bg-white w-full h-full flex
    justify-center items-center content-center'>
      <div className='bg-transparent flex flex-col gap-4 justify-center items-center'>
        {
        isLottie
          ? <Lottie
          animationData={lottieInfo}
          loop={true}
          width={240}
          height={240}
          className='w-[240px] h-[240px]'/>
          : <>
          { Image !== undefined && <Image />}
        </>
        }
        <h1
        className='mt-12
        font-semibold text-[48px] mobile:text-[32px] leading-[58px]

        text-center text-grey-10 pb-2 mobile:leading-7'>{header}</h1>

        <h4
        className='
        font-normal text-base mobile:text-sm
        leading-6 mobile:leading-normal text-center w-[440px] mobile:w-[300px] text-grey-40'>
          {paragraph}</h4>
      </div>
    </section>
  );
};

export default ProcessCompleted;
