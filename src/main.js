import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import Swal from 'sweetalert2'
import VueCookies from 'vue-cookies'
Vue.config.productionTip = false
window.axios = axios;
window.Swal = Swal;
Vue.prototype.$apiUrl='http://localhost:4545/api'
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
Vue.use(VueCookies);