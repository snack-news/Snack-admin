import { IPickContent } from "@/@types/models/Picks";

interface IPicksResponse {
  data: IPickContent[];
  hasNext: boolean;
  empty: boolean;
}
