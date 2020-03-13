<template>
  <div class="picks">
    <custom-title title="에디터 어드민" />
    <!-- 탭 영역 -->
    <Tab />
    <!-- // 탭 영역 -->
    <!-- 버튼 영역 -->
    <div class="picks__button-wrapper">
      <router-link :to="{ name: 'ArticleCreate' }">소식 작성</router-link>
    </div>
    <!-- // 버튼 영역 -->
    <picks-table :picks="items"/>
    <b-pagination v-model="currentPage"
                  :per-page="perPage"
                  :align="'center'"
                  aria-controls="my-table" />
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  import Tab from "@/components/Article/Common/Tab.vue";
  import CustomTitle from "@/components/Utils/CustomTitle/CustomTitle.vue";
  import PicksTable from "@/components/Picks/PicksTable.vue";
  import CustomButton from "@/components/Utils/CustomButton/CustomButton.vue";
  import { fetchPickList } from "@/api/pick";
  import { IPickContent } from "@/@types/models/Picks";

  @Component({
    components: {
      Tab,
      PicksTable,
      CustomTitle,
      CustomButton,
    }
  })
  export default class Picks extends Vue {
    currentPage: number = 1;
    perPage: number = 10;
    items: IPickContent[] = [];
    @Prop() page!: string;
    @Prop() type!: string;

    async mounted () {
      console.log(this.items);
      const response = await fetchPickList();
      if (response.isSuccess) {
        this.items = response.data.data;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .picks {
    position: relative;
    .picks__button-wrapper {
      margin-bottom: 92px;
      text-align: right;
      a {
        padding: 13px 31px 11px;
        font-size: 18px;
        color: #fff;
        background-color: #3559e4;
      }
    }
    .picks__pagination-wrapper {
      text-align: center;
    }
  }
</style>
