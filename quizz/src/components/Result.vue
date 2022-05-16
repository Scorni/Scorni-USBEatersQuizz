<template>
  <div class="hello">
    <h1>{{ msg }} </h1>
      <h3>Vous obtenez le résultat de {{result}}/10</h3>
    </div>
</template>

<script>

export default {
  name: 'MyResult',
  props: { msg :String
  },
  data() {
    return {
      result : 0

    };
  },
  methods: {
  },
  mounted(){
    for(let i in this.$route.params.answers){
      this.$route.params.answers[i] === "success" ?  this.result++ : this.result
    }
  },
  updated(){
    
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
.answerPick{
  color: aqua;
}
.goodAnswer{
  background-color: rgb(58, 117, 10);
}
.wrongAnswer{
  background-color: rgb(196, 2, 2);
}
</style>
