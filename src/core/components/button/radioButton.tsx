import React from 'react';
import { type RadioButtonProps } from 'core/models/input.model';

function RadioButton (props: RadioButtonProps): JSX.Element {
  const { isChecked, label, value, cyData, id, registrationOption, disabled = false } = props;
  return (
    <div className='flex gap-4 mobile:gap-2'>
    <input
      type="radio"
      id={id}
      value={value}
      data-cy={cyData}
      {...registrationOption}
      disabled={disabled}
      className="
      radio w-6 h-6
      checked:bg-transparent checked:border-8 checked:border-blue-60
      transition-all duration-150 ease-in-out
      border-[3px] border-grayscales-dark-grey" defaultChecked={isChecked}/>
    <label htmlFor={id} className='text-sm text-grey-20 font-normal text-center hover:cursor-pointer'>{label}</label>
    </div>
  );
};

export default RadioButton;
