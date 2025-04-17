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
  confirmPassword: ''
})

// 登录处理函数（示例）
const login = async () => {
  // 在这里调用登录 API
  // console.log('登录数据:', loginData.value)
  try {
    const res = await loginService(loginData.value.name, loginData.value.password)
    showMsg(res.data.message, 'success')
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
    <div class="w-full max-w-md">
      <div class="card bg-base-100 shadow-2xl overflow-hidden">
        <div class="card-body p-8">
          <Theme></Theme>
          <!-- 选项卡切换 -->
          <div class="tabs justify-center mb-8">
            <button @click="isLogin = true"
              :class="['tab tab-bordered transition-all duration-300', isLogin ? 'tab-active bg-blue-500 text-white' : '']">
              登录
            </button>
            <button @click="isLogin = false"
              :class="['tab tab-bordered transition-all duration-300', !isLogin ? 'tab-active bg-purple-500 text-white' : '']">
              注册
            </button>
          </div>

          <!-- 登录表单 -->
          <div v-if="isLogin">
            <div class="form-control mb-6">
              <label class="label">
                <span class="label-text font-medium">用户名</span>
              </label>
              <input v-model="loginData.name" type="text" placeholder="请输入用户名"
                class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div class="form-control mb-8">
              <label class="label">
                <span class="label-text font-medium">密码</span>
              </label>
              <input v-model="loginData.password" type="password" placeholder="请输入密码"
                class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div class="form-control">
              <button @click="login" class="btn btn-primary w-full text-lg py-3">
                登录
              </button>
            </div>
          </div>

          <!-- 注册表单 -->
          <div v-else>
            <div class="form-control mb-5">
              <label class="label">
                <span class="label-text font-medium">用户名</span>
              </label>
              <input v-model="registerData.name" type="text" placeholder="请输入用户名"
                class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div class="form-control mb-5">
              <label class="label">
                <span class="label-text font-medium">邮箱</span>
              </label>
              <input v-model="registerData.email" type="email" placeholder="请输入邮箱"
                class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div class="form-control mb-5">
              <label class="label">
                <span class="label-text font-medium">密码</span>
              </label>
              <input v-model="registerData.password" type="password" placeholder="请输入密码"
                class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div class="form-control mb-8">
              <label class="label">
                <span class="label-text font-medium">确认密码</span>
              </label>
              <input v-model="registerData.confirmPassword" type="password" placeholder="请确认密码"
                class="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div class="form-control">
              <button @click="register" class="btn btn-secondary w-full text-lg py-3">
                注册
              </button>
            </div>
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
