import { MutationTree } from "vuex";
import { INewsState } from "@/@types/store";
import { INewsContent } from "@/@types/models/News";

function setNewsItems (state: INewsState, payload: { items: INewsContent[]; totalItemCount: number; }) {
  state.items = payload.items;
  state.totalItemCount = payload.totalItemCount;
}

function deleteNewsItem (state: INewsState, id: number) {
  state.items = state.items.filter(item => item.id !== id);
  state.totalItemCount = state.totalItemCount - 1;
}

export default <MutationTree<INewsState>> {
  setNewsItems,
  deleteNewsItem
}
