<template>
  <Quizz msg="Welcome on this Quizz for USB Eaters 💻 "/>
</template>

<script>
import Quizz from './components/Quizz.vue'

export default {
  name: 'App',
  components: {
    Quizz
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
