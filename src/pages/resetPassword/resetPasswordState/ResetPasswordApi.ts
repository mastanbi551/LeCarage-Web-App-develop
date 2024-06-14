import { MethodType, Urls } from '../../../utils/constants';
import { onLoadingStart, onLoadingStop } from '../../commonStates/CommonSlice';
import { put } from 'redux-saga/effects';
import { ResetPasswordResponse } from './ResetPasswordStateInterface';
import { postApiCall } from '../../../utils';
import { resetPasswordSuccess, resetPasswordFailure } from './ResetPasswordSlice';
import { onLoginFailure } from '../../login/loginState/LoginSlice';
import { toast } from 'react-toastify';
import { postCall } from '../../login/loginState/LoginApi';
import { responseStatus } from '../../../utils/constants/ConstantStrings';



function* handleResetPassword(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
        const resetPasswordResponse = yield postCall(params, Urls.resetPassword, MethodType.POST);
        const jsonRes: ResetPasswordResponse['responseData'] = yield resetPasswordResponse?.json();
        if (jsonRes?.details?.length > 0 && jsonRes?.status === responseStatus.success) {

            yield put(resetPasswordSuccess(jsonRes));
        } else {
            yield put(onLoginFailure(jsonRes));
            toast.error(jsonRes.errDescription, {
                position: toast.POSITION.TOP_CENTER, className: 'toast-message'
            });
        }
        yield put(onLoadingStop());

    } catch (error) {
        toast.error('Failed to Reset Password', {
            position: toast.POSITION.TOP_CENTER, className: 'toast-message'
          });
        yield put(onLoadingStop());
    }
}


export const handleResetPasswordWorker = handleResetPassword;