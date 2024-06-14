import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/Hooks';
import {
  addNewUserRequest,
  onViewadminUserRequest,
  reset,
  updateExistingUserRequest,
} from '../userManagementState/UserManagementSlice';
import { ManageUser } from './ManageUser';
import { useNavigate } from 'react-router';
import _ from 'lodash';
import {
  getAllUserTypes,
  getStatusDetails,
  onLoadingStop,
} from '../../../commonStates/CommonSlice';
import { NotFound } from '../../../notFound/NotFound';
import { AccessTypes, responseStatus, routeNames } from '../../../../utils/constants/ConstantStrings';
import { uploadImage } from '../../../../utils';
import { Loader } from '../../../../components';
export const ManageUserContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { responseData, isLoading, viewUserIsLoading, viewUserResponseData } =
    useAppSelector((state) => state.userManagementReducer);
  const { statusList, userTypesList } = useAppSelector(
    (state) => state.commonReducer
  );
  const [userInfo, setUserInfo] = useState(
    location.state && location.state.userInfo
  );

  const [isCreate, setIsCreate] = useState(
    location.state && location.state.action === 'create' ? true : false
  );

  const [isEditable, setIsEditable] = useState(
    location.state &&
      location.state.userInfo &&
      location.state.action === 'edit'
      ? true
      : false
  );

  const [isDisable, setIsDisable] = useState(
    location.state &&
      location.state.userInfo &&
      location.state.action === 'view'
      ? true
      : false
  );

  const [statusDropdownData, setStatusDropdownData] = useState<
    { label: string; value: string }[]
  >([]);
  const [userTypesDropdownData, setUserTypesDropdownData] = useState<
    { label: string; value: string }[]
  >([]);

  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    photoURL: '',
    uId: '',
    userStatusId: '',
    userTypeId: '',
    password: '',
  });
  const [userDetailsCollapse, setUserDetailsCollapse] = useState(true);
  const [passwordType, setPasswordType] = useState('password');

  const { routes } = useAppSelector((state) => state.sidebarReducer);
  const [access, setAccess] = useState('');

  useEffect(() => {
    if (access === '' && routes) {
      const SubRoutes = routes ? _.get(routes, routeNames.userManagement) : 0;
      if (SubRoutes) {
        const getAccess = _.filter(
          SubRoutes,
          (obj: {
            accessId: string;
            featureAccess: string;
            isParent: boolean;
            label: string;
            parentFeature: string;
            value: string;
          }) => obj.label === routeNames.users
        );
        if (getAccess.length > 0) {
          setAccess(getAccess ? getAccess[0].featureAccess : '');
        }
      }
    }
  }, [access, routes]);

  const [photoURL, setPhotoURL] = useState('');

  const onDrop = async (file: File) => {
    const webUrl = await uploadImage(file);
    if (webUrl !== false) {
      setPhotoURL(webUrl[0]);
    }
  };

  const handlePasswordTypeChange = () => {
    if (passwordType == '') setPasswordType('password');
    else setPasswordType('');
  };

  const backButtonHandler = () => {
    history.back();
  };

  const saveUpdateButtonHandler = (values: {
    uId: string;
    firstname: string;
    lastname: string;
    email: string;
    cellPhoneNumber: string;
    password: string;
    userStatusId: string;
    userTypeId: string;
  }) => {
    if (isEditable) {   
      const params = JSON.stringify({
        uId: values.uId,
        email: values.email,
        firstName: values.firstname,
        lastName: values.lastname,
        phoneNumber: values.cellPhoneNumber,
        password: values.password,
        userStatusId: values.userStatusId,
        userTypeId: values.userTypeId,
        photoURL: photoURL,
      });
      const formatJson = params.replace(/'/g, '\'\'');
      dispatch(updateExistingUserRequest(formatJson));
    } else {
      const params = JSON.stringify({
        email: values.email,
        firstName: values.firstname,
        lastName: values.lastname,
        phoneNumber: values.cellPhoneNumber,
        password: values.password,
        userStatusId: values.userStatusId,
        userTypeId: values.userTypeId,
        photoURL: photoURL,
      });
      const formatJson = params.replace(/'/g, '\'\'');
      dispatch(addNewUserRequest(formatJson));
    }
  };

  const handleUserDetailsCollapse = () => {
    setUserDetailsCollapse(!userDetailsCollapse);
  };

  useEffect(() => {
    if (isLoading) {
      if (responseData.status === responseStatus.success) {
        dispatch(reset());
        navigate('/users');
        dispatch(onLoadingStop());
      } else if (responseData.status === responseStatus.fail) {
        dispatch(onLoadingStop());
      }
    }
  }, [isLoading, responseData]);

  useEffect(() => {
    if (statusList.length === 0) {
      dispatch(getStatusDetails());
    } else {
      setStatusDropdownData(statusList);
    }
  }, [statusList]);

  useEffect(() => {
    if (userTypesList.length === 0) {
      dispatch(getAllUserTypes());
    } else {
      setUserTypesDropdownData(userTypesList);
    }
  }, [userTypesList]);

  useEffect(() => {
    if (userData.uId === '' && userInfo !== '' && (isEditable || isDisable)) {
      const params = {
        userType: _.get(userInfo, 'User Type').replace(/'/g, '\'\''),
        uId: _.get(userInfo, 'User Id').replace(/'/g, '\'\''),
      };
      dispatch(onViewadminUserRequest(params));
    }
  }, [userData]);

  useEffect(() => {
    if (viewUserIsLoading) {
      if (viewUserResponseData && viewUserResponseData.status === responseStatus.success) {
        setUserData(viewUserResponseData.details[0]);
        setPhotoURL(viewUserResponseData.details[0].photoURL);
      }
    }
  }, [viewUserIsLoading, viewUserResponseData]);

  const handleReset = () => {
    isEditable
      ? setPhotoURL(viewUserResponseData.details[0].photoURL)
      : setPhotoURL('');
  };

  if (access !== '') {
    if (
      access === AccessTypes.fullAccess ||
      access === AccessTypes.readOnlyAccess
    ) {
      return (
        <ManageUser
          backButtonHandler={backButtonHandler}
          userData={userData}
          statusDropDownData={statusDropdownData}
          userTypesDropDownData={userTypesDropdownData}
          isDisable={isDisable}
          isEditable={isEditable}
          isCreate={isCreate}
          userDetailsCollapse={userDetailsCollapse}
          handleUserDetailsCollapse={handleUserDetailsCollapse}
          passwordType={passwordType}
          handlePasswordTypeChange={handlePasswordTypeChange}
          saveOrUpdateButtonHandler={saveUpdateButtonHandler}
          onDrop={onDrop}
          photoURL={photoURL}
          handleReset={handleReset}
        />
      );
    } else {
      return <NotFound />;
    }
  } else {
    return <Loader />;
  }
};
