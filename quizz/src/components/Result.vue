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
    this.result >= 5 
    ? this.$confetti.start(
      {
        particles: [
          {
            type: 'image',
            size: 20,
            url: '/emoji-fete.png',
          },
          {
            type: 'heart',
            size: 20,
          },
          {
            type: 'image',
            size: 15,
            url: '/trophy.png',
          },
        ],
        defaultColors: [
          'Gold',
          'DodgerBlue',
        ],
      }
    )
    : this.$confetti.start(
      {
        particles: [
          {
            type: 'image',
            size: 20,
            url: '/sad-pepe-designs-png-261776.png',
          },
          {
            type: 'image',
            size: 10,
            url: '/cry-emoji.png',
          },
        ],
      }
    )
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
