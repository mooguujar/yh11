<template>
  <div class="cionBuy">
    <div className="container">
      <p className="buytext">买币金额</p>
      <van-cell-group inset>
        <van-field v-model="num" type="number" :disabled="sellData.is_split == 2" :class="sellData.is_split == 2?'is_split_2':''"
          :placeholder="sellData.split_min || sellData.split_min === 0 ? '限额最低' + (sellData.split_min == 0 ? 10.00 : (+sellData.split_min).toFixed(2)) + '~' + (+sellData.remaining_num).toFixed(2) : '限额最低10.00~5000000.00'">
          <template #button>
            <span v-if="sellData.is_split==1&& sellData.remaining_num" @click="num = sellData.remaining_num">全部</span>
          </template>
        </van-field>
      </van-cell-group>
      <div class="split-min" v-if="sellData?.is_split === 1">
        本单最低购买金额{{ sellData.split_min == 0 ? 10 : sellData.split_min }}GDB
      </div>
      <p className="paytext">付款方式</p>
      <div className="paypic">
        <van-row>
          <van-col span="7.5" class="payBox" v-for="(item) in paylist" :class="coin_protocol == item ? 'active' : ''"
            @click="payBoxTap(item)">
            <div>
              <van-image
                :class="(item == 'BANK' ? 'credit' : item == 'ALIPAY' ? 'alipay' : item == 'WXPAY' ? 'WeChatPay' : '无')"
                lazy-load
                :src="requireImg('common/' + (item == 'BANK' ? 'credit' : item == 'ALIPAY' ? 'alipay' : item == 'WXPAY' ? 'WeChatPay' : '无') + '.png')" />
              {{ item == 'BANK' ? '银行卡' : item == 'ALIPAY' ? '支付宝' : item == 'WXPAY' ? '微信' : '无' }}
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
      <van-button type="primary" class="buyButton"
        @click="buyCoins(num, coin_protocol, sellData.order_id)">购买G币</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { requireImg } from '@/utils/tools'
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onUnmounted, watch, computed, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'
import { BuyOrderDetail, BuyQuickly, Buy } from '@/apis/buySellCoin';
import { showToast } from 'vant'
// import { Props } from '@/components/Menu/MenuItem.vue';
import info from '@/assets/images/common/info.png'

interface Props {
  sellData: any
}
const props = withDefaults(defineProps<Props>(), {
  sellData: {}
})
const paylist = ref<any>([])
const router = useRouter()
const route = useRoute()
const coin = useCoinBuySellStore();
const { getWithdrawddresslist, getBuySellCoinInfo } = coin;
const { userInfo, withdrawddresslist } = storeToRefs(coin);

getWithdrawddresslist({}).then(() => {
  // console.log('props.sellData', props.sellData.coin_protocol);
  withdrawddresslist.value.forEach((e) => { (e.status === 1 && paylist.value.push(e.coin_protocol)); });
  props.sellData.coin_protocol && (paylist.value = props.sellData.coin_protocol?.split(','));
  // console.log('paylist.value', paylist.value);

  coin_protocol.value = props.sellData.coin_protocol?.split(',')[0] || withdrawddresslist.value.filter((e) => { return e.status === 1 })[0].coin_protocol;
  // console.log('coin_protocol.value', coin_protocol.value);
  // console.log('withdrawddresslist.value',withdrawddresslist.value);
})

const buyCoins = async (num: any, coin_protocol: any, sell_order_id?: string) => {
  // console.log(props.sellData)
  // props.sellData.remaining_num = 123
  // router.replace({ path: route.path, query: props.sellData})
  // return
  if (!!!num) return showToast({
    message: '请输入买入金额',
    icon: info,
  });
  // if (num < 10) return showToast({
  //   message: '买币限额10.00~5000000.00',
  //   icon: info,
  // });

  if (num > (+props.sellData.sell_num)) return showToast({
    message: '剩余可购买金额' + (+props.sellData.sell_num).toFixed(3),
    icon: info,
  });
  // console.log('sell_order_id',sell_order_id,coin_protocol);
  const data = sell_order_id ? Buy({ num, coin_protocol, sell_order_id })
    : BuyQuickly({ num, coin_protocol });
  data.then(({ order_id }) => {
    if (!order_id) return console.log('创建订单数据异常');
    // console.log('data', order_id); //"B169149207864212970"
    getBuySellCoinInfo({})
    props.sellData.remaining_num = (Number(props.sellData.remaining_num) - Number(num)).toFixed(3)
    router.replace({ path: route.path, query: { data: JSON.stringify(props.sellData)}}).then(() => {
      router.push('/orderCreate?order_id=' + order_id)
    })
  })
}

const coin_protocol = ref('');
const num = ref('');

num.value = props.sellData.is_split == 2 ? (props.sellData.remaining_num) : '';
const payBoxTap = (active: string) => {
  coin_protocol.value = active
}

</script>
<style lang="scss" src="./QuickCoins.scss" scoped />

