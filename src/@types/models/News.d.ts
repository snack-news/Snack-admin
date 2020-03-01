import { INullable } from "@/@types/utility";

export interface INewsContent {
  createAt: string;
  modifiedAt: string;
  id: number;
  title: string;
  content: string;
  link: INullable<string>;
  category: ICategory;
  topics: ITopic[];
  tags: ITag[];
  publishAt: INullable<string>;
}

interface ITag {
  id: number;
  title: string
}

export interface ICategory {
  id: number;
  title: string;
}

export interface ITopic {
  id: number;
  type: string;
  name: string;
  image: null;
}
