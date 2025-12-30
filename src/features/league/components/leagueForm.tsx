import React, { useCallback, useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactComponent as ArrowLeft } from 'assets/svgs/Arrow_left.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'core/components/button/button';
import { ReactComponent as AllDoneBtn } from 'assets/svgs/Done_all_round.svg';
import { type LeagueFormType } from 'features/tournament/models/tournamentForm.model';
import { LeagueInitialDetails } from './leagueInitialDetails';
import { DefaultLeagueForm } from 'features/tournament/models/tournament.const';
import { TournamentAccordion } from 'features/tournament/components/accordion';

export function LeagueForm (): JSX.Element {
  const methods = useForm<LeagueFormType>({
    defaultValues: DefaultLeagueForm,
    reValidateMode: 'onChange',
    mode: 'onChange'
  });
  const { t: translate } = useTranslation(['league'], { keyPrefix: 'form' });
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();

  const incrementStep = useCallback((): void => { setStep((prev) => prev + 1); }, []);
  const updateStep = useCallback((newStep?: number): void => { if (newStep !== undefined) setStep(newStep); }, []);
  const decrementStep = useCallback((): void => { setStep((prev) => prev - 1); }, []);

  const transition = useCallback((): string => {
    switch (step) {
      case 3: return 'grid-rows-auto-4 grid-cols-2';
      case 4: return 'grid-rows-auto-3 grid-cols-3 mobile:grid-cols-2';
      case 5: return 'grid-rows-auto-2 grid-cols-4 mobile:grid-cols-2';
      default: return 'grid-rows-auto-5 grid-cols-1 mobile:grid-cols-2';
    }
  }, [step]);

  const createLeague = async (): Promise<boolean> => {
    const form = methods.getValues();
    return !!(form.leagueName?.trim() && form.leagueDesc?.trim());
  };

  const isLeagueValid = (): boolean => {
    const form = methods.getValues();
    return !!(
      form.leagueName?.trim()
    );
  };

  return (
    <FormProvider {...methods}>
      <section className='flex flex-col w-full h-full p-6 gap-8'>
        <span className='flex w-full justify-between items-center'>
            <Button
                type='primary'
              size='small'
              Icon={ArrowLeft}
              onClickCallable={step > 1 ? decrementStep : () => { navigate(-1); }}
              text={step > 1 ? translate('goBackBtn') : translate('cancelChangesBtn')}
            />
            <Button
                type='primary'
              Icon={AllDoneBtn}
              onClickCallable={() => { void createLeague(); }}
              isDisabled={step < 2 || !isLeagueValid()}
              size='small'
              text={translate('createBtn')}
            />
        </span>
        <LayoutGroup>
          <motion.div layout layoutRoot transition={{ duration: 0.3, ease: 'easeIn' }} className={`grid ${transition()} gap-4`}>
            <TournamentAccordion
              setStep={updateStep} step={step} stepOpen={1} stepComplete={2}
              stepName={translate('gettingStartedStep.title')}
              stepDescription={translate('gettingStartedStep.paragraph')}>
              <LeagueInitialDetails incrementStep={incrementStep}/>
            </TournamentAccordion>
          </motion.div>
        </LayoutGroup>
      </section>
    </FormProvider>
  );
}
