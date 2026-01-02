import React, { useEffect, useReducer, useState } from 'react';
import { supabase } from 'core/services/supabase.client';
import GlobalLoadingScreen from 'core/components/misc/globalLoadingScreen';
import { userInitialState } from './context.const';
import { userStateReducer, UserContext } from './userContext';
import { type UserAttributesState } from 'core/models/userContext.model';

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [user, dispatch] = useReducer(userStateReducer, userInitialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user: supabaseUser }, error } = await supabase.auth.getUser();

        if (error || !supabaseUser) {
          setIsLoading(false);
          dispatch({ type: 'delete' });
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          setIsLoading(false);
          dispatch({ type: 'delete' });
          return;
        }

        const userinfoState: UserAttributesState = {
          id: supabaseUser.id,
          idToken: session.access_token,
          username: supabaseUser.email || '',
          attributes: {
            email: supabaseUser.email || '',
            sub: supabaseUser.id,
            email_verified: supabaseUser.email_confirmed_at !== null
          }
        };

        dispatch({ type: 'update', userData: userinfoState });
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking user:', error);
        setIsLoading(false);
        dispatch({ type: 'delete' });
      }
    };

    void checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const userinfoState: UserAttributesState = {
          id: session.user.id,
          idToken: session.access_token,
          username: session.user.email || '',
          attributes: {
            email: session.user.email || '',
            sub: session.user.id,
            email_verified: session.user.email_confirmed_at !== null
          }
        };
        dispatch({ type: 'update', userData: userinfoState });
      } else {
        dispatch({ type: 'delete' });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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
