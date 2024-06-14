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
  export interface OtpVerifyResponse {
    responseData: {
      status: string;
      details: [];
      errDescription: string;
      errDetails: ErrDetails;
    };
    isLoading: boolean;
    userEmailId: string;
    uId: string;
    loadingResponse: boolean;
  }
