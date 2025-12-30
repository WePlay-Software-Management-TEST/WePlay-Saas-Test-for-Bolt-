/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect, useRef } from 'react';
import BackgroundScreen from 'core/components/misc/backgroundScreen';
import RegistrationSidePanel from 'features/signup/components/registrationSidePanel';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Button from 'core/components/button/button';
import { type InputProps } from 'core/models/input.model';
import { type ButtonProps } from 'core/models/button.model';
import { useForm } from 'react-hook-form';
import GlobalLoadingScreen from 'core/components/misc/globalLoadingScreen';
import { passwordPattern } from 'core/context/regex.const';
import PasswordInput from 'core/components/input/passwordInput';
import { compareArrays } from 'core/utils/utils';
import { changePasswordRequest } from 'core/services/auth.service';
import ProcessCompleted from 'core/components/misc/processCompleted';
import thumbsUpAnimation from 'assets/lottie/thumbsUpAnimation.json';
import { useTranslation } from 'react-i18next';

interface forgotPasswordForm {
  password: string
  confirmPassword: string
}
function ChangePassord (): JSX.Element {
  const { t } = useTranslation(['forgotPassword']);
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isChangedPassword, setIsChangedPassword] = useState(false);
  const [queryParams] = useSearchParams();

  const queryParamsKeys = [...queryParams.entries()];
  const expectedQueryParams = ['code', 'username', 'clientId', 'region', 'email', 'redirectURL'];
  useEffect(() => {
    if (queryParamsKeys.length === 0) {
      navigate('/login');
    };

    const queryParamsEx = [...queryParams.keys()];
    if (!compareArrays(queryParamsEx, expectedQueryParams)) {
      navigate('/login');
    }

    setIsLoading(false);
  }, []);

  const {
    register,
    handleSubmit,
    formState:
    {
      isValid
    },
    formState,
    getFieldState,
    watch
  } = useForm<forgotPasswordForm>({
    reValidateMode: 'onChange',
    mode: 'onChange'
  });
  const password = useRef({});
  password.current = watch('password', '');

  const validatePasswordMatch = (value: string): boolean | string => {
    const passwordMatch: boolean = (
      value === password.current
    );
    return passwordMatch || t('changePassword.confirmpasswordDoesntMatch') as '';
  };

  const passwordRegister = register(
    'password',
    {
      required:
      {
        value: true,
        message: t('changePassword.passwordIsrequiredText')
      },
      pattern:
      {
        value: passwordPattern,
        message: t('changePassword.passwordDoesntMeetRegex')
      },
      minLength: {
        value: 8,
        message: t('changePassword.passwordDoesntMeetMinLength')
      }
    });

  const passwordProperties: InputProps = {
    placeholder: t('changePassword.passwordPlaceholder'),
    legendText: t('changePassword.passwordLegendText'),
    cyData: 'changePasswordInput',
    id: 'changePasswordInput',
    showRequired: 'required',
    fieldState: getFieldState('password', formState),
    registrationOption: passwordRegister,
    correctPlaceHolder: t('changePassword.passwordCorrectPlaceHolder') as '',
    errPlaceholder: t('changePassword.passwordErrPlaceHolder') as ''
  };
  const confirmPassowrdProperties: InputProps = {
    cyData: 'changeconfirmPasswordInput',
    placeholder: t('changePassword.confirmpasswordPlaceholder'),
    legendText: t('changePassword.confirmpasswordLegendText'),
    id: 'changeconfirmPasswordInput',
    showRequired: 'required',
    registrationOption: register(
      'confirmPassword',
      {
        required:
        {
          value: true,
          message: t('changePassword.passwordIsrequiredText')
        },
        validate: validatePasswordMatch
      }),
    errPlaceholder: t('changePassword.confirmpasswordErrPlaceHolder') as '',
    correctPlaceHolder: t('changePassword.confirmpasswordCorrectPlaceHolder') as '',
    fieldState: getFieldState('confirmPassword', formState)
  };

  const passwordSubmit = handleSubmit(
    async (value) => {
      const code = queryParams.get('code') as '';
      const username = queryParams.get('username') as '';
      const password = value.password;
      await changePasswordRequest(username, code, password).then(() => {
        setIsChangedPassword(true);
        setTimeout(() => {
          navigate('/login');
        }, 10000);
      }).catch((err) => {
        setErr(err.message);
      });
    });

  const NextButtonProps: ButtonProps = {
    text: t('changePassword.nextButton'),
    id: 'confirmChangePasswordButton',
    isValidChecked: isValid,
    cyData: 'confirmChangePasswordButton',
    asyncOnClick: passwordSubmit,
    type: 'primary'
  };
  return (
  <BackgroundScreen>
      {
      !isLoading
        ? <>
        {
        isChangedPassword
          ? <ProcessCompleted
            isLottie={true}
            paragraph={t('changePassword.changingPasswordDoneParaText')}
            header={t('changePassword.changingPasswordDoneHeaderText')}
            lottieInfo={thumbsUpAnimation}/>
          : <>
        <RegistrationSidePanel />
    <section className='md:h-full lg:h-auto xs:row-span-4 lg:row-auto col-span-5'>
      <form
      className='
      flex flex-col
      h-full w-full
      justify-center content-center mobile:justify-start mobile:content-start mobile:gap-6
      xl:px-28 lg:px-20
      sm:px-10 xl:gap-12 xs:gap-12 lg:gap-3 xs:row-span-4 mobile:px-4 mobile:py-6'>
      <div className='flex flex-col gap-3'>
      <span className='text-[32px] leading-[38px] font-semibold text-grey-10'>
      {t('changePassword.header')}
      </span>
      <span className='text-[18px] mobile:text-sm leading-[27px] font-normal text-grey-40'>
      {t('changePassword.paragraph')}
      </span>
      </div>
      <section className='flex flex-col w-full gap-8 mobile:gap-4'>
      <PasswordInput {...passwordProperties}/>
      <PasswordInput {...confirmPassowrdProperties}/>
      <Button {...NextButtonProps} />
      {err !== '' && <p data-cy="errParagraph"
        className='text-indictor-error body-xxs-text text-center mt-2'>{err}</p>}
      <Link data-cy="rememberedPassword" to={'/login'} className='text-dodger-blue-40 body-sm-text text-center'>{t('changePassword.footer')}</Link>
      </section>
    </form>
    </section></>}
    </>
        : <GlobalLoadingScreen />
    }
  </BackgroundScreen>);
};

export default ChangePassord;
