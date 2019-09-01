<template>
  <div :class="[{ 'has-paragraph': paragraph.length > 0 }, 'input-form']">
    <label>
      <strong>{{ label }}</strong>
      <input :type="type"
             v-model="localValue" />
      <p v-if="paragraph.length > 0">{{ paragraph }}</p>
    </label>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

  @Component
  export default class InputForm extends Vue {
    localValue: string;

    @Prop({ default: "text" }) type!: string;
    @Prop({ default: "" }) value!: string;
    @Prop({ default: "" }) label!: string;
    @Prop({ default: "" }) paragraph!: string;
    constructor () {
      super();
      this.localValue = this.value;
    }

    @Watch("localValue")
    onChangeHandler (value: string) {
      this.$emit("input", value);
    }

  }
</script>
<style lang="scss" scoped>
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
      input {
        width: 100%;
        padding: 12px 18px;
        border: solid 1px #0f0f0f;
        font-size: 15px;
        color: #0f0f0f;
      }
      p {
        margin-top: 12px;
      }
    }
  }
</style>
