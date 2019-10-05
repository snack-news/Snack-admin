import axios from "axios";
import { OutputData } from "@editorjs/editorjs";
import { IContent, IPageable } from "@/@types/models/News";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/admin/api"
});

interface INewsListResponse {
  content: IContent[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: IPageable;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

interface IFetchNewsListParams {
  page: string;
  type: string;
}

export async function fetchNewsList ({ page }: IFetchNewsListParams): Promise<INewsListResponse> {
  const { data } = await axiosInstance.get<{ data: INewsListResponse }>(`/news/${page}`);

  return data.data;
}

interface ICreateNewsParams {
  title: string;
  date: string;
  topicLink: string;
  topic: string;
  category: string;
  contents: OutputData["blocks"];
  link: string;
  reservedDate: string;
}

export async function createNews (params: ICreateNewsParams) {
  const { data } = await axiosInstance.post("/news", params);

  return data;
}
