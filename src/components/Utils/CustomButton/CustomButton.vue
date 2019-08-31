<template>
  <button :class="[{ variant }, 'custom-button']" :type="type">
    <slot />
  </button>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class CustomButton extends Vue {
    @Prop({ default: "button" }) type!: string;
    @Prop({ default: "primary" }) variant!: string;
    @Prop({ default: "m" }) size!: string;

    constructor () {
      super();
    }

  }
</script>
<style lang="scss" scoped>

</style>
