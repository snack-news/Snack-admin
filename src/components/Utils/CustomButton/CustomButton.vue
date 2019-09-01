<template>
  <button :style="inlineStyle" :class="[`is-${color}`,`is-size-${size}`, 'custom-button']" :type="type">
    <slot />
  </button>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class CustomButton extends Vue {
    @Prop({ default: "button" }) type!: string;
    @Prop({ default: "type01" }) color!: string;
    @Prop({ default: "m" }) size!: string;
    @Prop() inlineStyle!: string;

    constructor () {
      super();
    }

  }
</script>
<style lang="scss" scoped>
  .custom-button {
    /* 사이즈 관련 스타일 정의 */
    &.is-size-m {
      padding: 13px 31px 11px;
      font-size: 18px;
    }
    &.is-size-l {
      min-width: 201px;
      padding: 20px 45px 18px;
      font-size: 28px;
    }
    /* 스타일 관련 스타일 정의 */
    &.is-type01 {
      color: #fff;
      background-color: #3559e4;
    }
    &.is-type02 {
      color: #fff;
      background-color: #0f0f0f;
    }
    &.is-type03 {
      color: #fff;
      background-color: #bbaeae;
    }
  }
</style>
