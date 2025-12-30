import { type UserAttributesState } from 'core/models/userContext.model';

export const userInitialState: UserAttributesState = {
  id: '',
  username: '',
  attributes: {
    sub: '',
    email_verified: false,
    email: '',
    'custom:redirectUrl': 'string',
    'custom:BusinessId': ''
  },
  idToken: '',
  role: '1',
  photoId: '',
  version: 0
};
