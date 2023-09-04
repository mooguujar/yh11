<script setup lang="ts">
import { Ref, reactive, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/modules/auth'
import { IInfo } from '@/store/types/auth'
import { ChangeValue, InputType, inputChange } from './tools'

const store = useAuthStore()
const { userInfo } = storeToRefs(store)
const { mobile: _mobile = '', pass = '' } = userInfo as IInfo | Record<string, any>
const mobile = reactive({
  value: _mobile,
  error: '',
  type: 'text' as InputType
})
const password = reactive({
  value: pass,
  error: '',
  type: 'password' as InputType
})
const code = reactive({
  value: '',
  error: '',
  type: 'text' as InputType
})

const mobileOnChange = (data: ChangeValue) => {
  const regCN = /^1[3456789]\d{9}$/
  const regTW = /^9[0-9]{8}$/
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

  inputChange(mobile)(data)
}
const passwordOnChange = (data: ChangeValue) => {
  const reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)
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

  inputChange(password)(data)
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

  inputChange(code)(data)
}
const inputFormList = reactive([
  {
    key: 'mobile',
    placeholder: '手机号码',
    typeKey: 'mobile',
    onChange: mobileOnChange,
    ...mobile
  },
  {
    key: 'password',
    placeholder: '请输入登录密码',
    typeKey: 'psw',
    onChange: passwordOnChange,
    ...password
  },
  {
    key: 'code',
    placeholder: '请输入验证码',
    typeKey: 'code',
    onChange: codeOnChange,
    ...code
  }
])

watch(
  () => 123,
  newValue => {}
)
onUnmounted(() => {})
</script>

<template>
  <div class="login-container">
    <div class="content-view"></div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  flex: 1;
  margin-top: 31px;
  .content-view {
    width: 100%;
    padding: 0 41px;
    .input-content-view {
      width: 100%;
      height: 124rem;
      position: relative;
      .error {
        color: red;
        font-size: 12rem;
        position: absolute;
        bottom: 0;
        right: 20rem;
        animation: error 0.3s;
        z-index: 1;
        @keyframes error {
          0% {
            opacity: 0;
            bottom: 20rem;
          }
          100% {
            opacity: 1;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>
