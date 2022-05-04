
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
            <div class="content">
              <span>Selected: {{categorySelected}} - {{difficultySelected}} - {{tagSelected}}</span>
            </div>
        </div>
        

        
      </form>
    </div>
  </div>
</template>

<script>
// TODO: Redirect de base sur cette page + système de route
//import { getQuestions } from '../services/generateQuestion';
import { getOptions } from '../services/getRequestParameters';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    resetTag: function(event){
      // TODO: check why this refreshing when updateing data variable
            console.log(event.currentTarget.id);
            // ref = event.currentTarget.id
            if(event.currentTarget.id === "clearTagSelected"){
              // this.$refs.tagSelected.value =null
              // this.tagSelected = ""
              this.$refs.categorySelected.removeAttribute("disabled","disabled");
            }else{
              // this.$refs.categorySelected.value =null

              // this.$refs.tagSelected.removeAttribute("disabled","disabled");
                            this.tagSelected = ""

              this.categorySelected = ""

            }
    }
  },
  data() {
    return {
      requestOptions : getOptions(),
      categorySelected :"",
      difficultySelected :"",
      tagSelected :"",
    };
  },
  watch: {
    categorySelected: function() {
        this.$refs.tagSelected.setAttribute("disabled","disabled");
        this.$refs.clearCategorySelected.removeAttribute("hidden");

    },
    tagSelected: function() {
        this.$refs.categorySelected.setAttribute("disabled","disabled");
        this.$refs.clearTagSelected.removeAttribute("hidden");
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
</style>
