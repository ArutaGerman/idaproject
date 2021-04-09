import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/normalize.css/normalize.css'
import Promise from 'promise-polyfill';

export const bus = new Vue();
Vue.config.productionTip = false

new Vue({
  Promise: Promise,
  router,
  render: h => h(App)
}).$mount('#app')
