<template>
  <div class="cionBuy">
    <nav-bar title="买币" mode="blue" class="nav-bar" />

<!--    <van-nav-bar title="买币" left-arrow @click-left="onClickLeft" />-->
    <div class="content">
      <van-tabs v-model:active="active" :class="active == 1 ? 'active' : ''">
        <van-tab title="快捷买币">
          <QuickCoins :sellData="{}"></QuickCoins>
        </van-tab>
        <van-tab title="自选买币">
          <SelfSelect></SelfSelect>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth'
import { storeToRefs } from 'pinia';
import { onUnmounted, watch, ref, onMounted } from 'vue'
import QuickCoins from './components/QuickCoins.vue'
import SelfSelect from './components/SelfSelect.vue'
// import mitt from '@/utils/mitt';
import { useRoute } from 'vue-router';
import  router from '@/router'
import { useAppBar } from "@/components/AppBar/useAppBar";

useAppBar({ mode: 'dark' })
const route = useRoute();
const active = ref(0);
const onClickLeft = () => history.go(-1);
watch(active,(newV)=>{
  // console.log('newV',newV);
  const {query}= route;
  newV==0&&query.active?router.replace('/buyCoin'):router.replace('/buyCoin?active=1');
})
onMounted(() => {
  const {query}= route;
  active.value=query.active?parseInt(query.active as string):0;
})
onUnmounted(()=>{
  // mitt.off('buy_active')
})
</script>

<style lang="scss" src="./buy.scss" scoped />
