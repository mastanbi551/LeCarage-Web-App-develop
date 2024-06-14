import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/Hooks';
import { addCarRequest, getCarColorDetails, getCarMakeDetails, getCarModelByMakeIdDetails, getCarModelDetails, getCarStatusDetails, reset, resetCarModelList, setCarStatus, updateCarRequest, viewCarRequest, viewCarRequestResponse } from '../carManagementState/CarManagementSlice';
import { CarInfoProps, ManageCars } from './ManageCars';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { NotFound } from '../../../notFound/NotFound';
import { AccessTypes, responseStatus, routeNames } from '../../../../utils/constants/ConstantStrings';
import { uploadImage } from '../../../../utils';
import { stat } from 'fs';
import { getWarehouseDetails } from '../../../commonStates/CommonSlice';
import { Loader } from '../../../../components';

export const ManageCarsContainer = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        }) => obj.label === routeNames.cars);
        if(getAccess.length > 0){
          setAccess(getAccess ? getAccess[0].featureAccess : '');
        }
      }
      
    }
  }, [access, routes]);

  const [photoURL, setPhotoURL] = useState('');

  const onDrop = async (file: File) => {
    const webUrl = await uploadImage(file);
    if(webUrl !== false){
      setPhotoURL(webUrl[0]);
    }

  };

  const [carInfo, setCarInfo] = useState(location.state && location.state.carInfo);
  const [isCreate, setIsCreate] = useState(
    location.state &&
      location.state.action === 'create'
      ? true
      : false
  );
  const [isDisable, setIsDisable] = useState(location.state && location.state.carInfo && (location.state.action === 'view') ? true : false);
  const [isEditable, setIsEditable] = useState(location.state && location.state.carInfo && location.state.action === 'edit' ? true : false);


  const [carData, setCarData] = useState({
    carId: '',
    carMakeId: '',
    carModelId: '',
    carColorId: '',
    fkiCarStatusId: '',
    licensePlateNumber: '',
    location: '',
    additionalNotes: '',
    photoURL: '',
    stalling: ''
  });

  const {
    isLoading,
    responseData,
    carMakeList,
    carModelList,
    carColorList,
    carStatusList,

    viewCarIsLoading,
    viewCarResponseData,

    deleteCarIsLoading,
    deleteCarResponseData

  } = useAppSelector((state) => state.carManagementReducer);

  const {WarehousesList} = useAppSelector((state) => state.commonReducer);

  const [carMakeInfo, setCarMakeInfo] = useState<{ label: string; value: string }[]>([]);
  const [carModelInfo, setCarModelInfo] = useState<{ label: string; value: string }[]>([]);
  const [carColorInfo, setCarColorInfo] = useState<{ label: string; value: string }[]>([]);
  const [carstatusDropdownData, setCarStatusDropdownData] = useState<{ label: string; value: string }[]>([]);
  const [warehouseLocationsInfo, setWarehouseLocationInfo] = useState<{ label: string; value: string }[]>([]);

  
  useEffect(() => {
    if (isLoading) {
      if (responseData.status === responseStatus.success) {
        dispatch(reset());
        navigate('/cars');      
      } else if (responseData.status === responseStatus.fail) {
        toast.error(responseData.errDescription, {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        });
      }
    }
  }, [isLoading, responseData]);

  useEffect(() => {
    if (carData.carId === '' && carInfo !== '' && (isEditable || isDisable)) {
      dispatch(reset());
      const params = { carId: _.get(carInfo, 'carId') };
      dispatch(viewCarRequest(params));
      setCarInfo('');
    }
  }, [carData, carInfo]);

  useEffect(() => {
    if (viewCarIsLoading) {
      if (viewCarResponseData.status === responseStatus.success) {
        setCarData(viewCarResponseData.details[0]);
        setPhotoURL(viewCarResponseData.details[0].photoURL);
        onCarMakeSelectChange(viewCarResponseData.details[0].carMakeId);
      }
    }
    if (deleteCarIsLoading) {
      if (deleteCarResponseData.status === responseStatus.success) {
        navigate('/cars');
      }
    }
  }, [viewCarIsLoading,
    viewCarResponseData,
    deleteCarIsLoading,
    deleteCarResponseData
  ]);

  const backButtonHandler = () => {
    history.back();
  };

  const saveUpdateButtonHandler = (values: {
    carId: string;
    carMakeId: string;
    carModelId: string;
    carColorId: string;
    carStatusId: string;
    licensePlateNumber: string;
    locationId: string;
    additionalNotes: string;
    photoURL: string;
    stalling: string;
    carMakeName: string | undefined;
    carModelName: string | undefined;
    carColorName: string | undefined;
  }) => {
    if (isEditable) {
      const params = {
        carId: values.carId,
        carDetails:
        { 
            carMakeId: values.carMakeId,
            carModelId: values.carModelId,
            carColorId: values.carColorId,
            carStatusId: values.carStatusId ? parseInt(values.carStatusId) : 0,
            licensePlateNumber: values.licensePlateNumber.toUpperCase(),
            photoURL: values.photoURL,
            additionalNotes: values.additionalNotes ,
            locationId: values.locationId ? parseInt(values.locationId) : 0,
            carMakeName: values.carMakeName,
            carModelName: values.carModelName,
            carColorName: values.carColorName,
            stalling: values.stalling
        }
     };
     const formatJson = JSON.stringify(params).replace(/'/g, '\'\'');
      dispatch(updateCarRequest(formatJson));
    }
    else {
      const params = {
        carDetails:
        { 
            carMakeId: values.carMakeId ,
            carModelId: values.carModelId,
            carColorId: values.carColorId,
            carStatusId: values.carStatusId ? parseInt(values.carStatusId) : 0,
            licensePlateNumber: values.licensePlateNumber.toUpperCase(),
            photoURL: values.photoURL,
            additionalNotes: values.additionalNotes ,
            locationId: values.locationId ? parseInt(values.locationId) : 0,
            carMakeName: values.carMakeName,
            carModelName: values.carModelName,
            carColorName: values.carColorName,
            stalling: values.stalling,
        }
     };
     const formatJson = JSON.stringify(params).replace(/'/g, '\'\'');
      dispatch(addCarRequest(formatJson));
    }

  };
  

  useEffect(() => {
    if (carMakeList.length === 0) {
      dispatch(getCarMakeDetails());
      setCarModelInfo([]);   
    }
    if (carMakeList.length > 0) {
      setCarMakeInfo(carMakeList);
      //setCarModelInfo([]);
    }

    if(carModelInfo.length === 0 && carModelList.length > 0){
      setCarModelInfo(carModelList);
    }

    if (carColorList.length === 0) {
      dispatch(getCarColorDetails());
    }
    if (carColorList.length > 0) {
      setCarColorInfo(carColorList);
    }

    if (WarehousesList.length === 0) {
      dispatch(getWarehouseDetails());
    }
    if (WarehousesList.length > 0) {
      setWarehouseLocationInfo(WarehousesList);
    }

    if (carStatusList.length === 0) {
      dispatch(getCarStatusDetails());
    }
    if (carStatusList.length > 0) {
      setCarStatusDropdownData(carStatusList);
    }

  }, [
    carMakeList,
    carModelList,
    carColorList,
    WarehousesList,
    carStatusList,
    isLoading,
    responseData
  ]);

  const onCarMakeSelectChange = (carMakeId: string) => {
    dispatch(resetCarModelList());

    setCarModelInfo([]);
    const params = { makeId: carMakeId };
    dispatch(getCarModelByMakeIdDetails(params));
  };

  const onCarMakeTextChange = () => {
    setCarModelInfo([]);
  };
  const handleReset = () => {
    isEditable
      ? setPhotoURL(viewCarResponseData.details[0].photoURL)
      : setPhotoURL('');
  };
  
  if (access !== '') {
  if(access === AccessTypes.fullAccess || access === AccessTypes.readOnlyAccess){
  return (
    <ManageCars
      statusDropDownData={carstatusDropdownData}
      backButtonHandler={backButtonHandler}
      saveUpdateButtonHandler={saveUpdateButtonHandler}
      carInfo={carData}
      isDisable={isDisable}
      isEditable={isEditable}
      isCreate={isCreate}
      carMakeInfo={carMakeInfo}
      carModelInfo={carModelInfo}
      carColorInfo={carColorInfo}
      warehouseLocationsInfo={warehouseLocationsInfo}

      onCarMakeSelectChange={onCarMakeSelectChange}
      onCarMakeTextChange={onCarMakeTextChange}

      onDrop={onDrop}
      photoURL={photoURL}
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