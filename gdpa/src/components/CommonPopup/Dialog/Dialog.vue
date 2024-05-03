<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const visible = ref(false)
const setTime = ref(6)
const loadingConfirm = ref(false)
const loadingCancel = ref(false)

const props = defineProps({
  confirmButtonText: {
    type: String,
    default: ''
  },
  action: {
    type: Function
  },
  cancelAction: {
    type: Function
  },
  dialogType: {
    type: String,
    default: 'alert'
  },
  onVanish: {
    type: Function
  },
  closeable: {
    type: Boolean,
    default: true
  },
  teleport: {
    type: String,
    default: 'body'
  }
})
const checked = ref(false)
// console.log('props', props.confirmButtonText)
watch(
  () => props.confirmButtonText,
  newVal => {
    // console.log('newVal', newVal)
    if (newVal == 'setTime') {
      let t = setInterval(() => {
        if (setTime.value > 0) {
          setTime.value -= 1
        } else {
          clearInterval(t)
        }
      }, 1000)
    }
  },
  {
    immediate: true
  }
)

const onConfirm = async () => {
  loadingConfirm.value = true
  let parm: any = null
  if (props.dialogType == 'keeptime') parm = checked.value
  await props.action?.(parm)
  loadingConfirm.value = false
  visible.value = false
}

const onCancel = async () => {
  loadingCancel.value = true
  await props.cancelAction?.()
  loadingCancel.value = false
  visible.value = false
}

const onClosed = () => {
  props.onVanish?.()
}

defineExpose({
  visible
})
</script>

<template>
  <van-dialog
    v-model:show="visible"
    v-bind="$attrs"
    @closed="onClosed"
    :show-confirm-button="false"
    :show-cancel-button="false"
    :teleport="teleport"
  >
    <template #title>
      <div class="dialog-title">
        {{ $attrs.title }}
        <i
          v-if="closeable"
          class="block close-dark"
          @click="visible = false"
        ></i>
      </div>
    </template>
    <div class="dialog-content">
      <template v-if="$attrs.allowHtml">
        <div v-html="$attrs.message"></div>
      </template>
      <template v-else>
        {{ $attrs.message }}
      </template>
    </div>
    <template #footer>
      <div class="button-wrapper">
        <van-button
          v-if="confirmButtonText == 'setTime'"
          type="primary"
          block
          :disabled="setTime != 0"
          @click="onConfirm"
          :loading="loadingConfirm"
        >
          {{ setTime ? setTime : '确认' }}
        </van-button>
        <van-button
          v-else
          type="primary"
          block
          @click="onConfirm"
          :loading="loadingConfirm"
        >
          {{ confirmButtonText || '是' }}
        </van-button>
        <van-button
          color="#777777"
          v-if="dialogType === 'confirm' && !$attrs.hideCancelButton"
          type="primary"
          block
          @click="onCancel"
          :loading="loadingCancel"
        >
          {{ $attrs.cancelButtonText || '否' }}
        </van-button>
      </div>
      <div
        v-if="dialogType == 'keeptime'"
        class="pb-[30px] flex items-center justify-center"
      >
        <i
          class="radio mr-[10px]"
          :class="checked ? 'radio-checked' : 'radio-uncheck'"
          @click="checked = !checked"
        ></i>
        <div class="radio-text text-[24px]">今日不再显示</div>
      </div>
    </template>
  </van-dialog>
</template>

<style scoped lang="scss">
.button-wrapper {
  display: flex;
  padding: 20px 40px;
  gap: 30px;
}

.dialog-title {
  position: relative;
  .close-dark {
    position: absolute;
    right: 40px;
    top: -10px;
  }
}

.dialog-content {
  padding: 40px;
}
.van-dialog__header {
  padding-top: 25px;
}
.dialog-title {
  font-weight: 430;
  .close-dark {
    top: 8px !important;
  }
}
.van-dialog__content {
  .dialog-content {
    padding: 15px 30px;
    font-size: 26px;
    line-height: 30px;
  }
}
.van-button--block {
  height: 70px;
}
</style>
