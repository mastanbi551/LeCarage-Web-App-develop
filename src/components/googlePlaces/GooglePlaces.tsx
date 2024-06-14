import React, { useEffect, useRef } from 'react';
import './GooglePlaces.scss';
import { uniqueId } from 'lodash';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { ApiKeys } from '../../utils/constants';
interface GooglePlacesInterface {
  place: string | null,
  setPlace: ((e: {label: string}) => void);
  error: string | undefined;
  touched: boolean | undefined;
  handleOnBlur: (e: React.FocusEvent<HTMLSelectElement> | undefined) => void;
  label: string;
  defaultValue: string | null;
  isDisable: boolean;
  handlePlace: (e: null | string) => void;
  dataTestId?: string,
}

export const GooglePlaces: React.FC<GooglePlacesInterface> = ({
 place,
 setPlace,
 handleOnBlur,
 label,
 defaultValue,
 isDisable,
 dataTestId,
 handlePlace
}) => {
  const inputId = useRef<string>(uniqueId('google-places-input-'));
  // const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if(defaultValue === ''){
  //     inputRef.current?.value ?? '';
  //     handlePlace('');
  //   }
  // }, [defaultValue]);
  
  return (
    <>
      <div className={isDisable ? 'dropdown  disabled' :'dropdown '}>
        <label className='label dropDown-label' id="google-places-label" htmlFor={inputId.current}>
          {label}
        </label>
        <GooglePlacesAutocomplete  
        aria-labelledby={inputId.current}
        
        data-testid={dataTestId} 
          selectProps={{
            value: defaultValue,
            onChange: setPlace,
            className: 'static-dropdown autocomplete',
            
            isDisabled:isDisable,
            placeholder: defaultValue === '' ? 'Select/Enter location' : defaultValue,
          }} 
          apiKey={ApiKeys.googleApiKey}          
        />
      </div>
    </>
     
  );
};

