<script setup lang="ts">
import { ref, reactive, onUnmounted, watch, computed, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/modules/auth'
import { IInfo } from '@/store/types/auth'
import { ChangeValue, StateProps, inputChange } from './tools'
import { useEntryStore } from '@/store/modules/entry'
import { IConfigData, IIsOpenRecaptcha } from '@/store/types/entry'
import FooterView from '@/components/Auth/FooterView.vue'
import { showFailToast } from 'vant'
import { useRouter } from 'vue-router'
import { LoginParams } from '@/apis/auth'

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
const { mobile: _mobile = '', pass = '' } = userInfo as IInfo | Record<string, any>
const mobile = reactive({
  value: _mobile,
  error: '',
  type: 'number'
})
const password = reactive({
  value: pass,
  error: '',
  type: 'password'
})
const code = reactive({
  value: '',
  error: '',
  type: 'text'
})

const mobileOnChange = (data: ChangeValue) => {
  const regCN = /^1[3456789]\d{9,10}$/
  const regTW = /^9[0-9]{8,9}$/
  const isValue = data.find(item => item.key === 'value')

  if (isValue && !regCN.test(isValue.value) && !regTW.test(isValue.value)) {
    data.push({
      key: 'error',
      value: '手机号码格式不正确'
    })
  } else {
    data.push({
      key: 'error',
      value: ''
    })
  }

  inputChange(mobile as StateProps)(data)
}
const passwordOnChange = (data: ChangeValue) => {
  const reg = new RegExp(/[?!a-zA-Z0-9.]{6,16}$/)
  const isValue = data.find(item => item.key === 'value')

  if (isValue && !reg.test(isValue.value)) {
    data.push({
      key: 'error',
      value: '密码格式不正确'
    })
  } else {
    data.push({
      key: 'error',
      value: ''
    })
  }

  inputChange(password as StateProps)(data)
}
const codeOnChange = (data: ChangeValue) => {
  const reg = new RegExp(/^[0-9]{4}$/)
  const isValue = data.find(item => item.key === 'value')

  if (isValue && !reg.test(isValue.value)) {
    data.push({
      key: 'error',
      value: '验证码格式不正确'
    })
  } else {
    data.push({
      key: 'error',
      value: ''
    })
  }

  inputChange(code as StateProps)(data)
}

const entryStore = useEntryStore()
const { config, fingerprint } = storeToRefs(entryStore)
const { Web_Set_WebReg } = config as IConfigData | Record<string, any>
// 是否显示验证码表单
const isOpenRecaptcha = computed(() => {
  return (Web_Set_WebReg?.is_open_recaptcha as IIsOpenRecaptcha)?.v
    ? (Web_Set_WebReg?.is_open_recaptcha as IIsOpenRecaptcha)
    : {
        v: '0',
        n: '',
        id: ''
      }
})

const inputFormList = ref([
  {
    key: 'mobile',
    placeholder: '手机号码',
    typeKey: 'mobile',
    icon: 'mobile',
    onChange: (e: Event) =>
      mobileOnChange([{ key: 'value', value: (e.target as HTMLInputElement).value }]),
    ...toRefs(mobile)
  },
  {
    key: 'password',
    placeholder: '请输入登录密码',
    typeKey: 'psw',
    icon: 'lock',
    onChange: (e: Event) =>
      passwordOnChange([{ key: 'value', value: (e.target as HTMLInputElement).value }]),
    ...toRefs(password)
  },
  {
    key: 'code',
    placeholder: '请输入验证码',
    typeKey: 'code',
    onChange: (e: Event) =>
      codeOnChange([{ key: 'value', value: (e.target as HTMLInputElement).value }]),
    icon: 'code',
    ...toRefs(code)
  }
])

// if ((isOpenRecaptcha as unknown as IIsOpenRecaptcha).v === '1') {
//   inputFormList.value.push()
// }

const togglePasswordStatus = (index: number) => {
  inputFormList.value[index].type =
    inputFormList.value[index].type === 'password' ? 'text' : 'password'
}

const { getFingerprint } = entryStore
getFingerprint();
if(!!!localStorage.getItem('fingerprint'))localStorage.setItem('fingerprint',fingerprint.value);

const { getLoginApi } = authStore
const router = useRouter()
const phonePreffixCode = ref('+86')

const onLogin = async () => {
  if (!mobile.value) return showFailToast('请输入手机号码')
  if (!password.value) return showFailToast('请输入密码')
  if (mobile.error) return showFailToast(mobile.error)
  if (password.error) return showFailToast(password.error)

  const params = {
    mobile: mobile.value.includes(phonePreffixCode.value)
      ? mobile.value
      : phonePreffixCode.value + mobile.value,
    pass: password.value,
    deviceid: localStorage.getItem('fingerprint')||fingerprint.value
  }

  try {
    await getLoginApi(params).then((data)=>{
      console.log('data',data);
      if(!data.token)return;
      router.push('/')
    })
  } catch (error) {
    console.error(error)
  }
}
onUnmounted(() => {})
</script>

<template>
  <div class="login-container">
    <div class="content-view">
      <van-field v-model="phonePreffixCode" label="区号" placeholder="请输入区号" />
      <div
        v-for="(item, index) in inputFormList"
        v-show="(index === 2 && isOpenRecaptcha.v === '1') || index !== 2"
        :key="item.key"
        class="input-content"
      >
        <div class="input-content-view">
          <div class="input-view flex items-center">
            <i :class="['block', item.icon]"></i>
            <input
              :type="item.type"
              :placeholder="item.placeholder"
              @change="item.onChange"
            />
            <i
              v-if="item.key.toLowerCase().includes('password')"
              :class="item.type === 'password' ? 'eye-close' : 'eye-open'"
              @click="togglePasswordStatus(index)"
            ></i>
          </div>
          <div className="error">{{ item.error }}</div>
        </div>
      </div>
    </div>
  </div>

  <footer-view
    btn-name="登录"
    @click="onLogin"
  ></footer-view>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/sprite-home.scss';
.login-container {
  width: 100%;
  flex: 1;
  margin-top: 31px;
  .content-view {
    width: 100%;
    padding: 0 41px;
    .input-content-view {
      width: 100%;
      height: 124px;
      position: relative;
      .error {
        color: red;
        font-size: 12px;
        position: absolute;
        bottom: 2px;
        right: 20px;
        animation: error 0.3s;
        z-index: 1;
        @keyframes error {
          0% {
            opacity: 0;
            bottom: 20px;
          }
          100% {
            opacity: 1;
            bottom: 0;
          }
        }
      }
    }
    .input-view {
      width: 100%;
      height: 79px;
      background-color: #ebf1f6;
      padding: 0 25px;
      border-radius: 7px;
      position: relative;
      z-index: 2;
      input {
        padding: 0 10px;
        border: none;
        flex: 1;
        height: 100%;
        background-color: transparent;
        font-size: 18px;
      }
    }
  }
}
</style>
<style>
.van-toast {
  width: 160px;
  height: 160px;
}
</style>
