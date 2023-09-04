<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth'
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { showToast } from 'vant'
import verified from '@/assets/images/common/verified.png'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)

const walletAddress = computed(() => userInfo.value.uuid)

// 封装onCopy函数，绑定到一键复制的按钮中
const onCopy = (walletAddress: string) => {
  const source = ref(walletAddress)
  // 考虑到兼容性问题，
  // 先判断当前有没有clipboard实例，如果有，则使用useClipboard；如果没有，则使用js原生方法
  if (navigator.clipboard) {
    const { copy } = useClipboard({ source })
    copy()
  } else {
    const input = document.createElement('input')
    input.setAttribute('value', source.value)
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }
  showToast({
    message: '钱包地址已复制到剪切板',
    icon: verified
  })
}
</script>

<template>
  <div class="wallet-address-container flex items-center justify-between">
    <i class="wallet"></i>
    <div>钱包地址</div>
    <div
      class="wallet-hash-address text-center ellipsis"
      :class="{ 'text-center': !walletAddress }"
    >
      {{ walletAddress ? walletAddress : '--' }}
    </div>
    <i
      class="copy"
      @click="onCopy(walletAddress)"
    ></i>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';
.wallet-address-container {
  width: 100%;
  height: 56px;
  padding: 0 10px;
  background-color: #ebeef4;
  border-radius: 7px;
  .wallet {
    margin-right: 10px;
  }
  .wallet-hash-address {
    flex: 0 0 380px;
    margin: 0 auto;
    color: #333333;
  }
}
</style>
<style>
.van-toast {
  width: 270px;
  height: 270px;
  padding: 40px;
  font-size: 33px;
  .van-toast__icon {
    font-size: 110px;
  }
  .van-toast__text {
    margin-top: 15px;
    line-height: 1.5;
  }
}
</style>
