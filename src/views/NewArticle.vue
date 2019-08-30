<template>
  <b-container>
    <div class="new-article">
      <custom-title title="에디터 어드민 - 소식 작성" />
    </div>
  </b-container>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import CustomTitle from "@/components/Utils/CustomTitle/CustomTitle.vue";

  @Component({
    components: {
      CustomTitle
    }
  })/**/
  export default class NewArticle extends Vue {

    constructor () {
      super();
    }

  }
</script>
<style lang="scss" scoped>

</style>
