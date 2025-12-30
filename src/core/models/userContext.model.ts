export interface UserAttributesState {
  id: string
  username: string
  attributes: {
    sub: string
    email_verified: boolean
    email: string
    'custom:redirectUrl': string
    'custom:BusinessId': string
  }
  idToken: string
  role?: string
  firstName?: string
  lastName?: string
  photoId?: string
  version?: number
};

export type ReducerActionTypes =
  | { type: 'update', userData: UserAttributesState }
  | { type: 'delete' };

export interface UserContextType {
  user: UserAttributesState
  dispatch: React.Dispatch<ReducerActionTypes>
};
