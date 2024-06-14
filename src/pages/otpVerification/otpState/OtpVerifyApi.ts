import { MethodType, Urls } from '../../../utils/constants/ApiConstants';
import { postApiCall } from '../../../utils';
import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { onLoadingStart, onLoadingStop } from '../../commonStates/CommonSlice';
import { ResetPasswordResponse } from '../../resetPassword/resetPasswordState/ResetPasswordStateInterface';
import { OtpVerifySuccess, OtpVerifyFailure } from './OtpVerifySlice';
import { onLoginFailure } from '../../login/loginState/LoginSlice';
import { postCall } from '../../login/loginState/LoginApi';
import { responseStatus } from '../../../utils/constants/ConstantStrings';

function* handleOtpVerify(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const OtpVerifyResponse = yield postCall(params, Urls.otpValidation, MethodType.POST);
      const jsonRes: ResetPasswordResponse['responseData'] = yield OtpVerifyResponse?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status === responseStatus.success) {
        yield put(OtpVerifySuccess(jsonRes));
      } else {
        yield put(OtpVerifyFailure(jsonRes));
        toast.error(jsonRes.errDescription, {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
      }
      yield put(onLoadingStop());
  
    } catch (error) {
      toast.error('Failed to verify OTP', {
        position: toast.POSITION.TOP_CENTER, className: 'toast-message'
      });
      yield put(onLoadingStop());
    }
  }

export const handleOtpVerifyWorker = handleOtpVerify;