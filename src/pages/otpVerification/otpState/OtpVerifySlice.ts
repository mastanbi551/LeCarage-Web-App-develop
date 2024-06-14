import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OtpVerifyResponse } from './OtpVerifyStateInterface';

const initialState: OtpVerifyResponse = {
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
  userEmailId: '',
    uId: '',
    loadingResponse: false
};

const otpVerifySlice = createSlice({
  name: 'otpverification',
  initialState,
  reducers: {
    OtpVerifyRequest: (state, action) => {
      state.isLoading = true;
    },    
  
    OtpVerifySuccess: (
      state,
      action: PayloadAction<OtpVerifyResponse['responseData']>,
    ) => {
      state.responseData = action.payload;
      // state.isLoading = false;
    },
    OtpVerifyFailure: (state, action: PayloadAction<OtpVerifyResponse['responseData']>) => {
      //state.isLoading = false;
      state.responseData = action.payload;
      
    },
    onLoadingStop: state => {
      state.isLoading = false;
    }
  },
});

export const {
  OtpVerifyRequest,
  OtpVerifySuccess,
  OtpVerifyFailure,
  onLoadingStop
} = otpVerifySlice.actions;

export default otpVerifySlice.reducer;
