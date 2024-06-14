import axios from 'axios';
import _ from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import * as Yup from 'yup';
import { HeaderType, MessageType } from './constants';
import { Urls, ApiKeys } from './constants/ApiConstants';
import {
  onLoggedOut,
  onTokenExpired,
} from '../pages/login/loginState/LoginSlice';
import jwt_decode from 'jwt-decode';

export const loginValidation = (email: string, password: string) => {
  if (email === null || password === null) return false;
  else return true;
};

export const EmailMobileSchema = Yup.object().shape({
  email: Yup.string().required().email('Please enter valid email-id'),
});

export const isMailOrMobile = (email: string, mobileNumber: string) => {
  if (email) {
    return true;
  }
  if (mobileNumber) {
    return true;
  } else false;
};

export const message = (message: string, type: string) => {
  alert({
    message: message,
  });
};

export const requestOptions = (
  apikey: string,
  payload: string,
  method: string
) => {
  const header = {
    [HeaderType.contentType]: HeaderType.applicationjson,
    apikey: apikey,
  };
  return {
    method: method,
    headers: header,
    body: payload,
  };
};

export const clearLocalStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  const isAuthenticate = localStorage.getItem('isAuthenticate');
  const parseJSON = isAuthenticate && JSON.parse(isAuthenticate);
  if (!parseJSON.isRemember) {
    localStorage.removeItem('isAuthenticate');
  } else {
    const newJson = { ...parseJSON, isAuthenticate: false };
    localStorage.setItem('isAuthenticate', JSON.stringify(newJson));
  }
};

export const isAuthenticated = async (token: string) => {
  const decoded: { exp: number } = await jwt_decode(token);
  if (Date.now() >= decoded?.exp * 1000) {
    clearLocalStorage();
    return false;
  } else {
    return true;
  }
};

export function* getApiCall(
  params: { payload: string; type: string } | null,
  endPoint: string,
  MethodType: string
): unknown {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const isAuth = yield isAuthenticated(token);
    if (isAuth) {
      let fetchUrl;
      if (params) {
        fetchUrl =
          Urls.baseUrl + endPoint + '?' + new URLSearchParams(params.payload);
      } else {
        fetchUrl = Urls.baseUrl + endPoint;
      }
      try {
        const response = yield fetch(fetchUrl, {
          method: MethodType,
          headers: {
            [HeaderType.contentType]: HeaderType.applicationjson,
            apikey: ApiKeys.apikey,
            [HeaderType.authorization]: `Bearer ${token}`,
          },
        });
        if (response.status === 403) {
          clearLocalStorage();
          yield put(onLoggedOut());
          yield put(onTokenExpired());
        }
        return response;
      } catch (error) {
        message(error + '', MessageType.danger);
        return error;
      }
    } else {
      //show message and logout
      clearLocalStorage();
      yield put(onLoggedOut());
      yield put(onTokenExpired());
    }
  } else {
    //show message and logout
    clearLocalStorage();
    yield put(onLoggedOut());
    yield put(onTokenExpired());
  }
}

export function* postApiCall(
  params: { payload: string; type: string },
  endPoint: string,
  MethodType: string
): unknown {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const isAuth = yield isAuthenticated(token);
    if (isAuth) {
      try {
        const headers = {
          [HeaderType.contentType]: HeaderType.applicationjson,
          apikey: ApiKeys.apikey,
          [HeaderType.authorization]: `Bearer ${token}`,
        };
        const response = yield fetch(Urls.baseUrl + endPoint, {
          method: MethodType,
          headers: headers,
          body: params.payload,
        });
        if (response.status === 403) {
          toast.error('Unauthorised. Invalid or expired token.', {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message',
          });
          clearLocalStorage();
          yield put(onLoggedOut());
          yield put(onTokenExpired());
        }
        return response;
      } catch (error) {
        alert(error);
        return error;
      }
    } else {
      clearLocalStorage();
      yield put(onLoggedOut());
      yield put(onTokenExpired());
    }
  } else {
    clearLocalStorage();
    yield put(onLoggedOut());
    yield put(onTokenExpired());
  }
}

export function* putApiCall(
  params: { payload: string; type: string },
  endPoint: string,
  MethodType: string
): unknown {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const isAuth = yield isAuthenticated(token);
    if (isAuth) {
      try {
        const response = yield fetch(Urls.baseUrl + endPoint, {
          method: MethodType,
          headers: {
            [HeaderType.contentType]: HeaderType.applicationjson,
            apikey: ApiKeys.apikey,
            [HeaderType.authorization]: `Bearer ${token}`,
          },
          body: params.payload,
        });
        if (response.status === 403) {
          toast.error('Unauthorised. Invalid or expired token.', {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message',
          });
          clearLocalStorage();
          yield put(onLoggedOut());
          yield put(onTokenExpired());
        }
        return response;
      } catch (error) {
        alert(error);
        return error;
      }
    } else {
      clearLocalStorage();
      yield put(onLoggedOut());
      yield put(onTokenExpired());
    }
  } else {
    clearLocalStorage();
    yield put(onLoggedOut());
    yield put(onTokenExpired());
  }
}

export function* deleteApiCall(
  params: { payload: string; type: string } | null,
  endPoint: string,
  MethodType: string
): unknown {
  const token = localStorage.getItem('accessToken');
  let fetchUrl;
  if (token) {
    const isAuth = yield isAuthenticated(token);
    if (isAuth) {
      if (params) {
        fetchUrl =
          Urls.baseUrl + endPoint + '?' + new URLSearchParams(params.payload);
      } else {
        fetchUrl = Urls.baseUrl + endPoint;
      }
      try {
        const response = yield fetch(fetchUrl, {
          method: MethodType,
          headers: {
            [HeaderType.contentType]: HeaderType.applicationjson,
            apikey: ApiKeys.apikey,
            [HeaderType.authorization]: `Bearer ${token}`,
          },
        });
        if (response.status === 403) {
          toast.error('Unauthorised. Invalid or expired token.', {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message',
          });
          clearLocalStorage();
          yield put(onLoggedOut());
          yield put(onTokenExpired());
        }
        return response;
      } catch (error) {
        //message(error + '', MessageType.danger);
        return error;
      }
    } else {
      clearLocalStorage();
      yield put(onLoggedOut());
      yield put(onTokenExpired());
    }
  } else {
    clearLocalStorage();
    yield put(onLoggedOut());
    yield put(onTokenExpired());
  }
}

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const request = {
      method: 'POST',
      url: Urls.uploadurl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        apiKey: ApiKeys.uploadApiKey,
      },
      data: formData,
    }; //const response = await axios(request);
    const response = await fetch(Urls.uploadurl, {
      method: 'POST',
      headers: {
        apiKey: ApiKeys.uploadApiKey,
      },
      body: formData,
    });
    if (response.status === 200) {
      console.log(response);
      const jsonData = await response.json();
      return jsonData.url;
    } else {
      console.log(response);
      return false;
    }
  } catch (e) {
    return false;
  }
};
