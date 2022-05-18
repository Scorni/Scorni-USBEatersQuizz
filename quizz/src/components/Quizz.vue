
<template>
  <div>
    <el-row :gutter="20" justify="center">
      <el-col  :span="12" class = "headers">
        <h1>{{ msg }}</h1>
        </el-col>
    </el-row>
    <el-row :gutter="20" justify="center">
      <el-col  :span="12" >
        <h2>Choose your options for the quizz</h2>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center" >
      <el-col :span="12" class="options">
        <form id="questionOptions">
        <h3>U can either choose per category or per tag(s)</h3>
          <el-row justify="center">
            <el-col :span="8">
              <div class="content">
                <h4>Category</h4>
                <el-select v-model="categorySelected" id="categorySelected" ref="categorySelected" :disabled="categoryDisabled" clearable>
                  <el-option v-for="value in this.requestOptions.category" class="m-2" :key="value.category" :value="value">
                    {{value}}
                  </el-option>
                </el-select>
                <br>    
              </div>
            </el-col>
            <el-col :span="8">
              <div class="content">
                <h4>Tag</h4>
                <el-select v-model="tagSelected" id="tagSelected" ref="tagSelected" class="m-2" :disabled="tagDisabled" clearable>
                  <el-option v-for="value in this.requestOptions.tag" :key="value.tag" :value="value">
                    {{value}}
                  </el-option>
                </el-select>
                <br>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <h4>Difficulty</h4>
              <el-select v-model="difficultySelected" id="difficultySelected" >
                <el-option v-for="value in this.requestOptions.difficulty" :key="value.difficulty" :value="value">
                  {{value}}
                </el-option>
              </el-select><br>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <br>
              <div class="content" v-if="categorySelected">
                <span>Selected: {{ categorySelected}} - {{difficultySelected}}</span>
              </div>
              <div v-else>
                <span>Selected: {{ tagSelected }} - {{ difficultySelected}} </span>
              </div>
              <br>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <br>
              <div class="col-1-1" ref="generateQuizz" id="generateQuizz" hidden>
                <el-button type="warning" round>
                  <router-link class="link" :to="{ name: 'generatedQuizz', params: { category : this.categorySelected, difficulty: this.difficultySelected, tag: this.tagSelected}}" >generate Quizz
                  </router-link>
                </el-button>
              </div>
              <br>
            </el-col>
          </el-row>
        
      </form>
      </el-col>
    </el-row >
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headers{
  border: 2px solid #ebb563;
  border-radius: 4px
}
.options{
  border: 2px solid #ebb563;
  border-radius: 4px;
  
}
.link{
  text-decoration: none;
}
.link:hover{
  text-decoration: none;
}
.link:visited{
  color: rgb(0, 0, 0);
}
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
