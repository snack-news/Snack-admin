<template>
  <header class="header">
  </header>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    name: 'HeaderComponent',
  })
  export default class HeaderComponent extends Vue {

  }
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid #ececec;
    background-color: white;
  }
</style>
