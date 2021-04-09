import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '@/components/Goods.vue'
import Home from '@/views/Home'
import Cart from '@/views/Cart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Goods',
    component: Goods
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router