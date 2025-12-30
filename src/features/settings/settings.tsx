import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ReactComponent as OrgIcon } from 'assets/svgs/orgIcon.svg';
import { useTranslation } from 'react-i18next';
import Table from 'core/components/table/table';
import { type ColDef, type GetRowIdParams } from 'ag-grid-community';
import { ProfileDetailsRenderer } from 'core/components/table/cellRenderers/ProfileDetailsRenderer';
import { OptionsCellRenderer } from 'core/components/table/cellRenderers/optionsCellRenderer';
import Button from 'core/components/button/button';
import { MemorizedRemoveMemberModal } from './shared/removeMemberModal';
import { InviteMembersModal } from './shared/inviteMembersModal';
import { type Contact } from 'graphql/table.models';
import { listUsersQuery } from 'core/services/auth.service';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import PersonalSettings, { type PersonalSettingsProps } from './personalSettings';
import { getPlayerinformation } from 'features/player/player.service';
import produce from 'immer';
import { type Contacts, type Businesses } from 'API';
import AuthorizedRoute from 'core/routeGuards/authorizedRoute';
import OrganizationSettings from './organizationSettings';
import DashboardLoading from 'core/layout/dashboardLoading';

/**
 * Renders the Settings component for managing organization settings and user roles.
 *
 * This component displays a table of users with their roles and provides functionality
 * to invite new members and remove existing ones. It uses various hooks to manage state,
 * fetch user data, and handle modal interactions. The component is integrated with
 * translation and authentication contexts for localized content and user-specific actions.
 *
 * @returns {JSX.Element} The rendered Settings component.
 */
export function Settings (): JSX.Element {
  const { t: translate } = useTranslation('settings');
  const { user } = useAuthContext();
  const [isRemoveMemberModalOpen, setIsRemoveMemberModalOpen] = useState(false);
  const [selectedUser, SetSelectedUser] = useState<Contact>();
  const [users, setUsers] = useState<Contact[]>([]);
  const [personalInformation, setPersonalInformation] = useState<PersonalSettingsProps>({
    id: '',
    FirstName: '',
    LastName: '',
    Email: '',
    contactImage: {
      photoId: null,
      files: []
    },
    _version: 0
  });
  const [isLoading, setIsloading] = useState(true);
  const [versionChange, setVersionChange] = useState<number>(user.version ?? 0);
  const [businessDetails, setBusinessDetails] = useState<Businesses>();

  const updateUsers = useCallback((user: Contact) => {
    setUsers((prev) => [...prev, user]);
  }, []);

  const onModalClose = (success?: boolean, id?: string, name?: string): void => {
    setIsRemoveMemberModalOpen(false);

    if (success === true) {
      setUsers((prevUsers) => {
        return prevUsers.filter((user) => user.id !== id);
      });
    }
  };

  useEffect(() => {
    void listUsersQuery().then((res) => {
      const data = res?.listContacts?.items as Contact[];
      setUsers(data);

      const business = (res as unknown as any).listBusinesses?.items[0];

      if (business) {
        setBusinessDetails(business);
      }
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setIsloading(false);
    });
  }, [users.length, versionChange]);

  useEffect(() => {
    void getPlayerinformation(user.id).then((res) => {
      const contact = res.data?.getContacts as Contacts;

      setPersonalInformation(current => produce(current, (draft: any) => {
        if (!draft) return;
        draft.id = contact.id;
        draft.FirstName = contact.FirstName ?? '';
        draft.LastName = contact.LastName ?? '';
        draft.Email = contact.ContactEmails?.items[0]?.Email ?? '';
        draft.contactImage = {
          photoId: contact.PhotoId ?? '',
          files: []
        };
        draft._version = contact._version;
      }));
    }).catch((err) => { console.error('error while fetching contact information', err); });
  }, [users.length, user.id, user.firstName, user.lastName, user.attributes.email, user.version]);

  const setDeleteMember = (data: Contact): void => {
    SetSelectedUser(data);

    setTimeout(() => { setIsRemoveMemberModalOpen(true); }, 20);
  };

  const colDef = useMemo<Array<ColDef<any>>>(() => {
    return [
      {
        headerName: 'Name',
        width: 200,
        minWidth: 200,
        wrapText: true,
        cellRenderer: ({ data }: GetRowIdParams<Contact>) => {
          const isCurrent = data.id === user.id;
          return <ProfileDetailsRenderer
            version={versionChange}
            paragraph={`${data.FirstName} ${data.LastName ?? ''}`}
            imageId={isCurrent ? data.PhotoId ?? '' : ''}
          />;
        }
      },
      {
        headerName: 'Email',
        field: 'email',
        minWidth: 260,
        valueGetter: ({ data }) => data.ContactEmails?.items?.[0]?.Email,
        wrapText: true
      },
      {
        headerName: 'Role',
        field: 'role',
        valueGetter: ({ data }) => {
          return data.ContactRoles.items[0]?.rolesID === '1' ? 'Admin' : 'Referee';
        }
      },
      {
        headerName: 'Status',
        field: 'status',
        valueGetter: ({ data }) => {
          return data.FirstName === '' ? 'Invite Sent' : 'Confirmed';
        }
      },
      {
        headerName: 'Actions',
        sortable: false,
        minWidth: 100,
        maxWidth: 100,
        colId: 'options',
        cellClass: 'toolTip-cell-aggrid ag-left-aligned-cell',
        cellRenderer: ({ data }: GetRowIdParams<Contact>) => {
          if (user.id === data.id) {
            return '-';
          }
          if (user.attributes.email === data.ContactEmails?.items[0]?.Email) {
            return '-';
          }
          if (data.FirstName === '') {
            return '-';
          }
          return <OptionsCellRenderer
            deleteTipText={translate('organization.table.deleteHoverTip') ?? ''}
            hideButton='edit'
            disableHoverEffect
            id={data.id}
            className='justify-end'
            onDelete={() => { setDeleteMember(data); }}
          />;
        }
      }
    ];
  }, [versionChange]);

  const OrgSidePanel = (): JSX.Element => (
    <section role='settings-menu' className='lg:flex-col p-6 lg:flex hidden border-r border-grey-90'>
    <span role='settings-menuItem' className='flex gap-4 justify-start items-center p-2'>
        <OrgIcon className='w-6 h-6' />
        <p className='body-xs-text text-grey-10 font-bold'>{translate('settingsMenu.organization')}</p>
    </span>
    </section>
  );

  const OrgUsersTable = (): JSX.Element => (
        <section className='flex w-full h-full pt-9 mobile:pt-4 gap-11 mobile:gap-4 mobile:flex-col'>
          <span className='gap-2 flex flex-col'>
            <h1 className='font-bold text-grey-10 text-2xl mobile:text-sm leading-7'>{translate('organization.subHeader')}</h1>
            <h6 className='font-normal text-grey-50 text-xs leading-5'>{translate('organization.subParagraph')}</h6>
          </span>
          <div className='flex flex-col w-full gap-8'>
            <Table
              columnDefs={colDef}
              rowData={users}
              customTheme='settings-table !h-auto'
              customNoRowComponent={() => <></>}
              enableCellTextSelection
            />
            <span className='self-start mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0 mobile:px-4 mobile:py-3 border-t border-grey-90 mobile:bg-white'>
              <Button
                type='primary'
                className='mobile:w-full mobile:p-0 px-6'
                buttonHtmlTag='label'
                htmlFor='inviteMembersModal'
                cyData='inviteMemebersButton'
                text={translate('organization.inviteButton')}
              />
            </span>
          </div>
      </section>
  );

  const ProfileSettings = (): JSX.Element => (
    <div className="flex-col md:flex md:flex-row gap-11 mt-8">
       <span role='organization-settings-header' className='flex flex-col gap-2 pt-6 mobile:p-0 mobile:pt-4'>
          <h1 className='font-bold text-grey-10 text-2xl mobile:text-base leading-7'>{translate('organization.personal.subHeader')}</h1>
          <h6 className='font-normal text-grey-50 text-xs leading-5'>{translate('organization.personal.subParagraph')}</h6>
       </span>
        <section className='flex w-full h-full pt-9 mobile:pt-4 gap-11 mobile:gap-4 mobile:flex-col'>
          <div className='flex flex-col w-full gap-8 mb-4'>
            <PersonalSettings
              users={users}
              onVersionChange={setVersionChange}
              personalDetails={personalInformation}
            />
          </div>
        </section>
      </div>
  );

  const OrgSettings = (): JSX.Element => {
    return <div className="flex-col md:flex md:flex-row gap-11 border-t border-b border-grey-90 mt-8">
       <span role='organization-settings-header' className='flex flex-col gap-2 pt-6 mobile:p-0 mobile:pt-4'>
          <h1 className='font-bold text-grey-10 text-2xl mobile:text-base leading-7'>{translate('organization.business.subHeader')}</h1>
          <h6 className='font-normal text-grey-50 text-xs leading-5'>{translate('organization.business.subParagraph')}</h6>
       </span>
        <section className='flex w-full h-full pt-9 mobile:pt-4 gap-11 mobile:gap-4 mobile:flex-col'>
          <div className='flex flex-col w-full gap-8 mb-4'>
            <OrganizationSettings businessDetails={businessDetails} />
          </div>
        </section>
     </div>;
  };
  return (
   <DashboardLoading isLoading={isLoading} >
   <div role='settings-main' className='flex w-full'>
    <OrgSidePanel />
    <section role='settings-content' className='h-full w-full flex flex-col p-6 mobile:p-4'>
      <AuthorizedRoute type='authComps' id='settings.orgUsers'>
        <OrgUsersTable />
      </AuthorizedRoute>
      <AuthorizedRoute type='authComps' id='settings.orgSettings'>
        <OrgSettings />
      </AuthorizedRoute>
      <AuthorizedRoute type='authComps' id='settings.profile'>
        <ProfileSettings />
      </AuthorizedRoute>
    </section>
   </div>

<InviteMembersModal updateUsers={updateUsers}/>
<MemorizedRemoveMemberModal
    isOpen={isRemoveMemberModalOpen}
    contact={selectedUser}
    onClose={onModalClose}
    facilityName={businessDetails?.BusinessName}
    image={''}
    />
   </DashboardLoading>
  );
};
