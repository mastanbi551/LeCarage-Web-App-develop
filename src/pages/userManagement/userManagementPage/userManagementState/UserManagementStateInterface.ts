
export interface Detail {
  userType: string;
  uId: string;
  displayName: string;
  fkiUserStatusId: string;
}
export interface ErrDetails {
  detail: {
    code: string;
    message: string;
  };
}

export interface UserIProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  uId: string;
  userStatusId: string;
  userTypeId: string;
  password: string;
}
export interface UserManagementResponse {
  getUsersIsLoading: boolean;
  getUsersResponseData: {
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

  viewUserResponseData: {
    status: string;
    details: UserIProps[];
    errDescription: string;
    errDetails: ErrDetails;
  };
  viewUserIsLoading: boolean;

  onDeleteResponseData: {
    status: string;
    details: [];
    errDescription: string;
    errDetails: ErrDetails;
  };
  onDeleteIsLoading: boolean;
  itemsPerPage: number;
}
