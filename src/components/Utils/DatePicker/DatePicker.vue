<template>
  <div>
    <vue-date-picker v-model="selectedDate"
                     :lang="language"
                     :type="type"
                     :time-picker-options="timePickerOptions"
                     :format="format"
                     :disabled="disabled"/>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch, Prop } from "vue-property-decorator";
  import VueDatePicker from "vue2-datepicker";
  import { INullable } from "@/@types/utility";

  @Component({
    components: {
      VueDatePicker
    }
  })
  export default class DatePicker extends Vue {
    @Prop() value!: INullable<Date>;
    @Prop({ default: "YYYY-MM-DD" }) format!: string;
    @Prop({ default: "" }) type!: "" | "datetime";
    @Prop({ default: false }) disabled!: boolean;

    selectedDate: INullable<Date>;
    language: VueDatePicker.Lang;
    timePickerOptions: {
      start: string;
      step: string;
      end: string;
    };

    constructor() {
      super();
      this.selectedDate = null;
      this.language = {
        days: ["일", "월", "화", "수", "목", "금", "토"],
        months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        pickers: ["next 7 days", "next 30 days", "previous 7 days", "previous 30 days"],
        placeholder: {
          date: "날짜를 선택해주세요.",
          dateRange: "Select Date Range"
        }
      };
      this.timePickerOptions = {
        start: '00:00',
        step: '00:30',
        end: '23:30'
      };
    }
    created () {
      if (!this.value) {
        this.selectedDate = new Date();
        return;
      }
      this.selectedDate = this.value;
    }

    @Watch("selectedDate")
    updateSelectedDate(value: Date) {
      this.$emit("input", value);
    }

  }
</script>
<style lang="scss" scoped>
</style>
