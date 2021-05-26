import Vue from 'vue';

// Директива для поля ввода телефона
export const inputPhoneMask = {
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
  }
}

export default inputPhoneMask;
Vue.directive('inputPhoneMask', inputPhoneMask);


