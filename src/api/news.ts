import { IServiceResponse } from "@/@types/utility/ajax";
import { ICreateNewsParams, IFetchNewsListParams, INewsListResponse, IUpdateNewsParams } from "@/api/types/news";
import axiosInstance from "@/api/initializer/axios";


export async function fetchNewsList ({ page }: IFetchNewsListParams): Promise<INewsListResponse> {
  const { data } = await axiosInstance.get<{ data: INewsListResponse }>(`/admin/api/news/${page}`);

  return data.data;
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

export async function updateNews (payload: IUpdateNewsParams): Promise<IServiceResponse<null>> {
  try {
    const topicNames = generateTopicList(payload.topic);
    await axiosInstance.put(`/admin/api/news/${payload.id}`, {...payload, topicNames });
    return {
      data: null,
      isSuccess: true
    }
  } catch (e) {
    return {
      data: null,
      isSuccess: false,
      message: "잠시 후 다시 시도하세요.(E0004)"
    };
  }
}
