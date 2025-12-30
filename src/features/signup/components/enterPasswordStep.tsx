import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { type InputProps } from 'core/models/input.model';
import { type ButtonProps } from 'core/models/button.model';
import RegistrationSidePanel from './registrationSidePanel';
import { FormStateContext } from '../signup';
import { produce } from 'immer';
import Button from 'core/components/button/button';
import { changeDefaultPassword } from '../../../core/services/auth.service';
import PasswordInput from 'core/components/input/passwordInput';
import { passwordPattern } from 'core/context/regex.const';
import { useTranslation } from 'react-i18next';

/**
 * EnterPasswordStep component handles the password entry step in the registration process.
 *
 * This component uses the `react-hook-form` library to manage form state and validation.
 * It provides inputs for password and confirm password fields, ensuring that the passwords match
 * and meet the required pattern and length. Upon successful submission, it updates the form state
 * and triggers the `onNext` callback.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onNext - Callback function to be called when the password step is successfully completed.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @throws Will throw an error if the password change request fails.
 */
function EnterPasswordStep (props: React.PropsWithChildren<{ onNext: () => void }>): JSX.Element {
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
    watch,
    getFieldState
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: {
      password: form.passowrd.value.password,
      confirmPassword: form.passowrd.value.confirmPassword
    }
  });

  const validatePasswordMatch = (value: string): boolean | string => {
    const passwordMatch: boolean = (
      value === password.current || value === form.passowrd.value.password
    );
    return passwordMatch || (
      t('passwordStep.confirmpasswordDoesntMatch') ?? ''
    );
  };

  const password = useRef({});
  password.current = watch('password', '');

  const passwordRegister = register(
    'password',
    {
      required:
      {
        value: true,
        message: t('passwordStep.passwordIsrequiredText') ?? ''
      },
      pattern:
      {
        value: passwordPattern,
        message: t('passwordStep.passwordDoesntMeetRegex') ?? ''
      },
      minLength: {
        value: 8,
        message: t('passwordStep.passwordDoesntMeetMinLength') ?? ''
      }
    });

  const passwordProperties: InputProps = {
    placeholder: t('passwordStep.passwordPlaceholder') ?? '',
    legendText: t('passwordStep.passwordLegendText') ?? '',
    cyData: 'passwordRegistration',
    id: 'password',
    showRequired: 'required',
    fieldState: getFieldState('password', formState),
    registrationOption: passwordRegister,
    correctPlaceHolder: t('passwordStep.passwordCorrectPlaceHolder') ?? '',
    errPlaceholder: t('passwordStep.passwordErrPlaceHolder') ?? ''
  };
  const confirmPassowrdProperties: InputProps = {
    cyData: 'confirmPasswordRegistration',
    placeholder: t('passwordStep.confirmpasswordPlaceholder') ?? '',
    legendText: t('passwordStep.confirmpasswordLegendText') ?? '',
    id: 'confirmPassword',
    showRequired: 'required',
    registrationOption: register(
      'confirmPassword',
      {
        required:
        {
          value: true,
          message: t('passwordStep.passwordIsrequiredText') ?? ''
        },
        validate: validatePasswordMatch
      }),
    errPlaceholder: t('passwordStep.confirmpasswordErrPlaceHolder') ?? '',
    correctPlaceHolder: t('passwordStep.confirmpasswordCorrectPlaceHolder') ?? '',
    fieldState: getFieldState('confirmPassword', formState)
  };

  // @TODO: Handle the changedPassowrd request here.
  const passwordSubmit = handleSubmit(
    async (value) => {
      setForm(
        produce(form => {
          form.passowrd = {
            value
          };
        })
      );
      await changeDefaultPassword(form.email.value.email, value.password, form.type, form.tempPass).then(() => {
        props.onNext();
      });
    });

  const NextButtonProps: ButtonProps = {
    text: t('passwordStep.nextButton') ?? '',
    id: 'confirmPasswordButton',
    isValidChecked: isValid,
    cyData: 'confirmPasswordButtonRegistration',
    buttontype: 'submit',
    asyncOnClick: passwordSubmit,
    type: 'primary'
  };

  return (
    <>
    <RegistrationSidePanel />
    <section className='md:h-full lg:h-auto xs:row-span-4 lg:row-auto col-span-5'>
      <form
      method="post" onSubmit={(e) => { e.preventDefault(); }}
      className='
      flex flex-col
      h-full w-full
      justify-center content-center
      xl:px-28 lg:px-20
      sm:px-10 xl:gap-12 xs:gap-12 lg:gap-3
      mobile:gap-7 xs:row-span-4 mobile:justify-start
      mobile:px-4 mobile:py-6'>
      <div className='flex flex-col gap-3'>
      <span className='text-[32px] leading-[38px] font-semibold text-grey-10'>
      { t('passwordStep.header') }
      </span>
      <span className='text-[18px] mobile:text-[14px] leading-[27px]
      mobile:leading-[21px] font-normal text-grey-40'>
      { t('passwordStep.paragraph') }
      </span>
      </div>
      <section className='flex flex-col w-full gap-8 mobile:gap-2'>
      <PasswordInput {...passwordProperties}/>
      <PasswordInput {...confirmPassowrdProperties}/>
      <Button {...NextButtonProps} />
      </section>
    </form>
    </section>
    </>
  );
}

export default EnterPasswordStep;
