<template>
  <div id="app">
    <router-view name="header"/>
    <router-view/>
    <vue-snotify />
  </div>
</template>

<style lang="scss">
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  @import '~vue-snotify/styles/simple.scss';
  @import './styles/index.scss';


  html, body {
    height: 100%;
  }
  #app {
    width: 1280px;
    height: 100%;
    margin: 0 auto;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 125px 0 0;
    color: #2c3e50;
  }

</style>
