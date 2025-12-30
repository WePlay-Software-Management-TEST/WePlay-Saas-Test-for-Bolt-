import React from 'react';
import { type RadioButtonProps } from 'core/models/input.model';

/**
 * @component CheckBox Input
 * @param { string } label - Label text that appears right of the checkbox.
 * @param { string } value - Value of the checkbox, it's going to be stored when the checkbox have been checked.
 * @param { string } id - ID of the HTML Checkbox input.
 * @param { UseFormRegisterReturn<string> } registrationOption - Register function from React Hook Form useForm()
 * @returns { JSX.Element }
 */
export function CheckBox ({ label, value, id, registrationOption }: RadioButtonProps): JSX.Element {
  return (
    <label className="flex gap-2 items-center cursor-pointer" data-cy='checkboxWeplayLabel'>
            <input type="checkbox"
            id={id}
            value={value}
            data-cy='checkboxWeplayInput'
            { ...registrationOption}
            className="checkbox checkbox-secondary rounded-md w-5 h-5 border-grey-10" />
            <span className="label-text text-sm font-normal text-grey-10">{label}</span>
    </label>
  );
};
