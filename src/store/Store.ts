import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../pages/login/loginState/LoginSlice';
import headerReducer from '../components/header/headerstate/HeaderSlice';
import sidebarReducer from '../components/sidebar/sidebarState/SidebarSlice';
import forgotPasswordReducer from '../pages/forgotPassword/forgotPasswordState/ForgotPasswordSlice';
import otpVerifyReducer from '../pages/otpVerification/otpState/OtpVerifySlice';
import resetPasswordReducer from '../pages/resetPassword/resetPasswordState/ResetPasswordSlice';
import commonReducer from '../pages/commonStates/CommonSlice';
import userManagementReducer from '../pages/userManagement/userManagementPage/userManagementState/UserManagementSlice';
import carManagementReducer from '../pages/userManagement/carManagementPage/carManagementState/CarManagementSlice';
import userTypeManagementReducer from '../pages/userManagement/userTypeManagementPage/userTypeManagementPageState/UserTypeManagementSlice';
import customerManagementReducer from '../pages/userManagement/customerManagementPage/customerManagementPageState/CustomerManagementSlice';
import bookingManagementReducer from '../pages/bookingManagement/bookingsManagementPageState/BookingsManagementSlice';
import createSagaMiddleware from 'redux-saga';
import Saga from '../middleWare/Saga';
const sagaMiddleware = createSagaMiddleware();
export const Store = configureStore({
  reducer: {
    loginReducer,
    headerReducer,
    sidebarReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
    otpVerifyReducer,
    commonReducer,
    userManagementReducer,
    carManagementReducer,
    userTypeManagementReducer,
    customerManagementReducer,
    bookingManagementReducer
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(Saga);
export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;