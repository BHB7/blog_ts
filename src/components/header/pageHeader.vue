<script setup lang="ts">
import SolarHashtagCircleBoldDuotone from '~icons/solar/hashtag-circle-bold-duotone';
import IpIcon from '~icons/line-md/map-marker-alt-twotone-loop';
</script>

<template>
  <section class="card card-border shadow-xl w-full overflow-hidden">
    <div class="avatar w-full lg:h-96 h-50 relative overflow-hidden">
      <div class="p-4 z-1 container lg:px-28 absolute inset-0 ">
        <div class="lg:space-y-5 space-y-3 lg:text-xl">
          <!-- 分类 -->
          <div class="w-full flex lg:justify-start justify-center">
            <div class="space-x-2 flex-wrap">
              <button class="btn bg-white-200 text-base-300">VUE</button>
              <button class="btn bg-white-200 text-base-300">PYTHON</button>
            </div>
            <!-- 标签 -->
            <div class="ml-3 text-base-300 flex items-center">
              <SolarHashtagCircleBoldDuotone />Vue
            </div>
          </div>
          <!-- 标题 -->
          <div class="flex lg:text-4xl justify-center lg:justify-start text-2xl text-primary">
            Python常用语法
          </div>
          <!-- 文章信息 -->
          <div class="w-full flex space-x-4 justify-center lg:justify-start flex-wrap items-center">
            <span class="text-base-200 flex">发表于2024-07-16</span>
            <span class="text-base-200 flex">更新于2024-07-16</span>
          </div>
          <div class="flex items-center text-base-100 lg:justify-start justify-center">
            <IpIcon />贵州
          </div>
        </div>
      </div>
      <!-- 封面 -->
      <div class="absolute inset-0 transition-all duration-300 ease-in-out blur-2xl scale-100 overflow-hidden">
        <img class="w-full h-full object-cover"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
      </div>
    </div>
  </section>
</template>
