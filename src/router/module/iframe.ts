const auth = [
  {
    path: '/iframe-page',
    name: 'IframePage',
    component: () => import(/* webpackChunkName: "iframe-page" */ '@/pages/Iframe/index.vue'),
    children: [
      {
        // 客服
        path: 'customer-service',
        name: 'CustomerService',
        meta: {
          title: 'customer service'
        },
        component: () =>
          import(/* webpackChunkName: "iframe-page" */ '@/pages/Iframe/CustomerService.vue')
      },
      {
        // 教程
        path: 'tutorial',
        name: 'Tutorial',
        meta: {
          title: 'tutorial'
        },
        component: () => import(/* webpackChunkName: "iframe-page" */ '@/pages/Iframe/Tutorial.vue')
      },
      {
        // 第三方外链
        path: 'third',
        name: 'Third',
        meta: {
          title: 'third page'
        },
        component: () => import(/* webpackChunkName: "iframe-page" */ '@/pages/Iframe/Third.vue')
      }
    ]
  }
]

export default auth
