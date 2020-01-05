import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Alarms from '../components/Alarms.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/alarms',
    name: 'alarms',
    component: Alarms
  }
]

const router = new VueRouter({
  routes
})

export default router
