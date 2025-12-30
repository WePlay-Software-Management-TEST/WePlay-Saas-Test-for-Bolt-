import React, { useCallback, useEffect, useState } from 'react';
import Button from 'core/components/button/button';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as ArrowLeft } from 'assets/svgs/Arrow_left.svg';
import { ReactComponent as DeleteButton } from 'assets/svgs/deleteSmall.svg';
import { TournamentAccordion } from './accordion';
import { motion, LayoutGroup } from 'framer-motion';
import { ReactComponent as AllDoneBtn } from 'assets/svgs/Done_all_round.svg';
import { useParams } from 'react-router-dom';
import { TournamentInitialDetails } from './tournamentInitialDetails';
import { TournamentType } from './tournamentType';
import { TournamentExtraDetails } from './tournamentExtraDetails';
import { TournamentAssignFields } from './tournamentAssignFields';
import { TournamentSchedule } from './tournamentSchedule';
import { type TournamentFormType } from '../models/tournamentForm.model';
import { type Contact, type Team } from 'graphql/table.models';
import DashboardLoading from 'core/layout/dashboardLoading';
import { FormProvider, useForm } from 'react-hook-form';
import { generateTourney } from 'core/utils/tourneyGenerator';
import { type Fields, type Tournaments, type TournamentRules } from 'API';
import { createTournamentRequest, deleteTourneyRequest, getTourney } from '../tournament.service';
import { useModals } from 'features/shared/hooks/useModals.hook';
import { UseInitialFormStates } from 'features/shared/hooks/initialFormStates.hook';
import { toastService } from 'core/services/toast.service';
import { getInitials } from 'core/utils/utils';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import cancelTournemnetCreateion from 'assets/images/CancelTournementImg.png';
import { tournamentDetailsForm, tournamentExtraDetailsDefaults, tournamentTypeFormDefaults } from '../models/tournament.const';
import { turnTourneyDBModelToTourneyForm } from '../shared/utils';

const watchForFields = ['image', 'leagueDesc', 'leagueName'];
export function TournamentForm (): JSX.Element {
  const noRefereesToastMsg = (): JSX.Element => {
    return <>
    You dont have Referees in your organization, Please add referees under
    {' '}
      <a href='/settings'>
        <u>Settings</u>
      </a>
    {' '}
    tab in the Sidepanel</>;
  };

  const { id } = useParams();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [alltourneyInfo, setAllTourneyInfo] = useState<{
    teams: Team[] | undefined
    tournamentRules: TournamentRules[]
    referees: Contact[]
    tournaments: Tournaments[]
    fields: Fields[]
    tourney?: TournamentFormType
    tourneyData?: Tournaments
  }>();

  useEffect(() => {
    void getTourney(id ?? '').then(async (res) => {
      const tourney = res?.getTournaments;
      const img: File | undefined = await imageCache.getImageFile(tourney?.tournamentImageId ?? '');
      const formTourney = turnTourneyDBModelToTourneyForm(tourney, img);

      if ((res?.listContacts.items ?? []).length === 0) {
        toastService('', 'secondary', undefined, noRefereesToastMsg());
      }
      setAllTourneyInfo({
        tourney: formTourney ?? undefined,
        tourneyData: tourney,
        teams: res?.listTeams.items,
        referees: res?.listContacts.items ?? [],
        fields: res?.listFields.items ?? [],
        tournaments: res?.listTournaments.items ?? [],
        tournamentRules: res?.listTournamentRules.items ?? []
      });
      setIsloading(false);
    });
  }, []);

  const methods = useForm<TournamentFormType>({
    defaultValues: alltourneyInfo?.tourney ?? {
      ...tournamentDetailsForm,
      ...tournamentTypeFormDefaults,
      ...tournamentExtraDetailsDefaults,
      id: undefined,
      reGenTourney: true
    },
    reValidateMode: 'onChange',
    mode: 'onChange',
    values: alltourneyInfo?.tourney
  });

  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form' });
  const [step, setStep] = useState<number>(1);

  const incrementStep = useCallback((): void => {
    setStep((prev) => prev + 1);
  }, []);

  const updateStep = useCallback((step?: number): void => {
    if (step === undefined) return;
    setStep(step);
  }, []);

  const decrementStep = useCallback((): void => {
    setStep((prev) => prev - 1);
  }, []);

  const generateTourneySchedule = async (): Promise<void> => {
    if (alltourneyInfo?.tourney !== undefined) {
      setStep((prev) => prev + 1);
      return;
    }
    const tourneyFromData = methods.getValues();

    const groups = generateTourney(tourneyFromData, alltourneyInfo?.tourney).groups;
    methods.setValue('groups', groups);
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (step !== 5 && alltourneyInfo?.tourney === undefined) return;
    const tourneyFromData = methods.getValues();

    const subscription = methods.watch((value, { name, type }) => {
      if (name === undefined) return;
      if (watchForFields.includes(name)) return;

      if (/groups./.test(name ?? '') || (name ?? '').includes('groups')) {
        return;
      };

      const groups = generateTourney(Object.assign(tourneyFromData, value), alltourneyInfo?.tourney).groups;
      methods.setValue('groups', groups);
    }
    );
    return () => { subscription.unsubscribe(); };
  }, [methods.watch, step, alltourneyInfo, methods]);

  const transition = useCallback((): string => {
    switch (step) {
      case 3:
        return 'grid-rows-auto-4 grid-cols-2';
      case 4:
        return 'grid-rows-auto-3 grid-cols-3 mobile:grid-cols-2';
      case 5:
        return 'grid-rows-auto-2 grid-cols-4 mobile:grid-cols-2';
      default:
        return 'grid-rows-auto-5 grid-cols-1 mobile:grid-cols-2';
    }
  }, [step]);

  const {
    cancelDialogisOpen,
    setCancelDialogisOpen,
    confirmDialogisOpen,
    setConfirmDialogisOpen,
    navigate,
    modalError,
    setModalError,
    disableModal,
    setDisableForm,
    imageCache
  } = UseInitialFormStates();

  const deleteTourney = async (): Promise<void> => {
    setDisableForm(true);
    await deleteTourneyRequest(alltourneyInfo?.tourney?.id ?? '', alltourneyInfo?.tourneyData?._version ?? 1).then((res) => {
      toastService(translate('modals.toastDelete'), 'secondary');
      navigate('/tournament');
    }).finally(() => {
      setDisableForm(false);
    });
  };

  const createTournament = async (): Promise<void> => {
    const form = methods.getValues();
    setDisableForm(true);
    try {
      const resData = await createTournamentRequest(
        form,
        alltourneyInfo?.tournamentRules ?? [],
        alltourneyInfo?.tourneyData,
        form?.type !== alltourneyInfo?.tourney?.type,
        methods.getFieldState('fieldsDetails').isDirty || form?.type !== alltourneyInfo?.tourney?.type,
        alltourneyInfo?.tourney,
        alltourneyInfo?.fields
      );
      if (resData?.imageId !== undefined) {
        void imageCache.updateImageFile(resData.imageId);
      }
      if (resData?.tournamentId !== undefined) {
        navigate(`/tournament/${resData?.tournamentId}`);
      }
      setDisableForm(false);
      toastService(`${form.leagueName ?? ''}${
        alltourneyInfo?.tourney === undefined
        ? translate('modals.toastCreation')
        : translate('modals.toastEdit')}`, 'secondary');
    } catch (err: any) {
      setDisableForm(false);
      setModalError('Something went Wrong!');
    }
  };

  const { CloseModel, ConfirmModal } = useModals(
    {
      isCloseModalOpen: cancelDialogisOpen,
      isConfirmModalOpen: confirmDialogisOpen,
      closeModalOnClose: () => { setCancelDialogisOpen(false); },
      closeModalOnConfirm: async (): Promise<void> => {
        if (alltourneyInfo === undefined) {
          toastService(translate('modals.toastCancel'), 'secondary');
          navigate('/tournament');
          return;
        }
        await deleteTourney();
      },
      closeModalHeader: alltourneyInfo?.tourney === undefined ? translate('modals.closeTourneyCreationHeader') : translate('modals.deleteTourneyCreationHeader'),
      closeModalParagraph: alltourneyInfo?.tourney === undefined ? translate('modals.closeTourneyCreationParagarph') : translate('modals.deleteTourneyCreationParagarph'),
      closeModalOnCloseButtonText: alltourneyInfo?.tourney === undefined ? translate('modals.cancelTourneyBtnText') : translate('modals.cancelTourneyBtnText'),
      closeModalOnConfirmButtonText: alltourneyInfo?.tourney === undefined ? translate('modals.cancelTourneyConfirmBtn') : translate('modals.deleteTourneyConfirmBtn'),
      closeModalImage: methods.getValues().image?.[0] === undefined
        ? cancelTournemnetCreateion
        : methods.getValues().image?.[0] !== undefined
          ? URL.createObjectURL(methods?.getValues()?.image?.[0] ?? new Blob())
          : <InitialsAvatar initials={getInitials(methods.getValues().leagueName)}
        size='huge'/>,
      confirmModalOnClose: () => { setConfirmDialogisOpen(false); },
      confirmModalOnConfirm: createTournament,
      confirmModalHeader: alltourneyInfo?.tourney === undefined ? translate('modals.createTourneyHeader') : translate('modals.editTourneyHeader'),
      confirmModalParagraph: <Trans
        t={translate}
        i18nKey={alltourneyInfo?.tourney === undefined ? 'modals.createTourneyParagraph' : 'modals.editTourneyParagraph'}
        values={{ tourneyName: methods.getValues().leagueName }} />,
      confirmModalOnCloseButtonText: translate('modals.closeBtnText'),
      confirmModalOnConfirmButtonText: alltourneyInfo?.tourney === undefined ? translate('modals.confirmBtnText') : translate('modals.editConfirmText'),
      confirmModalImage:
      methods.getValues().image?.[0] !== undefined
        ? URL.createObjectURL(methods?.getValues()?.image?.[0] ?? new Blob())
        : <InitialsAvatar initials={getInitials(methods.getValues().leagueName)}
        size='huge'/>,
      confirmModalError: modalError,
      confirmModalDisable: disableModal
    }
  );

  const isTourneyValid = (): boolean => {
    const form = methods.getValues();
    return !!(
      form.leagueName?.trim() &&
      form.startDate &&
      form.finishDate &&
      form.startTime &&
      form.daysOfMatches &&
      form.daysOfMatches.length > 0 &&
      form.endTime &&
      form.startDate < form.finishDate &&
      form.numOfFields &&
      form.numOfTeams
    );
  };

  return (
    isLoading
      ? <DashboardLoading />
      : <FormProvider {...methods}>
            <section className='flex flex-col w-full h-full px-6 mobile:px-4 py-6 gap-8 mobile:gap-4'>
            <span className='flex w-full justify-between items-center'>
                <span className='flex gap-8 mobile:gap-4'>
                  {step > 1
                    ? <Button
                    type='tertiary'
                    size='small'
                    className={`fill-grey-10 stroke-grey-10 ${step > 1 ? '' : 'hidden'}`}
                    Icon={ArrowLeft}
                    showIcon={true}
                    iconPosition='left'
                    isValidChecked={step > 1}
                    onClickCallable={decrementStep}
                    text={translate('goBackBtn')}
                  />
                    : <Button
                    type='tertiary'
                    size='small'
                    className={`fill-grey-10 stroke-grey-10 ${step <= 1 ? '' : 'hidden'}`}
                    Icon={ArrowLeft}
                    showIcon={true}
                    iconPosition='left'
                    showTextOnMobile={true}
                    onClickCallable={() => { navigate(-1); }}
                    text={translate('cancelChangesBtn')}
                  />}
                </span>
                <span className='flex gap-6 mobile:gap-4'>
                  <Button
                    className='text-indictor-error fill-indictor-error stroke-indictor-error mobile:border mobile:border-indictor-error'
                    Icon={DeleteButton}
                    showIcon={true}
                    iconPosition='right'
                    type='tertiary'
                    onClickCallable={() => { setCancelDialogisOpen(true); }}
                    size='small'
                    cyData='deleteTourneyBtn'
                    text={alltourneyInfo?.tourney === undefined ? translate('cancelBtn') : translate('deleteBtn')}
                  />
                  <Button
                  Icon={AllDoneBtn}
                  showIcon={true}
                  onClickCallable={() => { setConfirmDialogisOpen(true); }}
                  iconPosition='right'
                  cyData='saveTourneyBtn'
                  isDisabled={
                    (alltourneyInfo?.tourney === undefined
                      ? step < 5
                      : methods.formState.isDirty && step < 5) || !isTourneyValid()
                  }
                  type='primary'
                  size='small'
                  text={alltourneyInfo?.tourney === undefined ? translate('createBtn') : translate('saveEditBtn')}
                  />
                </span>
            </span>
            <LayoutGroup>
            <motion.div layout layoutRoot transition={{ duration: 0.3, ease: 'easeIn' }} className={`grid ${transition()} gap-y-4 gap-x-8 auto-rows-auto auto-cols-auto`}>
              <TournamentAccordion
              setStep={updateStep}
              step={step}
              stepOpen={1} stepComplete={2}
              stepName={translate('gettingStartedStep.title')}
              stepDescription={translate('gettingStartedStep.paragraph')}>
                <TournamentInitialDetails incrementStep={incrementStep} tourney={alltourneyInfo?.tourney}/>
              </TournamentAccordion>
              <TournamentAccordion
              setStep={updateStep}
              step={step}
               stepOpen={2} stepComplete={2}
               stepName={translate('tourTypeStep.title')}
                stepDescription={translate('tourTypeStep.paragraph')}>
                  <TournamentType incrementStep={incrementStep} tourney={alltourneyInfo?.tourney} teams={alltourneyInfo?.teams ?? []}/>
                </TournamentAccordion>
              <TournamentAccordion
              setStep={updateStep}
              step={step}
               stepOpen={3} stepComplete={3}
               stepName={translate('tourDetailsStep.title')}
               stepDescription={translate('tourDetailsStep.paragraph')}>
                <TournamentExtraDetails
                  incrementStep={incrementStep}
                  tourney={alltourneyInfo?.tourney}
                  teams={alltourneyInfo?.teams ?? []}
                  fields={alltourneyInfo?.fields ?? []}
                />
               </TournamentAccordion>
              <TournamentAccordion
              setStep={updateStep}
              step={step}
               stepOpen={4} stepComplete={4}
               stepName={translate('tourFieldsStep.title')}
               stepDescription={translate('tourFieldsStep.paragraph')}>
                <TournamentAssignFields createTourneySchedule={generateTourneySchedule} tourney={alltourneyInfo?.tourney} availableFields={alltourneyInfo?.fields ?? []} referees={alltourneyInfo?.referees ?? []}/>
               </TournamentAccordion>
              <TournamentAccordion
              step={step}
              className={'overflow-y-hidden overflow-x-auto'}
               stepOpen={5} stepComplete={10}
                stepName={translate('tourPreviewStep.title')}
                stepDescription={translate('tourPreviewStep.paragraph')}>
                  <TournamentSchedule fields={alltourneyInfo?.fields ?? []} tourney={alltourneyInfo?.tourney}/>
                </TournamentAccordion>
            </motion.div>
            </LayoutGroup>
            { ConfirmModal }
            { CloseModel }
        </section>
        </FormProvider>
  );
}
