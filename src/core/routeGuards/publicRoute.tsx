import React from 'react';
import { Navigate } from 'react-router';
import { type UserAttributesState } from 'core/models/userContext.model';
import { userInitialState } from 'core/context/userContext/context.const';

interface ProtectedRouteProps {
  user: UserAttributesState
  children: JSX.Element
}

function PublicRoute ({ user, children }: ProtectedRouteProps): JSX.Element {
  if (user === undefined || user === userInitialState) {
    return children;
  };
  return <Navigate to="/" replace={true} />;
};

export default PublicRoute;
