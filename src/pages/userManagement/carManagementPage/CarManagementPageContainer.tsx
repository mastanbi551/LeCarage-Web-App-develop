import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Column } from 'react-table';
import { useAppDispatch, useAppSelector } from '../../../hooks/Hooks';
import { onLoadingStop } from '../../commonStates/CommonSlice';
import { CarManagementPage } from './CarManagementPage';
import { reset, resetCarModelList, setItemsPerPage } from './carManagementState/CarManagementSlice';

import { deleteCarRequest, getAllCarsRequest } from './carManagementState/CarManagementSlice';
import { CarFilterBY, responseStatus, routeNames } from '../../../utils/constants/ConstantStrings';
import _ from 'lodash';

const CarManagementPageContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [allCars, setAllCars] = useState<[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [dynamicColumns, setDynamicColumns] = useState<string[]>([]);
  const { getCarsIsLoading, getCarsResponseData, itemsPerPage } = useAppSelector(state => state.carManagementReducer);
  const [displayColumns, setDisplayColumns] = useState<{ Header: string; accessor: string; }[]>([]);

  const [customFilter, setCustomFilter] = useState<{
    mainMenu: string;
    subMenus: string[]
  }[]>([]);
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

  const { deleteCarResponseData, deleteCarIsLoading } = useAppSelector(state => state.carManagementReducer);
  const handleAddCar = () => {
    navigate('/CreateCar', { state: { action: 'create' } });
  };

  const onViewHandler = (rowInfo: object) => {
    dispatch(reset());
     navigate('/ViewCar', { state: { carInfo: rowInfo, action: 'view' } });
  };

  const onEditHandler = (rowInfo: object) => {
    dispatch(reset());
    navigate('/EditCar', { state: { carInfo: rowInfo, action: 'edit' } });
  };

  const onDeleteHandler = (rowInfo: object) => {
    const carId = _.get(rowInfo, 'carId');
    const params = {
      carId: carId
    };
    dispatch(deleteCarRequest(params));
  };

  const setColumns = () => {
    const columns: { Header: string; accessor: string; }[] = [];
    dynamicColumns.map(column => {
      if (column !== 'carId') {
        if (displayColumns.length === 0) {
          const updatedColumn = [{
            Header: column,
            accessor: column,
          }
          ];
          columns.push(updatedColumn[0]);
        }
        else {
          const updatedColumn = [
            ...displayColumns, {
              Header: column,
              accessor: column,
            }
          ];
          columns.push(updatedColumn[0]);
        }
      }


    });
    setDisplayColumns(columns);
  };

  useEffect(() => {
    if (dynamicColumns.length > 0) {
      setColumns();
    }
  }, [dynamicColumns]);

  useEffect(() => {
    if (!getCarsIsLoading) dispatch(reset());
    if (getCarsIsLoading) {
      if (getCarsResponseData && getCarsResponseData.status === responseStatus.success) {
        if (getCarsResponseData.details.length > 0) {
          setAllCars(getCarsResponseData.details);
          const keys = _.flatMap(getCarsResponseData.details, obj => Object.keys(obj));
          setDynamicColumns(_.uniq(keys));
          dispatch(reset());
          dispatch(onLoadingStop());
        }
        else {
          setErrorMessage(getCarsResponseData.errDescription);
          dispatch(reset());
          dispatch(onLoadingStop());
        }

      }

      else if (getCarsResponseData.status === responseStatus.fail) {
        setErrorMessage(getCarsResponseData.errDescription);
        dispatch(reset());
        dispatch(onLoadingStop());
        navigate('/');
      }

      else if(getCarsResponseData.message !== ''){
        setErrorMessage(getCarsResponseData.message);
        dispatch(reset());
        dispatch(onLoadingStop());
        navigate('/');
      }
    }
  }, [getCarsIsLoading, getCarsResponseData]);

  useEffect(() => {
    setCustomFilter([]);
    if (allCars.length === 0) {
      dispatch(getAllCarsRequest());
      setDisplayColumns([]);
      setDynamicColumns([]);
    }
    else {
      if (allCars.length > 0) {
        CarFilterBY.map(item => {
          customFilter.push({
            mainMenu: item,
            subMenus: _.uniq(_.map(allCars, item))
          });
        });
      }
      setCustomFilter(customFilter);
    }
  }, [allCars]);

  useEffect(() => {
    if (deleteCarIsLoading) {
      if (deleteCarResponseData.status === responseStatus.success) {
        setAllCars([]);
      }
    }
  }, [deleteCarIsLoading, deleteCarResponseData]);

  const rowsPerPageValueChange = (value: string) => {
    dispatch(setItemsPerPage(value));
  };

  return (
    <CarManagementPage
      handleAddCar={handleAddCar}
      columns={displayColumns}
      searchValue={dynamicColumns}
      onViewHandler={onViewHandler}
      onEditHandler={onEditHandler}
      onDeleteHandler={onDeleteHandler}
      carsInfo={allCars}
      errorMessage={errorMessage}
      filterValues={customFilter}
      access={access}
      rowsPerPageValueChange={rowsPerPageValueChange}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default CarManagementPageContainer;
