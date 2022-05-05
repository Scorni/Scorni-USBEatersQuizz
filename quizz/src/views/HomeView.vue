<template>
  <div class="home">
    <Quizz msg="Welcome on this Quizz for USB Eaters 💻 "/>
  </div>
</template>

<script>
// @ is an alias to /src
import Quizz from '@/components/Quizz.vue'

export default {
  name: 'HomeView',
  components: {
    Quizz
  }
}
</script>
