import { put } from 'redux-saga/effects';
import { MethodType, Urls } from '../../utils/constants';
import { getApiCall } from '../../utils';
import { onLoadingStart, onLoadingStop, setAllUserTypes, setStatus, setWarehouses } from '../commonStates/CommonSlice';
import { responseStatus } from '../../utils/constants/ConstantStrings';

//get All UserTypes For DropDown
function* getAllUserTypesForDropDown(): object {
    yield put(onLoadingStart());
    try {
      const userTypesRes = yield getApiCall(null, Urls.userTypes, MethodType.GET); //DashboardMenusApi.getDashboardMenusBasedOnUserTypeApiCall(params.payload);
      const jsonRes = yield userTypesRes?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status === responseStatus.success) {
        yield put(setAllUserTypes(jsonRes?.details));
      } else {
        yield put(onLoadingStop());
      }
    } catch (error) {
      yield put(onLoadingStop());
    }
  }

 //get warehouses
function* getWarehouseDetails(): object {
    yield put(onLoadingStart());
    try{
      const response = yield getApiCall(null, Urls.warehouse, MethodType.GET);
      const jsonRes = yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status === responseStatus.success) {
        yield put(setWarehouses(jsonRes?.details));
      } else {
        yield put(onLoadingStop);
      }
    }
    catch(error) {      
      yield put(onLoadingStop);
    }
  }

//get Status
function* getStatusDetails(): object {
  yield put(onLoadingStart());
  try {
    const userStatusRes = yield getApiCall(
      null,
      Urls.userStatus,
      MethodType.GET
    ); //DashboardMenusApi.getDashboardMenusBasedOnUserTypeApiCall(params.payload);
    const jsonRes = yield userStatusRes?.json();
    if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
      yield put(setStatus(jsonRes?.details));
    } else {
      yield put(onLoadingStop());
    }
  } catch (error) {
    yield put(onLoadingStop());
  }
}

export const getAllUserTypesForDropDownWorker = getAllUserTypesForDropDown;
export const getWarehouseDetailsWorker = getWarehouseDetails;
export const getStatusWorker = getStatusDetails;
