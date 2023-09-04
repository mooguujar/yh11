<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logo from '@/assets/images/logo.png'
import GDPAY from '@/assets/images/GDPAY.png'

interface TabsItem {
  title: string
  path: string
}
const tabsItems: TabsItem[] = [
  {
    title: '登录',
    path: '/auth/login'
  },
  {
    title: '注册',
    path: '/auth/register'
  }
]
const router = useRouter()
const route = useRoute()
const tabIndex = ref(0)
const addAnimation = ref(true)
const tabsActiveBar = ref()
const tabItem = ref()
const toggleTopMenu = (tab: TabsItem, index: number, needAnimation = true) => {
  changeView(tab, index)

  let width = tabItem.value[index].clientWidth + 'px'
  // const width = tabItem.clientWidth * 0.7 + 'px' //	在页面上返回内容的可视宽度（不包括边框，边距或滚动条）
  // const width = tabItem.value?.clientWidth + 'px' //	在页面上返回内容的可视宽度（不包括边框，边距或滚动条）

  tabsActiveBar.value.style.width = width
  tabIndex.value = index
  addAnimation.value = needAnimation
  if (tabIndex.value == 0) {
    // tabsActiveBar.style.left = dom_.tabItem[0].$el.clientWidth * 0.15 + 'px'
    tabsActiveBar.value.style.left = '0'
  } else {
    // const left = tabItem.offsetLeft + tabItem.clientWidth * 0.15 + 'px' // 返回当前元素的相对水平偏移位置的偏移容器
    tabsActiveBar.value.style.left = tabItem.value[index].offsetLeft + 'px'
  }
}

const changeView = (tab: TabsItem, index: number) => {
  if (index === tabIndex.value) return

  tabIndex.value = index
  router.replace(tab.path)
}
</script>

<template>
  <div class="auth-container">
    <div class="top-icon-container flex justify-between items-end">
      <i class="arrow-right-gray"></i>
      <i class="customer-service-dark"></i>
    </div>
    <div class="logo-view-container flex justify-center items-center flex-col">
      <van-image
        :src="logo"
        class="app-logo"
      />
      <van-image
        :src="GDPAY"
        class="app-logotext"
      />
    </div>
    <div class="tab-container">
      <div class="items-view flex justify-between items-center">
        <div
          ref="tabItem"
          v-for="(tab, index) in tabsItems"
          :key="tab.path"
          class="item flex justify-center items-center"
          :class="{ active: index === tabIndex }"
          @click="toggleTopMenu(tab, index)"
        >
          <div class="name">{{ tab.title }}</div>
        </div>
        <div
          class="tabs-active-bar norem"
          :class="{ 'tabs-move': addAnimation }"
          ref="tabsActiveBar"
        ></div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';

.auth-container {
  flex: 1;
  background-color: #fff;
  .top-icon-container {
    width: 100%;
    height: 51px;
    padding: 0 41px;
    .arrow-right-gray {
      transform: scale(1.3) rotate(180deg);
    }
  }
  .logo-view-container {
    width: 100%;
    height: 314px;
    :deep(.van-image) {
      &.app-logo {
        width: 139px;
        height: 139px;
      }
      &.app-logotext {
        width: 154px;
        height: 31px;
        margin-top: 18px;
      }
    }
  }
  .tab-container {
    width: 100%;
    height: 50px;
    padding: 0 220px;
    .items-view {
      width: 100%;
      position: relative;
      padding-bottom: 4px;
      .item {
        width: 87px;
        color: #868d9a;
        &.active {
          color: #0b75ff;
        }
        .name {
          font-size: 31px;
          transition: color 0.3s;
        }
      }
      .tabs-active-bar {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 87px;
        height: 4px;
        background-color: #0b75ff;
        border-radius: 2px;
        &.tabs-move {
          transition: all 0.3s ease-in-out;
        }
        &.norem {
          height: 2px;
        }
      }
    }
  }
}
</style>
