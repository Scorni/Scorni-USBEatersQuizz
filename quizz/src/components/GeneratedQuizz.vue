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
            <div v-else>
              <span>You didn't choose your Quizz's options 🤔 </span>
            </div>
        </div>
        <p>
          {{$route.params.category}}
        </p>
        <p>
        </p>
        <div v-for="value in this.questionGenerated" :key="value.question">
          <router-link :to="{ name: 'question', params: { question:JSON.stringify(value), number: this.questionGenerated.indexOf(value),questionsList: JSON.stringify(this.questionGenerated)}}  "> {{this.questionGenerated.indexOf(value)}}</router-link>
          {{value.question}}  <br>
          {{value.answer}}  <br>
          {{value.multiple_correct_answers}} jij<br>
          {{value.correct_answer}}  <br>
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
    };
  },
  methods: {
    getQuestion:async function(){
      this.$route.params.questionsList ? this.questionGenerated = this.$route.params.questionsList : this.questionGenerated = await getQuestions(10,this.$route.params.category,this.$route.params.tag,this.$route.params.difficulty);
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
