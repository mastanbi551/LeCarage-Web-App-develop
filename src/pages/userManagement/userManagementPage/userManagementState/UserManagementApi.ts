import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import { MethodType, Urls } from '../../../../utils/constants';
import { deleteApiCall, getApiCall, postApiCall, putApiCall } from '../../../../utils';
import { onLoadingStart, onLoadingStop } from '../../../commonStates/CommonSlice';
import { onAddNewUserResponse, onDeleteUserRequestResponse, onGetAllAdminUsersResponse, onUpdateExistingUserResponse, onViewAdminUserRequestResponse } from './UserManagementSlice';

import { UserManagementResponse } from './UserManagementStateInterface';
import { responseStatus } from '../../../../utils/constants/ConstantStrings';

//get All Users
function* getAllAdminUsers(): object {
    yield put(onLoadingStart());
    try {
      const response = yield getApiCall(null, Urls.adminUsers, MethodType.GET);
      if(response.status === 200){
        const jsonRes: UserManagementResponse['getUsersResponseData'] = yield response?.json();
        if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
          yield put(onGetAllAdminUsersResponse(jsonRes));
        } else {
          yield put(onGetAllAdminUsersResponse(jsonRes));
        }
      }
      else {
        toast.error('Failed to Fetch User Details', {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        });
        yield put(onLoadingStop());
        yield put(onGetAllAdminUsersResponse(response));      
      }
    }
    catch (error) {      
      yield put(onLoadingStop);
    }
  }
  
  //delete user
  function* deleteUser(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const response = yield deleteApiCall(params, Urls.deleteAdminUser, MethodType.DELETE);//AdminUserProfilesApi.getAdminUserProfileApiCall(params.payload);
      const jsonRes: UserManagementResponse['onDeleteResponseData'] = yield response?.json();
      if (jsonRes && jsonRes?.status == responseStatus.success) {
        yield put(onDeleteUserRequestResponse(jsonRes));
        toast.success('User Deleted Successfully', {
            position: toast.POSITION.TOP_CENTER, className: 'toast-message'
          });
      } else {
        yield put(onDeleteUserRequestResponse(jsonRes));
        toast.error('User Deleted Successfully', {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
      }
      yield put(onLoadingStop());
    } catch (error) {
      
      yield put(onLoadingStop());
    }
  }

//view user  
function* getUserById(params: {payload: string;type: string}): object {
    yield put(onLoadingStart());
    try {
      const response = yield getApiCall(params, Urls.viewAdminUser, MethodType.GET);
      const jsonRes: UserManagementResponse['viewUserResponseData'] = yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(onViewAdminUserRequestResponse(jsonRes));
      } else {
        yield put(onViewAdminUserRequestResponse(jsonRes));
        toast.error('Get User Details Failed', {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
      }
      // yield put(onLoadingStop());
    }
    catch (error) {      
      yield put(onLoadingStop);
    }
  }

  function* addUser(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const addNewUserRes = yield postApiCall(params, Urls.adminUser, MethodType.POST);
      const jsonRes: UserManagementResponse['responseData'] = yield addNewUserRes?.json();
      if (jsonRes?.status == responseStatus.success) {
        toast.success('User Created Successfully', {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        });
        yield put(onAddNewUserResponse(jsonRes));
      } else {
        const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        });
        yield put(onAddNewUserResponse(jsonRes));        
      }
  
    } catch (error) {
      toast.error('User Creation Failed', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
      yield put(onLoadingStop());      
    }
  }
  
  function* updateUser(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const updateExistingUserRes = yield putApiCall(params, Urls.adminUser, MethodType.PUT);
      const jsonRes: UserManagementResponse['responseData'] = yield updateExistingUserRes?.json();
      if (jsonRes?.status === responseStatus.success) {
        toast.success('User Updated Successfully', {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        });
        yield put(onUpdateExistingUserResponse(jsonRes));
      } else {
        const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        });
        yield put(onUpdateExistingUserResponse(jsonRes));
      }
    } catch (error) {
      yield put(onLoadingStop());
      toast.error('User Creation Failed', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
    }
  }

export const getAllAdminUsersWorker = getAllAdminUsers;
export const deleteUserWorker = deleteUser;
export const getUserWorker = getUserById;
export const addUserWorker = addUser;
export const updateUserWorker = updateUser;
