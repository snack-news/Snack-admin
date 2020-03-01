import { IServiceResponse } from "@/@types/utility/ajax";
import { apiRequest } from "@/api/initializer/axios";
import { IPicksResponse } from "@/api/types/Picks";

export const fetchPickList = (): Promise<IServiceResponse<IPicksResponse>> => apiRequest<IPicksResponse>({
  method: "GET",
  url: "/api/picks"
});
