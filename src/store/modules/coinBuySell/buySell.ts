import { defineStore } from 'pinia'
import { request } from '@/utils/http'
import { buySellCoinInfoApi } from '@/apis/buySellCoin'
import { getWithdrawddresslist, withdrawddresslist } from '../../types/buySellCoin'
import {
  IBuySellCoin,
  IBuyOrderData,
  ISellOrderData,
  SellOrder,
  BuyOrder
} from '@/store/types/buySellCoin'

import { error } from 'console'

export const useCoinBuySellStore = defineStore('coin', {
  state: () => ({
    token: '',
    userInfo: sessionStorage['userInfo'] || {},
    withdrawddresslist: (sessionStorage['withdrawddresslist'] as withdrawddresslist[]) || [],
    sell_orders: (sessionStorage['sell_orders'] as SellOrder[]) || [],
    buy_orders: (sessionStorage['buy_orders'] as BuyOrder[]) || [],
    coins: [],
    dealInfo: {
      wallets: {},
      buy_orders: [],
      sell_orders: []
    } as IBuySellCoin
  }),
  getters: {},
  actions: {
    async getInfo() {
      try {
        const response: any = await request.post('/api/UserCenter/getInfo', {})
        this.userInfo = response.info ? response.info : {}
        console.log('this.userInfo', this.userInfo)
        if (!!!this.userInfo) console.log('返回数据格式异常000')
      } catch (error) {
        console.log('返回数据异常', error)
        throw error
      }
    },
    async getWithdrawddresslist(params: any) {
      try {
        const response: any = await request.post('/api/Usercenter/withdrawddresslist', params, {
          options: {
            auth: true
          }
        })
        this.withdrawddresslist = response.list ? response.list : []
        // if (!!!this.withdrawddresslist.length) console.log('返回数据格式异常000')
      } catch (error) {
        console.log('返回数据异常', error)
        throw error
      }
    },
    async getBuySellCoinInfo(params: any) {
      try {
        const response: any = await buySellCoinInfoApi(params)
        this.dealInfo = response
        this.sell_orders = response.sell_orders ? response.sell_orders : []
        this.buy_orders = response.buy_orders ? response.buy_orders : []
        // if (!!!this.sell_orders.length) console.log('返回数据格式异常000')

        return response
      } catch (error) {
        console.log('返回数据异常', error)
        throw error
      }
    }
  },
  persist: [
    // {
    //   key: 'withdrawddresslist',
    //   storage: sessionStorage
    // },
    // {
    //   key: 'sell_orders',
    //   storage: sessionStorage
    // },
    // {
    //   key: 'buy_orders',
    //   storage: sessionStorage
    // },
    {
      key: 'userInfo',
      storage: sessionStorage
    }
  ]
})
