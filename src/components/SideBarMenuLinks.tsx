import React from 'react';
import { FiHome, FiUser } from 'react-icons/fi';
import { RiCalendarTodoFill } from 'react-icons/ri';
import {SlCalender} from 'react-icons/sl';

export const SideBarMenuLinks = [
    {
        'path': '/',
        'name': 'Dashboard',
        'icon': <FiHome />,
    },
    {
        'path': '/usertypes',
        'name': 'User Management',
        'icon': <FiUser />,
    },
    {
        'path': '/usertypes',
        'name': 'User Types',
    },
    {
        'path': '/users',
        'name': 'Users',
      },
      {
        'path': '/customers',
        'name': 'Customers',
      },
      {
        'path': '/cars',
        'name': 'Cars',
      },
      {
        'path': '/BookingsList',
        'name': 'Bookings',
        'icon': <RiCalendarTodoFill />,
      },
      {
        'path': '/BookingsList',
        'name': 'All Bookings',
        // icon: <FaMoneyBill />,
      },
      {
        'path': '/Calender',
        'name': 'Calendar',
        'icon': <SlCalender />,
      },
      {
        'path': '/Calender',
        'name': 'Events'
      },
      {
        'path': 'Services',
        'name': 'Services'
      }
];

export const DefaultMenu = [
    {
        'path': '/',
        'name': 'Dashboard',
        'icon': <FiHome />,
    },
];