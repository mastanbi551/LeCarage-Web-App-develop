
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForgotPasswordResponse } from './ForgotPasswordStateInterface';

const initialState: ForgotPasswordResponse = {
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

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    forgotPasswordRequest: (state, action) => {
      state.isLoading = true;
    },
    userEmailId: (state, action: PayloadAction<string>) => {
      state.userEmailId = action.payload;
    },
    userId: (state, action: PayloadAction<string>) => {
      state.uId = action.payload;
    },    
    forgotPasswordSuccess: (
      state,
      action: PayloadAction<ForgotPasswordResponse['responseData']>,
    ) => {
      state.responseData = action.payload;
      // state.isLoading = false;
    },
    forgotPasswordFailure: (state, action: PayloadAction<ForgotPasswordResponse['responseData']>) => {
      state.responseData = action.payload;
     // state.isLoading = false;
    },
    onLoadingStop: state => {
      state.isLoading = false;
    }
  },
});

export const {
  userEmailId,
  userId,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  onLoadingStop
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
