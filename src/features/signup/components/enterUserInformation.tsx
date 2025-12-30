import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type InputProps } from 'core/models/input.model';
import { type ButtonProps } from 'core/models/button.model';
import RegistrationSidePanel from './registrationSidePanel';
import { FormStateContext } from '../signup';
import { produce } from 'immer';
import Input from 'core/components/input/input';
import Button from 'core/components/button/button';
import { useTranslation } from 'react-i18next';
import GlobalLoadingScreen from 'core/components/misc/globalLoadingScreen';
import ProcessCompleted from 'core/components/misc/processCompleted';
import { ReactComponent as RegistrationCompleteIcon } from 'assets/svgs/RegistrationComplete.svg';
import { createInviteAccount, loginRequest, signOut } from 'core/services/auth.service';
import { useNavigate } from 'react-router-dom';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import { type RegistrationStepsFrom } from '../models/signup.models';

function EnterUserInformation (props: React.PropsWithChildren<{
  onNext: () => void
  onPrev: () => void
}>
): JSX.Element {
  const { t } = useTranslation(['registration']);
  const { form, setForm } = useContext(FormStateContext);
  const [showPage, setShowPage] = useState(0);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    formState,
    getFieldState
  } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      firstName: form.userInformation.value.firstName,
      lastName: form.userInformation.value.lastName
    }
  });

  const firstNameProperties: InputProps = {
    placeholder: t('userInfoStep.firstNamePlaceholder') ?? '',
    legendText: t('userInfoStep.firstNameLegendText') ?? '',
    id: 'firstName',
    showRequired: 'required',
    cyData: 'firstNameRegistration',
    registrationOption: register('firstName', { required: true }),
    fieldState: getFieldState('firstName', formState)
  };
  const lastNameProperties: InputProps = {
    placeholder: t('userInfoStep.lastNamePlaceholder') ?? '',
    legendText: t('userInfoStep.lastNameLegendText') ?? '',
    cyData: 'lastNameRegistration',
    id: 'lastName',
    showRequired: 'required',
    registrationOption: register('lastName', { required: true }),
    fieldState: getFieldState('lastName', formState)
  };
  const userInfoSubmit = handleSubmit(
    async (value) => {
      setForm(
        produce(form => {
          form.userInformation = {
            value
          };
        })
      );
      if (form.type === 'ADMIN') {
        setShowPage(1);
        await loginRequest({ username: form.email.value.email, password: form.passowrd.value.password }).then(async (res) => {
          const updatedForm: RegistrationStepsFrom = { ...form, userInformation: { value } };
          await createInviteAccount(updatedForm).then(async () => {
            setShowPage(2);
            await signOut().then(async () => {
              await loginRequest({
                username: form.email.value.email,
                password: form.passowrd.value.password
              }).then((res) => {
                setTimeout(() => {
                  dispatch(
                    {
                      type: 'update',
                      userData:
                      {
                        ...res,
                        role: '1',
                        firstName: value.firstName,
                        lastName: value.lastName
                      }
                    });
                  navigate('/player');
                }, 100);
              });
            });
          });
        });
      } else {
        props.onNext();
      }
    });

  const nextButtonProps: ButtonProps = {
    size: 'medium',
    text: form.type === 'ADMIN' ? t('businessInfoStep.nextButton') : t('userInfoStep.nextButton') ?? '',
    cyData: 'confirmUserinfoButtonRegistration',
    id: 'confirmUserinfoButton',
    isValidChecked: isValid,
    buttontype: 'submit',
    onClickCallable: (event) => {
      event?.preventDefault();
      void userInfoSubmit();
    },
    type: 'primary'
  };
  switch (showPage) {
    case 1:
      return <GlobalLoadingScreen />;
    case 2:
      return <ProcessCompleted
        isLottie={false}
        header={t('accountCreated.header')}
        paragraph={t('accountCreated.paragraph')}
        Image={RegistrationCompleteIcon} />;
    default:
      return (
      <>
        <RegistrationSidePanel />
        <section className='md:h-full lg:h-auto xs:row-span-4 lg:row-auto lg:col-span-5 xl:col-span-5'>
          <form
          method="post" onSubmit={(e) => { e.preventDefault(); }}
          className='
          flex flex-col
          h-full w-full
          justify-center content-center
          xl:px-28 lg:px-10 sm:px-20 gap-12 mobile:justify-start mobile:gap-6 mobile:px-4 mobile:py-6'>
          <div className='flex flex-col gap-4'>
          <span className='text-[32px] leading-[38px] font-semibold text-grey-20'>
          {t('userInfoStep.header')}
          </span>
          <span className='text-[18px] mobile:text-[14px] leading-7 mobile:leading-[21px] font-normal text-grey-40'>
          {t('userInfoStep.Paragraph')}
          </span>
          <span className='flex gap-2 font-normal text-xs text-gray justify-between items-center'>
          <p className='text-grey-40'>
            <span className='font-normal text-xs text-grey-10'>{t('userInfoStep.stepCompletedText')}</span>{t('userInfoStep.stepsRemain')}</p>
          <progress
          className="progress w-80 mobile:w-[250px] progress-success bg-[#4BB54333]" value="50" max="100"></progress>
          </span>
          </div>
          <section className='flex flex-col w-full gap-6 mobile:gap-3'>
          <Input {...firstNameProperties}/>
          <Input {...lastNameProperties}/>
          <div className='flex justify-end mobile:justify-center'>
          <Button {...nextButtonProps} className='mobile:w-full'/>
          </div>
          </section>
        </form>
        </section>
        </>);
  }
}

export default EnterUserInformation;
