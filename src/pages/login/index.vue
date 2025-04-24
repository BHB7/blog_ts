<script setup lang="ts">
import { ref, reactive, watch, onUnmounted } from 'vue'
import Theme from '@/components/btn/theme/index.vue'
import { loginApi, sendCodeApi, regApi, type LoginType, type regType } from '@/apis/index'
import { showMsg } from '@/utils/showMsg'
import { useTokenStore } from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const tokenStore = useTokenStore()

// 切换登录和注册状态
const isLogin = ref(true)


const isSend = ref()

console.log(tokenStore.setToken('1111111'), tokenStore.getToken());

interface Field {
  val: string;
  exp?: RegExp | RegExp[];
  info?: string;
  errorInfo?: string;
}

type Data = { [key: string]: Field };

// 登录表单数据
const loginData = reactive<Data>({
  name: {
    val: '',
    exp: [],
    info: '用户名 3到16位（字母，数字，下划线，减号）',
    errorInfo: '' // 校验通过，没有错误信息
  },
  password: {
    val: '',
    exp: [],
    info: '密码 6到16位（字母，数字，特殊字符）',
    errorInfo: '' // 校验通过，没有错误信息
  },
})

// 注册表单数据
const registerData = reactive<Data>({
  name: {
    val: '',
    exp: [/^[\w-]{4,16}$/],
    info: '用户名 4到16位（字母，数字，下划线，减号）',
    errorInfo: '' // 校验通过，没有错误信息
  },
  email: {
    val: '',
    exp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/,
    info: '邮箱',
    errorInfo: '' // 校验通过，没有错误信息
  },
  password: {
    val: '',
    exp: [/^[\w!@#$%^&*()_+\-=$${};':"\\|,.<>\/?]{6,16}$/],
    info: '密码 6到16位（字母，数字，特殊字符）',
    errorInfo: '' // 校验通过，没有错误信息
  },
  confirmPassword: {
    val: '',
    info: '确认密码',
    errorInfo: '' // 校验通过，没有错误信息
  },
  code: {
    val: '',
    info: '验证码',
    errorInfo: '' // 校验通过，没有错误信息
  },
});

function vo(data: Data): regType {
  const ob: { [key: string]: string } = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const field = data[key];
      ob[key] = field.val;
    }
  }
  return {
    name: ob.name,
    password: ob.password,
    code: ob.code,
    email: ob.email
  };
}

const login = async () => {
  try {
    const res = await loginApi(loginData.name.val, loginData.password.val)
    showMsg(res.message, 'success')
    tokenStore.setToken(res.data.token)
    router.replace('/')
  } catch (err) {
    console.error(err);
    // showMsg('登录失败，请检查输入', 'error');
  }
}

const register = async () => {
  if (registerData.password.val !== registerData.confirmPassword.val) {
    showMsg('两次密码不一致', 'error');
    return
  }
  try {
    const res = await regApi(vo(registerData))
    console.log(res.data)
    showMsg('注册成功', 'success')
  } catch (err) {
    console.error(err);
    showMsg('注册失败，请稍后再试', 'error');
  }
}

const count = ref(60 * 5)
let intervalId: number | null = null;

const startCountdown = () => {
  count.value = 60 * 5;
  intervalId = setInterval(() => {
    count.value -= 1;
    if (count.value <= 0 && intervalId) {
      isSend.value = false
      clearInterval(intervalId)
    }
  }, 1000);
};

const sendMail = async () => {
  isSend.value = true
  try {
    await sendCodeApi(registerData.email.val);
    startCountdown();
  } catch (err) {
    console.error('验证码发送失败:', err);
    showMsg('验证码发送失败，请稍后重试', 'error');
  }
};

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

const onSubmit = async () => {
  try {
    if (isLogin.value) {
      console.log(1);

      console.log(await testExp(loginData));

      await testExp(loginData)
      login()
    } else {
      await testExp(registerData)
      register()
    }
  } catch (err) {
    // isLogin?showMsg('请检查表单内容', 'error')
  }
};

function testExp(data: Data): Promise<boolean> {
  const errors: { [key: string]: string } = {};

  return new Promise((resolve, reject) => {
    Object.keys(data).forEach(key => {
      const field = data[key];
      if (field.exp) {
        const isValid = Array.isArray(field.exp)
          ? field.exp.some(regex => regex.test(field.val))
          : field.exp.test(field.val);

        if (!isValid) {
          errors[key] = `${key} 格式不正确`;
          data[key].errorInfo = getErrorHtml(key, field.info);
        } else {
          data[key].errorInfo = '';
        }
      }
    });

    if (Object.keys(errors).length === 0) {
      resolve(true);
    } else {
      reject(false);
    }
  });
}

function getErrorHtml(key: string, info?: string): string {
  return `<div class="inline-grid *:[grid-area:1/1]">
    <div class="status status-error animate-ping"></div>
    <div class="status status-error"></div>
  </div><span class="text-error font-bold">${key}</span> 格式不正确: ${info || '无描述'}`;
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

          <!-- 登录表单 -->
          <div v-if="isLogin" class="space-y-3">
            <section class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">用户名</legend>
                <input v-model="loginData.name.val" type="text" class="input w-full" placeholder="请输入用户名" />
                <p class="p" v-html="loginData.name.errorInfo"></p>
              </fieldset>
            </section>

            <section class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">密码</legend>
                <input v-model="loginData.password.val" type="password" class="input w-full" placeholder="请输入密码" />
                <p class="p" v-html="loginData.password.errorInfo"></p>
              </fieldset>
            </section>

            <section class="w-full mt-3">
              <button @click="onSubmit" class="btn btn-primary w-full">登录</button>
              <div class="divider">OR</div>
              <div class="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
            </section>
          </div>

          <!-- 注册表单 -->
          <div v-else>
            <section class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">用户名</legend>
                <input v-model="registerData.name.val" type="text" class="input w-full" placeholder="请输入用户名" />
                <p class="label" v-html="registerData.name.errorInfo"></p>
              </fieldset>
            </section>

            <section class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">密码</legend>
                <input v-model="registerData.password.val" type="password" class="input w-full" placeholder="请输入密码" />
                <p class="label">{{ registerData.password.info }}</p>
              </fieldset>
            </section>

            <section class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">确认密码</legend>
                <input v-model="registerData.confirmPassword.val" type="password" class="input w-full"
                  placeholder="请确认密码" />
                <p class="label">{{ registerData.confirmPassword.info }}</p>
              </fieldset>
            </section>

            <section class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">邮箱</legend>
                <div class="join">
                  <input v-model="registerData.email.val" type="email" class="input join-item" placeholder="请输入邮箱" />
                  <button class="btn join-item" @click="sendMail">{{ isSend ? count : '发送验证码' }}</button>
                </div>
              </fieldset>
            </section>

            <section class="w-full">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">验证码</legend>
                <input v-model="registerData.code.val" type="text" class="input" placeholder="请输入验证码">
              </fieldset>
            </section>

            <section class="w-full mt-3">
              <button @click="onSubmit" class="btn btn-primary w-full">注册</button>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.label {
  font-size: 0.875rem;
  color: red;
  margin-top: 0.5rem;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
