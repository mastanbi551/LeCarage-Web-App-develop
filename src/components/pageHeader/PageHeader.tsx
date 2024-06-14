import React from 'react';
import { CustomButton } from '../customButton/CustomButton';
import './PageHeader.scss';
import { FiArrowLeft } from 'react-icons/fi';
import { AccessTypes } from '../../utils/constants/ConstantStrings';

interface HeaderProps {
    text: string;
    name: string,
    isButtonDisable?: boolean
    buttonName?: string,
    buttonClassName?: string,
    buttonOnclick?: () => void 
    backIcon?: boolean
    backIconOnClick?: () => void
    access?: string
}
  
  export const PageHeader: React.FC<HeaderProps> = ({ 
      text,
      name, 
      isButtonDisable,
      buttonName,
      buttonClassName,
      buttonOnclick,
      backIcon,
      backIconOnClick,
      access
    }) => { 
    return (
        <>
            {backIcon &&
                 <FiArrowLeft className='back-icon'  data-testid='back-icon' onClick={backIconOnClick}/>
            }
            <h1 className={name}>{text}</h1>
            {
                isButtonDisable && (
                    <CustomButton 
                        title={buttonName} 
                        name={buttonClassName}
                        buttonOnClick={buttonOnclick}
                        isDisable={access === AccessTypes.readOnlyAccess ? true : false}
                    />
                )
            }
        </>
       
    );
};