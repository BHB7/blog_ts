<script setup lang="ts">
import { createUser, getCode } from '@/apis/index';
import { onMounted, reactive, ref } from 'vue';

interface UserInfoType {
  name: string;
  code: string;
}

const userInfo = reactive<UserInfoType>({ name: '', code: '' });
const codeImg = ref<string>();
const getCodes = () => {
  getCode()
    .then(res => {
      // 假设 res.data 是 SVG 的 XML 数据
      const svgData = encodeURIComponent(res.data); // 对 SVG 数据进行编码
      codeImg.value = `data:image/svg+xml,${svgData}`; // 构造 Data URL
    })
    .catch(err => {
      console.error('获取验证码失败:', err);
    });
}
onMounted(() => {
  getCodes()
});

const send = () => {
  if (!userInfo.name || !userInfo.code) {
    console.error('用户名或验证码不能为空');
    return;
  }

  createUser(userInfo)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error('用户注册失败:', err);
    });
};
</script>

<template>
  <input v-model="userInfo.name" type="text" class="input" placeholder="请输入用户名">
  <input v-model="userInfo.code" type="text" class="input" placeholder="请输入验证码">
  <div class="w-40 h-20" @click="() => getCodes()">
    <img class="w-full h-full" :src="codeImg" alt="验证码">
  </div>
  <button class="btn btn-primary" :disabled="!userInfo.name || !userInfo.code" @click="send">
    注册
  </button>
</template>
