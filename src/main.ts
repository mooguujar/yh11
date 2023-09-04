import './basic-type-extensions'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import piniaStore from './store'
import router from './router'
import {
  Button,
  Lazyload,
  NavBar,
  Tab,
  Tabs,
  Toast,
  Dialog,
  Swipe,
  SwipeItem,
  SwipeCell,
  PullRefresh,
  Loading
} from 'vant'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'amfe-flexible'
import { MyLog } from './utils/tools'
import 'vant/es/toast/style'

// 在创建跟实例以后调用， 需要借助webpack的异步模块加载能力
// const env = import.meta.env.VITE_APP_ENV // 获取配置信息
// if (env) {
//   Promise.all([import('vconsole'), import('vue-vconsole-devtools')]).then(res => {
//     if (res.length === 2) {
//       // Vue.config.devtools = true
//       // window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue)
//       const VConsole = res[0].default
//       const Devtools = res[1].default
//       Devtools.initPlugin(new VConsole())
//     }
//   })
// }

// const filename =
//   process.env.NODE_ENV === 'dev'
//     ? '../../public/config_dev.json?time=' + Date.now()
//     : '/config.json?time=' + Date.now()

// try {
//   const response = await fetch(filename)
//   if (!response.ok) {
//     throw new Error('网络请求失败')
//   }
//   const config = await response.json()
//   sessionStorage.setItem('SERVE_URL', config.SERVE_URL)

    MyLog()
    dayjs.locale('zh-cn') // 设置 dayjs 语言

    const app = createApp(App)
    // 挂载到 Vue 根实例
    app.use(piniaStore)
    app.use(router)
    app.use(Button)
    app.use(NavBar)
    app.use(Tab)
    app.use(Tabs)
    app.use(Lazyload)
    app.use(Toast)
    app.use(Dialog)
    app.use(Swipe)
    app.use(SwipeItem)
    app.use(SwipeCell)
    app.use(PullRefresh)
    app.use(Loading)

    app.mount('#app')

// } catch (err) {
//   console.error('读取或解析配置文件时发生错误:', err)
// }


