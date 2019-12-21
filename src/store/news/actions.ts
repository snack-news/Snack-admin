import { ActionContext, ActionTree } from "vuex";
import { INewsState, IRootState } from "@/@types/store";
import { deleteNews, fetchNewsList } from "@/api";

type NewsContext = ActionContext<INewsState, IRootState>;

async function fetchNewsListAction ({ commit }: NewsContext, params: { page: string; type: string }) {
  const { content, totalElements } = await fetchNewsList(params);
  commit("setNewsItems", { items: content, totalItemCount: totalElements });
}

async function deleteNewsAction ({ commit, state }: NewsContext, id: number) {
  if (!confirm("정말 삭제하시겠습니까?")) { return; }
  const response = await deleteNews(id);
  if (response.isSuccess) {
    commit("deleteNewsItem", id);
    alert("삭제가 완료되었습니다.");
  } else {
    alert(response.message);
  }
}
export default <ActionTree<INewsState, IRootState>> {
  fetchNewsListAction,
  deleteNewsAction,
}
