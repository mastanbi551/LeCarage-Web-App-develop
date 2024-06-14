/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    CustomerManagementResponse
} from './CustomerManagementStateInterface';

const initialState: CustomerManagementResponse = {
  getCustomersIsLoading: false,
  getCustomersResponseData: {
    status: '',
    details: [],
    errDescription: '',
    errDetails: {
      detail: {
        code: '',
        message: '',
      },
    },
    message: '',
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
  
  
  viewCustomerResponseData: {
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
  viewCustomerIsLoading: false,

  viewLinkedCustomerResponseData: {
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
  linkedCarIsLoading: false,

  viewUnLinkedCustomerResponseData: {
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
  unlinkedCarIsLoading: false,

  deleteCustomerResponseData: {
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
  deleteCustomerIsLoading: false,
  itemsPerPage: 5,
};

const CustomerManagementSlice = createSlice({
  name: 'customermanagement',
  initialState,
  reducers: {
    //get All Customers
    getAllCustomersRequest: (state) => {
      state.getCustomersIsLoading = true;
    },
    getAllCustomersRequestResponse: (
      state,
      action: PayloadAction<CustomerManagementResponse['getCustomersResponseData']>
    ) => {
      state.getCustomersResponseData = initialState.getCustomersResponseData;
      state.getCustomersResponseData = action.payload;
    },

    //Create Customer
    createCustomerRequest: (state, action) => {
      state.isLoading = true;
    },
    createCustomerRequestResponse: (
      state,
      action: PayloadAction<CustomerManagementResponse['responseData']>
    ) => {
      state.responseData = initialState.responseData;
      state.responseData = action.payload;
    },

    //update Customer
    updateCustomerRequest: (state, action) => {
        state.isLoading = true;
      },
      updateCustomerRequestResponse: (
        state,
        action: PayloadAction<CustomerManagementResponse['responseData']>
      ) => {
        state.responseData = initialState.responseData;
        state.responseData = action.payload;
      },

    //get Status Data
    getStatusDetails: () => {},
    setStatus: (
      state,
      action: PayloadAction<CustomerManagementResponse['statusList']>
    ) => {
      state.statusList = action.payload;
    },

    //View Customer
    viewCustomerRequest:(state, action) => {
        state.viewCustomerIsLoading = true;
      },
    viewCustomerRequestResponse: (
        state,
        action: PayloadAction<CustomerManagementResponse['viewCustomerResponseData']>
      ) => {
        state.viewCustomerResponseData = action.payload;
      },
      
       //linked car Customer
    viewLinkedCarCustomerRequest:(state, action) => {
      state.linkedCarIsLoading = true;
    },
    viewLinkedCustomerRequestResponse: (
      state,
      action: PayloadAction<CustomerManagementResponse['viewLinkedCustomerResponseData']>
    ) => {
      state.viewLinkedCustomerResponseData = action.payload;
    },

     //Unlinked car Customer
     viewUnLinkedCarCustomerRequest:(state) => {
      state.unlinkedCarIsLoading = true;
    },
    viewUnLinkedCustomerRequestResponse: (
      state,
      action: PayloadAction<CustomerManagementResponse['viewUnLinkedCustomerResponseData']>
    ) => {
      state.viewUnLinkedCustomerResponseData = action.payload;
    },

    //delete Customer
    deleteCustomerRequest:(state, action) => {
        state.deleteCustomerIsLoading = true;
      },
    deleteCustomerRequestResponse: (
        state,
        action: PayloadAction<CustomerManagementResponse['deleteCustomerResponseData']>
      ) => {
        state.deleteCustomerResponseData = action.payload;
      },
      setItemsPerPage: (state, action) => {
        state.itemsPerPage = action.payload;
      },
      reset: (state) => {
        state.isLoading = false;
        state.responseData = initialState.responseData;

        state.viewCustomerIsLoading = false;
        state.viewCustomerResponseData = initialState.viewCustomerResponseData;

        state.deleteCustomerIsLoading = false;
        state.deleteCustomerResponseData = initialState.deleteCustomerResponseData;

        state.getCustomersIsLoading = false;
        state.getCustomersResponseData = initialState.getCustomersResponseData;
      }
  },
});

export const {
    getAllCustomersRequest,
    getAllCustomersRequestResponse,

  getStatusDetails,
  setStatus,

    createCustomerRequest,
    createCustomerRequestResponse,

  updateCustomerRequest,
  updateCustomerRequestResponse,

  viewCustomerRequest,
  viewCustomerRequestResponse,

  deleteCustomerRequest,
  deleteCustomerRequestResponse,

  viewLinkedCarCustomerRequest,
  viewLinkedCustomerRequestResponse,

  viewUnLinkedCarCustomerRequest,
  viewUnLinkedCustomerRequestResponse,

  reset,
  setItemsPerPage
} = CustomerManagementSlice.actions;

export default CustomerManagementSlice.reducer;
