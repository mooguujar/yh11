import { UserMessageListParams, userMessageListApi } from '@/apis/article'
import {
  IAllMTypeParams,
  getAllMTypeApi,
  getUserCoinApi,
  getUserCoinsParams,
  getUserScoreApi,
  getUserWalletAddressParams,
  userWalletAddressApi,
  vipAwardApi
} from '@/apis/user'
import { userState } from '@/store/types/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      userCoins: [],
      userWallet: [],
      mtypeList: [],
      userMessage: {
        list: [],
        un_read: 0,
        count: 0
      },
      userScore: {
        score: 0,
        scorelevel: 0
      },
      vipAward: {
        account_vip: [],
        week_money: 0,
        month_money: 0,
        all_money: 0,
        vip: 0
      }
    } as userState),
  getters: {},
  actions: {
    async getUserCoinsApi(params: getUserCoinsParams) {
      try {
        const response = await getUserCoinApi(params)

        this.userCoins = response

        return response
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async getUserWalletAddressApi(params: getUserWalletAddressParams) {
      try {
        const response = await userWalletAddressApi(params)

        this.userWallet = response

        return response
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async getAllMType(params: IAllMTypeParams) {
      try {
        const response = await getAllMTypeApi(params)

        this.mtypeList = response

        return response
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async getUserMessageList(params: UserMessageListParams) {
      try {
        const response = await userMessageListApi(params)
        this.userMessage = response

        return response
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async getUserScore() {
      try {
        const response = await getUserScoreApi()

        this.userScore = response

        return response
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async getVipaward() {
      try {
        const response = await vipAwardApi()

        this.vipAward = Array.isArray(response)
          ? {
              account_vip: [],
              week_money: 0,
              month_money: 0,
              all_money: 0,
              vip: 0
            }
          : response

        return response
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  },
  persist: true
})
