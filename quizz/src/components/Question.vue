<template>
  <div class="hello">
    <h1>{{ msg }} </h1>
         <div class="col-1-1">
            <div class="content">
                {{ $route.params.number }}
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
                <button v-on:click="this.answerPick(key,value)" v-bind:id= "value" ref="value">{{ value }}</button>
              </div>
            </div>
            <div v-else-if="this.checkCorrectAnswersLength()">
              <div v-for="(value,key) in answers" :key="key.answer">
                <p v-on:click="this.answerPick(key,value)" v-bind:id= "value" ref="value">{{ value }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1-1">
          <div class="content">
            <div v-if="this.validatedAnswer" id="validatedAnswer">
              <p>Right !</p>
            </div>
            <div v-else-if="this.validatedAnswer === false">
              <p>Wrong !</p>
            </div>
            <div v-else>
              <p>Pick an answer !</p>
            </div>
          </div>  
        </div>
        <div class="col-1-1" ref="validateAnswers" id="validateAnswers" >
          <button>Confirm answer(s)</button>
        </div>
        <!--<div v-for="value in this.questionGenerated" :key="value.question">
          <router-link :to="{ name: 'question', param: { question: this.questionGenerated.question}}"></router-link>
          {{this.questionGenerated.indexOf(value)}}
        </div>-->
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
        validatedAnswer : "",
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
    checkCorrectAnswersLength : function(){
      let areTrue = 0;
      for(let i in this.correct_answers){
        this.correct_answers[i] === "true" ? areTrue += 1 : areTrue
      }
      console.log(areTrue);
      areTrue > 1 ? areTrue = true : areTrue = false
      return areTrue;
    },
    
    answerPick:function(key,value){
      this.validatedAnswer = false
      this.$refs.generateQuizz.setAttribute("hidden","hidden");
      if(this.checkCorrectAnswersLength()){
        for(let i in this.$refs.value){
          if(this.$refs.value[i].id === value && this.$refs.value[i].className === "answerPick"){
            this.$refs.value[i].className = ""
          }else{
            this.$refs.value[i].id === value ? this.$refs.value[i].className = 'answerPick' : console.log("non");
            this.$refs.validateAnswers.removeAttribute("hidden");
          }
        }
        // for(let i in this.correct_answers){
        //   console.log(this.correct_answers[i] + ":"+ i + ":" + key);
        //   if(key === i){
        //     console.log(i);
        //   }
        // }
      }else if(this.correct_answer){
        if(key === this.correct_answer){
          this.validatedAnswer = true;
          this.$refs.generateQuizz.removeAttribute("hidden");
        }
      }
      this.emptyAnswers();
      console.log(key + " : " + this.correct_answer + " : " + this.correct_answers);
    },
    
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
