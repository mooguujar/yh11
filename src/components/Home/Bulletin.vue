<script setup lang="ts">
import { articleListApi } from '@/apis/article'
import { useArticleStore } from '@/store/modules/article'
import { useAuthStore } from '@/store/modules/auth'
import { IArticleListType } from '@/store/types/article'
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { token, userInfo } = storeToRefs(authStore)
const { cash } = userInfo.value

const router = useRouter()
const articleStore = useArticleStore()
const { getArticleListApi } = articleStore
const { rollingNotice } = storeToRefs(articleStore)

const bulletinData = ref<IArticleListType[]>([])

const isLogin = computed(() => !!token.value)

const emit = defineEmits(['update-article'])

const handleRollingNoticeData = async () => {
  try {
    let res: IArticleListType[] = await getArticleListApi({
      bind_key: 'OpenNotice,RollingNotice,HomeHuanDeng'
    })

    emit('update-article')
    // res = rollingNotice.value

    // if (res.length) {
    //   bulletinData.value = res
    // }

    window.log('跑马灯公告内容', res)
  } catch (error) {
    console.error(error)
  }
}

const dialogShow = ref(false)
const dialog = ref<IArticleListType | Record<string, any>>({})

const handleShowDialog = (_dialog: IArticleListType) => {
  dialog.value = _dialog
  dialogShow.value = true
}
const closeDialog = () => {
  dialogShow.value = false
}

onMounted(() => {
  handleRollingNoticeData()
})
</script>

<template>
  <div class="bulletin-container flex items-center">
    <div class="bulletin"></div>
    <van-swipe
      autoplay="4000"
      duration="600"
      vertical
      :show-indicators="false"
      :touchable="false"
      class="swipe-bulletin"
    >
      <van-swipe-item
        v-for="item in rollingNotice"
        :key="item.id"
        @click="handleShowDialog(item)"
      >
        <div v-html="item.title"></div>
      </van-swipe-item>
    </van-swipe>

    <van-dialog
      v-model:show="dialogShow"
      title="公告"
      confirmButtonText="我知道了"
      theme="round-button"
      className="dialog-bulletin"
    >
      <i
        class="icon-close close-dark block"
        @click="closeDialog"
      ></i>
      <div v-html="dialog.content"></div>
    </van-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';
.bulletin-container {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  font-size: 26px;
  .bulletin {
    margin-right: 10px;
  }
  :deep(.swipe-bulletin) {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    .van-swipe__track {
      transition-timing-function: linear;
    }
  }
  :deep(.dialog-bulletin) {
    width: 708px;
    height: auto;
    padding: 40px;
    .van-dialog__header {
      padding: 0;
      font-size: 29px;
      color: #13161b;
    }
    .van-dialog__content {
      margin: 33px 0 35px 0;
      font-size: 25px;
      color: #787f8c;
      text-align: justify;
    }
    .van-dialog__footer {
      padding: 0;
    }
    .van-dialog__confirm {
      width: 100%;
      height: 80px;
      font-size: 31px;
      background: #0b75ff;
      border-radius: 8px;
      border-width: 0;
    }
    .icon-close {
      position: absolute;
      right: 40px;
      top: 24px;
    }
    img {
      width: 100%;
      margin-top: 20px;
    }
  }
  .marquee {
    height: 50px;
  }
  .item-notice {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    margin-bottom: 20px;
  }
}
</style>
