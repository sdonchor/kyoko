import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Alarms from "../components/Alarms.vue";
import Messageboard from "../components/Messageboard.vue";
import Control from "../components/Control.vue";
import Config from "../components/Config.vue";
import Readings from "../components/Readings.vue";
import Logs from "../components/Logs.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/alarms",
    name: "alarms",
    component: Alarms
  },
  {
    path: "/messageboard",
    name: "messageboard",
    component: Messageboard
  },
  {
    path: "/control",
    name: "control",
    component: Control
  },
  {
    path: "/config",
    name: "config",
    component: Config
  },
  {
    path: "/logs",
    name: "logs",
    component: Logs
  }
  ,
  {
    path: "/readings",
    name: "readings",
    component: Readings
  }
];

const router = new VueRouter({
  routes
});

export default router;
