<template>
  <div class="hello">
    <h1>{{ msg }} </h1>
         <div class="col-1-1">
          <div class="content">
            <!-- <p>{{$route.params.questionsList}}</p> -->
            <div v-if="this.result || this.goodAnswers && !this.badAnswers" ref="champion">
              <h2>🏆🏆🏆 Champion ! Vraiment un crack comme on en fait plus .... 🏆🏆🏆</h2>
            </div>
            <div v-else-if="this.result === false || this.badAnswers" ref="loser">
              <h2>💀💀💀 Loser ! Vraiment à chier .... 💀💀💀</h2>
              <h3 v-if="this.goodAnswers"> Parmis les réponses il y a {{this.goodAnswers}} bonnes réponses.</h3>
              <h3 v-if="this.badAnswers"> Il y a {{this.badAnswers}} mauvaises réponses </h3>
            </div>
          </div>
         </div>
         <div class="col-1-1">
            <div class="content">
              {{question}}
            </div>
         </div>
        <div class="col-1-1">
          <div class="content">
            <div v-if="this.correct_answer">
              <div v-for="(value,key) in answers" :key="key.answer" >
                <button v-on:click="this.answerPick(key,value)" v-bind:id= "key" ref="key">{{ value }}</button>
              </div>
            </div>
            <div v-else-if="this.checkCorrectAnswersLength()">
              <div v-for="(value,key) in answers" :key="key.answer">
                <button v-on:click="this.answerPick(key,value)" v-bind:id= "key" ref="key">{{ value }}</button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.numberOfAnswer > 0">
          <div class="col-1-1" ref="validateAnswers" id="validateAnswers">
            <button v-on:click="this.getResult()">Confirm answer(s)</button>
          </div>
        </div>
        <div v-if="(this.goodAnswers > 0 && this.badAnswers == 0) || this.result === true">
          <router-link :to="{ name: 'generatedQuizz', param : {questionNumber : this.$route.params.number, result : 'success', questionsList: this.$route.params.questionsList}}" > 🏆 Return to the question's list 🏆</router-link>
        </div>
        <div v-else-if="this.badAnswers > 0 || this.result === false">
          <router-link :to="{ name: 'generatedQuizz', param : {questionNumber : this.$route.params.number, result : 'failure', questionsList: this.$route.params.questionsList}}" > 💀 Return to the question's list 💀</router-link>
        </div>
        
    </div>
</template>

<script>

export default {
  name: 'MyQuestion',
  props: { msg :String
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
      return content;
    },
    // return true if multiple correct answers
    checkCorrectAnswersLength : function(){
      let areTrue = 0;
      for(const i in this.correct_answers){
        this.correct_answers[i] === "true" ? areTrue += 1 : areTrue;
      }
      areTrue > 1 ? areTrue = true : areTrue = false;
      return areTrue;
    },
    //handle single and multiple answer's picking
    answerPick:function(key,value){
      // Multiple answers case
      if(this.checkCorrectAnswersLength()){
        this.badAnswers = 0;
        this.goodAnswers = 0;
        for(const i in this.$refs.key){
          if(this.$refs.key[i].id === key && this.$refs.key[i].className === "answerPick"){
            this.$refs.key[i].className = "";
            delete this.answersChoosed[key];
          }else if(this.$refs.key[i].id === key){
            this.$refs.key[i].className = 'answerPick';
            this.answersChoosed[key] = value;
          }
        }
      // Single answer case
      }else{
          this.answersChoosed = new Object();
          for(const i in this.$refs.key){
            if(this.$refs.key[i].id === key){
              this.$refs.key[i].className = 'answerPick';
              this.answersChoosed[key] = value;
            }else if(this.$refs.key[i].className === "answerPick"){
              this.$refs.key[i].className = "";
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
              this.$refs["key"][j].className = "goodAnswer"
            }else if(Object.keys(this.correct_answers)[j].slice(0,8) === Object.keys(this.answersChoosed)[i] && Object.values(this.correct_answers)[j] === 'false'){
              this.badAnswers++;
              this.$refs["key"][j].className = "wrongAnswer"
            }
          }
        }
      }else{
        this.numberOfAnswer = 0;
        for(const i in this.$refs["key"]){
          this.$refs["key"][i].className = ""
          if(Object.keys(this.answersChoosed)[0] === this.correct_answer &&  Object.keys(this.answersChoosed)[0] === this.$refs["key"][i].id ){
            this.result = true ;
            this.$refs["key"][i].className = "goodAnswer";
          }else if(Object.keys(this.answersChoosed)[0] !== this.correct_answer &&  Object.keys(this.answersChoosed)[0] === this.$refs["key"][i].id ){
            this.result = false;
            this.$refs["key"][i].className = "wrongAnswer"
          }
        }
      }
    }
    
  },
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
.goodAnswer{
  background-color: rgb(58, 117, 10);
}
.wrongAnswer{
  background-color: rgb(196, 2, 2);
}
</style>
