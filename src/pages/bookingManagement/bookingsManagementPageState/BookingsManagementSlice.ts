/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingsManagementResponse } from './BookingsManagementStateInterface';

const initialState: BookingsManagementResponse = {
  getBookingsIsLoading: false,
  getBookingsResponseData: {
    status: '',
    details: [],
    errDescription: '',
    errDetails: {
      detail: {
        code: '',
        message: '',
      },
    },
  },
  responseData: {
    status: '',
    details: [],
    errDescription: '',
    errDetails: {
      detail: {
        code: '',
        message: '',
      },
    },
  },
  isLoading: false,
  statusList: [],
  timeSlotsList: [],
  bookingServicesList: [],
  carsList: [],
  bookingsByDate: [],
  warehouseList: [],
  customersList: [],

  viewBookingResponseData: {
    status: '',
    details: [],
    errDescription: '',
    errDetails: {
      detail: {
        code: '',
        message: '',
      },
    },
  },
  viewBookingIsLoading: false,

  deleteBookingResponseData: {
    status: '',
    details: [],
    errDescription: '',
    errDetails: {
      detail: {
        code: '',
        message: '',
      },
    },
  },
  deleteBookingIsLoading: false,
  itemsPerPage: 5
};

const BookingManagementSlice = createSlice({
  name: 'bookingmanagement',
  initialState,
  reducers: {
    //get All Bookings
    getAllBookingsRequest: (state) => {
      state.getBookingsIsLoading = true;
    },
    getAllBookingsRequestResponse: (
      state,
      action: PayloadAction<BookingsManagementResponse['getBookingsResponseData']>
    ) => {
      state.getBookingsResponseData = action.payload;
    },

    //Create Booking
    createBookingRequest: (state, action) => {
      state.isLoading = true;
    },
    createBookingRequestResponse: (
      state,
      action: PayloadAction<BookingsManagementResponse['responseData']>
    ) => {
      state.responseData = initialState.responseData;
      state.responseData = action.payload;
    },

    //update Booking
    updateBookingRequest: (state, action) => {
        state.isLoading = true;
      },
      updateBookingRequestResponse: (
        state,
        action: PayloadAction<BookingsManagementResponse['responseData']>
      ) => {
        state.responseData = initialState.responseData;
        state.responseData = action.payload;
      },

    //get Status Data
    getStatusDetails: () => {},
    setStatus: (
      state,
      action: PayloadAction<BookingsManagementResponse['statusList']>
    ) => {
      state.statusList = action.payload;
    },

    //get Time Slots
    getTimeSlots: () => {},
    setTimeSlots: (
        state,
        action: PayloadAction<BookingsManagementResponse['timeSlotsList']>
      ) => {
        state.timeSlotsList = action.payload;
      },

    //get ServiceTypes
    getBookingServices: () => {},
    setBookingServices: (
        state,
        action: PayloadAction<BookingsManagementResponse['bookingServicesList']>
      ) => {
        state.bookingServicesList = action.payload;
      },

    //getCars
    getCustomerCars: (state, action) => {},
    setCustomerCars: (
        state,
        action: PayloadAction<BookingsManagementResponse['carsList']>
      ) => {
        state.carsList = action.payload;
      },

    //get Booking By date
    getBookingsByDate: (state, action) => {},
    setBookingsByDate: (
      state,
      action: PayloadAction<BookingsManagementResponse['bookingsByDate']>
    ) => {
      state.bookingsByDate = action.payload;
    },

    //get Customers 
    getCustomers: () => {},
    setCustomers: (
        state,
        action: PayloadAction<BookingsManagementResponse['customersList']>
      ) => {
        state.customersList = action.payload;
      },

    //get Booking Status
    getBookingStatus: () => {},
    setBookingStatus: (
      state,
      action: PayloadAction<BookingsManagementResponse['statusList']>
    ) => {
      state.statusList = action.payload;
    },

    //View Booking
    viewBookingRequest:(state, action) => {
        state.viewBookingIsLoading = true;
      },
    viewBookingRequestResponse: (
        state,
        action: PayloadAction<BookingsManagementResponse['viewBookingResponseData']>
      ) => {
        state.viewBookingResponseData = action.payload;
      },

    //delete Booking
    deleteBookingRequest:(state, action) => {
        state.deleteBookingIsLoading = true;
      },
    deleteBookingRequestResponse: (
        state,
        action: PayloadAction<BookingsManagementResponse['deleteBookingResponseData']>
      ) => {
        state.deleteBookingResponseData = action.payload;
      },

      setItemsPerPage: (state, action) => {
        state.itemsPerPage = action.payload;
      },

      reset: (state) => {
        state.getBookingsIsLoading = false;
        state.getBookingsResponseData = initialState.getBookingsResponseData;

        state.isLoading = false;
        state.responseData = initialState.responseData;

        state.viewBookingIsLoading = false;
        state.viewBookingResponseData = {
          status: '',
          details: [],
          errDescription: '',
          errDetails: {
            detail: {
              code: '',
              message: '',
            },
          },
        };

        state.deleteBookingIsLoading = false;
        state.deleteBookingResponseData = {
          status: '',
          details: [],
          errDescription: '',
          errDetails: {
            detail: {
              code: '',
              message: '',
            },
          },
        };

        state.carsList = [];
        state.timeSlotsList = [];
        state.customersList = [];
      }
  },
});

export const {
  getAllBookingsRequest,
  getAllBookingsRequestResponse,

  getStatusDetails,
  setStatus,

  getTimeSlots,
  setTimeSlots,

  getBookingServices,
  setBookingServices,

  getCustomerCars,
  setCustomerCars,

  getBookingsByDate,
  setBookingsByDate,

  getBookingStatus,
  setBookingStatus,

  createBookingRequest,
  createBookingRequestResponse,

  updateBookingRequest,
  updateBookingRequestResponse,

  viewBookingRequest,
  viewBookingRequestResponse,

  deleteBookingRequest,
  deleteBookingRequestResponse,

  reset,
  setItemsPerPage,

  getCustomers,
  setCustomers
} = BookingManagementSlice.actions;

export default BookingManagementSlice.reducer;
