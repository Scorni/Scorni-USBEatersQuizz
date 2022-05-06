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
              {{correct_answer}}
            </div>
         </div>
        <div class="col-1-1">
          <div class="content">
            <div v-for="value in answers" :key="value.answer">
              <p>{{value}}</p>
              
            </div>
          </div>  
        </div>
        <div class="col-1-1">
          <div class="content">
            <div v-for="value in correct_answers" :key="value.answer">
              <p>{{value}}</p>
              
            </div>
          </div>  
        </div>
        <!-- <div v-for="value in this.questionGenerated" :key="value.question">
          <router-link :to="{ name: 'question', param: { question: this.questionGenerated.question}}"></router-link>
          {{this.questionGenerated.indexOf(value)}}
        </div>
        <div class="col-1-1" ref="generateQuizz" id="generateQuizz" hidden>
          <router-link :to="{ name: 'generatedQuizz', param : 'questionGenerated'}" >generate Quizz</router-link>
        </div> -->
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
    };
  },
  methods: {
    // TODO: split libellée && value
    fillMe:function(e){
      let request = JSON.parse(this.$route.params.question)
      let content= new Array()
      for(let id in request){
        if(id === e){
          if(typeof request[id] === 'object' && request[id] !== null){
            for(let value in request[id]){
              if(request[id][value] !== null){
                content.push(value)
                content.push(request[id][value])
              }
            }
          }else{
            content = request[id]
          }
        }
      }
      return content
    }
  },
  computed:{
     
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
