import { IServiceResponse } from "@/@types/utility/ajax";
import { ICategory } from "@/@types/models/News";
import axiosInstance from "@/api/initializer/axios";

export async function fetchCategoryList (): Promise<IServiceResponse<IFetchCategoryList>> {
  try {
    const { data } = await axiosInstance.get<{ data: ICategory[] }>("/api/category");

    return {
      data: {
        options: data.data.map(({ id, title }) => ({
          value: id,
          text: title
        }))
      },
      isSuccess: true,
    }
  } catch (e) {
    return {
      data: null,
      isSuccess: false,
      message: "잠시 후 다시 시도하세요.(E0002)"
    };
  }
}
