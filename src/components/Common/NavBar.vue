<template>
  <div class="nav-bar" :class="[`nav-bar--${mode}`]">
    <van-nav-bar
      :title="title"
      safe-area-inset-top
      @click-left="onBack"
      v-bind="$attrs"
    >
      <template v-if="$slots.title" #title>
        <slot name="title" />
      </template>
      <template #left v-if="!hideLeft">
        <slot name="left">
          <i v-if="['white', 'transparent'].includes(mode)" class="arrow-right-gray arrow-back"></i>
          <i v-if="['blue'].includes(mode)" class="arrow-right arrow-back"></i>
        </slot>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
interface Props {
  title?: string,
  mode?: 'blue' | 'white' | 'transparent',
  hideLeft?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  mode: 'blue',
  hideLeft: false
})

const router = useRouter()
const onBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';

.nav-bar {
  padding-bottom: 30px;
  &--blue {
    background-color: #0b75ff;
    :deep(.van-nav-bar) {
      .van-nav-bar__title {
        color: #fff;
      }
    }
  }
  &--white {
    background-color: #fff;
    :deep(.van-nav-bar) {
      .van-nac-bar__title {
        color: #13161b;
      }
    }
  }
  &--transparent {
    background-color: transparent;
  }

  :deep(.van-nav-bar) {
    background: transparent;
    &.van-hairline--bottom::after {
      border-bottom-width: 0;
    }
    .van-nav-bar__content {
      height: 90px;

      .arrow-back {
        margin-left: 10px;
        transform: rotate(180deg) scale(1.5);
      }
      .van-nav-bar__title {
        height: 100%;
        font-size: 42px;
        display: flex;
        align-items: flex-end;
        font-weight: initial;
      }
      .van-nav-bar__left, .van-nav-bar__right {
        align-items: flex-end;
        bottom: 14px;
      }
    }
  }
}
</style>
