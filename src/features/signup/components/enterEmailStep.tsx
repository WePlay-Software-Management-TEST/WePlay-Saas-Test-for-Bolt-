import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { type InputProps } from 'core/models/input.model';
import { type ButtonProps } from 'core/models/button.model';
import RegistrationSidePanel from './registrationSidePanel';
import { FormStateContext } from '../signup';
import { produce } from 'immer';
import Input from 'core/components/input/input';
import Button from 'core/components/button/button';
import { sendEmailConfirmation } from 'core/services/auth.service';
import { Link } from 'react-router-dom';
import { emailPattern } from 'core/context/regex.const';
import { useTranslation } from 'react-i18next';

function EnterEmailStep (props: React.PropsWithChildren<{ onNext: () => void }>): JSX.Element {
  const { form, setForm } = useContext(FormStateContext);
  const { t } = useTranslation(['registration']);
  const {
    register,
    handleSubmit,
    formState:
    {
      isValid
    },
    formState,
    setError,
    getFieldState
  } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      email: form.email.value.email
    }
  });

  const emailInputProperties: InputProps = {
    placeholder: t('emailStep.emailInputPlaceHolder'),
    legendText: t('emailStep.emailLegendText'),
    showRequired: 'required',
    id: 'email',
    cyData: 'registrationEmail',
    fieldState: getFieldState('email', formState),
    registrationOption: register(
      'email',
      {
        required:
        t('emailStep.emailIsRequired') ?? '',
        pattern:
      {
        value: emailPattern,
        message: t('emailStep.emailDoesntMeetRegex') ?? ''
      }
      })
  };

  const emailSubmit = handleSubmit(
    async (value, e) => {
      e?.preventDefault();
      setForm(
        produce(form => {
          form.email = {
            value
          };
        })
      );
      await sendEmailConfirmation(value.email).then(() => {
        props.onNext();
      }).catch((err) => {
        setError(
          'email',
          {
            type: 'userExists',
            message: err.message
          }
        );
        console.log(err);
      });
    });

  const buttonProps: ButtonProps = {
    text: t('emailStep.submitButton') ?? '',
    id: 'confirmEmailButton',
    isValidChecked: isValid,
    cyData: 'confirmEmailRegistration',
    asyncOnClick: emailSubmit,
    type: 'primary',
    size: 'large',
    buttontype: 'submit'
  };

  return (
    <>
    <RegistrationSidePanel />
    <section className='md:h-full lg:h-auto xs:row-span-4 lg:row-auto lg:col-span-5'>
      <form method="post" onSubmit={(e) => { e.preventDefault(); }}
       className='flex flex-col h-full justify-center content-center mobile:justify-start
        xl:px-28 lg:px-20 sm:px-10 gap-11 mobile:gap-6 mobile:py-6 mobile:px-4'>
      <div className='flex flex-col gap-2'>
        <span className='flex gap-4 justify-start items-end content-end'>

          <h3 className='mobile:leading-normal font-bold text-grey-10 text-bottom mobile:text-[32px]
           mobile:leading-1'>{t('emailStep.headerLine1')}</h3>
            <h6 className='font-normal h-4/5 mobile:hidden'>{t('emailStep.headerLine2')}</h6>
            <Link to={'/login'} className='h-4/5 mobile:hidden'>
              <h6 className='font-semibold cursor-pointer text-dodger-blue-40 h-4/5 mobile:text-[14px]'>
                {t('emailStep.headerLine3')}</h6>
            </Link>
        </span>
        <span className='font-normal body-md-text mobile:text-[14px]'>{t('emailStep.paragraph')}</span>
      </div>
      <section className='flex flex-col w-full gap-8 mobile:gap-3'>
      <Input {...emailInputProperties}/>
      <Button {...buttonProps}/>
      </section>
      <Link to={'/login'}>
        <h6 className='hidden mobile:flex justify-center font-semibold cursor-pointer text-center
         text-dodger-blue-40 mobile:text-[14px] leading-none'>{t('emailStep.bottomParagraph')}</h6>
      </Link>
    </form>
    </section>
    </>
  );
}

export default EnterEmailStep;
