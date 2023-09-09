<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const props = defineProps({
  action: {
    type: Function,
    required: true,
  },
})

const onConfirm = () => {
  props.action()
  visible.value = false
}

defineExpose({
  visible
})
</script>

<template>
  <van-dialog
    v-model:show="visible"
    theme="round-button"
  >
    <template #title>
      <h5 class="van-dialog__title">登录已过期，请返回游戏大厅。</h5>
    </template>
    <template #footer>
      <div class="van-action-bar van-safe-area-bottom van-dialog__footer">
        <van-button type="primary" block @click="onConfirm">确定</van-button>
      </div>
    </template>
  </van-dialog>
</template>

<style scoped lang="scss">

</style>