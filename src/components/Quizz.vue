<template>
  <div class="headers">
    <div class="groupedHeaders">
      <h1>Welcome</h1>
      <h1>On this</h1>
      <h1>Quizz.</h1>
    </div>
  </div>
  <div class="ghostBordersRight"></div>
  <div class="ghostBordersBottom"></div>
  <div class="headersDynamics">
    <div class="groupedHeadersDynamics" ref="groupedHeadersDynamics">
      <h1> {{headers[0][0]}} </h1>
      <h1> {{headers[0][1]}} </h1>
      <h1> {{headers[0][2]}} </h1>
    </div>
  </div>
  <div class="ghostBordersSecondRight"></div>
  <div class="ghostBordersSecondTop"></div>
  <div class="options">
    <form id="questionOptions">
      <!-- <div class="content category">
        <select v-model="categorySelected" id="categorySelected" ref="categorySelected" :disabled="categoryDisabled" placeholder="Category" clearable>
          <option value="" selected disabled data-default>Category</option>
          <option v-for="value in this.requestOptions.category" :key="value.category" :value="value" >
            {{value}}
          </option>
        </select>
      </div> -->
      <div class="content tag">
        <select v-model="tagSelected" id="tagSelected" ref="tagSelected"  :disabled="tagDisabled" clearable>
          <option value="" selected disabled data-default>Tag</option>
          <option v-for="(value,key) in this.requestOptions.tag" :key="value.tag" :value="key">
            {{key}}
          </option>
        </select>
      </div>
      <div class="content difficulty">
        <select v-model="difficultySelected" id="difficultySelected" >
          <option value="" selected disabled data-default>Difficulty</option>
          <template v-if="this.tagSelected !== '' ">
            <template v-for="(value,key) in this.requestOptions.tag" :key="value.difficulty" >
              <template v-if="this.tagSelected === key">
              <option v-for="difficulty in value" :key="difficulty" :value="difficulty">
                  {{difficulty}}
              </option>
            </template>
            </template>
          </template>
        </select>
      </div>
    </form>
  </div>
  <div class="generateQuizz" ref="generateQuizz" id="generateQuizz" hidden>
          <button  class="questionLink" round>
            <router-link class="routerLink" :to="{ name: 'generatedQuizz', params: { category : this.categorySelected, difficulty: this.difficultySelected, tag: this.tagSelected}}" >Generate Quizz
            </router-link>
          </button>
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
      difficultyAvailable : [] || this.requestOptions.tag[this.tagSelected],
      tagSelected :"",
      categoryDisabled :false,
      tagDisabled: false,
      headers: [['Enjoy','Your time','Here.'],['Generate','Your','Question.']],
    };
  },
  methods: {
    showButtonGenerateQuizz: async function(){
      if((this.tagSelected !== "" && this.difficultySelected !== "") || (this.categorySelected !== "" && this.difficultySelected !== "")){
        this.$refs.generateQuizz.removeAttribute("hidden");

      }else{
        this.$refs.generateQuizz.setAttribute("hidden","hidden");
        this.$refs.generateQuizz.classList.add("fadeIn")
      }
    },
    swipeHeaders(){
      setInterval(() => {
          let spliceHeaders = this.headers.splice(0,1);
          this.headers.push(spliceHeaders[0])
      }, 6500);
    }
  },
  watch: {
    categorySelected: function() {
      this.categorySelected === "" ? this.tagDisabled = false : this.tagDisabled = true
      this.showButtonGenerateQuizz();

    },
    tagSelected: function() {
      this.tagSelected === "" ? this.categoryDisabled = false : this.categoryDisabled = true
      console.log(this.tagSelected);

      this.showButtonGenerateQuizz();
    },
    difficultySelected: function() {
      this.showButtonGenerateQuizz();
    }
  },
  mounted(){
    this.$confetti.stop()
    this.swipeHeaders()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
@import '../assets/style/Components/Quizz/Quizz.css';

</style>
