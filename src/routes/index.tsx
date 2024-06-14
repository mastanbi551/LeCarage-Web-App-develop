import React, {
  Suspense,
  useEffect,
  useState,
} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import {
  Home,
  LoginContainer,
  ForgotPasswordContainer,
  Dashboard,
  NotFound,
  ResetPasswordContainer,
  ManageUserTypesContainer,
  ManageUserContainer,
  BookingsManagementPageContainer,
} from '../pages';

const SideBar = React.lazy(() => import('../components/index'));

import { ManageBookingsContainer } from '../pages/bookingManagement/manageBookings/ManageBookingsContainer';
import { OtpVerificationContainer } from '../pages/otpVerification/OtpVerificationContainer';
import { ManageCustomerContainer } from '../pages/userManagement/customerManagementPage/manageCustomers/ManageCustomerContainer';
import { ManageCarsContainer } from '../pages/userManagement/carManagementPage/manageCars/ManageCarsContainer';
import { Loader } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks/Hooks';
import { BookingsContainer } from '../pages/bookingManagement/bookings/BookingsContainer';
import { reset } from '../pages/login/loginState/LoginSlice';
import { responseStatus } from '../utils/constants/ConstantStrings';
import { Services } from '../pages/services/Services';
const CarManagementPageContainer = React.lazy(
  () =>
    import(
      '../pages/userManagement/carManagementPage/CarManagementPageContainer'
    )
);
const UserTypeManagementPageContainer = React.lazy(
  () =>
    import(
      '../pages/userManagement/userTypeManagementPage/UserTypeManagementPageContainer'
    )
);
const CustomerManagementPageContainer = React.lazy(
  () =>
    import(
      '../pages/userManagement/customerManagementPage/CustomerManagementPageContainer'
    )
);
const UserManagementPageContainer = React.lazy(
  () =>
    import(
      '../pages/userManagement/userManagementPage/UserManagementPageContainer'
    )
);

interface IProps {
  setAuth: (value: boolean) => void;
  isAuthenticated: boolean;
}

export const Index: React.FC<IProps> = ({ setAuth, isAuthenticated }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [queryString, setQueryString] = useState(location.pathname);

  const { isAuth, isLoading, responseData, isTokenExpired } = useAppSelector(
    (state) => state.loginReducer
  );

  useEffect(() => {
    if (isLoading) {
      if (responseData.status === responseStatus.success) {
        if (isAuth === true) {
          setIsLoggedIn(true);
        }
      }
    }
    if (isTokenExpired === true && isAuth === false) {
      dispatch(reset());
      alert('session expired. Please Login again to continue');
      setAuth(false);
      setIsLoggedIn(false);
      window.location.href = '/';
    }
    if(isAuthenticated){
      setIsLoggedIn(true);
    }
  }, [isLoading, responseData, isAuth, isTokenExpired, isAuthenticated]);

  useEffect(() => {
    if (
      window.location.pathname == '/login' ||
      window.location.pathname == '/'
    ) {
      localStorage.removeItem('AuthorizedUser');
      setAuth(false);
    }
    window.addEventListener(
      'popstate',
      (event) => {
        if (event) {
          if (window.location.pathname == '/login') {
            localStorage.removeItem('AuthorizedUser');
            setAuth(false);
          }
        }
      },
      false
    );

    return;
  }, [queryString]);

  return (
    <>
      {isAuthenticated && isLoggedIn ? (
        <>
          <SideBar isAuthenticated={isAuthenticated} setAuth={setAuth}>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route index path='/' element={<Dashboard />}></Route>
                <Route
                  path='/usertypes'
                  element={<UserTypeManagementPageContainer />}
                ></Route>
                <Route
                  path='/users'
                  element={<UserManagementPageContainer />}
                ></Route>
                <Route
                  path='/customers'
                  element={<CustomerManagementPageContainer />}
                ></Route>
                <Route
                  path='/cars'
                  element={<CarManagementPageContainer />}
                ></Route>
                <Route
                  path='/CreateCar'
                  element={<ManageCarsContainer />}
                ></Route>
                <Route
                  path='/ViewCar'
                  element={<ManageCarsContainer />}
                ></Route>
                <Route
                  path='/EditCar'
                  element={<ManageCarsContainer />}
                ></Route>
                <Route
                  path='/CreateUserType'
                  element={<ManageUserTypesContainer />}
                ></Route>
                <Route
                  path='/EditUserType'
                  element={<ManageUserTypesContainer />}
                ></Route>
                <Route
                  path='/ViewUserType'
                  element={<ManageUserTypesContainer />}
                ></Route>
                <Route
                  path='/CreateUser'
                  element={<ManageUserContainer />}
                ></Route>
                <Route
                  path='/EditUser'
                  element={<ManageUserContainer />}
                ></Route>
                <Route
                  path='/ViewUser'
                  element={<ManageUserContainer />}
                ></Route>
                <Route
                  path='/CreateCustomer'
                  element={<ManageCustomerContainer />}
                ></Route>
                <Route
                  path='/EditCustomer'
                  element={<ManageCustomerContainer />}
                ></Route>
                <Route
                  path='/ViewCustomer'
                  element={<ManageCustomerContainer />}
                ></Route>
                <Route path='/Calender' element={<BookingsContainer />}></Route>
                <Route
                  path='/BookingsList'
                  element={<BookingsManagementPageContainer />}
                ></Route>
                <Route
                  path='/BookingsRequest'
                  element={<ManageBookingsContainer />}
                ></Route>
                <Route
                  path='/EditBooking'
                  element={<ManageBookingsContainer />}
                ></Route>
                <Route
                  path='/ViewBooking'
                  element={<ManageBookingsContainer />}
                ></Route>
                <Route
                  path='/Services'
                  element={<Services />}
                ></Route>
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Suspense>
          </SideBar>
        </>
      ) : (
        <>
          <Routes>
            <Route index path='/' element={<Home />}></Route>
            <Route
              path='/login'
              element={<LoginContainer setAuth={setAuth} />}
            ></Route>
            <Route
              path='/otpverification'
              element={<OtpVerificationContainer />}
            ></Route>
            <Route
              path='/forgotpassword'
              element={<ForgotPasswordContainer />}
            ></Route>
            <Route
              path='/resetpassword'
              element={<ResetPasswordContainer />}
            ></Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  );
};
