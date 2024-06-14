import _ from 'lodash';
import React, { useState } from 'react';
import './CustomCheckBox.scss';

interface Props {
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  checkBoxText?: string;
  isDisable?: boolean;
  value?: string;
  label?: string;
  checkedOrNot?: boolean
  LinkedCarsList?: {
    carId: string,
    Color: string,
    Make: string,
    Model: string,
    'Number Plate': string
  }[]
}

export const CustomCheckBox: React.FC<Props> = ({ 
  onClick, 
  name, 
  checkBoxText, 
  isDisable, 
  value,
  label,
  LinkedCarsList,
  checkedOrNot
 }) => {
  
  const length = _.filter(LinkedCarsList, (obj: {
    carId: string,
    Color: string,
    Make: string,
    Model: string,
    'Number Plate': string
  }) => obj.carId === value).length;
  
  const [checked, setChecked] = useState(length > 0 ? true : false);
  return (
      LinkedCarsList && LinkedCarsList.length > 0 ? 
      <div className='checkbox-btn'>
      <input 
        value={value} 
        name={label}  
        className={name} 
        type='checkbox' 
        onChange={(e) => {
          setChecked(false);
          onClick(e);
        }}
        data-testid="my-checkbox" 
        disabled={isDisable} 
        defaultChecked={checked ? true : false}
      />
      <span className='checkbox-text'  data-testid="my-div">{checkBoxText}</span>
    </div>
      :
      <div className='checkbox-btn'>
      <input 
        value={value} 
        name={label}  
        className={name} 
        type='checkbox' 
        onChange={(e) => {
          setChecked(false);
          onClick(e);
        }} 
        data-testid="my-checkbox" 
        disabled={isDisable}
        defaultChecked={checkedOrNot}
        />
      <span className='checkbox-text'  data-testid="my-div">{checkBoxText}</span>
    </div>
    
  );
};
