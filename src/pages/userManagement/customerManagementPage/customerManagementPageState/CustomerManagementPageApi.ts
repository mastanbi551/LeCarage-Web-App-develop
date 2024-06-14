import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import { MethodType, Urls } from '../../../../utils/constants';
import { deleteApiCall, getApiCall, postApiCall, putApiCall } from '../../../../utils';
import { onLoadingStart, onLoadingStop } from '../../../commonStates/CommonSlice';
import { createCustomerRequestResponse, deleteCustomerRequestResponse, getAllCustomersRequestResponse, updateCustomerRequestResponse, viewCustomerRequestResponse, viewLinkedCustomerRequestResponse, viewUnLinkedCustomerRequestResponse } from './CustomerManagementSlice';
import { CustomerManagementResponse } from './CustomerManagementStateInterface';
import { responseStatus } from '../../../../utils/constants/ConstantStrings';


function* getAllCustomers(): object {
    yield put(onLoadingStart());
    try {
      const response = yield getApiCall(null, Urls.customers, MethodType.GET);
      if(response.status === 200){
        const jsonRes: CustomerManagementResponse['getCustomersResponseData'] = yield response?.json();
        if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
          yield put(getAllCustomersRequestResponse(jsonRes));
        } else {
          yield put(getAllCustomersRequestResponse(jsonRes));
        }
      }
      else {
        toast.error('Failed to Fetch Customer Details', {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        });
        yield put(onLoadingStop());
        yield put(getAllCustomersRequestResponse(response)); 
      }
      
    }
    catch (error) {      
      yield put(onLoadingStop());
      toast.error('Error Fetching Customer Details', {
        position: toast.POSITION.TOP_CENTER, className: 'toast-message'
      });
    }
  }
  
  function* ViewCustomer(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const response = yield getApiCall(params, Urls.viewcustomer, MethodType.GET);
      const jsonRes: CustomerManagementResponse['viewCustomerResponseData'] = yield response?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(viewCustomerRequestResponse(jsonRes));
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
      toast.error('Error Fetching Customer Details', {
        position: toast.POSITION.TOP_CENTER, className: 'toast-message'
      });
    }
  }

  
function* createCustomer(params: { payload: string; type: string }): object {
  yield put(onLoadingStart());
    try {
      const addNewUserRes = yield postApiCall(params, Urls.registercustomer, MethodType.POST);
      const jsonRes: CustomerManagementResponse['responseData'] = yield addNewUserRes?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(createCustomerRequestResponse(jsonRes));
        toast.success('Customer Created Successfully', {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
      } else {
        const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
        yield put(onLoadingStop());
       
      }
  
    } catch (error) {
      yield put(onLoadingStop());
      toast.error('Customer Creation Failed', {
        position: toast.POSITION.TOP_CENTER, className: 'toast-message'
      });
    }
  }
  
  function* updateCustomer(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const upadteExistingCustomerRes = yield putApiCall(params, Urls.editCustomer, MethodType.PUT);
      const jsonRes: CustomerManagementResponse['responseData'] = yield upadteExistingCustomerRes?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status === responseStatus.success) {
        yield put(updateCustomerRequestResponse(jsonRes));
        toast.success('Customer details updated Successfully', {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
      } else {
        const errorMessage = jsonRes.errDescription + '\n' + 'Reason:' + `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER, className: 'toast-message'
        });
        yield put(onLoadingStop());
      }
    } catch (error) {
      yield put(onLoadingStop());
      toast.error('Customer details updation Failed', {
        position: toast.POSITION.TOP_CENTER, className: 'toast-message'
      });
    }
  }

  function* linkedCustomerCar(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const viewcustlkdRes = yield getApiCall(params, Urls.linkedCar, MethodType.GET);
      const jsonRes: CustomerManagementResponse['viewLinkedCustomerResponseData'] = yield viewcustlkdRes?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(viewLinkedCustomerRequestResponse(jsonRes));
      } else {
        yield put(onLoadingStop());
      }
      // yield put(onLoadingStop());
    }
    catch (error) {
        yield put(onLoadingStop);
    }
  }

  function* unlinkedCustomerCar(): object {
    yield put(onLoadingStart());
    try {
      const viewcustunlkdRes = yield getApiCall(null, Urls.unlinkedCar, MethodType.GET);
      const jsonRes: CustomerManagementResponse['viewUnLinkedCustomerResponseData'] = yield viewcustunlkdRes?.json();
      if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
        yield put(viewUnLinkedCustomerRequestResponse(jsonRes));
      } else {
        yield put(onLoadingStop());
      }
      // yield put(onLoadingStop());
    }
    catch (error) {
       yield put(onLoadingStop);
    }
  }


  function* deleteCustomer(params: { payload: string; type: string }): object {
    yield put(onLoadingStart());
    try {
      const response = yield deleteApiCall(params, Urls.deleteCustomer, MethodType.DELETE);//AdminUserProfilesApi.getAdminUserProfileApiCall(params.payload);
      const jsonRes: CustomerManagementResponse['deleteCustomerResponseData'] = yield response?.json();
      if (jsonRes && jsonRes?.status == responseStatus.success) {
        yield put(deleteCustomerRequestResponse(jsonRes));
        toast.success('Customer Deleted Successfully', {
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
      toast.error('Customer Deletion Failed', {
        position: toast.POSITION.TOP_CENTER, className: 'toast-message'
      });
    }
  }
  export const getAllCustomersWorker = getAllCustomers;
  export const ViewCustomerWorker = ViewCustomer;
  export const LinkedCustomerWorker = linkedCustomerCar;
  export const UnLinkedCustomerWorker = unlinkedCustomerCar;
  export const createCustomerWorker = createCustomer;
  export const updateCustomerWorker = updateCustomer;
  export const deleteCustomerWorker = deleteCustomer;
