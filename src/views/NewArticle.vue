<template>
  <b-container>
    <div class="new-article">
      <custom-title title="에디터 어드민 - 소식 작성" />
      <form>
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
        <custom-button :type="'submit'">
          작성 완료
        </custom-button>
      </form>
    </div>
  </b-container>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
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

    constructor () {
      super();
      this.title = "";
      this.date = "";
      this.link = "";
      this.topic = "";
    }

  }
</script>
<style lang="scss" scoped>

</style>
