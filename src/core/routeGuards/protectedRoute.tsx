import React from 'react';
import { Navigate } from 'react-router';
import { type UserAttributesState } from 'core/models/userContext.model';
import { userInitialState } from 'core/context/userContext/context.const';

interface ProtectedRouteProps {
  user: UserAttributesState
  children: JSX.Element
}

function ProtectedRoute ({ user, children }: ProtectedRouteProps): JSX.Element {
  if (user === undefined || user === userInitialState) {
    return (<Navigate to="/login" replace={true} />);
  };
  return children;
};

export default ProtectedRoute;
