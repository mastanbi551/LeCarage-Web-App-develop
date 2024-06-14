import { BookingServicesListIProps, BookingsPerDate, CarsListIProps, CustomersListIProps, StatusIProps, TimeSlotForBookingProps, TimeSlotsListProps, WarehouseIProps } from './bookingsManagementPageState/BookingsManagementStateInterface';

export interface ValuesProps {
  warehouseLocation: string | undefined,
  uId: string,
  carId: string,
  serviceId: string | number,
  bookingStatus: string,
  bookingDate: string | Date,
  bookingTimeSlot: string,
  additionalNote: string,
  representativeName: string,
  representativePhone: string,
  limoPickupLocation: string,
  limoDropOffLocation: string,
  limoServiceDate: string,
  limoServiceTimeSlot: string,

  deniedReason: string,
  newDate: string | Date,
  newSlot: string,
}

export interface ManageBookingsInterface {
  statusDropDownData: StatusIProps[];
  handleCustomerDetailsCollapse: () => void;
  handlePickupRequestsDetailsCollapse: () => void;
  handleLimoServiceCollapse: () => void;
  customerDetailsCollapse: boolean;
  pickUpRequestDetailsCollapse: boolean;
  limoServiceCollapse: boolean;
  backButtonHandler: () => void;
  isDisable: boolean;
  isEditable: boolean;
  saveUpdateButtonHandler: (values: ValuesProps) => void;
  timeslotList: TimeSlotForBookingProps[];
  serviceTypeInfo: BookingServicesListIProps[];
  carsList: CarsListIProps[];
  getCustomerInfoByEmail: (value: string) => void;
  handleServiceType: (value: string) => void;
  getbookingsByDate: (value: Date | null) => void;

  isPickUp?: boolean;
  isDropOff?: boolean;
  WarehousesList: WarehouseIProps[];
  bookingData: {
    uId: string;
    email: string;
    phoneNumber: string;
    carId: string;
    serviceId: string | number;
    bookingStatusId: string;
    bookingId: string;
    date: string | Date;
    slot: string;
    additionalNote: string;
    representativeRequired: boolean;
    representativeName: string;
    representativeContact: string;
    limoServiceRequired: boolean;
    limoPickupLocation: string;
    limoDropOffLocation: string;
    limoServiceDate: string;
    limoServiceTimeSlot: string;
    label:string;
    licensePlateNumber: string;
    service: string;

    deniedReason: string,
    newDate: string | Date,
    newSlot: string,
    warehouseId: string
  };
  isCreate: boolean;
  handleDateChange: (value: Date | null, values: ValuesProps) => void;
  handleNewDateChange: (value: Date | null, values: ValuesProps) => void;
  toggleModal: () => void;
  modalOpen: boolean;
  customersList: CustomersListIProps[];
  handleReset: () => void;
  place: string | null
  handlePlace: (values: string|null) => void;
}