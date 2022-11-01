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
        <div v-if="fault > 0 && this.questionAndWrongAnswers.length">
          <div v-for="(value,key) in Object.keys(this.questionAndWrongAnswers)" v-bind:key="key.answer" class="questionReviewed">
            <div>
              <p class="questionNumber" v-bind:id="key">Question {{parseInt(value) + 1 }} </p>
              <Svg class="svgResult"></Svg>
            </div>
            <div class="questionAnswer">
              <div class="QHeader">{{(this.questionAndWrongAnswers[value][2]).slice(1)}}</div>
              <div class="QChoosedAnswer">{{(this.questionAndWrongAnswers[value][1]).slice(1)}}</div>
              <div class="QTrueAnswer">{{this.questionAndWrongAnswers[value][0]}}</div>
            </div>
          </div>
        </div>
        <div class="contentText" v-else>Lol.</div>
      </div>
    </div>
    <div class="restart">
      <router-link class="routerLink textRestart" :to="{ name: 'home'}" >
        Restart.
</router-link>

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
    
    this.fault = (Object.keys(this.questionAndWrongAnswers).length || 0);
    
    for(let i in this.questionAndWrongAnswers){
      if( this.questionAndWrongAnswers[i] ) this.questionAndWrongAnswers[i] = (this.questionAndWrongAnswers[i]).split("#️⃣");
      
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