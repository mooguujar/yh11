<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
const loadingConfirm = ref(false);
const loadingCancel = ref(false);

const props = defineProps({
  action: {
    type: Function
  },
  cancelAction: {
    type: Function
  },
  dialogType: {
    type: String,
    required: true
  },
  onVanish: {
    type: Function
  }
});

const onConfirm = async () => {
  loadingConfirm.value = true;
  await props.action?.();
  loadingConfirm.value = false;
  visible.value = false;
};

const onCancel = async () => {
  loadingCancel.value = true
  await props.cancelAction?.();
  loadingCancel.value = false
  visible.value = false;
};

const onClosed = () => {
  props.onVanish?.();
};

defineExpose({
  visible
});
</script>

<template>
  <van-dialog
    v-model:show="visible"
    v-bind="$attrs"
    @closed="onClosed"
    :show-confirm-button="false"
    :show-cancel-button="false"
  >
    <template #title>
      <div class="dialog-title">
        {{ $attrs.title }}
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
        <van-button type="primary" block @click="onConfirm" :loading="loadingConfirm">
          {{ $attrs.confirmButtonText || "是" }}
        </van-button>
        <van-button color="#777777" v-if="dialogType === 'confirm'" type="primary" block @click="onCancel"
                    :loading="loadingCancel">
          {{ $attrs.cancelButtonText || "否" }}
        </van-button>
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

}

.dialog-content {
  text-align: center;
  padding: 40px;
}
</style>