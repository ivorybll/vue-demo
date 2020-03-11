import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  post,
  get
} from "api"
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
