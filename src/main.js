import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import ElementPlus from 'element-plus'
import VueConfetti from 'vue-confetti'

import 'element-plus/dist/index.css'
import "@/assets/simplegrid.css"

const app = createApp(App)
app.use(router)

app.use(ElementPlus)
app.use(VueConfetti)
app.mount('#app')
