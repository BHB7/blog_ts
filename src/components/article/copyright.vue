<script setup lang="ts">
import LineMdGithubLoop from '~icons/line-md/github-loop'
import { pageData } from '@/events/event'
import { getUserInfoByIdApi, type ArticleTypeVo, type UserVo } from '@/apis'
import { ref } from 'vue'

const userInfo = ref<UserVo>()
pageData.on('articleData', async (data: ArticleTypeVo) => {
  console.log(data, '版权页')
  if (data.user_id) {
    const userData = await getUserInfoByIdApi(data.user_id)
    userInfo.value = userData
  }
})
</script>

<template>
  <!-- 底部版权组件 -->
  <div class="card relative card-border bg-blur bg-base-300/70 border-2 mt-20 lg:p-4 p-2 min-h-40 h-full">
    <!-- 头像 -->
    <div class="avatar absolute left-[50%] translate-x-[-50%] top-[-20px]">
      <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
        <img :src="userInfo?.imgurl || ''" />
      </div>
    </div>
    <!-- 昵称 | 用户信息 -->
    <div class="nickname w-full space-y-4 flex flex-col items-center mt-18 py-4">
      <div class="text-balance text-primary font-bold">{{ userInfo?.name }}</div>
      <p class="text-sm text-center">{{ userInfo?.motto || 'qaq' }}</p>
      <div class="cc text-sm space-x-2"> <button class="btn text-sm btn-dash">原创</button><span>文章分类</span></div>
      <!-- 联系 -->
      <div>
        <a href="https://github.com/BHB7" target="_blank">
          <LineMdGithubLoop class="btn"></LineMdGithubLoop>
        </a>
      </div>
      <!-- 声明 -->
      <div class="text-info-content text-center text-sm">本博客所有文章除特别声明外，均采用 <a class="link-hover"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA
          4.0</a> 许可协议。转载请注明来自 <span class=" font-bold text-primary">{{ userInfo?.name }}</span></div>
    </div>
  </div>
</template>
