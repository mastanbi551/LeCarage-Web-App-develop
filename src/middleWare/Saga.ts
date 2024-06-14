/* eslint-disable @typescript-eslint/no-explicit-any */
import {put, takeLatest} from 'redux-saga/effects';
import { MethodType, Urls } from '../utils/constants';
import { onLoadingStart, onLoadingStop } from '../pages/commonStates/CommonSlice';
import { HeaderResponse } from '../components/header/headerstate/HeaderStateInterface';
import { onFailure, onSuccess } from '../components/header/headerstate/HeaderSlice';
import { getApiCall } from '../utils';
import { CommonState } from '../pages/commonStates/CommonStateInterface';
import { handleResetPasswordWorker } from '../pages/resetPassword/resetPasswordState/ResetPasswordApi';
import { 
  addCarWorker, 
  deleteCarWorker, 
  getAllCarsWorker, 
  getCarColorWorker, 
  getCarInfoWorker, 
  getCarMakeWorker, 
  getCarModelByMakeWorker, 
  getCarModelWorker, 
  getCarStatusWorker, 
  updateCarWorker
} from '../pages/userManagement/carManagementPage/carManagementState/CarManagementApi';
import { createUserTypeWorker, deleteUserTypeWorker, getAllUserTypesWorker, getFeatureAccessListWorker, getFeaturesWorker, updateUserTypeWorker, viewUserTypeWorker } from '../pages/userManagement/userTypeManagementPage/userTypeManagementPageState/UserTypeManagementApi';
import { createCustomerWorker, deleteCustomerWorker, getAllCustomersWorker, LinkedCustomerWorker, UnLinkedCustomerWorker, updateCustomerWorker, ViewCustomerWorker } from '../pages/userManagement/customerManagementPage/customerManagementPageState/CustomerManagementPageApi';
import { addUserWorker, deleteUserWorker, getAllAdminUsersWorker, getUserWorker, updateUserWorker } from '../pages/userManagement/userManagementPage/userManagementState/UserManagementApi';
import { createBookingWorker, getAllBookingsWorker, getBookingInfoWorker, getBookingsByDateWorker, getBookingServicesWorker, getBookingStatusWorker, getCustomerCarsWorker, getCustomersWorker, getTimeSlotsWorker, updateBookingWorker } from '../pages/bookingManagement/bookingsManagementPageState/BookingsManagementApi';
import { getLoginWorker } from '../pages/login/loginState/LoginApi';
import { handleForgotPasswordWorker } from '../pages/forgotPassword/forgotPasswordState/ForgotPasswordApi';
import { handleOtpVerifyWorker } from '../pages/otpVerification/otpState/OtpVerifyApi';
import { getDashboardMenusWorker } from '../components/sidebar/sidebarState/SidebarApi';
import { getAllUserTypesForDropDownWorker, getStatusWorker, getWarehouseDetailsWorker } from '../pages/commonStates/CommonApi';
import { responseStatus } from '../utils/constants/ConstantStrings';

function* getAdminUserProfilesWorker(params: { payload: string; type: string }): unknown {
  yield put(onLoadingStart());
  try {
    const response = yield getApiCall(params, Urls.adminUserProfile, MethodType.GET);//AdminUserProfilesApi.getAdminUserProfileApiCall(params.payload);
    const jsonRes: HeaderResponse['responseData'] = yield response?.json();
    if (jsonRes?.details?.length > 0 && jsonRes?.status == responseStatus.success) {
      yield put(onSuccess(jsonRes));
    } else {
      yield put(onFailure(jsonRes));
    }
    yield put(onLoadingStop());
  } catch (error) {
    yield put(onLoadingStop());
  }
}

function* WatcherSaga() {
  yield takeLatest('login/loginCall', getLoginWorker);
  yield takeLatest('forgotPassword/forgotPasswordRequest', handleForgotPasswordWorker);
  yield takeLatest('resetPassword/resetPasswordRequest', handleResetPasswordWorker);
  yield takeLatest('otpverification/OtpVerifyRequest', handleOtpVerifyWorker);
  yield takeLatest('header/onApiCall', getAdminUserProfilesWorker);
  yield takeLatest('sidebar/onApiCall', getDashboardMenusWorker);
    
  //userType Management Pages Start
  yield takeLatest('usertypemanagement/getAllUserTypesRequest', getAllUserTypesWorker);
  yield takeLatest('usertypemanagement/getFeatures', getFeaturesWorker);
  yield takeLatest('usertypemanagement/getFeatureAccessList', getFeatureAccessListWorker);
  yield takeLatest('usertypemanagement/createUserTypeRequest', createUserTypeWorker);
  yield takeLatest('usertypemanagement/updateUserTypeRequest', updateUserTypeWorker);
  yield takeLatest('usertypemanagement/deleteUserTypeRequest', deleteUserTypeWorker); 
  yield takeLatest('usertypemanagement/viewUserTypeRequest', viewUserTypeWorker);
  //userType Management Pages end

  //bookings calendar page start
  yield takeLatest('bookingsManagement/getAllBookingsRequest', getAllBookingsWorker);
  //bookings calendar page end

  //car Management Pages Start
  yield takeLatest('carmanagement/getCarMakeDetails', getCarMakeWorker);
  yield takeLatest('carmanagement/getCarModelDetails', getCarModelWorker);
  yield takeLatest('carmanagement/getCarModelByMakeIdDetails', getCarModelByMakeWorker);
  yield takeLatest('carmanagement/getCarColorDetails', getCarColorWorker);
  yield takeLatest('carmanagement/getCarStatusDetails', getCarStatusWorker);
  yield takeLatest('carmanagement/addCarRequest', addCarWorker);
  yield takeLatest('carmanagement/getAllCarsRequest', getAllCarsWorker);
  yield takeLatest('carmanagement/viewCarRequest', getCarInfoWorker);
  yield takeLatest('carmanagement/deleteCarRequest', deleteCarWorker);
  yield takeLatest('carmanagement/updateCarRequest', updateCarWorker);
  //car Management Pages end

  //Customer Management Page Start
  yield takeLatest('customermanagement/getAllCustomersRequest', getAllCustomersWorker);
  yield takeLatest('customermanagement/createCustomerRequest', createCustomerWorker);
  yield takeLatest('customermanagement/updateCustomerRequest', updateCustomerWorker);
  yield takeLatest('customermanagement/viewCustomerRequest', ViewCustomerWorker);  
  yield takeLatest('customermanagement/viewUnLinkedCarCustomerRequest', UnLinkedCustomerWorker);  
  yield takeLatest('customermanagement/viewLinkedCarCustomerRequest', LinkedCustomerWorker);
  yield takeLatest('customermanagement/deleteCustomerRequest', deleteCustomerWorker);
  //Customer Management Page End

  //users Management page start
  yield takeLatest('usermanagement/addNewUserRequest', addUserWorker);
  yield takeLatest('usermanagement/getAllAdminUsersRequest', getAllAdminUsersWorker);
  yield takeLatest('usermanagement/updateExistingUserRequest', updateUserWorker);
  yield takeLatest('usermanagement/onDeleteUserRequest', deleteUserWorker);
  yield takeLatest('usermanagement/onViewadminUserRequest', getUserWorker);
  //users Management page end

  //Booking Management page start
  yield takeLatest('bookingmanagement/getAllBookingsRequest', getAllBookingsWorker);
  yield takeLatest('bookingmanagement/getTimeSlots', getTimeSlotsWorker);
  yield takeLatest('bookingmanagement/getBookingServices', getBookingServicesWorker);
  yield takeLatest('bookingmanagement/getCustomerCars', getCustomerCarsWorker);
  yield takeLatest('bookingmanagement/getBookingsByDate', getBookingsByDateWorker);
  yield takeLatest('bookingmanagement/viewBookingRequest', getBookingInfoWorker);
  yield takeLatest('bookingmanagement/getBookingStatus', getBookingStatusWorker);
  yield takeLatest('bookingmanagement/createBookingRequest', createBookingWorker);
  yield takeLatest('bookingmanagement/updateBookingRequest', updateBookingWorker);
  yield takeLatest('bookingmanagement/getCustomers', getCustomersWorker);
  //Booking Magagementpageend

  //common Api calls
  yield takeLatest('common/getAllUserTypes', getAllUserTypesForDropDownWorker);
  yield takeLatest('common/getWarehouseDetails', getWarehouseDetailsWorker);
  yield takeLatest('common/getStatusDetails', getStatusWorker); 
  //common Api calls End
}

export default WatcherSaga;