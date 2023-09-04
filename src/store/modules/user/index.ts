import {
  IAllMTypeParams,
  getAllMTypeApi,
  getUserScoreApi,
  getUserWalletAddressParams,
  userWalletAddressApi
} from '@/apis/user'
import { userState } from '@/store/types/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      userWallet: [],
      mtypeList: [],
      userScore: {
        score: 0,
        scorelevel: 0
      }
    } as userState),
  getters: {},
  actions: {
    async getUserWalletAddressApi(params: getUserWalletAddressParams) {
      try {
        const response = await userWalletAddressApi(params)

        this.userWallet = response

        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async getAllMType(params: IAllMTypeParams) {
      try {
        const response = await getAllMTypeApi(params)

        this.mtypeList = response

        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async getUserScore() {
      try {
        const response = await getUserScoreApi()

        this.userScore = response

        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  },
  persist: true
})
