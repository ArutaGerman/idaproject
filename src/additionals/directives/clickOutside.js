import Vue from 'vue';

// Директива для закрытия блока при клике за его пределами
export const clickOutside = {
    bind(el, binding) {
        el.addEventListener('click', e => e.stopPropagation());
        document.body.addEventListener('click', binding.value);
    },
    unbind(el, binding) {
        document.body.removeEventListener('click', binding.value);
    }
}

export default clickOutside;
Vue.directive('clickOutside', clickOutside);