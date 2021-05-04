import GoodsList from '@/components/GoodsList.vue'
import App from '@/App'

const routesProducts = [{
    path: '/',
    name: 'App',
    component: App,
    redirect: {
      path: '/goods/1/Rukzaki' //редирект на первую категорию
    }
  },
  {
    path: '/goods/:id/:name',
    name: 'GoodsList',
    component: GoodsList,
    props: true,
  },

];

export default routesProducts
