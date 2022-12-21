<template>
  <div class="hello">
    <div class="HeaderResult">
      <h3>{{this.fault}} fault(s) on 10</h3>
      <div v-if="this.fault === 0"><p class="textResult">What a killer.</p></div>
      <div v-else-if="this.fault <= 5"><p class="textResult">You need to practice a little bit more.</p></div>
      <div v-else-if="this.fault >= 5"><p class="textResult">You need to learn your basics.</p></div>
      <div v-else-if="this.fault === 10 "><p class="textResult">Come on.</p></div>
    </div>
    <div class="review">
      <div class="headerReview">
        <p>What you did wrong</p>
      </div>
      <div class="contentReview">
        <div v-if="fault > 0 && this.questionAndWrongAnswers.length > 0">
          <div v-for="(value,key) in Object.keys(this.questionAndWrongAnswers)" v-bind:key="key.answer" class="questionReviewed">
            <div v-if="this.questionAndWrongAnswers[value].ChoosedAnswer">
              <div>
                <p class="questionNumber" v-bind:id="key">Question {{parseInt(value) + 1 }} </p>
                <Svg class="svgResult"></Svg>
              </div>
              <div class="questionAnswer">
                  <div class="QHeader">{{this.questionAndWrongAnswers[value].Question}}</div>
                  <div v-for="answer in this.questionAndWrongAnswers[value].ChoosedAnswer" v-bind:key="answer" class="QChoosedAnswer">
                    {{answer}}
                  </div>
                  <div v-for="goodAnswer in this.questionAndWrongAnswers[value].GoodAnswers" v-bind:key="goodAnswer" class="QTrueAnswer">
                    {{goodAnswer}}
                  </div>
              </div>
            </div>
            <div v-else-if='this.questionAndWrongAnswers[value][0]'>
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
      questionAndWrongAnswers: []
    };
  },
  
  methods: {
    splitArray(){
      for(let i in this.$route.params.finalResultAnswerAndQuestion){
        this.questionAndWrongAnswers[i] = []
        if( this.$route.params.finalResultAnswerAndQuestion[i] !== "" && this.$route.params.finalResultAnswerAndQuestion[i].includes("*️⃣")){
          this.questionAndWrongAnswers[i].ChoosedAnswer = ((this.$route.params.finalResultAnswerAndQuestion[i]).split("#️⃣"))
          this.questionAndWrongAnswers[i].ChoosedAnswer.filter(function (str) { return str.includes("#️⃣"); });
          this.questionAndWrongAnswers[i].ChoosedAnswer.pop()
          this.questionAndWrongAnswers[i].Question = this.questionAndWrongAnswers[i].ChoosedAnswer.slice(-1)
          this.questionAndWrongAnswers[i].Question = this.questionAndWrongAnswers[i].Question[0].slice(1)
          this.questionAndWrongAnswers[i].ChoosedAnswer.pop()
          this.questionAndWrongAnswers[i].ChoosedAnswer[0] = this.questionAndWrongAnswers[i].ChoosedAnswer[0].slice(((this.questionAndWrongAnswers[i].ChoosedAnswer[0]).indexOf(',') + 1))
          this.questionAndWrongAnswers[i].GoodAnswers = ((this.$route.params.finalResultAnswerAndQuestion[i]).split("*️⃣"));
          this.questionAndWrongAnswers[i].GoodAnswers.filter(function (str) { return str.includes("*️⃣"); })
          this.questionAndWrongAnswers[i].GoodAnswers.pop()
        } else if( this.$route.params.finalResultAnswerAndQuestion[i] !== ("" || undefined)){
           this.questionAndWrongAnswers[i] = (this.$route.params.finalResultAnswerAndQuestion[i]).split("#️⃣");
        }
      }
    },
    removeEmptyObject(){
      for(let i in this.questionAndWrongAnswers){
        if(this.questionAndWrongAnswers[i][0] !== "" )  this.fault++
      } 
    },
    
  },
  components : {
    Svg,
  },
  mounted(){
    this.splitArray()
    this.removeEmptyObject()
    this.fault <= 5 
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
<style >
@import '../assets/style/Components/Result/Result';

</style>