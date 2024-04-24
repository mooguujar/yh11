// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

export interface RouteMeta {
  require?: string | Promise // 需要异步获取的数据
  title?: string // 标题
  isAuth?: boolean // 是否需要登录
  redirect?: string // 路由重定向
  [key: string]: any // 其他自定义属性
}
declare module 'react-router-dom' {
  interface IndexRouteObject {
    meta?: RouteMeta
  }
  interface NonIndexRouteObject {
    meta?: RouteMeta
  }
}
