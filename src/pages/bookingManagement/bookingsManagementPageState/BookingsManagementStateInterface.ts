export interface ErrDetails {
    detail: ErrDetail
  }

export interface ErrDetail {
    code: string;
    message: string;
  }

  export interface BookingTableInfo {
    'Car Registration': string,
    Date: string,
    'First Name': string,
    'Last Name': string,
    pkiBookingId: string,
    Service: string,
    Status: string,
    Time: string
  }
  
  export interface BookingsManagementResponse {
    getBookingsIsLoading: boolean,
    getBookingsResponseData: {
      status: string;
      details: [];
      errDescription: string;
      errDetails: ErrDetails;
    }

    responseData: {
      status: string;
      details: [];
      errDescription: string;
      errDetails: ErrDetails;
    };
    isLoading: boolean;
  
    statusList: StatusIProps[];
    timeSlotsList: TimeSlotsListProps[];
    bookingServicesList: BookingServicesListIProps[];
    carsList: CarsListIProps[];
    warehouseList: WarehouseIProps[];
    bookingsByDate: BookingsPerDate[];

    viewBookingResponseData: {
        status: string,
        details: viewBookingDetails[],
        errDescription: string;
        errDetails: ErrDetails;
      },
      viewBookingIsLoading: boolean,
    
      deleteBookingResponseData: {
        status: string,
        details: [],
        errDescription: string;
        errDetails: ErrDetails;
      },
      deleteBookingIsLoading: boolean,

      customersList: CustomersListIProps[],
      itemsPerPage: number
  }
  
  export interface viewBookingDetails {
    uId: string;
    email: string;
    phoneNumber: string;
    carId: string;
    serviceId: string;
    bookingStatusId: string;
    bookingId: string;
    date: string;
    slot: string;
    additionalNote: string;
    representativeRequired: false,
    representativeName: string;
    representativeContact: string;
    limoServiceRequired: false,
    limoPickupLocation: string;
    limoDropOffLocation: string;
    limoServiceDate: string;
    limoServiceTimeSlot: string;

    licensePlateNumber: string;
    label:string;
    service: string;

    deniedReason: string;
    newDate: string;
    newSlot: string;
    warehouseId: string;
  }
  export interface CustomersListIProps {
    label: string;
    value: string;
  }
  export interface WarehouseIProps{
    label: string;
    value: string;
  }

  export interface StatusIProps {
    label: string;
    value: string
  }
  export interface BookingServicesListIProps {
    label: string;
    value: string
  }
  export interface CarsListIProps {
    email: string,
    label: string,
    name: string,
    phoneNumber: string,
    uId: string,
    value: string
  }

  export interface BookingsPerDate {
    date: string;
    bookingTimeSlot: string;
    bookingCount: number;
  }

  export interface TimeSlotForBookingProps {
    slot: string;
    isAvailable: boolean;
    isDisable?: boolean;
  }
  
  export interface TimeSlotsListProps {
    maxBookingsPerSlot: number;
    timeSlotsForBooking: TimeSlotForBookingProps[]
  }