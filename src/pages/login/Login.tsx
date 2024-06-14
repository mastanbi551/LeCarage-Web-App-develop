import React from 'react';
import { Formik } from 'formik';
import {
  BackgroundImageContainer,
  InputTextField,
  PageHeader,
  LeCarageLogo,
  CustomButton,
  CustomCheckBox,
  Loader,
} from '../../components';
import { ImagesPath, ConstantStrings } from '../../utils/constants';
import {
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import './Login.scss';
import { LoginSchema } from '../../utils/ValidationSchemas';
import { loginValidation } from '../../utils';
import { useNavigate } from 'react-router';
import { HiOutlineUser } from 'react-icons/hi';
import { BiLockAlt } from 'react-icons/bi';
import { HiEye } from 'react-icons/hi';
import _ from 'lodash';
interface IProps {
  passwordType: string;
  handleOnSubmit: (values: {
    email: string;
    password: string;
    isRemember: boolean;
  }) => void;
  handleInputChange: () => void;
  userData?: {
    email: string;
    password: string;
    isRemember: boolean;
  };
  showLoader: boolean
}

export const Login: React.FC<IProps> = ({
  passwordType,
  handleOnSubmit,
  handleInputChange,
  userData,
  showLoader
}) => {
  const navigate = useNavigate();
  return (
    <BackgroundImageContainer imageSource={ImagesPath.bgImageWithCar}>
      <Formik
        initialValues={{
          email: userData ? userData.email : '',
          password: userData ? userData.password : '',
          isRemember: userData ? userData.isRemember : false
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          handleOnSubmit(values);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldValue,
          handleBlur,
          touched,

        }) => (
          <div className='login-page col-md-12'>
            <div className='login-page__container container-fluid'>
              <div className='login-page__login-form  col-md-6'>
                <div className='login-page__heading' data-testid='pageheader'>
                  <PageHeader
                    text={ConstantStrings.loginPageHeading}
                    name='heading'
                  />
                </div>
                <form
                  onSubmit={handleSubmit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter')
                      handleSubmit();
                  }}
                  className='col-md-12 login-page__login-form__form-fields' data-testid='login-form'
                >
                  <div className='login-page__login-form__user-name-field '>
                    <InputTextField
                      dataTestId='input-field'
                      name='input-field-icon'
                      id='email_field'
                      placeholder={ConstantStrings.emailPlaceholder}
                      value={values.email}
                      inputType='text'
                      requiredOrNot={true}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={errors.email}
                      touched={touched.email}
                    >
                      <span className='single-icon'>
                        <i>
                          <HiOutlineUser />
                        </i>
                      </span>
                    </InputTextField>

                  </div>

                  <div className="  login-page__login-form__user-password-field ">
                    <InputTextField
                      dataTestId='password'
                      name='input-field-icon'
                      id='password_field'
                      placeholder={ConstantStrings.passwordPlaceholder}
                      value={values.password}
                      inputType={passwordType}
                      requiredOrNot={true}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={errors.password}
                      touched={touched.password}

                    >
                      <span className='multiple-icons loginicon'>
                        <i><BiLockAlt /></i>
                        <i onClick={() => {
                          handleInputChange();
                        }}>
                          {passwordType ? <HiEye /> : <AiOutlineEyeInvisible />}
                        </i>
                      </span>

                    </InputTextField>

                  </div>
                  <div className='login-page__login-form__checkbox-forgotpassword'>
                    <div className='login-page__login-form__rememberme-checkbox col-md-6'>
                      <CustomCheckBox
                        name='form-checkbox col-md-12'
                        value={_.toString(values.isRemember)}
                        onClick={() => setFieldValue('isRemember', !values.isRemember)} 
                        checkBoxText='Remember Me'
                        checkedOrNot={values.isRemember}
                      />
                    </div>
                    <div className='login-page__login-form__forgot-password col-md-6'>
                      <span className='login-page__login-form__forgot-password__content' onClick={(e) => {
                        e.stopPropagation();
                        navigate('/forgotpassword');
                      }}> Forgot Password?</span>
                    </div>
                  </div>
                  <div className='login-page__login-form__submit-button' >
                    <CustomButton
                      data-testid='buttonsub'
                      title="LOG IN"
                      name={showLoader ? 'cursor-not-allowed button_full': 'button_full'} 
                      buttonOnClick={handleSubmit}
                      isDisable={!isValid || !loginValidation(values.email, values.password)}
                    />
                  </div>
                </form>
              </div>
              {
                showLoader && <Loader />
              }
              <div className='login-page__logo-container col-md-6'>
                <LeCarageLogo
                  source={ImagesPath.lecaragelogo}
                  altText='logo'
                  name='logo-page__img'
                />
              </div>
            </div>
          </div>
        )}
      </Formik>
    </BackgroundImageContainer>
  );

};
