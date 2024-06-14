import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ManageUserTypes } from './ManageUserTypes';
import _, { merge } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../../hooks/Hooks';

import {
  createUserTypeRequest,
  updateUserTypeRequest,
  getFeatureAccessList,
  getFeatures,
  viewUserTypeRequest,
  reset,
} from '../userTypeManagementPageState/UserTypeManagementSlice';

import { toast } from 'react-toastify';
import { AccessTypes, responseStatus, routeNames } from '../../../../utils/constants/ConstantStrings';
import { NotFound } from '../../../notFound/NotFound';
import { getStatusDetails } from '../../../commonStates/CommonSlice';
import { Loader } from '../../../../components';

export interface FeatureListProps {
  label: string;
  value: string;
  parentFeature: string;
  parentFeatureId: string;
}
export const ManageUserTypesContainer = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(
    location.state ? location.state.userInfo : ''
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
      (location.state.action === 'view')
      ? true
      : false
  );

  const [featuresInfo, setFeaturesInfo] = useState<
    { label: string; value: string }[]
  >([]);
  const [accessInfo, setAccessInfo] = useState<
    { label: string; value: string }[]
  >([]);
  const [statusDropdownData, setStatusDropdownData] = useState<
    { label: string; value: string }[]
  >([]);

  const [selectedFeatureAccessList, setSelectedFeatureAccessList] = useState<
    { featureId: string; accessId: string }[]
  >([]);

  const {
    featureList,
    featureAccessList,
  
    isLoading,
    responseData,

    viewUserTypeIsLoading,
    viewUserTyperesponseData,

    deleteUserTypeIsLoading,
    deleteUsertypeResponseData,
  } = useAppSelector((state) => state.userTypeManagementReducer);
  
  const {statusList} = useAppSelector(state => state.commonReducer);
  const [userTypeData, setuserTypeData] = useState({
    userTypeId: '',
    userType: '',
    description: '',
    statusId: '',
    features: [{ featureId: '', accessId: ''}],
  });

  const {routes} = useAppSelector(state => state.sidebarReducer);
  const [ access, setAccess] = useState('');
  
  useEffect(() => {
    if(access === '' && routes){
      const SubRoutes = routes ? _.get(routes, routeNames.userManagement) : 0;
      if(SubRoutes){
        const getAccess = _.filter(SubRoutes, (obj: {
          accessId: string;
          featureAccess: string;
          isParent: boolean;
          label: string;
          parentFeature: string;
          value: string;
        }) => obj.label === routeNames.usertypes);
        if(getAccess.length > 0){
          setAccess(getAccess ? getAccess[0].featureAccess : '');
        }
      }
      
    }
  }, [access, routes]);

  useEffect(() => {
    if (
      userTypeData.userTypeId === '' &&
      userInfo !== '' &&
      (isEditable || isDisable)
    ) {
      dispatch(reset());
      const params = { userTypeId: _.get(userInfo, 'User Type ID') };
      dispatch(viewUserTypeRequest(params));
      setUserInfo('');
    }
  }, [userTypeData, userInfo]);

  useEffect(() => {
    if (viewUserTypeIsLoading) {
      if (viewUserTyperesponseData.status === responseStatus.success) {
        setuserTypeData(viewUserTyperesponseData.details[0]);
        setSelectedFeatureAccessList(viewUserTyperesponseData.details[0]?.features);
      }
    }
    if (deleteUserTypeIsLoading) {
      if (deleteUsertypeResponseData.status === responseStatus.success) {
        navigate('/usertypes');
      }
    }
  }, [
    viewUserTypeIsLoading,
    viewUserTyperesponseData,
    deleteUserTypeIsLoading,
    deleteUsertypeResponseData,
  ]);

  useEffect(() => {
    if (isLoading) {
      if (responseData.status === responseStatus.success) {
        dispatch(reset());
        navigate('/usertypes');
      } else if (responseData.status === responseStatus.fail) {
        toast.error(responseData.errDescription, {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        });
      }
    }
  }, [isLoading, responseData]);

  useEffect(() => {
    if(featureList.length === 0){
      dispatch(getFeatures());
    }
    else {
      setFeaturesInfo(featureList);
    }
  }, [featureList]);

  useEffect(() => {
    if(featureAccessList.length === 0){
      dispatch(getFeatureAccessList());
    }
    else {
      setAccessInfo(featureAccessList);
    }
  }, [featureAccessList]);

  useEffect(() => {   
    if (statusList.length === 0) {
      dispatch(getStatusDetails());
    }
    else {
      setStatusDropdownData(statusList);
    }
  }, [statusList]);
  
  function handleFeatureUpdate(
    featureId: string,
    accessId: string,
    feature: {
      value: string,
      label: string
    },
    access: {
      value: string,
      label: string
    }
  ) {
    const length = _.filter(
      userTypeData.features,
      (obj: {featureId: string, accessId: string}) => obj.featureId === feature.value
    ).length;

    if (length > 0) {
      const updatedObject = {
        ...userTypeData,
        features: userTypeData.features.map((feature: {featureId: string, accessId: string}) => {
          if (feature.featureId === featureId) {
            return {
              ...feature,
              accessId: accessId,
            };
          } else {
            return feature;
          }
        }),
      };
      setuserTypeData(updatedObject); 
    } else {
      _.remove(
        userTypeData.features,
        (obj: {featureId: string, accessId: string}) => obj.featureId === '' || obj.featureId === feature.value
      );
      const newFeature = { featureId: feature.value, accessId: access.value };

      setuserTypeData(prevState => ({
        ...prevState,
        features: [...prevState.features, newFeature]
      }));
    }
  }

  const handleRadioButtonClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    featureValue: string,
    feature:  {
      value: string,
      label: string
    },
    access: {
      value: string,
      label: string
    }
  ) => {
    if (e.target.checked) {
      if (isEditable) {
        handleFeatureUpdate(
          featureValue,
          e.target.value,
          feature,
          access
        );
      } else {
        _.remove(
          selectedFeatureAccessList,
          (obj: {featureId: string, accessId: string}) => obj.featureId === '' || obj.featureId === featureValue
        );
        const newObject = {
          featureId: featureValue,
          accessId: access.value,
        };
        selectedFeatureAccessList.push(newObject);
        setSelectedFeatureAccessList(selectedFeatureAccessList);
      }
      // setCheckedList(values.features);
    } else {
      _.remove(selectedFeatureAccessList, (obj: {featureId: string, accessId: string}) => obj.featureId === featureValue);
    }
  };

  const backButtonHandler = () => {
    history.back();
  };

  const saveOrUpdateButtonHandler = (values: {
    userTypeId?: string | undefined;
    userType: string;
    description: string;
    statusId: string;
    features: {
      featureId: string;
      accessId: string;
    }[];
  }) => {
    if (isEditable) {
      const params = JSON.stringify(merge({}, values, { features: userTypeData.features }));
      const formatJson = params.replace(/'/g, '\'\'');
      dispatch(updateUserTypeRequest(formatJson));
    } else {
      // /_.filter(data, (obj) => obj.parentFeature !== "Dashboard");
      const distinctParentFeaturesNew =  _.filter(_.uniqBy(featureList, 'parentFeatureId'), (obj: FeatureListProps) => obj.parentFeature !== 'Dashboard');
      const distinctParentFeatures = distinctParentFeaturesNew.map((item: FeatureListProps) => {
          return {
            featureId: item.parentFeatureId,
            accessId: '1'
          };       
      });
      const updatedObject = merge({}, values, { features: _.unionBy(selectedFeatureAccessList, distinctParentFeatures) });
      const params = JSON.stringify(_.omit(updatedObject, 'userTypeId'));
      const formatJson = params.replace(/'/g, '\'\'');
      dispatch(createUserTypeRequest(formatJson));
    }
  };


  const handleReset= () => {  
    isCreate &&  
      setSelectedFeatureAccessList([]);
    isEditable &&
      setSelectedFeatureAccessList(viewUserTyperesponseData?.details[0]?.features);
  };

  if (access !== '') {
  if(access === AccessTypes.fullAccess || access === AccessTypes.readOnlyAccess){
    return (
      <ManageUserTypes
        backButtonHandler={backButtonHandler}
        userTypeData={userTypeData}
        statusDropDownData={statusDropdownData}
        isDisable={isDisable}
        featuresList={featuresInfo}
        featureAccessList={accessInfo}
        isEditable={isEditable}
        isCreate={isCreate}
        handleRadioButtonClick={handleRadioButtonClick}
        saveOrUpdateButtonHandler={saveOrUpdateButtonHandler}
  
        selectedFeatureAccessList={selectedFeatureAccessList}
        handleReset={handleReset}
      />
    );
  }
  else {
    return (
      <NotFound />
    );
  }
} else {
  return <Loader />;
}
};
