<template>
  <div class="home">
    <Question msg="Question ❓❓❓💻 "/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'MyQuestion',
  components: {
    Question,
    Footer
  }
}
</script>
