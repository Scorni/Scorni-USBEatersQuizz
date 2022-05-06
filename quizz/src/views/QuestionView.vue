<template>
  <div class="home">
    <Question msg="Question ❓❓❓💻 "/>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue'

export default {
  name: 'MyQuestion',
  components: {
    Question,
  }
}
</script>
