import React, { useCallback, useState } from 'react';
import {
  InputTextField,
  PageContainer,
  DetailsContainer,
  CardContainer,
  Loader,
} from '../../../../components';
import './ManageUserContainer';
import { ConstantStrings, ImagesPath } from '../../../../utils/constants';
import { Formik } from 'formik';
import {
  CreateUsersPageValidation, EditUsersPageValidation,
} from '../../../../utils/ValidationSchemas';
import { Collapse } from 'reactstrap';
import { HiEye } from 'react-icons/hi';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import './ManageUser.scss';
import _ from 'lodash';
import moment from 'moment';
import { uploadImage } from '../../../../utils';
interface ManageUserInteraface {
  backButtonHandler: () => void;
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    photoURL: string;
    uId: string;
    userStatusId: string,
    userTypeId: string,
    password: string;
  };
  statusDropDownData: { label: string; value: string }[];
  userTypesDropDownData: { label: string; value: string }[];
  isDisable: boolean;
  isEditable: boolean;
  userDetailsCollapse: boolean;
  handleUserDetailsCollapse: () => void;
  passwordType: string;
  handlePasswordTypeChange: () => void;
  isCreate: boolean;
  handleReset:()=>void;
  saveOrUpdateButtonHandler: (values: {
    uId: string;
    firstname: string,
    lastname: string,
    email: string,
    cellPhoneNumber: string,
    password: string,
    userStatusId: string,
    userTypeId: string,
  }) => void;
  onDrop:(e: File) => void;
  photoURL: string,
}

//ManageUserTypes page handles create Usertypes functionality and update Usertypes functionality
export const ManageUser: React.FC<ManageUserInteraface> = ({
  backButtonHandler,
  userData,
  statusDropDownData,
  userTypesDropDownData,
  isDisable,
  isEditable,
  userDetailsCollapse,
  handleUserDetailsCollapse,
  passwordType,
  handlePasswordTypeChange,
  saveOrUpdateButtonHandler,
  isCreate,
  onDrop,
  photoURL,
  handleReset

}) => {

  return (
    <>
      {((isEditable || isDisable) && userData.uId !== '') || isCreate ? (
        <PageContainer
          mainHeadingName='User'
          backIcon={true}
          backIconOnClick={backButtonHandler}
        >
          <Formik
            initialValues={{
              uId: _.get(userData, 'uId') ? _.get(userData, 'uId') : '',
              firstname: _.get(userData, 'firstName') ? _.get(userData, 'firstName') : '',
              lastname: _.get(userData, 'lastName') ? _.get(userData, 'lastName') : '',
              email: _.get(userData, 'email') ? _.get(userData, 'email') : '',
              cellPhoneNumber: _.get(userData, 'phoneNumber') ? _.get(userData, 'phoneNumber') : '',
              password: _.get(userData, 'password') ? _.get(userData, 'password') : '',
              userStatusId: _.get(userData, 'userStatusId') ? _.get(userData, 'userStatusId') : '',
              userTypeId: _.get(userData, 'userTypeId') ? _.get(userData, 'userTypeId') : '',
            }}
            validationSchema={isEditable ? EditUsersPageValidation : CreateUsersPageValidation}
            onSubmit={(values) => {
              saveOrUpdateButtonHandler(values);
            }}
            
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              resetForm,
              isValid,
              touched,
              handleBlur
            }) => (
              <form className='container-fluid' onSubmit={handleSubmit}>
                <div className='row manage-usertypes-page '>
                  <div className='col-md-8'>
                    <div className='col-md-12'>
                      <DetailsContainer
                        heading={ConstantStrings.manageUser.userDetailsHeading}
                        isCollapsible={true}
                        collapseOnClick={handleUserDetailsCollapse}
                      >
                        <Collapse isOpen={userDetailsCollapse}>
                          <div className='manage-usertypes-page__usertype-info'>
                            <div className='row '>
                              <div className='col-md-6 pdtopbtm'>
                                <label className='label'>
                                  {ConstantStrings.manageUser.firstName}
                                </label>
                                <InputTextField
                                  name='user-type-id-inputField'
                                  fieldName='userTypeId'
                                  id=''
                                  placeholder=''
                                  inputType='text'
                                  requiredOrNot={true}
                                  value={values.firstname}
                                  onChangeText={handleChange('firstname')}
                                  error={errors.firstname}
                                  touched={touched.firstname}
                                  isDisable={isDisable}
                                  onBlur={handleBlur('firstname')}
                                />
                              </div>
                              <div className='col-md-6 pdtopbtm'>
                                <label className='label'>
                                  {ConstantStrings.manageUser.lastName}
                                </label>
                                <InputTextField
                                  name='user-type-name-inputField'
                                  fieldName='usertypename'
                                  id=''
                                  placeholder=''
                                  inputType='text'
                                  requiredOrNot={true}
                                  value={values.lastname}
                                  onChangeText={handleChange('lastname')}
                                  onBlur={handleBlur('lastname')}
                                  error={errors.lastname}
                                  touched={touched.lastname}
                                  isDisable={isDisable}
                                />
                              </div>

                              <div className='col-md-6 pdtopbtm'>
                                <label className='label'>
                                  {ConstantStrings.manageUser.emailAddress}
                                </label>
                                <InputTextField
                                  name='user-type-description-inputField'
                                  fieldName='usertypeDescription'
                                  id=''
                                  placeholder=''
                                  inputType='email'
                                  requiredOrNot={true}
                                  value={values.email}
                                  onChangeText={handleChange('email')}
                                  onBlur={handleBlur('email')}
                                  error={errors.email}
                                  touched={touched.email}
                                  isDisable={isDisable}
                                />
                              </div>
                              <div className='col-md-6 pdtopbtm'>
                                <label className='label'>
                                  {ConstantStrings.manageUser.cellPhoneNumber}
                                </label>
                                <InputTextField
                                  name='email_field'
                                  fieldName='usertypeDescription'
                                  id='email_field'
                                  placeholder=''
                                  inputType='text'
                                  requiredOrNot={true}
                                  value={values.cellPhoneNumber}
                                  onChangeText={handleChange('cellPhoneNumber')}
                                  onBlur={handleBlur('cellPhoneNumber')}
                                  error={errors.cellPhoneNumber}
                                  touched={touched.cellPhoneNumber}
                                  isDisable={isDisable}
                                />
                              </div>

                              <div className='col-md-6 pdtopbtm manage-usertypes-page__usertype-info__password-fields'>
                                <label className='label'>
                                  {ConstantStrings.manageUser.password}
                                </label>
                                <InputTextField
                                  name='user-type-description-inputField password-field'
                                  fieldName='usertypeDescription'
                                  id=''
                                  placeholder=''
                                  inputType={passwordType}
                                  requiredOrNot={true}
                                  value={values.password}
                                  onChangeText={handleChange('password')}
                                  onBlur={handleBlur('password')}
                                  error={errors.password}
                                  touched={touched.password}
                                  isDisable={isDisable || isEditable ? true : false}
                                >
                                  {isDisable === false && isEditable === false ?
                                    <span className='multiple-icons'>
                                      <i
                                        aria-disabled={isDisable}
                                        onClick={() => {
                                          handlePasswordTypeChange();
                                        }}
                                      >
                                        {passwordType ? (
                                          <HiEye />
                                        ) : (
                                          <AiOutlineEyeInvisible />
                                        )}
                                      </i>
                                    </span> : <span className='multiple-icons'>

                                    </span>}
                                </InputTextField>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </DetailsContainer>
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='col-md-12'>
                      <CardContainer
                        heading='User Type Actions'

                        isUserImageAvailable={true}
                        isFileUpload={true}
                        photoURL={photoURL}

                        statusDropDownList={statusDropDownData}
                        statusDropDownOnChange={handleChange('userStatusId')}
                        statusDefaultValue={values.userStatusId}
                        errorStatus={errors.userStatusId}
                        touchedStatus={touched.userStatusId}
                        onBlurStatus={handleBlur('userStatusId')}
                        showStatusSelectText={true}

                        typeDorpDownList={userTypesDropDownData}
                        typeDropDownOnChange={handleChange('userTypeId')}
                        typeDefaultValue={values.userTypeId}
                        errorUserType={errors.userTypeId}
                        touchedUserType={touched.userTypeId}
                        onBlurUserType={handleBlur('userTypeId')}
                        showTypeSelectText={true}
                        onSaveAndUpdateButtonOnClick={handleSubmit}
                        onDiscardButtonOnClick={() => {resetForm();
                          handleReset();
                        }}
                        isValid={isValid}
                        isDisable={isDisable}

                        onDrop={onDrop}
                        isEditable={isEditable}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </PageContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};
