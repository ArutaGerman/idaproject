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

// Компонент для поля ввода телефона, дополнительно подключает @/components/common/PhoneInput.vue
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

// Директива для закрытия блока при клике за его пределами
Vue.directive('click-outside', {
  bind(el, binding) {
    el.addEventListener('click', e => e.stopPropagation());
    document.body.addEventListener('click', binding.value);
  },
  unbind(el, binding) {
    document.body.removeEventListener('click', binding.value);
  }
});