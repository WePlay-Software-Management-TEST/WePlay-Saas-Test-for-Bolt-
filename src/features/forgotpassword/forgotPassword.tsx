import React, { useState } from 'react';
import BackgroundScreen from 'core/components/misc/backgroundScreen';
import RegistrationSidePanel from 'features/signup/components/registrationSidePanel';
import { Link } from 'react-router-dom';
import Input from 'core/components/input/input';
import Button from 'core/components/button/button';
import { type InputProps } from 'core/models/input.model';
import { type ButtonProps } from 'core/models/button.model';
import { useForm } from 'react-hook-form';
import { forgotPasswordRequest } from 'core/services/auth.service';
import { emailPattern } from 'core/context/regex.const';
import { useTranslation } from 'react-i18next';

interface forgotPasswordForm {
  username: string
}
function ForgotPassword (): JSX.Element {
  const [err, setErr] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const { t } = useTranslation(['forgotPassword']);

  const {
    register,
    handleSubmit,
    formState:
    {
      isValid
    },
    formState,
    getFieldState
  } = useForm<forgotPasswordForm>({
    reValidateMode: 'onBlur',
    mode: 'onBlur'
  });

  const forgotpasswordSubmit = handleSubmit(async (value) => {
    await forgotPasswordRequest(value.username).then(() => {
      setIsSubmit(true);
    }).catch((err) => {
      setErr(err.message);
    });
  });

  const usernameRegister = register(
    'username',
    {
      required:
        {
          value: true,
          message: t('usernameRequired')
        },
      pattern:
        {
          value: emailPattern,
          message: t('usernameInvalid')
        }
    });

  const userNameInputProps: InputProps = {
    placeholder: t('emailPlaceholder'),
    legendText: t('emailLegendText'),
    showRequired: 'required',
    cyData: 'forgotPasswordUserNameInput',
    id: 'forgotPasswordUserNameInput',
    fieldState: getFieldState('username', formState),
    registrationOption: usernameRegister
  };

  const forgotPasswordButtonProps: ButtonProps = {
    text: t('SubmitButton'),
    id: 'forgotPasswordSubmitButton',
    isValidChecked: isValid,
    cyData: 'forgotPasswordSubmitButton',
    asyncOnClick: forgotpasswordSubmit,
    type: 'primary'
  };

  return (
  <BackgroundScreen>
        <RegistrationSidePanel />
      <section className='md:h-full lg:h-auto xs:row-span-4 lg:row-auto col-span-5'>
      <form className='flex flex-col h-full w-full justify-center content-center
        mobile:justify-start mobile:content-start xl:px-28 lg:px-20 sm:px-10
         xl:gap-11 xs:gap-12 lg:gap-2 xs:row-span-4 mobile:px-4 mobile:py-6
          mobile:gap-6'>
      <div className='flex flex-col gap-1'>
        <h4 className='text-grey-10 font-semibold leading-[55px] tracking-tight
         mobile:text-[32px]'>{t('header')}</h4>
        <span className='font-normal body-md-text flex flex-col gap-8 mobile:gap-4
         mobile:text-sm'>
          <p>{t('paragraph')}️</p>
          <ol className='list-decimal list-inside'>
            <li>{t('listText1')}️</li>
            <li>{t('listText2')}️</li>
            <li>{t('listText3')}️</li>
            <li>{t('listText4')}️</li>
            <li>{t('listText5')}️</li>
          </ol>
        </span>
      </div>
      <section className='flex flex-col w-full gap-6 mobile:gap-3'>
        <Input {...userNameInputProps}/>
        <section className='w-full flex flex-col justify-center'>
        <Button {...forgotPasswordButtonProps} />
        {err !== '' && <p data-cy="errParagraph"
        className='text-indictor-error body-xxs-text text-center mt-2'>
          {err}</p>}
        {
        isSubmit &&
        err === '' &&
        <p className='text-indictor-success body-xxs-text text-center mt-2'
         data-cy="confirmationParagraph">
          {t('emailHaveBeenSent')}</p>}
        </section>
      </section>
      <Link to={'/login'} className='text-dodger-blue-40 body-sm-text
       text-center'>
        {t('goBackButton')}
      </Link>
    </form>
    </section>
  </BackgroundScreen>);
};

export default ForgotPassword;
