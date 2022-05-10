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
              <div  v-for="(value,key) in answers" :key="key.answer">
                <button v-on:click="this.answerPick(key)" v-bind:id= "key" ref="key">{{ value }}</button>
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
        <!--<div v-for="value in this.questionGenerated" :key="value.question">
          <router-link :to="{ name: 'question', param: { question: this.questionGenerated.question}}"></router-link>
          {{this.questionGenerated.indexOf(value)}}
        </div>-->
        <div class="col-1-1" ref="generateQuizz" id="generateQuizz" hidden>
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
              if(request[id][value] !== null){
                content[value] = request[id][value]

              }
            }
          }else{
            content = request[id]
          }
        }
      }
      console.log(content);
      return content;
    },
    answerPick:function(key){
      this.validatedAnswer = false
      this.$refs.generateQuizz.setAttribute("hidden","hidden");
      if(this.correct_answer){
        if(key === this.correct_answer){
        this.validatedAnswer = true;
        this.$refs.generateQuizz.removeAttribute("hidden");
        }
      }else if(this.correct_answers){
        console.log('there is multiple answers');
      }
      console.log(key + " : " + this.correct_answer);
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
</style>
