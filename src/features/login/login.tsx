import React, { useState } from 'react';
import BackgroundScreen from 'core/components/misc/backgroundScreen';
import RegistrationSidePanel from 'features/signup/components/registrationSidePanel';
import { Link, useNavigate } from 'react-router-dom';
import Input from 'core/components/input/input';
import PasswordInput from 'core/components/input/passwordInput';
import Button from 'core/components/button/button';
import { type ButtonProps } from 'core/models/button.model';
import { emailPattern } from 'core/context/regex.const';
import { useForm } from 'react-hook-form';
import { type InputProps } from 'core/models/input.model';
import { loginRequest } from 'core/services/auth.service';
import GlobalLoadingScreen from 'core/components/misc/globalLoadingScreen';
import { useTranslation } from 'react-i18next';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import { getPlayerinformation } from 'features/player/player.service';

interface loginCredsForm {
  username: string
  password: string
}
function Login (): JSX.Element {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [disableForm, setDisableForm] = useState(false);
  const { t } = useTranslation(['login']);

  const {
    register,
    handleSubmit,
    formState:
    {
      isValid
    },
    formState,
    getFieldState
  } = useForm<loginCredsForm>({
    reValidateMode: 'onChange',
    mode: 'onChange'
  });

  const loginSubmit = handleSubmit(async (value) => {
    await loginRequest(value)
      .then(async (loginResponse) => {
        const { data } = await getPlayerinformation(loginResponse.username);
        setIsLoading(true);
        dispatch({
          type: 'update',
          userData: {
            ...loginResponse,
            role: data?.getContacts?.ContactRoles?.items[0]?.rolesID,
            firstName: data?.getContacts?.FirstName,
            lastName: data?.getContacts?.LastName ?? ''
          }
        }
        );
      })
      .catch((err) => {
        if (err.name === 'UserNotConfirmedException') {
          navigate('/signup', { state: { email: value.username } });
          return;
        };

        if (err.message === 'Password attempts exceeded') {
          setDisableForm(true);
          setTimeout(() => {
            setDisableForm(false);
          }, 1800000);
        };

        setErr(err.message);
      });
  });

  const passwordRegister = register(
    'password',
    {
      required:
      {
        value: true,
        message: t('passwordRequired')
      }
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

  const loginButtonProps: ButtonProps = {
    text: t('SubmitButton'),
    id: 'loginToAccount',
    isValidChecked: isValid,
    cyData: 'loginToAccountButton',
    asyncOnClick: loginSubmit,
    type: 'primary',
    isDisabled: disableForm,
    buttontype: 'submit'
  };

  const userNameInputProps: InputProps = {
    placeholder: t('emailPlaceholder'),
    legendText: t('emailLegendText'),
    cyData: 'loginUserNameInput',
    showRequired: 'required',
    id: 'loginUsername',
    fieldState: getFieldState('username', formState),
    registrationOption: usernameRegister,
    isDisabled: disableForm
  };

  const passwordInputProps: InputProps = {
    placeholder: t('passwordPlaceholder'),
    legendText: t('passwordLegend'),
    cyData: 'loginPasswordInput',
    showRequired: 'required',
    id: 'loginPasswordInput',
    fieldState: getFieldState('password', formState),
    registrationOption: passwordRegister,
    isDisabled: disableForm
  };

  return (
  <BackgroundScreen>
    {
    isLoading
      ? <GlobalLoadingScreen/>
      : <>
      <RegistrationSidePanel />
      <section className='md:h-full lg:h-auto xs:row-span-4 lg:row-auto col-span-5'>
      <form className='flex flex-col h-full w-full justify-center mobile:justify-start
       mobile:content-start content-center xl:px-28 lg:px-20 sm:px-10 xl:gap-11
        xs:gap-12 lg:gap-2 xs:row-span-4 mobile:py-6 mobile:px-4 mobile:gap-5'>
      <div className='flex flex-col gap-2 mobile:gap-4'>
        <span className='flex gap-4 mobile:gap-2 justify-start items-end content-end
         mobile:h-1/2'>
          <h3 className='font-bold text-grey-10 text-bottom mobile:text-[32px]
           mobile:leading-normal'>{t('header1')}</h3>
            <h6 className='font-normal h-4/5  mobile:auto mobile:leading-7 mobile:hidden'>
              {t('header2')}</h6>
            <Link to={'/signup'} className='h-4/5 mobile:auto'>
              <h6 className='font-semibold cursor-pointer mobile:hidden
               text-dodger-blue-40 h-4/5'>{t('header3')}</h6>
            </Link>
        </span>
        <span className='font-normal body-md-text mobile:text-sm'>{t('paragraph')}</span>
      </div>
      <section className='flex flex-col w-full gap-8 mobile:gap-4'>
        <section className='flex flex-col w-full gap-5 mobile:gap-2'>
        <Input {...userNameInputProps}/>
        <PasswordInput {...passwordInputProps}/>
        </section>
        <section className='w-full flex flex-col justify-center'>
        <Button {...loginButtonProps} />
        {err !== '' && <p
        className='text-indictor-error body-xxs-text text-center mt-2'
        data-cy='loginButtonValidationErr'>
          {err}</p>}
        </section>
      </section>
      <div className='flex flex-col justify-center content-center'>
      <Link to={'/forgotpassword'} className='text-dodger-blue-40 body-sm-text text-center'>{t('footerText')}</Link>
      <div className="divider hidden mobile:flex"></div>
      <Link to={'/signup'} className=' hidden mobile:flex justify-center
       text-dodger-blue-40 body-sm-text text-center'>{t('signupBottomParagraph')}</Link>
      </div>
    </form>
    </section>
    </>
    }
  </BackgroundScreen>
  );
};

export default Login;
