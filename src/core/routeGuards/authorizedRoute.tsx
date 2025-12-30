import React, { useState } from 'react';
import { Navigate } from 'react-router';
import useAllowedAuthContext from 'core/context/authContext/authContext.consumer';
import useAuthContext from 'core/context/userContext/userContext.consumer';
import { type AuthContextState } from 'core/context/authContext/auth.context.models';

interface ProtectedRouteProps {
  type?: keyof AuthContextState
  children: JSX.Element
  id?: string
}

function AuthorizedRoute ({ id, type = 'authRoutes', children }: ProtectedRouteProps): JSX.Element {
  const { allowedAuth } = useAllowedAuthContext();
  const { user: { role } } = useAuthContext();
  const [allowed] = useState(allowedAuth[type]);

  if (type === 'authComps') {
    if (allowed[role as unknown as keyof typeof allowed]?.includes(id ?? '')) {
      return <></>;
    };
    return children;
  };

  if (allowed[role as unknown as keyof typeof allowed]?.includes(id ?? '')) {
    return children;
  };

  return (<Navigate to="/player" replace={true} />);
};

export default AuthorizedRoute;
