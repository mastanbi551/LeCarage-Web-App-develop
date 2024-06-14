export interface ErrDetails {
  detail: ErrDetail;
}
export interface UserTypeProps {
  Description: string;
  Status: string;
  'User Type': string;
  'User Type ID': string;
}
export interface ErrDetail {
  code: string;
  message: string;
}

export interface ViewUserTypeDetails {
  userTypeId: string;
  userType: string;
  description: string;
  statusId: string;
  features: {
    featureId: string;
    accessId: string;
  }[];
}
export interface UserTypeManagementResponse {
  getUserTypesIsLoading: boolean;
  getUserTypesResponseData: {
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

  userTypeDropDownData: userTypeDropDownData[];
  featureList: featuresIProps[];
  featureAccessList: featureAccessIProps[];

  viewUserTyperesponseData: {
    status: string;
    details: ViewUserTypeDetails[];
    errDescription: string;
    errDetails: ErrDetails;
  };
  viewUserTypeIsLoading: boolean;

  deleteUsertypeResponseData: {
    status: string;
    details: [];
    errDescription: string;
    errDetails: ErrDetails;
  };
  deleteUserTypeIsLoading: boolean;
  itemsPerPage: number
}

export interface featuresIProps {
  label: string;
  value: string;
  parentFeature: string;
  parentFeatureId: string;
}

export interface featureAccessIProps {
  label: string;
  value: string;
}

export interface userTypeDropDownData {
  label: string;
  value: string;
}
