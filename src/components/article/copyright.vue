<script setup lang="ts">

import LineMdGithubLoop from '~icons/line-md/github-loop';
</script>

<template>
  <!-- 底部版权组件 -->
  <div class="card relative card-border base-200 border-2 mt-20 lg:p-4 p-2 min-h-40 h-full">
    <!-- 头像 -->
    <div class="avatar absolute left-[50%] translate-x-[-50%] top-[-20px]">
      <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
        <img
          src="https://avatars.githubusercontent.com/u/119857599?s=400&u=b261c825ca804a833ea29763db2056127b6f376c&v=4" />
      </div>
    </div>
    <!-- 昵称 | 用户信息 -->
    <div class="nickname w-full space-y-2 flex flex-col items-center mt-18 py-4">
      <div class="text-balance">7z</div>
      <p class=" text-center">你站在桥上看风景，看风景人在楼上看你。</p>
      <div class="cc space-x-2"> <button class="btn btn-dash">原创</button><span>文章分类</span></div>
      <!-- 联系 -->
      <div>
        <a href="https://github.com/BHB7" target="_blank">
          <LineMdGithubLoop class="btn"></LineMdGithubLoop>
        </a>
      </div>
      <!-- 声明 -->
      <div class="text-info-content text-sm">本博客所有文章除特别声明外，均采用 <a class="link-hover"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA
          4.0</a> 许可协议。转载请注明来自 7z</div>
    </div>
  </div>
</template>
