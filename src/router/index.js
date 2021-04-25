import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '@/components/Goods.vue'
import Cart from '@/views/Cart'
import App from '@/App'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    redirect: { name: 'Goods' }  //редирект на первую категорию
  },
  {
    path: '/goods/Rukzaki',
    name: 'Goods',
    component: Goods
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