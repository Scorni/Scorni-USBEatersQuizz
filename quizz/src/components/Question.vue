<template>
  <div class="hello">
    <h1>{{ msg }} </h1>
         <div class="col-1-1">
          <div class="content">
            <div ref="champion" hidden>
              <h2>🏆🏆🏆 Champion ! Vraiment un crack comme on en fait plus .... 🏆🏆🏆</h2>
            </div>
          </div>
         </div>
         <div class="col-1-1">
          <div class="content">
            <div ref="loser" hidden>
              <h2>💀💀💀 Loser ! Vraiment à chier .... 💀💀💀</h2>
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
            <button v-on:click="this.result()">Confirm answer(s)</button>
          </div>
        </div>
        <div class="col-1-1" ref="generateQuizz" id="generateQuizz" hidden >
          <router-link :to="{ name: 'generatedQuizz', param : $route.params.question}" >generate Quizz</router-link>
        </div>
    </div>
</template>

<script>

console.log();
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
        answersChoosed : {},

    };
  },
  methods: {
    fillMe:function(e){
      let request = JSON.parse(this.$route.params.question)
      let content= new Object();
      for(let id in request){
        if(id === e){
          if(typeof request[id] === 'object' && request[id] !== null){
            for(let value in request[id]){
              request[id][value] !== null ? content[value] = request[id][value] : content[value]
            }
          }else{
            content = request[id]
          }
        }
      }
      return content;
    },
    // return true if multiple correct answers
    checkCorrectAnswersLength : function(){
      let areTrue = 0;
      for(let i in this.correct_answers){
        this.correct_answers[i] === "true" ? areTrue += 1 : areTrue
      }
      areTrue > 1 ? areTrue = true : areTrue = false
      return areTrue;
    },
    //handle single and multiple answer's picking
    answerPick:function(key,value){
      // Multiple answers case
      if(this.checkCorrectAnswersLength()){
        for(let i in this.$refs.key){
          if(this.$refs.key[i].id === key && this.$refs.key[i].className === "answerPick"){
            this.$refs.key[i].className = ""
            delete this.answersChoosed[key];
          }else if(this.$refs.key[i].id === key){
            this.$refs.key[i].className = 'answerPick';
            this.answersChoosed[key] = value
          }
        }
      // Single answer case
      }else{
          this.answersChoosed[key] = this.answers[key]
          for(let i in this.$refs.key){
            if(this.$refs.key[i].id === key){
              this.$refs.key[i].className = 'answerPick';
              this.answersChoosed[key] = value
            }else if(this.$refs.key[i].className === "answerPick"){
              this.$refs.key[i].className = ""
              delete this.answersChoosed[key];
            }
          }
      }
      this.numberOfAnswer = Object.keys(this.answersChoosed).length;
    },
    //check if the answer(s) are the right ones
    result : function(){
      if(this.numberOfAnswer > 1){
        // TODO:
        //loop over answers and iterate for every good answers then check if the number is equal
        //Handle to unable to cheat on button click
        console.log("that's a  lot");
      }else{
        Object.keys(this.answersChoosed)[0] === this.correct_answer ? this.$refs.champion.removeAttribute('hidden') : this.$refs.loser.removeAttribute('hidden');
        this.numberOfAnswer = 0
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
</style>
