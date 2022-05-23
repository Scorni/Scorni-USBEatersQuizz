<template>
  <div class="home">
    <Quizz msg="Welcome on this Quizz for USB Eaters 💻 "/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Quizz from '@/components/Quizz.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'HomeView',
  components: {
    Quizz,
    Footer,
}
}
</script>
