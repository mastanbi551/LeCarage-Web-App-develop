import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../hooks/Hooks';
import { onLoadingStop, resetPasswordRequest } from '../resetPassword/resetPasswordState/ResetPasswordSlice';
import { useDispatch } from 'react-redux';
import { ResetPassword } from './ResetPassword';
import { responseStatus } from '../../utils/constants/ConstantStrings';

export const ResetPasswordContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uId } = useAppSelector(state => state.forgotPasswordReducer);
  const [userId, setUserId] = useState(uId !== '' ? uId : localStorage.getItem('uId'));
  const [newPassword, setNewPassword] = useState<string>('password');
  const [confirmPassword, setConfirmPassword] = useState<string>('password');
  const { responseData, isLoading } = useAppSelector(
    (state) => state.resetPasswordReducer
  );
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(false);
      if (responseData.status === responseStatus.success) {
        dispatch(onLoadingStop());
        navigate('/');
      }
    }
  }, [isLoading, responseData]);

  const handleViewPassword = () => {
    if (newPassword == '') setNewPassword('password');
    else setNewPassword('');
  };

  const handleViewConfirmPassword = () => {
    if (confirmPassword == '') setConfirmPassword('password');
    else setConfirmPassword('');
  };

  const handleOnSubmit = (values: {
    newPassword: string,
    confirmNewPassword: string
  }) => {
    setShowLoader(true);
    const params = JSON.stringify({
      uId: userId,
      newpassword: values.newPassword
    });
    dispatch(resetPasswordRequest(params));
  };

  return (
    <ResetPassword handleOnSubmit={handleOnSubmit}
      newPassword={newPassword}
      handleViewPassword={handleViewPassword}
      handleViewConfirmPassword={handleViewConfirmPassword}
      confirmPassword={confirmPassword}
      showLoader={showLoader}
       />
  );
};
