<template>
  <div id="app" v-cloak>
    <!-- <PFlops/> -->
    <Home/>
  </div>
</template>

<script>
import Home from './components/index'
// import PFlops from './components/P-Flops'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  width: 100%;
  background: #ffffff;;
}
[v-cloak]{
   display:none;
}
</style>
