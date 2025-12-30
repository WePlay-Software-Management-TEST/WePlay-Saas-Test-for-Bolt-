import React from 'react';
import { signOut } from 'core/services/auth.service';

import {
  type UserContextType,
  type UserAttributesState,
  type ReducerActionTypes
} from 'core/models/userContext.model';
import { userInitialState } from './context.const';
export const UserContext = React.createContext<UserContextType>({
  user: userInitialState,
  dispatch: () => null
});

export function userStateReducer (
  user: UserAttributesState,
  action: ReducerActionTypes): UserAttributesState {
  switch (action.type) {
    case 'update':
      return {
        ...user,
        ...action.userData
      };
    case 'delete':
      void signOut();
      return userInitialState;
    default:
      return user;
  }
};
