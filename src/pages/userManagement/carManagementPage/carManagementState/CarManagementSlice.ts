/* eslint-disable @typescript-eslint/no-empty-function */
import { statement } from '@babel/template';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarManagementResponse } from './CarManagementStateInterface';

const initialState: CarManagementResponse = {
  getCarsIsLoading: false,
  getCarsResponseData: {
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

  viewCarResponseData: {
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
  viewCarIsLoading: false,

  deleteCarResponseData: {
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
  deleteCarIsLoading: false,

  carMakeList: [],
  carModelList: [],
  carColorList: [],
  carStatusList: [],
  itemsPerPage: 5
};

const CarManagementSlice = createSlice({
  name: 'carmanagement',
  initialState,
  reducers: {    
    getAllCarsRequest: (state) => {
      state.getCarsIsLoading = true;
    },
    getAllCarsRequestResponse: (state, action: PayloadAction<CarManagementResponse['getCarsResponseData']>,) => {
      state.getCarsResponseData = initialState.getCarsResponseData;
      state.getCarsResponseData = action.payload;
    },

    //add Car
    addCarRequest: (state, action) => {
        state.isLoading = true;
    },
    addCarRequestResponse: (
        state,
        action: PayloadAction<CarManagementResponse['responseData']>
    ) => {
        state.responseData = initialState.responseData,
        state.responseData = action.payload; 
    },

    updateCarRequest: (state, action) => {
      state.isLoading = true;
  },
  updateCarRequestResponse: (
      state,
      action: PayloadAction<CarManagementResponse['responseData']>
  ) => {
      state.responseData = initialState.responseData,
      state.responseData = action.payload; 
  },

    //View Car
    viewCarRequest:(state, action) => {
      state.viewCarIsLoading = true;
    },
    viewCarRequestResponse: (
        state,
        action: PayloadAction<CarManagementResponse['viewCarResponseData']>
      ) => {
        state.viewCarResponseData = action.payload;
      },

    //delete car
    deleteCarRequest:(state, action) => {
      state.deleteCarIsLoading = true;
    },
  deleteCarRequestResponse: (
      state,
      action: PayloadAction<CarManagementResponse['deleteCarResponseData']>
    ) => {
      state.deleteCarResponseData = action.payload;
    },

    //Car Make
    getCarMakeDetails: () => {},
    setCarMake: (
      state,
      action: PayloadAction<CarManagementResponse['carMakeList']>,
    ) => {
      state.carMakeList = action.payload;
    },

    //Car Model
    getCarModelDetails: () => {},
    setCarModel: (
      state,
      action: PayloadAction<CarManagementResponse['carModelList']>,
    ) => {
      state.carModelList = action.payload;
    },

    //CarModel By Make
    getCarModelByMakeIdDetails: (state, action) => {},
    setCarModelByMakeId: (
      state,
      action: PayloadAction<CarManagementResponse['carModelList']>,
    ) => {
      state.carModelList = action.payload;
    },

    //Car Color
    getCarColorDetails: () => {},
    setCarColor: (
      state,
      action: PayloadAction<CarManagementResponse['carColorList']>,
    ) => {
      state.carColorList = action.payload;
    },

    //car status
    getCarStatusDetails: () => {},
    setCarStatus: (
      state,
      action: PayloadAction<CarManagementResponse['carStatusList']>,
    ) => {
      state.carStatusList = action.payload;
    },

    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },

    reset: (state) => {
      state.isLoading = false;
      state.responseData = initialState.responseData;

      state.viewCarIsLoading = false;
      state.viewCarResponseData = initialState.viewCarResponseData;

      state.getCarsIsLoading = false;
      state.getCarsResponseData= initialState.getCarsResponseData;

      state.carModelList = [];
      state.carMakeList = [];
      state.carColorList = [];
    },

    resetCarModelList: (state) => {
      state.carModelList = [];
    }

  },
});

export const {
  getAllCarsRequest,
  getAllCarsRequestResponse,

  //add car
  addCarRequest,
  addCarRequestResponse,

  //update Car
  updateCarRequest,
  updateCarRequestResponse,

  //view car
  viewCarRequest,
  viewCarRequestResponse,

  //delete car
  deleteCarRequest,
  deleteCarRequestResponse,

  //CarMake
  setCarMake,
  getCarMakeDetails,

  //carModel
  setCarModel,
  getCarModelDetails,

  //carModelbyMakeId
  setCarModelByMakeId,
  getCarModelByMakeIdDetails,

  //carColor
  setCarColor,
  getCarColorDetails,

  //car Status
  setCarStatus,
  getCarStatusDetails,

  reset,
  setItemsPerPage,
  resetCarModelList
  
} = CarManagementSlice.actions;

export default CarManagementSlice.reducer;
