<template>
  <div
    class="coinBuy wideModeQuickCoins !mt-[0]"
    :class="{ 'coin-buy-recommend': showRecommendOrders }"
    ref="coinBuy"
  >
    <div className="container !px-[10px] !mt-[15px] !max-w-[100%]">
      <div class="clearfix">
        <div class="!w-[65%] center pt-[20px]">
          <!-- <p className="buytext">买币金额</p> -->
          <van-cell-group
            inset
            class="buy_input_f_group"
          >
            <van-field
              v-model="num"
              label="买币金额 ："
              class="buy_input_f"
              type="digit"
              :readonly="true"
              :disabled="false"
              :class="sellData.is_split == 2 ? 'is_split_2' : ''"
              :placeholder="
                sellData.split_min || sellData.split_min === 0
                  ? '限额最低' +
                    (sellData.split_min == 0 ? 10.0 : (+sellData.split_min).toTruncFixed(2))
                  : '限额最低10.00'
              "
            >
              <!-- '~' +
                    (+sellData.remaining_num).toTruncFixed(2) -->
              <template #button>
                <!-- <span
                  v-if="sellData.is_split == 1 && sellData.remaining_num"
                  @click="num = sellData.remaining_num"
                >
                  全部
                </span> -->
              </template>
            </van-field>
          </van-cell-group>
          <!-- <div
            class="split-min"
            v-if="sellData?.is_split === 1"
          >
            推荐购买
            <span class="red_f">
              {{
                sellData.rec_buy_amount_interval[0] == sellData.rec_buy_amount_interval[1]
                  ? sellData.rec_buy_amount_interval[0]
                  : sellData.rec_buy_amount_interval[0] + '~' + sellData.rec_buy_amount_interval[1]
              }}
            </span>
            {{
              sellData.rec_buy_amount_interval[0] == sellData.rec_buy_amount_interval[1] ? '' : '或'
            }}
            <span
              v-if="!(sellData.rec_buy_amount_interval[0] == sellData.rec_buy_amount_interval[1])"
              class="red_f"
            >
              全部
            </span>
          </div> -->
        </div>
        <div class="!w-[65%] center">
          <div className="paypic">
            <div className=" buytext left mr-[23px] !leading-[50px]">付款方式 :</div>
            <van-row>
              <template v-for="(item, i) in paylist">
                <van-col
                  span="7.5"
                  class="payBox"
                  :key="item"
                  v-if="item != 'USDT_TRC20'"
                  :class="
                    coin_protocol == item
                      ? i == 3
                        ? 'active !m-[0]'
                        : 'active'
                      : i == 3
                      ? '!m-[0]'
                      : ''
                  "
                  @click="
                    onlineCharge ? ((coin_protocol = item), updateCardList()) : payBoxTap(item)
                  "
                >
                  <div>
                    <van-image
                      :class="
                        item == 'BANK'
                          ? 'credit'
                          : item == 'ALIPAY'
                          ? 'alipay'
                          : item == 'WXPAY'
                          ? 'WeChatPay'
                          : item == 'SZRMB'
                          ? 'alipay SZRMB'
                          : '无'
                      "
                      lazy-loadss
                      :src="
                        requireImg(
                          'common/' +
                            (item == 'BANK'
                              ? 'credit'
                              : item == 'ALIPAY'
                              ? 'ALIPAY'
                              : item == 'WXPAY'
                              ? 'WeChatPay'
                              : item == 'SZRMB'
                              ? 'SZRMB'
                              : '无') +
                            '.png'
                        )
                      "
                    />
                    {{
                      item == 'BANK'
                        ? '银行卡'
                        : item == 'ALIPAY'
                        ? '支付宝'
                        : item == 'WXPAY'
                        ? '微信'
                        : item == 'SZRMB'
                        ? '数字人民币'
                        : '无'
                    }}
                  </div>

                  <template v-if="isUnBind(item) && !onlineCharge">
                    <div class="unbind-mask"></div>
                    <div class="unbind-text">未绑定</div>
                  </template>
                </van-col>
              </template>
              <!-- <van-col span="7.5" class="payBox"
                v-if="sellData.coin_protocol ? sellData.coin_protocol.includes('BANK') : withdrawddresslist.some((e) => { return e.coin_protocol == 'BANK' && e.status === 1 })"
                :class="coin_protocol == 'BANK' ? 'active' : ''" @click="payBoxTap('BANK')">
                <div>
                  <van-image class="credit" lazy-loadss :src="requireImg('common/credit.png')" />
                  银行卡
                </div>
              </van-col> -->
            </van-row>
          </div>
        </div>
      </div>

      <van-button
        ref="buyButton"
        type="primary"
        class="buyButton"
        @click="buyCoins(num, coin_protocol, sellData.order_id)"
      >
        {{ onlineCharge ? '下单购买' : `购买${coin_name}币` }}
      </van-button>
    </div>

    <div
      v-if="showRecommendOrders"
      class="recommend-orders-container"
    >
      <div class="recommend-text">暂无订单匹配，快速买币推荐：</div>

      <van-skeleton
        title
        avatar
        :row="3"
        :loading="false"
        v-for="(item, i) in orderList"
        :key="i"
      >
        <div class="buyList">
          <van-row
            justify="space-between"
            class="content-container"
          >
            <van-col
              span="8"
              class="col-left"
            >
              <div class="user-info-container flex items-center">
                <van-image
                  lazy-loadss
                  class="avatar"
                  :src="imgserver_url + item.headimg"
                />
                <span class="userName flex items-center">{{ item.nickname }}</span>
              </div>
              <p class="usert">交易成功率{{ item.statistics?.completion_rate || '0.00' }}%</p>
              <p class="usert">平均回应时长{{ item.statistics?.response_time || '0' }}分钟</p>
            </van-col>
            <van-col class="col-middle flex flex-col justify-between">
              <p
                class="contentText flex items-center"
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
                    lazy-loadss
                    :src="requireImg('common/credit.png')"
                  />
                </van-col>
                <van-col
                  v-if="item.coin_protocol.includes('WXPAY')"
                  class="payBox"
                >
                  <van-image
                    class="WeChatPay"
                    lazy-loadss
                    :src="requireImg('common/WeChatPay.png')"
                  />
                </van-col>
                <van-col
                  v-if="item.coin_protocol.includes('ALIPAY')"
                  class="payBox"
                >
                  <van-image
                    class="alipay"
                    lazy-loadss
                    :src="requireImg('common/ALIPAY.png')"
                  />
                </van-col>
                <van-col
                  v-if="item.coin_protocol.includes('SZRMB')"
                  class="payBox"
                >
                  <van-image
                    class="SZRMB"
                    lazy-loadss
                    :src="requireImg('common/SZRMB.png')"
                  />
                </van-col>
              </van-row>
            </van-col>
            <van-col class="col-right flex flex-col justify-between">
              <p class="amountMoney flex items-center justify-end">
                <span>{{ (+item.remaining_num).toTruncFixed(2) }}</span>
                <span class="unit">{{ onlineCharge ? 'CNY' : coin_name }}</span>
              </p>
              <van-button
                type="primary"
                class="buyButton"
                @click="
                  router.push(
                    '/selfbuy_coin?money=' +
                      money +
                      '&gd_buy_fixmomey=' +
                      gd_buy_fixmomey +
                      '&data=' +
                      JSON.stringify(item)
                  )
                "
              >
                购买
              </van-button>
            </van-col>
          </van-row>
        </div>
      </van-skeleton>
    </div>

    <van-popup
      v-model:show="unBindPaymentVisible"
      round
    >
      <div class="unbind-payment-popup">
        <div class="unbind-payment-popup__text">
          <template v-if="unBindPaymentPopupProps.status === BIND_STATUS.UNBIND">
            尚未绑定该付款方式
            <br />
            是否去绑定？
          </template>
          <template v-if="unBindPaymentPopupProps.status === BIND_STATUS.PROCESS">
            该付款方式正在审核中
            <br />
          </template>
        </div>
        <div class="unbind-payment-popup__btn">
          <template v-if="unBindPaymentPopupProps.status === BIND_STATUS.UNBIND">
            <van-button
              type="primary"
              block
              @click="onUnBindConfirm(unBindPaymentPopupProps.link)"
            >
              去绑定
            </van-button>
            <van-button
              type="primary"
              color="#777777"
              block
              @click="unBindPaymentVisible = false"
            >
              取消
            </van-button>
          </template>
          <template v-if="unBindPaymentPopupProps.status === BIND_STATUS.PROCESS">
            <van-button
              type="primary"
              color="#777777"
              block
              @click="unBindPaymentVisible = false"
            >
              关闭
            </van-button>
          </template>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
const coin_name = sessionStorage.getItem('coin_name')
import { Buy, BuyCancel, BuyQuickly, SellOrders as recommendOrders } from '@/apis/buySellCoin'
import error from '@/assets/images/common/error.png'
import info from '@/assets/images/common/info.png'
import Dialog from '@/components/CommonPopup/Dialog'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'
import { useEntryStore } from '@/store/modules/entry'
import { withdrawddresslist as IWithdrawddressList } from '@/store/types/buySellCoin'
import { IQBuyConfig } from '@/store/types/entry'
import { mergeHrefParams, requireImg } from '@/utils/tools'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { CSSProperties, computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PAY_WAY_LIST } from '../tools'

interface Props {
  sellData: any
}

const props = withDefaults(defineProps<Props>(), {
  sellData: {}
})

const EntryStore = useEntryStore()
const { config } = storeToRefs(EntryStore)

const unBindPaymentVisible = ref(false)
const unBindPaymentPopupProps = reactive<{
  status?: number | undefined
  link?: string | any
}>({})

const BIND_STATUS = {
  BIND: 0,
  UNBIND: 1,
  PROCESS: 2
}

const locImgList = ref(['SZRMB', 'ZDYYH', 'ALIPAY', 'WXPAY'])

// 是否显示买币推荐
const showRecommendOrders = ref(false)
// 买币推荐列表
const orderList = ref<any>([])

const itemRef = ref()
const value1 = ref(0)
const downList = ref<IWithdrawddressList[]>([])

const buyButton = ref()

// 下拉列表展开
const onDropdownItemOpen = (sell_order_id: string) => {
  setTimeout(() => {
    const _list = downList.value.filter(
      (item: any) => item.id !== value1.value && item.status === 1
    )
    // 买币按钮初始marginTop
    const buyBtnTop = (getComputedStyle(buyButton.value.$el, null) as unknown as CSSProperties)[
      'margin-top'
    ]
    // 单个选项item高度
    const itemHeight = document.querySelector('.drop_f_item')!.clientHeight
    // 卡列表高度
    const listHeight = itemHeight * _list.length
    // 宽度计算因子
    const factor = 750 / window.innerWidth
    // 更新买币按钮marginTop
    buyButton.value.$el.style.marginTop = listHeight + parseFloat(buyBtnTop as string) + 8 + 'px'
  })
}
// 下拉列表关闭----动画未结束
const onDropdownItemClose = () => {
  document.querySelector('.van-dropdown-item__content')!.scrollTop = 0
}
// 下拉列表关闭----动画结束
const onDropdownItemClosed = () => {
  buyButton.value.$el.style.marginTop = '0.78667rem'
}
const menuSwitch = (status?: boolean) => {
  itemRef.value.toggle(status)
  document.querySelector('.van-dropdown-item__content')!.scrollTop = 0
}
const slectMenu = (item: { id: number }) => {
  value1.value = item.id
  itemRef.value.toggle()
}
const search = new URLSearchParams(mergeHrefParams())
const hs = search.get('hs') || ''
const wideMode = hs == 'h'
const targetRoute = wideMode ? 'wideOrderCreate' : 'orderCreate'
const is_money_match = ref() //新加参数
is_money_match.value = search.get('is_money_match') || ''
const router = useRouter()
const route = useRoute()
const { query, path } = route
const onlineCharge = ref(path.includes('onlineCharge'))
let gd_buy_fixmomey = 0
gd_buy_fixmomey = query.gd_buy_fixmomey ? +query.gd_buy_fixmomey : 0
let money = sessionStorage.getItem('oderParm_money') || (query.money ? +query.money : 0)
const num = ref(query.money ? +query.money : 0)

// console.log('query', query)

// props.sellData.is_split == 2
//   ? props.sellData.remaining_num
//   : props.sellData.remaining_num < money
//   ? props.sellData.remaining_num
//   : money

// console.log('gd_buy_fixmomey.value11', gd_buy_fixmomey)

const operation_verification = sessionStorage.getItem('operation_verification')
onlineCharge.value = !!operation_verification
  ? true
  : +(query.onlineCharge as string) == 1
  ? true
  : false

if (handleClick())
  Dialog.keeptime({
    title: '温馨提示',
    message: `
    <p>1.下单后，<span class='red_f'> 请在15分钟内完成付款并上传回单！</span></p>
    <p>2.请勿超时或者修改金额，<span class='red_f'>多付少付均无法到账！</span></p>
    <p>3.请勿发送红包或者私下交流转账！</p>
    <p>4.无法付款，请取消订单！</p>
    `,
    allowHtml: true,
    messageAlign: 'left',
    className: 'kgdialog ',
    confirmButtonText: '朕知道了',
    action: (checked: any) => {
      console.log('checked', checked)
      if (checked) {
        const currentTime: any = new Date()
        localStorage.setItem('gd_buy_fixmomeyClickTime', currentTime)
      }
    }
  })

function handleClick() {
  let lastClickTime: any = localStorage.getItem('gd_buy_fixmomeyClickTime')
  const currentTime: any = new Date()
  if (
    lastClickTime === null ||
    currentTime - new Date(lastClickTime).getTime() > 24 * 60 * 60 * 1000
    // currentTime - new Date(lastClickTime).getTime() > 6 * 1000
  ) {
    return true
  } else {
    return false
  }
}

// 当前选中的卡支付方式
const currActiveCard = computed(() => {
  return (
    downList.value.find((item: any) => {
      return item.id == value1.value
    }) || ({} as Record<string, any>)
  )
})
// 图片资源域名
const imgserver_url = computed(() => {
  // console.log('(imgserver_url',(config.value.Web_Set_DefaultInfo?.imgserver_url as any)?.v);
  return (config.value.Web_Set_DefaultInfo?.imgserver_url as any)?.v || ''
})
// 配置是否开启买币推荐
const isOpenRecommendConfig = computed(
  () => (config.value.Web_BuySell_Coin_Times?.QBuy_Config as IQBuyConfig)?.v === '1'
)
// 买币推荐范围配置列表
const recommendRangeList = computed(
  () => (config.value.Web_BuySell_Coin_Times?.QBuy_Config as IQBuyConfig)?.config ?? []
)

// 当前付款方式是否已绑卡
const paymentStatus = computed(() => {
  return downList.value.length > 0 ? BIND_STATUS.BIND : BIND_STATUS.UNBIND
})
const wechatPaymentStatus = computed(() => {
  const wechat = withdrawddresslist.value.find(address => address.coin_protocol === 'WXPAY')
  if (!wechat || wechat.status === 2) {
    return BIND_STATUS.UNBIND
  }
  if (wechat.status === -1) {
    return BIND_STATUS.PROCESS
  }
  return BIND_STATUS.BIND
})
const alipayPaymentInfo = computed(() => {
  const wechat = withdrawddresslist.value.find(address => address.coin_protocol === 'ALIPAY')
  if (!wechat || wechat.status === 2) {
    return BIND_STATUS.UNBIND
  }
  if (wechat.status === -1) {
    return BIND_STATUS.PROCESS
  }
  return BIND_STATUS.BIND
})
const bankPaymentInfo = computed(() => {
  const bank = withdrawddresslist.value.find(address => address.coin_protocol === 'BANK')
  if (!bank || bank.status === 2) {
    return BIND_STATUS.UNBIND
  }
  if (bank.status === -1) {
    return BIND_STATUS.PROCESS
  }
  return BIND_STATUS.BIND
})
const SZRMBPaymentInfo = computed(() => {
  const SZRMB = withdrawddresslist.value.find(address => address.coin_protocol === 'SZRMB')
  if (!SZRMB || SZRMB.status === 2) {
    return BIND_STATUS.UNBIND
  }
  if (SZRMB.status === -1) {
    return BIND_STATUS.PROCESS
  }
  return BIND_STATUS.BIND
})
const isUnBind = computed(() => {
  return (item: string) =>
    !withdrawddresslist.value.some(e => {
      return e.coin_protocol == item && e.status === 1
    })
})

const verifyPayment = () => {
  if (paymentStatus.value !== BIND_STATUS.BIND) {
    unBindPaymentVisible.value = true
    unBindPaymentPopupProps.status = paymentStatus.value
    unBindPaymentPopupProps.link = `/payment_list?way=${coin_protocol.value.toLocaleLowerCase()}`
    return false
  }
  return true
}

watch(unBindPaymentVisible, val => {
  if (!val) {
    unBindPaymentPopupProps.status = undefined
    unBindPaymentPopupProps.link = undefined
  }
})

const onUnBindConfirm = (link: string) => {
  router.push(link)
}

const paylist = ref<any>([])
const coin = useCoinBuySellStore()
const { getWithdrawddresslist, getBuySellCoinInfo } = coin
const { userInfo, withdrawddresslist, buy_orders } = storeToRefs(coin)

getWithdrawddresslist({}).then(() => {
  // console.log('props.sellData', props.sellData.coin_protocol);
  withdrawddresslist.value.forEach(e => {
    e.status === 1 && paylist.value.push(e.coin_protocol)
  })

  if (props.sellData.coin_protocol) {
    paylist.value = props.sellData.coin_protocol?.split(',')
    coin_protocol.value = props.sellData.coin_protocol?.split(',')[0]
  } else {
    paylist.value = PAY_WAY_LIST

    for (let i = 0; i < PAY_WAY_LIST.length; i++) {
      const payWayInfo = withdrawddresslist.value.find(
        card => card.coin_protocol === PAY_WAY_LIST[i] && card.status === 1
      )
      if (payWayInfo) {
        coin_protocol.value = payWayInfo.coin_protocol
        break
      }
    }
  }

  updateCardList()
})

const coinBuy = ref()

// 滚动到推荐买币视图
const scrollToRecommendView = () => {
  let coinBuyContainer = document.querySelector('.coinBuy .container')

  if (coinBuyContainer) {
    coinBuy.value.scrollTop = coinBuyContainer.clientHeight
    coinBuyContainer = null
  }
}

// 搜索推荐金额范围
const searchAmount = computed(() => {
  let amountFrom, amountTo

  for (const target of recommendRangeList.value) {
    const { q, v } = target
    const [from, to] = q.split('-')
    const vRate = parseFloat(v)

    if (+from <= +num.value && +num.value <= +to) {
      amountFrom = +num.value * (1 - vRate / 100)
      amountTo = +num.value * (1 + vRate / 100)
      break
    }
  }

  if (!amountFrom && !amountTo) return num.value
  return `${amountFrom}-${amountTo}`
})

const buyCoins = async (num: any, coin_protocol: any, sell_order_id?: string) => {
  // console.log('money', gd_buy_fixmomey, money, num)
  if (gd_buy_fixmomey == 1) {
    // num = money
  }
  // if (onlineCharge.value && gd_buy_fixmomey && money != num) {
  //   return showToast({
  //     message: '请输入固定' + money + '的买入金额',
  //     icon: info
  //   })
  // }

  !onlineCharge.value && (await getWithdrawddresslist({}))
  if (!onlineCharge.value && !verifyPayment()) {
    return false
  }

  if (!!!num)
    return showToast({
      message: '请输入买入金额',
      icon: info
    })

  if (props.sellData.rec_buy_amount_interval) {
    const [min, max] = props.sellData.rec_buy_amount_interval
    if (num < min || (num > max && +num !== +props.sellData.remaining_num)) {
      return showToast({
        message: `推荐购买 ${min}~${max} 或 全部`,
        icon: info
      })
    }
  }

  if (num > +props.sellData.remaining_num)
    return showToast({
      message: '剩余可购买金额' + (+props.sellData.remaining_num).toTruncFixed(3),
      icon: info
    })
  const withdrawddress_id = !!!value1.value ? '' : value1.value.toString() || ''
  const operation_verification = sessionStorage.getItem('operation_verification') || ''
  const merchantorderid = sessionStorage.getItem('merchantorderid') || ''
  const data = sell_order_id
    ? Buy({
        is_money_match: gd_buy_fixmomey == 1 ? is_money_match.value : '',
        num,
        coin_protocol,
        withdrawddress_id,
        sell_order_id,
        operation_verification,
        merchantorderid
      })
    : BuyQuickly({ num, coin_protocol, withdrawddress_id }, { showErrorToast: false })
  data.then(async (res: Record<string, any>) => {
    const { order_id } = res
    if (!order_id) {
      if (res.code === 10208) {
        // console.log('buy_orders', buy_orders.value)
        await getBuySellCoinInfo({})
        const msgtext = `
          </br>
          </br>
          你还有进行中的订单 <span class="red_f">【${buy_orders.value[0].buy_num}元】</span> ，请完成支付或者取消重新下单。</br>
          </br>
          </br>
          `
        Dialog.confirm({
          title: '温馨提示',
          message: msgtext,
          allowHtml: true,
          messageAlign: 'center',
          className: 'selldialog',
          confirmButtonText: '前往支付',
          cancelButtonText: '取消上笔订单',
          action: () => {
            router.push(`/${targetRoute}?order_id=${buy_orders.value[0].buy_order_id}`)
          },
          cancelAction: () => {
            BuyCancel({ buy_order_id: buy_orders.value[0].buy_order_id }).then(() => {
              showToast({
                message: '操作成功',
                icon: info
              })
            })
          }
        })
        return
        // showToast({
        //   message: '请完成进行中的买单',
        //   icon: error
        // })
      }
      if (res.code === 10229) {
        const msgtext = `
          </br>
          </br>
          订单失效，请返回重新下单!
          </br>
          </br>
          `
        Dialog.confirm({
          title: '温馨提示',
          message: msgtext,
          allowHtml: true,
          messageAlign: 'center',
          className: 'selldialog',
          confirmButtonText: '返回',
          cancelButtonText: '朕知道了',
          action: () => {
            router.go(-1)
          },
          cancelAction: () => {}
        })
        return
      }
      if (!sell_order_id) {
        // 存在进行中的订单, 需先完成
        console.log('查无匹配订单，您可使用推荐购买金额')

        if (!isOpenRecommendConfig.value) return

        console.log('获取推荐金额...')

        const params = {
          coin_protocol: coin_protocol,
          amount: searchAmount.value,
          pagesize: 5
        }
        recommendOrders(params).then(res => {
          const { count, list } = res

          if (!count) {
            showRecommendOrders.value = false
            return showToast({
              message: '暂无匹配订单，请稍后在试',
              icon: error
            })
          }

          orderList.value = list
          showRecommendOrders.value = true

          setTimeout(() => {
            scrollToRecommendView()
          }, 100)
        })
      }
      return
    }
    // console.log('data', order_id); //"B169149207864212970"
    getBuySellCoinInfo({})
    props.sellData.remaining_num = (
      Number(props.sellData.remaining_num) - Number(num)
    ).toTruncFixed(3)
    router
      .replace({ path: route.path, query: { data: JSON.stringify(props.sellData) } })
      .then(() => {
        sessionStorage.setItem('pay_cardid', '')
        sessionStorage.setItem('pay_bankname', '')
        if (route.fullPath.includes('index')) {
          router.push(`/${targetRoute}?order_id=${order_id}`)
        } else {
          router.replace(`/${targetRoute}?order_id=${order_id}`)
        }
      })
  })
}

const coin_protocol = ref('')

// 支付方式映射表，可配置相应信息
const payWayMap = {
  BANK: {
    bindPath: '/bank_card'
  },
  ALIPAY: {
    bindPath: '/alipay'
  },
  WXPAY: {
    bindPath: '/wechat'
  },
  SZRMB: {
    bindPath: '/rmb'
  }
} as Record<string, any>

// 更新当前选中付款方式的卡列表
const updateCardList = () => {
  downList.value = withdrawddresslist.value.filter(
    item => item.coin_protocol === coin_protocol.value && item.status === 1
  )
  value1.value =
    downList.value.find(item => {
      return item.def_card === 1
    })?.id || downList.value[0]?.id
}
const payBoxTap = (payWay: string) => {
  if (isUnBind.value(payWay)) {
    Dialog.confirm({
      title: '',
      message: '您还未绑定该收款方式,是否前往绑定',
      allowHtml: true,
      messageAlign: 'center',
      className: 'dialog-bind-pay-way',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      action: () => {
        router.push(`/payment_list?way=${payWay.toLocaleLowerCase()}`)
      },
      teleport: '.coinBuy'
    })

    return
  }
  coin_protocol.value = payWay
  updateCardList()
  buyButton.value.$el.style.marginTop = '0.78667rem'
}
</script>
<style lang="scss" src="./QuickCoins.scss" scoped />
<style lang="scss">
.dialog-bind-pay-way {
  padding-bottom: 32px;
  .dialog-title {
    height: 50px;
  }
  .dialog-content {
    height: 120px;
    text-align: center;
  }
}
</style>
