<template>
  <div class="questionVue">
      <div class="headerQuestion">
        <span>{{question}}</span>
      </div>
      <div class="borderQuestionLeft"></div>
      <div class="borderQuestionBottom"></div>
      <div v-if="!this.checkCorrectAnswersLength()" class="tips">
        Pick an answer.
      </div>
      <div v-else-if="this.checkCorrectAnswersLength()" class="tips">
        Pick at least 2 answers.
      </div>
      <div v-if="!this.checkCorrectAnswersLength()" justify="start" class="answers">
        <div v-for="(value,key) in answers" :key="key.answer">
            <button @click="this.answerPick(key,value)" v-bind:class="(type[key] || 'default') + ' answerButton'" v-bind:id="key" v-bind:type="type[key]"  ref="key"></button>
            <p class="answerText">
              {{ value }}.
            </p>
        </div>
        
      </div>
      
      <div v-else-if="this.checkCorrectAnswersLength()" class="answers">
        <div v-for="(value,key) in answers" :key="key.answer">
            <button @click="this.answerPick(key,value)" v-bind:class="(type[key] || 'default') + ' answerButton'" v-bind:id="key " v-bind:type="type[key]" ref="key"></button>
          <p class="answerText">
            {{ value }}.
          </p>
        </div>
      </div>
      <div class="borderAnswerLeft"></div>
      <div class="borderAnswerTop"></div>

    <div v-if="this.numberOfAnswer > 0">
      <div  ref="validateAnswers" id="validateAnswers">
        <button class="confirmAnswer" @click="this.getResult()">Confirm</button>
      </div>
    </div>
    <div class="resultContainer">
      <div v-if="this.result || ((this.goodAnswers && !this.badAnswers) && this.compareGoodAnswers())" ref="champion" id="result" class="result">
        <h2>Right.</h2>
      </div>
      <div v-else-if="this.result === false || (this.badAnswers)" ref="loser" id="result" class="result">
        <h2>Wrong.</h2>
      </div>

      <div v-if="(this.goodAnswers > 0 && this.badAnswers == 0) && this.compareGoodAnswers() || this.result === true">
        <button class="resultLink" type="warning" round>
          <Svg class="svgQuestion"></Svg>
          <router-link class="routerLink" :to="{ name: 'generatedQuizz', params : {questionNumber : this.$route.params.number, result : 'success', questionsList: this.$route.params.questionsList,successQuestion : this.$route.params.successQuestion, finalResultAnswerAndQuestion  : this.finalResultAnswerAndQuestion}}" >Results.</router-link>
        </button>
      </div>
      <div v-else-if="this.badAnswers > 0 || this.result === false">
        <button class="resultLink" type="warning" round>
          <Svg class="svgQuestion"></Svg>
          <router-link class="routerLink" :to="{ name: 'generatedQuizz', params : {questionNumber : this.$route.params.number, result : 'failure', questionsList: this.$route.params.questionsList, successQuestion : this.$route.params.successQuestion, finalResultAnswerAndQuestion  : this.finalResultAnswerAndQuestion}}" >Results.</router-link>
        </button>
      </div>
    </div>
    
  </div>
</template>

<script>
import Svg from '../components/SVG/Arrow.vue'
export default {
  name: 'MyQuestion',
  props: { msg :String
  },
  components : {
    Svg,
},
  data() {
    return {
        question: this.fillMe("question"),
        answers : this.fillMe("answers"),
        correct_answer : this.fillMe("correct_answer"),
        correct_answers : this.fillMe("correct_answers"),
        numberOfAnswer : 0,
        answersChoosed : new Object(),
        result: null,
        goodAnswers : 0,
        badAnswers: 0,
        type: "",
        finalResultAnswerAndQuestion : (this.$route.params.finalResultAnswerAndQuestion || []),
        questionNumber : this.$route.params.number,
    };
  },
  methods: {
    fillMe:function(e){
      let request = JSON.parse(this.$route.params.question);
      let content= new Object();
      for(let id in request){
        if(id === e){
          if(typeof request[id] === 'object' && request[id] !== null){
            for(const value in request[id]){
              request[id][value] !== null ? content[value] = request[id][value] : content[value];
            }
          }else{
            content = request[id];
          }
        }
      }
      this.countAnswersAvailable(this.answers);
      return content;
    },
    countAnswersAvailable:function(answers){
      let content = new Array();
      for(const i in answers){
        content[i] = "default";
      }
      return content
    },
    // return true if multiple correct answers
    checkCorrectAnswersLength : function(){
      let areTrue = 0;
      for(const i in this.correct_answers){
        this.correct_answers[i] === "true" ? areTrue += 1 : areTrue;
      }
      return areTrue > 1 ? areTrue = true : areTrue = false;
    },
    fillSingleAnswerThroughAnswers:function(){
      for(let i in this.correct_answers){
        this.correct_answers[i] === "true" ? this.correct_answer = i.slice(0,8) : 0
      }
    },
    //handle single and multiple answer's picking
    answerPick:function(key,value){
      this.type === "" ? this.type = this.countAnswersAvailable(this.answers) : this.type;
      // Multiple answers case
      if(this.checkCorrectAnswersLength()){
        this.badAnswers = 0;
        this.goodAnswers = 0;
        for( const j in this.answers){
          if(key === j && this.type[j] !== "primary"){
            this.type[j] = "primary"
            this.answersChoosed[key] = value;
          }else if(key === j && this.type[j] === "primary"){
            this.type[j] = "default"
            delete this.answersChoosed[key];
          }
        }
      // Single answer case
      }else{
        this.answersChoosed = new Object()
        for( const j in this.answers){
          if(key === j && this.type[j] !== "primary"){
            this.type[j] = "primary"
            this.answersChoosed[key] = value;
          }else{
            this.type[j] = "default"
          }
        }
      }
      this.numberOfAnswer = Object.keys(this.answersChoosed).length;
    },
    //check if the answer(s) are the right ones
    getResult : function(){
      this.finalResultAnswerAndQuestion[this.questionNumber] = []
      if(this.checkCorrectAnswersLength()){
        this.badAnswers = 0;
        this.goodAnswers = 0;
        for(const i in Object.keys(this.answersChoosed)){
          for (const j in Object.keys(this.correct_answers)) {
            if(Object.keys(this.correct_answers)[j].slice(0,8) === Object.keys(this.answersChoosed)[i] && Object.values(this.correct_answers)[j] === 'true'){
              this.goodAnswers++
              this.type[Object.keys(this.correct_answers)[j].slice(0,8)] = "success"
            }else if(Object.keys(this.correct_answers)[j].slice(0,8) === Object.keys(this.answersChoosed)[i] && Object.values(this.correct_answers)[j] === 'false'){
              this.badAnswers++;
              this.type[Object.keys(this.correct_answers)[j].slice(0,8)] = "danger"
            }
          }
        }
      }else{
        this.fillSingleAnswerThroughAnswers();
        this.numberOfAnswer = 0;
        
        for(const i in this.$refs["key"]){
          if(Object.keys(this.answersChoosed)[0] === this.correct_answer &&  Object.keys(this.answersChoosed)[0] === this.$refs["key"][i].id ){
            this.result = true ;
            this.type[Object.keys(this.correct_answers)[i].slice(0,8)] = "success"
          }else if(Object.keys(this.answersChoosed)[0] !== this.correct_answer &&  Object.keys(this.answersChoosed)[0] === this.$refs["key"][i].id ){
            this.result = false;
            this.type[Object.keys(this.correct_answers)[i].slice(0,8)] = "danger"
            this.finalResultAnswerAndQuestion[this.questionNumber][0] =  this.answers[this.correct_answer] + "#️⃣";
            this.finalResultAnswerAndQuestion[this.questionNumber][1] =  Object.values(this.answersChoosed)[0] + "#️⃣";
            this.finalResultAnswerAndQuestion[this.questionNumber][2] =  this.question + "#️⃣";
          }

        }
        for(let i in document.getElementsByClassName("answerButton")){
          
          if(document.getElementsByClassName("answerButton")[i] instanceof Element) (document.getElementsByClassName("answerButton")[i]).setAttribute('disabled', "")
        }
      }
    },
    compareGoodAnswers: function(){
      let count = 0;
      for(let i in this.correct_answers){
        this.correct_answers[i] === "true" ? count++ :count
      }
      return count === this.goodAnswers ? true: false;
    },
  },
  mounted(){
    this.$confetti.stop()

  },
  watch(){
    this.finalResultAnswerAndQuestion ? console.log("yesy") : console.log("non");
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
@import '../assets/style/Components/Question/Question.css';

</style>
