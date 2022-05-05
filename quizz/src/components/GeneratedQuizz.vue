// TODO: get props 
<template>
  <div class="hello">
    <h1>lol</h1>
         <div class="col-1-1">
            <div class="content">
              param: {{this.$route.params.question}}
            </div>
         </div>
        <div class="col-1-1">
            <div class="content">
              <span>Selected: {{categorySelected}} - {{difficultySelected}} - {{tagSelected}}</span>
            </div>
        </div>
        <div class="col-1-1" ref="generateQuizz" id="generateQuizz" hidden>
          <router-link :to="{ name: 'generatedQuizz', param : 'questionGenerated'}" >generate Quizz</router-link>
        </div>
    </div>
</template>

<script>
// import { getQuestions } from '../services/generateQuestion';

console.log();
export default {
  name: 'GeneratedQuizz',
  props: {
    question: {type:Object, required:true}
  },
  data() {
    return {
    };
  },
  methods: {
    
  },
  computed:{
     
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
</style>
