import { defineStore } from 'pinia'
import piniaStore from '@/store/index'
import { EntryState } from '../../types/entry'
import { getConfig } from '@/apis/entry'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export const useEntryStore = defineStore('entry', {
  state: () =>
    ({
      config: {
        SYS_SET_DATETIME_CONFIG: {},
        SYS_SET_LANG_APICONFIG: {},
        WEB_SET_HomeExt: {},
        WEB_SET_coinset_config: {},
        WEB_Set_App_Version: {},
        Web_BuySell_Coin_Times: {},
        Web_Set_DefaultInfo: {},
        Web_Set_JFpoint: {},
        Web_Set_SysMoney_Config: {},
        Web_Set_WebMoney_savewithdraw: {},
        Web_Set_WebReg: {},
        Web_Transfer_BuySell_Coin_Fee: {}
      },
      fingerprint: ''
    } as EntryState),
  getters: {
    imgServerUrl: state => {
      return state.config.Web_Set_DefaultInfo?.imgserver_url.v
    }
  },
  actions: {
    // toggleTheme(dark: boolean) {
    //   if (dark) {
    //     this.theme = 'dark'
    //     document.documentElement.classList.add('dark')
    //   } else {
    //     this.theme = 'light'
    //     document.documentElement.classList.remove('dark')
    //   }
    // },
    updateEntryState(partial: Partial<EntryState>) {
      this.$patch(partial)
    },
    async getConfigApi() {
      try {
        const response = await getConfig()
        this.config = response
        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    async getFingerprint() {
      try {
        const fp = await FingerprintJS.load()
        const result = await fp.get()

        this.fingerprint = result.visitorId

        return {
          visitorId: result.visitorId
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  },
  persist: true
})

export function useEntryOutsideStore() {
  return useEntryStore(piniaStore)
}
