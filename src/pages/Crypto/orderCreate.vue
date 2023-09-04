<template>
  <div class="orderCreate van-safe-area-top">
    <nav-bar :mode="processActive == 4 ? 'white' : 'transparent'" @click-left="onClickLeft"/>
   <!-- <nav-bar mode="white" /> -->

  <div class='top_wrop' v-if="seller&&!SellOrder" :class="[2, 4, 5, 9, 10].includes(BuyOrderDetail.status)?'back_white':''">
    <div class='top_orderNum'>挂单编号 <span>{{ SellOrderNum }}</span> </div>
    <div class='top_orderAmount'>挂单金额 <span>{{ SellOrderAmount }}</span> GDB <span :class="SellOrderIs_split==1?'green_f':'red_f' " class="right">{{ SellOrderIs_split==1?'可拆分':'不可拆分' }}</span></div>
  </div>
   <!-- <van-nav-bar class="processActive" title="" left-arrow @click-left="onClickLeft" :class="processActive == 4 ? 'processActive' : ''" /> -->
    <div class="titleProcess" :class="seller?'top_margin20':''" v-if="![2, 4, 5, 9, 10].includes(BuyOrderDetail.status) && processActive !== 4 && !SellOrder">
      <van-row justify="space-between">
        <van-col span="8" class="process" :class="processActive == 1 ? 'processActive' : ''" @click="Goprocess(1)">
          <div class="Onode flex_s">
            <div class="Pbg">1</div>
            <div class="point"><span v-for="e in Array(6)"></span></div>
          </div>
          <p>订单已生成</p>
        </van-col>
        <van-col span="8" class="process" :class="processActive == 2 ? 'processActive' : ''" @click="Goprocess(2)">
          <div class="Onode flex_s">
            <div class="Pbg">2</div>
            <div class="point"><span v-for="e in Array(6)"></span></div>
          </div>
          <p>向卖家付款</p>
        </van-col>
        <van-col span="8" class="process" :class="processActive == 3 ? 'processActive' : ''" @click="Goprocess(3)">
          <div class="Onode flex_s">
            <div class="Pbg">3</div>
          </div>
          <p>等待放行</p>
        </van-col>
      </van-row>
    </div>

    <!-- 评分 -->
    <div class="Ocomplete" v-else-if="!SellOrder && processActive == 4">
      <div class="Cpic">
        <van-icon name="checked" />
        <p class="text">交易完成！</p>
      </div>
      <div class="Camount">
        您已{{ seller ? '出售' : '获得' }}：
        <span>{{ (+BuyOrderDetail.buy_num).toFixed(2) || (+BuyOrderDetail.remaining_num).toFixed(2) }} GDB</span>
      </div>
      <p class="Ctips">评分</p>
      <div class="integral">
        <div class="left">
          <van-image lazy-load class="Oavatar"
            :src="BuyOrderDetail.sell_info && BuyOrderDetail.sell_info.headimg && imgserver_url + (seller ? BuyOrderDetail.headimg : BuyOrderDetail.sell_info?.headimg)" />
          <span class="OuserName van-ellipsis">{{ seller ? BuyOrderDetail.nickname : BuyOrderDetail.sell_info?.nickname
          }}</span>
        </div>
        <div class="left flex_sz height100">
          <div>
            <van-rate v-model="integral" :disabled="!(
              (seller && !!!BuyOrderDetail.seller_star) ||
              (!seller && !!!BuyOrderDetail.buyer_star)
            )
              " :size="20" color="#ffd21e" />
            <span>{{ integral }}星</span>
          </div>
        </div>
      </div>
    </div>

    <div class="Fcontent van-safe-area-bottom">
      
      <div v-if="processActive !== 4" class="clearfix">

        <!-- 上方标题 -->
        <div v-if="!SellOrder">
          <div class="O_title" v-if="[2, 4, 5, 9, 10].includes(BuyOrderDetail.status)">
            订单已取消
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 1">
            {{ SellOrder ? '挂单已生成' : '订单已生成' }}
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 3">
            {{ seller ? '等待买家付款' : '向卖家付款' }}
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 6">
            买家已付款
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 7">
            {{ seller ? '挂起待确认' : '挂起待确认' }}
          </div>

          <!-- 下方小文字提示 -->
          <div class='O_tips' v-if="BuyOrderDetail.status === 1">
            {{ seller ? '在' : '等待卖家确认交易，' }}
            <span class="O_red"> {{ secondsToMinutesWithSeconds(BuyOrderDetail.time_second) }} </span> 后交易将取消
          </div>

          <div class='O_tips' v-else-if="BuyOrderDetail.status === 2">{{ seller ? '卖家' : '卖家' }}取消交易</div>

          <div class='O_tips' v-else-if="BuyOrderDetail.status === 3 && seller">在<span class="O_red"> {{
            secondsToMinutesWithSeconds(BuyOrderDetail.time_second) }} </span>后交易取消</div>
          <div class='O_tips' v-else-if="BuyOrderDetail.status === 3 && !seller">请在<span class="O_red"> {{
            secondsToMinutesWithSeconds(BuyOrderDetail.time_second) }} </span>内向卖家付款</div>
          <div class='O_tips' v-else-if="BuyOrderDetail.status === 4">{{ seller ? '买家付款超时' : '买家付款超时' }}</div>
          <div class='O_tips' v-else-if="BuyOrderDetail.status === 5">{{ seller ? '买家' : '买家' }}取消交易</div>
          <!-- <div class='O_tips' v-else-if="BuyOrderDetail.status === 6">{{ seller ? '买家' : '买家' }}已付</div> -->

          <div class='O_tips' v-else-if="BuyOrderDetail.status === 6 && seller">在<span class="O_red"> {{
            secondsToMinutesWithSeconds(BuyOrderDetail.time_second) }} </span>内确认</div>
          <div class='O_tips' v-else-if="BuyOrderDetail.status === 6 && !seller">等待放行 <span class="O_red"> {{
            secondsToMinutesWithSeconds(BuyOrderDetail.time_second) }} </span></div>

          <div class='O_tips' v-else-if="BuyOrderDetail.status === 7">{{ SellOrder ? '取消卖出' : '挂单待确认' }}</div>
          <div class='O_tips' v-else-if="BuyOrderDetail.status === 8">交易完成</div>
          <div class='O_tips' v-else-if="BuyOrderDetail.status === 9">强制失败</div>
          <div class='O_tips' v-else-if="BuyOrderDetail.status === 10">强制成功</div>
        </div>
        <div v-else>
          <div class="O_title" v-if="[2, 4, 5, 9, 10].includes(BuyOrderDetail.status)">
            订单已取消
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 1">
            {{ SellOrder ? '挂单已生成' : '订单已生成' }}
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 3">
            {{ seller ? '等待买家付款' : '向卖家付款' }}
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 6">
            全部完成
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 7">
            取消挂单
          </div>

          <!-- 下方小文字提示 -->
          <div class="O_tips" v-if="BuyOrderDetail.status === 1">
            挂单中
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 2">
            确认交易中
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 3">
            等待买家付款
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 4">
            确认收款中
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 5">
            挂起待确认
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 6">
            全部完成
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 7">
            取消卖出
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 8">
            部分完成
          </div>
        </div>

        <!-- 头像和提醒 -->
        <div class='O_username' v-if="!SellOrder">
          <van-image lazy-load class="Oavatar" :src="t_pic" />
          <span class="OuserName van-ellipsis">{{ seller ? BuyOrderDetail.nickname : BuyOrderDetail.sell_info?.nickname
          }}</span>
          <van-button v-if="!([2, 4, 5, 8, 9, 10].includes(BuyOrderDetail.status))" type="primary" :disabled="tixin > 0"
            @click="Reminders({ buy_order_id: BuyOrderDetail.order_id }).then((data) => { if (data instanceof Array && data.length == 0 && (data as any).code != 0) return; tixin = 60 });"
            class="contactSeller"><van-icon name="chat-o" /> {{ tixin > 0 ? tixin : '交易提醒' }}</van-button>
        </div>

        <!-- 支付方式信息 -->
        <div class='O_orderInfo O_pay' v-if="!SellOrder && [3, 6, 7, 8, 9, 10].includes(BuyOrderDetail.status)">
          <div v-if="BuyOrderDetail.coin_protocol == 'BANK'">
            <van-image class="payImg" lazy-load :src="requireImg('common/credit.png')" />
            <span class="payTitle">银行卡支付</span>
          </div>
          <div v-if="BuyOrderDetail.coin_protocol == 'ALIPAY'">
            <van-image class="payImg" lazy-load :src="requireImg('common/alipay.png')" />
            <span class="payTitle">支付宝支付</span>
          </div>
          <div v-if="BuyOrderDetail.coin_protocol == 'WXPAY'">
            <van-image class="payImg" lazy-load :src="requireImg('common/WeChatPay.png')" />
            <span class="payTitle">微信支付</span>
          </div>
          <div class="O_count">
            姓名
            <span class="O_nums">
              {{ BuyOrderDetail.sell_info?.collection_realname }}
              <van-icon name="label-o" class="copy" size="16"
                @click="copy(BuyOrderDetail.sell_info?.collection_realname)" />
            </span>
          </div>
          <div class="O_amount">
            {{ BuyOrderDetail.sell_info?.collection_bankname }}
            <span class="O_nums">
              {{ BuyOrderDetail.sell_info?.collection_cardid }}
              <van-icon name="label-o" size="16" class="copy"
                @click="copy(BuyOrderDetail.sell_info?.collection_cardid)" />
            </span>
          </div>
        </div>

        <!-- 交易信息 -->
        <div class="O_orderInfo">
          <div class="O_num">
            {{ SellOrder ? '挂单编号' : '订单编号' }}
            <span class="O_nums">{{ BuyOrderDetail.order_id }}</span>
          </div>
          <div class="O_num" :class="SellOrder?'m_SellOrder':''">
            {{ SellOrder ? '挂单金额' :seller?'出售数量': '购买数量' }}
            <span class="O_nums">{{ (BuyOrderDetail.buy_num&&(+BuyOrderDetail.buy_num).toFixed(2)) || (+BuyOrderDetail.sell_num).toFixed(2) }} GDB</span>
          </div>

          <!-- <div class="O_count" v-if="SellOrder">
            卖币手续费
            <span class="O_nums">￥ {{ BuyOrderDetail.coin_fee }}</span>
          </div>
          <div class="O_count" v-if="SellOrder">
            服务费减免
            <span class="O_nums">￥ {{ BuyOrderDetail.sell_gift }}</span>
          </div> -->
          <!-- <div class="O_count" v-if="SellOrder">
            服务费减免额度
            <span class="O_nums">￥ {{ BuyOrderDetail.gift_mtype }}</span>
          </div> -->
          
          <div v-if="!SellOrder" :class="!seller?'O_amount':'O_count'">
            {{seller?'获得金额':'付款金额'}}
            <span class="O_nums">
              ￥ {{ BuyOrderDetail.buy_num || BuyOrderDetail.remaining_num }}
              <!-- <van-icon name="label-o" class="copy" size="16" 
                @click="copy(BuyOrderDetail.buy_num || BuyOrderDetail.remaining_num)" /> -->
            </span>
          </div>
          <div class="O_amount" v-if="!SellOrder && seller">
            {{ '额外奖励' }}
            <span class="O_nums1">{{ BuyOrderDetail.sell_gift&&(+BuyOrderDetail.sell_gift).toFixed(2) }} GDB</span>
          </div>

          <div class="O_amount" v-if="SellOrder">
            是否可拆分
            <span class="O_nums " :class="BuyOrderDetail.is_split==1?'green_f':'red_f' ">
              {{ BuyOrderDetail.is_split==1?'可拆分':'不可拆分'  }}
            </span>
          </div>

        </div>

        <div class="paymate clearfix" v-if="SellOrder">
          <div class='left'>付款方式</div>
          <div class="right " >
            <van-image v-if="payMateActive.includes('BANK')" class="payImg" lazy-load :src="requireImg('common/credit.png')" />
            <van-image v-if="payMateActive.includes('ALIPAY')" class="payImg" lazy-load :src="requireImg('common/alipay.png')" />
            <van-image v-if="payMateActive.includes('WXPAY')" class="payImg" lazy-load :src="requireImg('common/WeChatPay.png')" />
          </div>
        </div>

        <van-button color="#0b75ff" type="primary" class="orderOperation" v-if="SellOrder"
          @click="router.push('/')">
          确认
        </van-button>
      </div>

      <!-- 按钮 -->
      <div class="orderButton flex_z" :class="processActive == 2 ||
        (processActive == 1) ||
        (processActive == 1 && !seller && confirm) ||
        (processActive == 3) ||
        processActive == 4
        ? [7].includes(BuyOrderDetail.status) ? 'appeal_up processActive' : 'processActive'
        : ''
        ">
        <div class='' v-if="SellOrder && [1].includes(BuyOrderDetail.status)">
        </div>
        <!-- <van-button type="primary" class="orderOperation" v-if="SellOrder && [1].includes(BuyOrderDetail.status)"
          @click="goSellCancel">
          取消挂单
        </van-button> -->

        <van-button type="primary" class="orderOperation" @click="
          seller
            ? SellerCheckBuyStatus({ buy_order_id: BuyOrderDetail.order_id, status: 2 }).then(
              () => {
                getBuyOrderDetail(BuyOrderDetail.order_id)
              }
            )
            : BuyCancel({ buy_order_id: BuyOrderDetail.order_id }).then(() => {
              getBuyOrderDetail(BuyOrderDetail.order_id)
            })
          " v-else-if="![2, 4, 5, 8, 9, 10].includes(BuyOrderDetail.status) &&
            (!seller ||
              (seller && !confirm) ||
              (processActive == 2 && !seller) ||
              (processActive == 3 && !seller))
            ">
          取消订单
        </van-button>
        <van-button type="primary" v-if="processActive == 1 && !seller && confirm" class="orderOperation">
          去付款
        </van-button>
        <van-button type="primary" v-if="!SellOrder && [1].includes(BuyOrderDetail.status) && seller && !confirm"
          class="orderOperation" @click="SellerCheckBuyStatus({ buy_order_id: BuyOrderDetail.order_id, status: 1 })">
          确认交易
        </van-button>
        <van-button type="primary"
          v-if="![2, 4, 5, 9, 10].includes(BuyOrderDetail.status) && processActive == 2 && !seller" class="orderOperation"
          @click="BuyerUpdateTransInfo({ buy_order_id: BuyOrderDetail.order_id })">
          我已付款，通知卖家
        </van-button>
        <van-button type="primary" v-if="!SellOrder &&
          processActive == 3 &&
          seller &&
          ![7, 8, 9, 10].includes(BuyOrderDetail.status)
          " class="orderOperation fangxin" @click="showKeyboard = true">
          放行
        </van-button>

        <van-button type="primary"
          v-if="!SellOrder && processActive == 3 && seller && [7].includes(BuyOrderDetail.status)" class="orderOperation"
          @click="authStore.userInfo.is_set_paypassword ? showKeyboard = true : showToast('请先设置好支付密码')">
          放行
        </van-button>
        <van-button type="primary" v-if="!SellOrder && processActive == 3 && [7].includes(BuyOrderDetail.status)" class="orderOperation"
          @click="showAppeal = true">
          交易申诉
        </van-button>

        <van-button type="primary" v-if="[8].includes(BuyOrderDetail.status) && processActive == 3 && !SellOrder"
          class="orderOperation fangxin proActive" @click="processActive = 4">
          交易评分
        </van-button>
        <van-button type="primary" v-if="processActive == 4" @click="confirmDeal" class="orderOperation fangxin">
          {{
            (seller && !!!BuyOrderDetail.seller_star) || (!seller && !!!BuyOrderDetail.buyer_star)
            ? '确认'
            : '已评分返回'
          }}
        </van-button>
      </div>

      <!-- 交易申诉 -->
      <div class="appeal_c" v-if="!SellOrder && processActive == 3 && [7].includes(BuyOrderDetail.status)">
        <div class='appealTitle'>交易申诉</div>
        <!-- <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
        <div class='commen' v-for="item in viewCoinsellcommentlist" :key="item.uuid">
          <div class='topPic clearfix'>
            <div class='left'>
              <van-image lazy-load class="Oavatar" fit="cover" :src="t_pic" />
              <span class="OuserName van-ellipsis">{{ seller ? BuyOrderDetail.nickname :
                BuyOrderDetail.sell_info?.nickname
              }}</span>
              <span class='judeg'>{{ seller ? '卖家' : '买家' }}</span>
            </div>
            <div class='right'>
              <span>{{ item.addtime }}</span>
            </div>
          </div>
          <div class='rwop'>
            <span class="text_c">{{ item.msg }}</span>
          </div>
          <van-image lazy-load class="pic_commen" fit="cover" @click="showImagePreview([imgserver_url + item.face])"
            :src="imgserver_url + item.face" />

        </div>
        <!-- </van-list> -->
      </div>

    </div>
    <van-dialog v-model:show="showKeyboard" title="请输入支付密码" class="passwordInput" :showConfirmButton="false">
      <van-password-input :value="passwdValue" :focused="showKeyboard" :error-info="errorInfo"
        @focus="showKeyboard = true" />
    </van-dialog>
    <!-- 数字键盘 -->
    <van-number-keyboard v-model="passwdValue" :show="showKeyboard" @blur="showKeyboard = false" />

    <!-- 申诉 -->
    <van-dialog v-model:show="showAppeal" title="" class="showAppeal" :showConfirmButton="false">
      <div class='O_title'>申诉描述</div>
      <van-field v-model="message" rows="2" autosize type="textarea" class="O_textarea" maxlength="50"
        placeholder="不超过200字" />
      <div class='titleUp'>上传图片 </div>
      <van-uploader v-model="(fileList)" :after-read="afterRead" :before-read="beforeRead" :max-count="9"
        :max-size="500 * 1024" @oversize="onOversize" class="O_uploader" />
      <div class="flex_z">
        <van-button type="primary" color="#828282" class="margr20" @click="showAppeal = false">取消</van-button>
        <van-button type="primary" color="#0b75ff" class="marg0 " @click="confirmAppeal">提交</van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import clipboard3 from 'vue-clipboard3'
import { requireImg ,secondsToMinutesWithSeconds} from '@/utils/tools'
import { useRouter, useRoute } from 'vue-router'
import { uploadimgBat, SellOrderDetail, Reminders, SetStar, BuyOrderDetail as apiBuyOrderDetail, SellCancel, SellerCheckBuyStatus, BuyCancel, sellerCheckTransStatus, BuyerUpdateTransInfo, Appeal, coinsellcommentadd, coinsellcommentlist } from '@/apis/buySellCoin';
import { resBuyOrderDetail } from '@/store/types/buySellCoin';
import verified from '@/assets/images/common/verified.png'
import { uploadImgApi } from '@/apis/common';
import { useEntryStore } from '@/store/modules/entry';

import { useAuthStore } from '@/store/modules/auth'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'
import { storeToRefs } from 'pinia'
import { onUnmounted, watch, ref, toRef, onMounted, computed } from 'vue'
import { UploaderFileListItem, showToast, showImagePreview, showNotify } from 'vant'
import mitt from '@/utils/mitt'
// import socket from '@/utils/WSUtil'
// socket.send('start');


const EntryStore = useEntryStore()
const { config } = storeToRefs(EntryStore)
const imgserver_url = computed(() => {
  // console.log('(imgserver_url',(config.value.Web_Set_DefaultInfo?.imgserver_url as any)?.v);
  return (config.value.Web_Set_DefaultInfo?.imgserver_url as any).v || '';
});
const tixin = ref(0)
const router = useRouter()
watch(tixin, (newVal) => {
  setTimeout(() => {
    if (newVal > 0) {
      tixin.value -= 1
    }
  }, 1000)
})

const { toClipboard } = clipboard3()
const copy = async (text: any) => {
  try {
    await toClipboard(text)
    // showToast('复制成功');
    showToast({
      message: '复制成功',
      icon: verified
    })
  } catch (error) {
    // showToast('复制失败!!');
    showToast({
      message: '复制失败!!',
      icon: verified
    })
  }
}
const authStore = useAuthStore()
const coin = useCoinBuySellStore()
const { getInfo } = coin
const { token } = storeToRefs(authStore)
const { userInfo } = storeToRefs(coin)

const processActive = ref(1)
// const seller = ref(0);
const confirm = ref(1) //卖家是否确认开始交易
const integral = ref(0) //几颗星

let BuyOrderDetail = ref({} as resBuyOrderDetail)
const route = useRoute()
const { query } = route
let SellOrder = ref()
let SellOrderNum = ref('')
let SellOrderAmount = ref('')
let SellOrderIs_split = ref()

const getSellOrderDetail = () => {
  SellOrderDetail({ order_id: query.order_id as string }).then(data => {
    if (!data.order_id) return console.log('Selldata数据异常')
    BuyOrderDetail.value = data;
    if (data.buy_orders[0]?.order_id) {
      // console.log('data.buy_orders?.order_id', data.buy_orders[0].order_id);
      return getBuyOrderDetail(data.buy_orders[0].order_id)
    }
  })
}

const getBuyOrderDetail = (order_id: string) => {
  // console.log('query.order_id', order_id, query.order_id);
  SellOrder.value = false;
  // setTimeout(() => {
    apiBuyOrderDetail({ order_id: order_id || (query.order_id as string) }).then(data => {
      if (!data.order_id) return console.log('数据异常')
      // console.log('apiBuyOrderDetail-------------', data.order_id)
      BuyOrderDetail.value = data;

      SellOrderNum.value=data.sell_info.order_id;
      SellOrderAmount.value=(+data.sell_info.sell_num).toFixed(2);
      SellOrderIs_split.value=data.sell_info.is_split;
    })
  // }, 400)
}

const t_pic = ref('')
const seller = computed(() => { //判断是否是卖家
  if (userInfo.value.uuid) {
    let v = (BuyOrderDetail.value.uuid == userInfo.value.uuid ? 0 : 1);
    integral.value = v ? BuyOrderDetail.value.seller_star : BuyOrderDetail.value.buyer_star;
    t_pic.value = BuyOrderDetail.value.sell_info && BuyOrderDetail.value.sell_info.headimg && imgserver_url.value + (v ? BuyOrderDetail.value.headimg : BuyOrderDetail.value.sell_info?.headimg)
    return v;
  } else {
    getInfo().then(() => {
      let v = BuyOrderDetail.value.uuid == userInfo.value.uuid ? 0 : 1
      // console.log('userInfouuid', userInfo.value.uuid);
      integral.value = v ? BuyOrderDetail.value.seller_star : BuyOrderDetail.value.buyer_star;
      t_pic.value = BuyOrderDetail.value.sell_info && BuyOrderDetail.value.sell_info.headimg && imgserver_url.value + (v ? BuyOrderDetail.value.headimg : BuyOrderDetail.value.sell_info?.headimg)
      return v;
    })
  }
})

const payMateActive=ref('')
// console.log('route', query.order_id);

setTimeout(() => {
  SellOrder.value = query.sell == 'true' ? true : false;
  query && SellOrder.value ? getSellOrderDetail() : getBuyOrderDetail(query.order_id as string);

  payMateActive.value = query.payMateActive as string || '';
  // console.log('payMateActive.value',payMateActive.value);

  let sellsumData = (query.sellsumData&&JSON.parse(query.sellsumData as string)||{});
  // console.log('sellsumData',sellsumData);
  SellOrderNum.value=sellsumData.order_id;
  SellOrderAmount.value=sellsumData.sell_num;
  SellOrderIs_split.value=sellsumData.is_split;
}, 10);

const viewCoinsellcommentlist = ref<any>([]);

watch(BuyOrderDetail, newVal => {
  processActive.value = [8].includes(BuyOrderDetail.value.status)
    ? 4
    : [1, 2].includes(BuyOrderDetail.value.status)
      ? 1
      : [3, 4, 5].includes(BuyOrderDetail.value.status)
        ? 2
        : 3;
  confirm.value = BuyOrderDetail.value.status > 2 ? 1 : 0;
  setTimeout(() => {
    if (newVal.time_second > 0) {
      newVal.time_second -= 1;
      newVal.time_second == 0 && getBuyOrderDetail(query.order_id as string)
      // newVal.time_second==0&&getBuyOrderDetail(false);
    }
  }, 1000);
  if (newVal.status == 7 && SellOrder.value == false) {
    coinsellcommentlist({ orderid: newVal.order_id, ctype: '1' }).then((data) => {
      console.log('data', data);
      if (data instanceof Array && data.length == 0 && (data as any).code != 0) return showToast('申诉列表获取异常');
      viewCoinsellcommentlist.value = data;
    })
  }
},
  {
    deep: true
    // immediate:true
  })


onMounted(() => {
  mitt.on('update_buy_f', (data: any) => {
    console.log('推送买币订单状态 data2', route.path, query.order_id)
    // setTimeout(() => {
      route.path == '/orderCreate' && getBuyOrderDetail(BuyOrderDetail.value.order_id)
    // }, 500)
  })
  mitt.on('update_sell_f', (data: any) => {
    console.log('推送卖币订单状态 data2', data)
    SellOrder.value ? getSellOrderDetail() : getBuyOrderDetail(BuyOrderDetail.value.order_id)
  })
})

onUnmounted(() => {
  mitt.off('update_buy_f')
  mitt.off('update_sell_f')
  // mitt.off('push_reminders_buy')
  // mitt.off('push_reminders_sell')
})

const goSellCancel = () => {
  SellCancel({ sell_order_id: query.order_id as string })
}

const passwdValue = ref('')
const showKeyboard = ref(false)
const errorInfo = ref('')

watch(passwdValue, async newVal => {
  if (newVal.length == 6) {
    // console.log('passwdValue.value', passwdValue.value);
    await sellerCheckTransStatus({
      buy_order_id: BuyOrderDetail.value.order_id,
      passwd: passwdValue.value
    })
      .then(order_id => {
        console.log('data', order_id.buy_order)
        passwdValue.value = ''
        if (!!!order_id.buy_order) return
        showKeyboard.value = false
        // processActive.value = 4;
      })
      .catch(err => {
        passwdValue.value = ''
        errorInfo.value = '密码错误'
        console.log('err错误', err)
      })
  } else {
    errorInfo.value = ''
  }
})


const showAppeal = ref(false);
const message = ref('');

const fileList = ref<any[]>([
]);
const beforeRead = (file: any) => {
  // console.log('file.type', file.type);
  if (!file.type.startsWith('image/')) {
    showToast('请上传 jpg 格式图片')
    return false
  }
  return true
}
const onOversize = (file: any) => {
  console.log(file);
  showToast('文件大小不能超过 50m');
};



const afterRead = async (event: any) => {
  // console.log('event',event);
  if (!event.file) return;
  const res = await uploadImg(event.file)
  // console.log('res',res);
  if (!!!res.img) return showToast('上传失败，请稍后重试');

  let obj = {
    status: 'uploading',
    message: '上传中...',
    url: imgserver_url.value + res.img
  }

  fileList.value[fileList.value.length - 1] = obj;
  setTimeout(() => {
    fileList.value[fileList.value.length - 1].status = 'done';
    fileList.value[fileList.value.length - 1].message = '上传成功';
  }, 500);
  // console.log('fileList.value',fileList.value);
};

const uploadImg = async (file: string): Promise<any> => {
  try {
    const res = await uploadImgApi({
      file,
      type: 'appeal'
    });

    return res;
  } catch (e) {
    console.log(e);
  }
};


const confirmAppeal = () => {
  let appealParm = {
    buy_order_id: BuyOrderDetail.value.order_id,//	是	string	订单号
    comment: message.value,//	是	string	申诉内容
    img: fileList.value//	是	array	图片
  }
  // console.log('appealParm', appealParm);

  Appeal(appealParm).then((data) => {
    // console.log('data', data);
    if (data instanceof Array && data.length == 0 && (data as any).code != 0) return;
    showToast('提交成功！');
    showAppeal.value = false;
    // coinsellcommentadd({orderid:BuyOrderDetail.value.order_id,ctype:'1',msg:message.value,img:fileList.value})
    coinsellcommentlist({ orderid: BuyOrderDetail.value.order_id, ctype: '1' }).then((data) => {
      if (data instanceof Array && data.length == 0 && (data as any).code != 0) return showToast('申诉列表获取异常');
      viewCoinsellcommentlist.value = data;
    })
  })
}

const confirmDeal = () => {
  if (integral.value <= 0) return showToast('请选择评分数量！！');
  if (!((seller.value && !!!BuyOrderDetail.value.seller_star) || (!seller.value && !!!BuyOrderDetail.value.buyer_star))) return processActive.value = 3;
  SetStar({ buy_order_id: BuyOrderDetail.value.order_id, star: Number(integral.value) }).then((data: any) => {
    console.log('data', (data as any).code);
    if (data instanceof Array && data.length == 0 && (data as any).code != 0) return;
    setTimeout(() => { getBuyOrderDetail(BuyOrderDetail.value.order_id); }, 500)
    // processActive.value = 3;
    // history.go(-1);
  })
}


const onClickLeft = () => {
  history.go(-1)
};
const Goprocess = (active: any) => {
  // processActive.value = active
}
</script>

<style lang="scss" src="./orderCreate.scss" scoped />
<style lang="scss" scoped>
$spriteHome: '@/assets/images/sprites-home.png';
$sprite-computed-factor: 0.7;
$sprite-home-background-size: calc(108px * 7 / 10) calc(730px * 7 / 10);

.copy {
  background: url($spriteHome) calc(-0px * $sprite-computed-factor) calc(-616px * $sprite-computed-factor) no-repeat;
  width: calc(35px * $sprite-computed-factor);
  height: calc(35px * $sprite-computed-factor);
  background-size: $sprite-home-background-size;
}

.copy:before {
  display: none;
}
</style>
