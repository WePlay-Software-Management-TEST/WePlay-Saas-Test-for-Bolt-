import React from 'react';
import { type InputProps } from 'core/models/input.model';
import { ReactComponent as AlarmSVG } from 'assets/svgs/Alarm_duotone.svg';

function Input (properties: InputProps): JSX.Element {
  const {
    fieldSetFullHeight,
    hideBorders,
    legendText,
    placeholder,
    registrationOption,
    id,
    errPlaceholder,
    cyData,
    fieldState,
    children,
    correctPlaceHolder,
    isDisabled,
    inputType,
    showRequired,
    preventDefault,
    className,
    type = 'primary',
    fieldSetClassNames,
    onClick,
    readOnly
  } = properties;
  const preventDefaultBehavior = preventDefault !== undefined ? preventDefault : false;
  const fieldSetClass =
  `
    ${fieldSetFullHeight ? 'h-full' : ''}
    group/fieldset
    disabled:bg-grey-98
    disabled:border-grey-70
    pl-4
    pr-1 
    pb-2 
    ${hideBorders ? 'border-none' : 'rounded-xl'} 
    ${fieldState?.error !== undefined ? 'input-error hover:input-error' : 'input-normal'}
    focus-within:input-focus
    focus-within:hover:input-focus 
    hover:input-hover 
    disabled:input-disabled
    ${fieldSetClassNames ?? ''}
  `;
  const inputFieldClass =
  ` 
    bg-transparent
    peer 
    mb-0 
    w-full
    -mt-1 
    rounded-xl 
    h-10 
    px-2
    mr-2
    focus:outline-none 
    placeholder:body-xs-text 
    placeholder:text-grey-70
    focus:placeholder:text-transparent
    disabled:text-grey-40
  `;
  const legendClass =
  `
    flex
    px-2 
    pb-1 
    body-xxs-text
    group-focus-within/fieldset:text-secondary
    ${fieldState?.error !== undefined ? 'text-indictor-error' : 'text-grey-40'}
  `;
  const errorMessageClass = `
  body-xxs-text text-indictor-error
  px-2 text-left pt-2 flex justify-left
  items-center gap-1 w-full`;

  const errMsg = fieldState?.error !== undefined ? fieldState.error?.message as string : '';

  return (
      <div onClick={onClick} className={`w-full group ${className ?? ''}`}>
          {
            type === 'primary'
              ? <fieldset className={fieldSetClass} disabled={isDisabled}>
            <legend className={legendClass} data-cy='inputLegend'>
              {legendText} {
              showRequired !== undefined && (
                showRequired === 'required'
                  ? <span className='text-indictor-error'>*</span>
                  : <span className='text-grey-70'>&#160;(optional)</span>
              )
              }
            </legend>
            {
          children === undefined
            ? <input
                id={id}
                data-cy={cyData}
                readOnly={readOnly}
                {...registrationOption}
                placeholder={placeholder}
                disabled={isDisabled}
                className={inputFieldClass}
                type={inputType === undefined ? 'text' : inputType }
                onClick={preventDefaultBehavior ? (e) => { e.preventDefault(); } : () => {} }
                />
            : <span className='flex justify-between items-center h-full'>
              {
                React.Children.map(children, (child) => {
                  if (child.type === 'input' || child.type === 'select') {
                    return React.cloneElement(child, {
                      className: inputFieldClass
                    });
                  }
                  return child;
                }
                )
            }
        </span>}
        </fieldset>
              : children === undefined
                ? <input
                      id={id}
                      data-cy={cyData}
                      {...registrationOption}
                      placeholder={placeholder}
                      disabled={isDisabled}
                      className={inputFieldClass + ' !p-0 overflow-hidden !px-4 !rounded-lg !border-grey-90 !text-grey-60 ' + fieldSetClass}
                      type={inputType === undefined ? 'text' : inputType }
                      onClick={preventDefaultBehavior ? (e) => { e.preventDefault(); } : () => {} }
                      />
                : <span className={`flex justify-between items-center ${fieldSetClass} !p-0 overflow-hidden !px-4 !rounded-lg !border-grey-90 !text-grey-60`}>
                    {
                      React.Children.map(children, (child) => {
                        if (child.type === 'input' || child.type === 'select') {
                          return React.cloneElement(child, {
                            className: inputFieldClass
                          });
                        }
                        return child;
                      }
                      )
                  }
              </span>}
          {
        errMsg !== '' && errMsg !== undefined && errMsg !== null && type === 'primary' &&
          <span className={ errorMessageClass } data-cy='input-error-span'>
            <AlarmSVG className='min-w-[16px]'/>
            <p>{ errMsg }</p>
          </span>
        }
        {
         correctPlaceHolder !== '' && correctPlaceHolder !== undefined && correctPlaceHolder !== null && !fieldState?.invalid && type === 'primary' && fieldState.isDirty &&
          <span data-cy='input-correct-span'>
              <p className='pl-1 pt-2 text-[12px] font-light text-indictor-success'>
                { correctPlaceHolder }
              </p>
          </span>
        }
        {
        fieldState?.error === undefined && type === 'primary' && !(fieldState?.isDirty) && errPlaceholder &&
         <span data-cy='input-error-placeholder-span'>
          <p className='pl-1 pt-2 text-[12px] font-light text-grey-40'>
            { errPlaceholder }
            </p>
          </span>
        }
      </div>
  );
}
;

export default Input;
