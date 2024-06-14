import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResetPasswordResponse } from './ResetPasswordStateInterface';

const initialState: ResetPasswordResponse = {
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

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetPasswordRequest: (state, action) => {
      state.isLoading = true;
    },
    
    userEmailId: (state, action: PayloadAction<string>) => {
      state.userEmailId = action.payload;
    },
    userId: (state, action: PayloadAction<string>) => {
      state.uId = action.payload;
    },    
    resetPasswordSuccess: (
      state,
      action: PayloadAction<ResetPasswordResponse['responseData']>,
    ) => {
      state.responseData = action.payload;
      // state.isLoading = false;
    },
    resetPasswordFailure: (state, action: PayloadAction<ResetPasswordResponse['responseData']>) => {
      state.responseData = action.payload;
      //state.isLoading = false;
    },
    onLoadingStop: state => {
      state.isLoading = false;
    }
  },
});

export const {
  userEmailId,
  userId,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  onLoadingStop
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
