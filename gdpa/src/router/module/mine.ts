import {
  CompletionIdCardMiddleware,
  CompletionPaymentPasswordMiddleware
} from '@/router/middleware'

const mine = [
  {
    path: '/about_us',
    name: 'about_us',
    component: () => import('@/pages/Mine/about_us.vue')
  },
  {
    path: '/payments',
    name: 'payments',
    component: () => import('@/pages/Mine/payments.vue'),
    beforeEnter: [CompletionIdCardMiddleware, CompletionPaymentPasswordMiddleware]
  },
  {
    path: '/payment_list',
    name: 'payment_list',
    component: () => import('@/pages/Mine/payment_list.vue'),
    beforeEnter: [CompletionIdCardMiddleware, CompletionPaymentPasswordMiddleware]
  },
  {
    path: '/alipay',
    name: 'alipay',
    component: () => import('@/pages/Mine/alipay.vue'),
    beforeEnter: [CompletionIdCardMiddleware, CompletionPaymentPasswordMiddleware]
  },
  {
    path: '/bank_card',
    name: 'bank_card',
    component: () => import('@/pages/Mine/bank_card.vue'),
    beforeEnter: [CompletionIdCardMiddleware, CompletionPaymentPasswordMiddleware]
  },
  {
    path: '/pay_password',
    name: 'pay_password',
    component: () => import('@/pages/Mine/pay_password.vue')
  },
  {
    path: '/login_password',
    name: 'login_password',
    component: () => import('@/pages/Mine/login_password.vue')
  },
  {
    path: '/user_info',
    name: 'user_info',
    component: () => import('@/pages/Mine/user_info.vue')
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('@/pages/Mine/verify.vue')
  },
  {
    path: '/newVerify',
    name: 'newVerify',
    component: () => import('@/pages/Mine/newVerify.vue')
  },
  {
    path: '/verifyList',
    name: 'verifyList',
    component: () => import('@/pages/Mine/verifyList.vue')
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import('@/pages/Mine/wallet.vue')
  },
  {
    path: '/wechat',
    name: 'wechat',
    component: () => import('@/pages/Mine/wechat.vue'),
    beforeEnter: [CompletionIdCardMiddleware, CompletionPaymentPasswordMiddleware]
  },
  {
    path: '/usdt',
    name: 'usdt',
    component: () => import('@/pages/Mine/usdt.vue'),
    beforeEnter: [CompletionIdCardMiddleware, CompletionPaymentPasswordMiddleware]
  },
  {
    path: '/rmb',
    name: 'rmb',
    component: () => import('@/pages/Mine/rmb.vue'),
    beforeEnter: [CompletionIdCardMiddleware, CompletionPaymentPasswordMiddleware]
  },
  {
    path: '/credit',
    name: 'credit',
    component: () => import('@/pages/Mine/credit.vue')
  },
  {
    path: '/bind_email',
    name: 'bind_email',
    component: () => import('@/pages/Mine/bind_email.vue'),
    beforeEnter: [CompletionIdCardMiddleware]
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/pages/Mine/message.vue')
  },
  {
    path: '/vip',
    name: 'Vip',
    component: () => import('@/pages/Mine/vip.vue')
  }
]

export default mine
