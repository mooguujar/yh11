<template>
  <div class="selfSelect">
    <div class="selectList">
      <span
        class="paymate"
        @click="onFilter('payment')"
        :class="{ active: filterType === 'payment' }"
      >
        支付方式
        <van-icon name="arrow-up" />
      </span>
      <span
        class="pays"
        @click="onFilter('sell')"
        :class="{ active: filterType === 'sell' }"
      >
        售卖方式
        <van-icon name="arrow-up" />
      </span>
      <span
        class="amount"
        @click="onFilter('amount')"
        :class="{ active: filterType === 'amount' }"
      >
        金额
        <van-icon name="arrow-up" />
      </span>
      <span
        class="select"
        @click="onFilter('')"
      >
        筛选
        <van-icon name="filter-o" />
      </span>
    </div>

    <div class="O_wrap">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
      >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-skeleton
            title
            avatar
            :row="3"
            :loading="false"
            v-for="(item, i) in list"
          >
            <div class="buyList">
              <van-row justify="space-between">
                <van-col span="8">
                  <van-image
                    lazy-load
                    class="avatar"
                    :src="imgserver_url + item.headimg"
                  />
                  <span class="userName van-ellipsis">{{ item.nickname }}</span>
                  <p class="usert">交易成功率{{ item.statistics?.completion_rate || '0.00' }}%</p>
                  <p class="usert">平均回应时长{{ item.statistics?.response_time || '0' }}分钟</p>
                </van-col>
                <van-col span="6.8">
                  <p
                    class="contentText"
                    :class="item.is_split == 1 ? '' : 'colorred'"
                  >
                    {{ item.is_split == 1 ? '可拆分' : '不可拆分' }}
                    <span
                      class="mixinNum"
                      v-if="item.is_split == 1"
                    >
                      最低购买{{ item.split_min == 0 ? 10 : item.split_min }}
                    </span>
                  </p>
                  <van-row
                    justify="center"
                    gutter="8"
                  >
                    <van-col
                      v-if="item.coin_protocol.includes('BANK')"
                      class="payBox"
                    >
                      <van-image
                        class="credit"
                        lazy-load
                        :src="requireImg('common/credit.png')"
                      />
                    </van-col>
                    <van-col
                      v-if="item.coin_protocol.includes('WXPAY')"
                      class="payBox"
                    >
                      <van-image
                        class="WeChatPay"
                        lazy-load
                        :src="requireImg('common/WeChatPay.png')"
                      />
                    </van-col>
                    <van-col
                      v-if="item.coin_protocol.includes('ALIPAY')"
                      class="payBox"
                    >
                      <van-image
                        class="alipay"
                        lazy-load
                        :src="requireImg('common/alipay.png')"
                      />
                    </van-col>
                  </van-row>
                </van-col>
                <van-col span="7">
                  <p class="amountMoney">
                    {{ (+item.remaining_num).toTruncFixed(2) }}
                    <span>GDB</span>
                  </p>
                  <van-button
                    type="primary"
                    class="buyButton"
                    @click="router.push('/selfbuyCoin?data=' + JSON.stringify(item))"
                  >
                    购买
                  </van-button>
                </van-col>
              </van-row>
            </div>
          </van-skeleton>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-action-sheet
      v-model:show="show"
      title="自选买币"
      @closed="filterType = ''"
    >
      <div class="filterContent">
        <template v-if="filterType === 'payment' || filterType === ''">
          <div class="Ftitle">付款方式</div>
          <van-row
            justify="space-between"
            class="paymate"
          >
            <van-col
              span="5.5"
              :class="oderParm.coin_protocol == '' ? 'paymateAction' : ''"
              @click="oderParm.coin_protocol = ''"
            >
              <p class="payAll">全部</p>
            </van-col>
            <van-col
              span="5.5"
              :class="oderParm.coin_protocol.includes('BANK') ? 'paymateAction' : ''"
              @click="oderParm.coin_protocol = 'BANK'"
            >
              <van-image
                class="credit"
                lazy-load
                :src="requireImg('common/credit.png')"
              />
              <p>银行卡</p>
            </van-col>
            <van-col
              span="5.5"
              :class="oderParm.coin_protocol.includes('ALIPAY') ? 'paymateAction' : ''"
              @click="oderParm.coin_protocol = 'ALIPAY'"
            >
              <van-image
                class="credit alipay"
                lazy-load
                :src="requireImg('common/alipay.png')"
              />
              <p>支付宝</p>
            </van-col>
            <van-col
              span="5.5"
              :class="oderParm.coin_protocol.includes('WXPAY') ? 'paymateAction' : ''"
              @click="oderParm.coin_protocol = 'WXPAY'"
            >
              <van-image
                class="credit WeChatPay"
                lazy-load
                :src="requireImg('common/WeChatPay.png')"
              />
              <p>微信</p>
            </van-col>
          </van-row>
        </template>
        <template v-if="filterType === 'sell' || filterType === ''">
          <div class="Ftitle">售卖方式</div>
          <van-row class="pays">
            <van-col
              span="5"
              :class="oderParm.is_split == 0 ? 'paysAction' : ''"
              @click="oderParm.is_split = 0"
            >
              全部
            </van-col>
            <van-col
              span="5"
              :class="oderParm.is_split == 1 ? 'paysAction' : ''"
              @click="oderParm.is_split = 1"
            >
              拆分
            </van-col>
            <van-col
              span="5"
              :class="oderParm.is_split == 2 ? 'paysAction' : ''"
              @click="oderParm.is_split = 2"
            >
              不拆分
            </van-col>
          </van-row>
        </template>
        <template v-if="filterType === 'amount' || filterType === ''">
          <div class="Ftitle">金额</div>
          <van-row
            justify="space-between"
            class="amount"
          >
            <van-col
              span="7.5"
              v-for="item in amountFilter"
              :class="oderParm.amount == item.value ? 'amountAction' : ''"
              @click="oderParm.amount = item.value"
            >
              {{ item.name }}
            </van-col>
          </van-row>
        </template>
        <van-row justify="space-between">
          <van-col span="11">
            <van-button
              type="primary"
              class="reset"
              block
              @click="onReset"
            >
              重置
            </van-button>
          </van-col>
          <van-col span="11">
            <van-button
              type="primary"
              class="Confirm"
              block
              @click="onConfirm"
            >
              确认
            </van-button>
          </van-col>
        </van-row>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { SellOrders } from '@/apis/buySellCoin'
import { requireImg } from '@/utils/tools'
import { showToast } from 'vant'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useEntryStore } from '@/store/modules/entry'
import { storeToRefs } from 'pinia'

const filterType = ref('')
const show = ref(false)

const amountFilter = [
  { name: '全部', value: '' },
  { name: '10-100', value: '10-100' },
  { name: '101-1000', value: '101-1000' },
  { name: '1001-5000', value: '1001-5000' },
  { name: '5001-10000', value: '5001-10000' },
  { name: '10001-20000', value: '10001-20000' }
]

const onFilter = (type: string) => {
  filterType.value = type
  show.value = true
}

const EntryStore = useEntryStore()
const { config } = storeToRefs(EntryStore)
const imgserver_url = computed(() => {
  // console.log('(imgserver_url',(config.value.Web_Set_DefaultInfo?.imgserver_url as any)?.v);
  return (config.value.Web_Set_DefaultInfo?.imgserver_url as any).v || ''
})

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const list = ref<any>([])
var oderParm = ref({
  page: 1, //	否	int	当前页码 默认1
  pagesize: 10, //	否	int	每页数据量 默认20
  coin_protocol: '', //否	string	支付方式 BANK ALIPAY WXPAY USDT 支持多选,请用逗点隔开
  is_split: 0, //否	int	售卖方式 1可拆分 2不可拆分
  amount: '' //金额 ex:指定金额100, 范围查询100-1000
})
const onLoad = () => {
  // console.log('加载', refreshing.value);
  if (refreshing.value) {
    oderParm.value.page = 1
    list.value = []
    refreshing.value = false
  }
  // console.log('oderParm', oderParm.value);
  SellOrders(oderParm.value).then(data => {
    let count = data.count
    if (!!!count && count !== 0) return showToast('数据异常!!')
    list.value.push(...data.list)
    // list.value = data.list;
    // console.log('list.value', list.value);
    loading.value = false
    oderParm.value.page++
    if (list.value.length >= count) {
      finished.value = true
    }
  })
}
const onRefresh = () => {
  // 清空列表数据
  finished.value = false
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  // showToast('刷新成功');
  onLoad()
}
const onReset = () => {
  oderParm.value.amount = ''
  oderParm.value.coin_protocol = ''
  oderParm.value.is_split = 0
}
const onConfirm = () => {
  refreshing.value = true
  onRefresh()
  show.value = false
}
let self_t = ref()
onMounted(() => {
  // self_t.value = setInterval(() => {
  //   refreshing.value = true;
  //   onRefresh();
  // }, 20 * 1000)
})
onUnmounted(() => {
  clearInterval(self_t.value)
  self_t.value = null
})
</script>
<style lang="sass" src="./SelfSelect.scss" scoped></style>
