<template>
  <div class="home">
    <GeneratedQuizz msg="Welcome on this Quizz for USB Eaters 💻 "/>
  </div>
</template>

<script>
// @ is an alias to /src
import GeneratedQuizz from '@/components/GeneratedQuizz.vue'

export default {
  name: 'HomeView',
  components: {
    GeneratedQuizz,
}
}
</script>
