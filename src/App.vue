<script setup lang="ts">
import MenuBar from '@/components/Menu/MenuBar.vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useEntryStore } from './store/modules/entry'
import { useCommonStore } from './store/modules/common'
import { useAuthStore } from '@/store/modules/auth'
import socket from '@/utils/WSUtil'
import mitt from './utils/mitt'
import { showConfirmDialog, showDialog, showToast } from 'vant'
import iconWarning from '@/assets/images/common/warning.png'
import { enableAppBar } from '@/components/AppBar/useAppBar'
import GlobalDialog from '@/components/Common/GlobalDialog.vue'

const AppBar = enableAppBar()

// 需显示底部导航栏的路由列表
const MenuBarRouteList = ['Home', 'Point', 'Order', 'Mine']
const route = useRoute()
const commonStore = useCommonStore()
const { showLoading } = storeToRefs(commonStore)

const reqLoading = ref(false)
const isOpen = ref(false)

const { token } = storeToRefs(useAuthStore())

initApp()

async function initApp() {
  try {
    const search = new URLSearchParams(window.location.search || window.location.hash)
    const vtoken = search.get('vtoken') || ''
    const deviceid = search.get('deviceid') || ''

    console.log('url====vtoken====deviceid', window.location, vtoken, deviceid)

    // 对比vtoken,deviceid和缓存中的是否相同
    const isDifferent = () => {
      const storeVtoken = sessionStorage.getItem('vtoken')
      const storeDeviceId = sessionStorage.getItem('deviceid')
      return (
        (storeVtoken && storeVtoken !== vtoken) || (storeDeviceId && storeDeviceId !== deviceid)
      )
    }

    sessionStorage.setItem('SERVE_URL', '')
    const filename =
      process.env.NODE_ENV === 'dev'
        ? '../../public/config_dev.json?time=' + Date.now()
        : '/config.json?time=' + Date.now()
    try {
      const response = await fetch(filename)
      if (!response.ok) {
        throw new Error('网络请求失败')
      }
      const config1 = await response.json()
      sessionStorage.setItem('SERVE_URL', config1.SERVE_URL)
      console.log('config.SERVE_URL', config1.SERVE_URL)
    } catch (err) {
      console.error('读取或解析配置文件时发生错误:', err)
    }

    const { getH5init, getUserInfo } = useAuthStore()
    const entryStore = useEntryStore()
    const { config, fingerprint } = storeToRefs(entryStore)
    const { getConfigApi, getFingerprint } = entryStore

    // 内嵌打开时获取真实token信息，刷新页面则跳过
    if (
      (vtoken &&
        deviceid &&
        !sessionStorage.getItem('token') &&
        !sessionStorage.getItem('md5_pri')) ||
      isDifferent()
    ) {
      commonStore.setShowLoading(true)
      // 获取真实token信息
      const res = await getH5init({
        vtoken,
        deviceid
      })

      setTimeout(() => {
        console.log(1111, res)

        document.body.addEventListener('plugin_web_update_notice', e => {
          window.location.reload()
        })
      }, 3000)
      const userInfo = await getUserInfo()

      commonStore.setShowLoading(false)
      isOpen.value = true

      // 获取用户信息失败后，提醒用户并退出
      if (!userInfo.token) {
        showToast({
          message: '获取用户信息失败，请重新进入',
          icon: iconWarning
        })
        setTimeout(() => {
          window.close && window.close()
        }, 2000)
      }
    }

    if (!fingerprint.value) {
      getFingerprint()
    }
    getConfigApi().then(() => {
      if (!!!config.value.Web_Set_DefaultInfo?.hosts_Websocket) return
      const hosts_Websocket =
        'ws://' + (config.value.Web_Set_DefaultInfo?.hosts_Websocket as any).v || ''
      const hosts_Websocket_WSS =
        'wss://' + (config.value.Web_Set_DefaultInfo?.hosts_Websocket_WSS as any).v || ''
      const url = window.location.protocol === 'https:' ? hosts_Websocket_WSS : hosts_Websocket
      console.log('url', url, window.location.protocol)
      socket(url).start(token.value)
    })
    isOpen.value = true
  } catch (error) {
    console.error(error)
  }
}

// 请求前，显示loading遮罩，请求完成后，隐藏
watch(showLoading, (newValue, oldValue) => {
  reqLoading.value = newValue
})

onMounted(() => {
  // 检测断网
  window.addEventListener('offline', () => {
    //
  })
  // 检测有网络
  window.addEventListener('online', () => {
    // window.location.reload()
  })
  // 检测页面可见性
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // window.location.reload()
    } else {
      //
    }
  })
})
</script>

<template>
  <div class="content-container">
    <AppBar />
    <router-view v-if="isOpen" />
    <MenuBar v-if="isOpen && MenuBarRouteList.includes(route.name as string)" />

    <van-toast
      v-model:show="reqLoading"
      style="padding: 0"
    >
      <template #message>
        <svg
          class="circular"
          viewBox="0 0 50 50"
        >
          <circle
            class="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
          ></circle>
        </svg>
        <div>请求网络中...</div>
      </template>
    </van-toast>

    <GlobalDialog />

    <PreloadResources />
  </div>
</template>
<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
<style src="./assets/styles/common.scss" lang="scss"></style>
<style lang="scss">
@import '@/assets/styles/sprite-home.scss';

body {
  .circular {
    display: inline;
    height: 84px;
    width: 84px;
    animation: loading-rotate 2s linear infinite;

    .path {
      animation: loading-dash 2s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #0b75ff;
      stroke-linecap: round;
      fill: none;
    }
  }

  .van-toast {
    width: 270px;
    height: 270px;
    padding: 40px;
    font-size: 33px;

    &.van-action-sheet {
      width: 100%;
      height: auto;
      padding: 0;
    }

    .van-toast__icon {
      font-size: 110px;
    }

    .van-toast__text {
      margin-top: 15px;
      line-height: 1.5;
    }
  }
  .order_toast {
    width: 100%;
    max-width: 640px;
    height: auto;
    top: 209px;
    padding: 15px;
    padding-top: 0;
    background-color: #ebf1f6;
    text-align: justify;
  }
  .van-pull-refresh {
    height: 100%;
  }

  .f_dialog {
    .van-dialog__footer {
      .van-button {
        background: #0b75ff;
      }
    }
  }
}

@keyframes loading-rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
