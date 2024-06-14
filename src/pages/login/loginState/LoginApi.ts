import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { ApiKeys, HeaderType, MethodType, Urls } from '../../../utils/constants/ApiConstants';
import { postApiCall } from '../../../utils';
import { onLoadingStart, onLoadingStop } from '../../commonStates/CommonSlice';
import { LoginResponse } from './LoginStateInterface';
import { onLoginSuccess, onLoggedIn, onLoginFailure } from '../loginState/LoginSlice';
import { responseStatus } from '../../../utils/constants/ConstantStrings';

// Login Api's start

// Login

function* getLogin(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
        const loginRes = yield postCall(params, Urls.login, MethodType.POST);//Api.loginApiCall(params);
        const jsonRes: LoginResponse['responseData'] = yield loginRes?.json();
        if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
            yield put(onLoginSuccess(jsonRes));
            localStorage.setItem('accessToken',jsonRes.details[0].token.accessToken);
            localStorage.setItem('refreshToken', jsonRes.details[0].token.refreshToken);
            yield put(onLoggedIn());
        } else {
            yield put(onLoginFailure(jsonRes));
            toast.error(jsonRes.errDescription, {
                position: toast.POSITION.TOP_CENTER, className: 'toast-message'
            });

        }
        yield put(onLoadingStop());
    } catch (error) {
        yield put(onLoadingStop());
        // yield put(onLoginFailure());
    }
}

export function* postCall(
    params: { payload: string; type: string },
    endPoint: string,
    MethodType: string
  ): unknown {
    try {
      const headers = {
        [HeaderType.contentType]: HeaderType.applicationjson,
        apikey: ApiKeys.apikey,
      };
      const response = yield fetch(Urls.baseUrl + endPoint, {
        method: MethodType,
        headers: headers,
        body: params.payload,
      });
      return response;
    } catch (error) {
      alert(error);
      return error;
    }
    
  }
// Login Api's end

export const getLoginWorker = getLogin;