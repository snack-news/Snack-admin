<template>
  <b-container>
    <div class="article-list">
      <custom-title tag="h3" title="에디터 어드민" />
      <article-list-table />
      <b-pagination v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table" />
    </div>
  </b-container>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import CustomTitle from "@/components/Utils/CustomTitle/CustomTitle.vue";
  import ArticleListTable from "@/components/ArticleListTable/ArticleListTable.vue";

  @Component({
    components: {
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

  }
</script>
<style lang="scss" scoped>

</style>
