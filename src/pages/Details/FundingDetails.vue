<template>
  <div class="nav-bar">
    <nav-bar title="资金明细" />
  </div>

  <div class="funding-details-container">
    <div class="top-container flex flex-col items-center justify-center">
      <Balance
        :money="{
          coinCash: Number(getUserMoneyByMType(1)?.available_coincash ?? '0').toTruncFixed(3),
          canSale: canSaleAmount as unknown as number,
          notSale: notSaleAmount as unknown as number
        }"
      />
    </div>

    <div class="funding-details-list-container">
      <pull-refresh
        :loading="isLoading"
        @refresh="getFundingDetailsData"
      >
        <user-money-details
          v-show="!isLoading"
          :data="fundingDetailsData"
        />
      </pull-refresh>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { IMoneyDetailsItem } from '@/store/types/coin'
import { getMoneyDetailsApi } from '@/apis/user'
import Balance from '@/components/Home/Balance.vue'
import { useAuthStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useAppBar } from '@/components/AppBar/useAppBar'
import currency from 'currency.js'

useAppBar({ mode: 'dark', top: 42 })
const authStore = useAuthStore()
const { getUserMoneyByMType, getFreezeMoney, userInfo } = storeToRefs(authStore)

type TIMoneyDetailsItem = Partial<IMoneyDetailsItem>
const fundingDetailsData = ref<TIMoneyDetailsItem[]>([])

// loading状态
const isLoading = ref(false)

// 可售金额
const canSaleAmount = computed(() => {
  const coinCash = +(getUserMoneyByMType.value(1)?.available_coincash ?? 0)
  const freeSellAmount = +userInfo.value.freesell_amount

  if (freeSellAmount > coinCash) return currency(coinCash)
  return currency(freeSellAmount)
})

// 不可售金额
const notSaleAmount = computed(() => {
  const coinCash = +(getUserMoneyByMType.value(1)?.available_coincash ?? 0)

  return currency(coinCash).subtract(canSaleAmount.value)
})

const getFundingDetailsData = async () => {
  try {
    isLoading.value = true
    const res = await getMoneyDetailsApi({
      mtype: '1'
    })

    window.log('资金明细', res)

    if (res?.data?.length) {
      fundingDetailsData.value = res.data
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getFundingDetailsData()
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';

.funding-details-container {
  width: 100%;
  height: calc(100% - 120px);
  .top-container {
    height: 184px;
    // padding: 20px 0 29px 0;
    background-color: #0b75ff;
    .balance-text {
      color: #94c3ff;
      font-size: 33px;
    }
    .balance-content {
      color: #fff;
      font-size: 49px;
      .amount {
        margin-right: 17px;
        font-weight: bold;
      }
    }

    :deep(.balance-container) {
      // height: 95px;
      // padding: 0 113px 0 74px;
      // padding-left: 50px;
      // padding-right: 15px;
      padding: 0 15px;
      .balance-content {
        width: 100%;
        height: 100%;
      }
      .balance-content3 {
        padding-right: 15px;
      }
      .coin-cash-container {
        padding: 0;
        justify-content: center;
      }
      .coin-cash-container,
      .title {
        color: #94c3ff;
      }
      .balance-value,
      .amount {
        color: #fff;
      }
    }
  }

  .funding-details-list-container {
    width: 100%;
    height: calc(100% - 184px);
  }
}
</style>
