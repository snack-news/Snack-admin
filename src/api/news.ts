import { IServiceResponse } from "@/@types/utility/ajax";
import { ICreateNewsParams, IUpdateNewsParams } from "@/api/types/news";
import axiosInstance, { apiRequest } from "@/api/initializer/axios";
import { INewsContent } from "@/@types/models/News";
import { INullable } from "@/@types/utility";

export const fetchNewsList = (page: number): Promise<IServiceResponse<IPageableContent<INewsContent>>> => apiRequest<IPageableContent<INewsContent>>({
  method: "GET",
  url: `/admin/api/news/${page}`
});

function generateTopicList (topic: string = "") {
  return topic.length > 0 ? topic.split(",").map(v => v.trim()) : [];
}

export async function createNews (params: ICreateNewsParams): Promise<IServiceResponse<null>> {
  try {
    const topicNames = generateTopicList(params.topic);
    await axiosInstance.post("/admin/api/news", [{ ...params, topicNames }]);
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

interface ICreateNewsList {
  categoryId: number;
  topic: string;
  link: string;
  createdAt: INullable<Date>;
}

export const createArticleList = (params: ICreateNewsList[]): Promise<IServiceResponse<null>> => {
  const _payload = params.map(param => ({
    ...param,
    topicNames: generateTopicList(param.topic)
  }));
  return apiRequest({
    method: "POST",
    url: "/admin/api/news",
    data: _payload
  })
};

export const deleteArticle = (newsId: number): Promise<IServiceResponse<null>> => apiRequest({
  method: "DELETE",
  url: `/admin/api/news/${newsId}`
});

export const updateArticle = async ({ id, ...payload }: IUpdateNewsParams): Promise<IServiceResponse<null>> => {
  const topicNames = generateTopicList(payload.topic);
  return await apiRequest({
    method: "PUT",
    url: `/admin/api/news/${id}`,
    data: {
      ...payload,
      topicNames
    }
  });
};
