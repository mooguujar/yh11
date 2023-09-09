<template>
  <div class="cionBuy overflow_a">
    <nav-bar
      title="卖币"
      mode="blue"
    />
    <div class="blue"></div>
    <div class="content clearfix">
      <div class="amount">
        <p class="NumText">可用余额</p>
        <h4>
          {{ wallets.toTruncFixed(3) }}
          <span>GDB</span>
        </h4>
        <div class="top_sellNum clearfix">
          <div class="can_sell left">可售数量 {{ canSaleAmount }}</div>
          <div class="cant_sell right">
            不可售数量 {{ notSaleAmount }}
            <van-popover
              v-model:show="showPopover"
              placement="top"
              className="sell_popover van-popup van-popover van-popover--light"
            >
              不允许挂单出售，仅允许充值到商户
              <template #reference>
                <van-icon name="question-o" />
              </template>
            </van-popover>
          </div>
        </div>
      </div>
      <div class="sellNum">
        <p class="numTitle">卖币数量</p>
        <van-field
          v-model="value"
          type="number"
          :placeholder="sell_coin_limit_placeholder"
        >
          <template #button>
            <span @click="value = canSaleAmount">全部</span>
          </template>
          <template #right-icon>
            <span>GDB</span>
          </template>
        </van-field>
        <p class="caiText">是否拆分</p>
        <van-radio-group
          v-model="checked"
          direction="horizontal"
          shape="dot"
        >
          <div class="flex items-center">
            <van-radio name="1">可拆分</van-radio>
            <van-popover
              placement="top-start"
              className="sell_popover van-popup van-popover van-popover--light"
            >
              允许多个不同买家购买此卖单，
              <br />
              并各自定义想要购买的GDB数量
              <template #reference>
                <van-icon name="question-o" />
              </template>
            </van-popover>
          </div>
          <div class="flex items-center">
            <van-radio name="2">不拆分</van-radio>
            <van-popover
              placement="top"
              className="sell_popover van-popup van-popover van-popover--light"
            >
              只允许买家按照卖单提交的GDB数量购买
              <template #reference>
                <van-icon name="question-o" />
              </template>
            </van-popover>
          </div>
        </van-radio-group>
        <!-- checked -->
        <!-- label="最低购买" -->
        <div v-if="checked == '1'">
          <p class="numTitle">最低购买</p>
          <van-field
            v-model="minimum"
            placeholder="0"
            type="number"
          ></van-field>
        </div>

        <p class="payText">收款方式</p>
        <div className="paypic">
          <van-row>
            <van-col
              span="7.5"
              class="payBox"
              v-if="
                withdrawddresslist.some(e => {
                  return e.coin_protocol == 'BANK' && e.status === 1
                })
              "
              :class="payMateActive.includes('BANK') ? 'active' : ''"
              @click="payBoxTap('BANK')"
            >
              <div>
                <van-image
                  class="Spic credit"
                  :src="requireImg('common/credit.png')"
                />
                银行卡
              </div>
              <div class="hotPic flex_s">
                <van-image
                  class="icon_huo"
                  :src="requireImg('common/icon_huo.png')"
                />
                <span class="van-ellipsis">额外奖励{{ gift_fee.BANK * 100 }}%</span>
              </div>
            </van-col>
            <van-col
              span="7.5"
              class="payBox"
              v-if="
                withdrawddresslist.some(e => {
                  return e.coin_protocol == 'ALIPAY' && e.status === 1
                })
              "
              :class="payMateActive.includes('ALIPAY') ? 'active' : ''"
              @click="payBoxTap('ALIPAY')"
            >
              <div>
                <van-image
                  class="Spic alipay"
                  :src="requireImg('common/alipay.png')"
                />
                支付宝
              </div>
              <div class="hotPic flex_s">
                <van-image
                  class="icon_huo"
                  :src="requireImg('common/icon_huo.png')"
                />
                <span class="van-ellipsis">额外奖励{{ gift_fee.ALIPAY * 100 }}%</span>
              </div>
            </van-col>
            <van-col
              span="7.5"
              class="payBox"
              v-if="
                withdrawddresslist.some(e => {
                  return e.coin_protocol == 'WXPAY' && e.status === 1
                })
              "
              :class="payMateActive.includes('WXPAY') ? 'active' : ''"
              @click="payBoxTap('WXPAY')"
            >
              <div>
                <van-image
                  class="Spic WeChatPay"
                  :src="requireImg('common/WeChatPay.png')"
                />
                微信
              </div>
              <div class="hotPic flex_s">
                <van-image
                  class="icon_huo"
                  :src="requireImg('common/icon_huo.png')"
                />
                <span class="van-ellipsis">额外奖励{{ gift_fee.WXPAY * 100 }}%</span>
              </div>
            </van-col>
          </van-row>
        </div>
        <van-button
          type="primary"
          class="sellButton"
          @click="onConfirm"
        >
          确认出售
        </van-button>
      </div>
    </div>
    <van-dialog
      v-model:show="showKeyboard"
      class="confirm-dialog"
      title="请输入支付密码"
      theme="round-button"
      :show-confirm-button="false"
    >
      <i
        class="icon-close block close-dark"
        @click="showKeyboard = false"
      ></i>

      <div class="confirm-dialog__content">
        <h4>
          {{ confirmAmount }}
          <span>GDB</span>
        </h4>
        <van-divider />
        <form
          class="confirm-dialog__form"
          @submit.prevent="onSubmit"
        >
          <div class="confirm-dialog__form-item">
            <label>支付密码</label>
            <van-field
              v-model="passwdValue"
              :focused="showKeyboard"
              @focus="showKeyboard = true"
              type="password"
              readonly
              clickable
              @touchstart.stop="showKeyboard = true"
            />
          </div>
          <van-button
            type="primary"
            native-type="submit"
            block
            class="confirm-dialog__form-btn"
          >
            提交
          </van-button>
        </form>
      </div>
    </van-dialog>
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="passwdValue"
      :show="showKeyboard"
      @blur="showKeyboard = false"
      :maxlength="6"
    />
    <van-dialog
      v-model:show="dialogContent.show"
      :title="dialogContent.title"
      theme="round-button"
      :className="['dialog-deal']"
      :confirmButtonText="dialogContent.confirmButtonText"
      @confirm="router.push('/pay_password')"
    >
      <i
        class="icon-close block close-dark"
        @click="dialogContent.show = false"
      ></i>
      <div class="flex flex-col items-center justify-between">
        <img
          :src="dialogContent.img"
          :class="!authStore?.userInfo.verified_status ? 'verifi-id' : 'add-card'"
        />
        <div class="content text-center">{{ dialogContent.content }}</div>
      </div>
    </van-dialog>
    <!--    <van-dialog v-model:show="showKeyboard" title="请输入支付密码" :showConfirmButton="false">-->
    <!--      <van-password-input :value="passwdValue" :focused="showKeyboard" :error-info="errorInfo"-->
    <!--        @focus="showKeyboard = true" />-->
    <!--    </van-dialog>-->
    <!-- 数字键盘 -->
    <!--    <van-number-keyboard v-model="passwdValue" :show="showKeyboard" @blur="showKeyboard = false" />-->
  </div>
</template>

<script setup lang="ts">
import { requireImg } from '@/utils/tools'
import { storeToRefs } from 'pinia'
import { onUnmounted, watch, ref, computed, reactive, onMounted } from 'vue'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'
import { Sell, buySellCoinInfoApi } from '@/apis/buySellCoin'
import router from '@/router'
import socket from '@/utils/WSUtil'
import { useAuthStore } from '@/store/modules/auth'
import infoIcon from '@/assets/images/common/info.png'
import { useEntryStore } from '@/store/modules/entry'
import { useAppBar } from '@/components/AppBar/useAppBar'
import { showFailToast, showToast } from 'vant'
import currency from 'currency.js'
import verifyID from '@/assets/images/common/ID-verify.png'
import passIcon from '@/assets/images/common/key.png'
useAppBar({ mode: 'dark' })

const authStore = useAuthStore()
const { token, getUserMoneyByMType, userInfo } = storeToRefs(authStore)

// 可售金额
const canSaleAmount = computed(() => {
  const coinCash = +(getUserMoneyByMType.value(1)?.available_coincash ?? 0)
  const freeSellAmount = +(userInfo.value?.freesell_amount ?? 0)

  if (freeSellAmount > coinCash) return coinCash.toTruncFixed(2)
  return freeSellAmount.toTruncFixed(2)
})

// 不可售金额
const notSaleAmount = computed(() => {
  const coinCash = +(getUserMoneyByMType.value(1)?.available_coincash ?? 0)

  return (coinCash - Number(canSaleAmount.value)).toTruncFixed(2)
})

const confirmAmount = computed(() => {
  return Number(value.value).toTruncFixed(3)
})

const EntryStore = useEntryStore()
const { config } = storeToRefs(EntryStore)
const gift_fee = computed(() => {
  // console.log('(conft_fee',(config.value.Web_Transfer_BuySell_Coin_Fee?.Sell_mtype_1_gift as any)?.gift_fee);
  return (config.value.Web_Transfer_BuySell_Coin_Fee?.Sell_mtype_1_gift as any)?.gift_fee
})

const splitMin = computed(() => {
  const sellCoinLimit = (
    config.value.Web_Transfer_BuySell_Coin_Fee?.Sell_Coin_Limit as any
  )?.v.split('-')
  return Number(sellCoinLimit[0])
})

const splitMax = computed(() => {
  const sellCoinLimit = (
    config.value.Web_Transfer_BuySell_Coin_Fee?.Sell_Coin_Limit as any
  )?.v.split('-')
  return Number(sellCoinLimit[1])
})

const sell_coin_limit_placeholder = computed(() => {
  const min = splitMin.value.toTruncFixed(2)
  const max = splitMax.value.toTruncFixed(2)
  return `限额${min}~${max}`
})

// socket().start(token.value);

const coin = useCoinBuySellStore()
const { getWithdrawddresslist } = coin
const { withdrawddresslist } = storeToRefs(coin)
const wallets = ref(0)

const payMateActive = ref<any>([])
const payBoxTap = (active: string) => {
  // console.log('payMateActive.value.includes(active)',delete payMateActive.value[active]);
  payMateActive.value.includes(active)
    ? payMateActive.value.splice(payMateActive.value.indexOf(active), 1)
    : payMateActive.value.push(active)
  // console.log('active', payMateActive.value);
}

const active = ref(0)
const onClickLeft = () => history.go(-1)
const minimum = ref(10)
const value = ref<number | string>('')
const checked = ref('1')

const passwdValue = ref('')
const showKeyboard = ref(false)
const showPopover = ref(false)
const errorInfo = ref('')
//
// watch(passwdValue, async newVal => {
//   if (newVal.length == 6) {
//     // console.log('passwdValue.value', passwdValue.value);
//     await goSell()
//       .then(order_id => {
//         // console.log('data',order_id);
//         passwdValue.value = ''
//         showKeyboard.value = false
//         router.push('/orderCreate?order_id=' + order_id + '&sell=true')
//         // goBuySellCoinInfoApi();
//       })
//       .catch(err => {
//         passwdValue.value = ''
//         errorInfo.value = '密码错误'
//         console.log('err错误', err)
//       })
//   } else {
//     errorInfo.value = ''
//   }
// })

const goSell = async () => {
  return new Promise((res, rej) => {
    const SellParm = {
      mtype: 1,
      // mtype	是	string	兑换发起类型
      // 1 系统账户
      // 2、USDT账户
      // 3.以太坊账户
      // 4.比特币账户 ..
      coin_protocol: payMateActive.value.join(','), //付款卡协议 多选用逗号隔开
      // BANK
      // ALIPAY
      // WXPAY
      num: value.value, //数量
      is_split: Number(checked.value), //int	是否拆分 1,是 2否
      split_min: Number(checked.value) == 1 ? minimum.value : null, //数量
      passwd: passwdValue.value
    }
    // console.log('SellParm', SellParm);

    Sell(SellParm).then(({ order_id }) => {
      console.log('order_id', order_id)
      order_id && res(order_id)
      rej(false)
    })
  })
}

// getWithdrawddresslist({}).then(() => {
//   // console.log('withdrawddresslist1222', withdrawddresslist.value);
//   // payMateActive.value = withdrawddresslist.value;
//   payMateActive.value = [
//     (withdrawddresslist.value.filter(e => {
//       return e.status === 1
//     })[0].coin_protocol as never) || ('BANK' as never)
//   ]
//   console.log('payMateActive.value', payMateActive.value)
// })

const goBuySellCoinInfoApi = () => {
  buySellCoinInfoApi({}).then(data => {
    wallets.value = data.wallets['1'].available_num
    // console.log('wallets', wallets.value);
  })
}
goBuySellCoinInfoApi()

const onConfirm = () => {
  if (!canBindPayment()) {
    return false
  }
  if (!authStore.userInfo.is_set_paypassword) {
    return showToast({ message: '请先设置好支付密码', icon: infoIcon })
  }
  if (!value.value || value.value == 0) {
    return showToast({ message: '请输入卖币数量', icon: infoIcon })
  }
  if (Number(value.value) < splitMin.value || Number(value.value) > splitMax.value) {
    return showToast({
      message: `卖币限额\n${splitMin.value.toTruncFixed(2)}~${splitMax.value.toTruncFixed(2)}`,
      icon: infoIcon
    })
  }
  if (checked.value === '1') {
    if (Number(minimum.value) < splitMin.value) {
      return showToast({
        message: `最低买入不能设置低于${splitMin.value.toTruncFixed(2)}`,
        icon: infoIcon
      })
    }
    if (Number(minimum.value) >= Number(value.value)) {
      return showToast({ message: `最低买入不能高于卖币数量`, icon: infoIcon })
    }
  }
  if (!payMateActive.value || payMateActive.value.length === 0) {
    return showToast({ message: '请选择收款方式', icon: infoIcon })
  }
  showKeyboard.value = true
}

const onSubmit = async () => {
  if (passwdValue.value.length == 6) {
    // console.log('passwdValue.value', passwdValue.value);
    await goSell()
      .then(order_id => {
        // console.log('data',order_id);
        passwdValue.value = ''
        showKeyboard.value = false
        router.push(
          '/orderCreate?order_id=' +
            order_id +
            '&sell=true&payMateActive=' +
            payMateActive.value.join(',')
        )
        // goBuySellCoinInfoApi();
      })
      .catch(err => {
        passwdValue.value = ''
        // showFailToast('密码错误')
      })
  } else {
    showFailToast('请输入6位密码')
  }
}

const dialogContent = reactive({
  show: false,
  title: '',
  img: '',
  content: '',
  confirmButtonText: ''
})

const canBindPayment = () => {
  if (authStore.userInfo.is_set_paypassword === 2) {
    const dialogInfo = {
      show: true,
      title: '设置支付密码',
      img: passIcon,
      content: '请先设置支付密码',
      confirmButtonText: '立即设置'
    }
    Object.assign(dialogContent, dialogInfo)
    return false
  }

  return true
}
</script>

<style lang="scss" src="./sell.scss" scoped />
<style lang="scss">
.sell_popover {
  transform: translate(-20px, -20px);

  .van-popover__content {
    padding: 20px;
    font-family: MicrosoftYaHei;
    font-size: 26.6px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #0875f9;
  }
}
</style>
