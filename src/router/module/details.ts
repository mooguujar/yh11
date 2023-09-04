const details = [
  {
    path: '/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: "auth" */ '@/pages/Details/index.vue'),
    children: [
      {
        path: 'funding-details',
        name: 'FundingDetails',
        component: () => import(/* webpackChunkName: "auth" */ '@/pages/Details/FundingDetails.vue')
      },
      {
        path: 'point-details',
        name: 'PointDetails',
        component: () => import(/* webpackChunkName: "auth" */ '@/pages/Details/PointDetails.vue')
      },
      {
        path: 'other-details',
        name: 'OtherDetails',
        component: () => import(/* webpackChunkName: "auth" */ '@/pages/Details/OtherDetails.vue')
      },
      {
        path: 'message/:id',
        name: 'MessageDetail',
        component: () => import(/* webpackChunkName: "auth" */ '@/pages/Details/Message.vue')
      }
    ]
  }
]

export default details
