import { Formik } from 'formik';
import React from 'react';
import { ConstantStrings, ImagesPath } from '../../utils/constants';
import {
  BackgroundImageContainer,
  CustomButton,
  InputTextField,
  LeCarageLogo,
  Loader,
  PageHeader,
} from '../../components';
import { ResetPasswordSchema } from '../../utils/ValidationSchemas';
import '../resetPassword/ResetPassword.scss';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { HiEye } from 'react-icons/hi';

interface ResetPassswordProps {
  handleOnSubmit: (values: {
    newPassword: string;
    confirmNewPassword: string;
  }) => void;
  newPassword: string;
  handleViewPassword: () => void;
  handleViewConfirmPassword: () => void;
  confirmPassword: string;
  showLoader: boolean;
}

export const ResetPassword: React.FC<ResetPassswordProps> = ({
  handleOnSubmit,
  newPassword,
  handleViewPassword,
  handleViewConfirmPassword,
  confirmPassword,
  showLoader,
}) => {
  return (
    <BackgroundImageContainer imageSource={ImagesPath.bgImageWithCar}>
      <Formik
        initialValues={{ newPassword: '', confirmNewPassword: '' }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleOnSubmit(values);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
          handleBlur,
          touched,
        }) => (
          <div className='reset-password-page'>
            <div className='reset-password-page__container'>
              <div className='reset-password-page__reset-password-form'>
                <div className='reset-password-page__heading'>
                  <PageHeader
                    text={ConstantStrings.resetPassword}
                    name='heading'
                  />
                </div>
                {/* <h2 className='reset-password-page__sub-heading'>
                  {ConstantStrings.codeverifyMessage}
                </h2> */}
                <form
                  className='reset-password-page__reset-password-form__form-fields'
                  onSubmit={handleSubmit}
                >
                  <div className='reset-password-page__reset-password-form__new-password-field'>
                    <InputTextField
                      name='input-field'
                      id='new-password_field'
                      placeholder={ConstantStrings.newPasswordPlaceholder}
                      value={values.newPassword}
                      inputType={newPassword}
                      requiredOrNot={true}
                      onChangeText={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      error={errors.newPassword}
                      touched={touched.newPassword}
                    >
                      <span className='multiple-icons'>
                        <i></i>
                        <i
                          onClick={() => {
                            handleViewPassword();
                          }}
                        >
                          {newPassword ? <HiEye /> : <AiOutlineEyeInvisible />}
                        </i>
                      </span>
                    </InputTextField>
                  </div>
                  <div className='reset-password-page__reset-password-form__confirm-new-password-field'>
                    <InputTextField
                      name='input-field'
                      id='confirm-new-password_field'
                      placeholder={
                        ConstantStrings.confirmNewPasswordPlaceholder
                      }
                      value={values.confirmNewPassword}
                      inputType={confirmPassword}
                      requiredOrNot={true}
                      onChangeText={handleChange('confirmNewPassword')}
                      onBlur={handleBlur('confirmNewPassword')}
                      error={errors.confirmNewPassword}
                      touched={touched.confirmNewPassword}
                    >
                      <span className='multiple-icons'>
                        <i></i>
                        <i
                          onClick={() => {
                            handleViewConfirmPassword();
                          }}
                        >
                          {confirmPassword ? (
                            <HiEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </i>
                      </span>
                    </InputTextField>
                  </div>
                  <div className='reset-password-page__reset-password-form__submit-button'>
                    <CustomButton
                      title='RESET PASSWORD'
                      name={
                        showLoader
                          ? 'cursor-not-allowed button_full'
                          : 'button_full'
                      }
                      buttonOnClick={handleSubmit}
                      isDisable={!isValid}
                    />
                  </div>
                  {/* <span className='reset-password-page__reset-password-form__login-redirect'>Click here to <a href='/login' className='redirect-login'>Login</a></span>  */}
                </form>
              </div>
              {showLoader && <Loader />}
              <div className='reset-password-page__logo-container'>
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
