import React from 'react';
import { CustomCheckBox } from '../customCheckBox/CustomCheckBox';
import './CheckBoxList.scss';


interface checkBoxListItemsInfo {
    value: string;
    label?: string;
    checked?: boolean
}

interface Props {
    onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string; 
    checkBoxListItems: checkBoxListItemsInfo[],
    isDisable: boolean
}


export const CheckBoxList : React.FC<Props> = ({  
    onClick, 
    name,
    checkBoxListItems,
    isDisable
  }) => {
    return(
        <label className='checkbox-list row'>
        {
          checkBoxListItems.map((item, index) => 
            <CustomCheckBox
                  key={index}
                  name={name} 
                  checkBoxText={item.label}
                  onClick={onClick}
                  isDisable={isDisable}
                  value={item.value}
                  checkedOrNot={item.checked}
                />
         
        )}
      </label>
    );
};


