<template>
  <fragment>
    <td>
      <input type="text"
             v-model="title"
             @change="onChangeHandler" />
    </td>
    <td>
      <input type="text"
             v-model="link"
             @change="onChangeHandler" />
    </td>
    <td>
      <select v-model="category" @change="onChangeHandler">
        <option :key="option.text" v-for="option in options" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </td>
    <td>
      <input type="text"
             v-model="topic"
             @change="onChangeHandler"/>
    </td>
    <td>
      <date-picker
        v-model="createdAt"
        :type="'datetime'"
        :format="'YYYY-MM-DD [at] HH:mm'"
        @change="onChangeHandler"
      />
    </td>
    <td>
      <button type="button" @click="onClickHandler">
        삭제
      </button>
    </td>
  </fragment>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import { ISelectComponentOption } from "@/@types/utility/components";
  // @ts-ignore
  import { Fragment } from "vue-fragment";
  import DatePicker from "@/components/Utils/DatePicker/DatePicker.vue";
  import { INullable } from "@/@types/utility";
  @Component({
    components: {
      Fragment,
      DatePicker
    }
  })
  export default class ArticleBulkColumn extends Vue {
    @Prop() options!: ISelectComponentOption[];

    title: string = "";
    link: string = "";
    category: string | number = "";
    topic: string = "";
    createdAt: INullable<Date> = null;
    mounted () {
      this.category = <number>this.options[0].value;
    }

    onChangeHandler () {
      this.$emit("onChange", {
        title: this.title,
        link: this.link,
        categoryId: this.category,
        topic: this.topic,
        createdAt: this.createdAt
      });
    }
    onClickHandler () {
      this.$emit("onClick");
    }
    validate () {
      if (this.link === "") {
        alert("링크를 입ㄹ겨")
        return false;
      }
      if (this.topic === "") {
        alert("링크를 입ㄹ겨")
        return false;
      }
      if (this.createdAt === null) {
        alert("링크를 입ㄹ겨")
        return false;
      }
      return true;
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .mx-input-append {
    height: auto;
  }
</style>
