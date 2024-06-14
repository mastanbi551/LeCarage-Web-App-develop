export interface ErrDetails {
  detail: {
    code: string;
    message: string;
  };
}
export interface CommonState {
  isLoading: boolean;
  dataLoading: boolean;


  isLoggedIn: boolean;
  WarehousesList: warehouseLocationIProps[];
  statusList: StatusIProps[];
  userTypesList: UserTypesIProps[];
}

export interface UserTypesIProps {
  label: string;
  value: string
}
export interface warehouseLocationIProps {
  label: string;
  value: string
}

export interface StatusIProps {
  label: string;
  value: string
}