import Vue from 'vue'
import store from "./store/index"
import App from './App.vue'
import router from './router'
import '../node_modules/normalize.css/normalize.css'
import Promise from 'promise-polyfill';

export const bus = new Vue();
Vue.config.productionTip = false

new Vue({
  Promise: Promise,
  store,
  router,
  render: h => h(App)
}).$mount('#app')


Vue.directive('phone', {
  bind(el) {
    el.oninput = function (e) {
      if (!e.isTrusted) {
        return
      }

      const x = this.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
      const y = "+7";
      if (!x[2] && x[1] !== '') {
        this.value = x[1] === '7' ? y : y + x[1]
      } else {
        this.value = !x[3] ? y + x[2] : y + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '')
      }
    }
  },
})