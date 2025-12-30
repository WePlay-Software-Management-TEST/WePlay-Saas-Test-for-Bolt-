import { type RegistrationStepsFrom } from '../models/signup.models';

export const FORMSTRUCTURE: RegistrationStepsFrom = {
  userStepIndex: 0,
  type: 'newUser',
  email: {
    value: {
      email: ''
    }
  },
  passowrd: {
    value: {
      password: '',
      confirmPassword: ''
    }
  },
  userInformation: {
    value: {
      firstName: '',
      lastName: ''
    }
  },
  companyInformation: {
    value: {
      businessName: '',
      businessSize: '1-5',
      state: '',
      city: '',
      zipcode: '',
      facilityMailingAddress: ''
    }
  },
  refereeInformation: {
    value: {
      bio: '',
      yearsOfExperience: new Date(),
      location: '',
      city: '',
      state: '',
      zipCode: '',
      isCertified: false,
      hasDoneBackgroundCheck: false
    }
  }
};
