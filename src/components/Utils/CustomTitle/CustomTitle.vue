<template>
  <component :is="tag" class="custom-title">
    {{ title }}
  </component>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class CustomTitle extends Vue {
    @Prop(({ default: "h1" })) tag!: string;
    @Prop() title!: string;
  }
</script>
<style lang="scss" scoped>
  .custom-title {
    margin: 0 0 48px 0;
    font-size: 28px;
    font-weight: bold;
    color: #0f0f0f;
  }
</style>
