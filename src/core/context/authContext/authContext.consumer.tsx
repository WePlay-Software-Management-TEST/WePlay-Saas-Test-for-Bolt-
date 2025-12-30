import React from 'react';
import { AuthContext } from './authContext';
import { type AuthContextType } from './auth.context.models';

const useAllowedAuthContext = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context.allowedAuth === undefined) {
    throw new Error('useAllowedAuthContext must be inside a useAllowedAuthProvider');
  }
  return context;
};
export default useAllowedAuthContext;
