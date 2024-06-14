export interface ErrDetails {
  detail: ErrDetail
}

export interface ErrDetail {
  code: string;
  message: string;
}

export interface CarManagementResponse {
  getCarsIsLoading: boolean;
  getCarsResponseData: {
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

  carMakeList: CarMakeIProps[];
  carModelList: CarMakeIProps[];
  carColorList: CarColorIProps[];
  carStatusList: CarStatusIProps[];

  viewCarResponseData: {
    status: string,
    details: {
      carId: string;
      carMakeId: string;
      carModelId: string;
      carColorId: string;
      fkiCarStatusId: string;
      licensePlateNumber: string;
      location: string;
      additionalNotes: string;
      photoURL: string;
      stalling: string;
    }[],
    errDescription: string,
    errDetails: {
      detail: {
        code: string,
        message: string,
      },
    },
  },
  viewCarIsLoading: boolean,

  deleteCarResponseData: {
    status: string,
    details: [],
    errDescription: string,
    errDetails: {
      detail: {
        code: string,
        message: string,
      },
    },
  },
  deleteCarIsLoading: boolean,
  itemsPerPage: number
}

export interface CarStatusIProps {
  label: string;
  value: string
}
export interface CarMakeIProps {
  label: string;
  value: string
}

export interface CarMakeModelsIProps {
  label: string;
  value: string
}

export interface CarColorIProps {
  label: string;
  value: string
}