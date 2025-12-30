import React from 'react';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import { getInitials } from 'core/utils/utils';

/**
 * Functional component for rendering the profile header of the user.
 * Retrieves user information and displays the user's name, initials, and email.
 * Utilizes the useAuthContext hook to access user data and getPlayerinformation function to fetch user details.
 * @returns JSX element representing the profile header UI.
 */
function ProfileHeader (): JSX.Element {
  const { user } = useAuthContext();
  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`;

  return (
    <>
    <section className='flex justify-between items-center gap-2'>
        <InitialsAvatar
        version={user.version}
        imageId={user.photoId}
        initials={getInitials(undefined, user.firstName, user.lastName ?? '')}
        containerClassName='mobile:w-8 w-[48px] h-[48px] mobile:h-auto'
        textClassName='mobile:text-sm mobile:text-center'
        />
        <div className='flex flex-col gap-1 mobile:hidden'>
          <p className='body-sm-text text-grey-10 font-normal'>
            { fullName }
          </p>
          <p className='body-xxs-text text-grey-60 font-light'>{user?.attributes?.email}</p>
        </div>
    </section>
    </>
  );
};

export default ProfileHeader;
