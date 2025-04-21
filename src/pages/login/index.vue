<script setup lang="ts">
import { ref } from 'vue'
import Theme from '@/components/btn/theme/index.vue'
import { login as loginService, type LoginType } from '@/apis/index'
import { showMsg } from '@/utils/showMsg'
import { useTokenStore } from '@/store'
import { useRouter } from 'vue-router'
const router = useRouter()
const tokenStore = useTokenStore()
// 切换登录和注册状态
const isLogin = ref(true)


console.log(tokenStore.setToken('1111111'), tokenStore.getToken());


// 登录表单数据
const loginData = ref<LoginType>({
  name: '',
  password: ''
})

// 注册表单数据
const registerData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  code: ''
})

// 登录处理函数（示例）
const login = async () => {
  // 在这里调用登录 API
  // console.log('登录数据:', loginData.value)
  try {
    const res = await loginService(loginData.value.name, loginData.value.password)
    showMsg(res.message, 'success')
    tokenStore.setToken(res.data.token)
    router.replace('/')
  } catch (err) {
    console.log(err);

  }
}

// 注册处理函数（示例）
const register = () => {
  if (registerData.value.password !== registerData.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  // 在这里调用注册 API
  console.log('注册数据:', registerData.value)
  alert(`注册成功: ${registerData.value.name}`)
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
          <div v-if="isLogin" class=" space-y-3">
            <section class="w-full ">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">用户名</legend>
                <input v-model="loginData.name" type="text" class="input w-full" placeholder="请输入用户名" />
                <!-- <p class="label">输入用户名称</p> -->
              </fieldset>
            </section>

            <section class="w-full ">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">密码</legend>
                <input v-model="loginData.password" type="text" class="input w-full" placeholder="请输入用户名" />
                <!-- <p class="label">输入密码</p> -->
              </fieldset>
            </section>

            <section class="w-full mt-3">
              <button @click="login" class="btn btn-primary w-full">登录</button>
              <div class="divider">OR</div>
              <div class="card bg-base-300 rounded-box grid h-20 place-items-center">content</div>
            </section>
          </div>

          <!-- 注册表单 -->
          <div v-else>
            <section class="w-full ">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">用户名</legend>
                <input v-model="loginData.name" type="text" class="input w-full" placeholder="请输入用户名" />
                <p class="label">输入用户名称</p>
              </fieldset>
            </section>

            <section class="w-full ">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">密码</legend>
                <input v-model="registerData.password" type="text" class="input w-full" placeholder="请输入密码" />
                <p class="label">输入密码</p>
              </fieldset>
            </section>
            <section class="w-full ">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">密码</legend>
                <input v-model="registerData.confirmPassword" type="text" class="input w-full" placeholder="请输入邮箱" />
                <p class="label">确认密码</p>
              </fieldset>
            </section>

            <section class="w-full ">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">邮箱</legend>
                <div class="join">
                  <input v-model="registerData.email" type="text" class="input join-item" placeholder="请输入邮箱" />
                  <button class="btn join-item">发送验证码</button>
                </div>
              </fieldset>
            </section>

            <section class="w-full ">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">验证码</legend>
                <input v-model="registerData.code" type="text" class="input" placeholder="请输入验证码">
              </fieldset>
            </section>

            <section class="w-full mt-3">
              <button @click="register" class="btn btn-primary w-full">注册</button>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 你可以根据需求增加一些自定义 CSS */
/* 例如调整卡片边框圆角、阴影、背景渐变等 */
</style>
