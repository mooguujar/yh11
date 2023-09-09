<template>
  <div
    class="item flex justify-center"
    :class="{ active: isActive }"
  >
    <div
      class="flex-item"
      :class="isActive ? 'active' : ''"
      @click="to(routePath)"
    >
      <div class="icon-container">
        <i
          class="icon"
          :class="'tabbar-' + (isActive ? icon + '-active' : icon)"
        ></i>
      </div>
      <span class="title">{{ title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
const router = useRouter()
const isActive = computed(() => route.path.split('/')[1] === props.routePath.split('/')[1])

const to = (routePath: string) => {
  router.push(routePath)
}
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
  .title {
    color: #666;
  }
}

.active {
  font-weight: 600;
}
</style>
