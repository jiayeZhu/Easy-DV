<template>
  <div id="app">
    <!--  <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
console.log(__dirname);
// console.log(require);
// var fs = require('fs');
// console.log(fs)
import store from './vuex/store'
// import ipcRenderer from 'electron';
export default {
  name: 'app',
  store
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
