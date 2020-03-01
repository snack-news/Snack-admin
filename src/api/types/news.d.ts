import { INullable } from "@/@types/utility";

export interface IFetchNewsListParams {
  page: string;
  type: string;
}

export type ICreateNewsParams = ICreateNewsMandatoryParams
  & Partial<ICreateNewsOptionalParams>;

interface ICreateNewsMandatoryParams {
  title: string;
  categoryId: number;
  content: string;
}

interface ICreateNewsOptionalParams {
  createdAt: INullable<Date>;
  topicLink: string;
  topic: string;
  link: string;
  publishAt: INullable<Date>;
}

export type IUpdateNewsParams = IUpdateNewsMandatoryParams & IUpdateNewsOptionalParams;

interface IUpdateNewsMandatoryParams {
  id: string;
  title: string;
  categoryId: string;
  content: string;
}

interface IUpdateNewsOptionalParams {
  modifiedAt: Date;
  topic: string;
}
