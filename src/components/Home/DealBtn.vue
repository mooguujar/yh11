<script setup lang="ts">
import { articleListApi } from '@/apis/article'
import { buySellCoinInfoApi } from '@/apis/buySellCoin'
import { useAuthStore } from '@/store/modules/auth'
import { IArticleListType } from '@/store/types/article'
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import verifyID from '@/assets/images/common/ID-verify.png'
import addCard from '@/assets/images/common/add-card.png'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
const router = useRouter()

const coinBuySellStore = useCoinBuySellStore()
const { getWithdrawddresslist } = coinBuySellStore
const { withdrawddresslist } = storeToRefs(coinBuySellStore)

const DealBtnList = [
  {
    id: 1,
    title: '买币',
    className: 'btn-buy',
    icon: 'buyCoin',
    path: '/buyCoin'
  },
  {
    id: 2,
    title: '卖币',
    className: 'btn-sell',
    icon: 'sellCoin',
    path: '/sellCoin'
  }
]

const dialog = reactive({
  show: false,
  title: '',
  img: '',
  content: '',
  confirmButtonText: ''
})

// 是否已绑定银行卡
const hasBindBankCard = computed(() =>
  withdrawddresslist.value.some(item => item.coin_protocol === 'BANK')
)

const handleDeal = async (path: string) => {
  if (!userInfo.value.verified_status) {
    const dialogInfo = {
      show: true,
      title: '身份认证',
      img: verifyID,
      content: '完成身份认证，可核对真实身份，保障合法权益',
      confirmButtonText: '立即认证'
    }
    return Object.assign(dialog, dialogInfo)
  }
  if (!withdrawddresslist.value.length) {
    await getWithdrawddresslist({})

    if (!withdrawddresslist.value.length) {
      const dialogInfo = {
        show: true,
        title: '添加收付款信息',
        img: addCard,
        content: '请先添加收付款信息',
        confirmButtonText: '立即添加'
      }
      return Object.assign(dialog, dialogInfo)
    }
  }

  router.push(path)
}

const onClose = () => {
  dialog.show = false
}
const onConfirm = () => {
  dialog.show = false

  if (!userInfo.value.verified_status) {
    router.push('/verify')
  } else {
    router.push('/bank_card')
  }
}

onMounted(() => {})
</script>

<template>
  <div class="deal-btn-container flex items-center">
    <div
      v-for="item in DealBtnList"
      :key="item.id"
      class="item-btn flex justify-center items-center"
      :class="item.className"
      @click="handleDeal(item.path)"
    >
      <i :class="['icon', item.icon]"></i>
      <div>{{ item.title }}</div>
    </div>

    <van-dialog
      v-model:show="dialog.show"
      :title="dialog.title"
      theme="round-button"
      :className="['dialog-deal']"
      :confirmButtonText="dialog.confirmButtonText"
      @confirm="onConfirm"
    >
      <i
        class="icon-close block close-dark"
        @click="onClose"
      ></i>
      <div class="flex flex-col items-center justify-between">
        <img
          :src="dialog.img"
          :class="!userInfo.verified_status ? 'verifi-id' : 'add-card'"
        />
        <div class="content text-center">{{ dialog.content }}</div>
      </div>
    </van-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';
.deal-btn-container {
  width: 100%;
  height: 90px;
  gap: 22px;
  .item-btn {
    flex: 1;
    height: 100%;
    font-size: 35px;
    color: #fff;
    border-radius: 7px;
    .icon {
      margin-right: 14px;
    }
  }
  .btn-buy {
    background-color: #ec808d;
  }
  .btn-sell {
    background-color: #169bd5;
  }
  .btn-transfer {
    background-color: #00bfbf;
  }
  .btn-collect {
    background-color: #8080ff;
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
}
</style>
