<template>
  <div class="new-article">
    <custom-title title="에디터 어드민 - 소식 수정" />
    <form @submit.prevent="onSubmitHandler" @reset.prevent="onCancelHandler">
      <!-- 입력 폼 레이아웃 -->
      <div class="new-article__form-layout">
        <div class="input-form has-paragraph">
          <label>
            <strong>제목</strong>
            <input type="text" v-model="title" />
            <p>가이드 : N자가 넘어가면 모바일에서 줄바꿈이 많이 일어나니 참고해주세요.</p>
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>날짜</strong>
            <date-picker v-model="createdAt" :disabled="true"/>
          </label>
        </div>

        <div class="input-form">
          <label>
            <strong>카테고리</strong>
            <select v-model="categoryId">
              <option :key="option.value" v-for="option in options" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>토픽(회사)</strong>
            <input type="text" v-model="topic" />
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>본문</strong>
            <editor v-model="content" />
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>참고 링크</strong>
            <input type="text" v-model="link" />
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>예약업로드</strong>
            <date-picker v-model="publishAt" :type="'datetime'" :format="'YYYY-MM-DD [at] HH:mm'"/>
            <p>설정한 날짜에 업로드 됩니다.</p>
          </label>
        </div>
      </div>
      <!-- // 입력 폼 레이아웃 -->
      <!-- 미리보기 레이아웃 -->
      <div class="new-article__preview-layout">
        <strong>가이드 이미지 보기</strong>
        <div></div>
      </div>
      <!-- // 미리보기 레이아웃 -->
      <!-- 버튼 레이아웃 -->
      <div class="new-article__button-layout">
        <custom-button :type="'submit'" :size="'l'">
          작성 완료
        </custom-button>
        <custom-button :type="'reset'" :size="'l'" :color="'type03'">
          취소
        </custom-button>
      </div>
      <!-- // 버튼 레이아웃 -->
    </form>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import { Action, State } from "vuex-class";
  import DatePicker from "@/components/Utils/DatePicker/DatePicker.vue";
  import CustomTitle from "@/components/Utils/CustomTitle/CustomTitle.vue";
  import Editor from "@/components/Editor.vue";
  import CustomButton from "@/components/Utils/CustomButton/CustomButton.vue";
  import { INullable } from "@/@types/utility";
  import { OutputData } from "@editorjs/editorjs/types/data-formats/output-data";
  import { INewsContent } from "@/@types/models/News";
  import { fetchCategoryList } from "@/api/category";

  @Component({
    components: {
      CustomButton,
      CustomTitle,
      DatePicker,
      Editor
    }
  })
  export default class ArticleEdit extends Vue {
    title: string;
    createdAt: INullable<Date>;
    link: INullable<string>;
    topic: string;
    options: { value: number; text: string; }[];
    publishAt: INullable<Date>;
    content: OutputData["blocks"];
    output: string;
    categoryId: number;
    constructor() {
      super();
      this.title = "";
      this.createdAt = null;
      this.link = "";
      this.topic = "";
      this.publishAt = null;
      this.options = [];
      this.content = [];
      this.output = "";
      this.categoryId = 0;
    }
    @Prop() id!: string;
    @State(state => state.news.items) items!: INewsContent[];
    @Action("news/updateNewsAction") updateNewsAction!: (payload: any) => void;

    async created () {
      this.items.map(({ id, title, content, link, publishAt, topics, category }) => {
        if (id === Number(this.id)) {
          this.title = title;
          this.content = JSON.parse(content);
          this.link = link;
          this.publishAt = publishAt ? new Date(publishAt) : null;
          this.topic = topics.map(({ name }) => name).join(",");
          console.log(category.id);
          this.categoryId = category.id;
        }
      });
      const response = await fetchCategoryList();
      if (response.isSuccess) {
        this.options = response.data.options;
      } else {
        alert(response.message);
      }
    }

    async onSubmitHandler (): Promise<void> {
      this.updateNewsAction({
        id: this.id,
        title: this.title,
        topic: this.topic,
        categoryId: this.categoryId,
        publishAt: this.publishAt,
        content: JSON.stringify(this.content),
        link: this.link
      });
    }
  }
</script>
<style lang="scss" scoped>
  .new-article {
    form {
      .new-article__form-layout {
        float: left;
        width: calc(100% - 370px);
        .input-form {
          margin-bottom: 32px;
          &.has-paragraph {
            margin-bottom: 24px;
          }
          label {
            position: relative;
            display: block;
            padding-left: 108px;
            strong {
              position: absolute;
              left: 0;
              top: 2px;
              font-size: 22px;
              font-weight: normal;
              color: #0f0f0f;
            }
            input, select {
              width: 100%;
              height: 48px;
              padding: 12px 18px;
              border: solid 1px #0f0f0f;
              font-size: 15px;
              color: #0f0f0f;
              -webkit-appearance: none;
              -webkit-border-radius: 0px;
              background: none;
            }
            p {
              margin-top: 12px;
              /deep/ a {
                color: #1716ff
              }
            }
          }
          /deep/ .mx-datepicker {
            width: 100%;
            input {
              width: 100%;
              height: 48px;
              border-radius: 0;
              padding: 12px 18px;
              border: solid 1px #0f0f0f;
              font-size: 15px;
              color: #0f0f0f;
            }
          }
        }
      }
      .new-article__preview-layout {
        width: 307px;
        float: right;
        strong {
          display: block;
          margin-bottom: 34px;
          font-size: 15px;
          font-weight: normal;
          color: #0f0f0f;
        }
        div {
          background-color: #b7b7b7;
          height: 909px;
        }
      }
      .new-article__button-layout {
        clear: both;
        text-align: center;
        /deep/ .custom-button {
          &.is-type01 {
            margin-right: 23px;
          }
        }
      }
    }
  }
</style>
