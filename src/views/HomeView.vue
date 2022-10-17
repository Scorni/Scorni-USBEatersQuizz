<template>
  <div class="home">
    <Quizz/>
    <!-- <Footer /> -->
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
    // Footer,
}
}
</script>
