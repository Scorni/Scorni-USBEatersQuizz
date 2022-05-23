<template>
  <el-footer class="footer">
    <el-row :gutter="20" justify="center">
        <el-col  :span="4" class = "gitHubLogo">
          
          <el-link :underline="false" href="https://github.com/Scorni/Scorni-USBEatersQuizz" target="_blank">
            <el-image  shape="square" :size="100"  :src='url' />
          </el-link>
          
        </el-col>
    </el-row>
    <el-row :gutter="20" justify="center" >
        <el-col :span="12" >
          <p>
            The questions comes from <br>
            <el-link :underline="false" href="https://quizapi.io" target="_blank" rel="noopener">Quizapi</el-link>.
          </p>
        </el-col>
    </el-row>
    
  </el-footer>
    
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
.gitHubLogo{
  border-top: 2px solid #000000;
  padding:20px;
  margin: 20px;
}

</style>
