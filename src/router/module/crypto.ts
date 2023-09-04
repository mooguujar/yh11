const crypto = [
  {
    path: '/buyCoin',
    name: 'BuyCoin',
    component: () => import(/* webpackChunkName: "crypto" */ '@/pages/Crypto/buy.vue')
  },
  {
    path: '/selfbuyCoin',
    name: 'selfbuyCoin',
    component: () => import(/* webpackChunkName: "crypto" */ '@/pages/Crypto/selfbuyCoin.vue')
  },
  {
    path: '/sellCoin',
    name: 'SellCoin',
    component: () => import(/* webpackChunkName: "crypto" */ '@/pages/Crypto/sell.vue')
  },
  {
    path: '/orderCreate',
    name: 'orderCreate',
    component: () => import(/* webpackChunkName: "crypto" */ '@/pages/Crypto/orderCreate.vue')
  },
]

export default crypto
