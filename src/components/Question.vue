<template>
  <div class="hello">
    <h1>{{ msg }} </h1>
        <el-row :gutter="20" justify="center">    
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div v-if="this.result || ((this.goodAnswers && !this.badAnswers) && this.compareGoodAnswers())" ref="champion" id="result">
              <h2> Champion ! Vraiment un mâle alpha celui-ci </h2>
              <Svg id="svg" type="champion"></Svg>
            </div>
            <div v-else-if="this.result === false || (this.badAnswers)" ref="loser" id="result">
              <h2> Loser ! Ta réponse dégoute</h2>
              <h3 v-if="this.goodAnswers"> Parmis les réponses il y a {{this.goodAnswers}} bonnes réponses.</h3>
              <h3 v-if="this.badAnswers"> Il y a {{this.badAnswers}} mauvaises réponses </h3>
              <Svg id="svg" type="loser"></Svg>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" justify="center">    
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" >
            <el-card class="box-card" shadow="hover " >
              <template #header>
                <div class="card-header">
                  <span>{{question}}</span>
                </div>
              </template>
              <!-- TODO: fix responsivness -->
              <div v-if="!this.checkCorrectAnswersLength()" justify="start">
                <div v-for="(value,key) in answers" :key="key.answer">
                  <!-- <el-button @click="this.answerPick(key,value)" class="questionLink" v-bind:id="key" v-bind:type="type[key]" ref="key">{{ value }}</el-button> -->
                    <el-button @click="this.answerPick(key,value)" class="questionLink" v-bind:id="key" v-bind:type="type[key]" ref="key"></el-button>
                    <el-divider direction="vertical" />
                    {{ value }}
                  <el-divider />
                </div>
                
              </div>
              <div v-else-if="this.checkCorrectAnswersLength()" >
                <div v-for="(value,key) in answers" :key="key.answer">
                  <!-- <el-button @click="this.answerPick(key,value)" class="questionLink" v-bind:id="key" v-bind:type="type[key]" ref="key">{{ value }}</el-button> -->
                  <p>
                    <el-button @click="this.answerPick(key,value)" class="questionLink" v-bind:id="key" v-bind:type="type[key]" ref="key"></el-button>
                  </p>
                  <el-divider />

                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" justify="center">    
          <el-col :xs="12" :sm="6" :md="6" :lg="5" :xl="5">
            <div v-if="this.numberOfAnswer > 0">
              <div  ref="validateAnswers" id="validateAnswers">
                <el-button class="confirmAnswer" @click="this.getResult()">Confirm answer(s)</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div v-if="(this.goodAnswers > 0 && this.badAnswers == 0) && this.compareGoodAnswers() || this.result === true">
              <el-button class="questionLink" type="warning" round>
                <router-link class="routerLink" :to="{ name: 'generatedQuizz', params : {questionNumber : this.$route.params.number, result : 'success', questionsList: this.$route.params.questionsList,successQuestion : this.$route.params.successQuestion}}" > 🏆 Return to the question's list 🏆</router-link>
              </el-button>
            </div>
            <div v-else-if="this.badAnswers > 0 || this.result === false">
              <el-button class="questionLink" type="warning" round>
                <router-link class="routerLink" :to="{ name: 'generatedQuizz', params : {questionNumber : this.$route.params.number, result : 'failure', questionsList: this.$route.params.questionsList, successQuestion : this.$route.params.successQuestion}}" > 💀 Return to the question's list 💀</router-link>
              </el-button>
            </div>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import Svg from '../components/Svg.vue'

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
          if(Object.keys(this.answersChoosed)[0] === this.correct_answer &&  Object.keys(this.answersChoosed)[0] === this.$refs["key"][i].ref.id ){
            this.result = true ;
            this.type[Object.keys(this.correct_answers)[i].slice(0,8)] = "success"
          }else if(Object.keys(this.answersChoosed)[0] !== this.correct_answer &&  Object.keys(this.answersChoosed)[0] === this.$refs["key"][i].ref.id ){
            this.result = false;
            this.type[Object.keys(this.correct_answers)[i].slice(0,8)] = "danger"
          }
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
.answerPick{
  color: aqua;
}
.questionLink{
  margin: 5px;
}
.confirmAnswer{
  margin: 5px;
  animation: glowing 3s infinite;
}

@keyframes glowing {
  0% { background-color: #c7c7c7 }
  50% { background-color: #ffffff }
  100% { background-color: #c7c7c7 }
}
.box-card{
  background-color: #ebb563;
}
#result{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
#result h2, #result #svg{
  position: relative;
  z-index: 10;
  margin-left: 5%;

}
#result::before{
  content: "";
  position: absolute;
  width: 100%;
  height: 50%;
  background: linear-gradient(90deg,#ebb563,#67c23a);
  animation: animate 4s linear infinite;
}

#result::after{
  content: "";
  position: absolute;
  inset: 5px;
  background: #ebb563;
  border-radius: 4px;
}

@keyframes animate {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }

}
</style>
