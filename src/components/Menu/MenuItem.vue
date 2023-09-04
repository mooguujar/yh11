<template>
  <div
    class="item flex justify-center"
    :class="{ active: isActive }"
  >
    <router-link
      :to="routePath"
      tag="div"
      class="flex-item"
      :class="isActive ? 'active' : ''"
    >
      <div class="icon-container">
        <i
          class="icon"
          :class="'tabbar-' + (isActive ? icon + '-active' : icon)"
        ></i>
      </div>
      <span class="title">{{ title }}</span>
      <slot></slot>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export interface Props {
  title: string
  routePath: string
  icon: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  routePath: '/',
  icon: ''
})

const route = useRoute()
const isActive = computed(() => route.path.split('/')[1] === props.routePath.split('/')[1])
</script>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';
.item {
  flex: 1;
  text-align: center;
  font-weight: 500;
  &.active {
    .title {
      color: #0b75ff;
    }
  }
  a:hover {
    color: #0b75ff;
  }

  .flex-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .icon-container {
    height: 38px;
    i {
      display: block;
    }
  }

  // @each $svg in video, douyin, game, community, mine {
  //   .bar-#{$svg} {
  //     background-image: url('~@/assets/images/svg/bar-#{$svg}.svg');
  //   }
  // }
}

.active {
  //color: #ffff;
  font-weight: 600;
}
</style>
