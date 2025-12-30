import React, { useMemo } from 'react';
import { ReactComponent as CheckMark } from 'assets/svgs/checkMark.svg';
import Button from 'core/components/button/button';
import { useTranslation } from 'react-i18next';

/**
 * Function component for rendering a button to navigate to the next step.
 *
 * @returns {JSX.Element} A button element for navigating to the next step.
 */
export function NextStepBtn ({ isValid, incrementStep, cyData }: { isValid: boolean, incrementStep: () => void, cyData: string }): JSX.Element {
  const NextStepBtn = useMemo(() => {
    return function MemoizedButton ({ isValid, incrementStep, cyData }: { isValid: boolean, incrementStep: () => void, cyData: string }): JSX.Element {
      const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.gettingStartedStep' });
      return <Button
        type='primary'
        text={translate('nextStepBtn')}
        size="small"
        className="max-w-[105px] mobile:max-w-[480px] mobile:w-full disabled:fill-grey-70 disabled:stroke-grey-70 stroke-white fill-white"
        Icon={CheckMark}
        showIcon={true}
        showTextOnMobile
        onClickCallable={incrementStep}
        iconPosition="right"
        isValidChecked={isValid}
        buttontype='submit'
        cyData={cyData}
      />;
    };
  }, []);

  return <NextStepBtn isValid={isValid} incrementStep={incrementStep} cyData={cyData} />;
}
