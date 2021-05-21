import GoodsList from '@/components/GoodsList.vue'
import App from '@/App'
import NotFoundComponent from '@/components/NotFoundComponent.vue'

const routesProducts = [
  {
    path: '/',
    name: 'App',
    component: App,
    redirect: {
      path: '/goods/1' //редирект на первую категорию
    }
  },
  {
    path: '/goods/:id',
    name: 'GoodsList',
    component: GoodsList,
    props: true,
  },
  {
    path: '*', 
    component: NotFoundComponent
  }
];

export default routesProducts