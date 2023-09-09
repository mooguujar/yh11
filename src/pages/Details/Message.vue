<script setup lang="ts">
import { userMessageDetailsApi, userMessageDelApi } from '@/apis/article'
import { showToast } from 'vant'
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import verified from '@/assets/images/common/verified.png'
import { IMessageDetails } from '@/store/types/article'

// 删除确认对话框
const showConfirmSheet = ref(false)
const route = useRoute()
const router = useRouter()
const _id = route.params.id as string

const toggleShowConfirmSheet = () => {
  showConfirmSheet.value = !showConfirmSheet.value
}

const onDelMessage = async () => {
  const res = await userMessageDelApi({
    ids: _id
  })

  if (res) {
    showToast({
      message: '删除成功',
      icon: verified,
      iconSize: '48px'
    })

    router.back()
  }
}
// 删除确认对话框选项
const actions = [{ name: '确认', callback: onDelMessage }]

const details = ref<IMessageDetails>({} as IMessageDetails)
const getMessageDetails = async () => {
  try {
    const res = await userMessageDetailsApi({
      id: +_id
    })

    if (res) {
      details.value = res
    }

    window.log('消息详情', res)
  } catch (error) {
    console.error(error)
  }
}

// 自定义指令处理富文本内容
const vDetailsContent = {
  updated: (el: HTMLElement) => {
    let template = ''
    el.childNodes.forEach(item => {
      if (item.nodeType === 3 && item.parentElement?.className.includes('message-content')) {
        template += `<p>${item.textContent}</p>`
      } else {
        template += (item as HTMLElement).outerHTML
      }
    })
    el.innerHTML = template
  }
}

defineExpose({
  showConfirmSheet,
  toggleShowConfirmSheet
})
onMounted(() => {
  getMessageDetails()
})
</script>

<template>
  <div class="message-details-container">
    <div class="title text-left">{{ details.title }}</div>
    <div class="datetime text-left">{{ details.add_time }}</div>
    <div
      class="message-content text-justify"
      v-html="details.content"
      v-details-content
    ></div>
  </div>

  <!-- 动作面板 -->
  <div class="confirm-sheet-container">
    <van-action-sheet
      v-model:show="showConfirmSheet"
      :actions="actions"
      cancel-text="取消"
      description="您要删除此消息吗？"
      close-on-click-action
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';
.message-details-container {
  width: 100%;
  padding: 13px 38px 0 38px;
  color: #13161b;
  .title {
    font-size: 28px;
  }
  .datetime,
  .message-content {
    font-size: 22px;
    color: #787f8c;
  }
  .message-content {
    padding: 33px 0 33px 0;
    :deep(img) {
      width: 100%;
      &[alt*='['] {
        width: auto;
      }
    }
    :deep(strike) {
      img {
        width: auto;
      }
    }
  }
}

.confirm-sheet-container {
  :deep(.van-action-sheet) {
    .van-action-sheet__description {
      height: 92px;
      line-height: 92px;
      padding: 0;
      font-size: 25px;
      color: #787f8c;
      &::after {
        height: 1px;
        background-image: linear-gradient(#e1e1e1, #e1e1e1), linear-gradient(#d6dce8, #d6dce8);
        border: 0;
        transform: scaleY(1);
        left: 0;
        right: 0;
      }
    }
    .van-action-sheet__item {
      height: 92px;
      font-size: 31px;
      font-weight: bold;
      color: #0b75ff;
    }
    .van-action-sheet__gap {
      height: 1px;
      background: unset;
      background-image: linear-gradient(#e1e1e1, #e1e1e1), linear-gradient(#d6dce8, #d6dce8);
    }
    .van-action-sheet__cancel {
      height: 138px;
      font-size: 31px;
      font-weight: bold;
      color: #13161b;
    }
  }
}
</style>
