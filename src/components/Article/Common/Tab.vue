<template>
  <ul>
    <li><router-link :to="{ name: 'News' }">news(소식)</router-link></li>
    <li><router-link :to="{ name: 'Picks' }">picks(아티클)</router-link></li>
  </ul>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Tab extends Vue{
  }
</script>

<style lang="scss" scoped>
  ul {
    overflow: hidden;
    margin-bottom: 63px;
    li {
      float: left;
      margin-right: 26px;
      a {
        font-size: 22px;
        font-weight: normal;
        color: #c8c5c5;
        &.router-link-exact-active {
          color: #0f0f0f;
        }
      }
    }
  }
</style>
