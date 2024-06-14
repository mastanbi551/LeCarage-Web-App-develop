import {put} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { MethodType, Urls } from '../../../../utils/constants';

import { CarManagementResponse } from './CarManagementStateInterface';
import { 
    addCarRequestResponse, 
    deleteCarRequestResponse, 
    getAllCarsRequestResponse,
    setCarColor, 
    setCarMake,
    setCarModel,
    setCarStatus,
    updateCarRequestResponse,
    viewCarRequestResponse
 } from './CarManagementSlice';
import { onLoadingStart, onLoadingStop } from '../../../commonStates/CommonSlice';
import { deleteApiCall, getApiCall, postApiCall, putApiCall } from '../../../../utils';
import { responseStatus } from '../../../../utils/constants/ConstantStrings';



//Car Management Page APi's Start

//get CarMake
function* getCarMakeDetails(): object {
    yield put(onLoadingStart());
    try{
      const response = yield getApiCall(null, Urls.carmake, MethodType.GET);
      const jsonRes = yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status === responseStatus.success) {
        yield put(setCarMake(jsonRes?.details));
      } else {
        yield put(onLoadingStop());
      }
    }
    catch(error) {
      yield put(onLoadingStop);
    }
  }
  
  //get CarModel
  function* getCarModelDetails(): object {
    yield put(onLoadingStart());
    try{
      const response = yield getApiCall(null, Urls.carmodel, MethodType.GET);
      const jsonRes= yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(setCarModel(jsonRes?.details));
      } else {
        yield put(onLoadingStop);
      }
    }
    catch(error) {
      yield put(onLoadingStop);
    }
  }
  
  //get CarModelByMake
  function* getCarModelByMakeID(params: {payload: string; type: string}): object {
    yield put(onLoadingStart());
    try {
      const response = yield getApiCall(params, Urls.carmodelbymake, MethodType.GET);
      const jsonRes= yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(setCarModel(jsonRes?.details));
      } else {
        yield put((onLoadingStop));
      }
    }
    catch (error) {      
      yield put(onLoadingStop);
    }
  }
  
  //get CarColor
  function* getCarColorDetails(): object {
    yield put(onLoadingStart());
    try{
      const response = yield getApiCall(null, Urls.carcolor, MethodType.GET);
      const jsonRes= yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status === responseStatus.success) {
        yield put(setCarColor(jsonRes?.details));
      } else {
        yield put(onLoadingStop());
      }
    }
    catch(error) {      
      yield put(onLoadingStop);
    }
  }
  
  //get carStatus
  function* getCarStatusDetails(): object {
    yield put(onLoadingStart());
    try{
      const response = yield getApiCall(null, Urls.carstatus, MethodType.GET);
      const jsonRes = yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status === responseStatus.success) {
        yield put(setCarStatus(jsonRes?.details));
      } else {
        yield put(onLoadingStop);
      }
    }
    catch(error) {      
      yield put(onLoadingStop);
    }
  }
  
  //add Car
  function* addCar(params: {payload: string;type: string}): object {
    yield put(onLoadingStart());
    try {
      const response = yield postApiCall(params, Urls.addCar, MethodType.POST);
      const jsonRes: CarManagementResponse['responseData'] = yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(addCarRequestResponse(jsonRes));
        toast.success('Car Created Successfully',{
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
      } else {
        const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
        yield put(addCarRequestResponse(jsonRes));
      }
      // yield put(onLoadingStop());
    }
    catch (error) {      
      yield put(onLoadingStop);
    }
  }

   //update Car
   function* updateCar(params: {payload: string;type: string}): object {
    yield put(onLoadingStart());
    try {
      const response = yield putApiCall(params, Urls.updateCar, MethodType.PUT);
      const jsonRes: CarManagementResponse['responseData'] = yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(updateCarRequestResponse(jsonRes));
        toast.success('Car details updated successfully',{
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
      } else {
        const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
        yield put(updateCarRequestResponse(jsonRes));
      }
      // yield put(onLoadingStop());
    }
    catch (error) {      
      yield put(onLoadingStop);
    }
  }
  
  //get All Cars
  function* getAllCars(): object {
    yield put(onLoadingStart());
    try{
      const response = yield getApiCall(null, Urls.allcars, MethodType.GET);
      if(response.status === 200){
        const jsonRes: CarManagementResponse['getCarsResponseData'] = yield response?.json();
        if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
          yield put(getAllCarsRequestResponse(jsonRes));
        } else {
          yield put(getAllCarsRequestResponse(jsonRes));
          
        }
      }
      else {
        toast.error('Failed to Fetch cars Details', {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        });
        yield put(onLoadingStop());
        yield put(getAllCarsRequestResponse(response)); 
      }
      
    }
    catch(error) {      
      yield put(onLoadingStop);
    }
  }

  //get Car Info
  function* getCarInfo(params: {payload: string;type: string}): object {
    yield put(onLoadingStart());
    try {
      const viewCarResponse = yield getApiCall(params, Urls.getCarByID, MethodType.GET);
      const jsonRes: CarManagementResponse['viewCarResponseData'] = yield viewCarResponse?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(viewCarRequestResponse(jsonRes));
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

  //delete car 
  function* deleteCar(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const response = yield deleteApiCall(params, Urls.deleteCar, MethodType.DELETE);//AdminUserProfilesApi.getAdminUserProfileApiCall(params.payload);
      const jsonRes: CarManagementResponse['deleteCarResponseData'] = yield response?.json();
      if (jsonRes && jsonRes?.status === responseStatus.success) {
        yield put(deleteCarRequestResponse(jsonRes));
        toast.success('Car Deleted Successfully', {
            position: toast.POSITION.TOP_CENTER, className: 'toast-message'
          });
      } else {
        const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
        yield put(onLoadingStop());
       
      }
      yield put(onLoadingStop());
    } catch (error) {      
      yield put(onLoadingStop());
    }
  }
  
  //Car Management Page Api's End

  export const getCarMakeWorker = getCarMakeDetails;
  export const getCarModelWorker = getCarModelDetails;
  export const getCarModelByMakeWorker = getCarModelByMakeID;
  export const getCarColorWorker = getCarColorDetails;
  export const getCarStatusWorker = getCarStatusDetails;
  export const addCarWorker = addCar;
  export const getAllCarsWorker = getAllCars;
  export const getCarInfoWorker = getCarInfo;
  export const deleteCarWorker = deleteCar;
  export const updateCarWorker = updateCar;