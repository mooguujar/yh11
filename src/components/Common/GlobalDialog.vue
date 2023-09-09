<template>
  <div class="global-dialog-container">
    <van-toast
      v-model:show="toast.show"
      className="toast-global-info order_toast"
    >
      <template #message>
        <div class="title">{{ toast.data.title }}</div>
        <div class="content">{{ toast.data.content }}</div>
      </template>
    </van-toast>

    <van-dialog
      v-model:show="dialog.show"
      theme="round-button"
      className="dialog-global-info"
      @confirm="onClose"
    >
      <i
        class="icon-close block close-dark"
        @click="onClose"
      ></i>
      <div>
        <div class="title">{{ dialog.data.title }}</div>
        <div class="content">{{ dialog.data.content }}</div>
      </div>

      <template #footer>
        <div
          class="btn-confirm flex items-center justify-center"
          @click="dialog.data.confirmAction"
        >
          {{ dialog.data.confirmButtonText }}
        </div>
      </template>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showToast, showDialog } from 'vant'
import { onMounted, onUnmounted, reactive } from 'vue'
import mitt from '@/utils/mitt'

const router = useRouter()
const toast = reactive({
  show: false,
  data: {
    title: '通知',
    content: '你的订单B169336014711189179已经放行'
  }
})
const dialog = reactive({
  show: false,
  data: {
    title: '订单编号B15134102',
    content: '买方发来了交易提醒，请尽快操作',
    confirmButtonText: '去处理',
    confirmAction: () => {}
  }
})

const onClose = () => {
  dialog.show = false
}

onMounted(() => {
  mitt.on('push_coin_buy_order_status', (data: any) => {
    console.log('推送买币订单状态 ', data)
    if (![1,6].includes(data.data.status)) {
      toast.data.content = data.data.msg
      toast.show = true
    }

    setTimeout(() => {
      const hash = window.location.hash
      if (!hash.includes('orderCreate') && !hash.includes('orderList')) {
        dialog.data = {
          title: '订单编号' + data.data.order_id,
          content: '订单状态更新，请尽快操作',
          confirmButtonText: '去处理',
          confirmAction: () => {
            // console.log('confirm')
            router.push('/orderCreate?order_id=' + data.data.order_id)
            onClose()
          }
        }
        dialog.show = true
      }
    }, 300)
    mitt.emit('update_buy_f', data)
  })

  mitt.on('push_coin_sell_order_status', (data: any) => {
    console.log('推送卖币订单状态 ', data)
    if (![3, 1].includes(data.data.status)) {
      toast.data.content = data.data.msg
      toast.show = true
    }

    const hash = window.location.hash
    if (!hash.includes('orderCreate') && !hash.includes('orderList')) {
      dialog.data = {
        title: '订单编号' + data.data.order_id,
        content: '订单状态更新，请尽快操作',
        confirmButtonText: '去查看',
        confirmAction: () => {
          router.push('/orderCreate?order_id=' + data.data.order_id + '&sell=true')
          onClose()
        }
      }
      dialog.show = true
    }
    mitt.emit('update_sell_f', data)
  })

  mitt.on('push_reminders_buy', (data: any) => {
    const hash = window.location.hash
    console.log('买方发送给卖方催单 data', data)
    dialog.data = {
      title: '订单编号' + data.data.order_id,
      content: '买方发送交易提醒，请尽快操作',
      confirmButtonText: '去处理',
      confirmAction: () => {
        !hash.includes('orderCreate') && router.push('/orderCreate?order_id=' + data.data.order_id)
        onClose()
      }
    }
    dialog.show = true
  })

  mitt.on('push_reminders_sell', (data: any) => {
    const hash = window.location.hash
    console.log('卖方发送给买方催单 data', data)

    dialog.data = {
      title: '订单编号' + data.data.order_id,
      content: '卖方发送交易提醒，请尽快操作',
      confirmButtonText: '去处理',
      confirmAction: () => {
        !hash.includes('orderCreate') && router.push('/orderCreate?order_id=' + data.data.order_id)
        onClose()
      }
    }
    dialog.show = true
  })

  mitt.on('push_message', (data: any) => {
    console.log('站内消息 data', data)

    dialog.data = {
      title: '',
      content: '站内消息更新了',
      confirmButtonText: '去查看',
      confirmAction: () => {
        router.push('/message')
        onClose()
      }
    }
    dialog.show = true
  })

  mitt.on('push_coinsellcomment', (data: any) => {
    console.log('交易申诉更新 data', data)
    mitt.emit('update_appeal_f', data)
    dialog.data = {
      title: '订单编号' + data.data.coin_buy_order_id,
      content: '交易申诉更新，请尽快操作',
      confirmButtonText: '去处理',
      confirmAction: () => {
        router.push('/orderCreate?order_id=' + data.data.coin_buy_order_id)
        onClose()
      }
    }
    dialog.show = true
  })
})
onUnmounted(() => {
  //
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';

.global-dialog-container {
  :deep(.toast-global-info) {
    width: 680px;
    padding: 10px 18px 28px 18px;
    background-color: #eef3f7;
    color: #3c4246;
    border-radius: 14px;
    .title {
      margin-bottom: 10px;
      font-size: 29px;
      text-align: center;
    }
    .content {
      font-size: 25px;
    }
  }
  :deep(.dialog-global-info) {
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
      text-align: center;
    }
    .title {
      margin-bottom: 20px;
    }
    .content {
      color: #13161b;
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
  }
}
</style>
