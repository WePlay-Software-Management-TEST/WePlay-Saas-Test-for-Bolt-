import React, { createContext, useState, useEffect } from 'react';
import MultiStepRegistration from './components/multiStepRegistration';
import { FORMSTRUCTURE } from './consts/registrationForm.const';
import { useLocation, useSearchParams } from 'react-router-dom';
import produce from 'immer';
import GlobalLoadingScreen from 'core/components/misc/globalLoadingScreen';
import BackgroundScreen from 'core/components/misc/backgroundScreen';

export const FormStateContext = createContext({
  form: FORMSTRUCTURE,
  setForm: (
    form: typeof FORMSTRUCTURE | ((form: typeof FORMSTRUCTURE) => typeof FORMSTRUCTURE)
  ) => {}
});

/**
 * SignUp component manages the user registration process.
 *
 * This component initializes the form state using the `FORMSTRUCTURE` and updates it based on URL search parameters
 * and redirect state. It uses the `immer` library to produce immutable updates to the form state. The component
 * determines the user's role and email from the URL or redirect state and sets the appropriate form fields and step index.
 * It conditionally renders the `MultiStepRegistration` component or a loading screen based on the readiness of the form state.
 *
 * @returns {JSX.Element} The rendered component, either the registration form or a loading screen.
 *
 * @component
 *
 * @example
 * // Usage in a parent component
 * <SignUp />
 *
 * @throws Will throw an error if the form context is not provided.
 */
function SignUp (): JSX.Element {
  const { state: redirectState } = useLocation();
  const { email: redirectEmail } = redirectState ?? '';

  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(FORMSTRUCTURE);
  const userEmail = searchParams.get('email');
  const tempPass = searchParams.get('temp');
  const role = searchParams.get('role');

  const [isReady, setIsReady] = useState((redirectEmail === undefined && searchParams.get('email') === null));

  useEffect(() => {
    if (tempPass !== undefined && role !== undefined) {
      setForm(produce(form => {
        form.tempPass = tempPass;
      }));
      switch (role) {
        case 'ADMIN':
          setForm(produce(form => {
            form.type = 'ADMIN';
          }));
          break;
        case 'REFEREE':
          setForm(produce(form => {
            form.type = 'REFEREE';
          }));
          break;
        default:
          break;
      }
    }
    if (redirectState !== null) {
      setForm(produce(form => {
        form.email = {
          value: { email: redirectEmail }
        };
        form.userStepIndex = 1;
      })
      );
      setIsReady(() => true);
      return;
    }

    if (userEmail === null) {
      setIsReady(() => true);
      return;
    };

    setForm(produce(form => {
      form.email = {
        value: { email: userEmail }
      };
      form.userStepIndex = 2;
    })
    );
    setIsReady(() => true);
  }, []);

  return (
    <FormStateContext.Provider value={{ form, setForm }}>
      <BackgroundScreen>
      {isReady ? <MultiStepRegistration /> : <GlobalLoadingScreen />}
      </BackgroundScreen>
    </FormStateContext.Provider>
  );
}

export default SignUp;
