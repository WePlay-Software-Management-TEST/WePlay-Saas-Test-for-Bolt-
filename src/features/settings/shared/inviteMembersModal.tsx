import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'core/components/button/button';
import { ReactComponent as CancelIcon } from 'assets/svgs/cancel.svg';
import SelectInput from 'core/components/input/selectInput';
import { useForm } from 'react-hook-form';
import { emailPattern } from 'core/context/regex.const';
import { toastService } from 'core/services/toast.service';
import { inviteUser } from 'core/services/auth.service';
import { type Contact } from 'graphql/table.models';
import Input from 'core/components/input/input';

interface InviteUsersForm {
  newMembersEmails: string
  membersRole: string
}

/**
 * Renders a modal for inviting members.
 *
 * @returns The JSX element representing the invite members modal.
 */
export function InviteMembersModal ({ updateUsers }: { updateUsers: (users: Contact) => void }): JSX.Element {
  const { t: translate } = useTranslation(['settings']);
  const {
    register,
    control,
    handleSubmit,
    getFieldState,
    reset,
    formState: { isValid }
  } = useForm<InviteUsersForm>({
    mode: 'onChange',
    defaultValues: {
      newMembersEmails: '',
      membersRole: '1'
    }
  });
  const newMembersEmailsRegister = register(
    'newMembersEmails',
    {
      required: true,
      validate: {
        isEmailCorrect: (value) => {
          return emailPattern.test(value) || 'Please Enter a valid Email';
        }
      }
    });

  const sendInvitations = handleSubmit(async (value) => {
    await inviteUser(value.newMembersEmails, value.membersRole).then((res) => {
      const toastMsgText = value.membersRole === '1' ? 'organization.toast.adminMsg' : 'organization.toast.refereeMsg';
      reset();
      const user: Contact = {
        id: '',
        FirstName: '',
        LastName: '',
        ContactRoles: {
          items: [
            {
              rolesID: value.membersRole
            }
          ]
        },
        ContactEmails: {
          items: [{
            Email: value.newMembersEmails
          }]
        }
      } as unknown as Contact;
      updateUsers(user);
      toastService(translate(toastMsgText), 'secondary');
    }).catch((err) => {
      console.log(err);
      toastService(translate(err?.errors?.[0].message), 'error');
    });
  });

  return (
    <>
    <input type="checkbox" id="inviteMembersModal" className="modal-toggle" />
    <div className="modal">
  <div className="modal-box rounded-2xl relative p-6 flex flex-col">
    <div className='flex justify-between items-center pb-6'>
    <h3 className="font-semibold text-3xl text-grey-20">{translate('organization.inviteModal.header')}</h3>
    <label htmlFor="inviteMembersModal" className="btn btn-sm btn-circle outline-none border-none bg-transparent">
      <CancelIcon />
    </label>
    </div>
    <form className='pb-4 flex mobile:flex-col gap-2 items-start justify-between'>
      <Input
        registrationOption={newMembersEmailsRegister}
        fieldState={getFieldState('newMembersEmails')}
        legendText={'New Members'}
        id='inviteMembersEmailsInput'
        cyData='inviteMembersEmailsInputCy'
        placeholder='Enter New Member Email'
      />
      <span className='w-1/2'>
      <SelectInput
        placeholder=''
        registrationOption={register('membersRole')}
        fieldState={getFieldState('membersRole')}
        fieldNameControl='membersRole'
        formControl={control}
        legendText='Select Role'
        id='inviteMembersSelectRole'
        cyData='inviteMembersSelectRoleCy'
        options={[
          { value: '1', label: 'Admin' },
          { value: '2', label: 'Referee' }
        ]}
      />
      </span>
    </form>
    <div className='flex w-full justify-end gap-2 h-[40px]'>
      <Button type='tertiary' size='small' buttonHtmlTag='label' htmlFor='inviteMembersModal' text={translate('organization.inviteModal.cancel')}></Button>
      <Button
        isValidChecked={isValid}
        type='primary'
        size='small'
        cyData='sendInviteButton'
        asyncOnClick={sendInvitations}
        text={translate('organization.inviteModal.addButton')}/>
    </div>
  </div>
</div>
</>
  );
};
