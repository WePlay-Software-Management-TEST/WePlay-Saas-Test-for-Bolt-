import React, { useEffect, useReducer, useState } from 'react';
import { Auth } from 'aws-amplify';
import GlobalLoadingScreen from 'core/components/misc/globalLoadingScreen';
import { userInitialState } from './context.const';
import { userStateReducer, UserContext } from './userContext';
import { type UserAttributesState } from 'core/models/userContext.model';
import { getPlayerinformation } from 'features/player/player.service';

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [user, dispatch] = useReducer(userStateReducer, userInitialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void Auth.currentAuthenticatedUser()
      .then(async (responseUserResults: any) => {
        const userInfo = await getPlayerinformation(responseUserResults.username);
        if (responseUserResults === null || Object.keys(responseUserResults).length === 0) {
          setIsLoading(false);
          return;
        };
        const userinfoState: UserAttributesState = {
          id: responseUserResults.username,
          idToken: responseUserResults.signInUserSession.idToken.jwtToken,
          username: responseUserResults.username,
          attributes: responseUserResults.attributes,
          role: userInfo.data?.getContacts?.ContactRoles?.items[0]?.rolesID,
          firstName: userInfo.data?.getContacts?.FirstName,
          lastName: userInfo.data?.getContacts?.LastName ?? '',
          photoId: userInfo.data?.getContacts?.PhotoId ?? ''
        };
        dispatch({ type: 'update', userData: userinfoState });
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
        dispatch({ type: 'delete' });
      });
  }, []);

  if (isLoading) {
    return (
    <div
    className='w-screen h-screen flex justify-center items-center'>
      <GlobalLoadingScreen />
    </div>);
  };

  return (
    <UserContext.Provider value={{ user, dispatch }}>{children}</UserContext.Provider>
  );
};

export { UserContext };
