import React from 'react';
import { Formik } from 'formik';
import {
  BackgroundImageContainer,
  InputTextField,
  PageHeader,
  LeCarageLogo,
  CustomButton,
  Loader,
} from '../../components';
import { ImagesPath, ConstantStrings } from '../../utils/constants';
import '../otpVerification/OtpVerification.scss';
import { OtpValidationSchema } from '../../utils/ValidationSchemas';

interface OtpVerifyProps {
  handleOnSubmit: (values: {otp: string})=> void;
  showLoader: boolean
}

export const OtpVerification:React.FC<OtpVerifyProps>  = (
  {handleOnSubmit, showLoader}
) => {
    
    return (
      
      <Formik
        initialValues={{otp: ''}}
        validationSchema={OtpValidationSchema}
        onSubmit={values => {
          handleOnSubmit(values);
        }}
      >
        {({handleChange, handleSubmit, values, errors, isValid, handleBlur, touched}) => (
            <BackgroundImageContainer imageSource={ImagesPath.bgImageWithCar}>
              <>
                  <div className = 'otp-verification-page'>
                    <div className='otp-verification-page__container'>
                        <div className='otp-verification-page__otp-verification-form'>
                            <div className='otp-verification-page__heading'>
                                <PageHeader text={ConstantStrings.otpVerificationPageHeading} name='heading'/>
                            </div>
                            <div className='otp-verification-page__content'>
                                <p className='body_copy_1'>{ConstantStrings.otpVerificationPage.content}</p>
                            </div>
                            <form onSubmit={handleSubmit} onKeyDown={(e) => {
                    if(e.key === 'Enter')
                    handleSubmit();}}className='otp-verification-page__otp-verification-form__form-fields'>
                                <div className="otp-verification-page__otp-verification-form__otp-field">
                                <InputTextField 
                                            name='input-field' 
                                            dataTestId='otp-input'
                                            id='otp_field' 
                                            placeholder={ConstantStrings.otpVerificationPlaceholder}
                                            value={values.otp} 
                                            inputType='password'
                                            requiredOrNot={true}
                                            onChangeText={handleChange('otp')}
                                            error={errors.otp}
                                            onBlur={handleBlur('otp')}
                                            touched={touched.otp}
                                >
                                  {undefined}
                                </InputTextField>
                                
                                </div>
                                
                              
                                <div className='otp-verification-page__otp-verification-form__proceed-button'>
                                        <CustomButton 
                                        dataTestId='submit-button'            
                                            title="Proceed"
                                            name={showLoader ? 'cursor-not-allowed button_full': 'button_full'} 
                                            buttonOnClick={handleSubmit}
                                            isDisable={!isValid}
                                        />
                                </div>                                       
                            </form>
                      </div>
                      {
                                showLoader && <Loader />
                            }
                      <div className='otp-verification-page__logo-container'>               
                        <LeCarageLogo source={ImagesPath.lecaragelogo} altText="logo" name='logo-page__img'/>                
                      </div>
                    </div>  
                    </div>  
              </>
                
            
            </BackgroundImageContainer>
          )
        }
      </Formik>
    );
};