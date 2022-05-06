import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import GeneratedQuizzView from '../views/GeneratedQuizzView.vue'
import QuestionView from '../views/QuestionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderboardView
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
