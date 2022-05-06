
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      The Questions comes from the <br>
      <a href="https://quizapi.io" target="_blank" rel="noopener">Quizapi</a>.
    </p>
    <h2>Choose your options for the quizz</h2>
    <div class="options">
      <form id="questionOptions">
        <h3>U can either choose per category or per tag(s)</h3>
       <div class="grid grid-pad">
          <div class="col-1-2">
            <div class="content">
                <h4>Category</h4>
                <select v-model="categorySelected" id="categorySelected" ref="categorySelected">
                  <option v-for="value in this.requestOptions.category"  :key="value.category">
                    {{value}}
                  </option>
                </select>
                <p id="clearCategorySelected" ref="clearCategorySelected" v-on:click="resetTag($event)" hidden>❌</p>
                <br>    
            </div>
          </div>
          <div class="col-1-2">
            <div class="content">
              <h4>Tag</h4>
              <select v-model="tagSelected" id="tagSelected" ref="tagSelected">
                <option v-for="value in this.requestOptions.tag" :key="value.tag">
                  {{value}}
                </option>
              </select>
              <p id="clearTagSelected" ref="clearTagSelected" v-on:click="resetTag($event)" hidden>❌</p>
              <br>
              </div>
          </div>
      </div>
        

         <div class="col-1-1">
            <div class="content">
              <h4>Difficulty</h4>
              <select v-model="difficultySelected" id="difficultySelected" >
              <option v-for="value in this.requestOptions.difficulty" :key="value.difficulty">
                {{value}}
              </option>
            </select><br>
            </div>
         </div>
        <div class="col-1-1">
            <div class="content" v-if="categorySelected">
              <span>Selected: {{ categorySelected}} - {{difficultySelected}}</span>
            </div>
            <div v-else>
              <span>Selected: {{ tagSelected }} - {{ difficultySelected}} </span>
            </div>
        </div>
        <div class="col-1-1" ref="generateQuizz" id="generateQuizz" hidden>
          <router-link :to="{ name: 'generatedQuizz', params: { category : this.categorySelected, difficulty: this.difficultySelected, tag: this.tagSelected}}" >generate Quizz</router-link>
        </div>
        

        
      </form>
    </div>
  </div>
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
    };
  },
  methods: {
    resetTag: function(event){
            if(event.currentTarget.id === "clearTagSelected"){
              this.$refs.categorySelected.removeAttribute("disabled","disabled");
            }else{
              this.$refs.tagSelected.removeAttribute("disabled","disabled");
            }
            this.tagSelected = ""
            this.categorySelected = ""
    },
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
      if(this.categorySelected === ""){
        this.$refs.tagSelected.removeAttribute("disabled");
        this.$refs.clearCategorySelected.setAttribute("hidden","hidden");
      }else{
        this.$refs.tagSelected.setAttribute("disabled","disabled");
        this.$refs.clearCategorySelected.removeAttribute("hidden");
      }
      this.showButtonGenerateQuizz();

    },
    tagSelected: function() {
        
      if(this.tagSelected === ""){
        this.$refs.categorySelected.removeAttribute("disabled");
        this.$refs.clearTagSelected.setAttribute("hidden","hidden");
      }else{
        this.$refs.categorySelected.setAttribute("disabled","disabled");
        this.$refs.clearTagSelected.removeAttribute("hidden");
      }
      this.showButtonGenerateQuizz();
    },
    difficultySelected: function() {
      this.showButtonGenerateQuizz();
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
