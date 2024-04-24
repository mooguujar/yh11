<template>
  <div class="selfSelect">
    <div
      class="selectList"
      v-if="gd_buy_fixmomey != 1"
    >
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
    <div
      class="tips_rechage text-[23px] text-center bg-[#ffe2e5]"
      :class="oldOnlineCharge ? '!mt-[-10px] p-[18px]' : '!mt-[20px] p-[13px]'"
      v-if="(onlineCharge && num && (list.length == 0 || fixedAmount)) || amountScope"
    >
      <p
        class="amount_t"
        v-if="!amountScope"
      >
        金额被抢了，为您推荐以下充值金额！
      </p>
      <p
        class="copy_t"
        v-if="gd_buy_fixmomey == 1"
      >
        请点击【复制】按钮，返回游戏平台重新输入金额充值
        <van-icon
          class="leading-[28px]"
          name="question-o"
          @click="show1 = true"
        />
      </p>
    </div>
    <div v-if="gd_buy_fixmomey == 1">
      <div
        class="amount_container !mt-[20px] text-[23px] text-center"
        v-if="onlineCharge && (list.length == 0 || fixedAmount || amountScope)"
      >
        <!-- <div class="list_content"></div> -->
        <van-row justify="space-between">
          <van-col
            span="7.5"
            class="py-[12px] px-[12px]"
            v-for="(item, index) in amountFilter1"
            :key="item.value"
            :class="currentselectAmountS == item.value ? 'amountAction' : ''"
            @click="selectAmountS(item)"
          >
            {{ item.name }}
          </van-col>
        </van-row>
      </div>
      <div
        v-if="onlineCharge"
        class="title_onlineC flex_sz !mt-[20px] py-[16px] bg-[#96d9f4] text-[23px]"
      >
        <span class="!ml-[-30px]">推荐金额</span>
        <span class="display w-[214px] pl-[30px]">收款方式</span>
        <span>操作</span>
      </div>
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
          <template
            v-for="(item, i) in list"
            :key="i"
          >
            <van-skeleton
              title
              avatar
              :row="3"
              :loading="false"
              v-if="
                gd_buy_fixmomey != 1 ||
                oderParm.amount.includes('-') ||
                (gd_buy_fixmomey == 1 && (item.is_split == 1 || item.remaining_num == num))
              "
            >
              <div
                class="buyList"
                :class="
                  onlineCharge
                    ? gd_buy_fixmomey == 1
                      ? '!h-[110px] !py-[5px]'
                      : '!h-[150px] !py-[5px]'
                    : ''
                "
              >
                <van-row
                  justify="space-between"
                  class="content-container"
                >
                  <van-col
                    span="8"
                    class="flex_s justify-between"
                    v-if="onlineCharge"
                  >
                    <div>
                      <p class="amountMoney flex items-center !h-[57px] text-[54px]">
                        <span>
                          {{
                            gd_buy_fixmomey == 1
                              ? fixedAmount || amountScope
                                ? (+item.remaining_num).toTruncFixed(2)
                                : num
                              : (+item.remaining_num).toTruncFixed(2)
                          }}
                        </span>
                        <span class="unit">{{ onlineCharge ? 'CNY' : coin_name }}</span>
                      </p>
                      <p
                        v-if="gd_buy_fixmomey != 1"
                        class="contentText flex items-center !h-[25px]"
                        :class="item.is_split == 1 ? '' : 'colorred'"
                      >
                        <span>{{ item.is_split == 1 ? '可拆分' : '不可拆分' }}</span>
                        <span
                          class="mixinNum"
                          v-if="item.is_split == 1"
                        >
                          最低购买{{ item.split_min == 0 ? 10 : item.split_min }}
                        </span>
                      </p>
                    </div>
                  </van-col>
                  <van-col
                    v-if="!onlineCharge"
                    span="8"
                    class="col-left flex_s"
                  >
                    <div>
                      <div class="user-info-container flex items-center">
                        <van-image
                          lazy-load1
                          class="avatar"
                          :src="imgserver_url + item.headimg"
                        />
                        <span class="userName flex items-center">{{ item.nickname }}</span>
                      </div>
                      <p
                        class="usert"
                        :class="onlineCharge ? '!text-[#000]' : ''"
                      >
                        交易成功率{{ item.statistics?.completion_rate || '0.00' }}%
                      </p>
                      <p
                        class="usert"
                        :class="onlineCharge ? '!text-[#000]' : ''"
                      >
                        平均回应时长{{ item.statistics?.response_time || '0' }}分钟
                      </p>
                    </div>
                  </van-col>
                  <van-col class="col-middle flex justify-between flex_s">
                    <div>
                      <p
                        v-if="!onlineCharge"
                        class="contentText flex items-center"
                        :class="item.is_split == 1 ? '' : 'colorred'"
                      >
                        <span>{{ item.is_split == 1 ? '可拆分' : '不可拆分' }}</span>
                      </p>
                      <p
                        class="contentText flex items-center !h-[30px]"
                        v-if="gd_buy_fixmomey != 1"
                      >
                        <span
                          class="mixinNum text-[#a6a6a6]"
                          v-if="item.is_split == 1"
                        >
                          最低购买{{ item.split_min == 0 ? 10 : item.split_min }}
                        </span>
                      </p>
                      <van-row
                        justify="start"
                        gutter="8"
                        class="pay-way-container"
                      >
                        <van-col
                          v-if="item.coin_protocol.includes('BANK')"
                          class="payBox"
                        >
                          <van-image
                            class="credit"
                            lazy-load1
                            :src="requireImg('common/credit.png')"
                          />
                        </van-col>
                        <van-col
                          v-if="item.coin_protocol.includes('WXPAY')"
                          class="payBox"
                        >
                          <van-image
                            class="WeChatPay"
                            lazy-load1
                            :src="requireImg('common/WeChatPay.png')"
                          />
                        </van-col>
                        <van-col
                          v-if="item.coin_protocol.includes('ALIPAY')"
                          class="payBox"
                        >
                          <van-image
                            class="alipay"
                            lazy-load1
                            :src="requireImg('common/ALIPAY.png')"
                          />
                        </van-col>
                        <van-col
                          v-if="item.coin_protocol.includes('SZRMB')"
                          class="payBox"
                        >
                          <van-image
                            class="SZRMB"
                            lazy-load1
                            :src="requireImg('common/SZRMB.png')"
                          />
                        </van-col>
                      </van-row>
                    </div>
                  </van-col>
                  <van-col class="col-right flex justify-between flex_s">
                    <div class="">
                      <p
                        class="amountMoney flex items-center justify-end"
                        v-if="!onlineCharge"
                      >
                        <span>{{ (+item.remaining_num).toTruncFixed(2) }}</span>
                        <span class="unit">{{ onlineCharge ? 'CNY' : coin_name }}</span>
                      </p>
                      <van-button
                        type="primary"
                        class="buyButton"
                        @click="
                          onlineCharge
                            ? gd_buy_fixmomey == 1 && (fixedAmount || amountScope)
                              ? showDIYDialog(+item.remaining_num + '')
                              : mitt.emit('onlineCharge_show', item)
                            : router.push(
                                '/selfbuy_coin?money=' +
                                  num +
                                  '&gd_buy_fixmomey=' +
                                  gd_buy_fixmomey +
                                  '&data=' +
                                  JSON.stringify(item)
                              )
                        "
                      >
                        {{
                          onlineCharge
                            ? gd_buy_fixmomey == 1 && (fixedAmount || amountScope)
                              ? '复制'
                              : '下单'
                            : '购买'
                        }}
                      </van-button>
                    </div>
                  </van-col>
                </van-row>
              </div>
            </van-skeleton>
          </template>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-action-sheet
      v-model:show="show1"
      title="参考示意图："
      class="!w-[750px] full-w-sheet text-left online_tips"
      @closed="() => {}"
      :lazy-render="false"
    >
      <div class="px-[30px] pb-[30px] w-[100%]">
        <van-image
          class="w-[100%]"
          :src="requireImg('common/online_tips.jpeg')"
        />
      </div>
    </van-action-sheet>

    <van-action-sheet
      v-model:show="show"
      title="自选买币"
      class="!w-[750px] full-w-sheet"
      @closed="filterType = ''"
      :lazy-render="false"
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
                lazy-load1
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
                lazy-load1
                :src="requireImg('common/ALIPAY.png')"
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
                lazy-load1
                :src="requireImg('common/WeChatPay.png')"
              />
              <p>微信</p>
            </van-col>
            <van-col
              span="5.5"
              :class="oderParm.coin_protocol.includes('SZRMB') ? 'paymateAction' : ''"
              @click="oderParm.coin_protocol = 'SZRMB'"
            >
              <van-image
                class="credit alipay SZRMB"
                lazy-load1
                :src="requireImg('common/SZRMB.png')"
              />
              <p class="!text-[12px]">数字人民币</p>
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
              v-for="(item, index) in amountFilter"
              :key="item.name"
              :class="
                oderParm.amount == item.value || (isAllMoney && index === 0) ? 'amountAction' : ''
              "
              @click="
                ;(oderParm.amount = item.value), (searchAmount = ''), changeFullpath(item.value)
              "
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
              @click=";(IsFullpath = true), onConfirm()"
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
const coin_name = sessionStorage.getItem('coin_name')
import { SellOrders } from '@/apis/buySellCoin'
import verified from '@/assets/images/common/verified.png'
import { useAppBar } from '@/components/AppBar/useAppBar'
import Dialog from '@/components/CommonPopup/Dialog/index'
import router from '@/router'
import { useEntryStore } from '@/store/modules/entry'
import { IQBuyConfig } from '@/store/types/entry'
import mitt from '@/utils/mitt'
import { mergeHrefParams, requireImg } from '@/utils/tools'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import clipboard3 from 'vue-clipboard3'
import { useRoute } from 'vue-router'
const filterType = ref('')
const fixedAmount = ref() //固额模式下 如果想要的金额没有的时候 去开启推荐金额的模式
const show = ref(false)
const show1 = ref(false)

const amountFilter = [
  { name: '全部', value: '' },
  { name: '10-100', value: '10-100' },
  { name: '101-1000', value: '101-1000' },
  { name: '1001-5000', value: '1001-5000' },
  { name: '5001-10000', value: '5001-10000' },
  { name: '10001-20000', value: '10001-20000' }
]
const amountFilter1 = [
  { name: '100-500元', value: '100-500' },
  { name: '500-2000元', value: '500-2000' },
  { name: '2000-5000元', value: '2000-5000' },
  { name: '5000以上', value: '5000-100000' }
]
// 複製
const { toClipboard } = clipboard3()
const msgtext = `
</br>
</br>
复制成功！是否返回重新输入金额充值？ </br>
</br>
</br>
`
const showDIYDialog = async (remaining_num: string) => {
  // console.log('remaining_num', remaining_num)
  try {
    await toClipboard(remaining_num)
    // showToast('复制成功');
    Dialog.confirm({
      title: '温馨提示',
      message: msgtext,
      allowHtml: true,
      messageAlign: 'center',
      className: 'selldialog',
      confirmButtonText: '返回充值',
      cancelButtonText: '取消',
      action: () => {
        window.DIYclose()
      }
    })
  } catch (error) {
    showToast('复制失败!!')
    showToast({
      message: '复制失败!!',
      icon: verified
    })
  }
}

const onFilter = (type: string) => {
  filterType.value = type
  show.value = true
}

useAppBar({ mode: 'dark' })
const EntryStore = useEntryStore()
const { config, QBuy_Config } = storeToRefs(EntryStore)
const imgserver_url = computed(() => {
  // console.log('(imgserver_url',(config.value.Web_Set_DefaultInfo?.imgserver_url as any)?.v);
  return (config.value.Web_Set_DefaultInfo?.imgserver_url as any)?.v || ''
})
const num = ref()
const route = useRoute()
const { query, path, fullPath } = route

const search = new URLSearchParams(mergeHrefParams())
const hs = search.get('hs') || ''
const wideMode = hs === 'h'
const targetRoute = wideMode ? 'wideOrderCreate' : 'orderCreate'

const gd_buy_fixmomey = ref(search.get('gd_buy_fixmomey') || 0)
const amountScope = ref() //直接查看 金额范围的数据
num.value = search.get('money') || ''

amountScope.value = search.get('amountScope') || ''

const oderParm = ref({
  page: 1, //	否	int	当前页码 默认1
  money: num.value || '',
  pagesize: 10, //	否	int	每页数据量 默认20
  coin_protocol: '', //否	string	支付方式 BANK ALIPAY WXPAY USDT 支持多选,请用逗点隔开
  is_split: 0, //否	int	售卖方式 1可拆分 2不可拆分
  amount: amountScope.value ? amountScope.value : sessionStorage.getItem('oderParm_amount') || '' //金额 ex:指定金额100, 范围查询100-1000
})

const currentselectAmountS = ref('')
const selectAmountS = (item: { value: string }) => {
  currentselectAmountS.value = item.value
  oderParm.value.amount = item.value
  // console.log('oderParm.amount', oderParm.value.amount, item.value)
  // searchAmount.value = ''
  onConfirm()
}

const onlineCharge = ref(false)
onlineCharge.value = path.includes('onlineCharge') ? true : false
onMounted(() => {
  onRefresh()
  mitt.emit('action-sheet-show')
})
// 配置是否开启买币推荐
const isOpenRecommendConfig = computed(
  () => (config.value.Web_BuySell_Coin_Times?.QBuy_Config as IQBuyConfig)?.v == '1'
)
// 买币推荐范围配置列表
const recommendRangeList = computed(() => {
  return QBuy_Config.value ?? []
})
// 无匹配金额时，默认选中全部金额
const isAllMoney = computed(
  () =>
    !amountFilter.some(item => item.value == oderParm.value.amount) ||
    !amountScope.value ||
    !gd_buy_fixmomey.value ||
    !amountFilter1.some(item => item.value == oderParm.value.amount)
)

// 搜索推荐金额范围
const searchAmount = ref('')
const setSearchAmount = () => {
  let amountFrom, amountTo

  for (const target of recommendRangeList.value) {
    const { q, v } = target
    const [from, to] = q.split('-')
    const vRate = parseFloat(v)

    if (num.value && +from <= +num.value && +num.value <= +to) {
      amountFrom = +num.value * (1 - vRate / 100)
      amountTo = +num.value * (1 + vRate / 100)
      break
    }
  }

  if (!!!amountFrom && !!!amountTo) {
    searchAmount.value = num.value
  } else {
    sessionStorage.setItem('oderParm_amount', '')
    searchAmount.value = `${amountFrom}-${amountTo}`
  }
  // console.log(
  //   'num.value1111111',
  //   num.value,
  //   amountFrom,
  //   amountTo,
  //   searchAmount.value,
  //   recommendRangeList.value
  // )
}
setSearchAmount()
watch(
  () => QBuy_Config.value,
  (newv, old) => {
    setSearchAmount()
    setTimeout(() => {
      list.value = []
      num.value && onConfirm()
    }, 300)
  },
  { deep: true }
)

// 监听是否可变更为全部金额（若无匹配结果）
watch(isAllMoney, (newValue, oldValue) => {
  if (newValue) {
    oderParm.value.amount = ''
    searchAmount.value = ''
    // changeFullpath('')
  }
})

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

// 传入的金额,若没有挂单，且所有金额区间都没有挂单，设置状态标识拦截
const allowAllMoney = ref(true)

const active = ref(0)
active.value = query.active ? +query.active : 0

const oldOnlineCharge = ref(
  onlineCharge.value && gd_buy_fixmomey.value != 1 && num.value ? true : false
)

let goSelfbuy_coin = false
const list = ref<any>([])
const onLoad = () => {
  if (refreshing.value) {
    oderParm.value.page = 1
    list.value = []
    // console.log('新加载', refreshing.value, list.value.length)
    refreshing.value = false
  }

  oderParm.value.amount = oderParm.value.amount
    ? oderParm.value.amount
    : isOpenRecommendConfig.value
    ? searchAmount.value || ''
    : ''
  SellOrders(oderParm.value).then(data => {
    let count = oldOnlineCharge.value ? data.count : data.gd_buyfix_count || data.count
    // if (!!!count && count !== 0) return showToast('数据异常!!')
    if (!count && !data.count) {
      loading.value = false
      finished.value = true

      if (search.get('money') && allowAllMoney.value) {
        if (gd_buy_fixmomey.value != 1) {
          searchAmount.value = ''
          oderParm.value.amount = ''
        }
        onConfirm()
        allowAllMoney.value = false
      }

      return
    }
    let currentData = []
    if (data.gd_buyfix_count) {
      currentData = data.gd_buyfix_list
    } else {
      // if (gd_buy_fixmomey.value == 1)
      fixedAmount.value = 1
      currentData = data.list
    }
    // console.log('currentData', currentData)
    if (oldOnlineCharge.value) {
      list.value.push(...data.list) //gd_buyfix_list
      if (oderParm.value.page == 1) {
        list.value.unshift(...data.gd_buyfix_list)
      }
    } else {
      list.value.push(...currentData) //gd_buyfix_list
    }
    // list.value = data.list;
    // console.log('list.value', data.list, list.value)
    if (gd_buy_fixmomey.value == 1) {
      if (data.gd_buyfix_count == 1) {
        if (!goSelfbuy_coin && !order_id && active.value != 2)
          router.push(
            '/selfbuy_coin?onlineCharge=1&money=' +
              num.value +
              '&gd_buy_fixmomey=' +
              gd_buy_fixmomey.value +
              '&data=' +
              JSON.stringify(list.value[0])
          )
        goSelfbuy_coin = true
        sessionStorage.setItem('gd_buyfix_count1age', '1')
      } else {
        sessionStorage.setItem('gd_buyfix_count1age', '')
      }
    }
    loading.value = false
    oderParm.value.page++
    if (list.value.length >= count + (oldOnlineCharge.value ? data.gd_buyfix_count : 0)) {
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
  // console.log('刷新成功')
  // showToast('刷新成功')
  onLoad()
}
const onReset = () => {
  oderParm.value.amount = ''
  oderParm.value.coin_protocol = ''
  oderParm.value.is_split = 0
}
function getStorageWithExpiration(key: string) {
  const itemStr = localStorage.getItem(key)

  // 检查是否存在对应的值
  if (!itemStr) {
    return null
  }
  let item = { expiry: 1, value: '' }
  try {
    item = JSON.parse(itemStr)
  } catch {
    item = { expiry: 1, value: '' }
  }
  const now = new Date()
  // 检查是否过期
  if (now.getTime() > item.expiry) {
    sessionStorage.removeItem(key)
    return null
  }
  return item.value
}
const merchantorderid = search.get('merchantorderid') || ''
const order_id = getStorageWithExpiration('order_id')

if (gd_buy_fixmomey.value == 1) {
  // console.log('order_id', order_id)
  sessionStorage.setItem('gd_buy_fixmomey', '1')
  if (order_id && merchantorderid == localStorage.getItem('merchantorderid')) {
    setTimeout(() => {
      router.push(`/${targetRoute}?order_id=` + order_id)
    }, 100)
  }
}
const WfullPath = ref(window.location.search.replace('money', 'mone2y'))
let IsFullpath = ref(false)
const changeFullpath = (e: string) => {
  IsFullpath.value = true
  sessionStorage.setItem('oderParm_amount', e) //上次点击选择的金额范围
}
const onConfirm = () => {
  refreshing.value = true
  loading.value = true
  // console.log('onConfirm 重新加载', oderParm.value.amount, '<-')
  if (IsFullpath.value) {
    window.location.search = WfullPath.value
  }
  // window.location.search = WfullPath.value
  onLoad()
  show.value = false
}
let self_t = ref()
onUnmounted(() => {
  clearInterval(self_t.value)
  self_t.value = null
})
</script>
<style lang="sass" src="./SelfSelect.scss" scoped></style>
