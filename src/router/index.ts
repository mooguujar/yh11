import {
  RouteLocationNormalized,
  RouteRecordName,
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routers'
import { useAuthStore } from '@/store/modules/auth'
import { useCommonStore } from '@/store/modules/common'
// const HomeView = () => import(/* webpackChunkName: "Home" */ '@/pages/Home/index.vue')

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory('/h5'),
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: HomeView,
  //   },
  //   {
  //     path: '/:pathMatch(.*)*',
  //     redirect: '/',
  //   },
  // ],
  routes: routes
})

router.beforeEach((to, from, next) => {
  // 如果未匹配到路由
  if (to.matched.length === 0) {
    // 如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
    from.path ? next({ path: from.path }) : next('/')
  } else {
    const commonStore = useCommonStore()
    // 跳转路由前，终止所有未完成的请求
    commonStore.abortAllRequest()

    const search = new URLSearchParams(window.location.search)
    const vtoken = search.get('vtoken') || ''
    const deviceid = search.get('deviceid') || ''

    // 非开发环境，屏蔽跳转到登录页
    if (import.meta.env.VITE_APP_ENV !== 'dev' && to.name === 'Login') return

    // 兼容本地H5调式页面，未获取到token，则跳转到登录页，避免页面显示异常
    if (
      import.meta.env.VITE_APP_ENV === 'dev' &&
      !vtoken &&
      !deviceid &&
      !sessionStorage.getItem('token') &&
      to.name !== 'Login'
    ) {
      next('/auth/login')
      return
    }
    // 如果匹配到正确跳转
    next()
  }
})

export default router
