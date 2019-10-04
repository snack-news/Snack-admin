import { INullable } from "@/@types/utility";

export interface IContent {
  createAt: string;
  modifiedAt: string;
  id: number;
  title: string;
  content: string;
  link: INullable<string>;
  category: {
    id: number;
    title: string;
  };
  topics: ITopic[];
  tags: {
    id: number;
    title: string
  }[];
  publishAt: INullable<string>;
}

export interface ITopic {
  id: number;
  type: string;
  name: string;
  image: null;
}

export interface IPageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  unpaged: boolean;
}
