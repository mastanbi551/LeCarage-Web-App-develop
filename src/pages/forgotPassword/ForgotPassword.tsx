import React from 'react';
import { Formik } from 'formik';
import { BackgroundImageContainer, InputTextField, PageHeader, LeCarageLogo, CustomButton, Loader } from '../../components';
import { ImagesPath, ConstantStrings } from '../../utils/constants';
import './ForgotPassword.scss';
import { ForgotPasswordSchema } from '../../utils/ValidationSchemas';

interface ForgotPassswordProps {
    handleOnSubmit: (values: {email: string}) => void;
    showLoader: boolean
}

export const ForgotPassword: React.FC<ForgotPassswordProps> = ({
    handleOnSubmit,
    showLoader
}) => {
    return (
        <BackgroundImageContainer imageSource={ImagesPath.bgImageWithCar}>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleOnSubmit(values);
                }}
            >
                {({ handleChange, handleSubmit, values, errors, isValid, handleBlur, touched }) => (
                    <div className='forgot-password-page'>
                        <div className='forgot-password-page__container'>
                            <div className='forgot-password-page__forgot-password-form' >
                                <div className='forgot-password-page__heading'>
                                    <PageHeader text={ConstantStrings.fillInThefield} name='heading' />
                                </div>
                                <h2 className='forgot-password-page__sub-heading'>{ConstantStrings.codeverifyMessage}</h2>
                                <form className='forgot-password-page__forgot-password-form__form-fields' onSubmit={handleSubmit} data-testid="forgot-password-form">
                                    <div className="forgot-password-page__forgot-password-form__emailid-field" data-testid="input-field">
                                        <InputTextField
                                            dataTestId="emailfgt"
                                            name='input-field'
                                            id='email_field'
                                            placeholder={ConstantStrings.enterEmail}
                                            value={values.email}
                                            inputType='text'
                                            requiredOrNot={true}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            error={errors.email}
                                            touched={touched.email}
                                        />

                                    </div>
                                    <div className='forgot-password-page__forgot-password-form__submit-button'>
                                        <CustomButton
                                            title="SEND OTP"
                                            dataTestId='button_full'
                                            name={showLoader ? 'cursor-not-allowed button_full': 'button_full'} 
                                            buttonOnClick={handleSubmit}
                                            isDisable={!isValid}
                                        />
                                    </div>
                                    <span className='forgot-password-page__forgot-password-form__login-redirect'>click here to <a href='/login' className='redirect-login'>login </a></span>
                                </form>
                            </div>
                            {
                                showLoader && <Loader />
                            }
                            <div className='forgot-password-page__logo-container'>
                                <LeCarageLogo source={ImagesPath.lecaragelogo} altText="logo" name='logo-page__img' />
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </BackgroundImageContainer>
    );

};

