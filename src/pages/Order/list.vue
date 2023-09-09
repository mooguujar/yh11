<template>
  <div class="mine w-100 bg-[#f6fbff] van-safe-area-top max-w-[750px]">
    <div
      class="mine-top bg-[#0b75ff] w-full pt-[37px] pb-[45px] px-[29px] fixed top-0 max-w-[750px]"
    >
      <div class="mine-top-bar flex items-center justify-between relative">
        <div
          class="arrow-right rotate-180 scale-125"
          @click="router.back"
        ></div>
        <div class="my text-[42px] text-white text-center mx-auto">挂单详情</div>
      </div>
    </div>
    <div
      class="order-content pt-[22px] bg-[#fff] rounded-md fixed top-[120px] w-full max-w-[750px]"
    >
      <div class="w-full relative bg-[#f6fbff]">
        <div class="bg-white px-[33px] pb-[20px]">
          <div class="flex items-center justify-start mb-[15px]">
            <div class="text-[#787f8c] text-[25px] mr-[20px]">挂单编号</div>
            <div class="text-[#000] text-[25px]">{{ sumData.order_id }}</div>
          </div>
          <div class="flex items-center justify-start mb-[15px]">
            <div class="text-[#787f8c] text-[25px] mr-[20px]">挂单金额</div>
            <div class="font-bold text-[#000] text-[30px]">
              {{ financial(sumData.sell_num) }}GDB
            </div>
          </div>
          <div class="flex items-center justify-start mb-[15px]">
            <div class="text-[#787f8c] text-[25px] mr-[20px]">剩余金额</div>
            <div class="font-bold text-[#000] text-[30px]">
              {{ financial(sumData.remaining_num) }}GDB
            </div>
          </div>
          <div class="flex items-center justify-start mb-[15px]">
            <div class="text-[#787f8c] text-[25px] mr-[20px]">已获奖励</div>
            <div class="font-bold text-[#000] text-[30px]">
              {{ financial(sumData.get_sell_gift) }}GDB
            </div>
          </div>
        </div>
        <div
          class="pt-[20px] w-full h-[calc(100vh-300px)] pb-[100px] overflow-scroll fixed top-[365px]"
          v-if="list.length > 0"
        >
          <van-list>
            <div
              class="buy-item h-[307px] mb-[20px] mx-[33px] pt-[20px] border-0 border-solid border-b border-[#d8dce8]"
              v-for="item in list"
              :key="item"
            >
              <div class="flex items-center justify-between mb-[15px]">
                <div class="text-[#13161b] text-[25px]">{{ item.addtime }}</div>
                <div :class="`font-bold ${renderBuyStatusText(item.status).color} text-[28px]`">
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
                    @click="copy(item.order_id)"
                  ></div>
                </div>
              </div>
              <div class="flex items-center justify-between mb-[10px]">
                <div class="text-[#787f8c] text-[20px]">额外奖励</div>
                <div class="text-[#13161b] text-[25px] flex items-center">
                  {{ financial(item.sell_gift) }}GDB
                </div>
              </div>
              <div class="flex items-center justify-between mb-[15px]">
                <div class="text-[#13161b] text-[25px] flex items-center">
                  <img
                    class="w-[57px] h-[57px] block mr-[10px] rounded-sm"
                    :src="imgServerUrl + item.headimg"
                    alt=""
                  />
                  <span class="text-[28px]">{{ item.nickname }}</span>
                </div>
                <div
                  class="btn bg-[#0b75ff] text-white text-[28px] w-[181px] h-[63px] flex items-center justify-center rounded-[7px]"
                  @click="
                    router.push(
                      `/orderCreate?order_id=${item.order_id}&sellsumData=${JSON.stringify(
                        sumData
                      )}`
                    )
                  "
                >
                  订单详情
                </div>
              </div>
            </div>
          </van-list>
          <div
            class="no-data flex flex-col items-center"
            v-if="sumData?.status === 1"
          >
            <van-button
              size="large"
              color="#0b75ff"
              @click="cancelOrder"
            >
              取消挂单
            </van-button>
          </div>
        </div>
        <div
          class="no-data flex flex-col items-center"
          v-if="list.length == 0"
        >
          <img :src="noData" />
          <div class="text-no-data">暂无数据</div>
          <van-button
            size="large"
            color="#0b75ff"
            @click="cancelOrder"
            v-if="sumData?.status === 1"
          >
            取消挂单
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useAuthStore, useEntryStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { useAppBar } from '@/components/AppBar/useAppBar'

useAppBar({ mode: 'dark', top: 35 })
import noData from '@/assets/images/common/noData.png'
import { showToast } from 'vant'
import { useClipboard } from '@vueuse/core'
import verified from '@/assets/images/common/verified.png'
import success from '@/assets/images/common/success.png'
import { SellOrderDetail, BuyOrderDetail, SellCancel } from '@/apis/buySellCoin'
import clipboard3 from 'vue-clipboard3'

const entryStore = useEntryStore()
const imgServerUrl = entryStore.imgServerUrl
const authStore = useAuthStore()
const router = useRouter()

const route = useRoute()
const { query } = route

const financial = (x: string) => {
  return x ? Number.parseFloat(x).toTruncFixed(2) : '0.00'
}

const { toClipboard } = clipboard3()
const copy = async (text: any) => {
  try {
    await toClipboard(text)
    // showToast('复制成功');
    showToast({
      message: '复制成功',
      icon: verified,
      iconSize: '48px'
    })
  } catch (error) {
    // showToast('复制失败!!');
    showToast({
      message: '复制失败!!',
      icon: verified
    })
  }
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
    { text: '强制失败', color: 'text-[#58cf00]' },
    { text: '强制成功', color: 'text-[#58cf00]' }
  ]
  return buyStatusList[status - 1]
}

const status_index = ref(0)

const list = ref<any[]>([])

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

const sumData = ref<any>({})
const maping_buy_info = ref({})
const getSellOrderDetail = async () => {
  try {
    const res = await SellOrderDetail({ order_id: query.order_id as string })
    if (!res.order_id) return console.log('Selldata数据异常')
    sumData.value = res
    maping_buy_info.value = res.maping_buy_info
    list.value = res.buy_orders
    console.log(list.value, 'list.value')
  } catch (e) {
    console.log(e)
  }
}

const cancelOrder = async () => {
  const res = await SellCancel({ sell_order_id: query.order_id as string })
  if (!res?.code) {
    showToast({
      message: `挂单已取消`,
      icon: success
    })
  }
  await getSellOrderDetail()
  setTimeout(() => {
    router.back()
  }, 1000)
}

onMounted(() => {
  getUserInfo()
  getSellOrderDetail()
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';
@import '@/assets/styles/sprite-mine.scss';

.mine {
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.action-btn {
  &:nth-child(1):after {
    content: '';
    height: 40px;
    top: 5px;
    position: absolute;
    right: 0;
    border-right: 1px solid #d6dce8 !important;
  }
}

.no-data {
  width: 300px;
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
