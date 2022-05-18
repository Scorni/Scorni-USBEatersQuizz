<template>
  <div class="home">
    <GeneratedQuizz msg="Welcome on this Quizz for USB Eaters 💻 "/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import GeneratedQuizz from '@/components/GeneratedQuizz.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    GeneratedQuizz,
    Footer
}
}
</script>
