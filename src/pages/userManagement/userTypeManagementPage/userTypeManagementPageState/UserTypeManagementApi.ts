import { put } from 'redux-saga/effects';
import { MethodType, Urls } from '../../../../utils/constants';

import { UserTypeManagementResponse } from './UserTypeManagementStateInterface';
import { deleteApiCall, getApiCall, postApiCall, putApiCall } from '../../../../utils';
import {
  onLoadingStart,
  onLoadingStop,
} from '../../../commonStates/CommonSlice';
import {
  createUserTypeRequestResponse,
  deleteUserTypeRequestResponse,
  getAllUserTypesRequestResponse,
  setFeatureAccessList,
  setFeatures,
  updateUserTypeRequestResponse,
  viewUserTypeRequestResponse,
} from './UserTypeManagementSlice';
import { toast } from 'react-toastify';
import { responseStatus } from '../../../../utils/constants/ConstantStrings';

//get All UserTypes For UserTypes Table
function* getAllUserTypes(): object {
  yield put(onLoadingStart());
  try {
    const response = yield getApiCall(
      null,
      Urls.adminUserTypes,
      MethodType.GET
    ); 
    if(response.status === 200){
      const jsonRes: UserTypeManagementResponse['getUserTypesResponseData'] =
      yield response?.json();
    if (jsonRes?.status == responseStatus.success) {
      yield put(getAllUserTypesRequestResponse(jsonRes));
    } else {
      toast.error('Failed to Fetch UserType Details', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
      yield put(onLoadingStop());
      yield put(getAllUserTypesRequestResponse(jsonRes));      
    }
    }
    else {
      // toast.error('Failed to Fetch UserType Details', {
      //   position: toast.POSITION.TOP_CENTER,
      //   className: 'toast-message',
      // });
      yield put(onLoadingStop());
      yield put(getAllUserTypesRequestResponse(response));      
    }
    
    // yield put(onLoadingStop());
  } catch (error) {
    toast.error('Failed to Fetch UserType Details', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message',
    });
    yield put(onLoadingStop);
  }
}

function* getFeaturesList(): object {
  yield put(onLoadingStart());
  try {
    const response = yield getApiCall(
      null,
      Urls.fetauresList,
      MethodType.GET
    );
    const jsonRes = yield response?.json();
    if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
      yield put(setFeatures(jsonRes?.details));
    } else {
      yield put(onLoadingStop);
    }
    // yield put(onLoadingStop());
  } catch (error) {
    
    yield put(onLoadingStop);
  }
}

function* getFeatureAccessList(): object {
  yield put(onLoadingStart());
  try {
    const response = yield getApiCall(
      null,
      Urls.featuresAccessList,
      MethodType.GET
    );
    const jsonRes = yield response?.json();
    if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
      yield put(setFeatureAccessList(jsonRes?.details));
    } else {
      yield put(onLoadingStop());
    }
    // yield put(onLoadingStop());
  } catch (error) {
    
    yield put(onLoadingStop);
  }
}

function* createUserType(params: { payload: string; type: string }): object {
  yield put(onLoadingStart());
  try {
    const response = yield postApiCall(
      params,
      Urls.createusertype,
      MethodType.POST
    );
    const jsonRes: UserTypeManagementResponse['responseData'] =
      yield response?.json();
    if (jsonRes && jsonRes?.status === responseStatus.success) {
      toast.success('UserType Created Successfully', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
      yield put(createUserTypeRequestResponse(jsonRes));      
    } else {
      const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
      yield put(onLoadingStop());
      yield put(createUserTypeRequestResponse(jsonRes));
      
    }
    // yield put(onLoadingStop());
  } catch (error) {    
    yield put(onLoadingStop);
    toast.error('UserType Creation Failed', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message',
    });
  }
}

function* updateUserType(params: { payload: string; type: string }): object {
  yield put(onLoadingStart());
  try {
    const response = yield putApiCall(
      params,
      Urls.updateusertype,
      MethodType.PUT
    );
    const jsonRes: UserTypeManagementResponse['responseData'] =
      yield response?.json();
    if (jsonRes && jsonRes?.status == responseStatus.success) {
      yield put(updateUserTypeRequestResponse(jsonRes));
      toast.success('UserType updated successfully', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
    } else {
      const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
      yield put(updateUserTypeRequestResponse(jsonRes));
      
    }
    // yield put(onLoadingStop());
  } catch (error) {    
    yield put(onLoadingStop);
    toast.error('UserType updation failed', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message',
    });
  }
}

  function* deleteUserType(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const response = yield deleteApiCall(params, Urls.deleteusertype, MethodType.DELETE);//AdminUserProfilesApi.getAdminUserProfileApiCall(params.payload);
      const jsonRes: UserTypeManagementResponse['deleteUsertypeResponseData'] = yield response?.json();
      if (jsonRes && jsonRes?.status == responseStatus.success) {
        yield put(deleteUserTypeRequestResponse(jsonRes));
        toast.success('UserType deleted successfully', {
            position: toast.POSITION.TOP_CENTER, className: 'toast-message'
          });
      } else {
        const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
        yield put(onLoadingStop);
        
      }
      yield put(onLoadingStop());
    } catch (error) {
      
      yield put(onLoadingStop());
      toast.error('UserType deletion failed', {
        position: toast.POSITION.TOP_CENTER, className: 'toast-message'
      });
    }
  }

  function* viewUserType(params: {payload: string;type: string}): object {
    yield put(onLoadingStart());
    try {
      const response = yield getApiCall(params, Urls.viewUserType, MethodType.GET);
      const jsonRes: UserTypeManagementResponse['viewUserTyperesponseData'] = yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(viewUserTypeRequestResponse(jsonRes));
      } else {
        const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
        yield put(onLoadingStop());
      }
      // yield put(onLoadingStop());
    }
    catch (error) {      
      yield put(onLoadingStop);
    }
  }

export const getAllUserTypesWorker = getAllUserTypes;
export const getFeaturesWorker = getFeaturesList;
export const getFeatureAccessListWorker = getFeatureAccessList;
export const createUserTypeWorker = createUserType;
export const updateUserTypeWorker = updateUserType;
export const deleteUserTypeWorker = deleteUserType;
export const viewUserTypeWorker = viewUserType;
