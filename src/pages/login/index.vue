<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Theme from '@/components/btn/theme/index.vue'
import { loginApi, sendCodeApi, regApi, type LoginType, type UserVo } from '@/apis/index'
import Msg from '@/utils/showMsg'
import { useTokenStore, useUserInfoStore } from '@/store'
import { useRouter, type Router } from 'vue-router'
import * as yup from 'yup'
import LineMdGithubLoop from '~icons/line-md/github-loop';
import { Form, Field, ErrorMessage, type YupSchema } from 'vee-validate'
import type { ObjectResponse } from '@/type/response'

const router = useRouter()
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore()

interface GitHubUser {
  login: string;
  id: number;
}

interface PopupMessageData {
  type: 'GITHUB_LOGIN_SUCCESS';
  payload: {
    token: string;
    user: UserVo;
  };
}

// ====== GitHub 登录相关变量 ======
let popup: Window | null = null
let messageHandler: ((event: MessageEvent<PopupMessageData>) => void) | null = null

// ====== 创建消息处理器工厂函数 ======
function createMessageHandler(popup: Window, router: Router) {
  return function handlePopupMessage(event: MessageEvent<PopupMessageData>) {
    const allowedOrigin = 'https://vocucc.cn';

    if (event.origin !== allowedOrigin) {
      console.warn('非法来源:', event.origin);
      return;
    }

    if (event.data.type === 'GITHUB_LOGIN_SUCCESS') {
      const { token, user } = event.data.payload;

      if (popup && !popup.closed) popup.close();

      window.removeEventListener('message', handlePopupMessage);

      localStorage.setItem('token', token);
      alert(`欢迎回来，${user.name}！`);

      const tokenStore = useTokenStore();
      const userInfoStore = useUserInfoStore();
      tokenStore.setToken(token);
      userInfoStore.setUserInfo(user);

      router.push('/');
    }
  };
}

// ====== 打开 GitHub 登录弹窗 ======
function openGitHubLoginPopup() {
  const width = 500;
  const height = 600;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  const authUrl = 'https://api.vocucd.cn/api/github/login';

  popup = window.open(
    authUrl,
    'GitHubLogin',
    `width=${width},height=${height},left=${left},top=${top},popup=yes`
  );

  if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    alert('弹窗被浏览器拦截，请允许弹窗');
    return;
  }

  // 创建并保存消息处理器
  messageHandler = createMessageHandler(popup, router)

  // 添加监听器
  window.addEventListener('message', messageHandler);
}

// ====== 组件生命周期管理监听器 ======
onMounted(() => {
  // 这里不需要做任何事，因为我们只在点击时添加监听器
})

onUnmounted(() => {
  // 当组件卸载时移除监听器
  if (messageHandler) {
    window.removeEventListener('message', messageHandler)
  }
  if (popup && !popup.closed) {
    popup.close()
  }
})

// ====== 其他业务逻辑保持不变 ======
const isLogin = ref(true)
const isSend = ref(false)
const count = ref(60 * 5)
const timer = ref(0)

interface FieldData {
  name?: string
  password?: string
  code?: string
  email?: string
  confirmP?: string
  validation?: YupSchema
  [key: string]: any
}

type Data = {
  [key: string]: FieldData
};

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
})

const sendMail = async () => {
  if (!formData.register.email) return Msg.warning('请输入邮箱地址')
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
    const userData: any = await loginApi(name || '', password || '')
    Msg.success(userData.message)
    tokenStore.setToken(userData.data.token || '')
    userInfoStore.setUserInfo(userData.data.user)
    router.go(-1)
  } else {
    const { message } = await regApi({ name, password, code, email })
    Msg.success(message)
    formData.register = {
      name: '',
      password: '',
      code: '',
      email: '',
      confirmP: '',
    }
  }
  isLogin.value = true
}

const goGithubLogin = () => {
  openGitHubLoginPopup()
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
                <div class="card bg-base-300 rounded-box grid h-20 place-items-center">
                  <LineMdGithubLoop @click="goGithubLogin" class="btn text-3xl hover:text-accent"></LineMdGithubLoop>
                </div>
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
