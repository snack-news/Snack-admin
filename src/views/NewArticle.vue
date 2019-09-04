<template>
  <div class="new-article">
    <custom-title title="에디터 어드민 - 소식 작성" />
    <form>
      <!-- 입력 폼 레이아웃 -->
      <div class="new-article__form-layout">
        <input-form v-model="title"
                    label="제목"
                    paragraph="가이드 : N자가 넘어가면 모바일에서 줄바꿈이 많이 일어나니 참고해주세요." />
        <input-form v-model="date"
                    label="날짜"
                    paragraph="가이드 : 발행하는 '주(week)'를 위해 설정하는 작업입니다. 선택 안할 시 디폴트는 작성 완료 시간 및 해당 주입니다." />
        <input-form v-model="date"
                    label="토픽(회사)"
                    paragraph="제한은 없으나, 가이드를 참조해주세요." />
        <input-form v-model="link"
                    label="참고 링크"
                    paragraph="가이드 : 이 소식을 작성하기 위해 참고한 뉴스링크나 소식링크가 있으면 적어주세요. 없으면 UI에 나타나지 않습니다." />
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
        <custom-button :type="'cancel'" :size="'l'" :color="'type03'">
          취소
        </custom-button>
      </div>
      <!-- // 버튼 레이아웃 -->
    </form>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import CustomTitle from "@/components/Utils/CustomTitle/CustomTitle.vue";
  import InputForm from "@/components/Utils/InputForm/InputForm.vue";
  import CustomButton from "@/components/Utils/CustomButton/CustomButton.vue";

  @Component({
    components: {
      CustomButton,
      InputForm,
      CustomTitle
    }
  })
  export default class NewArticle extends Vue {
    title: string;
    date: string;
    link: string;
    topic: string;

    constructor() {
      super();
      this.title = "";
      this.date = "";
      this.link = "";
      this.topic = "";
    }

  }
</script>
<style lang="scss" scoped>
  .new-article {
    form {
      .new-article__form-layout {
        float: left;
        width: calc(100% - 370px);
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
