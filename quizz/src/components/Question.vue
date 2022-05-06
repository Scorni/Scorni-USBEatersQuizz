// TODO: get props 
<template>
  <div class="hello">
    <h1>{{ msg }} </h1>
         <div class="col-1-1">
            <div class="content">
                {{ $route.params.number}}
                {{ this.question}}
            </div>
         </div>
         <!-- <div v-for="value in this.question" :key="value.question">
          {{value.answers}}
        </div> -->
        
        <!-- <div class="col-1-1">
            <div class="content" v-if="$route.params.category">
              <span>Selected: {{ $route.params.category}} - {{$route.params.difficulty}}</span>
            </div>
            <div v-else-if="$route.params.tag">
              <span>Selected: {{ $route.params.tag }} - {{ $route.params.difficulty}} </span>
            </div>
            <div v-else>
              <span>You didn't choose your Quizz's options 🤔 </span>
            </div>
        </div>
        <p>
          {{$route.params.category}}
        </p> -->
        <p>
          <!-- {{questionGenerated}} -->
        </p>
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
        question : this.parse(this.$route.params.question),
        answers : [],
        correct_answer : "",
        correct_answers : "",
    };
  },
  methods: {
    parse: function (e){
        
        this.question = JSON.parse(e)
        console.log(this.question);
        for(let value in this.question){
            console.log(value);
        }
    }
  },
  computed:{
     
  },
//   mounted:{
//       setVariables: function(){
//           for(let value in this.question){
//               if(value === "answers"){
//                   for(let answer in value){
//                       this.answers.push(answer)
//                   }
//               }
//         }
//         console.log(this.answers);
//       }
//   }
 
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
