import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Alarms from '../components/Alarms.vue'
import Messageboard from '../components/Messageboard.vue'

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
  },
  {
    path: '/messageboard',
    name: 'messageboard',
    component: Messageboard
  }
]

const router = new VueRouter({
  routes
})

export default router
