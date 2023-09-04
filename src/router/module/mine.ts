// import Mine from '@/pages/Mine/index.vue'

const mine = [
  {
    path: '/about_us',
    name: 'about_us',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Mine/about_us.vue')
  },
  {
    path: '/alipay',
    name: 'alipay',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Mine/alipay.vue')
  },
  {
    path: '/bank_card',
    name: 'bank_card',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Mine/bank_card.vue')
  },
  {
    path: '/pay_password',
    name: 'pay_password',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Mine/pay_password.vue')
  },
  {
    path: '/user_info',
    name: 'user_info',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Mine/user_info.vue')
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Mine/verify.vue')
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Mine/wallet.vue')
  },
  {
    path: '/wechat',
    name: 'wechat',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Mine/wechat.vue')
  },
  {
    path: '/credit',
    name: 'credit',
    component: () => import('@/pages/Mine/credit.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Mine/message.vue')
  }
]

export default mine
