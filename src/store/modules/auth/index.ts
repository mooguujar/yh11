import { defineStore } from 'pinia'
import { AuthState, ICountryCoin } from '../../types/auth'
import {
  CountryParams,
  LoginParams,
  RegisterParams,
  getCountryCode,
  loginApi,
  registerApi,
  mobileCodeApi,
  MobileCodeParams,
  H5InitApi,
  IH5initParams
} from '@/apis/auth'
import { useArticleStore } from '../article'
import { useTaskActivityStore } from '../taskActivity'
import { getUserCoinApi, getUserInfoApi, getUserCoinsParams } from '@/apis/user'
import socket from '@/utils/WSUtil'
import { ICoin } from '@/store/types/coin'

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      token: '',
      userInfo: {},
      editreview: {},
      countryCode: {
        country_coin: [],
        lastGetTime: 0,
        current: {}
      },
      coins: []
    } as AuthState),
  getters: {
    isLogin(state): boolean {
      return !!state.token
    },
    isSetPayPassword(state): boolean {
      return state?.userInfo?.is_set_paypassword === 1
    },
    // 用户积分
    getUserPoint(state) {
      return state.coins.find(item => item.mtype === 20)
    },
    // 根据mtype参数获取对应coins信息
    getUserMoneyByMType(state) {
      const userMoney = state.coins.filter(item => item.mtype)
      return (mtype: number) => userMoney.find(item => item.mtype === mtype) || ({} as ICoin)
    },
    // 不可用资金，手动计算=》 总资金 - 可用资金
    getFreezeMoney(state) {
      return (mtype: number) => {
        const { available_coincash = 0, coincash = 0 } = this.getUserMoneyByMType(mtype) as ICoin
        return +coincash - +available_coincash
      }
    }
  },
  actions: {
    updateEntryState(partial: Partial<AuthState>) {
      this.$patch(partial)
    },
    async getH5init(params: IH5initParams) {
      try {
        // 请求前先清空
        this.token = ''

        const response = await H5InitApi(params)

        if (response.token) {
          sessionStorage.setItem('vtoken', params.vtoken)
          sessionStorage.setItem('deviceid', params.deviceid)
          sessionStorage.setItem('token', response.token)
          sessionStorage.setItem('md5_pri', response.md5_pri)
          // 获取到token后，才能渲染视图
          this.token = response.token
        }

        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async getLoginApi(params: LoginParams) {
      try {
        const response = await loginApi(params)
        const { mobile, pass } = params

        // const _mobile = mobile.replace(phoneCode, '')
        // const currentCountryInfo = this.countryCode.country_coin.find(
        //   (item: ICountryCoin) => item.country_code === countryCode
        // )

        this.token = response.token
        sessionStorage.setItem('token', response.token)
        // socket().start(this.token)
        this.userInfo = { ...response.info, mobile, pass }
        this.editreview = response.editreview
        // this.countryCode = { ...this.countryCode, current: currentCountryInfo }

        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async getRegisterApi(params: RegisterParams) {
      try {
        const response = await registerApi(params)

        const { country_code: countryCode, internationalcode: phoneCode, mobile, pass } = params

        const _mobile = mobile.replace(phoneCode as string, '')
        const currentCountryInfo = this.countryCode.country_coin.find(
          (item: ICountryCoin) => item.country_code === countryCode
        )

        this.userInfo = { ...this.userInfo, countryCode, phoneCode, mobile: _mobile, pass }
        this.countryCode = { ...this.countryCode, current: currentCountryInfo as ICountryCoin }

        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async getCountryCodeApi(params: CountryParams) {
      try {
        const response = await getCountryCode(params)
        this.countryCode = response

        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    // 累计任务列表
    async getUserCoin(params: getUserCoinsParams) {
      try {
        const response = await getUserCoinApi(params)
        this.coins = response

        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    // get User Info
    async getUserInfo() {
      try {
        const response = await getUserInfoApi()

        this.token = response.token
        this.userInfo = {
          ...response.info
          // is_set_paypassword: 2,
        }

        console.log(response.info.is_set_paypassword, 'response.info')
        this.editreview = response.editreview

        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    // 退出登录时，重置相应store状态
    logout() {
      this.token = ''
      // sessionStorage.clear()
      const articleStore = useArticleStore()
      const taskActivityStore = useTaskActivityStore()

      // articleStore.$reset()
      taskActivityStore.$reset()
    }
  },
  persist: true
})
