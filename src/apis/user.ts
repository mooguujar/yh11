import { request } from '@/utils/http'
import { ILoginType } from '@/store/types/auth'
import {
  IAllMTypeList,
  ICoin,
  IMoneyDetailsData,
  IUserScore,
  IWalletAddress
} from '@/store/types/coin'

// 用户个人资料信息接口
export type Res = ILoginType
export const getUserInfoApi = () => {
  return request.post<Res>('/api/UserCenter/getInfo', {
    responseType: 'arraybuffer',
    options: {}
  })
}

export interface getUserCoinsParams {
  mtype?: number
}
export const getUserCoinApi = (params: getUserCoinsParams) => {
  return request.post<ICoin[]>('/api/UserCenter/userCoins', params)
}
export interface getUserWalletAddressParams {
  token: string
  mtype: number
  coin_name: string
  coin_protocol: string
  coin_wallet_api: string
  create?: number
}
export const userWalletAddressApi = (params: getUserWalletAddressParams) => {
  return request.post<IWalletAddress[]>('/api/Wallet/checkAddress', params)
}

export interface updateUserInfoParams {
  headimg?: string
  email?: string
  nickname?: string
  phone?: string
  set_lang?: string
  telegram_app?: string
  whats_app?: string
  line_app?: string
  zalo_app?: string
}
export const updateUserInfoApi = (params: updateUserInfoParams) => {
  return request.post<ICoin[]>('/api/Usercenter/userUpdate', params)
}

export interface userMoneyDetailsParams {
  // 单条查询时 需传id
  id?: number
  time?: string
  mtype?: string
  trade_type?: string
  remoney_type?: string
  page?: number
  pagesize?: number
}

export const getMoneyDetailsApi = (params: userMoneyDetailsParams) => {
  return request.post<IMoneyDetailsData>('/api/Usercenter/getMoneyDetails', params)
}

export interface setPayPassParams {
  newpasswd: string
  newpasswdck: string
  google_verify_code?: string
}

export const userPayPassAddApi = (params: setPayPassParams) => {
  return request.post<any>('/api/Userpaypass/PaypassAdd', params)
}

export interface updatePayPassParams {
  oldpasswd: string
  newpasswd: string
  newpasswdck: string
  mobile?: string
  code?: string
  google_verify_code?: string
}

export const userPayPassUpdateApi = (params: updatePayPassParams) => {
  return request.post<any>('/api/Userpaypass/PayPasswdUpdate', params)
}
export interface resetPayPassParams {
  newpasswd: string
  newpasswdck: string
  img: string
  mobile?: string
  code?: string
}

export const userPayPassResetApi = (params: resetPayPassParams) => {
  return request.post<any>('/api/Userpaypass/PayPasswdReset', params)
}

export interface bankListParams {
  country_code?: string
}

export const bankListApi = (params: bankListParams) => {
  return request.post<any>('/api/user/Systembankcode', params)
}

export interface addAddressParams {
  passwd: string // 資金交易密碼
  mtype: string
  coin_name: string
  coin_protocol: string
  coin_address: string
  account_bank_realname: string
  account_bankname: string
  account_bankcode: string
  code_imgurl: string
  google_verify_code?: string
  force?: number
}
export const addWithdrawAddressApi = (params: addAddressParams) => {
  return request.post<any>('/api/Usercenter/withdrawddressAdd', params)
}

export interface deleteAddressParams {
  passwd: string // 資金交易密碼
  id: string
}

export const deleteWithdrawAddressApi = (params: deleteAddressParams) => {
  return request.post<any>('/api/Usercenter/withdrawddressdelete', params)
}

export interface userVerifiedParams {
  name: string
  idcard_id: string
  idcardimg?: string
  force?: number
  faceimg?: string
}
export const userVerifiedApi = (params: userVerifiedParams) => {
  return request.post<any>('/api/Usercenter/userVerified', params)
}
export interface IAllMTypeParams {
  money_type?: string
  parent_trade_type?: string
  is_realmoney?: string
  remoney_type?: string
}
export const getAllMTypeApi = (params: IAllMTypeParams) => {
  return request.post<IAllMTypeList[]>('/api/Systeminfo/moneyType', params)
}
export const getUserScoreApi = () => {
  return request.post<IUserScore>('/api/Usercenter/userscore')
}
