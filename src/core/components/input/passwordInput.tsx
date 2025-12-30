import React, { useState } from 'react';
import { type InputProps } from 'core/models/input.model';
import Input from './input';
import { ReactComponent as EyeHidden } from 'assets/svgs/EyeCrossed.svg';
import { ReactComponent as EyeShow } from 'assets/svgs/EyeUncrossed.svg';

function PasswordInput (properties: InputProps): JSX.Element {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const onPasswordToggle = (): void => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const {
    placeholder,
    registrationOption,
    id,
    cyData,
    isDisabled
  } = properties;
  return (
    <Input {...properties}>
          <input
          type={isPasswordVisible ? 'text' : 'password'}
          disabled={isDisabled}
          id={id}
          data-cy={cyData}
          {...registrationOption}
          placeholder={placeholder}
          required
          />
          <button
        type='button'
        onClick={onPasswordToggle} >
          {isPasswordVisible ? <EyeShow /> : <EyeHidden />}
        </button>
    </Input>
  );
};

export default PasswordInput;
