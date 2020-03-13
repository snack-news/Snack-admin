<template>
  <div class="new-bulk-article">
    <custom-title title="에디터 어드민 - 링크 업로드" />
    <form @submit.prevent="onSubmitHandler" @reset.prevent="onCancelHandler">
      <div class="new-bulk-article__button-wrapper">
        <custom-button :type="'reset'" :size="'m'" :color="'type03'">
          취소
        </custom-button>
        <custom-button :type="'submit'" :size="'m'">
          업로드 하기
        </custom-button>
      </div>
      <div class="new-bulk-article__table">
        <table>
        <thead>
          <tr>
            <th>링크</th>
            <th>카테고리</th>
            <th>토픽</th>
            <th>업로드날짜</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(content, index) in contents" :key="content.title">
            <article-bulk-column
              :options="options"
              @onChange="(value) => onChangeHandler(index, value)"
              @onClick="() => onDeleteColumn(index)"
            />
          </tr>
        </tbody>
      </table>
      </div>
    </form>
    <custom-button :type="'button'"
                   :size="'m'"
                   :wide="true"
                   @click="onAddColumn"
                   :inline-style="{ marginTop: '20px' }">
      ADD
    </custom-button>
  </div>
</template>

<script lang="ts">

  import { Component, Vue } from "vue-property-decorator";
  import CustomTitle from "@/components/Utils/CustomTitle/CustomTitle.vue";
  import CustomButton from "@/components/Utils/CustomButton/CustomButton.vue";
  import ArticleBulkColumn from "@/views/News/ArticleBulkColumn.vue";
  import { fetchCategoryList } from "@/api/category";
  import { ISelectComponentOption } from "@/@types/utility/components";
  import { createArticleList } from "@/api/news";
  @Component({
    components: {
      CustomButton,
      CustomTitle,
      ArticleBulkColumn
    }
  })
  export default class ArticleBulkCreate extends Vue {
    options: ISelectComponentOption[] = [];
    contents: any[] = [];
    async mounted () {
      const response = await fetchCategoryList();
      if (response.isSuccess) {
        this.options = response.data.options;
      }
    }
    onAddColumn () {
      const children = this.$children.filter((component) => {
        if (component.validate) {
          console.log(component);
        }
      });
      this.contents.push([]);
    }
    onDeleteColumn (index: number) {
      this.contents.splice(index, 1);
    }
    onChangeHandler (index: number, value: string) {
      this.contents.splice(index, 1, value);
    }
    async onSubmitHandler () {
      const response = await createArticleList(this.contents);
    }
    onCancelHandler () {

    }
  }
</script>

<style lang="scss" scoped>
  .new-bulk-article {
    .new-bulk-article__button-wrapper {
      margin-bottom: 30px;
      text-align: right;
      /deep/ .custom-button {
        min-width: 200px;
      }
      /deep/ .is-type03 {
        margin-right: 18px;
      }
    }
    .new-bulk-article__table {
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
  }
</style>
