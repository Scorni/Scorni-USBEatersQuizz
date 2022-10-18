<template>
  <div class="footer">
    <p>Made by <br/></p>
    <a href="https://github.com/Scorni" target="blank">MAXENCE SCORNICIEL </a>
  </div>

</template>
<script>
export default {
  name: 'CustomFooter',
  props: {},
  data() {
    return {
      url: '/GitHub-Mark-64px.png',
    }
  }
}

</script>
<style scoped>
@import '../assets/style/Components/Footer/Footer.scss';
</style>
