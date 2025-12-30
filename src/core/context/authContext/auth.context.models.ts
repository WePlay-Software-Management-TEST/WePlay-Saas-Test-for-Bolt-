export const USER_ROLES = {
  ADMIN: 1,
  REFEREE: 2,
  PLAYER: 4
} as const;

type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface AuthContextState {
  authRoutes: Record<UserRole, string[]>
  authComps: Record<UserRole, string[]>
};

export type ReducerActionTypes =
  | { type: 'update', allowedAuth: AuthContextState }
  | { type: 'delete' };

export interface AuthContextType {
  allowedAuth: AuthContextState
  dispatch: React.Dispatch<ReducerActionTypes>
};
