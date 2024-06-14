export interface Detail {
    uid: string;
    token: string;

  }
  export interface ErrDetails {
    detail: {
      code: string;
      message: string;
    };
  }
  
  export interface LoginResponse {
    responseData: {
      status: string;
      details: {userDetails:{uId: string}, token:{accessToken: string, refreshToken: string}, message: string}[];
      errDescription: string;
      errDetails: ErrDetails;
    };
    isLoading: boolean;
    isAuth: boolean;
    emailId: string;
    uId: string;
    loadingResponse: boolean;
    userRole: string;
    userRoleList: [];
    warehouseLocation: string;
    isTokenExpired: boolean;
  }

  