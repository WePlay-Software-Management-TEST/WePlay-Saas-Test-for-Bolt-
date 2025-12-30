import React, { useContext, useCallback, useMemo } from 'react';
import EnterEmailStep from './enterEmailStep';
import { FormStateContext } from '../signup';
import { produce } from 'immer';
import EmailConfirmation from './emailConfirmation';
import EnterPasswordStep from './enterPasswordStep';
import EnterUserInformation from './enterUserInformation';
import EnterBusinessInfo from './enterBusinessInfo';
import EnterRefereeInformation from './enterRefereeInformation';

type stepsComponenetType = Record<string, {
  [key: number]: JSX.Element
  default: JSX.Element
}>;
/**
 * MultiStepRegistration component manages the multi-step registration process.
 *
 * This component utilizes the `FormStateContext` to manage the current form state and step index.
 * It provides navigation between steps using `next` and `prev` callbacks, which update the form's
 * `userStepIndex`. The component renders different step components based on the user's type and
 * current step index, using a memoized object of step components.
 *
 * @returns {JSX.Element} The rendered component for the current registration step.
 *
 * @component
 *
 * @example
 * // Usage in a parent component
 * <MultiStepRegistration />
 *
 * @throws Will throw an error if the form context is not provided.
 */
function MultiStepRegistration (): JSX.Element {
  const { form, setForm } = useContext(FormStateContext);
  const next = useCallback(() => {
    setForm(
      produce((form) => {
        form.userStepIndex += 1;
      })
    );
  }, [setForm]);

  const prev = useCallback(() => {
    setForm(
      produce((form) => {
        form.userStepIndex -= 1;
      })
    );
  }, [setForm]);

  const MultiStepSignUp = useMemo(() => {
    const STEP_COMPONENTS: stepsComponenetType = {
      newUser: {
        0: <EnterEmailStep onNext={next}/>,
        1: <EmailConfirmation onNext={next} onPrev={prev} />,
        2: <EnterPasswordStep onNext={next} />,
        3: <EnterUserInformation onNext={next} onPrev={prev}/>,
        4: <EnterBusinessInfo onNext={next} onPrev={prev} />,
        default: <EnterEmailStep onNext={next}/>
      },
      ADMIN: {
        2: <EnterPasswordStep onNext={next} />,
        3: <EnterUserInformation onNext={next} onPrev={prev}/>,
        default: <EnterPasswordStep onNext={next}/>
      },
      REFEREE: {
        2: <EnterPasswordStep onNext={next} />,
        3: <EnterUserInformation onNext={next} onPrev={prev}/>,
        4: <EnterRefereeInformation onNext={next} onPrev={prev} />,
        default: <EnterEmailStep onNext={next}/>
      }
    };
    const steps = STEP_COMPONENTS[form.type ?? 'newUser'];
    const stepIndex = form.userStepIndex ?? 'default' as keyof typeof steps;
    return steps[stepIndex];
  }, [form]);

  return <> {MultiStepSignUp} </>;
}

export default MultiStepRegistration;
