import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/Hooks';
import { getAllBookingsRequest } from '../bookingsManagementPageState/BookingsManagementSlice';
import _ from 'lodash';
import { Bookings } from './Bookings';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { responseStatus } from '../../../utils/constants/ConstantStrings';

interface EventArrayProps {
  date: string;
  end: string;
  'First Name': string;
  'Last Name': string;
  Service: string;
  start: string;
}

interface BookingDetailsProps {
  'Car Registration': string;
  Date: string;
  'First Name': string;
  'Last Name': string;
  'pkiBookingId': number;
  Service: string;
  Status: string;
  Time: string;
}

export const BookingsContainer = () => {
  const dispatch = useDispatch();
  const {
    getBookingsIsLoading,
    getBookingsResponseData
  } = useAppSelector(state => state.bookingManagementReducer);
  const [eventsList, setEventsList] = useState<{ title: string; start: Date; end: Date }[]>([]);
  const locales = {
    'en-US': enUS,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  const DnDCalendar = withDragAndDrop(Calendar);

  useEffect(() => {
    if (eventsList.length === 0) {
      dispatch(getAllBookingsRequest());
    }
  }, [eventsList]);

  useEffect(() => {
    if (getBookingsIsLoading) {
      if (getBookingsResponseData.status === responseStatus.success) {
        const bookingsData = _.filter(getBookingsResponseData.details, (booking: BookingDetailsProps) => booking?.Status !== 'Cancelled');
        const timeData = _.map(bookingsData, function (bookings) {
          return _.omit(bookings, ['pkiBookingId', 'First Name', 'Last Name', 'Service', 'Car Registration', 'Date', 'Status']);
        });
        const timeDataNew = _.filter(timeData, (obj) => obj.Time !== '');
        const modifiedTimeData = _.map(timeDataNew, (obj: { Time: string }) => {
          const [start, end] = obj.Time.split('-');
          return { start, end };
        });
        const dateData = _.map(bookingsData, function (bookings) {
          return _.omit(bookings, ['pkiBookingId', 'First Name', 'Last Name', 'Service', 'Car Registration', 'Time', 'Status']);
        });
        const modifiedDateData = _.map(dateData, (obj: { Date: string }) => {
          const [date] = obj.Date.split('T');
          return { date };
        });
        const modifiedTitleData = _.map(bookingsData, function (bookings) {
          return _.omit(bookings, ['pkiBookingId', 'Car Registration', 'Time', 'Date']);
        });
        

                const mergeEventsData = _.merge(modifiedDateData, modifiedTimeData, modifiedTitleData);
                const meregdEventsArray = mergeEventsData;
                const newEvents = meregdEventsArray.map((value: any) => ({
                    title: value.Service + ', \n' + value['First Name'] + ' ' + value['Last Name'] + ', ' + value['Status'],
                    start: new Date(value.date + ' ' + value.start  ),
                    end: new Date(value.date + ' ' + value.end ),
                }));
                const newData = newEvents;
                setEventsList(newData);
            }
        }
    }, [getBookingsIsLoading, getBookingsResponseData]);
    return (
        <Bookings
            eventsList={eventsList}
            localizer={localizer}
            DnDCalendar={DnDCalendar}
        />
    );
};
