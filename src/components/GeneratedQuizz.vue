<template>
  <div class="hello">
    <el-row :gutter="20" justify="center">
      <el-col  :span="12" class = "headers">
          <h1>Your generated Quizz 💾 </h1>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center">
      <el-col  :span="12" >
          <div class="content" v-if="$route.params.category">
            <span>Selected: {{ $route.params.category}} - {{$route.params.difficulty}}</span>
          </div>
          <div v-else-if="$route.params.tag">
            <span>Selected: {{ $route.params.tag }} - {{ $route.params.difficulty}} </span>
          </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center">    
      <el-col :xs="12" :sm="6" :md="6" :lg="5" :xl="5">
        <el-card class="box-card">
            <template #header>
            <div class="card-header">
              <span>Question's List</span>
            </div>
          </template>
          <div v-for="value in questionGenerated" :key="value.question"  v-bind:id="questionGenerated.indexOf(value)" ref="question" >
            <el-button  class="questionLink" :type="this.type[questionGenerated.indexOf(value)]" round>
              <router-link class="routerLink"
              v-bind:type="type[questionGenerated.indexOf(value)]"
              :to="{ 
                name: 'question', 
                params: 
                  { 
                    question:JSON.stringify(value), 
                    number: this.questionGenerated.indexOf(value),
                    questionsList: JSON.stringify(this.questionGenerated), 
                    successQuestion: successQuestion
                  }
                } ">
              Question n°{{this.questionGenerated.indexOf(value)}}</router-link>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center">    
      <el-col  :span="12" >
        <div v-show="showResultLink">
        <el-button class="questionLink" type="warning" round>
          <router-link class="routerLink" :to="{
            name : 'result',
            params: {
              answers : successQuestion
            }
          }">
          To the result page
          </router-link>
        </el-button>
        </div>
      </el-col>
    </el-row>
        
    </div>
</template>

<script>
import { getQuestions } from '../services/generateQuestion';
export default {
  name: 'GeneratedQuizz',
  data() {
    return {
      questionGenerated : this.getQuestion(),
      successQuestion : this.$route.params.successQuestion || [],
      countAnsweredQuestion : 0,
      showResultLink : false,
      type: "",
    };
  },
  methods: {
    getQuestion:async function(){
      this.$route.params.questionsList ? 
      this.questionGenerated = await JSON.parse(this.$route.params.questionsList) :
      this.questionGenerated = await getQuestions(10,this.$route.params.category,this.$route.params.tag,this.$route.params.difficulty);
    },
    countSuccessQuestion : function (){
      this.$route.params.result === 'success' && this.$route.params.questionNumber && this.questionGenerated ? this.successQuestion[this.$route.params.questionNumber] = this.$route.params.result : this.successQuestion
      this.$route.params.result === 'failure' && this.$route.params.questionNumber && this.questionGenerated ? this.successQuestion[this.$route.params.questionNumber] = this.$route.params.result : this.successQuestion
      
    },
    updateStyle: function(){
      this.type = new Array();
      for(let i in this.successQuestion){
        this.successQuestion[i] === "success" ? this.type[i] = "success" : this.type[i] = "danger"
      }
    },
    
    finalResult: function(){
      for(let i in this.type){
          (this.type[i] === ( "success") || this.type[i] === ( "danger")) ? this.countAnsweredQuestion++ : this.countAnsweredQuestion
      }   
      this.countAnsweredQuestion === 10 ?  this.showResultLink = true : this.showResultLink
    }
  },
  mounted(){
    this.countSuccessQuestion();
    this.updateStyle();
    this.finalResult();
    this.$confetti.stop()
  },
  updated(){
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #926dde;
}
.questionLink{
  margin: 5px;
}
.box-card{
  background-color: #ebb563;
}
</style>
