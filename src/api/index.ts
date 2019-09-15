import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api"
});

interface IFetchNewsListParams {
  startDateTime: string;
  endDateTime: string;
}
export async function fetchNewsList (params: IFetchNewsListParams): Promise<INews[]> {
  const { data } = await axiosInstance.get<INews[]>("/news", { params });

  return data;
}

interface ICreateNewsParams {

}
export function createNews (params: ICreateNewsParams) {
  const title = "test";
  const content = "1111";
  const categoryId = "1";
  axiosInstance.post("/news", { title, content, categoryId })
  console.log(params);
}
