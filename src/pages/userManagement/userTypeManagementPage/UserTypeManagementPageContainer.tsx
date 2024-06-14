import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../../hooks/Hooks';
const UserTypeManagementPage = React.lazy(() => import('./UserTypeManagementPage'));

import { deleteUserTypeRequest, getAllUserTypesRequest, reset, setItemsPerPage } from './userTypeManagementPageState/UserTypeManagementSlice';
import { onLoadingStop, getAllUserTypes } from '../../commonStates/CommonSlice';
import { responseStatus, userTypesFilterBy } from '../../../utils/constants/ConstantStrings';
import _ from 'lodash';
import { routeNames } from '../../../utils/constants/ConstantStrings';

const UserTypeManagementPageContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [allUserTypes, setAllUserTypes] = useState<[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [dynamicColumns, setDynamicColumns] = useState<string[]>([]);
  const { deleteUserTypeIsLoading, deleteUsertypeResponseData } = useAppSelector(state => state.userTypeManagementReducer);
  const [ access, setAccess] = useState('');
  const {
    getUserTypesIsLoading,
    getUserTypesResponseData,
    itemsPerPage
  } = useAppSelector(state => state.userTypeManagementReducer);

  const {routes} = useAppSelector(state => state.sidebarReducer);
  
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

  const [displayColumns, setDisplayColumns] = useState<{ Header: string; accessor: string; }[]>([]);

  const [customFilter, setCustomFilter] = useState<{
    mainMenu: string;
    subMenus: string[]
  }[]>([]);

  const handleAddUsertype = () => {
    navigate('/CreateUserType', {
      state:
      {
        action: 'create'
      }
    });
  };

  const onViewHandler = (rowInfo: object) => {
    
    navigate('/ViewUserType',
      {
        state:
        {
          userInfo: rowInfo,
          action: 'view'
        }
      }
    );
  };

  const onEditHandler = (rowInfo: object) => {
    navigate('/EditUserType',
      {
        state:
        {
          userInfo: rowInfo,
          action: 'edit'
        }
      }
    );
  };

  const onDeleteHandler = (rowInfo: object) => {
    const usertype = _.get(rowInfo, 'User Type');
    const params = {
      userType: usertype
    };
    
    dispatch(deleteUserTypeRequest(params));
  };


  const setColumns = () => {
    const columns: { Header: string; accessor: string; }[] = [];
    dynamicColumns.map(column => {
      if (displayColumns?.length === 0) {
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

    });
    setDisplayColumns(columns);
  };

  useEffect(() => {
    if (deleteUserTypeIsLoading) {
      if (deleteUsertypeResponseData.status === responseStatus.success) {
        setAllUserTypes([]);
      }
    }
  }, [deleteUserTypeIsLoading, deleteUsertypeResponseData]);

  useEffect(() => {
    if (dynamicColumns.length > 0) {
      setColumns();
    }
  }, [dynamicColumns]);

  useEffect(() => {
    if (!getUserTypesIsLoading) dispatch(reset());
    if (getUserTypesIsLoading) {
      if (getUserTypesResponseData.status === responseStatus.success) {
        if (getUserTypesResponseData.details.length > 0) {
          setAllUserTypes(getUserTypesResponseData.details);
          const keys = _.flatMap(getUserTypesResponseData.details, obj => Object.keys(obj));
          setDynamicColumns(_.uniq(keys));
          dispatch(reset());
          dispatch(onLoadingStop());
        }
        else {
          setErrorMessage(getUserTypesResponseData.errDescription);
          dispatch(reset());
          dispatch(onLoadingStop());
        }
      }
      else if (getUserTypesResponseData.status === responseStatus.fail) {
        setErrorMessage(getUserTypesResponseData.errDescription);
        dispatch(reset());
        dispatch(onLoadingStop());
        navigate('/');
      }
      else if(getUserTypesResponseData.message !== ''){
        setErrorMessage(getUserTypesResponseData.message);
        dispatch(reset());
        dispatch(onLoadingStop());
        navigate('/');
      }
    }
  }, [getUserTypesIsLoading, getUserTypesResponseData]);


  useEffect(() => {
    setCustomFilter([]);
    if (allUserTypes && allUserTypes.length === 0) {
      dispatch(getAllUserTypesRequest());
      setDisplayColumns([]);
      setDynamicColumns([]);
      getAllUserTypes();
    }
    else {
      if (allUserTypes && allUserTypes.length > 0) {
        userTypesFilterBy.map(item => {
          customFilter.push({
            mainMenu: item,
            subMenus: _.uniq(_.map(allUserTypes, item))
          });
        });
      }
      setCustomFilter(customFilter);
    }
  }, [allUserTypes]);

  const rowsPerPageValueChange = (value: string) => {
    dispatch(setItemsPerPage(value));
  };

  return (
    <UserTypeManagementPage
      handleAddUsertype={handleAddUsertype}
      columns={displayColumns}
      searchValue={dynamicColumns}
      onViewHandler={onViewHandler}
      onEditHandler={onEditHandler}
      onDeleteHandler={onDeleteHandler}
      userTypesInfo={allUserTypes}
      errorMessage={errorMessage}
      filterValues={customFilter}
      access={access}
      itemsPerPage={itemsPerPage}
      rowsPerPageValueChange={rowsPerPageValueChange}
    />
  );
};

export default UserTypeManagementPageContainer;
