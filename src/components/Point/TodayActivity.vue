<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Task from './Task.vue'
import { DAILYTASK } from './tools'
import progressbarGrey from '@/assets/images/common/progressbar-grey.png'
import progressbarYellow from '@/assets/images/common/progressbar-yellow.png'
import { useTaskActivityStore } from '@/store/modules/taskActivity'
import { IAction, IDayAction, IUserActionData } from '@/store/types/taskActivity'
import { storeToRefs } from 'pinia'
import mitt from '@/utils/mitt'
import { userDoTaskApi } from '@/apis/taskActivity'
import { useEntryStore } from '@/store'
import { INormal } from '@/store/types/entry'
import success from '@/assets/images/common/success.png'
import { showToast } from 'vant'

const emit = defineEmits(['update-coins'])

const activityValue = ref(0)
const finalTarget = ref(0)

type TAction = Partial<IAction>
const awardPointList = ref<TAction[]>([
  {
    class: 'point-10'
  },
  {
    class: 'point-10'
  },
  {
    class: 'point-30'
  },
  {
    class: 'point-50'
  },
  {
    class: 'point-80'
  }
])
const dailyTaskList = ref<IDayAction[]>([])
const barGrey = ref()
const barYellow = ref()

const entryStore = useEntryStore()
const { config } = storeToRefs(entryStore)

const appDomain = computed(() => {
  return (config.value.Web_Set_DefaultInfo?.imgserver_url as INormal).v || ''
})

const taskActivityStore = useTaskActivityStore()
const { getUserActionListApi } = taskActivityStore
const { userActionList } = storeToRefs(taskActivityStore)

const handleTodayActivityData = (data: IUserActionData) => {
  activityValue.value = data.total
  awardPointList.value = data.actions
  dailyTaskList.value = data.dayactions
  finalTarget.value = +(data.actions[data.actions.length - 1].target ?? 0)

  barYellow.value.style.width =
    (activityValue.value / finalTarget.value) * barGrey.value.clientWidth + 'px'
}
const getUserActionList = async (isReq: boolean = false) => {
  try {
    // if (userActionList.value.dayactions && !isReq) {
    //   handleTodayActivityData(userActionList.value)
    //   return
    // }

    const res = await getUserActionListApi()

    window.log('每日活跃度任务列表', res)

    if (res) {
      handleTodayActivityData(res)
    }
  } catch (error) {
    console.error(error)
  }
}

const awardBox = ref()
// 计算积分宝箱的位置
const awardBoxPos = (item: TAction, index: number) => {
  if (awardBox.value?.[index]) {
    if (!item.target) return

    const left =
      Math.abs(
        (+(item.target as unknown as number) / finalTarget.value) * barGrey.value.clientWidth -
          53 / 2
      ) + 'px'
    return +(item.target as unknown as number) === finalTarget.value ? 'right: 0' : `left: ${left}`
  }
}

// 点击宝箱领取积分
const getBoxAward = async (item: TAction) => {
  try {
    if (!item.cando) return

    const res = await userDoTaskApi({
      idd: userActionList.value.task_idd,
      levelid: item.id
    })

    // 领取积分后更新积分数据
    if (res.money) {
      getUserActionList()
      emit('update-coins', true)

      showToast({
        message: `领取成功，+${res.money}积分`,
        icon: success,
        teleport: '.today-activity-container'
      })
    }

    window.log('领取宝箱积分奖励', res)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getUserActionList()
  mitt.on('updateTodayActivity', getUserActionList)
})
onUnmounted(() => {
  mitt.off('updateTodayActivity', getUserActionList)
})
</script>

<template>
  <div class="today-activity-container">
    <div class="container-title">
      今日活跃度：
      <span>{{ activityValue }}</span>
    </div>
    <div class="progressbar-container">
      <img
        :src="progressbarGrey"
        class="progressbar-grey"
        ref="barGrey"
      />
      <img
        :src="progressbarYellow"
        class="progressbar-yellow"
        ref="barYellow"
      />
      <div class="award-point-wrapper flex items-center">
        <div
          v-for="(item, index) in awardPointList"
          :key="index"
          ref="awardBox"
          class="item-point-column flex flex-col items-center"
          :style="awardBoxPos(item, index)"
        >
          <img
            v-if="item.task_img"
            :src="appDomain + item.task_img"
            class="award-box"
            :class="{ 'award-gray-box': item.flag }"
            @click="getBoxAward(item)"
          />
          <i
            v-else
            :class="item.class"
          ></i>
          <div class="award-point-value">{{ item.target }}</div>
          <i
            v-if="item.cando"
            class="light-step"
          ></i>
          <i
            v-if="item.flag"
            class="received"
          ></i>
        </div>
      </div>
    </div>
    <div class="task-container">
      <div class="task-tips">完成每日任务，获得活跃度!</div>
      <Task
        :list="dailyTaskList"
        :type="DAILYTASK"
        @update-list="getUserActionList"
      />
    </div>
  </div>
</template>

<style lang="scss" score>
@import '@/assets/styles/sprite-point.scss';

.today-activity-container {
  width: 100%;
  padding: 30px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 14px;
  .container-title {
    font-size: 28px;
    text-align: left;
    margin-bottom: 15px;
    color: #13161b;
    span {
      color: #ffc000;
    }
  }
  .progressbar-container {
    position: relative;
    margin-bottom: 15px;
    .progressbar-grey,
    .progressbar-yellow {
      position: absolute;
      left: 0;
      top: 44px;
      height: 20px;
    }
    .progressbar-grey {
      width: calc(100% - 20px);
    }
    .progressbar-yellow {
      width: 0;
      left: -1px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
    .award-point-wrapper {
      // position: relative;
      height: 114px;
      .award-box {
        width: 106px;
        position: relative;
        z-index: 9;
      }
      .award-gray-box {
        filter: grayscale(100%);
      }
      .award-point-value {
        margin-top: -16px;
        font-size: 21px;
        color: #ffc000;
      }
    }
    .point-80 {
      margin-top: -4px;
    }
    .item-point-column {
      position: absolute;
      // width: 106px;
      // height: 114px;
      // margin-right: 49px;
      &:nth-child(4) {
        margin-right: 0;
      }
      &:last-child {
        margin-left: auto;
        margin-right: -16px;
      }
      [class*='point-'] {
        position: relative;
        z-index: 9;
      }
      .light-step {
        position: absolute;
        top: -6px;
        animation: lightRotate 4.3s linear infinite;
      }
      .received {
        position: absolute;
        top: calc(50% - 8px);
        transform: translate3d(0, -50%, 0);
        // left: 6px;
        z-index: 10;
      }
    }
  }
  .task-container {
    .task-tips {
      font-size: 25px;
      color: #a1a7b2;
      text-align: left;
    }
  }

  .van-toast {
    width: 270px;
    height: 270px;
    padding: 40px;
    font-size: 33px;
    .van-toast__icon {
      font-size: 110px;
    }
    .van-toast__text {
      margin-top: 15px;
      line-height: 1.5;
    }
  }
}

@keyframes lightRotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
