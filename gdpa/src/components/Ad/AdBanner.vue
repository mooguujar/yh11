<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth'
import { useEntryStore } from '@/store/modules/entry'
import { IWebUrlLink } from '@/store/types/entry'
import { requireImg } from '@/utils/tools'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

interface adBannerProps {
  // 是否为轮播图
  slider: boolean
}
const props = withDefaults(defineProps<adBannerProps>(), {
  slider: false
})

const router = useRouter()

const authStore = useAuthStore()
const { token } = storeToRefs(authStore)

const entryStore = useEntryStore()
const { config } = storeToRefs(entryStore)

const adSliderList = ref<IWebUrlLink[]>([])
// banner列表变更记录
const checkCount = ref(0)

const isLogin = computed(() => !!token.value)
// 单个链接banner
const adModWebUrlLink = computed<IWebUrlLink>(
  () => (config.value.Web_Set_DefaultInfo?.AD_Mod_WebUrlLink ?? {}) as IWebUrlLink
)
// 轮播banner
const adModWebUrlLinkArr = computed<IWebUrlLink[]>(
  () => (config.value.Web_Set_DefaultInfo?.AD_Mod_WebUrlLink_Arr ?? {}) as IWebUrlLink[]
)
const isShow = computed(() => {
  if (props.slider) return adModWebUrlLinkArr.value.some(item => item.is_show && item.v)
  return adModWebUrlLink.value.is_show && adModWebUrlLink.value.v
})

const onImageError = (e: Event, index: number) => {
  ;(e.target as HTMLImageElement).onerror = null
  adSliderList.value = []

  nextTick(() => {
    adSliderList.value = adModWebUrlLinkArr.value
  })
}

// 广告位跳转
const goPage = (webUrlLink: string) => {
  const url = new URL(webUrlLink)
  if (adModWebUrlLink.value.H5_action) {
    const { href, hash } = window.location

    router.push(adModWebUrlLink.value.H5_action)
    // window.location.href = href.replace(hash, `#${adModWebUrlLink.value.H5_action}`)
  } else {
    window.open(webUrlLink, '_blank')
  }
}

const handleClick = async (data: IWebUrlLink) => {
  const { app_action, H5_action, WebUrlLink, isAppLogin, target } = data
  if (isAppLogin && !isLogin.value) {
    return showToast({
      message: '请先登录',
      icon: requireImg('common/info.png'),
      iconSize: '48px'
    })
  }

  if (H5_action) {
    if (target === 1) {
      window.open(WebUrlLink, '_blank')
    } else {
      router.push(H5_action)
    }
  } else {
    window.open(WebUrlLink, '_blank')
  }
}

watch(
  adModWebUrlLinkArr,
  (list, oldList) => {
    if (checkCount.value < 3) {
      adSliderList.value = adModWebUrlLinkArr.value
      checkCount.value++
    }
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <!-- 广告位 -->
  <div
    v-if="isShow"
    class="app-ad-banner-container"
  >
    <van-swipe
      v-if="slider"
      :autoplay="2000"
      lazy-render
      indicator-color="white"
      class="swipe-slider"
    >
      <van-swipe-item
        v-for="(item, index) in adSliderList"
        :key="item.app_action"
        @click="handleClick(item)"
      >
        <van-image
          :src="(item.v as string)"
          @error="onImageError($event, index)"
        />
      </van-swipe-item>
    </van-swipe>
    <img
      v-else
      :src="(adModWebUrlLink.v as string)"
      @click="goPage(adModWebUrlLink.WebUrlLink)"
    />
  </div>
</template>

<style lang="scss" scoped>
.app-ad-banner-container {
  margin: 0 auto;
  margin-bottom: 30px;
  padding: 0 41px;
  img {
    width: 100%;
  }

  :deep(.swipe-slider) {
    --van-swipe-indicator-size: 12px;
    width: 100%;
    height: 100%;
    border-radius: 14px;

    .van-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
