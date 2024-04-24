<template>
  <NavBar
    v-if="wideMode"
    class="nav-bar"
    title="在线充值"
    mode="icons"
  >
    <template #title>
      <div
        class="title_buy_top title_left"
        :class="active == 0 ? 'active' : ''"
        @click="toggleBuyCoin(0)"
      >
        自选买币
      </div>
      <div
        class="title_buy_top title_right relative"
        @click="toggleBuyCoin(2)"
        :class="[active == 2 ? 'active' : '', redDot ? 'redDot' : '']"
      >
        我的购买
        <div
          class="redDotNum flex_z"
          v-if="redDot"
        >
          {{ redDot }}
        </div>
      </div>
    </template>
    <!-- <template #right>
      <div class="!float-right username flex_s mr-[24px] relative">
        <span class="!text-[18px] text-[#fff]">
          {{
            authStore?.userInfo?.username?.length > 14
              ? authStore?.userInfo?.username.slice(0, 14) + '...'
              : authStore?.userInfo?.username || '.'
          }}
        </span>
        <div
          class="copy copy-white mx-[10px] w-[30px] !float-right text-[#3a2828]"
          @click="copy(authStore?.userInfo?.username)"
        ></div>
      </div>
    </template> -->
  </NavBar>
  <NavBar
    v-else
    class="nav-bar"
    :title="gd_buy_fixmomey == 1 && active == 2 ? '我的购买' : '在线充值'"
    mode="icons"
  >
    <template #right>
      <div class="right_nav mr-[65px]">
        <van-icon
          v-if="gd_buy_fixmomey == 1 && active != 2 && !amountScope"
          name="orders-o !text-[#fff]"
          @click="router.push('/onlineCharge?active=2')"
        />
      </div>
    </template>
  </NavBar>
  <div
    class="blue-bg"
    v-if="!onlineCharge"
  ></div>
  <div :class="`home-container flex flex-col ${onlineCharge ? 'wide' : ''}`">
    <div class="main-content-container flex flex-col">
      <BuyCoin />
    </div>

    <van-dialog
      v-model:show="dialog.show"
      :title="dialog.data.img ? '' : dialog.data.desc || '温馨提醒'"
      theme="round-button"
      :class="wideMode ? 'wideMode select_dialog' : ''"
      :className="[
        'dialog-open-notice',
        { 'dialog-bg-img': dialog.data.img },
        { 'dialog-open-notice-wide-mode': wideMode }
      ]"
      @confirm="onClose"
    >
      <!-- <i
        class="icon-close block"
        :class="dialog.data.img ? 'close-white' : 'close-dark'"
        @click="onClose"
      ></i> -->
      <div
        class="dialog-content"
        v-html="dialog.data.img ? '' : dialog.data.content"
        v-content
      ></div>

      <template #footer>
        <div
          class="btn-confirm flex items-center justify-center"
          @click="onClose"
        >
          我知道了
        </div>
        <div class="dialog-radio-controler flex items-center justify-center">
          <i
            class="radio"
            :class="dialog.allowShow ? 'radio-uncheck' : 'radio-checked'"
            @click="onCheck"
          ></i>
          <div class="radio-text">今日不再显示</div>
        </div>
      </template>
    </van-dialog>
  </div>
</template>
<script setup lang="ts">
import { BuyCancel } from '@/apis/buySellCoin'
import { appLogApi } from '@/apis/common'
import topIconBgImg from '@/assets/images/common/icon_bg.png'
import info from '@/assets/images/common/info.png'
import verified from '@/assets/images/common/verified.png'
import { useAppBar } from '@/components/AppBar/useAppBar'
import Dialog from '@/components/CommonPopup/Dialog'
import BuyCoin from '@/pages/Crypto/buy.vue'
import { useEntryStore } from '@/store'
import { useAuthStore } from '@/store/modules/auth'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'
import { useCommonStore } from '@/store/modules/common'
import { IArticleListType } from '@/store/types/article'
import { BuyOrder } from '@/store/types/buySellCoin'
import mitt from '@/utils/mitt'
import { mergeHrefParams } from '@/utils/tools'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import clipboard3 from 'vue-clipboard3'
import { useRoute, useRouter } from 'vue-router'

useAppBar({ mode: 'dark' })

const route = useRoute()
const router = useRouter()

const coin = useCoinBuySellStore()
const { getBuySellCoinInfo } = coin
const { buy_orders } = storeToRefs(coin)

const active = ref(0)
const search = new URLSearchParams(mergeHrefParams())
const hs = search.get('hs') || ''
const wideMode = hs == 'h'

const amountScope = ref() //直接查看 金额范围的数据
amountScope.value = search.get('amountScope') || ''

const topIconBg = ref(`url(${topIconBgImg})`)
// 切换买币类型
const toggleBuyCoin = (type: number = 0) => {
  active.value = type
  router.replace('/onlineCharge?active=' + type)
}

const entryStore = useEntryStore()
const { config } = storeToRefs(entryStore)

// 未处理订单数(过滤掉搬砖卖币)
const redDot = computed(() => {
  const buyOrders =
    processnum.value?.buy_orders?.filter((item: BuyOrder) => item.mtype !== 30) ?? []
  return buyOrders.length
})
// console.log('redDot', redDot.value)

const authStore = useAuthStore()
const { userInfo, processnum } = storeToRefs(authStore)

// 复制
const { toClipboard } = clipboard3()
const copy = async (text: any) => {
  try {
    await toClipboard(text)
    showToast({
      message: '复制成功',
      icon: verified,
      iconSize: '48px'
    })
  } catch (error) {
    showToast({
      message: '复制失败!!',
      icon: verified
    })
  }
}

const onlineCharge = ref(false)

const dialog = reactive({
  show: false,
  data: {
    content: `
<p>1 下单后请在15分钟内完成付款,并主动上传付款凭证</p>
<p>2 无法付款请主动取消订单,避免影响后续充值权益</p>
<p>3 请按照下单金额进行付款,修改金额造成的损失由您承担</p>
<p>4 超过15分钟订单将自动撤销,造成损害自行承担！</p>
`
  } as IArticleListType,
  allowShow: true
})
const dialogBgImg = ref(`url('')`)
let dataItem = ''
const num = ref(search.get('money') || '')
let { query, path, fullPath } = route

const gd_buy_fixmomey = ref(search.get('gd_buy_fixmomey') || (wideMode ? 1 : 0))

const onClose = () => {
  if (!!!dialog.allowShow) {
    dialog.show = false
    const currentTime: any = new Date()
    localStorage.setItem('onlineChargeLastClickTime', currentTime)
  } else {
    dialog.show = false
  }
  router.push(
    '/selfbuy_coin?onlineCharge=1&money=' +
      num.value +
      '&gd_buy_fixmomey=' +
      gd_buy_fixmomey.value +
      '&data=' +
      JSON.stringify(dataItem)
  )
}
mitt.on('onlineCharge_show', async item => {
  dataItem = item
  if (gd_buy_fixmomey.value != 1 && handleClick()) {
    dialog.show = true
  } else {
    router.push(
      '/selfbuy_coin?onlineCharge=1&money=' +
        num.value +
        '&gd_buy_fixmomey=' +
        gd_buy_fixmomey.value +
        '&data=' +
        JSON.stringify(dataItem)
    )
  }
})

function handleClick() {
  let lastClickTime: any = localStorage.getItem('onlineChargeLastClickTime')
  const currentTime: any = new Date()
  if (
    lastClickTime === null ||
    currentTime - new Date(lastClickTime).getTime() > 24 * 60 * 60 * 1000
    // currentTime - new Date(lastClickTime).getTime() > 6 * 1000
  ) {
    return true
  } else {
    return false
  }
}

const onCheck = () => {
  dialog.allowShow = !dialog.allowShow
}

active.value = query.active ? +query.active : 0
watch(
  () => router.currentRoute.value,
  async route => {
    await appLogApi({
      platform: 'H5',
      filepath: 'src/pages/Other/onlineCharge.vue',
      runningFunction: 'watch----() => router.currentRoute.value',
      url: window.location.href
    })
    const { query, path, fullPath } = route
    active.value = query.active ? +query.active : 0

    // if (route.name === 'onlineCharge' && wideMode) {
    //   setTimeout(() => {
    //     useAppBar({ mode: 'dark', right: '0' })
    //   }, 1000)
    // }
  }
)

onMounted(async () => {
  await appLogApi({
    platform: 'H5',
    filepath: 'src/pages/Other/onlineCharge.vue',
    runningFunction: 'onMounted',
    url: window.location.href
  })
  if (wideMode) {
    document.body.classList.add('wideMode')
  }
  const commonStore = useCommonStore()
  commonStore.setShowLoading(false)
  getBuySellCoinInfo({}).then(() => {
    // console.log('buy_orders.value', buy_orders.value)
    setTimeout(() => {
      let { path } = route
      if (buy_orders.value.length && !path.includes('orderCreate')) {
        const msgtext = `
          </br>
          </br>
          你还有进行中的订单 <span class="red_f">【${buy_orders.value[0].buy_num}元】</span> ，请完成支付或者取消重新下单。</br>
          </br>
          </br>
          `
        Dialog.confirm({
          title: '温馨提示',
          message: msgtext,
          allowHtml: true,
          messageAlign: 'center',
          className: 'selldialog',
          confirmButtonText: '前往支付',
          cancelButtonText: '取消上笔订单',
          action: () => {
            const targetRoute = wideMode ? 'wideOrderCreate' : 'orderCreate'
            router.push(`/${targetRoute}?order_id=${buy_orders.value[0].buy_order_id}`)
          },
          cancelAction: () => {
            BuyCancel({ buy_order_id: buy_orders.value[0].buy_order_id }).then(() => {
              showToast({
                message: '操作成功',
                icon: info
              })
            })
          }
        })
      }
    }, 800)
  })
  // 获取最新用户信息
  authStore.getUserInfo().then(() => {
    if (route.name === 'Home' && processnum.value?.total) {
      mitt.emit('global-notification', { type: 'ProcessOrder', value: processnum.value })
    }
  })

  const { query, path } = route
  onlineCharge.value = path.includes('onlineCharge') ? true : false
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';
@import '@/assets/styles/sprite-001.scss';

:deep(.nav-bar) {
  .van-nav-bar__title {
    overflow: visible;
  }
  .van-nav-bar__right {
    bottom: unset !important;
    top: 50%;
    transform: translate3d(0px, -50%, 0px);
  }
}

:deep(.title_buy_top) {
  font-size: 18px;
  padding: 0 15px;
  background: #004b6b;
  transform-origin: 0 0;
  height: calc(1 / var(--scale-factor) * 30px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title_left {
  border-radius: 5px 0 0 5px;
}

.title_right {
  border-radius: 0 5px 5px 0;
}

.active {
  font-size: 19px;
  font-weight: 700;
  background: #fff;
  color: var(--van-button-primary-background);
  border-radius: 5px;
}

.copy-white {
  filter: grayscale(100%) brightness(130%);
}

.active.title_left {
  position: relative;
  right: -8px;
}

.blue-bg {
  width: 100%;
  height: 30px;
  background-color: var(--van-button-primary-background);
}

.home-container {
  position: relative;
  width: 100%;
  height: calc(100% - 30px);
  margin-top: -30px;
  background-color: #ebf1f6;
  overflow: hidden;

  &.wide {
    margin-top: 0;
  }

  .topbar-container {
    width: 100%;
    height: 264px;
    flex: 0 0 264px;
    padding: 0 30px;
    box-sizing: border-box;
    background-color: var(--van-button-primary-background);

    .topbar-content-view {
      position: relative;
      width: 100%;
      height: 90px;

      .top-icon-bg {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 132px;
        height: 50px;
        padding: 0 19px;
        background: v-bind('topIconBg') no-repeat center / cover;
      }

      .logo-container {
        position: absolute;
        top: 48px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .home-top-logo {
          width: 45px;
        }

        .text-logo {
          margin-left: 10px;
          font-size: 42px;
          color: #fff;
        }
      }

      .help {
        margin: 0 28px;
      }

      .message {
        position: relative;
        margin-bottom: -3px;
        margin-right: auto;
      }

      .unread-sign {
        position: absolute;
        top: -7px;
        right: -9px;
        width: 24px;
        height: 24px;
        line-height: 24px;
        background-color: red;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border-radius: 50%;
      }
    }
  }

  .main-content-container {
    flex: 1;
    width: 100%;
    padding: 0 20px;

    .wallet-info-container {
      position: relative;
      width: 100%;
      z-index: 1;

      .wallet-info {
        width: 100%;
        // margin-top: -140px;
        border-radius: 14px;
        background-color: #fff;

        .wallet-main-content {
          padding: 21px;
          font-size: 26px;
          color: #868d9a;

          .text-funding-details {
            color: var(--van-button-primary-background);
          }
        }
      }
    }
  }

  .go-banzhuan {
    position: absolute;
    right: 0;
    top: 356px;
    width: 198px;
    height: 52px;
    padding: 10px 0 12px 22px;
    color: #fff;
    background-color: #fea703;
    font-size: 25px;
    border-top-left-radius: 26px;
    border-bottom-left-radius: 26px;
    white-space: nowrap;

    img {
      width: 31px;
      height: 31px;
      margin-right: 7px;
    }

    .process-order-sign {
      position: absolute;
      top: -7px;
      right: 6px;
      width: 35px;
      height: 35px;
      line-height: 35px;
      background-color: #d9001c;
      color: #fff;
      font-size: 21px;
      text-align: center;
      border-radius: 50%;
    }
  }

  :deep(.dialog-open-notice) {
    width: 708px;
    height: auto;
    padding: 40px;

    &.dialog-open-notice-wide-mode {
      width: 530px;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .van-dialog__header {
        font-size: 20px;
        line-height: unset;
      }

      .van-dialog__content {
        max-height: unset;
        margin: 15px 0 15px 0;
        flex: 1;
      }

      .dialog-content {
        // height: 100px;
        font-size: 16px;
      }

      .btn-confirm {
        height: 40px;
        font-size: 16px;
      }

      .dialog-radio-controler {
        margin-top: 10px;
      }

      .radio-uncheck {
        width: 18px !important;
        height: 18px !important;
      }

      .radio-checked {
        $scale: calc(18 / 35);
        background: url($spriteHome) calc(-0px * $sprite-computed-factor * $scale)
          calc(-282px * $sprite-computed-factor * $scale) no-repeat;
        width: 18px;
        height: 18px;
        background-size: calc(108px * (7 / 10) * $scale) calc(730px * (7 / 10) * $scale);
      }

      .radio-text {
        font-size: 12px !important;
      }
    }

    .van-dialog__header {
      padding: 0;
      font-size: 29px;
      color: #13161b;
    }

    .van-dialog__content {
      max-height: 600px;
      margin: 33px 0 35px 0;
      font-size: 25px;
      color: #787f8c;
      text-align: justify;
      overflow-y: auto;
    }

    .dialog-content {
      img {
        width: 100%;

        &[alt*='['] {
          width: auto;
        }
      }

      p {
        margin-bottom: 10px;
      }
    }

    .van-dialog__footer {
      padding: 0;
    }

    .van-dialog__confirm,
    .btn-confirm {
      width: 100%;
      height: 80px;
      font-size: 31px;
      background: var(--van-button-primary-background);
      color: #fff;
      border: 0;
      border-radius: 8px;
    }

    .dialog-radio-controler {
      margin-top: 20px;

      .radio {
        margin-right: 10px;
      }

      .radio-uncheck {
        width: 35px;
        height: 35px;
        border: 1px solid #868d9a;
        border-radius: 50%;
      }

      .radio-text {
        font-size: 25px;
        color: #13161b;
      }
    }

    .icon-close {
      position: absolute;
      right: 40px;
      top: 24px;
    }

    img {
      width: 100%;
      margin-top: 20px;
    }

    &.dialog-bg-img {
      padding: 0;

      .van-dialog__content {
        height: 572px;
        max-height: 600px;
        margin: 0;
        background: v-bind('dialogBgImg') no-repeat center / cover;
        overflow-y: auto;
      }

      .van-dialog__confirm {
        margin: 0 40px 40px 40px;
      }

      .btn-confirm {
        width: 626px;
        margin: 0 auto;
        margin-top: 30px;
      }

      .dialog-radio-controler {
        margin: 20px auto;
      }
    }
  }
}
.redDotNum {
  position: absolute;
  right: -5px;
  top: -5px;
  width: 15px;
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  background: red;
  color: #fff;
  border-radius: 50%;
}
</style>
