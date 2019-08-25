<template>
  <div id="app">
    <router-view name="header"/>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  html, body {
    height: 100%;
    background-color: #f2f3f8;
  }
  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 65px 0 0;
    text-align: center;
    color: #2c3e50;


  }

</style>
