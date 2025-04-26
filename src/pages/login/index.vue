<script setup lang="ts">
import { ref, reactive, onUnmounted } from 'vue'
import Theme from '@/components/btn/theme/index.vue'
import { loginApi, sendCodeApi, regApi } from '@/apis/index'
import Msg from '@/utils/showMsg'
import { useTokenStore, useUserInfoStore } from '@/store'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { Form, Field, ErrorMessage, type YupSchema } from 'vee-validate'

const router = useRouter()
const tokenStore = useTokenStore()
const userInfo = useUserInfoStore()

// 切换登录和注册状态
const isLogin = ref(true)
const isSend = ref(false)
const count = ref(60 * 5)
const timer = ref(0)
// 定义 FieldData 接口
interface FieldData {
  name?: string
  password?: string
  code?: string
  email?: string
  confirmP?: string
  validation?: YupSchema
  [key: string]: any
}

// 定义 Data 类型
type Data = {
  [key: string]: FieldData;
};

// 创建响应式对象
const formData = reactive<Data>({
  login: {
    name: '',
    password: '',
    validation: yup.object({
      name: yup.string().required('该项为必填'),
      password: yup.string().required('该项为必填'),
    }),
  },
  register: {
    name: '',
    password: '',
    code: '',
    confirmP: '',
    email: '',
    validation: yup.object({
      name: yup.string().required('该项为必填').min(4),
      password: yup.string().required('该项为必填'),
      code: yup.string().required('该项为必填'),
      email: yup.string().email().required('该项为必填'),
      confirmP: yup.string().oneOf([yup.ref('password')], '两次密码不一致').required('该项为必填'),
    }),
  },
});


const sendMail = async () => {
  const { message } = await sendCodeApi(formData.register.email || '')
  Msg.success(message)
  isSend.value = true
  timer.value = setInterval(() => {
    if (count.value === 0) {
      clearInterval(timer.value)
      isSend.value = false
      count.value = 60 * 5
    }
    count.value--
  }, 1000)

}
const onSubmit = async (values: any) => {
  const { name, password, code, email } = values
  if (isLogin.value) {
    // 登录逻辑
    const userData = await loginApi(name || '', password || '')
    console.log(userData)
    userInfo.setUserInfo(userData.data?.user)
  } else {
    // 注册逻辑
    const { message } = await regApi({ name, password, code, email })
    Msg.success(message)

    // 清空注册表单
    formData.register = {
      name: '',
      password: '',
      code: '',
      email: '',
      confirmP: '',
    }

    // 切换到登录状态
  }
  isLogin.value = true
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-primary to-accent flex items-center justify-center p-4">
    <div class="w-full max-w-xl">
      <div class="card bg-base-100 shadow-2xl overflow-hidden">
        <div class="card-body p-8">
          <Theme></Theme>
          <!-- 选项卡切换 -->
          <div class="tabs tabs-box justify-center">
            <button @click="isLogin = true"
              :class="['tab tab-bordered transition-all duration-300', isLogin ? 'tab-active bg-blue-500 ' : '']">
              登录
            </button>
            <button @click="isLogin = false"
              :class="['tab tab-bordered transition-all duration-300', !isLogin ? 'tab-active bg-purple-500' : '']">
              注册
            </button>
          </div>
          <Form @submit="onSubmit"
            :validation-schema="isLogin ? formData.login.validation : formData.register.validation">

            <!-- 登录表单 -->
            <div v-if="isLogin" class="space-y-3">
              <section class="w-full">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">用户名</legend>
                  <Field name="name" v-model="formData.login.name" type="text" class="input w-full"
                    placeholder="请输入用户名" />
                  <ErrorMessage name="name" class="label text-error "></ErrorMessage>
                </fieldset>
              </section>

              <section class="w-full">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">密码</legend>
                  <Field name="password" v-model="formData.login.password" type="password" class="input w-full"
                    placeholder="请输入密码" />
                  <ErrorMessage name="password" class="label text-error "></ErrorMessage>
                </fieldset>
              </section>

              <section class="w-full mt-3">
                <button type="submit" class="btn btn-primary w-full">登录</button>
                <div class="divider">OR</div>
                <div class="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
              </section>
            </div>

            <!-- 注册表单 -->
            <div v-else>
              <section class="w-full">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">用户名</legend>
                  <Field name="name" v-model="formData.register.name" type="text" class="input w-full"
                    placeholder="请输入用户名" />
                  <ErrorMessage name="name" class="label text-error "></ErrorMessage>
                </fieldset>
              </section>

              <section class="w-full">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">密码</legend>
                  <Field name="password" v-model="formData.register.password" type="password" class="input w-full"
                    placeholder="请输入密码" />
                  <ErrorMessage name="password" class="label text-error "></ErrorMessage>
                </fieldset>
              </section>

              <section class="w-full">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">确认密码</legend>
                  <Field name="confirmP" v-model="formData.register.confirmP" type="password" class="input w-full"
                    placeholder="请确认密码" />
                  <ErrorMessage name="confirmP" class="label text-error "></ErrorMessage>
                </fieldset>
              </section>

              <section class="w-full">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">邮箱</legend>
                  <div class="join">
                    <Field name="email" v-model="formData.register.email" type="email" class="input join-item"
                      placeholder="请输入邮箱" />
                    <button class="btn join-item" :disabled="isSend" @click="sendMail">
                      {{ isSend ? `${count} 秒后重试` : '发送验证码' }}
                    </button>
                  </div>
                  <ErrorMessage name="email" class="label text-error "></ErrorMessage>
                </fieldset>
              </section>

              <section class="w-full">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">验证码</legend>
                  <Field name="code" v-model="formData.register.code" type="text" class="input" placeholder="请输入验证码" />
                  <ErrorMessage name="code" class="label text-error "></ErrorMessage>
                </fieldset>
              </section>

              <section class="w-full mt-3">
                <button type="submit" class="btn btn-primary w-full">注册</button>
              </section>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
