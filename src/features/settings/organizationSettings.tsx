import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from 'core/components/input/input';
import SelectInput from 'core/components/input/selectInput';
import { ReactComponent as EditIcon } from 'assets/svgs/edit-table.svg';
import { GooglePlacesAutoComplete } from 'core/components/input/googlePlacesAutoComplete';
import { getLocationInfo } from 'core/utils/utils';
import { businessSizeOption } from 'core/context/global.const';
import { useTranslation } from 'react-i18next';
import { type GoogleAutoCompleteInputProps, type InputProps, type SelectDropdownProps } from 'core/models/input.model';
import { produce } from 'immer';
import { type Businesses, type BusinessAddresses } from 'API';
import { FormStateContext } from 'features/signup/signup';
import { API } from 'aws-amplify';
import { getCurrentSession } from 'core/services/auth.service';
import { updateBusinessAddresses, updateBusinesses } from 'graphql/mutations';
import Button from 'core/components/button/button';
import { toastService } from 'core/services/toast.service';

interface OrganizationSettingsProps {
  businessDetails?: Businesses
}

export default function OrganizationSettings ({ businessDetails }: OrganizationSettingsProps): JSX.Element {
  const { t } = useTranslation(['registration', 'settings']);
  const { setForm } = useContext(FormStateContext);
  const [disableForm, setDisableForm] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    getFieldState,
    formState,
    reset
  } = useForm({
    shouldUseNativeValidation: false,
    mode: 'onChange',
    defaultValues: {
      businessName: '',
      businessSize: '',
      city: '',
      state: '',
      zipcode: '',
      facilityMailingAddress: ''
    }
  });

  useEffect(() => {
    if (!businessDetails) return;
    const { BusinessName, BusinessSize } = businessDetails;

    const { City, State, PostalCode, StreetAddress } = businessDetails.BusinessAddresses?.items?.[0] as unknown as any;
    reset({
      businessName: BusinessName ?? '',
      businessSize: BusinessSize ?? '',
      city: City,
      state: State,
      zipcode: PostalCode,
      facilityMailingAddress: StreetAddress
    });
  }, [businessDetails, reset]);

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

  const onPlaceSelected = (place?: google.maps.places.PlaceResult): void => {
    const { city, state, zipCode, shortName } = getLocationInfo(place);

    setValue('facilityMailingAddress', shortName, {
      shouldValidate: true,
      shouldDirty: true
    });
    setValue('city', city, { shouldValidate: true, shouldDirty: true });
    setValue('state', state, { shouldValidate: true, shouldDirty: true });
    setValue('zipcode', zipCode, { shouldValidate: true, shouldDirty: true });

    const values = getValues();
    setForm(
      produce((draft: any) => {
        draft.companyInformation.value = values;
      })
    );
  };

  const city: InputProps = {
    placeholder: t('businessInfoStep.cityplaceholder'),
    legendText: t('businessInfoStep.cityLegend'),
    showRequired: 'required',
    id: 'city',
    formControl: control,
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
    formControl: control,
    registrationOption: register('state', { required: true }),
    fieldState: getFieldState('state', formState)
  };

  const zipCode: InputProps = {
    placeholder: t('businessInfoStep.zipcodeplaceholder'),
    legendText: t('businessInfoStep.zipcodeLegend'),
    showRequired: 'required',
    id: 'zipCode',
    formControl: control,
    cyData: 'zipCodeRegistration',
    registrationOption: register('zipcode', { required: true, minLength: 5, maxLength: 5 }),
    fieldState: getFieldState('zipcode', formState)
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

  const onSubmit = async (values: any): Promise<void> => {
    if (!businessDetails?.id || !formState.isDirty) return;
    setDisableForm(true);

    const { dirtyFields } = formState;

    const businessFields: Array<keyof typeof dirtyFields> = ['businessName', 'businessSize'];
    const addressFields: Array<keyof typeof dirtyFields> = ['facilityMailingAddress', 'city', 'state', 'zipcode'];

    const isBusinessDirty = businessFields.some((field) => dirtyFields[field]);
    const isAddressDirty = addressFields.some((field) => dirtyFields[field]);

    const updatePromises = [];

    try {
      const { idToken } = await getCurrentSession();
      const values = getValues();

      if (isBusinessDirty) {
        const businessInput = {
          id: businessDetails.id,
          BusinessName: values.businessName,
          BusinessSize: values.businessSize,
          _version: businessDetails._version
        };

        const businessUpdate = API.graphql({
          authToken: idToken,
          query: updateBusinesses,
          variables: { input: businessInput }
        }) as Promise<{ data: { updateBusinesses: Businesses } }>;

        updatePromises.push(businessUpdate);
      }

      if (isAddressDirty) {
        const addressInput = {
          id: businessDetails?.BusinessAddresses?.items[0]?.id,
          StreetAddress: values.facilityMailingAddress,
          City: values.city,
          State: values.state,
          PostalCode: values.zipcode,
          _version: businessDetails?.BusinessAddresses?.items?.[0]?._version
        };

        const businessAddressUpdate = API.graphql({
          authToken: idToken,
          query: updateBusinessAddresses,
          variables: { input: addressInput }
        }) as Promise<{ data: { updateBusinessAddress: BusinessAddresses } }>;

        updatePromises.push(businessAddressUpdate);
      }

      await Promise.all(updatePromises);
      toastService('Business details updated', 'secondary');
    } catch (err) {
      console.error('Error updating business ', err);
      toastService('Error while updating business', 'error');
      return;
    } finally {
      setDisableForm(false);
      reset(values);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-6">
      <Input
        {...companyName}
      />
      <SelectInput
        {...businessSize}
      />

    <p className="text-grey-10 font-medium text-lg">Headquarter Location</p>
    <p className="text-grey-40 font-normal text-sm !my-1">Include your business location for better visibility.</p>

      <GooglePlacesAutoComplete
       {...facilityMailingAddress}
      />

      <div className="flex gap-4">
        <Input
          {...zipCode}
        />
        <Input
         {...city}
        />
        <Input
          {...state}
        />
      </div>

      <Button
        asyncOnClick={handleSubmit(onSubmit)}
        Icon={EditIcon}
        showTextOnMobile
        showIcon
        iconPosition='right'
        type='primary'
        className='mobile:w-full mobile:p-0 px-6'
        cyData='updateDetailsButton'
        text={t('organization.business.updateDetailsButton', { ns: 'settings' })}
        isDisabled={disableForm || !formState.isDirty}
      />
    </form>
  );
}
