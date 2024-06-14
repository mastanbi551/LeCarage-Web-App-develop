/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderResponse } from './HeaderStateInterface';

export interface Details {
  userType: string;
  warehouseLocation: string;
  isDefault: boolean;
}

const initialState: HeaderResponse = {
  userRole: '',
  userRoleList: [],
  warehouseLocation: '',
  status: '',
  errDescription: '',
  errDetails: '',
  defaultUserType: [],
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
  defaultDetails: {
    isDefault: false,
    userTypeLabel: '',
    userTypeValue: '',
    warehouseLabel: '',
    warehouseValue: ''
  },
  defaultUserTypeWarehouseDetails: []
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    onApiCall: (state, action) => {
      state.isLoading = true;
    },
    onSuccess: (
      state,
      action: PayloadAction<HeaderResponse['responseData']>
    ) => {
      state.responseData = action.payload;
    },
    onFailure: (
      state,
      action: PayloadAction<HeaderResponse['responseData']>
    ) => {
      state.responseData = action.payload;
      state.isLoading = false;
    },
    userRoleType: (
      state,
      action: PayloadAction<HeaderResponse['userRole']>
    ) => {
      state.userRole = action.payload;
    },

    adminUserProfile: (
      state,
      action: PayloadAction<HeaderResponse['userRoleList']>
    ) => {
      state.userRoleList = [];
      state.userRoleList = action.payload;
    },
    
    defaultUserType: (
      state,
      action: PayloadAction<HeaderResponse['defaultUserType']>
    ) => {
      state.defaultUserType = action.payload;
    },
    defaultUserTypeWarehouseDetails: (
      state,
      action: PayloadAction<HeaderResponse['defaultUserTypeWarehouseDetails']>
    ) => {
      state.defaultUserTypeWarehouseDetails = action.payload;
    },
    defaultDetailsData: (
      state,
      action: PayloadAction<HeaderResponse['defaultDetails']>
    ) => {
      state.defaultDetails = action.payload;
    },
    
    onLoadingStop: state => {
      state.isLoading = false;
    },
    headerReset: state => {
      state.isLoading = false;
      state.responseData = initialState.responseData;
      state.userRoleList = [];
    }
  },
});
export const {
  userRoleType,
  adminUserProfile,
  defaultUserTypeWarehouseDetails,
  defaultUserType,
  onSuccess,
  onFailure,
  onApiCall,
  headerReset,
  defaultDetailsData
} = headerSlice.actions;
export default headerSlice.reducer;
