<template>
  <b-container>
    <div class="article-list">
      <custom-title title="에디터 어드민" />
      <!-- 탭 영역 -->
      <ul>
        <li><router-link :to="{ query: { type: 'news' }}">news(소식)</router-link></li>
        <li><router-link :to="{ query: { type: 'sub-news' }}">news(관련 소식)</router-link></li>
        <li><router-link  :to="{ query: { type: 'picks' }}">picks(아티클)</router-link></li>
      </ul>
      <!-- // 탭 영역 -->
      <!-- 버튼 영역 -->
      <div class="article-list__button-wrapper">
        <custom-button>소식 작성</custom-button>
      </div>
      <!-- // 버튼 영역 -->
      <article-list-table />
      <b-pagination v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    :align="'center'"
                    aria-controls="my-table" />
    </div>
  </b-container>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import CustomTitle from "@/components/Utils/CustomTitle/CustomTitle.vue";
  import ArticleListTable from "@/components/ArticleListTable/ArticleListTable.vue";
  import CustomButton from "@/components/Utils/CustomButton/CustomButton.vue";
  import { Route } from "vue-router";
  import { Next } from "@/@types/library/vue-router";


  Component.registerHooks([
    'beforeRouteEnter',
  ]);
  @Component({
    components: {
      CustomButton,
      CustomTitle,
      ArticleListTable
    }
  })
  export default class ArticleList extends Vue {
    currentPage: number;
    rows: number;
    perPage: number;

    constructor () {
      super();
      this.currentPage = 1;
      this.rows = 100;
      this.perPage = 10;
    }
    created () {
      if (!this.$route.query.type) {
        this.$router.replace({ query: { type: 'news' }});
      }
    }

  }
</script>
<style lang="scss" scoped>
  .article-list {
    position: relative;
    ul {
      overflow: hidden;
      margin-bottom: 63px;
      li {
        float: left;
        margin-right: 26px;
        a {
          font-size: 22px;
          font-weight: normal;
          color: #c8c5c5;
          &.router-link-exact-active {
            color: #0f0f0f;
          }
        }
      }
    }
    .article-list__button-wrapper {
      margin-bottom: 92px;
      text-align: right;
    }
    .article-list__pagination-wrapper {
      text-align: center;
    }
  }
</style>
