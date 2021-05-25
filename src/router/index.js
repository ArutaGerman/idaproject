import Vue from 'vue'
import VueRouter from 'vue-router'
import routesProducts from '@/router/routes/routesProducts'
import routesCart from '@/router/routes/routesCart'
import NotFoundComponent from '@/components/NotFoundComponent.vue'

Vue.use(VueRouter)

const routes = [
  ...routesCart,
  ...routesProducts,
  {
    path: '*', 
    component: NotFoundComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  publicPath: '',
  routes
})

export default router