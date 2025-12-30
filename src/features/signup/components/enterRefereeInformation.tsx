import React, { useContext, useState } from 'react';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import RegistrationSidePanel from './registrationSidePanel';
import Button from 'core/components/button/button';
import TextArea from 'core/components/input/textArea';
import { GooglePlacesAutoComplete } from 'core/components/input/googlePlacesAutoComplete';
import GlobalLoadingScreen from 'core/components/misc/globalLoadingScreen';
import ProcessCompleted from 'core/components/misc/processCompleted';
import { useForm } from 'react-hook-form';
import { FormStateContext } from '../signup';
import { produce } from 'immer';
import { getLocationInfo } from 'core/utils/utils';
import RadioButton from 'core/components/button/radioButton';
import { useTranslation } from 'react-i18next';
import { loginRequest, createInviteAccount, signOut } from 'core/services/auth.service';
import { ReactComponent as RegistrationCompleteIcon } from 'assets/svgs/RegistrationComplete.svg';
import {
  type SelectDropdownProps,
  type GoogleAutoCompleteInputProps,
  type InputProps
} from 'core/models/input.model';
import { type ButtonProps } from 'core/models/button.model';
import { useNavigate } from 'react-router-dom';
import { type RegistrationStepsFrom } from '../models/signup.models';
import SelectInput from 'core/components/input/selectInput';
import { YearsOfExperienceOptions } from 'core/context/global.const';
export default function EnterRefereeInformation (props: React.PropsWithChildren<{
  onNext: () => void
  onPrev: () => void }>): JSX.Element {
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
      bio: form.refereeInformation.value.bio,
      yearsOfExperience: form.refereeInformation.value.yearsOfExperience,
      location: form.refereeInformation.value.location,
      isCertified: form.refereeInformation.value.isCertified,
      hasDoneBackgroundCheck: form.refereeInformation.value.hasDoneBackgroundCheck,
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const onPlaceSelected = (place?: google.maps.places.PlaceResult): void => {
    const { city, state, zipCode, shownAddress } = getLocationInfo(place);

    setValue('zipCode', zipCode, {
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

    setValue('location', shownAddress, {
      shouldValidate: true,
      shouldDirty: true
    });

    const formValue = getValues();

    setForm(
      produce(form => {
        form.refereeInformation = {
          value: formValue
        };
      })
    );
  };
  const goBack = (): void => {
    const fieldValues = getValues();
    setForm(
      produce(form => {
        form.refereeInformation = {
          value: fieldValues
        };
      })
    );
    props.onPrev();
  };

  const userInfoSubmit = handleSubmit(
    async (value) => {
      setDisableForm(true);
      setForm(
        produce(form => {
          form.refereeInformation = {
            value
          };
        })
      );
      setShowPage(1);

      await loginRequest({ username: form.email.value.email, password: form.passowrd.value.password })
        .then(async (res) => {
          const updatedFrom: RegistrationStepsFrom = { ...form, refereeInformation: { value } };
          await createInviteAccount(updatedFrom, 'REFEREE').then(async () => {
            setShowPage(2);
            await signOut().then(async () => {
              await loginRequest({
                username: form.email.value.email,
                password: form.passowrd.value.password
              }).then(() => {
                setTimeout(() => {
                  dispatch(
                    {
                      type: 'update',
                      userData: {
                        ...res,
                        role: '2',
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
    type: 'primary'
  };

  const refereeBio: InputProps = {
    legendText: t('refereeInformation.profileBioLegend'),
    placeholder: t('refereeInformation.profileBioPlaceholder'),
    id: 'refereeBio',
    cyData: 'refereeBio',
    fieldState: getFieldState('bio', formState),
    showRequired: 'optional',
    registrationOption:
      register(
        'bio',
        {
          maxLength: {
            value: 250,
            message: t('bioMaxLength')
          }
        }
      )
  };

  const refereeYearsOfExp: SelectDropdownProps = {
    legendText: t('refereeInformation.yearsOfExpLegend'),
    placeholder: 'Years Of Experience',
    id: 'refereeYearsOfExp',
    cyData: 'refereeYearsOfExp',
    options: YearsOfExperienceOptions,
    showRequired: 'required',
    fieldState: getFieldState('yearsOfExperience', formState),
    fieldNameControl: 'yearsOfExperience',
    formControl: control,
    registrationOption:
      register(
        'yearsOfExperience',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          }
        }
      )
  };

  const refereeLocation: GoogleAutoCompleteInputProps = {
    placeholder: t('refereeInformation.physicalLocationLegend'),
    legendText: t('refereeInformation.physicalLocationLegend'),
    id: 'refereeLocation',
    showRequired: 'required',
    registrationOption: register('location', { required: true }),
    onSelect: onPlaceSelected,
    cyData: 'refereeLocation',
    formControl: control,
    fieldState: getFieldState('location', formState),
    fieldNameControl: 'location'
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
          <div className='flex flex-col mobile:gap-4'>
          <span className='text-[32px] leading-9 font-semibold text-grey-10'>
          {t('refereeInformation.header')}
          </span>
          <span className='text-[18px] mobile:text-[14px] leading-[27px] mobile:leading-normal font-normal text-gray'>
          {t('refereeInformation.paragraph')}
          </span>
          <span className='flex gap-1 font-normal text-xs text-gray justify-between mobile:justify-start items-center pt-6'>
          <p className='text-grey-40'>
            <span className='font-normal text-xs text-grey-10'>
              {t('businessInfoStep.stepCompletedText')}
            </span>
            {t('businessInfoStep.stepsRemain')}
          </p>
          <progress className="progress w-9/12 mobile:w-[230px] progress-success bg-[#4BB54333]" value="100" max="100"></progress>
          </span>
          </div>
          <section className='flex flex-col w-full gap-2 mobile:gap-4 pt-6'>
          <TextArea {...refereeBio} className='h-[90px]'/>
          <SelectInput {...refereeYearsOfExp}/>
          <GooglePlacesAutoComplete {...refereeLocation}/>
          <div className='flex flex-col gap-4 col-span-3'>
          <p
          className='text-base font-semibold text-grey-10 flex'>
            {
            t('refereeInformation.certifiedHeader')
            }&#160;
            <span className='text-grey-70'>{t('optionalTag')}
            </span>
          </p>
          <div className='flex gap-5'>
            <RadioButton
            value={'true'}
            id='leftPreference'
            cyData='leftPreference'
            registrationOption={register('isCertified')} label={t('refereeInformation.certifiedOption1') ?? ''}/>
            <RadioButton
            value={''}
            id='rightPreference'
            cyData='rightPreference'
            registrationOption={register('isCertified')} label={t('refereeInformation.certifiedOption2') ?? ''}/>
          </div>
        </div>
        <div className='flex flex-col gap-4 col-span-3'>
          <p
          className='text-base font-semibold text-grey-10 flex'>
            {
            t('refereeInformation.backGroundCheckHeader')
            }&#160;
            <span className='text-grey-70'>{t('optionalTag')}
            </span>
          </p>
          <div className='flex gap-5'>
            <RadioButton
            value={'true'}
            id='leftPreference'
            cyData='leftPreference'
            registrationOption={register('hasDoneBackgroundCheck')} label={t('refereeInformation.backgroundOption1') ?? ''}/>
            <RadioButton
            value={''}
            id='rightPreference'
            cyData='rightPreference'
            registrationOption={register('hasDoneBackgroundCheck')} label={t('refereeInformation.backgroundOption2') ?? ''}/>
          </div>
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
};
