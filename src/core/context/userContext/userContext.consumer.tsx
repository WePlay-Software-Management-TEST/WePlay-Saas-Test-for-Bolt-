import React from 'react';
import { UserContext } from './userContext';
import { type UserContextType } from 'core/models/userContext.model';

const useAuthContext = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (context.user === undefined) {
    throw new Error('useAuthContext must be inside a AuthProvider');
  }
  return context;
};
export default useAuthContext;
