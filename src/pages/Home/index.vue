<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import LoginStatus from '@/components/Home/LoginStatus.vue'
import Balance from '@/components/Home/Balance.vue'
import WalletAddress from '@/components/Home/WalletAddress.vue'
import Bulletin from '@/components/Home/Bulletin.vue'
import Slider from '@/components/Home/Slider.vue'
import DealInfo from '@/components/Home/DealInfo.vue'
import DealBtn from '@/components/Home/DealBtn.vue'
import MyPendingOrder from '@/components/Home/MyPendingOrder.vue'
import { useAuthStore } from '@/store/modules/auth'
import { useArticleStore } from '@/store/modules/article'
import { IArticleListType } from '@/store/types/article'
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'
import { useAppBar } from '@/components/AppBar/useAppBar'
import { userMessageListApi } from '@/apis/article'
import currency from 'currency.js'
import homeTopLogo from '@/assets/images/home_top_logo.png'
import { useEntryStore } from '@/store'
import { INormal } from '@/store/types/entry'

const topBarItemList = [
  {
    // routePath: '/iframe-page/customer-service',
    routePath: '/iframe-page/third?url=customer-service',
    icon: 'customer-service'
  },
  {
    routePath: '',
    icon: 'logo',
    title: 'GDPAY'
  },
  {
    // routePath: '/iframe-page/tutorial',
    routePath:
      '/iframe-page/third?url=' + import.meta.env.VITE_APP_TUTORIAL_URL + '/?from=gdpay_h5',
    icon: 'help'
  },
  {
    routePath: '/message',
    icon: 'message'
  }
]

useAppBar({ mode: 'dark' })

const entryStore = useEntryStore()
const { config } = storeToRefs(entryStore)

const domain = computed(() => {
  return (config.value.Web_Set_DefaultInfo?.imgserver_url as INormal).v || ''
})

const router = useRouter()
const changeRoute = (path: string) => {
  router.push(path)
}

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
const logout = () => {
  authStore.logout()
  router.push('/auth/login')
}

const currArticleIndex = ref(0)
const dialog = reactive({
  show: false,
  data: {} as IArticleListType,
  allowShow: true
})
const dialogBgImg = ref(`url('')`)
const articleStore = useArticleStore()
const { getArticleListApi, updateHomeNoticeList, updateHomeNoticeShowStatus } = articleStore
const { openNotice, homeNoticeShowList, homeNoticeShowStatus } = storeToRefs(articleStore)

const onClose = () => {
  const _homeNoticeShowList = cloneDeep(homeNoticeShowList).value
  const dateNow = dayjs().format('YYYY-MM-DD')

  // 更新当前弹窗今日显示状态
  _homeNoticeShowList[currArticleIndex.value] = dialog.allowShow ? true : dateNow
  updateHomeNoticeList(_homeNoticeShowList)

  currArticleIndex.value++
  dialog.show = false

  setTimeout(() => {
    window.log(
      '关闭',
      currArticleIndex.value,
      dialog,
      _homeNoticeShowList,
      homeNoticeShowList.value[currArticleIndex.value]
    )

    // 如果当前公告索引值小于公告列表长度，就设置下一个公告弹窗内容，否则，就更新首页公告显示状态
    if (currArticleIndex.value < openNotice.value.length) {
      const dateReg = /^\d{4}-\d{2}-\d{2}$/
      let date = null
      if (dateReg.test(_homeNoticeShowList[currArticleIndex.value] as string)) {
        date = _homeNoticeShowList[currArticleIndex.value]
      }

      if (dayjs().isSame(dayjs(date as string), 'day')) return

      dialog.data = openNotice.value[currArticleIndex.value]
      dialogBgImg.value = dialog.data.img ? `url(${domain.value + dialog.data.img})` : `url('')`
      dialog.allowShow = true
      dialog.show = true
    } else {
      updateHomeNoticeShowStatus(false)
    }
  }, 50)
}

const handleOpenNoticeData = async () => {
  try {
    const res = openNotice.value

    window.log('弹窗公告内容', res)
    if (res.length) {
      const _homeNoticeShowList = cloneDeep(homeNoticeShowList).value.map(
        item => typeof item === 'boolean' || !dayjs().isSame(dayjs(item), 'day') || item
      )
      const allShow = _homeNoticeShowList.every(item => item === true)

      updateHomeNoticeList(allShow ? [] : _homeNoticeShowList)

      // 未点击过 '今日不再显示'
      if (!_homeNoticeShowList.length) {
        dialog.data = res[0]
        dialogBgImg.value = dialog.data.img ? `url(${domain.value + dialog.data.img})` : `url('')`
        dialog.show = true
        return
      }

      const showNoticeIndex = _homeNoticeShowList.findIndex(item => item === true)

      window.log('homeNoticeShowList', homeNoticeShowList)

      // 首页公告弹窗过滤出今日要显示的公告列表，若存在，则显示
      if (~showNoticeIndex) {
        currArticleIndex.value = showNoticeIndex
        dialog.data = res[showNoticeIndex]
        dialogBgImg.value = dialog.data.img ? `url(${domain.value + dialog.data.img})` : `url('')`
        dialog.show = true
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const onCheck = () => {
  dialog.allowShow = !dialog.allowShow
}

const { token, getUserMoneyByMType, getFreezeMoney } = storeToRefs(authStore)

const isLogin = computed(() => !!token.value)

const goFundingDetails = () => {
  if (!isLogin) {
    router.push('/auth/login')
  } else {
    router.push('/details/funding-details')
  }
}

// 可售金额
const canSaleAmount = computed(() => {
  const coinCash = +(getUserMoneyByMType.value(1)?.available_coincash ?? 0)
  const freeSellAmount = +(userInfo.value?.freesell_amount ?? 0)

  if (freeSellAmount > coinCash) return coinCash.toTruncFixed(2)
  return freeSellAmount.toTruncFixed(2)
})

// 不可售金额
const notSaleAmount = computed(() => {
  const coinCash = +(getUserMoneyByMType.value(1)?.available_coincash ?? 0)
  return (coinCash - Number(canSaleAmount.value)).toTruncFixed(2)
})

const handleArticleData = () => {
  // 如果公告今日未显示过，就获取公告数据，进行显示
  if (homeNoticeShowStatus.value) {
    handleOpenNoticeData()
  }
}

// 站内信未读数量
const unReadCount = ref(0)

// 获取站内信未读数量
const getUnReadMsgCount = async () => {
  try {
    const res = await userMessageListApi({})

    unReadCount.value = res?.un_read ?? 0
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getUnReadMsgCount()
})
</script>

<template>
  <div class="home-container">
    <div class="topbar-container">
      <div class="van-safe-area-top">
        <div class="topbar-content-view flex justify-between items-end">
          <div
            v-for="item in topBarItemList"
            :key="item.icon"
            :class="item.icon === 'logo' ? 'logo-container' : item.icon"
            @click="changeRoute(item.routePath)"
          >
            <template v-if="item.title">
              <!-- <div :class="item.icon"></div> -->
              <img
                :src="homeTopLogo"
                class="home-top-logo"
              />
              <div class="text-logo">GDPAY</div>
            </template>

            <div
              v-if="item.icon === 'message' && unReadCount"
              class="unread-sign"
            >
              {{ unReadCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content-container">
      <div class="van-safe-area-top">
        <div class="wallet-info-container">
          <div class="wallet-info">
            <LoginStatus />
            <div class="wallet-main-content">
              <!-- <div className="text-funding-details flex items-start justify-end">
                <div @click="goFundingDetails">资金明细</div>
              </div> -->
              <Balance
                :money="{
                coinCash: Number(getUserMoneyByMType(1)?.available_coincash ?? '0').toTruncFixed(3),
                canSale: canSaleAmount as unknown as number,
                notSale: notSaleAmount as unknown as number
              }"
              />
              <WalletAddress />
            </div>
          </div>
        </div>
      </div>
      <Bulletin @update-article="handleArticleData" />
      <Slider />
      <DealInfo />
      <DealBtn />
      <MyPendingOrder />
    </div>

    <van-dialog
      v-model:show="dialog.show"
      :title="dialog.data.img ? '' : dialog.data.desc"
      theme="round-button"
      :className="['dialog-open-notice', { 'dialog-bg-img': dialog.data.img }]"
      @confirm="onClose"
    >
      <i
        class="icon-close block"
        :class="dialog.data.img ? 'close-white' : 'close-dark'"
        @click="onClose"
      ></i>
      <div v-html="dialog.data.img ? '' : dialog.data.content"></div>

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

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';

.home-container {
  width: 100%;
  height: 100%;
  background-color: #ebf1f6;
  overflow: auto;

  .topbar-container {
    width: 100%;
    height: 264px;
    flex: 0 0 264px;
    padding: 0 30px;
    box-sizing: border-box;
    background-color: #0b75ff;

    .topbar-content-view {
      position: relative;
      width: 100%;
      height: 90px;

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
    width: 100%;
    padding: 0 20px;

    .wallet-info-container {
      position: relative;
      width: 100%;
      z-index: 1;

      .wallet-info {
        width: 100%;
        margin-top: -140px;
        border-radius: 14px;
        background-color: #fff;

        .wallet-main-content {
          padding: 21px;
          font-size: 26px;
          color: #868d9a;

          .text-funding-details {
            color: #0b75ff;
          }
        }
      }
    }
  }

  :deep(.dialog-open-notice) {
    width: 708px;
    height: auto;
    padding: 40px;

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

    .van-dialog__footer {
      padding: 0;
    }

    .van-dialog__confirm,
    .btn-confirm {
      width: 100%;
      height: 80px;
      font-size: 31px;
      background: #0b75ff;
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
</style>
