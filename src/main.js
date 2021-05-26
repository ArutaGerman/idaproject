import Vue from 'vue'
import store from "./store/index"
import App from './App.vue'
import router from './router'
import '../node_modules/normalize.css/normalize.css'
import Promise from 'promise-polyfill';

Vue.config.productionTip = false

new Vue({
  Promise: Promise,
  store,
  router,
  render: h => h(App)
}).$mount('#app')

