<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import util from '@/util/util.js';
export default {
  name: 'App',
  watch: {
      '$route' (to) {
          let pathArr = util.setCurrentPath(this, to.name);
      }
  },
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
