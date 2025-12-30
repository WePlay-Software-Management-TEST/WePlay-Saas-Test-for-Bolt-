import React, { useContext, useState } from 'react';
import { FormStateContext } from '../signup';
import { reSendEmailVerification } from 'core/services/auth.service';
import Button from 'core/components/button/button';
import { type ButtonProps } from 'core/models/button.model';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

function EmailConfirmation (props: React.PropsWithChildren<{
  onNext: () => void
  onPrev: () => void
}>): JSX.Element {
  const { t } = useTranslation(['registration']);
  const { form } = useContext(FormStateContext);
  const [showResendMsg, setShowResendMsg] = useState(false);
  const [disable, setDisable] = useState(true);

  const ResendButtonProps: ButtonProps = {
    text: t('emailSentStep.resendButtonText'),
    onClickCallable (event) {
      void onClickResenEmailVerification();
    },
    type: 'secondary',
    size: 'medium',
    isValidChecked: disable,
    cyData: 'resendVerificationEmail'
  };

  const backProps: ButtonProps = {
    text: t('emailSentStep.backButton'),
    onClickCallable (event) {
      props.onPrev();
    },
    showIcon: true,
    iconPosition: 'left',
    type: 'tertiary',
    size: 'small'
  };

  const onClickResenEmailVerification = async (): Promise<void> => {
    await reSendEmailVerification(form.email.value.email);
    setDisable(() => false);
    setShowResendMsg(() => true);
    setTimeout(() => {
      setDisable(() => true);
      setShowResendMsg(() => false);
    }, 60000);
  };

  return (
    <section
    className='
    px-10 mobile:px-4 py-7 w-full h-full
    flex flex-col justify-start self-center content-center items-center
    col-span-full
    xs:row-span-5 justify-self-center xl:gap-4 lg:gap-2 sm:gap-6'>
      <div className='flex justify-between lg:flex-row xs:flex-col w-full'>
        <div><Button { ...backProps }/></div>
        <div
        className='
        flex flex-col justify-center items-center
        xl:gap-6 lg:gap-5 xs:gap-6 xs:w-2/3 mobile:w-full lg:w-2/4 self-center
        lg:mr-15 lg:mt-0 xs:mt-17 mobile:mt-9'>
          <div className='bg-messageSent bg-cover w-[200px] h-[200px]
          mobile:w-[230px] mobile:h-[230px] xl:mb-10 lg:mb-3'></div>
            <h3 className='text-center font-semibold leading-10 text-grey-10
             mobile:text-[32px] mobile:pt-9'>
              {t('emailSentStep.header')}
            </h3>
            <p className='text-center font-normal body-sm-text mobile:text-sm'>
            {t('emailSentStep.paragraph1')}
            {form.email.value.email}
            {t('emailSentStep.paragraph2')}
            </p>
            <p className='text-center font-normal body-sm-text w-[120%] mobile:w-full mobile:text-wrap mobile:text-sm'>
            {t('emailSentStep.paragraph3')}
            <a
            onClick={() => { props.onPrev(); } }
            className="text-blue-50 font-normal text-base leading-6 cursor-pointer">
              {t('emailSentStep.paragraphAnchor')}</a>
            </p>
          <div className='flex flex-col items-center gap-1 xl:mt-11 lg:mt-0 xs:mt-5 mobile:pt-3'>
            <Button {...ResendButtonProps}/>
            {
              showResendMsg && <p className='body-xs-text text-indictor-success'>
                 {t('emailSentStep.confirmationEmailHaveBeenSent')}</p>
            }
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default EmailConfirmation;
