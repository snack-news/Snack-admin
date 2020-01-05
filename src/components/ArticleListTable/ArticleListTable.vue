<template>
  <div class="article-list-table">
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
        <tr v-for="item in news" :key="item.key">
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
            <router-link class="edit-button" :to="{ name: 'ArticleEditingForm', params: { id: item.id } }">수정</router-link>
            <button class="delete-button" type="button" @click="() => onDeleteHandler(item.id)">삭제</button>
          </td>
        </tr>
        <tr v-if="news.length === 0">
          <td colspan="9" class="is-empty">생성된 뉴스가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { IContent } from "@/@types/models/News";

  @Component
  export default class ArticleListTable extends Vue {
    @Prop() news!: IContent[];
    constructor () {
      super();
    }
    onDeleteHandler (id: number) {
      this.$emit('onDeleteHandler', id);
    }

  }
</script>
<style lang="scss" scoped>
  .article-list-table {
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
</style>
