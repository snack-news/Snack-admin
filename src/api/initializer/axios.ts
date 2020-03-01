import axios, { AxiosRequestConfig } from "axios";
import { IServiceResponse } from "@/@types/utility/ajax";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<IServiceResponse<T>> {
  try {
    const { data } = await axiosInstance.request<T>(config);
    return {
      data,
      isSuccess: true,
    };
  } catch (e) {
    return {
      data: null,
      isSuccess: false,
      message: ""
    }
  }
}

export default axiosInstance;
