<template>
  <div class="hello">
    <div class="HeaderResult">
      <h3>{{this.fault}} fault(s) on 10</h3>
      <div v-if="this.fault.length === 0"><p class="textResult">What a killer.</p></div>
      <div v-else-if="this.fault.length <= 5"><p class="textResult">You need to practice a little bit more.</p></div>
      <div v-else-if="this.fault.length >= 5"><p class="textResult">You need to learn your basics.</p></div>
      <div v-else-if="this.fault.length === 10 "><p class="textResult">Come on.</p></div>
    </div>
    <div class="review">
      <div class="headerReview">
        <p>What you did wrong</p>
      </div>
      <div class="contentReview">
        <div v-if="fault > 0">
          <div v-for="(value,key) in Object.keys(this.questionAndWrongAnswers)" v-bind:key="key.answer" class="questionReviewed">
            <div>
              <p class="questionNumber" v-bind:id="key">Question {{value}} </p>
              <Svg class="svgResult"></Svg>
            </div>
            <div class="questionAnswer">
              {{this.questionAndWrongAnswers[key]}}
            </div>
          </div>
        </div>
        <div class="contentText" v-else>Lol.</div>
      </div>
    </div>
    <div class="restart">
      //TODO: wrong redirect ?
      <router-link class="routerLink textRestart" :to="{ name: 'home'}" ><p class="textRestart">
        Restart.

      </p></router-link>

    </div>
  </div>
</template>

<script>
import Svg from '../components/SVG/Arrow.vue'

export default {
  name: 'MyResult',
  props: { msg :String
  },
  data() {
    return {
      result : 0,
      fault : 0,
      results : [],
      questionAndWrongAnswers: this.$route.params.finalResultAnswerAndQuestion
    };
  },
  methods: {
    
  },
  components : {
    Svg,
  },
  mounted(){
    console.log(this.questionAndWrongAnswers);

    this.results = localStorage.result.split(",");
    this.fault = Object.keys(this.questionAndWrongAnswers).length
    //TODO: La boucle va pas pcq j'ai index en fonction de la question mais la boucle considère toutes les valeurs du tableau,même vide
    for(let i in this.questionAndWrongAnswers){
      if(Object.keys(this.questionAndWrongAnswers)[i]) console.log(Object.keys(this.questionAndWrongAnswers)[i]);
      // this.fault.push(this.results[i])
    }
    
    // this.fault.length <= 5 
    // ? this.$confetti.start(
    //   {
    //     particles: [
    //       {
    //         type: 'image',
    //         size: 20,
    //         url: '/emoji-fete.png',
    //       },
    //       {
    //         type: 'heart',
    //         size: 20,
    //       },
    //       {
    //         type: 'image',
    //         size: 15,
    //         url: '/trophy.png',
    //       },
    //     ],
    //     defaultColors: [
    //       'Gold',
    //       'DodgerBlue',
    //     ],
    //   }
    // )
    // : this.$confetti.start(
  //     {
  //       particles: [
  //         {
  //           type: 'image',
  //           size: 20,
  //           url: '/sad-pepe-designs-png-261776.png',
  //         },
  //         {
  //           type: 'image',
  //           size: 10,
  //           url: '/cry-emoji.png',
  //         },
  //       ],
  //     }
  //   )
  },
  updated(){
    
  }
}
</script>
<style >
@import '../assets/style/Components/Result/Result.scss';

</style>