import React, { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../pageHeader/PageHeader';
import './PageContainer.scss';
import { CustomDropDown } from '../customDropDown/CustomDropDown';
import { CustomButton } from '../customButton/CustomButton';
import { InputTextField } from '../inputTextField/InputTextField';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';
import { Loader } from '../loader/Loader';

type CardContainerProps = {
  children?: React.ReactElement;
  heading: string;
  TextFieldDataCustomerData?: string | undefined;
  statusDropDownList?: { label: string; value: string }[];
  typeDorpDownList?: { label: string; value: string }[];

  statusDropDownOnChange?:
    | React.ChangeEventHandler<HTMLSelectElement>
    | undefined;
  typeDropDownOnChange?:
    | React.ChangeEventHandler<HTMLSelectElement>
    | undefined;

  statusDefaultValue?: string;
  typeDefaultValue?: string;
  onSaveAndUpdateButtonOnClick?: () => void;
  onDiscardButtonOnClick?: () => void;
  isValid?: boolean;
  isUserImageAvailable?: boolean;
  photoURL?: string;
  imageAltText?: string;
  userName?: string;

  isFileUpload?: boolean;
  onFileUpload?: () => void;

  isSaveAndUpdateButtonFirst?: boolean;
  isUniqueIdInputField?: boolean;
  uniqueIdTextFieldValue?: string | undefined;
  isTextFieldDataCustomerData?: boolean;
  isDisable?: boolean;
  errorStatus?: string;
  touchedStatus?: boolean;
  onBlurStatus?: (e: React.FocusEvent<HTMLSelectElement> | undefined) => void;
  showStatusSelectText?: boolean;

  errorUserType?: string;
  touchedUserType?: boolean;
  onBlurUserType?: (e: React.FocusEvent<HTMLSelectElement> | undefined) => void;
  showTypeSelectText?: boolean;
  onDrop?: (e: File) => void;
  isEditable?: boolean
};

export const CardContainer = ({
  children,
  heading,
  TextFieldDataCustomerData,

  statusDropDownList,
  statusDropDownOnChange,
  statusDefaultValue,
  errorStatus,
  touchedStatus,
  onBlurStatus,
  showStatusSelectText,

  typeDorpDownList,
  typeDropDownOnChange,
  typeDefaultValue,

  errorUserType,
  touchedUserType,
  onBlurUserType,
  showTypeSelectText,

  onSaveAndUpdateButtonOnClick,
  onDiscardButtonOnClick,
  isUserImageAvailable,
  photoURL,
  imageAltText,
  userName,
  isFileUpload,
  onFileUpload,
  isUniqueIdInputField,
  uniqueIdTextFieldValue,
  isTextFieldDataCustomerData,
  isDisable,
  onDrop,
  isEditable
}: CardContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);  

  useEffect(() => {
    setIsLoading(false);
    if (photoURL !== '') {
      setIsLoading(false);
    }
  }, [photoURL]);
  

  return (
    <div className='card-container'>
      <div className='col-md-12'>
        <div className='card-container__image-wrapper'>
          {isUserImageAvailable && photoURL !== '' && (
            <div className='card-container__image-container'>
              
              <img
                className='card-container__image-container__image'
                src={photoURL}
                alt={imageAltText}
                style={{ objectFit: 'cover' }}
              />
              <h1 className='card-container__image-container__heading'>
                {userName}
              </h1>
            </div>
          )}
        </div>
        {isFileUpload && !isDisable && (
          <div className='card-container__file-upload-container'>
            <PageHeader text='Upload Image' name='card-container__heading' />
            <div className='outer'>
              <div className='imgload'> {isLoading && <Loader />}</div>
              <StyledDropZone
                disabled={isDisable}
                accept={['image/jpeg', 'image/png', 'image/gif']}
                onDrop={(e: File) => {
                  setIsLoading(true);
                  onDrop && onDrop(e);
                  
                }}
              />
            </div>
          </div>
        )}{' '}
      </div>
      <PageHeader text={heading} name='card-container__heading' />

      {statusDropDownList && (
        <CustomDropDown
          name='status-dropdown'
          dropdownList={statusDropDownList}
          labelName='Set Status'
          onValueSelect={statusDropDownOnChange}
          isDisable={isDisable}
          error={errorStatus}
          defaultValue={statusDefaultValue}
          showSelectText={showStatusSelectText}
          touched={touchedStatus}
          onBlur={onBlurStatus}
        />
      )}
      {isTextFieldDataCustomerData && (
        <>
          <label className='label'>Customer ID</label>
          <InputTextField
            value={TextFieldDataCustomerData ? TextFieldDataCustomerData : ''}
            name=''
            id=''
            inputType='text'
            placeholder=''
            requiredOrNot={false}
          />
        </>
      )}

      {isUniqueIdInputField && (
        <>
          <label className='label'>Unique ID</label>
          <InputTextField
            value={uniqueIdTextFieldValue ? uniqueIdTextFieldValue : ''}
            name=''
            id=''
            inputType='text'
            placeholder=''
            requiredOrNot={false}
          />
        </>
      )}

      {typeDorpDownList && (
        <CustomDropDown
          name='status-dropdown'
          dropdownList={typeDorpDownList}
          labelName='User Type'
          onValueSelect={typeDropDownOnChange}
          isDisable={isDisable}
          error={errorUserType}
          defaultValue={typeDefaultValue}
          showSelectText={showTypeSelectText}
          touched={touchedUserType}
          onBlur={onBlurUserType}
        />
      )}

      <div className='line'></div>

      <CustomButton
        title='Save & Update'
        name='greenButton w-100'
        buttonOnClick={onSaveAndUpdateButtonOnClick}
        isDisable={isDisable}
      />

      <CustomButton
        title='Discard'
        name='add-button w-100'
        buttonOnClick={onDiscardButtonOnClick}
        isDisable={isDisable}
      />

      {children}
    </div>
  );
};
