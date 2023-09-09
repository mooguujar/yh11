<template>
  <div class="cionBuy">
    <div className="container">
      <p className="buytext">买币金额</p>
      <van-cell-group inset>
        <van-field
          v-model="num" class="buy_input_f"
          type="number"
          :disabled="sellData.is_split == 2"
          :class="sellData.is_split == 2 ? 'is_split_2' : ''"
          :placeholder="
            sellData.split_min || sellData.split_min === 0
              ? '限额最低' +
                (sellData.split_min == 0 ? 10.0 : (+sellData.split_min).toTruncFixed(2)) +
                '~' +
                (+sellData.remaining_num).toTruncFixed(2)
              : '限额最低10.00~50000.00'
          "
        >
          <template #button>
            <span
              v-if="sellData.is_split == 1 && sellData.remaining_num"
              @click="num = sellData.remaining_num"
            >
              全部
            </span>
          </template>
        </van-field>
      </van-cell-group>
      <div
        class="split-min"
        v-if="sellData?.is_split === 1"
      >
        本单最低购买金额{{ sellData.split_min == 0 ? 10 : sellData.split_min }}GDB
      </div>
      <p className="paytext">付款方式</p>
      <div className="paypic">
        <van-row>
          <van-col
            span="7.5"
            class="payBox"
            v-for="item in paylist"
            :class="coin_protocol == item ? 'active' : ''"
            @click="payBoxTap(item)"
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
                    : '无'
                "
                lazy-load
                :src="
                  requireImg(
                    'common/' +
                      (item == 'BANK'
                        ? 'credit'
                        : item == 'ALIPAY'
                        ? 'alipay'
                        : item == 'WXPAY'
                        ? 'WeChatPay'
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
                  : '无'
              }}
            </div>
          </van-col>
          <!-- <van-col span="7.5" class="payBox"
            v-if="sellData.coin_protocol ? sellData.coin_protocol.includes('BANK') : withdrawddresslist.some((e) => { return e.coin_protocol == 'BANK' && e.status === 1 })"
            :class="coin_protocol == 'BANK' ? 'active' : ''" @click="payBoxTap('BANK')">
            <div>
              <van-image class="credit" lazy-load :src="requireImg('common/credit.png')" />
              银行卡
            </div>
          </van-col> -->
        </van-row>
      </div>
      <van-button
        type="primary"
        class="buyButton"
        @click="buyCoins(num, coin_protocol, sellData.order_id)"
      >
        购买G币
      </van-button>
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
import { requireImg } from '@/utils/tools'
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onUnmounted, watch, computed, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'
import { BuyOrderDetail, BuyQuickly, Buy } from '@/apis/buySellCoin'
import { showToast } from 'vant'
// import { Props } from '@/components/Menu/MenuItem.vue';
import info from '@/assets/images/common/info.png'

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
const verifyPayment = () => {
  if (coin_protocol.value === 'WXPAY' && wechatPaymentStatus.value !== BIND_STATUS.BIND) {
    unBindPaymentVisible.value = true
    unBindPaymentPopupProps.status = wechatPaymentStatus.value
    unBindPaymentPopupProps.link = '/wechat'
    return false
  }

  if (coin_protocol.value === 'ALIPAY' && alipayPaymentInfo.value !== BIND_STATUS.BIND) {
    unBindPaymentVisible.value = true
    unBindPaymentPopupProps.status = alipayPaymentInfo.value
    unBindPaymentPopupProps.link = '/alipay'
    return false
  }

  if (coin_protocol.value === 'BANK' && bankPaymentInfo.value !== BIND_STATUS.BIND) {
    unBindPaymentVisible.value = true
    unBindPaymentPopupProps.status = bankPaymentInfo.value
    unBindPaymentPopupProps.link = '/bank_card'
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

interface Props {
  sellData: any
}

const props = withDefaults(defineProps<Props>(), {
  sellData: {}
})
const paylist = ref<any>([])
const router = useRouter()
const route = useRoute()
const coin = useCoinBuySellStore()
const { getWithdrawddresslist, getBuySellCoinInfo } = coin
const { userInfo, withdrawddresslist } = storeToRefs(coin)

getWithdrawddresslist({}).then(() => {
  // console.log('props.sellData', props.sellData.coin_protocol);
  withdrawddresslist.value.forEach(e => {
    e.status === 1 && paylist.value.push(e.coin_protocol)
  })
  props.sellData.coin_protocol && (paylist.value = props.sellData.coin_protocol?.split(','))
  // console.log('paylist.value', paylist.value);

  coin_protocol.value =
    props.sellData.coin_protocol?.split(',')[0] ||
    withdrawddresslist.value.filter(e => {
      return e.status === 1
    })[0].coin_protocol
  // console.log('coin_protocol.value', coin_protocol.value);
  // console.log('withdrawddresslist.value',withdrawddresslist.value);
})

const buyCoins = async (num: any, coin_protocol: any, sell_order_id?: string) => {
  await getWithdrawddresslist({})
  if (!verifyPayment()) {
    return false
  }
  // console.log(props.sellData)
  // props.sellData.remaining_num = 123
  // router.replace({ path: route.path, query: props.sellData})
  // return
  if (!!!num)
    return showToast({
      message: '请输入买入金额',
      icon: info
    })
  // if (num < 10) return showToast({
  //   message: '买币限额10.00~5000000.00',
  //   icon: info,
  // });

  if (num > +props.sellData.remaining_num)
    return showToast({
      message: '剩余可购买金额' + (+props.sellData.remaining_num).toTruncFixed(3),
      icon: info
    })
  // console.log('sell_order_id',sell_order_id,coin_protocol);
  const data = sell_order_id
    ? Buy({ num, coin_protocol, sell_order_id })
    : BuyQuickly({ num, coin_protocol })
  data.then(({ order_id }) => {
    if (!order_id) return console.log('创建订单数据异常')
    // console.log('data', order_id); //"B169149207864212970"
    getBuySellCoinInfo({})
    props.sellData.remaining_num = (
      Number(props.sellData.remaining_num) - Number(num)
    ).toTruncFixed(3)
    router
      .replace({ path: route.path, query: { data: JSON.stringify(props.sellData) } })
      .then(() => {
        router.replace('/orderCreate?order_id=' + order_id)
      })
  })
}

const coin_protocol = ref('')
const num = ref('')

num.value = props.sellData.is_split == 2 ? props.sellData.remaining_num : ''
const payBoxTap = (active: string) => {
  coin_protocol.value = active
}
</script>
<style lang="scss" src="./QuickCoins.scss" scoped />
