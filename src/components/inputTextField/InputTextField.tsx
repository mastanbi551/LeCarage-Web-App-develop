import React from 'react';
import './InputTextField.scss';

interface InputTextProps {
  children?: React.ReactElement;
  dataTestId?: string;
  name: string;
  id: string;
  placeholder: string;
  inputType: string;
  requiredOrNot: boolean;
  value: string;
  isDisable?: boolean | undefined;
  onChangeText?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  fieldName?: string | undefined;
  error?: string | string[] | undefined
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  touched?: boolean | undefined;
}

export const InputTextField: React.FC<InputTextProps> = ({
  children,
  name,
  id,
  placeholder,
  inputType,
  requiredOrNot,
  value,
  isDisable,
  onChangeText,
  fieldName,
  dataTestId,
  error,
  onBlur,
  touched,
}) => {
  const handleAutoComplete = (event:any) => {
    event.target.setAttribute('autoComplete', 'off');
    event.target.setAttribute('autoComplete', 'new-password');
  };

  const isChrome = /Chrome/.test(navigator.userAgent);
  const autoCompleteValue = isChrome ? 'off' : 'new-password' ;

  return (
    <div className='input-text-field'>
      {children === undefined ? (
        <>
          <input
            data-testid={dataTestId}
            type={inputType}
            id={id}
            className={name + ' static'}
            name={fieldName}
            placeholder={placeholder}
            required={requiredOrNot}
            value={value}
            onBlur={onBlur}
            onChange={onChangeText}
            disabled={isDisable ? true : false}
            autoComplete={autoCompleteValue}
            autoCorrect="off"
            onFocus={handleAutoComplete}
          />
          {error && touched ? (
            <div className='validation-error-message text-align-left'>
              {error}
            </div>
          ) : null}
        </>
      ) : (
        <>
          <input
            data-testid={dataTestId}
            type={inputType}
            id={id}
            className={name + ' static'}
            name={fieldName}
            placeholder={placeholder}
            required={requiredOrNot}
            value={value}
            onBlur={onBlur}
            onChange={onChangeText}
            disabled={isDisable ? isDisable : false}
            autoComplete={autoCompleteValue}
            autoCorrect="off"
            onFocus={handleAutoComplete}
          />
          {children}
          {error && touched ? (
            <div className='validation-error-message text-align-left'>
              {error}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
