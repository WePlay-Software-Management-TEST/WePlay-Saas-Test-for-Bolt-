export const CreatePlayerFixture = {
  url: '/player/create',
  firstName: 'michael',
  lastName: 'keaton',
  bio: `it is a long established fact that a reader will be distracted by the readable content of a page 
  when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
  distribution of letters, as opposed to using`,
  over250Bio: `it is a long established fact that a reader will be distracted by the readable content of a page 
  when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
  distribution of letters, as opposed to using he point of using Lorem Ipsum is that it has a more-or-less normal 
  distribution of letters, as opposed to using
  `,
  birthdate: '1971-09-05',
  zipcode: '69101',
  weight: '240',
  email: 'someEmail@email.com',
  photoLocation: 'cypress/fixtures/images/profileImage.jpg',
  invalidPhotoLocation: 'cypress/fixtures/images/lessThan1mb.gif',
  globalHeaderButton: 'globalCreateDropdown',
  createProfileGlobalHeader: 'globalActionOption',
  createProfileHeaderSelector: 'createProfileHeader',
  subTextCreateProfileHeaderSelector: 'subTextCreateProfile',
  breadCrumbSelector: 'child-breadcrumb',
  lastBreadCrumbSelector: 'last-child-breadcrumb',
  uploadImageBoxSelector: 'imageDraggableZoneCy',
  saveImageSelector: 'confirmDialogButton',
  firstNameinputSelector: 'firstNameInput',
  lastNameInputSelector: 'lastNameInput',
  bioInputSelector: 'PlayerBioInput',
  birthDateSelector: 'birthDateInput',
  zipCodeInputSelector: 'zipCodeInput',
  weightInputSelector: 'weightInput',
  playerEmailSelector: 'playerEmailInput',
  playerPrefSelector: 'rightPreference',
  createProfileHeader: 'createProfileHeader',
  genderInputSelector: 'sexInput',
  heightInputSelector: 'heightInput',
  experienceInputSelector: 'experienceLevelInput',
  preferredPositionInput: 'preferredPositionInput',
  openConfirmProfileDialogSelector: 'openConfirmProfileDialog',
  confirmModalParaSelector: 'modalParagraph',
  confirmModalButtonSelector: 'modalConfirmButton',
  clostModalButtonSelector: 'modalCloseButton',
  invalidBirthDate: '2006-09-05',
  inputErrorSpan: 'input-error-span',
  openCloseProfileModalSelector: 'cancelProfileCreationModal',
  closeButtonModal: 'modalCloseButton',
  editProfileButton: 'editProfileButton'
};
