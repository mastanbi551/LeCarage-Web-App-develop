import React, { useEffect, useState } from 'react';
import './Header.scss';
import { LeCarageLogo } from '../leCarageLogo/LeCarageLogo';
import { ImagesPath } from '../../utils/constants';
import { BsBell } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { SlEqualizer } from 'react-icons/sl';
import { AiOutlineUser } from 'react-icons/ai';
import { ModalDropDown } from '../modalDropDown/ModalDropDown';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import { onLoggedOut, reset } from '../../pages/login/loginState/LoginSlice';
import {
  userRoleType,
  adminUserProfile,
  defaultUserType,
  headerReset,
  defaultDetailsData,
} from './headerstate/HeaderSlice';
import { onApiCall } from '../../components/header/headerstate/HeaderSlice';
import { Details } from './headerstate/HeaderStateInterface';
import { responseStatus } from '../../utils/constants/ConstantStrings';
interface IProps {
  setAuth: (user: boolean) => void;
}

export const Header: React.FC<IProps> = ({ setAuth }) => {
  const dispatch = useAppDispatch();
  const isAuthenticate = localStorage.getItem('isAuthenticate');
  const userId = localStorage.getItem('userId');
  const parseJSON = isAuthenticate && JSON.parse(isAuthenticate);
  const uID = userId && JSON.parse(userId);
  const {
    userRoleList,
    responseData,
    isLoading,
    defaultDetails,
  } = useAppSelector((state) => state.headerReducer);
  const [showLocationRole, setShowLocationRole] = useState(false);

  const profileInfo = userRoleList;
  const apiparams = {
    uId: uID,
  };

  const [userProfile, setUserProfile] = useState('');
  const [warehouses, setWarehouses] = useState<string[]>([]);
 
  useEffect(() => {
    if (defaultDetails && defaultDetails.userTypeLabel !== '') {
      setUserProfile(
        `${defaultDetails.userTypeLabel} => ${defaultDetails.warehouseLabel}`
      );
    }
  }, [defaultDetails]);

  useEffect(() => {
    if (isLoading) {
      if (responseData.status === responseStatus.success) {
        if(responseData.details.length > 0){
          const DefaultResponseData = responseData.details.filter(
            (item: Details) => item.isDefault === true
          );
          dispatch(userRoleType(responseData.details[0].userTypeValue));
          dispatch(adminUserProfile(responseData.details));
          dispatch(defaultDetailsData(DefaultResponseData[0]));
          dispatch(
            defaultUserType(
              responseData.details.filter((item:Details) => item.isDefault === true)
            )
          );
          setWarehouses(
            responseData.details
              .map((item: Details) => item.warehouseLabel)
              .filter(
                (value: string, index: number, self: any) =>
                  self.indexOf(value) === index
              )
          );
        }
       
      }
    }
  }, [isLoading, responseData]);

  useEffect(() => {
    if (userRoleList.length === 0 ) {
      dispatch(onApiCall(apiparams));
    }
  }, [userRoleList]);

  const navigate = useNavigate();

  const handleUserProfile = (value: Details) => {
    setUserProfile(`${value.userTypeLabel} -> ${value.warehouseLabel}`);
    dispatch(defaultDetailsData(value));

    navigate('/');
  };

  const logOutOnClick = () => {
    if (!parseJSON.isRemember) {
      localStorage.removeItem('isAuthenticate');
    } else {
      const newJson = { ...parseJSON, isAuthenticate: false };
      localStorage.setItem('isAuthenticate', JSON.stringify(newJson));
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth(false);
    dispatch(headerReset());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div className='fixed'>
      <Navbar className='main-nav' color='light' light expand='md'>
        <NavbarBrand href='/'>
          <LeCarageLogo
            source={ImagesPath.lecaragelogo}
            altText='logo'
            name='main-nav__logo'
          ></LeCarageLogo>
        </NavbarBrand>
        {/* <span className='main-nav__notofication-icon d-md-none'><BsBell /></span> */}
        <Nav className='ml-auto d-block' navbar>
          <NavItem style={{cursor:'pointer'}}>
            <NavLink data-testid='bsbell'>
              <BsBell />
            </NavLink>
          </NavItem>
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle tag='a' className='nav-link' style={{cursor:'pointer'}}>
              My Profile
              <IoIosArrowDown className='nav-arrow-icon' />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag='span' className='user-icon'>
                <AiOutlineUser />
                {parseJSON && parseJSON.email}
              </DropdownItem>
              <DropdownItem
                data-testid='dropdown-toggle'
                onClick={() => {
                  setShowLocationRole(!showLocationRole);
                }}
              >
                <div className='col-md-12 row'>
                  <div className='col-md-1'>
                    <SlEqualizer />
                  </div>{' '}
                  <div className='col-md-10 new'>{userProfile}</div>
                </div>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  logOutOnClick();
                  dispatch(onLoggedOut());

                  //localStorage.removeItem('isAuthenticate');
                  // setAuth(false);
                  // navigate('/');
                }}
              >
                <FiLogOut /> LogOut
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
      {showLocationRole && (
        <ModalDropDown
          showModal={showLocationRole}
          onModalToggle={() => {
            setShowLocationRole(!showLocationRole);
          }}
          warehousesInfo={warehouses}
          profileInfo={profileInfo}
          handleUserProfile={handleUserProfile}
        />
      )}
    </div>
  );
};
