<template>
  <div>
    <div class="questionList">
      <div class="questionHeader">
        <span>Questions.</span>
      </div>
      <div class="allQuestions">
        <div v-for="value in questionGenerated" :key="value.question" v-bind:id="questionGenerated.indexOf(value)" class="question"  ref="question" >
          <div :class="('questionsLink' + this.type[questionGenerated.indexOf(value)])" :type="this.type[questionGenerated.indexOf(value)]" >
            <router-link class="'routerLink'"
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
            {{this.questionGenerated.indexOf(value)}}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-if="this.params.tag">
      <span class="categoryBanner">{{this.params.tag}}</span>
      <span class="difficultyBanner">{{this.params.difficulty}}</span>
    </div>
    <div v-else-if="this.params.category">
      <span class="tagBanner">{{ this.params.category }}</span>
      <span class="difficultyBanner">{{ this.params.difficulty}}</span>
    </div>
    <div v-show="showResultLink">
    <button class="finalResultLink" type="warning" round>
      <Svg></Svg>
      <router-link class="routerLink" :to="{
        name : 'result',
        params: {
          answers : successQuestion
        }
      }">
      To the result page
      </router-link>
    </button>
    </div>
  </div>
</template>

<script>
import { getQuestions } from '../services/generateQuestion';
import Svg from '../components/SVG/Arrow.vue'

export default {
  name: 'GeneratedQuizz',
  data() {
    return {
      questionGenerated : this.getQuestion(),
      successQuestion : this.$route.params.successQuestion || [],
      countAnsweredQuestion : 0,
      showResultLink : false,
      type: "",
      params: localStorage
    };
  },
  components : {
    Svg,
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
        console.log(this.type[i]);

      }
    },
    
    finalResult: function(){
      for(let i in this.type){
          (this.type[i] === ( "success") || this.type[i] === ( "danger")) ? this.countAnsweredQuestion++ : this.countAnsweredQuestion
      }   
      this.countAnsweredQuestion === 10 ?  this.showResultLink = true : this.showResultLink
    },
    setInStorage: function(){
      if(!localStorage.tag || !localStorage.category){
        if(this.$route.params.category){
          localStorage.clear()
          localStorage.setItem('category',this.$route.params.category)
          localStorage.setItem('difficulty',this.$route.params.difficulty)
          
        }else if( this.$route.params.tag){
          localStorage.clear()
          localStorage.setItem('tag',this.$route.params.tag)
          localStorage.setItem('difficulty',this.$route.params.difficulty)
        }
      }
    }
  },
  mounted(){
    this.setInStorage()
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
@import '../assets/style/Components/GeneratedQuizz/GeneratedQuizz';
</style>
