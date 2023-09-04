<template>
  <div class="mine w-100 bg-[#f6fbff]">
    <nav-bar
      class="nav-bar"
      title="订单中心"
      mode="blue"
      hide-left
    />
    <div class="order-content py-[22px] bg-[#f6fbff] rounded-md fixed w-full max-w-[750px]">
      <div class="flex mb-[0px]">
        <div
          :class="`action-btn w-[110px] h-[45px] relative text-[32px] text-center ${
            action_index == index ? 'text-[#000] font-bold' : 'text-[#868d9a] font-normal'
          } transition-colors duration-300`"
          v-for="(action, index) in action_tabs"
          @click="action_index = index"
        >
          {{ action.title }}
        </div>
      </div>
      <!-- 買幣 -->
      <div
        class="px-[20px] w-full relative"
        v-if="action_index === 0"
      >
        <div class="w-full">
          <div class="w-[240px]">
            <van-tabs v-model:active="status_index">
              <van-tab
                :title="status.title"
                v-for="(status, index) in status_tabs"
              ></van-tab>
            </van-tabs>
          </div>
        </div>
        <div
          class="pt-[20px] w-[calc(100%-40px)] h-[calc(100vh-300px)] pb-[100px] overflow-scroll fixed top-[280px]"
          v-if="list.length > 0"
        >
          <van-pull-refresh
            class="!h-auto"
            v-model="refreshing"
            @refresh="onRefresh"
          >
            <!-- 下拉提示 -->
            <template #pulling="props">
              <van-icon
                name="replay"
                size="24"
                :style="{ transform: `rotateZ(${(props.distance / 50) * 360}deg)` }"
              />
            </template>

            <!-- 释放提示 -->
            <template #loosing="props">
              <van-icon
                name="replay"
                size="24"
                :style="{ transform: `rotateZ(${(props.distance / 50) * 360}deg)` }"
              />
            </template>

            <!-- 加载提示 -->
            <template #loading>
              <van-loading size="24px">加载中...</van-loading>
            </template>
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div
                class="buy-item rounded-[14px] bg-white h-[267px] mb-[20px] px-[18px] pt-[20px]"
                v-for="item in list"
                :key="item"
              >
                <div class="flex items-center justify-between mb-[10px]">
                  <div class="text-[#787f8c] text-[20px]">{{ item.addtime }}</div>
                  <div :class="`font-bold ${renderBuyStatusText(item.status).color} text-[32px]`">
                    {{ renderBuyStatusText(item.status).text }}
                  </div>
                </div>
                <div class="flex items-center justify-between mb-[10px]">
                  <div class="text-[#787f8c] text-[20px]">订单金额</div>
                  <div class="font-bold text-[#000] text-[32px]">
                    {{ financial(item.buy_num) }}GDB
                  </div>
                </div>
                <div class="flex items-center justify-between mb-[10px]">
                  <div class="text-[#787f8c] text-[20px]">订单编号</div>
                  <div class="text-[#13161b] text-[25px] flex items-center font-semibold">
                    {{ item.order_id }}
                    <div
                      class="copy ml-[10px]"
                      @click="onCopy(item.order_id, '订单编号')"
                    ></div>
                  </div>
                </div>
                <!-- <div class="flex items-center justify-between mb-[10px]">
                  <div class="text-[#787f8c] text-[20px]">搬砖奖励</div>
                  <div class="text-[#13161b] text-[25px] flex items-center">
                    {{ '0.000' }}GDB
                  </div>
                </div> -->
                <div class="flex items-center justify-between mb-[10px]">
                  <div class="text-[#13161b] text-[25px] flex items-center">
                    <img
                      class="w-[57px] h-[57px] block mr-[10px] rounded-sm"
                      :src="imgServerUrl + item.headimg"
                      alt=""
                    />
                    <span class="text-[28px]">{{ item.nickname }}</span>
                  </div>
                  <div
                    class="text-[#ff0000] text-[28px]"
                    v-if="item.time_second > 0"
                  >
                    <Timer :value="item.time_second" />
                  </div>
                  <div
                    class="btn bg-[#0b75ff] text-white text-[28px] w-[181px] h-[63px] flex items-center justify-center rounded-[7px]"
                    @click="router.push(`/orderCreate?order_id=${item.order_id}`)"
                  >
                    订单详情
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
        <div
          class="no-data flex flex-col items-center"
          v-if="list.length == 0"
        >
          <img :src="noData" />
          <div class="text-no-data">暂无数据</div>
        </div>
      </div>
      <!-- 賣幣 -->
      <div
        class="px-[20px] w-full relative"
        v-if="action_index === 1"
      >
        <div class="w-full">
          <div class="w-[240px]">
            <van-tabs v-model:active="status_index">
              <van-tab
                :title="status.title"
                v-for="(status, index) in status_tabs"
              ></van-tab>
            </van-tabs>
          </div>
        </div>
        <div
          class="pt-[20px] w-[calc(100%-40px)] h-[calc(100vh-300px)] pb-[100px] overflow-scroll fixed top-[280px]"
          v-if="list.length > 0"
        >
          <van-pull-refresh
            class="!h-auto"
            v-model="refreshing"
            @refresh="onRefresh"
          >
            <!-- 下拉提示 -->
            <template #pulling="props">
              <van-icon
                name="replay"
                size="24"
                :style="{ transform: `rotateZ(${(props.distance / 50) * 360}deg)` }"
              />
            </template>

            <!-- 释放提示 -->
            <template #loosing="props">
              <van-icon
                name="replay"
                size="24"
                :style="{ transform: `rotateZ(${(props.distance / 50) * 360}deg)` }"
              />
            </template>

            <!-- 加载提示 -->
            <template #loading>
              <van-loading size="24px">加载中...</van-loading>
            </template>
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div
                class="buy-item rounded-[14px] bg-white h-[347px] mb-[20px] px-[13px] pt-[20px]"
                v-for="item in list"
                :key="item"
              >
                <div class="flex items-center justify-between mb-[10px]">
                  <div class="text-[#787f8c] text-[20px]">{{ item.addtime }}</div>
                  <div :class="`font-bold ${renderSellStatusText(item.status).color} text-[32px]`">
                    {{ renderSellStatusText(item.status).text }}
                  </div>
                </div>
                <div class="flex items-center justify-between mb-[10px]">
                  <div class="text-[#787f8c] text-[20px]">挂单金额</div>
                  <div class="font-bold text-[#000] text-[32px]">
                    {{ financial(item.sell_num) }}GDB
                  </div>
                </div>
                <div class="flex items-center justify-between mb-[10px]">
                  <div class="text-[#787f8c] text-[20px]">剩余金额</div>
                  <div class="font-bold text-[#000] text-[32px]">
                    {{ financial(item.remaining_num) }}GDB
                  </div>
                </div>
                <div class="flex items-center justify-between mb-[10px]">
                  <div class="text-[#787f8c] text-[20px]">额外奖励</div>
                  <div class="text-[#000] text-[25px]">{{ financial(item.sell_gift) }}GDB</div>
                </div>
                <div class="flex items-center justify-between mb-[10px]">
                  <div class="text-[#787f8c] text-[20px]">挂单编号</div>
                  <div class="text-[#13161b] text-[25px] flex items-center font-semibold">
                    {{ item.order_id }}
                    <div
                      class="copy ml-[10px]"
                      @click="onCopy(item.order_id, '挂单编号')"
                    ></div>
                  </div>
                </div>
                <div class="flex items-center justify-end mb-[15px]">
                  <div
                    class="btn bg-[#0b75ff] text-white text-[28px] w-[181px] h-[63px] flex items-center justify-center rounded-[7px]"
                    @click="router.push(`/orderList?order_id=${item.order_id}`)"
                  >
                    交易明细
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
        <div
          class="no-data flex flex-col items-center"
          v-if="list.length == 0"
        >
          <img :src="noData" />
          <div class="text-no-data">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useAuthStore, useEntryStore } from '@/store'
import { useAppBar } from '@/components/AppBar/useAppBar'

useAppBar({ mode: 'dark' })
import noData from '@/assets/images/common/noData.png'
import { showToast } from 'vant'
import { useClipboard } from '@vueuse/core'
import verified from '@/assets/images/common/verified.png'
import { useRouter, useRoute } from 'vue-router'
import { myBuyOrdersApi, mySellOrdersApi } from '@/apis/buySellCoin'
import { computed } from 'vue'
import { watch } from 'vue'
import Timer from '@/components/TImer.vue'

const entryStore = useEntryStore()
const imgServerUrl = entryStore.imgServerUrl
const authStore = useAuthStore()

const router = useRouter()
const route = useRoute()

const financial = (x: string) => {
  return x ? Number.parseFloat(x).toFixed(2) : '0.00'
}

// 封装onCopy函数，绑定到一键复制的按钮中
const onCopy = (order_id: string, name: string) => {
  const source = ref(order_id)
  // 考虑到兼容性问题，
  // 先判断当前有没有clipboard实例，如果有，则使用useClipboard；如果没有，则使用js原生方法
  if (navigator.clipboard) {
    const { copy } = useClipboard({ source })
    copy()
  } else {
    const input = document.createElement('input')
    input.setAttribute('value', source.value)
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }
  showToast({
    message: `${name}已复制到剪切板`,
    icon: verified
  })
}

const action_tabs = [
  {
    title: '买币'
  },
  {
    title: '卖币'
  }
]

const action_index = ref(0)

const status_tabs = [
  {
    title: '进行中',
    path: '?status=1'
  },
  {
    title: '已完成',
    path: '?status=2'
  }
]

const status_index = ref(0)

const list = ref<any>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const oderParm = ref({
  page: 1, //	否	int	当前页码 默认1
  pagesize: 10 //	否	int	每页数据量 默认20
})

const onLoad = async () => {
  if (refreshing.value) {
    oderParm.value.page = 1
    list.value = []
    refreshing.value = false
  }

  const res = await getMyOrders(oderParm.value.page)
  const count = res?.count

  if (!!!count && count !== 0) return showToast('数据异常!!')
  list?.value.push(...res.list)
  loading.value = false
  oderParm.value.page = oderParm.value.page + 1

  if (list.value.length >= count) {
    finished.value = true
  }
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false
  oderParm.value.page = 1
  list.value = []

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}

const { coins, editreview } = authStore
const current_coin = ref({
  mtype: 0,
  coin_name: '',
  coin_unit: 'GDB',
  coincash: '',
  available_coincash: '',
  status: 0,
  wallet_type: '',
  service_fee: ''
})
const getUserInfo = async () => {
  try {
    const coin = coins.filter(coin => coin?.coin_unit === 'GDB')?.[0]

    current_coin.value = coin

    console.log(editreview, 'editreview')
  } catch (e) {
    console.log(e)
  }
}

const orderStatus = computed(() => {
  if (action_index.value === 0) {
    return status_index.value === 0 ? '1,3,6,7' : '2,4,5,8,9,10'
  } else {
    return status_index.value === 0 ? '1,2,3,4,5' : '6,7,8'
  }
})

const getMyOrders = async (page: number) => {
  try {
    let res
    if (action_index.value === 0) {
      console.log(1)
      res = await myBuyOrdersApi({
        page,
        status: orderStatus.value
      })
    } else {
      console.log(2)
      res = await mySellOrdersApi({
        page,
        status: orderStatus.value
      })
    }
    return res
  } catch (e) {
    console.log(e)
  }
}

const renderBuyStatusText = (status: number) => {
  const buyStatusList = [
    { text: '等待卖家确认', color: 'text-[#0b75ff]' },
    { text: '卖家拒绝', color: 'text-[#777]' },
    { text: '付款中', color: 'text-[#ff0000]' },
    { text: '付款超时', color: 'text-[#777]' },
    { text: '取消买入', color: 'text-[#777]' },
    { text: '已付待收', color: 'text-[#ff0000]' },
    { text: '挂起待确认', color: 'text-[#ff0000]' },
    { text: '交易完成', color: 'text-[#58cf00]' },
    { text: '强制失败', color: 'text-[#777]' },
    { text: '强制成功', color: 'text-[#58cf00]' }
  ]
  return buyStatusList[status - 1]
}

const renderSellStatusText = (status: number) => {
  const sellStatusList = [
    { text: '挂单中', color: 'text-[#ff0000]' },
    { text: '确认交易中', color: 'text-[#ff0000]' },
    { text: '等待买家付款', color: 'text-[#ff0000]' },
    { text: '确认收款中', color: 'text-[#ff0000]' },
    { text: '挂起待确认', color: 'text-[#ff0000]' },
    { text: '全部完成', color: 'text-[#58cf00]' },
    { text: '取消卖出', color: 'text-[#777]' },
    { text: '部分完成（已取消但部分完成）', color: 'text-[#777]' }
  ]
  return sellStatusList[status - 1]
}

watch(action_index, async () => {
  recordPageStatus()
  onRefresh()
})

watch(status_index, async () => {
  recordPageStatus()
  onRefresh()
})

const recordPageStatus = () => {
  router.replace({
    query: {
      active_index: action_index.value,
      status_index: status_index.value
    }
  })
}

onMounted(async () => {
  if (route.query.status_index && route.query.active_index) {
    action_index.value = Number(route.query.active_index)
    status_index.value = Number(route.query.status_index)
  }
  getUserInfo()
  onRefresh()
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';
@import '@/assets/styles/sprite-mine.scss';
.order-content {
  margin-top: -40px;
}
.nav-bar {
  padding-bottom: 50px;
}
.mine {
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.action-btn {
  &:nth-child(1):after {
    content: '';
    height: 20px;
    top: 15px;
    position: absolute;
    right: 0;
    border-right: 1px solid #000 !important;
  }
}

.no-data {
  width: 200px;
  margin: 0 auto;
  margin-top: 120px;

  img {
    width: 180px;
    height: 130px;
    margin: 0 auto 20px;
    // height: 110px;
  }

  .text-no-data {
    width: 100%;
    margin-bottom: 22px;
    color: #999;
    font-size: 28px;
    text-align: center;
  }
}

:deep(.van-tabs__nav) {
  background: transparent !important;

  &.active {
    color: #0b75ff;
    font-weight: bold;
  }
}

:deep(.van-tab) {
  color: #868d9a;
  font-weight: normal;
}

:deep(.van-tab--active) {
  color: #0b75ff !important;
  font-weight: bold !important;
}
</style>
