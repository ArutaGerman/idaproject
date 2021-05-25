import App from '@/App'

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
    component: () => import('@/components/GoodsList.vue'),
    props: true,
  },  
];

export default routesProducts