export type IServiceResponse<T> = IServiceSuccessResponse<T> | IServiceFailureResponse;

export interface IServiceSuccessResponse<T> {
  data: T;
  isSuccess: true;
}

export interface IServiceFailureResponse {
  data: null;
  isSuccess: false;
  message: string;
}
