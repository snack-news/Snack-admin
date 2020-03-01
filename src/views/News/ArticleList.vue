<template>
  <div class="article-list">
    <custom-title title="에디터 어드민" />
    <!-- 탭 영역 -->
    <Tab />
    <!-- // 탭 영역 -->
    <!-- 버튼 영역 -->
    <div class="article-list__button-wrapper">
      <router-link :to="{ name: 'ArticleCreate' }">소식 작성</router-link>
    </div>
    <!-- // 버튼 영역 -->
    <article-list-table :news="items"
                        @onDeleteHandler="deleteNewsAction"/>
    <b-pagination v-model="currentPage"
                  :total-rows="totalPage"
                  :per-page="perPage"
                  :align="'center'"
                  aria-controls="my-table" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { Action, State } from "vuex-class";
  import CustomTitle from "@/components/Utils/CustomTitle/CustomTitle.vue";
  import ArticleListTable from "@/components/ArticleListTable/ArticleListTable.vue";
  import CustomButton from "@/components/Utils/CustomButton/CustomButton.vue";
  import { INewsContent } from "@/@types/models/News";
  import { Route } from "vue-router";
  import { Next } from "@/@types/library/vue-router";
  import Tab from "@/components/Article/Common/Tab.vue";

  Component.registerHooks([
    'beforeRouteEnter',
  ]);
  @Component({
    components: {
      Tab,
      CustomButton,
      CustomTitle,
      ArticleListTable
    }
  })
  export default class ArticleList extends Vue {
    currentPage: string;
    perPage: number;
    @Prop() page!: string;
    @Prop() type!: string;

    constructor () {
      super();
      this.currentPage = this.page;
      this.perPage = 10;
    }
    beforeRouteEnter (to: Route, from: Route, next: Next) {
      next(async vm => {
        const page = (<string>vm.$route.query.page);
        const type = (<string>vm.$route.query.type);
        // @ts-ignore
        vm.fetchNewsListAction({ page, type });
      })
    }
    @Action('news/fetchNewsListAction') fetchNewsListAction!: (args: any) => Promise<void>;
    @Action('news/deleteNewsAction') deleteNewsAction!: (id: number) => Promise<void>;
    @State(state => state.news.items) items!: INewsContent[];
    @State(state => state.news.totalItemCount) totalPage!: number;
    @Watch('$route')
    async onChangeRoute (route: Route) {
      const page = (<string>route.query.page);
      const type = (<string>route.query.type);
      await this.fetchNewsListAction({ page, type });
    }
    @Watch('currentPage')
    onChangeCurrentPage (page: number) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: page.toString()
        }
      });
    }
    getRouteLink (type: string) {
      return {
        query: {
          ...this.$route.query,
          type,
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .article-list {
    position: relative;
    .article-list__button-wrapper {
      margin-bottom: 92px;
      text-align: right;
      a {
        padding: 13px 31px 11px;
        font-size: 18px;
        color: #fff;
        background-color: #3559e4;
      }
    }
    .article-list__pagination-wrapper {
      text-align: center;
    }
  }
</style>
