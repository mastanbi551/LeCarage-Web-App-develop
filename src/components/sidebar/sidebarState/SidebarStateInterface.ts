export interface SidebarResponse {
    status: string;
    routes: {
      string: MenuDetails[];
    }[];
    errDescription: string;
    errDetails: string;
    isLoading: boolean;
    responseData: {
        status: string,
        details: Details[],
        errDescription: string,
        errDetails: ErrDetails
      },
    MenusList: [];
}

export interface ErrDetails {
  detail: {
    code: string;
    message: string;
  };
}

export interface MenuDetails {
  accessId: number,
  featureAccess: string,
  isParent: boolean,
  label: string,
  parentFeature: string,
  value: number
}

export interface Details {
  mainNavMenus: MenuDetails[],
  subNavMenus: {
    string: MenuDetails[];
  }[];
}

