// export interface Details {
//     userType: string;
//     warehouseLocation: string;
//     isDefault: boolean;
// }

export interface ErrDetails {
  detail: {
    code: string;
    message: string;
  };
}
export interface HeaderResponse {
  userRole: string | number;
  userRoleList: Details[];
  warehouseLocation: string | number;
  status: string;
  errDescription: string;
  errDetails: string;
  defaultUserType: Details[],
  responseData: {
    status: string;
    details: Details[];
    errDescription: string;
    errDetails: ErrDetails;
  };
  isLoading: boolean,
  defaultDetails: Details
  defaultUserTypeWarehouseDetails: Details[]
}

export interface Details {
  isDefault: boolean,
  userTypeLabel: string,
  userTypeValue: string | number,
  warehouseLabel: string,
  warehouseValue: string | number
}
