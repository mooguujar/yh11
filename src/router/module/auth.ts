const auth = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/pages/Auth/index.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "auth" */ '@/pages/Auth/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "auth" */ '@/pages/Auth/Register.vue')
      }
    ]
  }
]

export default auth
