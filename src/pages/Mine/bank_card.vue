<template>
  <div class="bank-card w-100 bg-white">
    <nav-bar :title="bind_bank.account_bankname ? '银行卡信息' : '添加银行卡'" mode="white" />

    <div class="order-content p-[0px] bg-[#fff] flex items-center flex-wrap justify-center">
      <van-field v-model="account_bank_realname" label="姓名" placeholder="" label-align="top" disabled />
      <van-field v-model="bind_bank.account_bankname" label="银行名称" placeholder="" label-align="top" disabled
        v-if="bind_bank.account_bankname" />
      <div class="px-[30px] w-full mt-[15px]" v-if="!bind_bank.account_bankname">
        <div class="label text-black text-[28px] text-left mb-[12px] w-full">银行名称</div>
        <div class="w-full mb-[15px] h-[69px] border-none bg-[#ebf1f6] relative flex items-center pl-[12px] left-0"
          @click="isExpand = !isExpand">
          <div class="text-[24px] text-black" v-if="bank.bank_name">{{ bank.bank_name }}</div>
          <div class="text-[24px] text-[#787f8c]" v-else>点击选择银行</div>
          <div v-if="!isExpand" class="chervon-right absolute right-[20px] top-[27px] rotate-90"></div>
          <div v-if="isExpand" class="chervon-right absolute right-[20px] top-[27px] -rotate-90"></div>
          <div class="options bg-[#ebf1f6] absolute top-[75px] z-10 w-full h-[500px] overflow-scroll left-0"
            v-if="isExpand">
            <div class="text-[24px] flex p-[17px] items-center border-solid border-0 border-b border-[#999]"
              :key="bank.bank_code + index" v-for="(bank, index) in bankList" @click="seletBank(index)">
              {{ bank.bank_name }}
            </div>
          </div>
        </div>
      </div>
      <van-field v-model="coin_address" label="银行账号/卡号" placeholder="请输入银行账号/卡号" label-align="top"
        v-if="!bind_bank.coin_address" />
      <van-field v-model="bind_bank.coin_address" label="银行账号/卡号" placeholder="请输入银行账号/卡号" label-align="top"
        v-if="bind_bank.coin_address" disabled />
      <div class="bg-[#ebf1f6] rounded-[7px] w-full mx-[30px] mb-[40px] py-[26px] px-[17px] mt-[20px]"
        v-if="!bind_bank.coin_address">
        <div class="text-[25px] text-[#13161b]">特别提示</div>
        <div class="text-[22px] text-[#787f8c] mt-[10px] mb-[20px]">
          请确保添加您的银行卡号以进行即时收付款。请勿包含其他银行
          或付款方式的详细信息。您必须添加所选银行的付款/收款信息。
        </div>
      </div>
      <van-button size="large" color="#0b75ff" @click="handleConfirmDialog(true)">{{ bind_bank.coin_address ? '刪除' :
        '确认' }}</van-button>
      <van-dialog v-model:show="isConfirmDialog" title="身份验证" confirmButtonText="提交" theme="round-button"
        className="dialog-bulletin" @confirm="() => !bind_bank.coin_address ? addBank() : deleteBank()">
        <i class="icon-close close-dark block" @click="handleConfirmDialog(false)"></i>
        <div>
          <van-field v-model="pay_pass" placeholder="请输入支付密码" />
        </div>
      </van-dialog>
      <van-dialog v-model:show="isForceDialog" title="" confirmButtonText="确认" theme="round-button"
        className="dialog-bulletin" @confirm="() => {isForce = true; isConfirmDialog = true}" :showCancelButton="true" cancelButtonColor="#999"
        @cancel="handleForceDialog(false)">
        <i class="icon-close close-dark block" @click="handleForceDialog(false)"></i>
        <div>
          经检测您的卡号与姓名不符<br />
          是否仍继续提交银行卡信息？
        </div>
      </van-dialog>
    </div>
    <van-dialog v-model:show="dialogContent.show" :title="dialogContent.title" theme="round-button"
      :className="['dialog-deal']" :confirmButtonText="dialogContent.confirmButtonText" @confirm="onConfirm">
      <i class="icon-close block close-dark" @click="onClose"></i>
      <div class="flex flex-col items-center justify-between">
        <img :src="dialogContent.img" :class="!authStore?.userInfo.verified_status ? 'verifi-id' : 'add-card'" />
        <div class="content text-center">{{ dialogContent.content }}</div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store';
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'
import { bankListApi, addWithdrawAddressApi, deleteWithdrawAddressApi } from '@/apis/user'
import { showToast } from 'vant';
import info from '@/assets/images/common/info.png'
import success from '@/assets/images/common/success.png'

const router = useRouter();
const authStore = useAuthStore();

const coin = useCoinBuySellStore();
const { getWithdrawddresslist } = coin;

const showInfoToast = (title: string) => {
  return showToast({
    message: title,
    icon: info,
  });
};
const showSuceedToast = (title: string) => {
  return showToast({
    message: title,
    icon: success,
  });
};

interface bank {
  id: number
  bank_code: string
  bank_name: string
  status: number
  remark: string | null
  sort: number
  country_code: string
}

const bank = ref({})
const bankList = ref<bank[]>([]);
const account_bank_realname = ref(authStore?.userInfo?.name);
const coin_address = ref('')

const isExpand = ref(false)

const getBankList = async () => {
  try {
    const res = await bankListApi({
      country_code: authStore?.userInfo?.set_country_code
    })

    bankList.value = res
  } catch (error) {
    console.error(error)
  } finally {
  }
}

const seletBank = (index: number) => {
  bank.value = bankList.value[index]
}

const isConfirmDialog = ref(false);
const pay_pass = ref('');
const isLoading = ref(false)

const regBankCode = /^[0-9]{15,19}$/;
const regPayPass = /^[0-9]{6}$/;

const handleConfirmDialog = (open: boolean) => {
  if (authStore?.userInfo?.verified_status !== 1) {
    return showInfoToast('请先完成实名认证')
  }
  if (authStore?.userInfo?.is_set_paypassword !== 1) {
    return showInfoToast('请先设置支付密码')
  }
  if (!bind_bank.value.coin_address) {
    if (!bank?.value.bank_name) return showInfoToast('点击选择银行')
    if (!coin_address.value || !regBankCode.test(coin_address.value)) return showInfoToast('请输入15位-19位银行卡卡号')
    isConfirmDialog.value = open;
  } else {
    isConfirmDialog.value = open;
  }
}

const isForce = ref(false)
const isForceDialog = ref(false)
const handleForceDialog = (open: boolean) => {
  isForceDialog.value = open;
}

const addBank = async () => {
  if (isLoading.value) return
  if (authStore?.userInfo?.verified_status !== 1) {
    return showInfoToast('请先完成实名认证')
  }
  if (authStore?.userInfo?.is_set_paypassword !== 1) {
    return showInfoToast('请先设置支付密码')
  }
  if (!pay_pass.value || !regPayPass.test(pay_pass.value)) {
    pay_pass.value = ''
    return showInfoToast('请输入6位支付密码')
  }
  try {
    let req = {
      passwd: pay_pass.value,
      mtype: '1',
      coin_name: 'SYS',
      coin_protocol: 'BANK',
      coin_address: coin_address.value,
      account_bank_realname: account_bank_realname.value,
      account_bankname: bank?.value.bank_name,
      account_bankcode: bank?.value.bank_code,
      code_imgurl: '',
    }
    if (isForce.value) {
      req = {
        ...req,
        force: 1
      }
    }
    const res = await addWithdrawAddressApi(req)
    console.log(res, 'res')
    if (!res.code) {
      showSuceedToast('银行卡添加成功')
      await getWallets()
      setTimeout(() => {
        router.back()
      }, 1000);
    }

    if (res.code === 10040) {
      setTimeout(() => {
        router.push('/verify')
      }, 1000);
    }

    if (res.code === 10046) {
      isForceDialog.value = true
    }
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false;
    isConfirmDialog.value = false;
    pay_pass.value = '';
  }
}

const deleteBank = async () => {
  if (isLoading.value) return
  if (authStore?.userInfo?.verified_status !== 1) {
    return showInfoToast('请先完成实名认证')
  }
  if (!pay_pass.value || !regPayPass.test(pay_pass.value)) {
    pay_pass.value = ''
    return showInfoToast('请输入6位支付密码')
  }
  try {
    const res = await deleteWithdrawAddressApi({
      passwd: pay_pass.value,
      id: bind_bank.value?.id
    })
    if (!res.code) {
      showSuceedToast('银行卡刪除成功')
      await getWallets()
    }

    if (res.code === 10040) {
      setTimeout(() => {
        router.push('/verify')
      }, 1000);
    }


  } catch (e) {
    console.log(e)
  } finally {
    pay_pass.value = '';
    isLoading.value = false;
    isConfirmDialog.value = false;
  }
}

const bind_bank = ref({})
const getWallets = async () => {
  await getWithdrawddresslist({})
  const bind_list = coin.withdrawddresslist.filter(address => address.coin_protocol === 'BANK')
  if (bind_list.length > 0) {
    bind_bank.value = bind_list[0]
  } else {
    bind_bank.value = {}
  }
}

import verifyID from '@/assets/images/common/ID-verify.png'
import passIcon from '@/assets/images/common/key.png'
import { reactive } from 'vue';

const dialogContent = reactive({
  show: false,
  title: '',
  img: '',
  content: '',
  confirmButtonText: ''
})

const onClose = () => {
  dialogContent.show = false
}

const onConfirm = () => {
  dialogContent.show = false
  if (authStore?.userInfo?.verified_status !== 1) {
    router.push('/verify')
  }

  if (authStore.userInfo.is_set_paypassword === 2) {
    router.push('/pay_password')
  }
}
const canBindPayment = () => {
  if (authStore?.userInfo?.verified_status !== 1) {
    const dialogInfo = {
      show: true,
      title: '身份认证',
      img: verifyID,
      content: '完成身份认证，可核对真实身份，保障合法权益',
      confirmButtonText: '立即认证'
    }
    Object.assign(dialogContent, dialogInfo)
    return false
  }
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

onMounted(async () => {
  getBankList()
  await getWallets()
  await authStore.getUserInfo()
  canBindPayment()
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-mine.scss';
@import '@/assets/styles/sprite-home.scss';

.bank-card {
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

:deep(.van-field__label) {
  font-size: 28px;
  color: #13161b;
  margin-bottom: 8px;
}

:deep(.van-cell__value) {
  height: 69px;
  background: #ebf1f6;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 25px;
  margin-bottom: 12px;
}

:deep(.van-cell) {
  padding-bottom: 0;
  padding-top: 0;
}

:deep(.van-cell:after) {
  display: none;
}

:deep(.van-button--large) {
  width: 92%;
  height: 80px;
  margin: 0 auto;
  font-size: 31px;
}

:deep(.van-field__body) {
  width: 100%;
}

:deep(.van-field__control:disabled) {
  color: #000;
  -webkit-text-fill-color: #000;
}

:deep(.dialog-bulletin) {
  width: 708px;
  height: auto;
  padding: 20px 30px 30px 30px;
  border-radius: 10px;

  .van-dialog__header {
    padding: 0;
    font-size: 29px;
    color: #13161b;
    font-weight: normal;
  }

  .van-dialog__content {
    margin: 33px 0 35px 0;
    font-size: 25px;
    color: #787f8c;
    text-align: justify;
  }

  .van-dialog__footer {
    padding: 0;
  }

  .van-dialog__confirm {
    width: 100%;
    height: 80px;
    font-size: 31px;
    background: #0b75ff;
    border-radius: 8px;
    border-width: 0;
  }

  .icon-close {
    position: absolute;
    right: 40px;
    top: 35px;
  }

  img {
    width: 100%;
    margin-top: 20px;
  }

  .van-cell {
    padding: 0;
  }

}
:deep(.dialog-bulletin) {
  width: 708px;
  height: auto;
  padding: 20px 30px 30px 30px;
  border-radius: 10px;

  .van-dialog__header {
    padding: 0;
    font-size: 29px;
    color: #13161b;
    font-weight: normal;
  }

  .van-dialog__content {
    margin: 33px 0 35px 0;
    font-size: 25px;
    color: #787f8c;
    text-align: justify;
  }

  .van-dialog__footer {
    padding: 0;
  }

  .van-dialog__confirm {
    width: 100%;
    height: 80px;
    font-size: 31px;
    background: #0b75ff;
    border-radius: 8px;
    border-width: 0;
  }

  .icon-close {
    position: absolute;
    right: 40px;
    top: 35px;
  }

  img {
    width: 100%;
    margin-top: 20px;
  }

  .van-cell {
    padding: 0;
  }

  .van-button--large {
    width: 45%;
    height: 80px;
    margin: 0 5px;
    font-size: 31px;
    margin-top: 30px;
    border-radius: 3px !important;
  }

  .van-dialog__cancel {
    border-radius: 3px !important;
  }

}
:deep(.dialog-deal) {
  width: 708px;
  height: auto;
  padding: 40px;

  .van-dialog__header {
    padding: 0;
    font-size: 29px;
    color: #13161b;
  }

  .van-dialog__content {
    margin: 33px 0 35px 0;
    font-size: 25px;
    color: #787f8c;
    text-align: justify;
  }

  .van-dialog__footer {
    padding: 0;
  }

  .van-dialog__confirm,
  .btn-confirm {
    width: 100%;
    height: 80px;
    font-size: 31px;
    background: #0b75ff;
    color: #fff;
    border: 0;
    border-radius: 8px;
  }

  .dialog-radio-controler {
    margin-top: 20px;

    .radio {
      margin-right: 10px;
    }

    .radio-uncheck {
      width: 35px;
      height: 35px;
      border: 1px solid #868d9a;
      border-radius: 50%;
    }

    .radio-text {
      font-size: 25px;
      color: #13161b;
    }
  }

  .icon-close {
    position: absolute;
    right: 40px;
    top: 24px;
  }

  img {
    width: 100%;

    &.verifi-id {
      width: 260px;
    }

    &.add-card {
      width: 295px;
    }
  }

  .content {
    width: 380px;
    margin-top: 24px;
  }
}

</style>

<style lang="css">
:root {
  --van-field-placeholder-text-color: #787f8c;
}
</style>