export type BusinessSize = '1-5' | '6-20' | '21-50' | '51-99' | '100+';

export interface RegistrationStepsFrom {
  userStepIndex: number
  type?: 'ADMIN' | 'REFEREE' | 'newUser'
  tempPass?: string | null
  email: {
    value: {
      email: string
    }
  }
  passowrd: {
    value: {
      password: string
      confirmPassword: string
    }
  }
  userInformation: {
    value: {
      firstName: string
      lastName: string
    }
  }
  companyInformation: {
    value: {
      businessName: string
      businessSize: BusinessSize
      city: string
      state: string
      zipcode: string
      facilityMailingAddress: string
    }
  }
  refereeInformation: {
    value: {
      bio: string
      yearsOfExperience: Date
      location: string
      city: string
      state: string
      zipCode: string
      isCertified: boolean
      hasDoneBackgroundCheck: boolean
    }
  }
}
