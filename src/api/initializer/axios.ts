import axios, { AxiosRequestConfig } from "axios";
import { IServiceResponse } from "@/@types/utility/ajax";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<IServiceResponse<T>> {
  try {
    const { data } = await axiosInstance.request<{ data: T}>(config);
    return {
      data: data.data,
      isSuccess: true,
    };
  } catch (e) {
    return {
      data: null,
      isSuccess: false,
      message: e.message || "알 수 없는 오류가 발생하였습니다. 잠시 후 다시 시도하세요."
    }
  }
}

export default axiosInstance;
