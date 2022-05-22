import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GeneratedQuizzView from '../views/GeneratedQuizzView.vue'
import QuestionView from '../views/QuestionView.vue'
import ResultView from '../views/ResultView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/generatedQuizz',
    name: 'generatedQuizz',
    component: GeneratedQuizzView,
    props:true
  },
  {
    path: '/question',
    name: 'question',
    component: QuestionView,
    props:true
  },
  {
    path: '/result',
    name: 'result',
    component: ResultView,
    props:true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
