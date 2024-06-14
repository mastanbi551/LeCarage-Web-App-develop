import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../hooks/Hooks';
import { useDispatch } from 'react-redux';
import { onLoadingStop, OtpVerifyRequest } from '../otpVerification/otpState/OtpVerifySlice';
import { OtpVerification } from './OtpVerification';
import { responseStatus } from '../../utils/constants/ConstantStrings';

export const OtpVerificationContainer = () => {
    const { uId } = useAppSelector(state => state.forgotPasswordReducer);
    const [userId, setUserId] = useState(uId !== '' ? uId : localStorage.getItem('uId'));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showLoader, setShowLoader] = useState(false);
    const { responseData, isLoading } = useAppSelector(
        (state) => state.otpVerifyReducer
      );
    
      useEffect(() => {
        if (isLoading) {
          setShowLoader(false);
          if (responseData.status === responseStatus.success) {
            dispatch(onLoadingStop());
            navigate('/resetpassword');
          }
        }
      }, [isLoading, responseData]);

      const handleOnSubmit = (values: {otp: string}) => {
        setShowLoader(true);
        const params = JSON.stringify({
          userID: userId,
          otpToVerify: values.otp
        });
        dispatch(OtpVerifyRequest(params));
      };  
   
      return <OtpVerification 
        handleOnSubmit={handleOnSubmit} 
        showLoader={showLoader}
      />;


};