<template>
    <div class="headers">
      <h1>Welcome</h1>
      <h1>On this</h1>
      <h1>Quizz.</h1>
    </div>
    <div class="ghostBordersRight"></div>
    <div class="ghostBordersBottom"></div>
    <div class="headersDynamics">
      <div class="groupedHeaders">
        <h1 >Enjoy</h1>
        <h1>Your time</h1>
        <h1>Here.</h1>
      </div>
      <div class="groupedHeadersAlternate">
        <h1>Generate</h1>
        <h1>Your</h1>
        <h1>Question.</h1>
      </div>
    </div>
    <div class="ghostBordersSecondRight"></div>
    <div class="ghostBordersSecondTop"></div>
    <div class="options">
        <form id="questionOptions">
              <div class="content category">
                <h4>Category</h4>
                <select v-model="categorySelected" id="categorySelected" ref="categorySelected" :disabled="categoryDisabled" placeholder="Category" clearable>
                  <option v-for="value in this.requestOptions.category" class="m-2" :key="value.category" :value="value" >
                    {{value}}
                  </option>
                </select>
              </div>
              <div class="content tag">
                <h4>Tag</h4>
                <select v-model="tagSelected" id="tagSelected" ref="tagSelected" class="m-2" :disabled="tagDisabled" clearable>
                  <option v-for="value in this.requestOptions.tag" :key="value.tag" :value="value">
                    {{value}}
                  </option>
                </select>
              </div>
              <div class="content difficulty">
                <h4>Difficulty</h4>
                <select v-model="difficultySelected" id="difficultySelected" >
                <option v-for="value in this.requestOptions.difficulty" :key="value.difficulty" :value="value">
                  {{value}}
                </option>
              </select>
              </div>
              <div class="content" v-if="categorySelected">
                <span>Selected: {{ categorySelected}} - {{difficultySelected}}</span>
              </div>
              <div v-else>
                <span>Selected: {{ tagSelected }} - {{ difficultySelected}} </span>
              </div>
              <div class="col-1-1" ref="generateQuizz" id="generateQuizz" hidden>
                <button type="warning" class="questionLink" round>
                  <router-link class="routerLink" :to="{ name: 'generatedQuizz', params: { category : this.categorySelected, difficulty: this.difficultySelected, tag: this.tagSelected}}" >Generate Quizz
                  </router-link>
                </button>
              </div>
        </form>
  </div>
  <div class="ghostBordersOptionsLeft"></div>
  <div class="ghostBordersOptionsBottom"></div>
</template>

<script>
import { getOptions } from '../services/getRequestParameters';
export default {
  name: 'MyQuizz',
  props: {
    msg: String
  },
  data() {
    return {
      requestOptions : getOptions(),
      categorySelected :"",
      difficultySelected :"",
      tagSelected :"",
      categoryDisabled :false,
      tagDisabled: false
    };
  },
  methods: {
    showButtonGenerateQuizz: async function(){
      if((this.tagSelected !== "" && this.difficultySelected !== "") || (this.categorySelected !== "" && this.difficultySelected !== "")){
        this.$refs.generateQuizz.removeAttribute("hidden");
      }else{
        this.$refs.generateQuizz.setAttribute("hidden","hidden");
      }
    },
  },
  watch: {
    categorySelected: function() {
      this.categorySelected === "" ? this.tagDisabled = false : this.tagDisabled = true
      this.showButtonGenerateQuizz();

    },
    tagSelected: function() {
      this.tagSelected === "" ? this.categoryDisabled = false : this.categoryDisabled = true
      this.showButtonGenerateQuizz();
    },
    difficultySelected: function() {
      this.showButtonGenerateQuizz();
    }
  },
  mounted(){
    this.$confetti.stop()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/style/Components/Quizz/Quizz.scss';
</style>
