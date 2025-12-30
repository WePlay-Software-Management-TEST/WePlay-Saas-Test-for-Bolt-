import React, { useState, useEffect, memo } from 'react';
import { ReactComponent as WePlaySidePanelLogo } from 'assets/svgs/WePlayLogoShort.svg';
import { ReactComponent as FullWePlayLogo } from 'assets/svgs/WePlayLogo.svg';
import { ReactComponent as PlayerIcon } from 'assets/svgs/sidePanelPlayersIcon.svg';
import { ReactComponent as TeamsIcon } from 'assets/svgs/sidePanelTeamsIcon.svg';
import { ReactComponent as TournmentsIcons } from 'assets/svgs/sidePanelTournmentsIcon.svg';
import { ReactComponent as SettingsIcon } from 'assets/svgs/settingsIcon.svg';
import { ReactComponent as HelpIcon } from 'assets/svgs/helpIcon.svg';
import { ReactComponent as LogOutIcon } from 'assets/svgs/logOutIcon.svg';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import { useTranslation } from 'react-i18next';
import Modal from 'core/components/modal/modal';
import { type ModalProps } from 'core/models/modal.model';
import SidePanelLink from 'core/components/misc/sidePanelLink';
import leftImageModal from 'assets/images/logoutLeftModal.png';
import { listUsersQuery } from 'core/services/auth.service';
import { FEEDBACK_FORM_URL } from 'core/constants';

/**
 * Renders the side panel component.
 * @returns JSX.Element representing the side panel.
 */
export function SidePanel (): JSX.Element {
  const { user, dispatch } = useAuthContext();
  const { t } = useTranslation(['sidePanel']);
  const [userLogsOut, setUserLogsOut] = useState(false);
  const { firstName, lastName, attributes: { email } } = user;
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    listUsersQuery().then((res: any) => {
      setBusinessName(
        Array.isArray(res?.listBusinesses?.items) && res.listBusinesses.items.length > 0
          ? res.listBusinesses.items[0].BusinessName
          : ''
      );
    }).catch((err) => {
      console.error('error while trying to fetch business name', err);
    });
  }, []);

  const logOut = (): void => {
    setUserLogsOut(false);
    dispatch({ type: 'delete' });
  };

  const openLogoutModal = (): void => {
    setUserLogsOut(true);
  };

  const modalProps: ModalProps = {
    id: 'logoutModal',
    isOpen: userLogsOut,
    header: t('logoutModal.header') ?? '',
    paragraph: t('logoutModal.paragraph') ?? '',
    confirmButtonText: t('logoutModal.confirmText') ?? '',
    closeButtonText: t('logoutModal.closeText') ?? '',
    leftPanelImage: leftImageModal,
    onConfirm: logOut,
    onClose: () => { setUserLogsOut(false); }
  };

  return (
  <>
  <div className="drawer-side lg:!overflow-visible z-50">
    <label htmlFor="my-drawer" className="drawer-overlay bg-black opacity-60"></label>
    <ul
    className="
    h-full
    bg-grey-10
    menu
    flex
    flex-col
    lg:px-3
    lg:py-4
    xs:px-6
    xs:py-8
    justify-between
    xs:w-[340px]
    lg:w-14">
      <div>
        <WePlaySidePanelLogo className='lg:block xs:hidden' />
        <div className='flex justify-between items-center pb-8 '>
          <FullWePlayLogo className='xs:block lg:hidden'/>
          <label
          htmlFor="my-drawer"
          className="
          btn
          btn-circle
          drawer-button
          fill-white
          bg-grey-20
          border-0
          lg:hidden
          xs:flex">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9"
          fill="white"
          viewBox="0 0 24 24"
          stroke="#FFFFFF">
            <path strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M6 18L18 6M6 6l12 12" /></svg>
          </label>
        </div>
        <div className='flex flex-col gap-4'>
          <li>
            <SidePanelLink
              isNavigate={true}
              text={t('players')}
              Icon={PlayerIcon}
              navigateTo={'/player'}
              tooltipText={t('players')}
            />
          </li>
          <li>
            <SidePanelLink
              isNavigate={true}
              text={t('teams')}
              Icon={TeamsIcon}
              navigateTo={'/teams'}
              tooltipText={t('teams')}
              />
          </li>
          <li>
            <SidePanelLink
              isNavigate={true}
              text={t('games')}
              Icon={TournmentsIcons}
              navigateTo={'/tournament'}
              tooltipText={t('games')}
              />
          </li>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className="divider bg-grey-40 rounded-md h-[1px]"></div>
       {
        <li>
          <SidePanelLink
            dataCy='sidePanelSettings'
            isNavigate={true}
            text={t('settings')}
            Icon={SettingsIcon}
            navigateTo={'/settings'}
            tooltipText={t('settings')}
            />
        </li>
       }
        <li>
          <SidePanelLink
            isNavigate={true}
            text={t('help')}
            Icon={HelpIcon}
            tooltipText={t('help')}
            navigateTo={`${FEEDBACK_FORM_URL}
              &entry.1000057=${encodeURIComponent(firstName ?? '')}
              &entry.1000027=${encodeURIComponent(lastName ?? '')}
              &entry.967112212=${encodeURIComponent(email ?? '')}
              &entry.1570217265=${encodeURIComponent(businessName ?? '')}`}
            />
        </li>
        <li>
          <SidePanelLink
            isNavigate={false}
            text={t('logout')}
            Icon={LogOutIcon}
            onClickCallable={openLogoutModal}
            tooltipText={t('logout')}
            />
        </li>
      </div>
    </ul>
  </div>
  <Modal {...modalProps} />
  </>
  );
};

export const MemorizedSidePanel = memo(SidePanel);
