import axios from "axios";
import { ICategory, IContent, IPageable } from "@/@types/models/News";
import { IServiceResponse } from "@/@types/utility/ajax";
import { INullable } from "@/@types/utility";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
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
  const { data } = await axiosInstance.get<{ data: INewsListResponse }>(`/admin/api/news/${page}`);

  return data.data;
}

type ICreateNewsParams = ICreateNewsMandatoryParams
  & Partial<ICreateNewsOptionalParams>;

interface ICreateNewsMandatoryParams {
  title: string;
  categoryId: number;
  content: string;
}

interface ICreateNewsOptionalParams {
  startDateTime: INullable<Date>;
  topicLink: string;
  topic: string;
  link: string;
  publishAt: INullable<Date>;
}

function generateTopicList (topic: string = "") {
  return topic.length > 0 ? topic.split(",").map(v => v.trim()) : [];
}

export async function createNews (params: ICreateNewsParams): Promise<IServiceResponse<null>> {
  try {
    const topicNames = generateTopicList(params.topic);
    await axiosInstance.post("/admin/api/news", { ...params, topicNames });
    return {
      data: null,
      isSuccess: true
    };
  } catch (e) {
    return {
      data: null,
      isSuccess: false,
      message: "잠시 후 다시 시도하세요. (E0001)"
    };
  }
}

export async function fetchCategoryList (): Promise<IServiceResponse<ICategory[]>> {
  try {
    const { data } = await axiosInstance.get<{ data: ICategory[] }>("/api/category");

    return {
      data: data.data,
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

export async function deleteNews (newsId: number): Promise<IServiceResponse<null>> {
  try {
    await axiosInstance.delete(`/admin/api/news/${newsId}`);
    return {
      data: null,
      isSuccess: true
    }
  } catch (e) {
    return {
      data: null,
      isSuccess: false,
      message: "잠시 후 다시 시도하세요.(E0002)"
    };
  }
}
