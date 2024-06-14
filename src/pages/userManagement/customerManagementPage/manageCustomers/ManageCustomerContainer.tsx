import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ManageCustomers } from './ManageCustomers';
import { useAppDispatch, useAppSelector } from '../../../../hooks/Hooks';

import _ from 'lodash';
import {
  reset,
  updateCustomerRequest,
  viewUnLinkedCarCustomerRequest,
} from '../customerManagementPageState/CustomerManagementSlice';
import { toast } from 'react-toastify';
import { getStatusDetails } from '../../../commonStates/CommonSlice';
import {
  createCustomerRequest,
  viewCustomerRequest,
} from '../customerManagementPageState/CustomerManagementSlice';
import { NotFound } from '../../../notFound/NotFound';
import { AccessTypes, responseStatus, routeNames } from '../../../../utils/constants/ConstantStrings';
import { uploadImage } from '../../../../utils';
import { Loader } from '../../../../components';

export interface CarIProps {
  carId: string;
  Color: string;
  Make: string;
  Model: string;
  'Number Plate': string;
  checked: boolean;
  additionalNotes: string;
}

export interface CustomerInfoProps {
  uId: string;
  profile: {
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    statusId: string;
    password: string;
  };
  address: {
    addressLineOne: string;
    streetName: string;
    houseNumber: string;
    postalCode: string;
    cityName: string;
  }[];
  cars: {
    carId: string;
  }[];
}

export const ManageCustomerContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalShow, setModalShow] = useState(false);

  //to check the access
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
          }) => obj.label === routeNames.customers
        );
        if (getAccess.length > 0) {
          setAccess(getAccess ? getAccess[0].featureAccess : '');
        }
      }
    }
  }, [access, routes]);
  //to check the access

  const { statusList } = useAppSelector((state) => state.commonReducer);

  const [customerInfo, setCustomerInfo] = useState(
    location.state ? location.state.customerInfo : ''
  );

  const [isCreate, setIsCreate] = useState(
    location.state && location.state.action === 'create' ? true : false
  );

  const [isDisable, setIsDisable] = useState(
    location.state &&
      location.state.customerInfo &&
      location.state.action === 'view'
      ? true
      : false
  );

  const [isEditable, setIsEditable] = useState(
    location.state &&
      location.state.customerInfo &&
      location.state.action === 'edit'
      ? true
      : false
  );

  const [statusDropdownData, setStatusDropdownData] = useState<
    { label: string; value: string }[]
  >([]);

  const {
    unlinkedCarIsLoading,
    linkedCarIsLoading,
    viewLinkedCustomerResponseData,
    viewUnLinkedCustomerResponseData,
    viewCustomerIsLoading,
    viewCustomerResponseData,
    isLoading,
    responseData,
    deleteCustomerIsLoading,
    deleteCustomerResponseData,
  } = useAppSelector((state) => state.customerManagementReducer);

  const [customerData, setCustomerData] = useState({
    uId: '',
    profile: {
      email: '',
      phoneNumber: '',
      password: '',
      firstName: '',
      lastName: '',
      statusId: '',
      photoURL: '',
    },
    address: [
      {
        addressLineOne: '',
        streetName: '',
        houseNumber: '',
        postalCode: '',
        cityName: '',
      },
    ],
    cars: [
      {
        carId: '',
        additionalNotes: '',
        Make: '',
        Color: '',
        Model: '',
        'Number Plate': '',
      },
    ],
  });
  const [passwordType, setPasswordType] = useState('password');
  const [unlinkedCars, setUnLinkedCars] = useState<CarIProps[]>([]);
  const [linkedCars, setLinkedCars] = useState<CarIProps[]>([]);

  const [photoURL, setPhotoURL] = useState('');

  const onDrop = async (file: File) => {
    const webUrl = await uploadImage(file);
    if (webUrl !== false) {
      setPhotoURL(webUrl[0]);
    }
  };

  const [tempCheckedCars, setTempCheckedCars] = useState<CarIProps[]>([]);

  const [tempEditCheckedCars, setTempEditCheckedCars] = useState<CarIProps[]>(
    []
  );

  const [checkedCars, setCheckedCars] = useState<CarIProps[]>([]);
  const [editCheckedCars, setEditCheckedCars] = useState<CarIProps[]>([]);

  const [userDetailsCollapse, setUserDetailsCollapse] = useState(true);
  const [carsDetailsCollapse, setCarsDetailsCollapse] = useState(true);

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (
      customerData &&
      customerData.uId === '' &&
      customerInfo !== '' &&
      (isEditable || isDisable)
    ) {
      dispatch(reset());
      const params = { uId: _.get(customerInfo, 'uId') };
      dispatch(viewCustomerRequest(params));
      setCustomerInfo('');
    }
  }, [customerData, customerInfo]);

  useEffect(() => {
    if (isLoading) {
      if (responseData.status === responseStatus.success) {
        dispatch(reset());
        navigate('/customers');
      } else if (responseData.status === responseStatus.fail) {
        toast.error(responseData.errDescription, {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message',
        });
      }
    }
  }, [isLoading, responseData]);

  useEffect(() => {
    if (unlinkedCars.length == 0) {
      dispatch(viewUnLinkedCarCustomerRequest());
    }
  }, [unlinkedCars]);

  useEffect(() => {
    if (viewCustomerIsLoading) {
      if (viewCustomerResponseData.status === responseStatus.success) {
        setCustomerData(viewCustomerResponseData.details[0]);
        const setChecked = _.map(
          viewCustomerResponseData.details[0].cars,
          (obj) => {
            return { ...obj, checked: true };
          }
        );

        setPhotoURL(viewCustomerResponseData.details[0].profile.photoURL);
        setTempEditCheckedCars(setChecked);
        setEditCheckedCars(setChecked);
      }
    }
    if (deleteCustomerIsLoading) {
      if (deleteCustomerResponseData.status === responseStatus.success) {
        navigate('/customers');
      }
    }
  }, [
    viewCustomerIsLoading,
    viewCustomerResponseData,
    deleteCustomerIsLoading,
    deleteCustomerResponseData,
  ]);

  useEffect(() => {
    if (unlinkedCarIsLoading) {
      if (viewUnLinkedCustomerResponseData.status === responseStatus.success) {
        const updatedCars = _.map(viewUnLinkedCustomerResponseData.details, car => ({...car, checked: false}));
        setUnLinkedCars(updatedCars);
      }
    }
    if (linkedCarIsLoading) {
      if (viewLinkedCustomerResponseData.status === responseStatus.success) {
        setLinkedCars(viewLinkedCustomerResponseData.details);
      }
    }
  }, [
    unlinkedCarIsLoading,
    viewUnLinkedCustomerResponseData,
    linkedCarIsLoading,
    viewLinkedCustomerResponseData,
  ]);

  const handleModalClose = () => setModalShow(false);
  const handleModalOpen = () => {
    setTempCheckedCars([]);
    setModalShow(true);
    setSearchValue('');
  };

  const handlePasswordTypeChange = () => {
    if (passwordType === '') setPasswordType('password');
    else setPasswordType('');
  };

  const handleUserDetailsCollapse = () => {
    setUserDetailsCollapse(!userDetailsCollapse);
  };

  const handleCarsDetailsCollapse = () => {
    setCarsDetailsCollapse(!carsDetailsCollapse);
  };

  const backButtonHandler = () => {
    history.back();
  };

  const saveUpdateButtonHandler = (values: {
    uId: string | undefined;
    profile: {
      email: string;
      phoneNumber: string;
      password: string;
      firstName: string;
      lastName: string;
      statusId: string;
      photoURL: string;
    };
    address:
      | {
          addressLineOne: string;
          streetName: string;
          houseNumber: string;
          postalCode: string;
          cityName: string;
        }[]
      | undefined;
    carDetails:
      | {
          carId: string;
        }[]
      | undefined;
  }) => {
    if (isEditable) {
      const params = JSON.stringify(values);
      const formatJson = params.replace(/'/g, '\'\'');
      dispatch(updateCustomerRequest(formatJson));
    } else {
      const params = JSON.stringify(_.omit(values, 'uId'));
      const formatJson = params.replace(/'/g, '\'\'');
      dispatch(createCustomerRequest(formatJson));
    }
  };

  useEffect(() => {
    if (statusList.length === 0) {
      dispatch(getStatusDetails());
    } else {
      setStatusDropdownData(statusList);
    }
  }, [statusList]);

  const handleCheckedCars = (
    e: React.ChangeEvent<HTMLInputElement>,
    carInfo: CarIProps
  ) => {
    if (isEditable) {
      if (e.target.checked) {
        tempEditCheckedCars.push(carInfo);
      } else {
        _.remove(
          tempEditCheckedCars,
          (obj: CarIProps) => obj.carId === carInfo.carId
        );
      }
    } else {
      if (e.target.checked) {
        tempCheckedCars.push(carInfo);
        const carToUpdate = _.find(unlinkedCars, { 'Number Plate': carInfo['Number Plate'] });
        if (carToUpdate) {
          carToUpdate.checked = true;
          setUnLinkedCars([...unlinkedCars]);
        }
      } else {
        const carToUpdate = _.find(unlinkedCars, { 'Number Plate': carInfo['Number Plate'] });
        if (carToUpdate) {
          carToUpdate.checked = false;
          setUnLinkedCars([...unlinkedCars]);
        }
        _.remove(
          tempCheckedCars,
          (obj: CarIProps) => obj.carId === carInfo.carId
        );
      }
    }
  };

  const handleEditPageCheckedCars = (
    e: React.ChangeEvent<HTMLInputElement>,
    carInfo: CarIProps
  ) => {
    if (e.target.checked) {
      tempCheckedCars.push(carInfo);
    } else {
      const carToUpdate = _.find(unlinkedCars, { 'Number Plate': carInfo['Number Plate'] });
        if (carToUpdate) {
          carToUpdate.checked = false;
          setUnLinkedCars([...unlinkedCars]);
        }
      _.remove(
        tempCheckedCars,
        (obj: CarIProps) => obj.carId === carInfo.carId
      );
      setTempCheckedCars(tempCheckedCars);
    }
  };

  const handleSave = () => {
    if (isEditable) {
      setEditCheckedCars(tempEditCheckedCars);
    } else {
      const filetredCars =  _.filter(unlinkedCars, (obj) => obj.checked === true);
      setCheckedCars(filetredCars);
    }
  };

  const handleReset = () => {
    setPhotoURL(isEditable ? viewCustomerResponseData.details[0].profile.photoURL : '');
    //setCheckedCars([]);
    //setTempCheckedCars([]);
    setEditCheckedCars([]);
    const setChecked = _.map(
      viewCustomerResponseData.details[0].cars,
      (obj) => {
        return { ...obj, checked: true };
      }
    );
    setEditCheckedCars(setChecked);
    setTempEditCheckedCars(setChecked);
    setTempCheckedCars(setChecked);
    setCheckedCars(setChecked);
  };
  
  if (access !== '') {
    if (
      access === AccessTypes.fullAccess ||
      access === AccessTypes.readOnlyAccess
    ) {
      return (
        <ManageCustomers
          backButtonHandler={backButtonHandler}
          customerData={customerData}
          statusDropDownData={statusDropdownData}
          isDisable={isDisable}
          isEditable={isEditable}
          handleUserDetailsCollapse={handleUserDetailsCollapse}
          handleCarsDetailsCollapse={handleCarsDetailsCollapse}
          userDetailsCollapse={userDetailsCollapse}
          carsDetailsCollapse={carsDetailsCollapse}
          saveUpdateButtonHandler={saveUpdateButtonHandler}
          passwordType={passwordType}
          handlePasswordTypeChange={handlePasswordTypeChange}
          isCreate={isCreate}
          handleModalClose={handleModalClose}
          handleModalOpen={handleModalOpen}
          modalShow={modalShow}
          unlinkedCars={unlinkedCars}
          linkedCars={linkedCars}
          checkedCars={checkedCars}
          handleCheckedCars={handleCheckedCars}
          handleEditPageCheckedCars={handleEditPageCheckedCars}
          handleSave={handleSave}
          handleReset={handleReset}
          editCheckedCars={editCheckedCars}
          onDrop={onDrop}
          photoURL={photoURL}
          searchValue={searchValue}
          handleSearch={handleSearch}
        />
      );
    } else {
      return <NotFound />;
    }
  } else {
    return <Loader />;
  }
};
