import { IServiceResponse } from "@/@types/utility/ajax";
import { ICategory } from "@/@types/models/News";
import { apiRequest } from "@/api/initializer/axios";
import { IFetchCategoryList } from "@/api/types/category";

export const fetchCategoryList = async (): Promise<IServiceResponse<IFetchCategoryList>> => {
  const response = await apiRequest<ICategory[]>({
    url: "/api/category",
    method: "GET"
  });
  if (!response.isSuccess) {
    return response;
  }
  return {
    ...response,
    data: {
      options: response.data.map(({ id, title }) => ({
        value: id,
        text: title
      }))
    }
  }
};
