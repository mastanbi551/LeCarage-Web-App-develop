/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from './LoginStateInterface';

const initialState: LoginResponse = {
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
  isAuth: false,
  emailId: '',
  uId: '',
  loadingResponse: false,
  userRole: '',
  userRoleList: [],
  warehouseLocation: '',
  isTokenExpired: false
};
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginCall: (state, action) => {
      state.isLoading = true;
    },
    onLoginSuccess: (
      state,
      action: PayloadAction<LoginResponse['responseData']>,
    ) => {
      state.responseData = action.payload;
      //state.isLoading = false;
    },
    onLoginFailure: (state, action: PayloadAction<LoginResponse['responseData']>,) => {
      state.responseData = action.payload;
      // state.isLoading = false;
    },
    onLoggedIn: state => {
      state.isAuth = true;
    },
    onLoggedOut: state => {
      state.isAuth = false;
    },
    onTokenExpired: state => {
      state.isTokenExpired = true;
    },
    userEmailId: (state, action: PayloadAction<LoginResponse['emailId']>,) => {
      state.emailId = action.payload;
    },
    userid: (state, action: PayloadAction<LoginResponse['uId']>,) => {
      state.uId = action.payload;
    },
    loaderState: (state, action: PayloadAction<LoginResponse['loadingResponse']>,) => {
      state.loadingResponse = action.payload;
    },
    userRoleType: (state, action: PayloadAction<LoginResponse['userRole']>,)=>{
      state.userRole = action.payload;
    },
    adminUserProfile: (state, action: PayloadAction<LoginResponse['userRoleList']>,)=>{
      state.userRoleList =action.payload;
    },
    defaultWarehouseLocation: (state, action: PayloadAction<LoginResponse['warehouseLocation']>,)=> {
      state.warehouseLocation = action.payload;
    },
    reset: (state) => {
      state.isLoading = false;
      state.responseData = initialState.responseData;
      state.isTokenExpired = false;
      state.isAuth = false;
    }
  },
});
export const {
  loginCall,
  onLoginSuccess,
  onLoginFailure,
  onLoggedIn,
  onLoggedOut,
  userEmailId,
  userid,
  loaderState,
  userRoleType,
  adminUserProfile,
  defaultWarehouseLocation,
  onTokenExpired,
  reset
} = loginSlice.actions;
export default loginSlice.reducer;