<template>
  <div class="nav-bar-container">
    <nav-bar
      title="积分明细"
      mode="blue"
    />
  </div>

  <div class="point-details-container">
    <div class="top-container flex flex-col items-center justify-center">
      <div class="balance-text">余额</div>
      <div class="balance-content">
        <span class="amount">{{ balance.toFixed(2) }}</span>
        <span>积分</span>
      </div>
    </div>

    <div class="point-details-list-container">
      <pull-refresh
        :loading="isLoading"
        @refresh="getFundingDetailsData"
      >
        <user-money-details :data="pointDetailsData" />
      </pull-refresh>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { IMoneyDetailsItem } from '@/store/types/coin'
import { useUserStore } from '@/store/modules/user'
import { getMoneyDetailsApi } from '@/apis/user'
import { useAppBar } from '@/components/AppBar/useAppBar'

useAppBar({ mode: 'dark', top: 42 })
const balance = ref(0)
type TIMoneyDetailsItem = Partial<IMoneyDetailsItem>
const pointDetailsData = ref<TIMoneyDetailsItem[]>([])

// loading状态
const isLoading = ref(false)

const userStore = useUserStore()
const { getAllMType } = userStore

const getFundingDetailsData = async () => {
  try {
    isLoading.value = true
    const res = await getMoneyDetailsApi({
      mtype: '20'
    })

    window.log('积分明细', res)

    if (res?.data?.length) {
      pointDetailsData.value = res.data
      balance.value = +(res.data[0]?.money_cash ?? '0')
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // 获取所有mtype
  // getAllMType({})
  getFundingDetailsData()
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';

.nav-bar-container {
  width: 100%;
  height: 90px;
}
.point-details-container {
  width: 100%;
  height: calc(100% - 90px);
  .top-container {
    height: 175px;
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
  }

  .point-details-list-container {
    width: 100%;
    height: calc(100% - 175px);
  }
}
</style>
