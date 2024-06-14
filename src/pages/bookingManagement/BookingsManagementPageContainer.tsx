import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import { onLoadingStop } from '../commonStates/CommonSlice';
import { BookingsManagementPage } from './BookingsManagementPage';
import { getAllBookingsRequest, reset, setItemsPerPage } from './bookingsManagementPageState/BookingsManagementSlice';
import { BookingFilterBy, responseStatus } from '../../utils/constants/ConstantStrings';

interface CarProps {
  'Car Registration': string,
  'Date' : string,
  'First Name': string,
  'Last Name': string,
  'pkiBookingId': string,
  'Service': string,
  'Status': string,
  'Time': string
}

export const BookingsManagementPageContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [allBookings, setAllBookings] = useState<[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [dynamicColumns, setDynamicColumns] = useState<string[]>([]);
  const [displayColumns, setDisplayColumns] = useState<{ Header: string; accessor: string; }[]>([]);
  const {
    responseData,
    isLoading,
    getBookingsResponseData,
    getBookingsIsLoading,
    itemsPerPage
  } = useAppSelector(state => state.bookingManagementReducer);

  const {routes} = useAppSelector(state => state.sidebarReducer);
  const [ access, setAccess] = useState('');
  
  useEffect(() => {
    if(access === '' && routes){
      const SubRoutes = routes ? _.get(routes, 'Bookings') : 0;
      if(SubRoutes){
        const getAccess = _.filter(SubRoutes, (obj: {
          accessId: string;
          featureAccess: string;
          isParent: boolean;
          label: string;
          parentFeature: string;
          value: string;
        }) => obj.label === 'All Bookings');
        if(getAccess.length > 0){
          setAccess(getAccess ? getAccess[0].featureAccess : '');
        }
      }
      
    }
  }, [access, routes]);

  const [customFilter, setCustomFilter] = useState<{
    mainMenu: string;
    subMenus: string[]
  }[]>([]);

  const handleAddbooking = () => {
    navigate('/BookingsRequest', { state: { action: 'create' } });
  };

  const onViewHandler = (rowInfo: object) => {
    navigate('/ViewBooking', { state: { bookingInfo: rowInfo, action: 'view' } });
  };

  const onEditHandler = (rowInfo: object) => {
    navigate('/EditBooking', { state: { bookingInfo: rowInfo, action: 'edit' } });
  };

  const setColumns = () => {
    const columns: { Header: string; accessor: string; }[] = [];
    dynamicColumns.map(column => {
      if (column !== 'pkiBookingId') {
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
    if (!getBookingsIsLoading) dispatch(reset());
    if (getBookingsIsLoading) {
      if (getBookingsResponseData.status === responseStatus.success) {
        if (getBookingsResponseData.details.length > 0) {
          const formattedArr : any = _.map(getBookingsResponseData.details, (obj: CarProps) => {
            const formattedDate = new Date(obj.Date).getFullYear() + '-' + (new Date(obj.Date).getMonth() + 1).toString().padStart(2, '0') + '-' + new Date(obj.Date).getDate().toString().padStart(2, '0');
            return {
              ...obj,
              Date: formattedDate,
            };
          });

          setAllBookings(formattedArr);
          const keys = _.flatMap(getBookingsResponseData.details, obj => Object.keys(obj));
          setDynamicColumns(_.uniq(keys));
          dispatch(reset());
          dispatch(onLoadingStop());
        }
        else {
          setErrorMessage(getBookingsResponseData.errDescription);
          dispatch(reset());
          dispatch(onLoadingStop());
        }

      }
      else if (getBookingsResponseData.status === responseStatus.fail) {
        dispatch(reset());
        dispatch(onLoadingStop());
        navigate('/');
      }
    }
  }, [getBookingsIsLoading, getBookingsResponseData]);


  useEffect(() => {
    setCustomFilter([]);
    if (allBookings.length === 0) {
      dispatch(getAllBookingsRequest());
      setDisplayColumns([]);
      setDynamicColumns([]);
    }
    else {
      if (allBookings.length > 0) {
        setCustomFilter([]);
        BookingFilterBy.map(item => {
          customFilter.push({
            mainMenu: item,
            subMenus: _.uniq(_.map(allBookings, item))
          });
        });
      }
      setCustomFilter(customFilter);
    }
  }, [allBookings]);

  const rowsPerPageValueChange = (value: string) => {
    dispatch(setItemsPerPage(value));
  };

  return (
    <BookingsManagementPage
      handleAddbooking={handleAddbooking}
      columns={displayColumns}
      searchValue={dynamicColumns}
      onViewHandler={onViewHandler}
      onEditHandler={onEditHandler}
      //onDeleteHandler={onDeleteHandler}
      bookings={allBookings}
      errorMessage={errorMessage}
      filterValues={customFilter}
      access={access}
      rowsPerPageValueChange={rowsPerPageValueChange}
      itemsPerPage={itemsPerPage}
    />
  );
};
