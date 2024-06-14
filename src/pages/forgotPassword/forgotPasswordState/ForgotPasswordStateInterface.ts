export interface Detail {
    uId: string;
    message: string;
  }
  export interface ErrDetails {
    detail: {
      code: string;
      message: string;
    };
  }
  export interface ForgotPasswordResponse {
    responseData: {
      status: string;
      details: Detail[];
      errDescription: string;
      errDetails: ErrDetails;
    };
    isLoading: boolean;
    userEmailId: string;
    uId: string;
    loadingResponse: boolean;
  }
