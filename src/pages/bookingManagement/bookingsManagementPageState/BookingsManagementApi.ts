import { put } from 'redux-saga/effects';
import {
  ApiKeys,
  HeaderType,
  MessageType,
  MethodType,
  Urls,
} from '../../../utils/constants';

import { BookingsManagementResponse } from './BookingsManagementStateInterface';

import { onLoadingStart, onLoadingStop } from '../../commonStates/CommonSlice';
import {
  createBookingRequestResponse,
  getAllBookingsRequestResponse,
  setBookingsByDate,
  setBookingServices,
  setBookingStatus,
  setCustomerCars,
  setCustomers,
  setTimeSlots,
  updateBookingRequestResponse,
  viewBookingRequestResponse,
} from './BookingsManagementSlice';
import { toast } from 'react-toastify';
import { onLoggedOut, onTokenExpired } from '../../login/loginState/LoginSlice';
import { getApiCall, isAuthenticated } from '../../../utils';
import { getAllAdminUsersRequest } from '../../userManagement/userManagementPage/userManagementState/UserManagementSlice';
import { responseStatus } from '../../../utils/constants/ConstantStrings';
import _ from 'lodash';
import { json } from 'body-parser';

//getAllBookings
function* getAllBookings(): object {
  yield put(onLoadingStart());
  try {
    const response = yield getBookingsApiCall(
      null,
      Urls.allBookings,
      MethodType.GET
    );
    if (response.status === 200) {
      const jsonRes: BookingsManagementResponse['responseData'] =
        yield response?.json();
      if (
        jsonRes?.details?.length > 0 &&
        jsonRes?.status == responseStatus.success
      ) {
        yield put(getAllBookingsRequestResponse(jsonRes));
      } else {
        yield put(onLoadingStop());
      }
    } else {
      toast.error('Failed to Fetch Booking Details', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
      yield put(onLoadingStop());
      yield put(getAllAdminUsersRequest(response));
    }
  } catch (error) {
    yield put(onLoadingStop());
  }
}

//get ALl Timeslots
function* getTimeSlots(): object {
  yield put(onLoadingStart());
  try {
    const response = yield getBookingsApiCall(
      null,
      Urls.getTimeSlots,
      MethodType.GET
    );
    const jsonRes: BookingsManagementResponse['responseData'] =
      yield response?.json();
    if (
      jsonRes?.details?.length > 0 &&
      jsonRes?.status == responseStatus.success
    ) {
      yield put(setTimeSlots(jsonRes.details));
    } else {
      yield put(onLoadingStop());
    }
  } catch (error) {
    yield put(onLoadingStop());
  }
}

//get servicetypes
function* getBookingServices(): object {
  yield put(onLoadingStart());
  try {
    const response = yield getBookingsApiCall(
      null,
      Urls.bookingServices,
      MethodType.GET
    );
    const jsonRes: BookingsManagementResponse['responseData'] =
      yield response?.json();
    if (
      jsonRes?.details?.length > 0 &&
      jsonRes?.status == responseStatus.success
    ) {
      yield put(setBookingServices(jsonRes.details));
    } else {
      yield put(onLoadingStop());
    }
  } catch (error) {
    yield put(onLoadingStop());
  }
}

//get Customers
function* getCustomers(params: { payload: string; type: string }): object {
  yield put(onLoadingStart());
  try {
    const response = yield getBookingsApiCall(
      params,
      Urls.customersList,
      MethodType.GET
    );
    const jsonRes: BookingsManagementResponse['responseData'] =
      yield response?.json();
    if (
      jsonRes?.details?.length > 0 &&
      jsonRes?.status == responseStatus.success
    ) {
      yield put(setCustomers(jsonRes.details));
    } else {
      yield put(onLoadingStop());
    }
  } catch (error) {
    yield put(onLoadingStop());
  }
}

//get Customercars
function* getCustomerCars(params: { payload: string; type: string }): object {
  yield put(onLoadingStart());
  try {
    const response = yield getApiCall(
      params,
      Urls.customerCars,
      MethodType.GET
    );
    const jsonRes: BookingsManagementResponse['responseData'] =
      yield response?.json();
    if (
      jsonRes?.details?.length > 0 &&
      jsonRes?.status == responseStatus.success
    ) {
      yield put(setCustomerCars(jsonRes.details));
    } else {
      yield put(onLoadingStop());
    }
  } catch (error) {
    yield put(onLoadingStop());
  }
}

//get Booking TimeSlots by Selected dat
function* getBookingsByDate(params: { payload: string; type: string }): object {
  yield put(onLoadingStart());
  try {
    const response = yield getBookingsApiCall(
      params,
      Urls.bookingForDate,
      MethodType.GET
    );
    const jsonRes: BookingsManagementResponse['responseData'] =
      yield response?.json();
    if (
      jsonRes?.details?.length > 0 &&
      jsonRes?.status == responseStatus.success
    ) {
      yield put(setBookingsByDate(jsonRes.details));
    } else {
      yield put(setBookingsByDate(jsonRes.details));
    }
  } catch (error) {
    yield put(onLoadingStop());
  }
}

//get bookingInfo
function* getBookingInfo(params: { payload: string; type: string }): object {
  yield put(onLoadingStart());
  try {
    const response = yield getBookingsApiCall(
      params,
      Urls.getBookinginfo,
      MethodType.GET
    );
    const jsonRes: BookingsManagementResponse['responseData'] =
      yield response?.json();
    if (
      jsonRes?.details?.length > 0 &&
      jsonRes?.status == responseStatus.success
    ) {
      yield put(viewBookingRequestResponse(jsonRes));
    } else {
      const errorMessage =
        jsonRes.errDescription +
        '\n' +
        'Reason:' +
        `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
      yield put(viewBookingRequestResponse(jsonRes));
    }
  } catch (error) {
    toast.error('Fetching Booking Details Failed', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message',
    });
    yield put(onLoadingStop());
  }
}

//get servicetypes
function* getBookingStatus(): object {
  yield put(onLoadingStart());
  try {
    const response = yield getBookingsApiCall(
      null,
      Urls.bookingStatus,
      MethodType.GET
    );
    const jsonRes: BookingsManagementResponse['responseData'] =
      yield response?.json();
    if (
      jsonRes?.details?.length > 0 &&
      jsonRes?.status == responseStatus.success
    ) {
      yield put(setBookingStatus(jsonRes.details));
    } else {
      yield put(onLoadingStop());
    }
  } catch (error) {
    yield put(onLoadingStop());
  }
}

//create Booking
function* createBooking(params: { payload: string; type: string }): object {
  yield put(onLoadingStart());
  try {
    const response = yield postBookingApiCall(
      params,
      Urls.createBooking,
      MethodType.POST
    );
    const jsonRes: BookingsManagementResponse['responseData'] =
      yield response?.json();
    if (jsonRes && jsonRes?.status === responseStatus.success) {
      toast.success('Booking Created Successfully', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
      yield put(createBookingRequestResponse(jsonRes));
    } else {
      yield put(onLoadingStop());
      yield put(createBookingRequestResponse(jsonRes));
      const errorMessage =
        jsonRes.errDescription +
        '\n' +
        'Reason:' +
        `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
    }
    // yield put(onLoadingStop());
  } catch (error) {
    yield put(onLoadingStop);
    toast.error('Booking Creation Failed', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message',
    });
  }
}

//update Booking
function* updateBooking(params: { payload: string; type: string }): object {
  yield put(onLoadingStart());
  try {
    const response = yield putBookingApiCall(
      params,
      Urls.updateBooking,
      MethodType.PUT
    );
    const jsonRes: BookingsManagementResponse['responseData'] =
      yield response?.json();
    if (jsonRes && jsonRes?.status === responseStatus.success) {
      toast.success('Booking Updated Successfully', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
      yield put(updateBookingRequestResponse(jsonRes));
    } else {
      yield put(onLoadingStop());
      yield put(updateBookingRequestResponse(jsonRes));
      const errorMessage =
        jsonRes.errDescription +
        '\n' +
        'Reason:' +
        `${jsonRes.errDetails.detail.code}, ${jsonRes.errDetails.detail.message}`;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
    }
    // yield put(onLoadingStop());
  } catch (error) {
    yield put(onLoadingStop);
    toast.error('Booking Updation Failed', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message',
    });
  }
}

export function* getBookingsApiCall(
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
          Urls.bookingsUrl +
          endPoint +
          '?' +
          new URLSearchParams(params.payload);
      } else {
        fetchUrl = Urls.bookingsUrl + endPoint;
      }
      try {
        const response = yield fetch(fetchUrl, {
          method: MethodType,
          headers: {
            [HeaderType.contentType]: HeaderType.applicationjson,
            apikey: ApiKeys.bookingsApikey,
            [HeaderType.authorization]: `Bearer ${token}`,
          },
        });
        if (response.status === 403) {
          yield put(onLoggedOut());
          yield put(onTokenExpired());
        }
        return response;
      } catch (error) {
        // message(error + '', MessageType.danger);
        return error;
      }
    } else {
      yield put(onLoggedOut());
      yield put(onTokenExpired());
    }
  } else {
    yield put(onLoggedOut());
    yield put(onTokenExpired());
  }
}

export function* postBookingApiCall(
  params: { payload: string; type: string },
  endPoint: string,
  MethodType: string
): unknown {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const isAuth = yield isAuthenticated(token);
    if (isAuth) {
      try {
        const response = yield fetch(Urls.bookingsUrl + endPoint, {
          method: MethodType,
          headers: {
            [HeaderType.contentType]: HeaderType.applicationjson,
            apikey: ApiKeys.bookingsApikey,
            [HeaderType.authorization]: `Bearer ${token}`,
          },
          body: params.payload,
        });
        if (response.status === 403) {
          yield put(onLoggedOut());
          yield put(onTokenExpired());
        }
        return response;
      } catch (error) {
        alert(error);
        return error;
      }
    } else {
      yield put(onLoggedOut());
      yield put(onTokenExpired());
    }
  } else {
    yield put(onLoggedOut());
    yield put(onTokenExpired());
  }
}

export function* putBookingApiCall(
  params: { payload: string; type: string },
  endPoint: string,
  MethodType: string
): unknown {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const isAuth = yield isAuthenticated(token);
    if (isAuth) {
      try {
        const response = yield fetch(Urls.bookingsUrl + endPoint, {
          method: MethodType,
          headers: {
            [HeaderType.contentType]: HeaderType.applicationjson,
            apikey: ApiKeys.bookingsApikey,
            [HeaderType.authorization]: `Bearer ${token}`,
          },
          body: params.payload,
        });
        if (response.status === 403) {
          yield put(onLoggedOut());
          yield put(onTokenExpired());
        }
        return response;
      } catch (error) {
        alert(error);
        return error;
      }
    } else {
      yield put(onLoggedOut());
      yield put(onTokenExpired());
    }
  } else {
    yield put(onLoggedOut());
    yield put(onTokenExpired());
  }
}

export const message = (message: string, type: string) => {
  alert({
    message: message,
  });
};

export const getAllBookingsWorker = getAllBookings;
export const getTimeSlotsWorker = getTimeSlots;
export const getBookingServicesWorker = getBookingServices;
export const getCustomerCarsWorker = getCustomerCars;
export const getBookingsByDateWorker = getBookingsByDate;
export const getBookingInfoWorker = getBookingInfo;
export const getBookingStatusWorker = getBookingStatus;
export const createBookingWorker = createBooking;
export const updateBookingWorker = updateBooking;
export const getCustomersWorker = getCustomers;
