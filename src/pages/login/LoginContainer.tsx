import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from './Login';
import { loginCall, userid, userEmailId } from './loginState/LoginSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import _ from 'lodash';
import { headerReset } from '../../components/header/headerstate/HeaderSlice';
import { responseStatus } from '../../utils/constants/ConstantStrings';
interface IProps {
  setAuth: (user: boolean) => void;
}

export const LoginContainer: React.FC<IProps> = ({
  setAuth
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState<string>('password');
  const { isLoading, responseData } = useAppSelector(state => state.loginReducer);
  const [loadingEnable, setLoadingEnable] = useState<boolean>(false);
  const [loginData, setLoginData] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const isAuthenticate = localStorage.getItem('isAuthenticate');
  const userJsonData = isAuthenticate && JSON.parse(isAuthenticate);
 
  const userData = {
    email: userJsonData ? userJsonData.email : '',
    password: userJsonData ? userJsonData.password : '',
    isRemember: userJsonData ? userJsonData.isRemember: ''
  };

  useEffect(() => {    
    if (isLoading) {
      setShowLoader(false);
      if (responseData.status === responseStatus.success) {
        setAuth(true);
        localStorage.setItem('isAuthenticate', JSON.stringify(loginData));
        const uID = _.get(responseData.details[0].userDetails, 'uId');
        localStorage.setItem('userId',JSON.stringify(uID));
        dispatch(userid(uID));
        dispatch(headerReset());
        navigate('/');
      }
      else {
        setLoadingEnable(false);
      }    
    } 
  }, [responseData]);

  const handleLoader = () => {
    setLoadingEnable(!loadingEnable);
  };
  
  const handleInputChange = () => {
    if (passwordType == '') setPasswordType('password');
    else {
      setPasswordType('');
    }
  };

  const handleOnSubmit = (values: {email: string,password: string, isRemember: boolean}) => {
    setShowLoader(true);
    const params = JSON.stringify({
      email: values.email,
      password: values.password
    });

    const isRemeber = {
      email: values.email,
      password: values.password,
      isRemember: values.isRemember,
      isAuthenticate: true
    };
    //localStorage.setItem('isRemember', JSON.stringify(isRemeber));
    setLoginData(isRemeber);
    dispatch(userEmailId(values.email));
    dispatch(loginCall(params));
  };
  
  return (
    <Login
      passwordType={passwordType}
      handleOnSubmit={handleOnSubmit}
      handleInputChange={handleInputChange}
      userData={userData}
      showLoader={showLoader}
    />
  );
};

