<template>
  <div class="article-list">
    <custom-title title="에디터 어드민" />
    <!-- 버튼 영역 -->
    <div class="article-list__button-wrapper">
      <router-link :to="{ name: 'ArticleCreate' }">소식 작성</router-link>
      <router-link :to="{ name: 'ArticleBulkCreate' }">링크 업로드 하기</router-link>
    </div>
    <!-- // 버튼 영역 -->
    <div class="article-list__table">
      <table>
        <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">TOP</th>
          <th scope="col">카테고리</th>
          <th scope="col">토픽(회사)</th>
          <th scope="col">제목</th>
          <th scope="col">생성일</th>
          <th scope="col">수정일</th>
          <th scope="col">업로드 예약일</th>
          <th scope="col">수정/삭제</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items" :key="item.key">
          <td>{{ item.id }}</td>
          <td>TOP</td>
          <td>{{ item.category.title }}</td>
          <td>
            <span v-for="(topic, index) in item.topics" :key="topic.id">
              <template v-if="index !== 0">,</template>{{ topic.name }}
            </span>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.createAt | dateFormat }}</td>
          <td>{{ item.modifiedAt | dateFormat }}</td>
          <td>{{ item.publishAt | dateFormat }}</td>
          <td>
            <router-link class="edit-button" :to="{ name: 'ArticleEdit', params: { id: item.id } }">수정</router-link>
            <button class="delete-button" type="button" @click="() => deleteNewsAction(item.id)">삭제</button>
          </td>
        </tr>
        <tr v-if="items.length === 0">
          <td colspan="9" class="is-empty">생성된 뉴스가 없습니다.</td>
        </tr>
        </tbody>
      </table>
    </div>
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
  import CustomButton from "@/components/Utils/CustomButton/CustomButton.vue";
  import { INewsContent } from "@/@types/models/News";
  import { Route } from "vue-router";

  @Component({
    components: {
      CustomButton,
      CustomTitle,
    }
  })
  export default class ArticleList extends Vue {
    currentPage: string;
    perPage: number;
    @Prop() page!: string;

    constructor () {
      super();
      this.currentPage = this.page || "1";
      this.perPage = 10;
    }
    @Action('news/fetchNewsListAction') fetchNewsListAction!: (page: number) => Promise<void>;
    @Action('news/deleteNewsAction') deleteNewsAction!: (id: number) => Promise<void>;
    @State(state => state.news.items) items!: INewsContent[];
    @State(state => state.news.totalItemCount) totalPage!: number;
    @Watch('$route')
    async onChangeRoute (route: Route) {
      const page = route.params.page || "1";
      await this.fetchNewsListAction(Number(page));
    }
    @Watch('currentPage')
    onChangeCurrentPage (page: number) {
      this.$router.push({
        params: {
          page: page.toString()
        }
      });
    }
    async mounted () {
      const page = this.$route.query.page || "1";
      await this.fetchNewsListAction(Number(page));
    }
  }
</script>
<style lang="scss" scoped>
  .article-list {
    position: relative;
    .article-list__table {
      margin-bottom: 40px;
      table{
        text-align: left;
        thead {
          th {
            padding: 7px 5px;
            font-size: 18px;
            font-weight: normal;
            color: #0f0f0f;
          }
        }
        tbody {
          td {
            padding: 7px 5px;
            font-size: 14px;
            font-weight: normal;
            color: #0f0f0f;
            .delete-button {
              color: #f10202;
            }
            .edit-button {
              margin-right: 10px;
              color: #595858;
            }
            &.is-empty {
              padding: 40px 0;
              font-size: 16px;
              text-align: center;
            }
          }
        }
      }
    }
    .article-list__button-wrapper {
      margin-bottom: 92px;
      text-align: right;
      a {
        padding: 13px 31px 11px;
        font-size: 18px;
        color: #fff;
        background-color: #3559e4;
        &:nth-child(1) {
          margin-right: 10px;
        }
      }
    }
    .article-list__pagination-wrapper {
      text-align: center;
    }
  }
</style>
