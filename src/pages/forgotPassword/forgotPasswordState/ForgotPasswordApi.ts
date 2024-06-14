import { MethodType, Urls } from '../../../utils/constants/ApiConstants';
import { postApiCall } from '../../../utils';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { onLoadingStart, onLoadingStop } from '../../commonStates/CommonSlice';
import { ForgotPasswordResponse } from './ForgotPasswordStateInterface';
import { userEmailId, userId, forgotPasswordSuccess, forgotPasswordFailure } from './ForgotPasswordSlice';
import { onLoginFailure } from '../../login/loginState/LoginSlice';
import { postCall } from '../../login/loginState/LoginApi';
import { responseStatus } from '../../../utils/constants/ConstantStrings';


function* handleForgotPassword(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const forgotPasswordResponse = yield postCall(params, Urls.forgotPassword, MethodType.POST);
      const jsonRes: ForgotPasswordResponse['responseData'] = yield forgotPasswordResponse?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status === responseStatus.success) {
        toast.success(jsonRes.details[0].message, {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
        yield put(userId(jsonRes.details[0] && jsonRes.details[0].uId));
        yield put(forgotPasswordSuccess(jsonRes));
      } else {
        toast.error(jsonRes.errDescription, {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
        yield put(forgotPasswordFailure(jsonRes));        
      }
      yield put(onLoadingStop());
  
    } catch (error) {
      toast.error('Failed to Send OTP', {
        position: toast.POSITION.TOP_CENTER, className: 'toast-message'
      });
      yield put(onLoadingStop());
    }
  }

  export const handleForgotPasswordWorker = handleForgotPassword;