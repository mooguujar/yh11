import { request } from '@/utils/http'

export const uploadImgApi = (params: any) => {
  return request.post('/api/User/uploadimg', params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 30000 // 超时时间为30秒
  })
}

export interface IAppLogParams {
  platform: string
  filepath?: string
  url?: string
  runningFunction?: string
}
export const appLogApi = async (params: IAppLogParams) => {
  if (import.meta.env.VITE_APP_ENV === 'prod') return
  // return Promise.resolve(123)
  return request.post<any>('/api/user/appLog', params)
}
