<template>
  <div class="mine w-100 overflow-y-scroll">
    <div class="mine-top bg-[#0b75ff] w-full px-[0px]">
      <div class="topbar-container">
        <div class="van-safe-area-top">
          <div class="topbar-content-view flex justify-between items-end">
            <div v-for="item in topBarItemList" :key="item.icon"
                 :class="item.icon === 'logo' ? 'logo-container' : item.icon" @click="changeRoute(item.routePath)">
              <template v-if="item.title">
                <!-- <div :class="item.icon"></div> -->
                <!-- <img :src="homeTopLogo" class="home-top-logo" /> -->
                <div class="text-logo">我的</div>
              </template>

              <div v-if="item.icon === 'message' && unReadCount" class="unread-sign">
                {{ unReadCount }}
              </div>
            </div>
          </div>
          </div>
        <div class="mt-[30px] flex items-center justify-between">
          <div class="flex items-center">
            <div class="avatar relative overflow-hidden rounded-md bg-[#fff]">
              <div class="avatar1" v-if="!authStore?.userInfo?.headimg"></div>
              <img v-else class="w-[110px] h-[110px] block" :src="imgServerUrl + authStore?.userInfo?.headimg" alt="" />
              <div class="mask w-full bg-black/50 absolute bottom-0 left-0 h-[30px] flex items-center">
                <div class="camera mx-auto"></div>
              </div>
              <input className="avatar-input absolute top-0 left-0 w-full h-full opacity-0 z-2" type="file"
                accept="image/*" @change="afterRead" />
            </div>
            <div class="ml-[7.5px]">
              <div class="text-[30px] text-white flex items-center mb-[10px]">
                {{ authStore?.userInfo?.nickname }}
                <div class="edit ml-[10px] scale-[0.8]" @click="handleEditNicknameDialog(true)"></div>
              </div>
              <div class="text-[#94c3ff] text-[24px]">{{ authStore?.userInfo?.username }}</div>
            </div>
          </div>
          <div @click="goFundingDetails">
            <div class="text-[24px] text-[#94c3ff] text-right">余额></div>
            <div class="text-[30px] font-bold text-white">
              {{ Number(current_coin?.coincash).toTruncFixed(3) }}
              <span class="text-[24px] text-white font-normal">{{ current_coin?.coin_unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mine-content p-[24px] bg-[#ebf1f6]">
      <div :key="entry.title"
        class="entry-row bg-white rounded-sm w-full h-[82px] px-[24px] flex items-center justify-between"
        v-for="entry in entry_list_1" @click="entry.action">
        <div class="text-[30px] text-[#13161b] flex items-center">
          <div :class="`${entry.icon} mr-1`"></div>
          {{ entry.title }}
        </div>
        <div :class="`text-[24px] ${entry.status_text?.color} flex items-center`">
          {{ entry.status_text?.text }}
          <div class="chervon-right ml-1"></div>
        </div>
      </div>

      <div class="text-[24px] text-[#787f8c] mt-2 mb-[7.5px] ml-1">收款及支付方式</div>
      <div class="bg-white rounded-sm">
        <div :key="entry.title" class="entry-row w-full h-[82px] px-[24px] flex items-center justify-between"
          v-for="entry in entry_list_2" @click="entry.action">
          <div class="text-[30px] text-[#13161b] flex items-center">
            <div :class="`${entry.icon} mr-1`"></div>
            {{ entry.title }}
          </div>
          <div :class="`text-[24px] ${entry.status_text?.color} flex items-center`">
            {{ entry.status_text?.text }}
            <div class="chervon-right ml-1"></div>
          </div>
        </div>
      </div>

      <div class="text-[24px] text-[#787f8c] mt-2 mb-[7.5px] ml-1">账号安全</div>
      <div class="bg-white rounded-sm">
        <div :key="entry.title" class="entry-row w-full h-[82px] px-[24px] flex items-center justify-between"
          v-for="entry in entry_list_3" @click="entry.action">
          <div class="text-[30px] text-[#13161b] flex items-center">
            <div :class="`${entry.icon} mr-1`"></div>
            {{ entry.title }}
          </div>
          <div class="text-[24px] text-[#787f8c] flex items-center">
            {{ entry.status_text }}
            <div class="chervon-right ml-1"></div>
          </div>
        </div>
      </div>

      <div class="text-[24px] text-[#787f8c] mt-2 mb-[7.5px] ml-1">其他</div>
      <div class="bg-white rounded-sm">
        <div :key="entry.title" class="entry-row w-full h-[82px] px-[24px] flex items-center justify-between"
          v-for="entry in entry_list_4" @click="entry.action">
          <div class="text-[30px] text-[#13161b] flex items-center">
            <img v-if="entry.img_src" :src="entry.img_src" alt="" class="w-[40px] mr-1" />
            <div v-else :class="`${entry.icon} mr-1`"></div>
            {{ entry.title }}
          </div>
          <div class="text-[24px] text-[#787f8c] flex items-center">
            {{ entry.status_text }}
            <div class="chervon-right ml-1"></div>
          </div>
        </div>
      </div>
    </div>

    <van-dialog v-model:show="dialog.show" :title="dialog.data.title" theme="round-button" className="dialog-msg"
      @confirm="onCloseDialog">
      <i class="icon-close block close-dark" @click="onCloseDialog"></i>

      <div class="add-time">{{ dialog.data.add_time }}</div>
      <div class="content" v-html="dialog.data.content"></div>

      <template #footer>
        <div class="btn-confirm flex items-center justify-center" @click="onCloseDialog">
          我知道了
        </div>
      </template>
    </van-dialog>
    <van-dialog v-model:show="isEditNicknameDialog" title="昵称修改" confirmButtonText="提交" theme="round-button"
      className="dialog-bulletin" @confirm="() => editNickname()">
      <i class="icon-close close-dark block" @click="handleEditNicknameDialog(false)"></i>
      <div>
        <van-field v-model="edit_nickname" placeholder="昵称限制2-8位长度" />
      </div>
    </van-dialog>
    <van-dialog v-model:show="dialogContent.show" :title="dialogContent.title" theme="round-button"
      :className="['dialog-deal']" :confirmButtonText="dialogContent.confirmButtonText" @confirm="onConfirm">
      <i class="icon-close block close-dark" @click="onClose"></i>
      <div class="flex flex-col items-center justify-between">
        <img :src="dialogContent.img" :class="!authStore?.userInfo.verified_status ? 'verifi-id' : 'add-card'" />
        <div class="content text-center">{{ dialogContent.content }}</div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, useEntryStore } from '@/store'
import { onMounted, ref, computed, reactive } from 'vue'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'
import { useRouter } from 'vue-router'
import { uploadImgApi } from '@/apis/common'
import { updateUserInfoApi } from '@/apis/user'
import creditImg from '@/assets/images/mine/credit.png'
import { IMessage } from '@/store/types/article'
import { userMessageDetailsApi, userMessageListApi } from '@/apis/article'
import { showToast } from 'vant'
import { useAppBar } from '@/components/AppBar/useAppBar'
import verifyID from '@/assets/images/common/ID-verify.png'
import passIcon from '@/assets/images/common/key.png'

import homeTopLogo from '@/assets/images/home_top_logo.png'
import addCard from '@/assets/images/common/add-card.png'
import info from '@/assets/images/common/info.png'
import success from '@/assets/images/common/success.png'
import { storeToRefs } from 'pinia'

useAppBar({ mode: 'dark' })

const showInfoToast = (title: string) => {
  return showToast({
    message: title,
    icon: info
  })
}
const showSuceedToast = (title: string) => {
  return showToast({
    message: title,
    icon: success
  })
}

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
    routePath: '/iframe-page/third?url=' + import.meta.env.VITE_APP_TUTORIAL_URL + '?from=gdpay_h5',
    icon: 'help'
  },
  {
    routePath: '/message',
    icon: 'message'
  }
]

const router = useRouter()
const changeRoute = (path: string) => {
  router.push(path)
}

const entryStore = useEntryStore()
const imgServerUrl = entryStore.imgServerUrl
const authStore = useAuthStore()
const { getUserCoin } = authStore
const { coins } = storeToRefs(authStore)
const getUserCoinData = async (isReq: boolean = false) => {
  try {
    window.log('用户积分信息', coins.value, isReq)

    if (coins.value.length && !isReq) {
      return
    }

    const res = await getUserCoin({})
    window.log('用户积分信息2', res)
  } catch (error) {
    console.error(error)
  }
}
// 是否实名认证 0 否 1 成功 2待审核 3 拒绝’
// authStore?.userInfo?.verified_status
const isLogin = !!authStore.token

const coin = useCoinBuySellStore()
const { withdrawddresslist, getWithdrawddresslist } = coin

const tutorial_link = ref(import.meta.env.VITE_APP_TUTORIAL_URL)
const current_coin = ref({
  mtype: 0,
  coin_name: '',
  coin_unit: 'GDB',
  coincash: '',
  available_coincash: '',
  status: 0,
  wallet_type: '',
  service_fee: ''
})
const getMineInfo = async () => {
  try {
    const coin = authStore?.coins.filter(coin => coin?.coin_unit === 'GDB')?.[0]
    await authStore?.getUserInfo()
    console.log(authStore.userInfo.is_set_paypassword, 'authStore.userInfo.is_set_paypassword')
    current_coin.value = coin
    getUserCoinData()
    getDialogMessage()
  } catch (e) {
    console.log(e)
  }
}

const verifyStatusText = () => {
  if (authStore?.userInfo?.verified_status === 0) {
    return { text: '未认证', color: 'text-[#ff0000]' }
  } else if (authStore?.userInfo?.verified_status === 3) {
    return { text: '已拒绝', color: 'text-[#ff0000]' }
  } else if (authStore?.userInfo?.verified_status === 4) {
    return { text: '禁止认证', color: 'text-[#ff0000]' }
  } else if (authStore?.userInfo?.verified_status === 1) {
    return { text: '已认证', color: 'text-[#58cf00]' }
  } else if (authStore?.userInfo?.verified_status === 2) {
    return { text: '审核中', color: 'text-[#777]' }
  } else return { text: '', color: 'text-[#777]' }
}

const bind_bank = ref({})
const bind_wechat = ref({})
const bind_alipay = ref({})

const bankCardStatusText = (bank: any) => {
  //   status   DEFAULT '1' COMMENT '1启用  2禁用   -1审核中 ',
  if (bank?.status === 1) {
    return {
      text: '已绑定',
      color: 'text-[#58cf00]'
    }
  }

  if (!bank?.status) {
    return {
      text: '未绑定',
      color: 'text-[#ff0000]'
    }
  }

  if (bank?.status === 2) {
    return {
      text: '已拒绝',
      color: 'text-[#ff0000]'
    }
  }

  if (bank?.status === -1) {
    return {
      text: '审核中',
      color: 'text-[#777]'
    }
  }
}

const payPassStatusText = (is_set_pass: number) => {
  return is_set_pass === 1 ? '已设置' : '未设置'
}

const dialogContent = reactive({
  show: false,
  title: '',
  img: '',
  content: '',
  confirmButtonText: ''
})

const canBindPayment = () => {
  if (authStore?.userInfo?.verified_status !== 1) {
    const dialogInfo = {
      show: true,
      title: '身份认证',
      img: verifyID,
      content: '完成身份认证，可核对真实身份，保障合法权益',
      confirmButtonText: '立即认证'
    }
    Object.assign(dialogContent, dialogInfo)
    return false
  }
  if (authStore.userInfo.is_set_paypassword === 2) {
    const dialogInfo = {
      show: true,
      title: '设置支付密码',
      img: passIcon,
      content: '请先设置支付密码',
      confirmButtonText: '立即设置'
    }
    Object.assign(dialogContent, dialogInfo)
    return false
  }

  return true
}

const onConfirm = () => {
  dialog.show = false
  if (authStore?.userInfo?.verified_status !== 1) {
    router.push('/verify')
  }

  if (authStore.userInfo.is_set_paypassword === 2) {
    router.push('/pay_password')
  }
}

const entry_list_1 = computed(() => [
  {
    title: '实名认证',
    action: () => {
      // DEFAULT '2' COMMENT '是否实名认证  1 成功   2待审核   3 拒绝请重新认证  4禁止认证',
      if (
        [0, 1, 2].includes(authStore?.userInfo?.verified_status)
      ) {
        router.push('verify')
      } else {
        showInfoToast(verifyStatusText().text)
      }
    },
    status_text: verifyStatusText(),
    is_finished: false,
    icon: 'verify-icon'
  }
])

const entry_list_2 = computed(() => [
  {
    title: '银行卡',
    action: () => {
      if (canBindPayment()) {
        router.push('bank_card')
      }
    },
    status_text: bankCardStatusText(bind_bank.value),
    is_finished: false,
    icon: 'bank-card-icon'
  },
  {
    title: '微信支付',
    action: () => {
      if (canBindPayment()) {
        router.push('wechat')
      }
    },
    status_text: bankCardStatusText(bind_wechat.value),
    is_finished: false,
    icon: 'wechat-icon'
  },
  {
    title: '支付宝',
    action: () => {
      if (canBindPayment()) {
        router.push('alipay')
      }
    },
    status_text: bankCardStatusText(bind_alipay.value),
    is_finished: false,
    icon: 'alipay-icon'
  }
])

const entry_list_3 = computed(() => [
  {
    title: '支付密码',
    action: () => {
      router.push('pay_password')
    },
    status_text: payPassStatusText(authStore.userInfo.is_set_paypassword),
    is_finished: false,
    icon: 'shield-icon'
  }
])

const entry_list_4 = [
  {
    title: '信誉评分',
    action: () => {
      router.push('credit')
    },
    status_text: '',
    is_finished: false,
    icon: 'about-icon',
    img_src: creditImg
  },
  {
    title: '关于我们',
    action: () => {
      router.push('about_us')
    },
    status_text: '',
    is_finished: false,
    icon: 'about-icon'
  }
]

const goFundingDetails = () => {
  if (!isLogin) {
    router.push('/auth/login')
  } else {
    router.push('/details/funding-details')
  }
}

// const avatarImg = ref('')

const afterRead = async (event: any) => {
  if (!event.target.files[0]) return
  const res = await uploadImg(event.target.files[0])
  await updateUserInfoApi({
    headimg: res?.img
  })
  authStore?.getUserInfo()
  event.target.value = ''
  // avatarImg.value = res?.img
}
const uploadImg = async (file: string): Promise<any> => {
  try {
    const res = await uploadImgApi({
      file,
      type: 'face'
    })

    return res
  } catch (e) {
    console.log(e)
  }
}

const dialog = reactive({
  show: false,
  data: {} as IMessage
})
// 标记站内信弹窗信息已读
const signMsgReadStatus = async () => {
  try {
    const res = await userMessageDetailsApi({
      id: +dialog.data?.id ?? ''
    })
  } catch (error) {
    console.error(error)
  }
}

// 站内信未读数量
const unReadCount = ref(0)
// 获取站内信弹窗通知内容
const getDialogMessage = async () => {
  try {
    const res = await userMessageListApi({})

    if (!res.count || !res.un_read) {
      return
    }

    unReadCount.value = res?.un_read ?? 0

    const data = res.list.find(item => item.is_openwin === 1 && item.is_read === 0)

    if (data) {
      dialog.data = data
      dialog.show = true

      signMsgReadStatus()
    }

    window.log('消息列表', res)
  } catch (error) {
    console.error(error)
  }
}

const onCloseDialog = () => {
  dialog.show = false
}
const onClose = () => {
  dialogContent.show = false
}

const edit_nickname = ref('')
const isEditNicknameDialog = ref(false)
const handleEditNicknameDialog = (open: boolean) => {
  console.log(authStore?.editreview?.nickname?.status, 'userInfo')
  if (authStore?.editreview?.nickname?.status === -1) {
    showInfoToast('昵称正在审核中请等待')
  } else {
    isEditNicknameDialog.value = open
  }
}

const editNickname = async () => {
  try {
    if (edit_nickname.value.length >= 2 && edit_nickname.value.length <= 8) {
      await updateUserInfoApi({
        nickname: edit_nickname.value
      })
      authStore?.getUserInfo()
    } else {
      edit_nickname.value = ''
      showInfoToast('昵称限制2-8位长度')
    }
  } catch (e) {
    console.log(e)
  } finally {
    handleEditNicknameDialog(false)
    edit_nickname.value = ''
  }
}



onMounted(() => {
  getMineInfo()
  bind_bank.value = coin?.withdrawddresslist.filter(address => address.coin_protocol === 'BANK')[0]
  bind_wechat.value = coin?.withdrawddresslist.filter(
    address => address.coin_protocol === 'WXPAY'
  )[0]
  bind_alipay.value = coin?.withdrawddresslist.filter(
    address => address.coin_protocol === 'ALIPAY'
  )[0]
  getWithdrawddresslist({}).then(() => {
    if (coin?.withdrawddresslist.filter(address => address.coin_protocol === 'BANK').length > 0) {
      bind_bank.value = coin?.withdrawddresslist.filter(
        address => address.coin_protocol === 'BANK'
      )[0]
    }

    if (coin?.withdrawddresslist.filter(address => address.coin_protocol === 'WXPAY').length > 0) {
      bind_wechat.value = coin?.withdrawddresslist.filter(
        address => address.coin_protocol === 'WXPAY'
      )[0]
    }
    if (coin?.withdrawddresslist.filter(address => address.coin_protocol === 'ALIPAY').length > 0) {
      bind_alipay.value = coin?.withdrawddresslist.filter(
        address => address.coin_protocol === 'ALIPAY'
      )[0]
    }
  })
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';
@import '@/assets/styles/sprite-mine.scss';

.mine {
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;

  :deep(.dialog-msg) {
    width: 708px;
    height: auto;
    padding: 40px;

    .van-dialog__header {
      padding: 0;
      font-size: 29px;
      color: #13161b;
      font-weight: normal;
    }

    .van-dialog__content {
      margin: 33px 0 35px 0;
      font-size: 25px;
      color: #787f8c;
      text-align: justify;
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

    .icon-close {
      position: absolute;
      right: 40px;
      top: 24px;
    }

    .add-time {
      margin-bottom: 25px;
    }

    .content {
      color: #13161b;
    }

    img {
      width: 100%;
      margin-top: 20px;
    }
  }
}

:deep(.dialog-bulletin) {
  width: 708px;
  height: auto;
  padding: 20px 30px 30px 30px;
  border-radius: 10px;

  .van-dialog__header {
    padding: 0;
    font-size: 29px;
    color: #13161b;
  }

  .van-dialog__content {
    margin: 33px 0 35px 0;
    font-size: 25px;
    color: #787f8c;
    text-align: justify;
  }

  .van-dialog__footer {
    padding: 0;
  }

  .van-dialog__confirm {
    width: 100%;
    height: 80px;
    font-size: 31px;
    background: #0b75ff;
    border-radius: 8px;
    border-width: 0;
  }

  .icon-close {
    position: absolute;
    right: 40px;
    top: 35px;
  }

  img {
    width: 100%;
    margin-top: 20px;
  }

  .van-cell {
    padding: 0;
  }
}

:deep(.van-cell__value) {
  height: 69px;
  background: #ebf1f6;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 25px;
  margin-bottom: 12px;
}

:deep(.dialog-deal) {
  width: 708px;
  height: auto;
  padding: 40px;

  .van-dialog__header {
    padding: 0;
    font-size: 29px;
    color: #13161b;
  }

  .van-dialog__content {
    margin: 33px 0 35px 0;
    font-size: 25px;
    color: #787f8c;
    text-align: justify;
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

    &.verifi-id {
      width: 260px;
    }

    &.add-card {
      width: 295px;
    }
  }

  .content {
    width: 380px;
    margin-top: 24px;
  }
}

.topbar-container {
  width: 100%;
  flex: 0 0 264px;
  padding: 0 30px 30px 30px;
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
        margin-top: -7px;
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
</style>
<style lang="css">
:root {
  --van-field-placeholder-text-color: #787f8c;
}
</style>
