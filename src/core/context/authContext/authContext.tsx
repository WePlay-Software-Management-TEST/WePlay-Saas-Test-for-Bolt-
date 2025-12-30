import React from 'react';
import { authContextInitial } from './authContext.const';
import { type AuthContextType, type AuthContextState, type ReducerActionTypes } from './auth.context.models';

export const AuthContext = React.createContext<AuthContextType>({
  allowedAuth: authContextInitial,
  dispatch: () => null
});

export function authStateReducer (
  user: AuthContextState,
  action: ReducerActionTypes): AuthContextState {
  switch (action.type) {
    case 'update':
      return { ...action.allowedAuth };
    case 'delete':
      return authContextInitial;
    default:
      return user;
  }
};
