import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const UserManagementPage = React.lazy(() => import('./UserManagementPage'));
import { useAppDispatch, useAppSelector } from '../../../hooks/Hooks';
import {
  getAllAdminUsersRequest,
  onDeleteUserRequest,
  reset,
  setItemsPerPage
} from './userManagementState/UserManagementSlice';
import {
  onLoadingStop,
} from '../../commonStates/CommonSlice';
import _ from 'lodash';
import { responseStatus, routeNames, usersFilterBy } from '../../../utils/constants/ConstantStrings';

const UserManagementPageContainer = () => {  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [allUsers, setAllUsers] = useState<[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [dynamicColumns, setDynamicColumns] = useState<string[]>([]);
  const { 
    getUsersIsLoading, 
    getUsersResponseData, 
    onDeleteIsLoading, 
    onDeleteResponseData, 
    itemsPerPage
   } =
    useAppSelector((state) => state.userManagementReducer);
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
        }) => obj.label === routeNames.users);
        if(getAccess.length > 0){
          setAccess(getAccess ? getAccess[0].featureAccess : '');
        }
      }
      
    }
  }, [access, routes]);

  const handleAddUser = () => {
    navigate('/CreateUser', {
      state:
      {
        action: 'create'
      }
    });
  };

  const onViewHandler = (rowInfo: object) => {
    navigate('/ViewUser', {
      state: {
        userInfo: rowInfo,
        action: 'view',
      },
    });
  };

  const onEditHandler = (rowInfo: object) => {
    navigate('/EditUser', {
      state: {
        userInfo: rowInfo,
        action: 'edit',
      },
    });
  };

  const onDeleteHandler = (rowInfo: object) => {
    const userId = _.get(rowInfo, 'User Id');
    const params = {
      uId: userId,
    };
    dispatch(onDeleteUserRequest(params));
  };

  const setColumns = () => {
    const columns:{ Header: string; accessor: string; }[] = [];
    dynamicColumns.map((column) => {
      if (column !== 'User Id') {
        if (displayColumns.length === 0) {
          const updatedColumn = [
            {
              Header: column,
              accessor: column,
            },
          ];
          columns.push(updatedColumn[0]);
        } else {
          const updatedColumn = [
            ...displayColumns,
            {
              Header: column,
              accessor: column,
            },
          ];
          columns.push(updatedColumn[0]);
        }
      }
    });
    setDisplayColumns(columns);
  };

  useEffect(() => {
    if (onDeleteIsLoading) {
      if (onDeleteResponseData.status === responseStatus.success) {
        setAllUsers([]);
      }
    }
  }, [onDeleteIsLoading, onDeleteResponseData]);

  useEffect(() => {
    if (dynamicColumns.length > 0) {
      setColumns();
    }
  }, [dynamicColumns]);

  useEffect(() => {
    if (!getUsersIsLoading) dispatch(reset());
    if (getUsersIsLoading) {
      if (getUsersResponseData.status === responseStatus.success) {
        if (getUsersResponseData.details.length > 0) {
          setAllUsers(getUsersResponseData.details);
          const keys = _.flatMap(getUsersResponseData.details, obj => Object.keys(obj));
          setDynamicColumns(_.uniq(keys));
          dispatch(reset());
          dispatch(onLoadingStop());
        }
        else {
          setErrorMessage(getUsersResponseData.errDescription);
          dispatch(reset());
          dispatch(onLoadingStop());
        }
      }
      else if (getUsersResponseData.status === responseStatus.fail) {
        setErrorMessage(getUsersResponseData.errDescription);
        dispatch(reset());
        dispatch(onLoadingStop());
        navigate('/');
      }
      else if(getUsersResponseData.message !== ''){
        setErrorMessage(getUsersResponseData.message);
        dispatch(reset());
        dispatch(onLoadingStop());
        navigate('/');
      }
    }
  }, [getUsersIsLoading, getUsersResponseData]);

  useEffect(() => {
    setCustomFilter([]);
    if (allUsers.length === 0) {
      setDisplayColumns([]);
      setDynamicColumns([]);
      dispatch(getAllAdminUsersRequest());
    } else {
      if (allUsers.length > 0) {
        usersFilterBy.map(item => {
          customFilter.push({
            mainMenu: item,
            subMenus: _.uniq(_.map(allUsers, item))
          });
        });
      }
      setCustomFilter(customFilter);
    }
  }, [allUsers]);

  const rowsPerPageValueChange = (value: string) => {
    dispatch(setItemsPerPage(value));
  };

  return (
    <UserManagementPage
      handleAddUser={handleAddUser}
      columns={displayColumns}
      searchValue={dynamicColumns}
      onViewHandler={onViewHandler}
      onEditHandler={onEditHandler}
      onDeleteHandler={onDeleteHandler}
      users={allUsers}
      errorMessage={errorMessage}
      filterValues={customFilter}
      access={access}
      itemsPerPage={itemsPerPage}
      rowsPerPageValueChange={rowsPerPageValueChange}
    />
  );
};

export default UserManagementPageContainer;