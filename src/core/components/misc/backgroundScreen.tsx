import React from 'react';
import { ReactComponent as Ellipse } from 'assets/svgs/Ellipse.svg';
import { ReactComponent as Highlight } from 'assets/svgs/Highlight.svg';

function BackgroundScreen ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  return (
  <section className="bg-blue-20 h-screen w-screen overflow-hidden flex justify-center
  content-center items-center">
        <div className='max-w-[1920px] w-screen h-screen max-h-[1080px] flex justify-center
        relative content-center items-center'>
        <Ellipse className='absolute  left-[0%] right-[88%] top-[0%] bottom-[88%]' />
        <Ellipse className='absolute left-[18%] right-[73%] top-[94%] bottom-[-5%]
         -rotate-45'/>
        <Ellipse className='absolute left-[90%] right-[-6%] top-[90%] bottom-[-5%]
         rotate-180'/>
        <Highlight className='absolute left-[0%] top-[80%]'/>
        <Highlight className='absolute left-[88%] top-[0%] rotate-180'/>
      <section className="z-10 flex w-full h-screen justify-center content-center
       items-center bg-transparent">
        <div className='z-10 mobile:flex mobile:flex-col mobile:overflow-y-scroll
         xl:w-[1280px] xl:h-[675px] my-20 mobile:m-0 lg:w-[973px] lg:h-[583px]
          xs:w-[610px] xs:h-[calc(100vh-100px)] mobile:h-full bg-base-100 rounded-[20px]
           mobile:border-0 mobile:rounded-none overflow-hidden grid xs:grid-cols-1
            lg:grid-cols-9 xs:grid-rows-5 lg:grid-rows-1 border-2 shadow-inner
             border-grayscales-grey-90'>
        {children}
        </div>
      </section>
      </div>
      </section>
  );
};
export default BackgroundScreen;
