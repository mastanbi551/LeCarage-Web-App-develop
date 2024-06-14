/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserManagementResponse } from './UserManagementStateInterface';

const initialState: UserManagementResponse = {
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

  getUsersResponseData: {
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
  getUsersIsLoading: false,

  viewUserIsLoading: false,
  viewUserResponseData: {
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

  onDeleteResponseData: {
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
  onDeleteIsLoading: false,
  itemsPerPage: 5
};

const userManagementSlice = createSlice({
  name: 'usermanagement',
  initialState,
  reducers: { 
    //get All users
    getAllAdminUsersRequest: (state) => {
      state.getUsersIsLoading = true;
    },     
    onGetAllAdminUsersResponse: (
      state,
      action: PayloadAction<UserManagementResponse['getUsersResponseData']>
    ) => {
      state.getUsersResponseData = initialState.getUsersResponseData;
      state.getUsersResponseData = action.payload;
      //state.isLoading = false;
    }, 

    //view User
    onViewadminUserRequest: (state, action) => {
      state.viewUserIsLoading = true;
    },
    onViewAdminUserRequestResponse: (state, action: PayloadAction<UserManagementResponse['viewUserResponseData']>,) => {
      state.viewUserResponseData = initialState.viewUserResponseData;
      state.viewUserResponseData = action.payload;
    },

    //add new User
    addNewUserRequest:(state, action)=>{
      state.isLoading = true;
    },    
    onAddNewUserResponse:(
      state,
      action: PayloadAction<UserManagementResponse['responseData']>,
    )=>{
      state.responseData = action.payload;
    },

    //edit user
    updateExistingUserRequest: (state, action)=>{
      state.isLoading = true;
    },    
    onUpdateExistingUserResponse: (
      state,
      action: PayloadAction<UserManagementResponse['responseData']>,
    ) => {
      state.responseData = action.payload;
    },

    //delete user
    onDeleteUserRequest: (state, action) => {
      state.onDeleteIsLoading = true;
    },
    onDeleteUserRequestResponse: (
      state,
      action: PayloadAction<UserManagementResponse['responseData']>,
    )=>{
      state.onDeleteResponseData = action.payload;
    },
 
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },

    reset: (state) => {
      state.responseData = initialState.responseData;
      state.isLoading = false;
      state.viewUserIsLoading = false;
      state.viewUserResponseData = initialState.viewUserResponseData;

      state.getUsersIsLoading = false;
      state.getUsersResponseData = initialState.getUsersResponseData;
    },
   
  },
});
export const {
  getAllAdminUsersRequest,
  onGetAllAdminUsersResponse,
  reset,
  onAddNewUserResponse,
  addNewUserRequest,
  updateExistingUserRequest,
  onUpdateExistingUserResponse,
  onDeleteUserRequest,
  onViewadminUserRequest,
  onViewAdminUserRequestResponse,
  onDeleteUserRequestResponse,
  setItemsPerPage
} = userManagementSlice.actions;

export default userManagementSlice.reducer;
