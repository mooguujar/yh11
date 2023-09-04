<template>
  <div
    class="app-bar"
    :class="mode"
    :style="styleComputed"
  >
    <div class="app-bar-item">
      <img
        alt=""
        :src="iconRefresh"
        @click="onRefresh"
      />
    </div>
    <div class="app-bar-item">
      <img
        alt=""
        :src="iconClose"
        @click="onClose"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'
import { useAppBarProvide } from './useAppBar'
import IconRefreshIconLight from './icon/refresh-light.png'
import IconCloseIconLight from './icon/close-light.png'
import IconRefreshIconDark from './icon/refresh-dark.png'
import IconCloseIconDark from './icon/close-dark.png'
import { isNumber } from 'lodash'

function px2rem(px: number) {
  return px / 75
}

function styleValueConverter(value: string | number) {
  if (isNumber(value)) {
    return `${px2rem(value)}rem`
  } else if (/^\d+(\.\d+)?px$/.test(value)) {
    return `${px2rem(Number(value.slice(0, -2)))}rem`
  }
  return value
}

function styleConverter(style: CSSProperties) {
  return Object.entries(style).reduce((acc, [key, value]) => {
    acc[key] = styleValueConverter(value)
    return acc
  }, {})
}

const styleComputed = computed(() => {
  return styleConverter(style.value)
})

const { mode, style, onClose, onRefresh } = useAppBarProvide()

const iconRefresh = computed(() => {
  return mode.value === 'light' ? IconRefreshIconLight : IconRefreshIconDark
})

const iconClose = computed(() => {
  return mode.value === 'light' ? IconCloseIconLight : IconCloseIconDark
})
</script>
<style>
:root {
  --app-bar-width: 153px;
}
</style>
<style scoped lang="scss">
.app-bar {
  position: fixed;
  display: flex;
  top: calc(constant(safe-area-inset-top) + 40px);
  top: calc(env(safe-area-inset-top) + 40px);
  right: 29px;
  width: var(--app-bar-width);
  height: 56px;
  border-radius: 40px;
  border-width: 1px;
  border-style: solid;
  z-index: 10000;
  background: #fff;
  &::after {
    content: '';
    position: absolute;
    top: 3px;
    bottom: 3px;
    left: 50%;
    width: 1px;
  }
  &.light {
    border-color: #e6e6e6;
    &::after {
      background: #e6e6e6;
    }
  }
  &.dark {
    background: rgba(0, 0, 0, 0.5);
    border-color: transparent;
    &::after {
      background: #fff;
    }
  }
  &-item {
    width: 50%;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    img {
      height: 100%;
    }
  }
}
</style>
