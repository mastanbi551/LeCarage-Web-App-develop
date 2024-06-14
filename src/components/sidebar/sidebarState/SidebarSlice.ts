import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderResponse } from '../../header/headerstate/HeaderStateInterface';
import { SidebarResponse } from './SidebarStateInterface';

const initialState: SidebarResponse = {
  status: '',
  routes: [],
  errDescription: '',
  errDetails: '',
  isLoading: false,
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
  MenusList: [],
};

const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    onApiCall: (state, action) => {
      state.isLoading = true;
    },
    menusOnSuccess: (
      state,
      action: PayloadAction<SidebarResponse['responseData']>
    ) => {
      state.responseData = action.payload;
      //state.isLoading = false;
    },
    menusOnFailure: (
      state,
      action: PayloadAction<SidebarResponse['responseData']>
    ) => {
      state.responseData = action.payload;
      state.isLoading = false;
    },
    setRoutes: (state, action: PayloadAction<SidebarResponse['routes']>) => {
      state.routes = action.payload;
    },
    onLoadingStop: state => {
        state.isLoading = false;
    }
  },
});

export const { 
    setRoutes, 
    onApiCall,
    menusOnSuccess,
    menusOnFailure,
    onLoadingStop
 } = SidebarSlice.actions;
 
export default SidebarSlice.reducer;
