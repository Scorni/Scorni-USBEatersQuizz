<template>
  <div class="home">
    <Result msg="Your Result "/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Result from '@/components/Result.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'MyResutl',
  components: {
    Result,
    Footer
  }
}
</script>
