<template>
  <div class="cionBuy">
    <nav-bar title="自选买币" mode="white" />
    <div class="content">
      <div class="sell_c clearfix">
        <div class='left pic'>
          <van-image class="credit" :src="photo" />
          <span class="userName van-ellipsis">{{ data.nickname }}</span>
        </div>
        <div class='right s_amount'>
          {{ data.remaining_num }} <span> GDB</span>
        </div>
      </div>
      <QuickCoins :sellData="data"></QuickCoins>
    </div>
  </div>
</template>

<script setup lang="ts">
import { requireImg } from '@/utils/tools'
import { onUnmounted, watch, ref, onMounted, computed } from 'vue'
import QuickCoins from './components/QuickCoins.vue'
// import mitt from '@/utils/mitt';
// import router from '@/router';
import { useRoute } from 'vue-router';
import { useEntryStore } from '@/store/modules/entry';
import { storeToRefs } from 'pinia'

const EntryStore = useEntryStore()
const { config } = storeToRefs(EntryStore)
const imgserver_url = computed(() => {
  // console.log('(imgserver_url',(config.value.Web_Set_DefaultInfo?.imgserver_url as any)?.v);
  return (config.value.Web_Set_DefaultInfo?.imgserver_url as any).v || '';
});
const route = useRoute();
const data = ref({
  nickname: '',
  headimg: '',
  remaining_num: ''
})
const { query } = route;
data.value = query.data ? JSON.parse(query.data as string) : {};
data.value.remaining_num && (data.value.remaining_num = (+data.value.remaining_num).toFixed(2));
// console.log('data',data.value);
onMounted(() => {
})

const photo = computed(() => {
  // console.log('imgserver_url', data.value);
  // console.log('V.headimg',imgserver_url + data.value.headimg);
  return imgserver_url.value + data.value.headimg
})


const onClickLeft = () => {
  // mitt.emit('buy_active', 1);
  history.go(-1);
}
</script>

<style lang="scss" src="./buy.scss" scoped />
<style lang="scss" scoped>
.sell_c {
  width: 100%;
  padding: 25px 0 0;

  .pic {
    width: 50%;

    .van-image {
      width: 67.4px;
      height: 67.4px;
      border-radius: 13.9px;
      overflow: hidden;
    }

    .userName {
      font-family: MicrosoftYaHei;
      font-size: 22.2px;
      font-weight: 400;
      font-stretch: normal;
      line-height: 26.7px;
      letter-spacing: 0px;
      color: #13161b;
      margin-left: 10px;
      vertical-align: super;
    }
  }

  .s_amount {
    font-family: MicrosoftYaHei;
    font-size: 22.2px;
    font-weight: 400;
    font-stretch: normal;
    line-height: 90px;
    letter-spacing: 0px;
    color: #13161b;
    margin-left: 10px;
  }
}
</style>

