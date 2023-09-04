<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppBar } from '@/components/AppBar/useAppBar'

const hiddenDefaultNavBarRoutes = ['FundingDetails', 'PointDetails']
const route = useRoute()
const router = useRouter()
const childView = ref()
const onBack = () => {
  router.back()
}
const onNavBtnClick = () => {
  childView.value?.toggleShowConfirmSheet()
}

// 监听当前路由
// watch(
//   () => router.currentRoute.value,
//   route => {
//     window.log('当前路由', route.name)
//   },
//   { immediate: true }
// )
</script>

<template>
  <div class="details-nav-bar">
    <nav-bar
      v-if="!hiddenDefaultNavBarRoutes.includes(route.name as string)"
      title="消息"
      mode="white"
    >
      <template #right>
        <van-icon
          v-show="childView?.showDelIcon"
          name="delete-o"
          @click="onNavBtnClick"
        />
      </template>
    </nav-bar>
  </div>

  <div class="details-container">
    <!-- <router-view ref="childView" /> -->
    <router-view v-slot="{ Component }">
      <component
        ref="childView"
        :is="Component"
      />
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';

.details-nav-bar {
  :deep(.van-nav-bar) {
    height: 90px;
    &.van-hairline--bottom::after {
      border-width: 0;
    }
    .arrow-back {
      margin-left: 24px;
      transform: rotate(180deg) scale(1.5);
    }

    .van-nav-bar__right {
      top: 80px;
      height: 80px;
      padding-right: 40px;
      .van-icon {
        font-size: 28px;
        color: #787f8c;
      }
    }
    .btn-text {
      font-size: 33px;
      color: #0b75ff;
    }
  }
}

.details-container {
  text-align: center;
  height: 100%;
  background-color: #fff;
  overflow: auto;
}
</style>
