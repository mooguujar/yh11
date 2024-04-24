<script setup lang="ts">
import { IAccountVIP, IVipAwardReceiveParams, vipAwardReceiveApi } from '@/apis/user'
import info from '@/assets/images/common/info.png'
import success from '@/assets/images/common/success.png'
import warning from '@/assets/images/common/warning.png'
import { useArticleStore } from '@/store/modules/article'
import { useCommonStore } from '@/store/modules/common'
import { useUserStore } from '@/store/modules/user'
import mitt from '@/utils/mitt'
import { formatMoneyUnit, mergeHrefParams, requireImg } from '@/utils/tools'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { VxeColumnPropTypes, VxeTableInstance } from 'vxe-table'

const search = new URLSearchParams(mergeHrefParams())

const router = useRouter()

const userStore = useUserStore()
const { vipAward } = storeToRefs(userStore)

const commonStore = useCommonStore()
const { getShowLoading } = storeToRefs(commonStore)

const articleStore = useArticleStore()
const { getArticleListApi } = articleStore

const tableRef = ref<VxeTableInstance<IAccountVIP>>()
const swiper = ref()

// vip等级表格弹窗
const vipSheetShow = ref(false)
// 当前所在vip权益下标
const currVipRightsIndex = ref(0)
// vip弹窗内容
const vipAwardContent = ref('')

// 弹窗表格数据
const tableData = computed(() => {
  const _data = []
  for (let item of vipAward.value.account_vip) {
    if (item.vip_code === 0) {
      _data.push({
        ...item,
        promotion_flow: 0,
        week_flow: 0,
        month_flow: 0
      })
      continue
    }
    _data.push({
      ...item,
      promotion_flow: `<div class='flex flex-col justify-center items-center gap-[12px]'><span>${formatMoneyUnit(
        +item.vip_award,
        1
      )}/</span><span>${formatMoneyUnit(+item.pay_deposit, 1)}</span></div>`,
      week_flow: `<div class='flex flex-col justify-center items-center gap-[12px]'><span>${formatMoneyUnit(
        +item.week_award,
        1
      )}/</span><span>${formatMoneyUnit(+item.week_cycle_pay, 1)}</span></div>`,
      month_flow: `<div class='flex flex-col justify-center items-center gap-[12px]'><span>${formatMoneyUnit(
        +item.month_award,
        1
      )}/</span><span>${formatMoneyUnit(+item.month_cycle_pay, 1)}</span></div>`
    })
  }
  return _data
})
// 从前一个等级开始
const vipRightsList = computed(() => {
  return vipAward.value.account_vip.filter(item => item.vip_code >= 1)
})
// 下一等级流水金额
const nextLevelMoney = computed(() =>
  parseInt(
    vipAward.value.account_vip[vipAward.value.vip + 1]?.pay_deposit ??
      vipAward.value.account_vip[vipAward.value.vip]?.pay_deposit ??
      0
  )
)
// 到达下一等级百分比
const vipProgress = computed(() => {
  const nextLevelMoney =
    vipAward.value.account_vip[vipAward.value.vip + 1]?.pay_deposit ??
    vipAward.value.account_vip[vipAward.value.vip]?.pay_deposit

  return (vipAward.value.all_money / +nextLevelMoney) * 100
})
// vip最高等级
const vipMaxLevel = computed(
  () => vipAward.value.account_vip[vipAward.value.account_vip.length - 1]?.vip_code ?? 0
)
// vip权益数据
const vipRights = computed(() => {
  return {
    bonus: {
      name: '晋级彩金',
      money: vipRightsList.value[currVipRightsIndex.value].vip_award,
      unit: '元',
      status: vipRightsList.value[currVipRightsIndex.value].is_get_vip_award
    },
    weekBonus: {
      name: '周礼金',
      money: vipRightsList.value[currVipRightsIndex.value].week_award,
      unit: '元',
      status: vipRightsList.value[currVipRightsIndex.value].is_get_week_award
    },
    monthBonus: {
      name: '月礼金',
      money: vipRightsList.value[currVipRightsIndex.value].month_award,
      unit: '元',
      status: vipRightsList.value[currVipRightsIndex.value].is_get_month_award
    }
  }
})
const vipStatus = computed(() => {
  const currVipCode = vipRightsList.value[currVipRightsIndex.value]?.vip_code ?? 0
  if (currVipCode < vipAward.value.vip)
    return {
      style: 'from-[#c9c4f9] to-[#888aff] text-[#fdf3e3]',
      label: '已升级'
    }
  if (currVipCode === vipAward.value.vip)
    return {
      style: 'from-[#f9e8c6] to-[#ffc986] text-[#cb3b3b]',
      label: '当前等级'
    }
  return {
    style: 'from-[#f9ccc6] to-[#ff8787] text-[#c25705]',
    label: '待升级'
  }
})
// 领取vip等级对应奖励所需流水
const requireFlow = computed(() => {
  const isCurrVipCode =
    vipRightsList.value[currVipRightsIndex.value].vip_code === vipAward.value.vip
  const vipData = vipRightsList.value?.[currVipRightsIndex.value] ?? {}
  const _vipAward = +(vipData?.pay_deposit ?? 0) - vipAward.value.all_money
  const _weekAward = isCurrVipCode
    ? +(vipData?.week_cycle_pay ?? 0) - vipAward.value.week_money
    : +(vipData?.week_cycle_pay ?? 0)
  const _monthAward = isCurrVipCode
    ? +(vipData?.month_cycle_pay ?? 0) - vipAward.value.month_money
    : +(vipData?.month_cycle_pay ?? 0)

  return {
    vipAward: _vipAward,
    weekAward: _weekAward,
    monthAward: _monthAward
  }
})

// vip权益领取状态枚举表
const enum VipRightsStatusEnum {
  // 0 不可领取
  UNAVAILABLE = 0,
  // 1 已领取
  CLAIMED = 1,
  // 2 可领但未达标
  AVAILABLE_BUT_NOT_MET = 2,
  // 3 可领取
  AVAILABLE = 3
}
// 具体权益数据
const currRights = (type: keyof typeof vipRights.value) => {
  let statusText: string
  let bg: string

  if (+vipRights.value[type].money === 0) {
    statusText = '暂不可领取'
    bg = 'bg-[#828282]'
  } else if (vipRights.value[type].status === VipRightsStatusEnum.AVAILABLE) {
    statusText = '领取'
    bg = 'bg-[#cc9f37]'
  } else if (vipRights.value[type].status === VipRightsStatusEnum.CLAIMED) {
    statusText = '已领取'
    bg = 'bg-[#e9ce9a] opacity-[.5]'
  } else {
    statusText =
      vipRightsList.value[currVipRightsIndex.value].vip_code < vipAward.value.vip
        ? '已过期'
        : '暂不可领取'
    bg = 'bg-[#828282]'
  }

  return {
    bg,
    statusText
  }
}

// 当前vip所在表格行高亮
watch(vipSheetShow, (val, oldVal) => {
  if (val) {
    selectRowEvent()
  }
})

// 表格高亮行
const selectRowEvent = () => {
  const $table = tableRef.value
  if ($table) {
    const index = tableData.value.findIndex(item => item.vip_code === vipAward.value.vip)
    $table.setCurrentRow(tableData.value[index])
  }
}

// 领取VIP彩金
const vipAwardReceive = async (
  type: keyof typeof vipRights.value,
  params: IVipAwardReceiveParams
) => {
  try {
    if (vipRights.value[type].status === VipRightsStatusEnum.CLAIMED) {
      return showToast({
        message: '已领取',
        icon: info,
        iconSize: '48px'
      })
    }
    if (
      vipRightsList.value[currVipRightsIndex.value].vip_code < vipAward.value.vip &&
      type !== 'bonus'
    ) {
      return showToast({
        message: '已过期',
        icon: warning,
        iconSize: '48px'
      })
    }
    if (
      vipRights.value[type].status !== VipRightsStatusEnum.AVAILABLE ||
      +vipRights.value[type].money === 0
    ) {
      return showToast({
        message: '暂不可领取',
        icon: warning,
        iconSize: '48px'
      })
    }
    const res = await vipAwardReceiveApi(params)

    // window.log('领取vip权益奖励', res)
    if (res.code === 0) {
      showToast({
        message: '领取成功',
        icon: success,
        iconSize: '48px'
      })
      // 更新vip信息
      userStore.getVipaward()
    }
  } catch (error) {
    console.error(error)
  }
}
// 签到
const handleCheckInPoint = () => {
  showToast({
    message: '请前往会员积分页面进行签到！',
    icon: info,
    iconSize: '48px'
  })
}
// vip权益下标更新
const onSwiperChange = (index: number) => {
  currVipRightsIndex.value = index
}
// 签到积分倍率
const formatterRatio: VxeColumnPropTypes.Formatter<IAccountVIP> = ({ cellValue }) => {
  return 1 + +cellValue
}
// 滑动到当前会员vip权益
const swipeToVipRights = () => {
  const index = vipRightsList.value.findIndex(item => item.vip_code === vipAward.value.vip)
  if (index === -1) return
  swiper.value.swipeTo(index)
}
// 获取vip弹窗数据
const getVipAwardContent = async () => {
  try {
    const res = await getArticleListApi({
      bind_key: 'VipAward'
    })
    if (res?.[0]?.content) {
      vipAwardContent.value = res[0].content
    }
  } catch (error) {
    console.error(error)
  }
}
// vip信息
const getVipData = () => {
  commonStore.setShowLoading(true)
  userStore.getVipaward().then(() => {
    commonStore.setShowLoading(false)
    swipeToVipRights()
  })
}

onMounted(() => {
  getVipData()
  getVipAwardContent()
  mitt.emit('action-sheet-show')
})
</script>

<template>
  <div class="vip w-full h-[100%] bg-[#eaeff6] flex flex-col">
    <nav-bar
      v-if="!search.get('appinweb')"
      title="会员权益"
      mode="blue"
      :hideLeft="false"
      gopath="/mine"
    />
    <div
      v-if="!search.get('appinweb')"
      class="blue-bg w-full h-[30px] bg-[var(--van-button-primary-background)]"
    ></div>
    <div
      class="bg-[#eaeff6] pt-[11px] pb-[30px] px-[20px] rounded-t-[15px] flex-1 safe-area-inset-bottom overflow-y-auto"
      :class="{ 'mt-[-30px]': !search.get('appinweb') }"
    >
      <div
        :class="[
          'card-vip' + vipAward.vip,
          'flex flex-col justify-between pt-[40px] pl-[32px] pr-[27px] pb-[17px]'
        ]"
      >
        <div class="text-[21px]">当前等级</div>
        <div class="text-[65px] font-bold skew-x-[-12deg]">VIP{{ vipAward.vip }}</div>
        <div class="flex justify-between items-center">
          <div :class="['bg-vip' + vipAward.vip, 'flex justify-end items-center pr-[8px]']">
            <div class="text-[17px] text-[#fff] font-bold w-[21px] text-center">
              {{ vipAward.vip }}
            </div>
          </div>
          <div class="flex flex-col justify-between items-center mx-[10px]">
            <div class="text-[21px] text-[#7f7e7d]">
              <span class="mr-[10px]">已上分流水:</span>
              <span class="text-[#d81e06]">{{ (+vipAward.all_money).toTruncFixed(0) }}</span>
              <span>/{{ formatMoneyUnit(nextLevelMoney, 1) }}</span>
            </div>
            <van-progress
              pivot-text=""
              pivot-color="#fdf8e0"
              track-color="rgba(41, 40, 40, 0.52)"
              :percentage="vipProgress"
              stroke-width="10"
            />
            <div
              class="text-[21px]"
              :class="{ invisible: vipAward.vip === vipMaxLevel }"
            >
              <span class="text-[#7f7e7d]">
                还需
                <span class="text-[#d81e06]">{{ +nextLevelMoney - vipAward.all_money }}</span>
                上分流水升级到
              </span>
              <span>VIP{{ vipAward.vip + 1 }}</span>
            </div>
          </div>
          <div
            :class="[
              'bg-vip' + (vipAward.vip + 1),
              'flex justify-end items-center pr-[8px]',
              { invisible: vipAward.vip === vipMaxLevel }
            ]"
          >
            <div class="text-[17px] text-[#fff] font-bold w-[21px] text-center">
              {{ vipAward.vip + 1 }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="vip-rights mt-[19px] bg-gradient-to-b from-[#fdf4e5] to-[#f7e2c5] rounded-[14px] relative"
      >
        <div
          class="absolute left-0 top-0 w-[358px] h-[421px] bg-[url('@/assets/images/mine/vip/bg-vip-rights.png')] bg-center bg-[length:100%_100%]"
        ></div>
        <div class="px-[14px] relative">
          <div
            class="title-container flex justify-between items-baseline pl-[34px] pr-[20px] pt-[30px] pb-[20px]"
          >
            <div class="flex items-baseline gap-[24px] text-[#cf0101]">
              <div class="text-[66px] font-bold">
                VIP{{ vipRightsList[currVipRightsIndex]?.vip_code }}
              </div>
              <div class="text-[33px]">专属权益</div>
            </div>
            <div
              :class="[
                vipStatus.style,
                'w-[167px] h-[52px] rounded-[26px] text-[25px] bg-gradient-to-b flex justify-center items-center self-center'
              ]"
            >
              {{ vipStatus.label }}
            </div>
          </div>
        </div>
        <div class="h-[824px] px-[53px] py-[25px] relative">
          <van-swipe
            ref="swiper"
            class="my-swipe"
            :loop="false"
            :touchable="false"
            :show-indicators="false"
            @change="onSwiperChange"
          >
            <van-swipe-item
              v-for="item in vipRightsList"
              :key="item.id"
            >
              <div class="flex flex-col gap-y-[30px] py-[12px]">
                <div class="flex gap-x-[22px] relative">
                  <div
                    :class="[
                      'item-rights flex flex-col justify-between w-[288px] h-[360px] pt-[17px] pb-[26px]',
                      'bg-gradient-to-b from-[#fffefc] to-[#fef3ed] rounded-[14px] relative'
                    ]"
                  >
                    <div class="flex justify-between">
                      <img
                        class="w-[128px] h-[114px] mt-[-36px]"
                        :src="requireImg('mine/vip/icon-vip-award.png')"
                      />
                      <div class="mx-[auto] text-[31px] text-[#723d1d] font-bold">晋级彩金</div>
                    </div>
                    <div
                      v-if="
                        requireFlow.vipAward > 0 &&
                        item.is_get_vip_award !== VipRightsStatusEnum.CLAIMED &&
                        item.vip_code >= vipAward.vip
                      "
                      class="text-[24px] text-[#723d1d] self-center absolute top-[95px] left-[50%] translate-x-[-50%] whitespace-nowrap"
                    >
                      领取还需{{ formatMoneyUnit(requireFlow.vipAward, 1) }}流水
                    </div>
                    <div
                      class="flex justify-center items-baseline text-[42px] text-[#f15d07] mb-[44px] mt-[auto]"
                    >
                      ¥
                      <span class="ml-[14px] text-[61px] font-bold">
                        {{ (+item.vip_award).toTruncFixed(0) }}
                      </span>
                    </div>
                    <div
                      class="w-[205px] h-[66px] flex justify-center items-center rounded-[14px] text-[28px] text-[#fff] self-center"
                      :class="currRights('bonus').bg"
                      @click="vipAwardReceive('bonus', { vip: item.vip_code, type: 'vip_award' })"
                    >
                      {{ currRights('bonus').statusText }}
                    </div>
                  </div>
                  <div
                    :class="[
                      'item-rights flex flex-col justify-between w-[288px] h-[360px] pt-[17px] pb-[26px]',
                      'bg-gradient-to-b from-[#fffefc] to-[#fef3ed] rounded-[14px] relative'
                    ]"
                  >
                    <div class="flex justify-between">
                      <img
                        class="w-[126px] h-[76px] mt-[-26px]"
                        :src="requireImg('mine/vip/icon-week-award.png')"
                      />
                      <div class="mx-[auto] text-[31px] text-[#723d1d] font-bold">周礼金</div>
                    </div>
                    <div
                      v-if="
                        requireFlow.weekAward > 0 &&
                        item.is_get_week_award !== VipRightsStatusEnum.CLAIMED &&
                        item.vip_code >= vipAward.vip
                      "
                      class="text-[24px] text-[#723d1d] self-center absolute top-[95px] left-[50%] translate-x-[-50%] whitespace-nowrap"
                    >
                      领取还需{{ formatMoneyUnit(requireFlow.weekAward, 1) }}流水
                    </div>
                    <div
                      class="flex justify-center items-baseline text-[42px] text-[#f15d07] mb-[44px] mt-[auto]"
                    >
                      ¥
                      <span class="ml-[14px] text-[61px] font-bold">
                        {{ (+item.week_award).toTruncFixed(0) }}
                      </span>
                    </div>
                    <div
                      class="w-[205px] h-[66px] flex justify-center items-center rounded-[14px] text-[28px] text-[#fff] self-center"
                      :class="currRights('weekBonus').bg"
                      @click="
                        vipAwardReceive('weekBonus', { vip: item.vip_code, type: 'week_award' })
                      "
                    >
                      {{ currRights('weekBonus').statusText }}
                    </div>
                  </div>
                </div>
                <div class="flex gap-x-[22px] relative">
                  <div
                    :class="[
                      'item-rights flex flex-col justify-between w-[288px] h-[360px] pt-[17px] pb-[26px]',
                      'bg-gradient-to-b from-[#fffefc] to-[#fef3ed] rounded-[14px] relative'
                    ]"
                  >
                    <div class="flex justify-between">
                      <img
                        class="w-[147px] h-[105px] mt-[-36px]"
                        :src="requireImg('mine/vip/icon-month-award.png')"
                      />
                      <div class="mx-[auto] text-[31px] text-[#723d1d] font-bold">月礼金</div>
                    </div>
                    <div
                      v-if="
                        requireFlow.monthAward > 0 &&
                        item.is_get_month_award !== VipRightsStatusEnum.CLAIMED &&
                        item.vip_code >= vipAward.vip
                      "
                      class="text-[24px] text-[#723d1d] self-center absolute top-[95px] left-[50%] translate-x-[-50%] whitespace-nowrap"
                    >
                      领取还需{{ formatMoneyUnit(requireFlow.monthAward, 1) }}流水
                    </div>
                    <div
                      class="flex justify-center items-baseline text-[42px] text-[#f15d07] mb-[44px] mt-[auto]"
                    >
                      ¥
                      <span class="ml-[14px] text-[61px] font-bold">
                        {{ (+item.month_award).toTruncFixed(0) }}
                      </span>
                    </div>
                    <div
                      class="w-[205px] h-[66px] flex justify-center items-center rounded-[14px] text-[28px] text-[#fff] self-center"
                      :class="currRights('monthBonus').bg"
                      @click="
                        vipAwardReceive('monthBonus', { vip: item.vip_code, type: 'month_award' })
                      "
                    >
                      {{ currRights('monthBonus').statusText }}
                    </div>
                  </div>
                  <div
                    class="bg-[url('@/assets/images/mine/vip/bg-point-ratio.png')] bg-center bg-[length:100%_100%]"
                    :class="[
                      'item-rights flex flex-col justify-between w-[288px] h-[360px] pt-[17px] pb-[26px] rounded-[14px]'
                    ]"
                    @click="handleCheckInPoint"
                  >
                    <div class="flex justify-between">
                      <img
                        class="w-[97px] h-[106px] mt-[-30px] ml-[18px]"
                        :src="requireImg('mine/vip/icon-point-ratio.png')"
                      />
                      <div
                        class="flex flex-col mx-[auto] text-[31px] text-[#723d1d] font-bold text-center mt-[-8px] leading-[36px]"
                      >
                        <div>签到</div>
                        <div>积分倍数</div>
                      </div>
                    </div>
                    <div
                      class="flex justify-center items-baseline text-[42px] text-[#f15d07] mt-[auto] mb-[110px]"
                    >
                      <span class="mr-[14px] text-[61px] font-bold">
                        {{ 1 + +item.integral_ratio }}
                      </span>
                      倍
                    </div>
                  </div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
          <img
            v-show="currVipRightsIndex !== 0"
            :src="requireImg('mine/vip/arrow-left.png')"
            class="w-[69px] h-[69px] absolute top-[50%] left-[-15px] translate-y-[-50%]"
            @click="swiper.prev"
          />
          <img
            v-show="currVipRightsIndex !== vipRightsList.length - 1"
            :src="requireImg('mine/vip/arrow-left.png')"
            class="w-[69px] h-[69px] absolute top-[50%] right-[-15px] translate-y-[-50%] rotate-180"
            @click="swiper.next"
          />
        </div>
      </div>
      <div
        class="btn-goto flex justify-center items-center w-full h-[72px] text-[28px] text-[#c25705] rounded-[14px] mt-[25px]"
        @click="vipSheetShow = true"
      >
        点击查看VIP详情
      </div>
      <div class="mt-[20px] text-[24px] text-[#c9b39b] text-center">
        <span class="mr-[10px]">温馨提示:</span>
        <span>数据统计有5分钟的延迟</span>
      </div>
    </div>

    <van-action-sheet
      v-model:show="vipSheetShow"
      title="会员权益"
      class="!w-[750px] full-w-sheet"
      :lazy-render="false"
    >
      <vxe-table
        ref="tableRef"
        border="inner"
        auto-resize
        show-overflow
        width="auto"
        height="auto"
        min-height="434"
        max-height="434"
        :column-config="{ useKey: true, resizable: true }"
        :row-config="{ useKey: true, isCurrent: true, height: 35 }"
        :data="tableData"
      >
        <vxe-column
          field="vip_name"
          title="等级"
        ></vxe-column>
        <vxe-column
          field="promotion_flow"
          title="<div class='flex flex-col justify-center items-center h-[73px] gap-[12px]'><span>晋级礼金/</span><span>流水要求</span></div>"
          type="html"
        ></vxe-column>
        <vxe-column
          field="week_flow"
          title="<div class='flex flex-col justify-center items-center h-[73px] gap-[12px]'><span>周礼金/</span><span>流水要求</span></div>"
          type="html"
        ></vxe-column>
        <vxe-column
          field="month_flow"
          title="<div class='flex flex-col justify-center items-center h-[73px] gap-[12px]'><span>月礼金/</span><span>流水要求</span></div>"
          type="html"
        ></vxe-column>
        <vxe-column
          field="integral_ratio"
          title="<div class='flex flex-col justify-center items-center h-[73px] gap-[12px]'><span>签到</span><span>积分倍数</span></div>"
          type="html"
          :formatter="formatterRatio"
        ></vxe-column>
      </vxe-table>

      <div
        class="px-[20px] py-[30px] text-[25px] text-[#616263] flex flex-col"
        v-html="vipAwardContent"
      ></div>
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped>
$vips: (
  '0': #737373,
  '1-3': #654830,
  '4-6': #667090,
  '7-9': #c58a0e,
  '10-12': #4d8747,
  '13-15': #6e58d4,
  '16-18': #c851b1,
  '19-20': #e65a2c
);
// @each $vip, $color in $vips {
//   .card-vip#{$vip} {
//     width: 708px;
//     height: 248px;
//     background: url('@/assets/images/mine/vip/bgvip#{$vip}.png') center / cover no-repeat;
//     background-size: 100% 100%;
//     color: $color;
//   }
//   .bg-vip#{$vip} {
//     width: 110px;
//     height: 27px;
//     background: url('@/assets/images/mine/vip/vip#{$vip}.png') center / cover no-repeat;
//     background-size: 100% 100%;
//   }
// }
@mixin vipRange($vip, $path) {
  @if ($vip == 0) {
    background-image: url('@/assets/images/mine/vip/#{$path}0.png');
  } @else if ($vip < 4) {
    background-image: url('@/assets/images/mine/vip/#{$path}1-3.png');
  } @else if ($vip < 7) {
    background-image: url('@/assets/images/mine/vip/#{$path}4-6.png');
  } @else if ($vip < 10) {
    background-image: url('@/assets/images/mine/vip/#{$path}7-9.png');
  } @else if ($vip < 13) {
    background-image: url('@/assets/images/mine/vip/#{$path}10-12.png');
  } @else if ($vip < 16) {
    background-image: url('@/assets/images/mine/vip/#{$path}13-15.png');
  } @else if ($vip < 19) {
    background-image: url('@/assets/images/mine/vip/#{$path}16-18.png');
  } @else {
    background-image: url('@/assets/images/mine/vip/#{$path}19-20.png');
  }

  @if ($path == 'bgvip') {
    @if ($vip == 0) {
      color: #737373;
    } @else if ($vip < 4) {
      color: #654830;
    } @else if ($vip < 7) {
      color: #667090;
    } @else if ($vip < 10) {
      color: #c58a0e;
    } @else if ($vip < 13) {
      color: #4d8747;
    } @else if ($vip < 16) {
      color: #6e58d4;
    } @else if ($vip < 19) {
      color: #c851b1;
    } @else {
      color: #e65a2c;
    }
  }
}
@for $vip from 0 through 20 {
  .card-vip#{$vip} {
    width: 708px;
    height: auto;
    background: center / cover no-repeat;
    background-size: 100% 100%;
    @include vipRange($vip, 'bgvip');
  }
  .bg-vip#{$vip} {
    width: 110px;
    height: 27px;
    background: center / cover no-repeat;
    background-size: 100% 100%;
    @include vipRange($vip, 'vip');
  }
}

.vip {
  :deep(.van-progress) {
    width: 417px;
    margin: 8px 0 11px 0;
    .van-progress__portion {
      background-color: #fdf8e0;
    }
  }
  .title-container {
    border-bottom: 1px dashed #c9b39b;
  }
  .item-rights {
    box-shadow: 0px 5px 6px 0px rgba(252, 207, 149, 0.44);
  }
  [class*='text-stroke'] {
    position: relative;
    /* 设置描边宽度及颜色 */
    text-stroke: 2px rgba(159, 110, 62, 0.83);
    /* 兼容Webkit(Chrome/Safari)内核浏览器的写法 */
    -webkit-text-stroke: 2px rgba(159, 110, 62, 0.83);
    text-shadow: 0px 1px 7px rgba(159, 110, 62, 0.83);
    &::before {
      content: attr(data-content);
      position: absolute;
      // bottom: 0;
      /* 实现元素外描边的关键 */
      -webkit-text-stroke: 0;
      color: #fefdf9;
      font-size: 29px;
      font-weight: bold;
    }
    &.text-stroke-61 {
      &::before {
        font-size: 61px;
      }
    }
    &.text-stroke-unit {
      &::before {
        height: 34px;
        bottom: 0;
      }
    }
  }

  :deep(.van-swipe) {
    isolation: isolate;
    transform: translateZ(1px);
    .van-swipe-item {
      padding: 0 2px;
    }
  }
  .btn-goto {
    border: solid 3px rgba(194, 87, 5, 0.5);
  }

  :deep(.van-action-sheet) {
    max-height: 1140px;
  }

  :deep(.van-action-sheet__header) {
    font-size: 40px;
    color: #323334;
  }
  :deep(.vxe-table--render-default) {
    font-size: 25px;
    color: #616263;
    [class*='vxe-'] {
      text-align: center;
    }
    .vxe-table--header-wrapper {
      background-color: #b3b3b3;
      color: #323334;
    }
    .vxe-body--row.row--current {
      color: #e5e8ec;
      background-color: rgba(11, 116, 254, 0.85);
    }
    .vxe-body--column.col--ellipsis:not(.col--active) > .vxe-cell {
      overflow: unset;
    }
    .vxe-body--column {
      height: 70px !important;
    }
  }
}
</style>
