<template>
  <div :class="[{ 'has-paragraph': paragraph.length > 0 }, 'input-form']">
    <label>
      <strong>{{ label }}</strong>
      <!-- 날짜 -->
      <date-picker v-if="type === 'date'"
                   v-model="localValue" />
      <!-- // 날짜 -->
      <select v-else-if="type === 'select'">
        <option :key="option.value" v-for="option in options" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <!-- 인풋 -->
      <input v-else
             :type="type"
             v-model="localValue" />
      <!-- // 인풋 -->
      <p v-if="paragraph.length > 0">{{ paragraph }}</p>
    </label>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop, Watch } from "vue-property-decorator";
  import DatePicker from "@/components/Utils/DatePicker/DatePicker.vue"

  @Component({
    components: { DatePicker }
  })
  export default class InputForm extends Vue {
    localValue: string;

    @Prop({ default: "text" }) type!: string;
    @Prop({ default: "" }) value!: string;
    @Prop({ default: "" }) label!: string;
    @Prop({ default: "" }) paragraph!: string;
    @Prop({ default: () => [] }) options!: { value: string; text: string; }[];

    constructor() {
      super();
      this.localValue = this.value;
    }

    @Watch("localValue")
    onChangeHandler(value: string) {
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
</style>
