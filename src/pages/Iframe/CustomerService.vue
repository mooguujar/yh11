<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const onBack = () => {
  router.back()
}
</script>

<template>
  <div class="customer-service-container">
    <nav-bar title="在线客服链接" mode="white"></nav-bar>

  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';

.customer-service-container {
  width: 100%;
  height: 100%;

  :deep(.van-nav-bar__content) {
    height: 90px;
    .arrow-back {
      margin-left: 24px;
      transform: rotate(180deg) scale(1.5);
    }
    .van-nav-bar__title {
      height: 100%;
      line-height: 90px;
      font-size: 33px;
      color: #13161b;
    }
  }
}
</style>
