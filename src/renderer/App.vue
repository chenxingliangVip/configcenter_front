<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import menujs from '@/utils/Menu'
  export default {
    name: 'config-manage'
  }
</script>

<style>
  @import "./assets/style/common.scss";
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
  body{
    height: 200% !important;
  }
</style>
