<script setup lang="ts">
import { articleListApi } from '@/apis/article'
import { buySellCoinInfoApi, myBuyOrdersApi, mySellOrdersApi } from '@/apis/buySellCoin'
import { useAuthStore } from '@/store/modules/auth'
import { IArticleListType } from '@/store/types/article'
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import OrderView from '@/components/Home/OrderView.vue'
import { IBuyOrder, ISellOrder } from '@/store/types/buySellCoin'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'

const authStore = useAuthStore()
const { userInfo, token } = storeToRefs(authStore)
const router = useRouter()

const coinBuySellStore = useCoinBuySellStore()
const { dealInfo } = storeToRefs(coinBuySellStore)

const buyOrderList = computed(() => dealInfo.value.buy_orders)
const sellOrderList = computed(() => dealInfo.value.sell_orders)

onMounted(() => {
  //
})
</script>

<template>
  <div class="pending-order-container">
    <div class="header flex justify-between items-center">
      <div>我的挂单</div>
    </div>
    <OrderView
      title="买币"
      :list="buyOrderList"
    />
    <OrderView
      title="卖币"
      :list="sellOrderList"
      :sell="true"
    />
  </div>
</template>

<style lang="scss" scoped>
.pending-order-container {
  width: 100%;
  margin-top: 15px;
  background-color: #fff;
  border-radius: 14px;
  .header {
    height: 76px;
    padding-left: 13px;
    font-size: 28px;
    color: #13161b;
    .go-banzhuan {
      padding: 8px 15px;
      color: #fff;
      background-color: #ffa800;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      white-space: nowrap;
      .icon-banzhuan {
        margin-right: 10px;
      }
    }
  }
}
</style>
