import auth from './module/auth'
import home from './module/home'
import crypto from './module/crypto'
import iframe from './module/iframe'
import details from './module/details'
import mine from './module/mine'
import order from './module/order'

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  ...auth,
  ...home,
  ...crypto,
  ...iframe,
  ...details,
  ...mine,
  ...order
]

export default routes
