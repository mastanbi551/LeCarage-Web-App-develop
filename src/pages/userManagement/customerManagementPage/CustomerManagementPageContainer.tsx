import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router';
import { CustomerManagementPage } from './CustomerManagementPage';
import { useAppDispatch, useAppSelector } from '../../../hooks/Hooks';
import _ from 'lodash';
import { getAllCustomersRequest, deleteCustomerRequest, reset, setItemsPerPage } from './customerManagementPageState/CustomerManagementSlice';
import { onLoadingStop } from '../../commonStates/CommonSlice';
import { customerFilterBy, responseStatus, routeNames } from '../../../utils/constants/ConstantStrings';

const CustomerManagementPageContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [allCustomers, setAllCustomers] = useState<[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [displayColumns, setDisplayColumns] = useState<{ Header: string; accessor: string; }[]>([]);
  const [dynamicColumns, setDynamicColumns] = useState<string[]>([]);

  const [customFilter, setCustomFilter] = useState<{
    mainMenu: string;
    subMenus: string[]
  }[]>([]);

  const {
    deleteCustomerIsLoading,
    deleteCustomerResponseData,
    getCustomersIsLoading,
    getCustomersResponseData,
    itemsPerPage
  } = useAppSelector(state => state.customerManagementReducer);

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
        }) => obj.label === routeNames.customers);
        if(getAccess.length > 0){
          setAccess(getAccess ? getAccess[0].featureAccess : '');
        }
      }
      
    }
  }, [access, routes]);

  const handleAddUser = () => {
    navigate('/CreateCustomer', {
      state:
      {
        action: 'create'
      }
    });
  };

  const onViewHandler = (rowInfo: object) => {
    navigate('/ViewCustomer', {
      state: {
        customerInfo: rowInfo,
        action: 'view',
      },
    });
  };

  const onEditHandler = (rowInfo: object) => {
    navigate('/EditCustomer', {
      state: {
        customerInfo: rowInfo,
        action: 'edit',
      }
    });
  };

  const onDeleteHandler = (rowInfo: object) => {
    const userId = _.get(rowInfo, 'uId');
    const params = {
      uId: userId
    };
    dispatch(deleteCustomerRequest(params));
  };

  const setColumns = () => {
    const columns: { Header: string; accessor: string; }[] = [];
    dynamicColumns.map(column => {
      if (column !== 'uId') {
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
    if (deleteCustomerIsLoading) {
      if (deleteCustomerResponseData.status === responseStatus.success) {
        setAllCustomers([]);
      }
    }
  }, [deleteCustomerIsLoading, deleteCustomerResponseData]);

  useEffect(() => {
    if (dynamicColumns.length > 0) {
      setColumns();
    }
  }, [dynamicColumns]);

  useEffect(() => {
    if (!getCustomersIsLoading) dispatch(reset());
    if (getCustomersIsLoading) {
      if (getCustomersResponseData.status === responseStatus.success) {
        if (getCustomersResponseData.details.length > 0) {
          setAllCustomers(getCustomersResponseData.details);
          const keys = _.flatMap(getCustomersResponseData.details, obj => Object.keys(obj));
          setDynamicColumns(_.uniq(keys));
          dispatch(reset());
          dispatch(onLoadingStop());
        }
        else {
          setErrorMessage(getCustomersResponseData.errDescription);
          dispatch(reset());
          dispatch(onLoadingStop());
        }

      }
      else if (getCustomersResponseData.status === responseStatus.fail) {
        dispatch(reset());
        dispatch(onLoadingStop());
        navigate('/');
      }

      else if(getCustomersResponseData.message !== ''){
        setErrorMessage(getCustomersResponseData.message);
        dispatch(reset());
        dispatch(onLoadingStop());
        navigate('/');
      }
    }
  }, [getCustomersIsLoading, getCustomersResponseData]);

  useEffect(() => {
    setCustomFilter([]);
    if (allCustomers.length === 0) {
      setDisplayColumns([]);
      setDynamicColumns([]);
      dispatch(getAllCustomersRequest());
    }
    else {
      if (allCustomers.length > 0) {
        customerFilterBy.map(item => {
          customFilter.push({
            mainMenu: item,
            subMenus: _.uniq(_.map(allCustomers, item))
          });
        });
      }
      setCustomFilter(customFilter);
    }
  }, [allCustomers]);

  const rowsPerPageValueChange = (value: string) => {
    dispatch(setItemsPerPage(value));
  };
  
  return (
    <CustomerManagementPage
      handleAddUser={handleAddUser}
      columns={displayColumns}
      searchValue={dynamicColumns}
      onViewHandler={onViewHandler}
      onEditHandler={onEditHandler}
      onDeleteHandler={onDeleteHandler}
      customers={allCustomers}
      errorMessage={errorMessage}
      filterValues={customFilter}
      access={access}
      rowsPerPageValueChange={rowsPerPageValueChange}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default CustomerManagementPageContainer;