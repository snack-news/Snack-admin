<template>
  <div class="picks-table">
    <table>
      <thead>
      <tr>
        <th scope="col">번호</th>
        <th scope="col">카테고리</th>
        <th scope="col">토픽</th>
        <th scope="col">링크</th>
        <th scope="col">생성일</th>
        <th scope="col">수정일</th>
        <th scope="col">업로드 예약일</th>
        <th scope="col">수정/삭제</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in picks" :key="item.key">
        <td>{{ item.id }}</td>
        <td>{{ item.categoryId }}</td>
        <td>
            <span v-for="(topic, index) in item.topics" :key="topic.id">
              <template v-if="index !== 0">,</template>{{ topic.name }}
            </span>
        </td>
        <td>{{ item.link }}</td>
        <td>{{ item.createAt | dateFormat }}</td>
        <td>{{ item.modifiedAt | dateFormat }}</td>
        <td>{{ item.publishAt | dateFormat }}</td>
        <td>
          <router-link class="edit-button" :to="{ name: 'ArticleEdit', params: { id: item.id } }">수정</router-link>
          <button class="delete-button" type="button" @click="() => onDeleteHandler(item.id)">삭제</button>
        </td>
      </tr>
      <tr v-if="!picks.length">
        <td colspan="9" class="is-empty">생성된 뉴스가 없습니다.</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { IPickContent } from "@/@types/models/Picks";

  @Component
  export default class PicksTable extends Vue {
    @Prop() picks!: IPickContent[];
    onDeleteHandler (id: number) {
      this.$emit('onDeleteHandler', id);
    }
  }
</script>
<style lang="scss" scoped>
  .picks-table {
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
