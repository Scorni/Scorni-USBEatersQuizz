<template>
  <div class="hello">
    <h1>Your generated Quizz 💾 </h1>
         <div class="col-1-1">
            <div class="content">
            </div>
         </div>
        <div class="col-1-1">
            <div class="content" v-if="$route.params.category">
              <span>Selected: {{ $route.params.category}} - {{$route.params.difficulty}}</span>
            </div>
            <div v-else-if="$route.params.tag">
              <span>Selected: {{ $route.params.tag }} - {{ $route.params.difficulty}} </span>
            </div>
          </div>
        <p>
          {{$route.params.category}}
        </p>
        <p>
        </p>
        <div v-if="$route.params.result === 'success'" ref="bite">success</div>
        <div v-else-if="$route.params.result === 'failure'">failure</div>
        <div v-for="value in questionGenerated" :key="value.question" v-bind:id="questionGenerated.indexOf(value)" ref="question" >
            <router-link :to="{ 
              name: 'question', 
              params: 
                { question:JSON.stringify(value), 
                number: this.questionGenerated.indexOf(value),
                questionsList: JSON.stringify(this.questionGenerated), 
                successQuestion: successQuestion
                }
              } ">
              Question n°{{this.questionGenerated.indexOf(value)}}</router-link>
        </div>
        <div v-show="showResultLink">
          <router-link :to="{
            name : 'result',
            params: {
              answers : successQuestion
            }
          }">
          To the result page
          </router-link>
        </div>
    </div>
</template>

<script>
import { getQuestions } from '../services/generateQuestion';

console.log();
export default {
  name: 'GeneratedQuizz',
  data() {
    return {
      questionGenerated : this.getQuestion(),
      successQuestion : this.$route.params.successQuestion || [],
      countAnsweredQuestion : 0,
      showResultLink : true
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
      for(let i in this.successQuestion){
        this.successQuestion[i] === "success" ? this.$refs.question[i].className = "goodAnswer" : this.$refs.question[i].className = "wrongAnswer"
      }
    },
    finalResult: function(){
      for(let i in this.$refs.question){
          this.$refs.question[i].className === ( "goodAnswer") || this.$refs.question[i].className === ( "wrongAnswer") ? this.countAnsweredQuestion++ : this.countAnsweredQuestion
      }   
      this.countAnsweredQuestion === 10 ?  this.showResultLink = true : this.showResultLink
    }
  },
  mounted(){
  },
  updated(){
    this.countSuccessQuestion();
    this.updateStyle();
    this.finalResult();
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
.goodAnswer{
  background-color: rgb(58, 117, 10);
}
.wrongAnswer{
  background-color: rgb(196, 2, 2);
}
</style>
