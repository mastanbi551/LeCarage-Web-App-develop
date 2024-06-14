/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState } from './CommonStateInterface';
const initialState: CommonState = {
  isLoading: false,
  dataLoading: false,
  
  isLoggedIn: false,
  WarehousesList: [],  
  statusList: [],
  userTypesList: []
};

const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    onLoadingStart: state => {
      state.isLoading = true;
    },
    onLoadingStop: state => {
      state.isLoading = false;
    },
        
    //default warehouse
    getWarehouseDetails: () => {},
    setWarehouses: (
      state,
      action: PayloadAction<CommonState['WarehousesList']>,
    ) => {
      state.WarehousesList = action.payload;
    },
    
    //get status
     getStatusDetails: () => {},
     setStatus: (
       state,
       action: PayloadAction<CommonState['statusList']>
     ) => {
       state.statusList = action.payload;
     },

    //get All Usertypes
    getAllUserTypes: () =>{},
    setAllUserTypes: (
      state,
      action: PayloadAction<CommonState['userTypesList']>,
    ) => {
      state.userTypesList = initialState.userTypesList;
      state.userTypesList = action.payload;
    },   
  },
});
export const { 
  onLoadingStart, 
  onLoadingStop,

  setWarehouses,
  getWarehouseDetails,
  
  getStatusDetails,
  setStatus,

  getAllUserTypes,
  setAllUserTypes
} = CommonSlice.actions;
export default CommonSlice.reducer;