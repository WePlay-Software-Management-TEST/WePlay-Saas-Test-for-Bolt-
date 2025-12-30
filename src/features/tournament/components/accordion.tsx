import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as CheckMark } from 'assets/svgs/checkMark.svg';
import { useTranslation } from 'react-i18next';

interface AccordionProps {
  step: number
  stepOpen: number
  stepComplete: number
  stepName: string
  stepDescription: string
  children?: JSX.Element
  className?: string
  setStep?: (step: number) => void
}

interface GenericAccordionProps {
  title: string | JSX.Element
  children?: JSX.Element
  split?: boolean
}
/**
 * Renders a tournament accordion component with dynamic behavior based on the step status.
 *
 * @param step - The current step of the accordion.
 * @param stepComplete - The step that is considered complete.
 * @param stepOpen - The step that is currently open.
 * @param stepName - The name of the step.
 * @param stepDescription - The description of the step.
 * @param children - Optional JSX element to be rendered inside the accordion.
 *
 * @returns JSX element representing the tournament accordion component.
 */
export function TournamentAccordion (
  { step, stepComplete, stepOpen, stepName, stepDescription, children, className, setStep }: AccordionProps): JSX.Element {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form' });

  useEffect(() => {
    if (step === stepOpen) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    };

    if (step > stepOpen) {
      setIsDone(true);
    } else {
      setIsDone(false);
    };

    if (step < stepOpen) {
      setIsPending(true);
    } else {
      setIsPending(false);
    }
  }, [step]);

  const Title = (): JSX.Element => {
    return <>
      <div className={`flex items-start justify-between collapse-title p-0 min-h-0 ${isDone ? '-order-1' : ''}`}>
        <span data-cy='spanTitleAccordian' className={`flex justify-start gap-2 ${isPending ? 'flex-col items-start' : 'items-center'}`}>
          <span
          className='flex text-sm font-normal text-grey-40'>
            {!isSelected && isPending && <p>{`${translate('step')}`}&nbsp;</p>}
              <p data-cy='accordianTitle' className={`
              ${isPending ? 'text-sm font-semibold text-grey-40' : isDone ? 'font-semibold text-grey-40 text-base leading-5' : 'font-semibold text-grey-10 text-xl'}`}>
                { stepName }
              </p>
          </span>
        <span className={`flex items-center ${isPending ? 'gap-4' : '-order-1'}`}>
          <div className={`badge badge-lg w-7 h-7 mobile:w-6 mobile:h-6 ${isPending ? 'badge-neutral' : isDone ? 'bg-[#4BB54333] text-success' : 'badge-secondary'}`}>
            <span>
              {stepOpen}
            </span>
          </div>
              { isPending && <p data-cy='accordianParagraph' className='font-normal text-xl text-grey-10 text-left'>{stepDescription}</p>}
        </span>
        </span>
      </div>
    </>;
  };

  return (
    <motion.div
    transition={{ duration: 0.3, ease: 'easeIn' }}
    data-cy='tournamentAccordianCollapse'
    onClick={() => {
      if (isDone) {
        setStep?.(stepOpen);
      };
    }}
    className={`
      overflow-visible
      collapse border border-grey-90 mobile:p-4 ${className ?? ''}
      ${isDone ? 'p-4 sm:px-2 md:px-4 border-success max-h-[60px] flex justify-between items-center hover:cursor-pointer' : 'p-8'} 
      ${step <= stepComplete ? 'col-span-full' : 'col-span-1 mobile:col-span-full'} 
      ${isSelected ? 'collapse-open border-secondary' : 'collapse-close max-h-[133px]'}`}>
    <input type="radio" name="my-accordion-5" className={isDone ? 'hidden' : ''} />
    <Title />
    { isDone && <CheckMark data-cy='checkMarkDone' className='items-center self-center min-w-[14px] min-h-3 stroke-indictor-success'/>}
    <div data-cy='accordianChild' className={`${isDone ? 'hidden' : ''} collapse-content p-0`}>
      { children }
    </div>
  </motion.div>
  );
};

export function Accordion ({ title, children, split = false }: GenericAccordionProps): JSX.Element {
  return <>
  <div className={`collapse duration-100 collapse-arrow join-item !rounded-lg ${split ? '' : 'border-grey-90 border'}`}>
    <input type="radio" name="my-accordion-4" />
    <div className={`collapse-title text-xl body-sm-text text-grey-10 max-h-[32px] ${split ? 'border border-grey-90 bg-grey-98 rounded-lg' : ''}`}>
      { title }
    </div>
    <div className={`collapse-content ${split ? 'mt-4' : ''}`}>
      { children }
    </div>
  </div>
  </>;
};
