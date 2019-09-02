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
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>TOP</td>
          <td>카테고리</td>
          <td>토픽(회사)</td>
          <td>제목</td>
          <td>생성일</td>
          <td>수정일</td>
          <td>업로드 예약일</td>
          <td>
            <button type="button">삭제</button>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>TOP</td>
          <td>카테고리</td>
          <td>토픽(회사)</td>
          <td>제목</td>
          <td>생성일</td>
          <td>수정일</td>
          <td>업로드 예약일</td>
          <td>
            <button type="button">삭제</button>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>TOP</td>
          <td>카테고리</td>
          <td>토픽(회사)</td>
          <td>제목</td>
          <td>생성일</td>
          <td>수정일</td>
          <td>업로드 예약일</td>
          <td>
            <button type="button">삭제</button>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>TOP</td>
          <td>카테고리</td>
          <td>토픽(회사)</td>
          <td>제목</td>
          <td>생성일</td>
          <td>수정일</td>
          <td>업로드 예약일</td>
          <td>
            <button type="button">삭제</button>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>TOP</td>
          <td>카테고리</td>
          <td>토픽(회사)</td>
          <td>제목</td>
          <td>생성일</td>
          <td>수정일</td>
          <td>업로드 예약일</td>
          <td>
            <button type="button">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class ArticleListTable extends Vue {
    constructor () {
      super();
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
          button {
            color: #f10202;
          }
        }
      }
    }
  }
</style>
