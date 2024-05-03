<template>
  <nav-bar
    hide-left
    title="优惠活动"
    mode="transparent"
    class="activeList_navbar"
  />
  <div class="activeList h-[100vh]">
    <div
      class="listCard"
      v-for="(item, index) in homeSliderList"
      :key="item.id"
      @click="handleClick(item)"
    >
      <van-image
        :src="domain + homeSliderList[index].mobileimg"
        @error="onImageError($event, domain + item.mobileimg, index)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import infoIcon from '@/assets/images/common/info.png'
import passIcon from '@/assets/images/common/key.png'
import kgcoin from '@/assets/images/common/kgcoin.png'
import { useAppBar } from '@/components/AppBar/useAppBar'
import Dialog from '@/components/CommonPopup/Dialog/index'
import router from '@/router'
import { useAuthStore } from '@/store/modules/auth'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'
import { useEntryStore } from '@/store/modules/entry'
import { useUserStore } from '@/store/modules/user'
import mitt from '@/utils/mitt'
import { mergeHrefParams, requireImg } from '@/utils/tools'
import { storeToRefs } from 'pinia'
import { showFailToast, showToast } from 'vant'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { IArticleListType } from '@/store/types/article'
import { useArticleStore } from '@/store/modules/article'

const entryStore = useEntryStore()
const { config } = storeToRefs(entryStore)

const search = new URLSearchParams(mergeHrefParams())
const hs = search.get('hs') || ''
const wideMode = hs === 'h'
const targetRoute = wideMode ? 'wideOrderCreate' : 'orderCreate'

const domain = computed(() => {
  // console.log('(imgserver_url',(config.value.Web_Set_DefaultInfo?.imgserver_url as any)?.v);
  return (config.value.Web_Set_DefaultInfo?.imgserver_url as any)?.v || ''
})
const route = useRoute()
useAppBar({ mode: 'dark' })

const userStore = useUserStore()
const { getUserMessageList } = userStore
onMounted(() => {})

const articleStore = useArticleStore()
const homeSliderList = ref<IArticleListType[]>([])
const { articleList_Activity_Mod } = storeToRefs(articleStore)
const { getArticleListApi } = articleStore
getArticleListApi({ bind_key: 'Activity_Mod' })
const authStore = useAuthStore()

const { token } = storeToRefs(authStore)
const isLogin = computed(() => !!token.value)

watch(
  articleList_Activity_Mod,
  (list, oldList) => {
    homeSliderList.value = articleList_Activity_Mod.value
  },
  { deep: true, immediate: true }
)
const onImageError = (e: Event, img: string, index: number) => {
  // homeSliderList.value[index].mobileimg =
  ;(e.target as HTMLImageElement).onerror = null
  homeSliderList.value = []

  nextTick(() => {
    homeSliderList.value = articleList_Activity_Mod.value
  })
}

interface CarouselRouteKey {
  Mod_BuyCoinsGDB: string
  Mod_Movingbricks: string
  Mod_PointsActivity: string
  Mod_UserReg: string
}
const carouselRouteMap = {
  Mod_BuyCoinsGDB: '/buy_coin',
  Mod_JumpWebUrl: {
    WebUrlLink: 'http://baidu.com'
  },
  Mod_Movingbricks: '/brick',
  Mod_PointsActivity: '/point',
  Mod_UserReg: '/auth/register'
}

const handleClick = async (data: any) => {
  if (data.app_exts) {
    const { app_action, H5_action, WebUrlLink } = JSON.parse(data.app_exts)
    // window.log('当前轮播跳转信息', data)
    if (app_action === 'Mod_UserReg' && isLogin) return
    if (H5_action) {
      router.push(H5_action)
    } else if (app_action === 'Mod_Movingbricks') {
      router.push('/bricks/move-brick')
    } else if (app_action === 'Mod_PointsActivity') {
      router.push('/point')
    } else if (carouselRouteMap[app_action as keyof CarouselRouteKey] == 'Mod_BuyCoinsGDB') {
      // if (await CompletionIdCardMiddleware()) {
      //   CompletionPaymentMiddleware().then(e => {
      router.push(carouselRouteMap[app_action as keyof CarouselRouteKey])
      //   })
      // }
    } else {
      router.push(`/iframe-page/third?url=${WebUrlLink}`)
    }
  }
}
const msgtext = `您还未绑定该收款方式,是否前往绑定 </br>
</br>
</br>
`
const showDIYDialog = (path: any) => {
  Dialog.confirm({
    title: '',
    message: msgtext,
    allowHtml: true,
    messageAlign: 'center',
    className: 'selldialog',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    action: () => {
      router.push(path)
    }
  })
}
const msgtext2 = `绑定邮箱后，可以在有交易信息的时候及时通知到您！建议您绑定好邮箱地址。 </br>
</br>
</br>
`
</script>

<style lang="scss" src="./activeList.scss" scoped />
<style lang="scss"></style>
