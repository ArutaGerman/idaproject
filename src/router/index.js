import Vue from 'vue'
import VueRouter from 'vue-router'
import routesProducts from '@/router/routes/routesProducts'
import routesCart from '@/router/routes/routesCart'

Vue.use(VueRouter)

const routes = [
  ...routesProducts,
  ...routesCart
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  publicPath: '',
  routes
})

export default router