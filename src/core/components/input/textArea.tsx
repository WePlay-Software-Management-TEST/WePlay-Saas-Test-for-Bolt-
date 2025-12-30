import React from 'react';
import Input from './input';
import { type InputProps } from 'core/models/input.model';

function TextArea (props: InputProps): JSX.Element {
  const {
    placeholder,
    registrationOption,
    id,
    cyData,
    isDisabled,
    resizable,
    className,
    fieldSetFullHeight
  } = props;

  return (
  <Input { ...props } className={className} fieldSetFullHeight={fieldSetFullHeight}>
    <textarea
    className={
      `textarea w-full h-full
      placeholder:text-base placeholder:font-normal placeholder:text-grey-70 
      !px-1 !py-0 
      focus:border-0 focus:outline-none 
      outline-none focus:placeholder:text-transparent focus-within:placeholder:text-transparent
      ${resizable as boolean ? 'resize' : 'resize-none'} ${className ?? ''}`
    }
    placeholder={placeholder}
    disabled={isDisabled}
    id={id}
    data-cy={cyData}
    {...registrationOption}>
    </textarea>
  </Input>
  );
};

export default TextArea;
