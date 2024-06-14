import { CarIProps } from '../manageCustomers/ManageCustomerContainer';

export interface ErrDetails {
    detail: ErrDetail
  }

export interface ErrDetail {
    code: string;
    message: string;
  }

// export interface CarInfoProps {
//     carId: string,
//     additionalNotes: string,
//     Make: string,
//     Color: string,
//     Model: string,
//     'Number Plate': string,
// }
  
  export interface CustomerManagementResponse {
    getCustomersIsLoading: boolean;
    getCustomersResponseData: {
      status: string;
      details: [];
      errDescription: string;
      errDetails: ErrDetails;
      message: string;
    };

    responseData: {
      status: string;
      details: [];
      errDescription: string;
      errDetails: ErrDetails;
    };
    isLoading: boolean;
  
    viewCustomerResponseData: {
        status: string,
        details: ViewCustomerInfoProps[],
        errDescription: string;
        errDetails: ErrDetails;
      },
      viewCustomerIsLoading: boolean,

      viewLinkedCustomerResponseData: {
        status: string,
        details: CarIProps[],
        errDescription: string;
        errDetails: ErrDetails;
      },
      linkedCarIsLoading: boolean,

      viewUnLinkedCustomerResponseData: {
        status: string,
        details: CarIProps[],
        errDescription: string;
        errDetails: ErrDetails;
      },
      unlinkedCarIsLoading: boolean,
    
      deleteCustomerResponseData: {
        status: string,
        details: [],
        errDescription: string;
        errDetails: ErrDetails;
      },
      deleteCustomerIsLoading: boolean,

      statusList: StatusIProps[],
      itemsPerPage: number;
  }

  export interface StatusIProps {
    label: string;
    value: string
  }

  export interface ViewCustomerInfoProps {
    uId: string,
    profile: {
      email: string,
      phoneNumber: string,
      password: string,
      firstName: string,
      lastName: string,      
      statusId: string,
      photoURL: string
    },
    address: [
      {
        addressId: string,
        addressLineOne: string,
        streetName: string,
        houseNumber: string,
        postalCode: string,
        cityName: string,
      },
    ],
    cars: [
      {
        carId: string,
        additionalNotes: string,
        Make: string,
        Color: string,
        Model: string,
        'Number Plate': string,
      },
    ],
  }