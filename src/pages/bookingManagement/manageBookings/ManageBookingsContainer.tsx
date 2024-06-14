
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/Hooks';
import { createBookingRequest, getBookingsByDate, getBookingServices, getBookingStatus, getCustomerCars, getCustomers, getTimeSlots, reset, updateBookingRequest, viewBookingRequest } from '../bookingsManagementPageState/BookingsManagementSlice';
import { ManageBookings } from './ManageBookings';
import moment from 'moment';
import { toast } from 'react-toastify';
import { CarsListIProps, TimeSlotsListProps, CustomersListIProps, TimeSlotForBookingProps } from '../bookingsManagementPageState/BookingsManagementStateInterface';
import { ValuesProps } from '../BookingManagementInterface';
import { NotFound } from '../../notFound/NotFound';
import { AccessTypes, responseStatus } from '../../../utils/constants/ConstantStrings';
import { getWarehouseDetails } from '../../commonStates/CommonSlice';
import { Loader } from '../../../components';

export const ManageBookingsContainer = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { routes } = useAppSelector(state => state.sidebarReducer);
  const [access, setAccess] = useState('');

  useEffect(() => {
    if (access === '' && routes) {
      const SubRoutes = routes ? _.get(routes, 'Bookings') : 0;
      if (SubRoutes) {
        const getAccess = _.filter(SubRoutes, (obj: {
          accessId: string;
          featureAccess: string;
          isParent: boolean;
          label: string;
          parentFeature: string;
          value: string;
        }) => obj.label === 'All Bookings');
        if (getAccess.length > 0) {
          setAccess(getAccess ? getAccess[0].featureAccess : '');
        }
      }

    }
  }, [access, routes]);

  const [customerDetailsCollapse, setCustomerDetailsCollapse] = useState(true);
  const [pickUpRequestDetailsCollapse, setPickUpRequestDetailsCollapse] = useState(true);
  const [limoServiceCollapse, setLimoServiceCollapse] = useState(true);

  const [bookingsInfo, setBookingInfo] = useState(location.state && location.state.bookingInfo);
  const [isDisable, setIsDisable] = useState(location.state && location.state.bookingInfo && (location.state.action === 'view') ? true : false);
  const [isEditable, setIsEditable] = useState(location.state && location.state.bookingInfo && location.state.action === 'edit' ? true : false);
  const [isCreate, setIsCreate] = useState(location.state && location.state.action === 'create' ? true : false);

  const [customerCarsList, setCustomersCarsList] = useState<CarsListIProps[]>([]);

  const [customTimeSlots, setCustomTimeSlots] = useState<TimeSlotForBookingProps[]>([]);

  const [customersInfo, setCustomersInfo] = useState<CustomersListIProps[]>([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isPickUp, setIsPickUp] = useState(false);
  const [isDropOff, setIsDropOff] = useState(false);

  const [bookingData, setBookingData] = useState({
    uId: '',
    email: '',
    phoneNumber: '',
    carId: '',
    serviceId: '',
    bookingStatusId: '',
    bookingId: '',
    date: '',
    slot: '',
    additionalNote: '',
    representativeRequired: false,
    representativeName: '',
    representativeContact: '',
    limoServiceRequired: false,
    limoPickupLocation: '',
    limoDropOffLocation: '',
    limoServiceDate: '',
    limoServiceTimeSlot: '',
    label:'',
    licensePlateNumber: '',
    service: '',

    deniedReason: '',
    newDate: '',
    newSlot: '',
    warehouseId: '',
  });

  const {
    timeSlotsList,
    bookingServicesList,
    carsList,
    bookingsByDate,
    statusList,

    viewBookingIsLoading,
    viewBookingResponseData,

    isLoading,
    responseData,

    customersList,
  } = useAppSelector((state) => state.bookingManagementReducer);

  const {
    WarehousesList,
  } = useAppSelector((state) => state.commonReducer);

  useEffect(() => {
    if (carsList.length !== 0)
      setCustomersCarsList(carsList);
  }, [carsList]);

  const handleCustomerDetailsCollapse = () => {
    setCustomerDetailsCollapse(!customerDetailsCollapse);
  };

  const handlePickupRequestsDetailsCollapse = () => {
    setPickUpRequestDetailsCollapse(!pickUpRequestDetailsCollapse);
  };

  const handleLimoServiceCollapse = () => {
    setLimoServiceCollapse(!limoServiceCollapse);
  };

  const backButtonHandler = () => {
    history.back();
  };

  const [place, setPlace] = useState<string | null>(null);

  const handlePlace = (value: string | null) => {
    setPlace(value);
  };

  const saveUpdateButtonHandler = (values: ValuesProps) => {

    const date = new Date(values.bookingDate);
    //const formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');


    if (isEditable) {
      const params = {
        bookingId: bookingData.bookingId,
        uId: values.uId,
        carId: values.carId ? parseInt(values.carId) : 0,
        serviceId: values.serviceId ? parseInt(values.serviceId.toString()) : 0,
        date: values.bookingDate,
        slot: values.bookingTimeSlot,
        additionalNote: values.additionalNote,
        representativeRequired: values.representativeName !== '' ? true : false,
        representativeName: values.representativeName,
        representativeContact: values.representativePhone,
        limoServiceRequired: values.limoPickupLocation !== '' ? true : false,
        limoPickupLocation: values.limoPickupLocation,
        limoDropOffLocation: values.limoDropOffLocation,
        limoServiceDate: values.limoServiceDate,
        limoServiceTimeSlot: values.limoServiceTimeSlot,
        deniedReason: values.deniedReason,
        newDate: values.newDate,
        newSlot: values.newSlot,
        bookingStatus: values.bookingStatus ? parseInt(values.bookingStatus) : 0,
        warehouseLocation: values.warehouseLocation ? parseInt(values.warehouseLocation) : 0
      };
      const formatJson = JSON.stringify(params).replace(/'/g, '\'\'');
      dispatch(updateBookingRequest(formatJson));
    }
    else {
      const params = {
        uId: values.uId,
        carId: values.carId ? parseInt(values.carId) : 0,
        serviceId: values.serviceId ? parseInt(values.serviceId.toString()) : 0,
        bookingStatus: values.bookingStatus ? parseInt(values.bookingStatus) : 0,
        warehouseLocation: values.warehouseLocation ? parseInt(values.warehouseLocation) : 0,
        date: values.bookingDate,
        slot: values.bookingTimeSlot,
        additionalNote: values.additionalNote,
        representativeRequired: values.representativeName !== '' ? true : false,
        representativeName: values.representativeName,
        representativeContact: values.representativePhone,
        limoServiceRequired: values.limoPickupLocation !== '' ? true : false,
        limoPickupLocation: values.limoPickupLocation,
        limoDropOffLocation: values.limoDropOffLocation,
        limoServiceDate: values.limoServiceDate,
        limoServiceTimeSlot: values.limoServiceTimeSlot,
      };
      const formatJson = JSON.stringify(params).replace(/'/g, '\'\'');
      dispatch(createBookingRequest(formatJson));
    }
  };

  useEffect(() => {
    if (bookingServicesList.length === 0) {
      dispatch(getBookingServices());
    }
    if (statusList.length === 0) {
      dispatch(getBookingStatus());
    }
    if (WarehousesList.length === 0) {
      dispatch(getWarehouseDetails());
    }
    if (timeSlotsList.length === 0) {
      dispatch(getTimeSlots());
    }
    if (customersList.length === 0) {
      dispatch(getCustomers());
    }
  }, [bookingServicesList, statusList, WarehousesList, timeSlotsList, customersInfo]);


  const getCustomerInfoByEmail = (value: string) => {
    const params = { uId: value, forBooking: true };
    dispatch(getCustomerCars(params));
  };

  const handleServiceType = (value: string) => {
    if (value === '1') {
      setCustomersCarsList(_.filter(carsList, (obj: CarsListIProps) => obj.name === 'Stored'));
      setIsPickUp(!isPickUp);
      setIsDropOff(false);
    }
    else if (value === '2') {
      setCustomersCarsList(_.filter(carsList, ((obj: CarsListIProps) => obj.name === 'NotStored')));
      setIsDropOff(!isDropOff);
      setIsPickUp(false);
    }
    else {
      setIsPickUp(false);
      setIsDropOff(false);
    }
  };

  const getbookingsByDate = (value: Date | null) => {
    const params = { date: moment(value).format('YYYY-MM-DD') };
    dispatch(getBookingsByDate(params));
  };

  useEffect(() => {
    if (bookingsByDate.length > 0 && timeSlotsList.length > 0) {
      const timeslots = [{ slot: '', isAvailable: false }];

      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;

      if(selectedDate > now){
        // setCustomTimeSlots(timeSlotsList);

        timeSlotsList && timeSlotsList[0].timeSlotsForBooking.map((value: { slot: string, isAvailable: boolean }) => {
          const isBookingAvailable = _.filter(bookingsByDate, (booking: { bookingCount: number; bookingTimeSlot: string; date: string }) => booking.bookingTimeSlot === value.slot && booking.bookingCount >= timeSlotsList[0].maxBookingsPerSlot);
  
          if (isBookingAvailable.length === 0) {
            timeslots.push(value);
          }
        });
        _.remove(timeslots, (obj: { slot: string, isAvailable: boolean }) => obj.slot === '');
        setCustomTimeSlots(timeslots);
      }
      else {
        const filteredSlots = timeSlotsList[0].timeSlotsForBooking.map((slot: TimeSlotForBookingProps) => {
          if(slot.slot >= currentTime){
            return {...slot, isDisable: false};
          }
          else {
            return {...slot, isDisable: true};
           }
        });

        console.log(filteredSlots);

        filteredSlots && filteredSlots.map((value: { slot: string, isAvailable: boolean }) => {
          const isBookingAvailable = _.filter(bookingsByDate, (booking: { bookingCount: number; bookingTimeSlot: string; date: string }) => booking.bookingTimeSlot === value.slot && booking.bookingCount >= timeSlotsList[0].maxBookingsPerSlot);
  
          if (isBookingAvailable.length === 0) {
            timeslots.push(value);
          }
        });
        _.remove(timeslots, (obj: { slot: string, isAvailable: boolean }) => obj.slot === '');
        setCustomTimeSlots(timeslots);
      }

      
    }
    else {
        const date = moment(new Date()).format('YYYY-MM-DD');
        getBookingsByDate(date);

        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;

        if(timeSlotsList && timeSlotsList.length > 0) {
        if(selectedDate > now){
          setCustomTimeSlots(timeSlotsList[0].timeSlotsForBooking);
        }
        else {
          const filteredSlots = timeSlotsList[0].timeSlotsForBooking.map((slot: TimeSlotForBookingProps) => {
            if(slot.slot >= currentTime){
              return {...slot, isDisable: false};
            }
            else {
              return {...slot, isDisable: true};
             }
          });
  
          setCustomTimeSlots(filteredSlots);
        }
      }
    }
  }, [bookingsByDate, timeSlotsList]);


  useEffect(() => {
    if (bookingData.uId === '' && bookingsInfo !== '' && (isEditable || isDisable)) {

      const params = {
        bookingId: _.get(bookingsInfo, 'pkiBookingId'),
      };
      dispatch(reset());
      dispatch(viewBookingRequest(params));
      setBookingInfo('');
    }
  }, [bookingData, bookingsInfo]);

  useEffect(() => {
    if (viewBookingIsLoading) {
      if (viewBookingResponseData.status === responseStatus.success) {
        setBookingData(viewBookingResponseData.details[0]);
        handlePlace(viewBookingResponseData.details[0].limoPickupLocation ? viewBookingResponseData.details[0].limoPickupLocation : viewBookingResponseData.details[0].limoDropOffLocation);
      }
      else if (viewBookingResponseData.status === responseStatus.fail) {
        navigate('/BookingsList');
      }
    }
  }, [viewBookingIsLoading, viewBookingResponseData]);

  useEffect(() => {
    if (isLoading) {
      if (responseData.status === responseStatus.success) {
        dispatch(reset());
        navigate('/BookingsList');
      } else if (responseData.status === responseStatus.fail) {
        // toast.error(responseData.errDescription, {
        //   position: toast.POSITION.TOP_CENTER,
        //   className: 'toast-message',
        // });
      }
    }
  }, [isLoading, responseData]);

  const handleDateChange = (value: Date | null, values: ValuesProps) => {
    const date = moment(value).format('YYYY-MM-DD');
    setDate(new Date(date));
    const formattedDate = new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1).toString().padStart(2, '0') + '-' + new Date(date).getDate().toString().padStart(2, '0');
    values.bookingDate = formattedDate;
    setSelectedDate(new Date(formattedDate));
    getbookingsByDate(value);
  };

  const handleNewDateChange = (value: Date | null, values: ValuesProps) => {
    const date = moment(value).format('YYYY-MM-DD');
    setDate(new Date(date));
    const formattedDate = new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1).toString().padStart(2, '0') + '-' + new Date(date).getDate().toString().padStart(2, '0');
    values.newDate = formattedDate;
    getbookingsByDate(value);
  };

  const [date, setDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleReset = () => {
    setIsPickUp(false);
    setIsDropOff(false);
  };

  if (access !== '') {
  if (access === AccessTypes.fullAccess || access === AccessTypes.readOnlyAccess) {
    return (
      <ManageBookings
        statusDropDownData={statusList}
        handleCustomerDetailsCollapse={handleCustomerDetailsCollapse}
        handlePickupRequestsDetailsCollapse={handlePickupRequestsDetailsCollapse}
        handleLimoServiceCollapse={handleLimoServiceCollapse}
        customerDetailsCollapse={customerDetailsCollapse}
        pickUpRequestDetailsCollapse={pickUpRequestDetailsCollapse}
        limoServiceCollapse={limoServiceCollapse}
        backButtonHandler={backButtonHandler}
        isDisable={isDisable}
        isEditable={isEditable}
        saveUpdateButtonHandler={saveUpdateButtonHandler}
        timeslotList={customTimeSlots}
        serviceTypeInfo={bookingServicesList}
        carsList={customerCarsList}
        getCustomerInfoByEmail={getCustomerInfoByEmail}
        handleServiceType={handleServiceType}
        getbookingsByDate={getbookingsByDate}
        isPickUp={isPickUp}
        isDropOff={isDropOff}
        WarehousesList={WarehousesList}

        bookingData={bookingData}
        isCreate={isCreate}
        handleDateChange={handleDateChange}
        handleNewDateChange={handleNewDateChange}
        toggleModal={toggleModal}
        modalOpen={modalOpen}

        customersList={customersList}
        handleReset={handleReset}
        place={place}
        handlePlace={handlePlace}
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
