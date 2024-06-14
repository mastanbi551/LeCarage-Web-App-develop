/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  UserTypeManagementResponse,
} from './UserTypeManagementStateInterface';

const initialState: UserTypeManagementResponse = {
  getUserTypesIsLoading: false,
  getUserTypesResponseData: {
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
  userTypeDropDownData: [],
  featureList: [],
  featureAccessList: [],

  viewUserTyperesponseData: {
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
  viewUserTypeIsLoading: false,

  deleteUsertypeResponseData: {
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
  deleteUserTypeIsLoading: false,
  itemsPerPage: 5
};

const userTypeManagementSlice = createSlice({
  name: 'usertypemanagement',
  initialState,
  reducers: {
    //get All UserTypes
    getAllUserTypesRequest: (state) => {
      state.getUserTypesIsLoading = true;
    },
    getAllUserTypesRequestResponse: (
      state,
      action: PayloadAction<UserTypeManagementResponse['getUserTypesResponseData']>
    ) => {
      state.getUserTypesResponseData = action.payload;
    },

    //Create userTYpe
    createUserTypeRequest: (state, action) => {
      state.isLoading = true;
    },
    createUserTypeRequestResponse: (
      state,
      action: PayloadAction<UserTypeManagementResponse['responseData']>
    ) => {
      state.responseData = initialState.responseData;
      state.responseData = action.payload;
    },

    //update UserType
    updateUserTypeRequest: (state, action) => {
        state.isLoading = true;
      },
      updateUserTypeRequestResponse: (
        state,
        action: PayloadAction<UserTypeManagementResponse['responseData']>
      ) => {
        state.responseData = initialState.responseData;
        state.responseData = action.payload;
      },

    //get fetaures List
    getFeatures: () => {},
    setFeatures: (
      state,
      action: PayloadAction<UserTypeManagementResponse['featureList']>
    ) => {
      state.featureList = action.payload;
    },

    //get fetaure Access List
    getFeatureAccessList: () => {},
    setFeatureAccessList: (
      state,
      action: PayloadAction<UserTypeManagementResponse['featureAccessList']>
    ) => {
      state.featureAccessList = action.payload;
    },

    //View UserType
    viewUserTypeRequest:(state, action) => {
        state.viewUserTypeIsLoading = true;
      },
    viewUserTypeRequestResponse: (
        state,
        action: PayloadAction<UserTypeManagementResponse['viewUserTyperesponseData']>
      ) => {
        state.viewUserTyperesponseData = action.payload;
      },

    //delete UserType
    deleteUserTypeRequest:(state, action) => {
        state.deleteUserTypeIsLoading = true;
      },
    deleteUserTypeRequestResponse: (
        state,
        action: PayloadAction<UserTypeManagementResponse['deleteUsertypeResponseData']>
      ) => {
        state.deleteUsertypeResponseData = action.payload;
      },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
      reset: (state) => {
        state.getUserTypesIsLoading = false;
        state.getUserTypesResponseData = initialState.getUserTypesResponseData;
        
        state.isLoading = false;
        state.responseData = initialState.responseData;

        state.viewUserTypeIsLoading = false;
        state.viewUserTyperesponseData = initialState.viewUserTyperesponseData;

        state.deleteUserTypeIsLoading = false;
        state.deleteUsertypeResponseData = initialState.deleteUsertypeResponseData;
      }
  },
});

export const {
  getAllUserTypesRequest,
  getAllUserTypesRequestResponse,

  getFeatures,
  setFeatures,

  getFeatureAccessList,
  setFeatureAccessList,

  createUserTypeRequest,
  createUserTypeRequestResponse,

  updateUserTypeRequest,
  updateUserTypeRequestResponse,

  viewUserTypeRequest,
  viewUserTypeRequestResponse,

  deleteUserTypeRequest,
  deleteUserTypeRequestResponse,

  reset,
  setItemsPerPage
} = userTypeManagementSlice.actions;

export default userTypeManagementSlice.reducer;
