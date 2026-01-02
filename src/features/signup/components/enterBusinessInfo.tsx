import React, { useContext, useState } from 'react';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import RegistrationSidePanel from './registrationSidePanel';
import Button from 'core/components/button/button';
import Input from 'core/components/input/input';
import SelectInput from 'core/components/input/selectInput';
import { GooglePlacesAutoComplete } from 'core/components/input/googlePlacesAutoComplete';
import GlobalLoadingScreen from 'core/components/misc/globalLoadingScreen';
import ProcessCompleted from 'core/components/misc/processCompleted';
import { useForm } from 'react-hook-form';
import { FormStateContext } from '../signup';
import { produce } from 'immer';
import { getLocationInfo } from 'core/utils/utils';
import { businessSizeOption } from 'core/context/global.const';
import { useTranslation } from 'react-i18next';
import { loginRequest, createAccount, signOut } from 'core/services/auth.service';
import { ReactComponent as RegistrationCompleteIcon } from 'assets/svgs/RegistrationComplete.svg';
import {
  type GoogleAutoCompleteInputProps,
  type InputProps,
  type SelectDropdownProps
} from 'core/models/input.model';
import { type ButtonProps } from 'core/models/button.model';
import { useNavigate } from 'react-router-dom';

function EnterBusinessInfo (props: React.PropsWithChildren<{
  onNext: () => void
  onPrev: () => void }>
): JSX.Element {
  const { t } = useTranslation(['registration']);
  const { form, setForm } = useContext(FormStateContext);
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(0);
  const { dispatch } = useAuthContext();
  const [disableForm, setDisableForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
    control,
    getValues,
    setValue,
    getFieldState,
    formState
  } = useForm({
    shouldUseNativeValidation: false,
    mode: 'onChange',
    defaultValues: {
      businessName: form.companyInformation.value.businessName,
      businessSize: form.companyInformation.value.businessSize,
      city: form.companyInformation.value.city,
      state: form.companyInformation.value.state,
      zipcode: form.companyInformation.value.zipcode,
      facilityMailingAddress: form.companyInformation.value.facilityMailingAddress
    }
  });

  const companyName: InputProps = {
    placeholder: t('businessInfoStep.businessNamePlaceholder'),
    legendText: t('businessInfoStep.businessNameLegendText'),
    id: 'companyName',
    showRequired: 'required',
    registrationOption: register('businessName', { required: true }),
    cyData: 'companyNameRegistration',
    fieldState: getFieldState('businessName', formState)
  };

  const businessSize: SelectDropdownProps = {
    placeholder: '',
    legendText: t('businessInfoStep.businessSizeLegendText'),
    id: 'businessSize',
    registrationOption: register('businessSize', { required: true }),
    cyData: 'businessSizeRegistration',
    showRequired: 'required',
    fieldState: getFieldState('businessSize', formState),
    options: businessSizeOption,
    fieldNameControl: 'businessSize',
    formControl: control
  };

  const city: InputProps = {
    placeholder: t('businessInfoStep.cityplaceholder'),
    legendText: t('businessInfoStep.cityLegend'),
    showRequired: 'required',
    id: 'city',
    registrationOption: register('city', { required: true }),
    cyData: 'cityRegistration',
    fieldState: getFieldState('city', formState)
  };

  const state: InputProps = {
    placeholder: t('businessInfoStep.stateplaceholder'),
    legendText: t('businessInfoStep.stateLegend'),
    showRequired: 'required',
    id: 'State',
    cyData: 'StateRegistration',
    registrationOption: register('state', { required: true }),
    fieldState: getFieldState('state', formState)
  };

  const zipCode: InputProps = {
    placeholder: t('businessInfoStep.zipcodeplaceholder'),
    legendText: t('businessInfoStep.zipcodeLegend'),
    showRequired: 'required',
    id: 'zipCode',
    cyData: 'zipCodeRegistration',
    registrationOption: register('zipcode', { required: true, minLength: 5, maxLength: 5 }),
    fieldState: getFieldState('zipcode', formState)
  };

  const onPlaceSelected = (place?: google.maps.places.PlaceResult): void => {
    const { city, state, zipCode, shortName } = getLocationInfo(place);

    setValue('zipcode', zipCode, {
      shouldValidate: true,
      shouldDirty: true
    });

    setValue('city', city, {
      shouldValidate: true,
      shouldDirty: true
    });

    setValue('state', state, {
      shouldValidate: true,
      shouldDirty: true
    });

    setValue('facilityMailingAddress', shortName, {
      shouldValidate: true,
      shouldDirty: true
    });

    const formValue = getValues();

    setForm(
      produce(form => {
        form.companyInformation = {
          value: formValue
        };
      })
    );
  };

  const facilityMailingAddress: GoogleAutoCompleteInputProps = {
    placeholder: t('businessInfoStep.mailingAddressPlaceholder'),
    legendText: t('businessInfoStep.mailingAddressLegend'),
    id: 'facilityMailingAddress',
    showRequired: 'required',
    registrationOption: register('facilityMailingAddress', { required: true }),
    onSelect: onPlaceSelected,
    cyData: 'facilityMailingAddressRegistration',
    formControl: control,
    fieldState: getFieldState('facilityMailingAddress', formState),
    fieldNameControl: 'facilityMailingAddress'
  };

  const userInfoSubmit = handleSubmit(
    async (value) => {
      setDisableForm(true);
      setForm(
        produce(form => {
          form.companyInformation = {
            value
          };
        })
      );
      setShowPage(1);
      // TODO: Create a JS resolver, that creates contact, contactRole, business.
      await loginRequest({ username: form.email.value.email, password: form.passowrd.value.password })
        .then(async (res) => {
          await createAccount(form, res.username, res.attributes['custom:BusinessId'] || '').then(async () => {
            setShowPage(2);
            await signOut().then(async () => {
              await loginRequest({
                username: form.email.value.email,
                password: form.passowrd.value.password
              }).then(() => {
                setTimeout(() => {
                  dispatch({
                    type: 'update',
                    userData: {
                      ...res,
                      role: '1',
                      firstName: form.userInformation.value.firstName,
                      lastName: form.userInformation.value.lastName
                    }
                  });
                  navigate('/player');
                }, 100);
              });
            });
          });
        });
    });

  const goBack = (): void => {
    const fieldValues = getValues();
    setForm(
      produce(form => {
        form.companyInformation = {
          value: fieldValues
        };
      })
    );
    props.onPrev();
  };

  const backButtonProps: ButtonProps = {
    text: t('businessInfoStep.backButton'),
    size: 'small',
    onClickCallable: goBack,
    showIcon: true,
    type: 'tertiary',
    iconPosition: 'left',
    isDisabled: disableForm
  };

  const nextButtonProps: ButtonProps = {
    size: 'medium',
    text: t('businessInfoStep.nextButton'),
    id: 'createAccount',
    isValidChecked: isValid,
    asyncOnClick: userInfoSubmit,
    cyData: 'createAccountButtonRegistration',
    buttontype: 'submit',
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
        <section className='md:h-full lg:h-auto xs:row-span-4 lg:row-auto lg:col-span-5'>
          <form
          method="post" onSubmit={(e) => { e.preventDefault(); }}
          className='
          flex flex-col h-full w-full mobile:overflow-scroll
          justify-center content-center xl:px-28 lg:px-8 sm:px-24 gap-2 mobile:gap-6
          mobile:justify-start mobile:py-6 mobile:px-4'>
          <div className='flex flex-col xl:gap-3 lg:gap-2 sm:gap-3 mobile:gap-4'>
          <span className='text-[32px] leading-9 font-semibold text-grey-10'>
          {t('businessInfoStep.header')}
          </span>
          <span className='text-[18px] mobile:text-[14px] leading-[27px] mobile:leading-normal font-normal text-gray'>
          {t('businessInfoStep.paragraph')}
          </span>
          <span className='flex gap-6 font-normal text-xs text-gray justify-between mobile:justify-start items-center'>
          <p className='text-grey-40'>
            <span className='font-normal text-xs text-grey-10'>
              {t('businessInfoStep.stepCompletedText')}
            </span>
            {t('businessInfoStep.stepsRemain')}
          </p>
          <progress className="progress w-9/12 mobile:w-[230px] progress-success bg-[#4BB54333]" value="95" max="100"></progress>
          </span>
          </div>
          <section className='flex flex-col w-full gap-2 mobile:gap-4'>
            <section className='flex xl:flex-col sm:flex-col lg:flex-row w-full gap-2 mobile:flex-col'>
              <div className='flex xl:w-full sm:w-full '>
                <Input {...companyName}/>
              </div>
            <SelectInput {...businessSize}/>
          </section>
          <span className='font-bold text-sm leading-5 xl:pt-2 lg:pt-1 sm:pt-2 text-grey-10'>
          {t('businessInfoStep.header2')}
            </span>
          <p className='font-normal text-xs leading-4 xl:pb-4 sm:pb-4 lg:pb-1 text-gray'>
          {t('businessInfoStep.paragraph2')}
            </p>
          <GooglePlacesAutoComplete {...facilityMailingAddress}/>
          <div className='flex items-center gap-2 w-full'>
          <Input {...city}/>
          <Input {...state}/>
          <Input {...zipCode}/>
          </div>
          <div className='flex justify-between xl:mt-4 sm:mt-4 lg:mt-2'>
            <Button {...backButtonProps}/>
            <Button {...nextButtonProps} />
          </div>
          </section>
        </form>
        </section>
        </>
      );
  };
}

export default EnterBusinessInfo;
