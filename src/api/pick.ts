import { IServiceResponse } from "@/@types/utility/ajax";
import axiosInstance, { apiRequest } from "@/api/initializer/axios";

export const fetchPickList = (): Promise<IServiceResponse<IPageableContent<IPeekContent>>> => apiRequest<IPageableContent<IPeekContent>>({
  method: "GET",
  url: "/api/picks"
});
