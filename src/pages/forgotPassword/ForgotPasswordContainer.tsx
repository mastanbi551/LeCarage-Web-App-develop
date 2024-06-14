// ForgotPasswordContainer.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { forgotPasswordRequest, userEmailId } from '../forgotPassword/forgotPasswordState/ForgotPasswordSlice';
import { ForgotPassword } from './ForgotPassword';
import { useAppSelector } from '../../hooks/Hooks';
import { onLoadingStop } from '../forgotPassword/forgotPasswordState/ForgotPasswordSlice';
import { responseStatus } from '../../utils/constants/ConstantStrings';
import { useScroll } from 'framer-motion';

export const ForgotPasswordContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const { responseData, isLoading } = useAppSelector(
    (state) => state.forgotPasswordReducer
  );

  useEffect(() => {
    if (isLoading) {
      setShowLoader(false);
      if (responseData.status === responseStatus.success && responseData.details.length > 0) {
        dispatch(onLoadingStop());
        localStorage.setItem('uId', responseData.details[0].uId);
        navigate('/otpverification');
      }
    }
  }, [isLoading, responseData]);

  const handleOnSubmit = (values: {email: string}) => {
    setShowLoader(true);
    const params = JSON.stringify({
      email: values.email
    });
    dispatch(userEmailId(values.email));
    dispatch(forgotPasswordRequest(params));
  };

  return <ForgotPassword 
    handleOnSubmit={handleOnSubmit} 
    showLoader={showLoader}
  />;
};
