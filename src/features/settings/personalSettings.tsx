import React, { useState, useEffect, useRef } from 'react';
import ImageUpload from 'core/components/input/imageUpload';
import Input from 'core/components/input/input';
import { useForm } from 'react-hook-form';
import { ReactComponent as EditIcon } from 'assets/svgs/Edit_light.svg';
import { type InputProps } from 'core/models/input.model';
import { type ImageUploadProps } from 'core/models/uploadimage.model';
import { namePattern, emailPattern } from 'core/context/regex.const';
import { useTranslation } from 'react-i18next';
import { type Contact } from 'graphql/table.models';
import Button from 'core/components/button/button';
import { API } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { updateS3StorageUser } from 'features/player/player.service';
import { updateContactEmails, updateContacts } from 'graphql/mutations';
import { toastService } from 'core/services/toast.service';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import useAuthContext from 'core/context/userContext/userContext.consumer';

export interface PersonalSettingsProps {
  id: string
  FirstName: string | null
  LastName: string | null
  Email: string | null
  contactImage: {
    photoId: string | null
    files: File[]
  }
  _version: number
}

interface PersonalDetails {
  personalDetails: PersonalSettingsProps | undefined
  onVersionChange: React.Dispatch<React.SetStateAction<number>>
  users: Contact[]
}

interface PersonalSettingsForm {
  id: string
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  personalPhoto?: File[]
  _version: number
}

export default function PersonalSettings ({ personalDetails, onVersionChange, users }: PersonalDetails): JSX.Element {
  const { t } = useTranslation('inputText');
  const [disableForm, setDisableForm] = useState(false);
  const imageCache = useImageCache();
  const [cachedUrl, setCachedUrl] = useState<string | null>(null);
  const { user, dispatch } = useAuthContext();

  const { register, formState, control, getFieldState, setValue, reset, getValues, trigger } = useForm<PersonalSettingsForm>({
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: {
      firstName: personalDetails?.FirstName as string,
      lastName: personalDetails?.LastName as string,
      email: personalDetails?.Email as string,
      personalPhoto: personalDetails?.contactImage.files ?? []
    },
    resetOptions: {
      keepDirty: false,
      keepIsValid: false
    }
  });

  useEffect(() => {
    if (!personalDetails) return;
    reset({
      firstName: personalDetails.FirstName ?? '',
      lastName: personalDetails.LastName ?? '',
      email: personalDetails.Email ?? '',
      personalPhoto: personalDetails.contactImage.files
    });
    void trigger();

    if (personalDetails.contactImage.files.length) {
      const file = personalDetails.contactImage.files[0];
      const previewObject = Object.assign(file, {
        preview: URL.createObjectURL(file),
        fileName: file.name,
        path: personalDetails.contactImage.photoId ?? ''
      });
      initialImageRef.current = [previewObject];
      setValue('personalPhoto', [file], { shouldDirty: true, shouldValidate: true });
    }
  }, [personalDetails, reset, setValue, trigger]);

  const initialImageRef = useRef(
    personalDetails?.contactImage.files?.length
      ? [Object.assign(personalDetails.contactImage.files[0], {
          fileName: personalDetails.contactImage.files[0].name,
          path: personalDetails.contactImage.photoId ?? '',
          preview: URL.createObjectURL(personalDetails.contactImage.files[0])
        })]
      : undefined
  );

  useEffect(() => {
    if (!user.photoId) {
      setCachedUrl(null);
    }
    imageCache.getImageWithCache(user.photoId as string).then(setCachedUrl).catch(() => { setCachedUrl(null); });
  }, [user.photoId, imageCache]);

  const uploadImageProps: ImageUploadProps = {
    id: 'playerProfileImage',
    cyDataInput: 'imageInputCy',
    cyDataDraggable: 'imageDraggableZoneCy',
    formFieldName: 'personalPhoto',
    filesPreview: initialImageRef.current,
    setValue
  };

  const firstNameProps: InputProps = {
    legendText: t('firstNameLegendText'),
    placeholder: t('firstNamePlaceholder'),
    id: 'firstNameInput',
    cyData: 'firstNameInput',
    fieldState: getFieldState('firstName', formState),
    showRequired: 'required',
    formControl: control,
    registrationOption:
        register(
          'firstName',
          {
            required: {
              value: true,
              message: t('fieldRequired')
            },
            maxLength: {
              value: 32,
              message: t('NameMaxLength')
            },
            pattern: namePattern
          }
        )
  };

  const lastNameProps: InputProps = {
    legendText: t('lastNameLegendText'),
    placeholder: t('lastNamePlaceholder'),
    id: 'lastNameInput',
    cyData: 'lastNameInput',
    fieldState: getFieldState('lastName', formState),
    showRequired: 'required',
    formControl: control,
    registrationOption:
        register(
          'lastName',
          {
            required: {
              value: true,
              message: t('fieldRequired')
            },
            maxLength: {
              value: 32,
              message: t('NameMaxLength')
            },
            pattern: namePattern
          }
        )
  };

  const userEmailProps: InputProps = {
    legendText: t('emailAddressLegend'),
    placeholder: t('emailAddressPlaceholder'),
    id: 'userEmailInput',
    cyData: 'userEmailInput',
    fieldState: getFieldState('email', formState),
    showRequired: 'required',
    formControl: control,
    registrationOption:
      register(
        'email',
        {
          required: {
            value: true,
            message: t('fieldRequired')
          },
          pattern: {
            value: emailPattern,
            message: t('invalidEmailError')
          },
          validate: (value) => {
            const taken = users.some(u =>
              u.ContactEmails?.items?.[0]?.Email === value && u.id !== user?.id
            );
            return !taken ? true : String(t('EmailAlreadyInUseError'));
          }
        }
      )
  };

  const onSubmit = async (): Promise<void> => {
    if (!personalDetails) return;
    setDisableForm(true);

    try {
      const values = getValues();
      const imageFile = values.personalPhoto?.[0];

      const oldEmail = personalDetails?.Email;
      const newEmail = values.email;

      if (oldEmail !== newEmail) {
        const contact = users.find(u => u.id === user.id);
        const contactEmail = contact?.ContactEmails?.items?.[0];

        if (contactEmail?.id) {
          const updateEmailInput = {
            id: contactEmail.id,
            Email: newEmail,
            contactsID: user.id,
            _version: contactEmail._version
          };

          await API.graphql({
            query: updateContactEmails,
            variables: { input: updateEmailInput },
            authToken: user.idToken
          });
        } else {
          console.error('No email record found to update!');
        }
      }

      let photoKey = personalDetails.contactImage.photoId ?? null;

      if (imageFile && imageFile instanceof File) {
        if (!photoKey) photoKey = uuidv4();

        const result = await updateS3StorageUser(photoKey, imageFile);
        if (!result?.key) throw new Error('Image upload failed');

        if (user.photoId) {
          imageCache.clearImageFromCache(user.photoId);
        }

        try {
          await imageCache.getImageWithCache(photoKey);
          console.log('new image pre-cached');
        } catch (err) {
          console.error('Failed to pre-cache new image: ', err);
        }
      }

      const userInfoInput = {
        id: user.id,
        FirstName: values.firstName,
        LastName: values.lastName,
        PhotoId: photoKey,
        _version: personalDetails._version
      };

      await API.graphql({
        query: updateContacts,
        variables: { input: userInfoInput },
        authToken: user.idToken
      });

      const newVersion = (user.version as number) + 1;

      dispatch({
        type: 'update',
        userData: {
          ...user,
          firstName: values.firstName,
          attributes: {
            ...user.attributes,
            email: values.email as string
          },
          lastName: values.lastName,
          photoId: photoKey as string,
          version: newVersion
        }
      });

      onVersionChange?.(newVersion);

      toastService('Profile updated successfully', 'secondary');
    } catch (err) {
      console.error('Error updating user info ', err);
    } finally {
      setDisableForm(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-normal mb-6 text-lg">
          Personal Photo <span className="text-md text-grey-40">(optional)</span>
        </label>
        <ImageUpload
          {...uploadImageProps}
          defaultPreviewUrl={cachedUrl ?? undefined} />
      </div>

      <div className="flex gap-4 my-4">
        <Input {...firstNameProps} />
        <Input {...lastNameProps} />
      </div>

      <Input {...userEmailProps} />
      <Button
        asyncOnClick={onSubmit}
        Icon={EditIcon}
        showIcon
        showTextOnMobile
        iconPosition='right'
        type='primary'
        className='mobile:w-full mobile:p-0 px-6 my-4'
        cyData='updateDetailsButton'
        text={t('organization.personal.updateDetailsButton', { ns: 'settings' })}
        isDisabled={disableForm || !formState.isValid || !formState.isDirty}
      />
  </div>
  );
}
