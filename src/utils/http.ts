import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { defaultParams, getLoginStatus } from './tools'
import Toast, { Loading } from './toast'
import { showToast } from 'vant'
import warningIcon from '@/assets/images/common/important.png'
import errorIcon from '@/assets/images/common/error.png'
import infoIcon from '@/assets/images/common/info.png'
import { AxiosErrorConfigExtended, AxiosRequestConfigExtended, CustomAxiosRequestConfig } from '.'
import { useCommonStore } from '@/store/modules/common'
// 保存 Content-Type 的图片类型
const contentTypeImg = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']
const defaultOptions = {
  auth: false,
  showLoading: false,
  showErrorToast: true
}

interface ResData<T> {
  code: number
  msg: string
  data: T
}
let SERVE_URL = sessionStorage.getItem('SERVE_URL') || ''

// 全局请求白名单（不做取消请求操作）
const WHITERLIST_REQUEST = [
  '/pay/cjfpay/h5init',
  '/api/Systeminfo/Defaultinfo',
  '/api/Coin/SellOrders'
]

class CustomAxios {
  private axiosInstance: AxiosInstance

  constructor() {
    // 初始实例化操作
    this.axiosInstance = null as any
  }

  // 错误处理
  private errorHandler<T>(error: AxiosError | ResData<T>, options?: Record<string, any>) {
    const op = options ?? (error as any)?.config?.options ?? {}

    if (error.code && (error as ResData<T>).msg) {
      const { code, msg } = error as ResData<T>
      // token失效后，跳转登录页
      const handleTokenExpires = () => {
        // window.log('location', window.location)
        // const matchArr = window.location.href.match(/(?<=h5)\S+$/)
        // if (matchArr) {
        //   window.location.href = window.location.href.replace(matchArr[0], '/auth/login')
        // }
        // const { href, hash } = window.location
        // window.location.href = href.replace(hash, '#/auth/login')
        const search = new URLSearchParams(window.location.search || window.location.hash)
        const vtoken = search.get('vtoken') || ''
        const deviceid = search.get('deviceid') || ''
        if (!vtoken && !deviceid) {
          const { href, hash } = window.location
          window.location.href = href.replace(hash, '#/auth/login')
        } else {
          showToast({
            type: 'html',
            message: '登录已过期，请手动关闭页面，\n返回游戏重新打开',
            className: 'session-expired-toast',
            icon: warningIcon,
            duration: 0,
            overlay: true
          })
          // setTimeout(() => {
          //   window.close()
          // }, 3000)
        }
      }

      switch (code) {
        case 10066:
          break
        case 10007:
        case 10008:
          return handleTokenExpires()
        case 1:
          break
        // eslint-disable-next-line indent
        default:
          break
      }

      console.log('code', code)
      console.log('msg', msg)

      if (op?.showErrorToast) {
        if ([134].includes(code)) {
          showToast({ message: msg, icon: infoIcon })
        } else if (code === 10021) {
          showToast({ message: '身份证信息已被注册', icon: errorIcon })
        } else {
          showToast({ message: msg, icon: errorIcon })
        }
      }
    } else {
      const errMessage = (error as AxiosError).message

      if (op?.showErrorToast) showToast({ message: errMessage, icon: errorIcon })
    }
    if (Loading.isShow) Loading.hide(op?.hideLoadingInstantly)
  }

  request() {
    return {
      success: (config: CustomAxiosRequestConfig) => {
        if (!WHITERLIST_REQUEST.includes(config.url as string)) {
          const commonStore = useCommonStore()
          const controller = new AbortController() // 每个请求时都新生成一个AbortController实例
          config.signal = controller.signal // 设置请求的signal字段为new AbortController()的signal
          // commonStore.addRequest(controller)
        }

        const options = Object.assign({}, defaultOptions, config.options ?? {})
        const { auth, showLoading } = options

        if (showLoading) Loading.show()

        const { isLogin, token } = getLoginStatus()

        if (auth && !isLogin) {
          this.errorHandler<null>(
            {
              code: 10066,
              msg: '请先登录',
              data: null
            },
            options
          )

          return Promise.reject({
            code: 10066,
            msg: '请先登录'
          })
        }
        // 如果已经登录，就新增参数token
        if (config.method === 'get') {
          if (isLogin) {
            config.params.token = token
          } else {
            config.params.token = sessionStorage.getItem('token') || ''
          }

          config.params = defaultParams('post', config.params)
        }
        if (config.method === 'post') {
          if (config.data && typeof config.data === 'object') {
            if (isLogin) {
              config.data.token = token
            } else {
              config.data.token = sessionStorage.getItem('token') || ''
            }
          }

          config.data = defaultParams('post', config.data)
        }
        // if (isLogin) config.headers.Authorization = `Bearer ${token}`;

        return Object.assign(config, { options })
      },
      error: (error: AxiosError) => {
        console.log('request:error', error)
        this.errorHandler(error)

        return Promise.reject(error)
      }
    }
  }

  response() {
    return {
      success: (response: AxiosResponse): AxiosResponse => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _options = (response.config as CustomAxiosRequestConfig).options

        if (contentTypeImg.includes(response.headers['content-type'])) {
          return response
        }
        if (response.data.code !== 0) {
          this.errorHandler(response.data, _options)
          // throw response.data;
        }

        return response
      },
      error: (error: AxiosErrorConfigExtended) => {
        if (!error.config || !error.config.retry) {
          this.errorHandler(error as AxiosError)
          return Promise.reject(error)
        }

        error.config.retry -= 1 //记录请求
        const delay = new Promise(resolve => {
          setTimeout(() => {
            resolve('')
          }, error.config.retryDelay)
        })
        // 等待请求重发
        return delay.then(() => {
          return this.axiosInstance(error.config as AxiosRequestConfigExtended)
        })
      }
    }
  }

  responseData = <T>(response: AxiosResponse<ResData<T>>, config?: CustomAxiosRequestConfig): T => {
    const { data } = response
    if (Loading.isShow) Loading.hide(config?.options?.hideLoadingInstantly)
    if (config?.options?.returnFull) return data as unknown as T
    if (data.data instanceof Array && data.data.length == 0) {
      ;(data.data as any).code = data.code
      return data.data
    }

    return data.data ? data.data : (data as unknown as T)
  }

  init() {
    let SERVE_URL = sessionStorage.getItem('SERVE_URL') || ''

    this.axiosInstance = axios.create({
      baseURL: process.env.NODE_ENV === 'dev' ? import.meta.env.VITE_APP_BASE_URL : SERVE_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      timeout: 5000,
      retry: 3, // 重试次数
      retryDelay: 300 // 重试间隔
    } as AxiosRequestConfigExtended)

    const response = this.response()

    // 添加响应拦截器
    this.axiosInstance.interceptors.response.use(response.success, response.error)
    // 添加请求拦截器
    const request = this.request()

    this.axiosInstance.interceptors.request.use(request.success as any, request.error)
  }

  // 发送 GET 请求
  get<T>(url: string, params: any = {}, config?: CustomAxiosRequestConfig): Promise<T> {
    if (!this.axiosInstance) {
      this.init()
    }

    return this.axiosInstance
      .get(url, {
        params
      })
      .then(response => this.responseData<T>(response, config))
      .catch(error => {
        throw error
      })
  }

  // // 发送 POST 请求
  post<T>(url: string, data: any = {}, config?: CustomAxiosRequestConfig): Promise<T> {
    if (!this.axiosInstance) {
      this.init()
    }

    return this.axiosInstance
      .post<ResData<T>>(url, data, config)
      .then(response => this.responseData<T>(response, config))
      .catch(error => {
        throw error
      })
  }

  // 其他自定义方法
}

export const request = new CustomAxios()
export default CustomAxios
