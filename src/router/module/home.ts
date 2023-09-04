// import App from '@/pages/Home/index.vue'
import mine from './mine'

const home = [
  {
    path: '/',
    name: 'App',
    // component: App,
    children: [
      {
        path: '/index',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Home/index.vue')
      },
      {
        path: '/point',
        name: 'Point',
        component: () => import(/* webpackChunkName: "point" */ '@/pages/Point/index.vue')
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "order" */ '@/pages/Order/index.vue'),
        meta: {}
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import(/* webpackChunkName: "mine" */ '@/pages/Mine/index.vue'),
        meta: {
          // requiresAuth: true, // 是否需要登录权限
        }
      }
    ]
  }
]

export default home
