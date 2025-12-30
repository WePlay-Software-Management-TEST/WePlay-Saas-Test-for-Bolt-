import React, { useReducer } from 'react';
import { AuthContext, authStateReducer } from './authContext';
import { authContextInitial } from './authContext.const';

export const AllowedAuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [allowedAuth, dispatch] = useReducer(authStateReducer, authContextInitial);
  return (
    <AuthContext.Provider value={{ allowedAuth, dispatch }}>{children}</AuthContext.Provider>
  );
};
