<script setup lang="ts">
import SolarHashtagCircleBoldDuotone from '~icons/solar/hashtag-circle-bold-duotone'
import IpIcon from '~icons/line-md/map-marker-alt-twotone-loop'

import { ref, watch } from 'vue'
import { pageData } from '@/events/event'
import type { ArticleTypeVo } from '@/apis'
import formatDate from '@/utils/fromDate'

const article = ref<ArticleTypeVo | null>(null)
pageData.on('data', (data: ArticleTypeVo) => {
  console.log('收到文章信息', data)
  article.value = data
})

</script>

<template>
  <section class="card card-border shadow-sm group w-full max-h-86 overflow-hidden">
    <div v-if="true" class="avatar w-full lg:h-96 h-50 relative overflow-hidden">
      <div class="p-4 z-1 container lg:px-28 absolute inset-0">
        <div class="lg:space-y-5 space-y-3 lg:text-xl">
          <!-- 分类 -->
          <div class="w-full flex lg:justify-start justify-center text-primary-content">
            <!-- <div class="space-x-2 flex-wrap">
              <button class="btn ">VU</button>
              <button class="btn ">PYTHON</button>
            </div> -->
            <!-- 标签 -->
            <div class="ml-3 flex items-center">
              <span v-for="(item, index) in article?.tags">
                <SolarHashtagCircleBoldDuotone />{{ item.name }}
              </span>
            </div>
          </div>
          <!-- 标题 -->
          <div class="flex lg:text-4xl font-bold text-primary-content justify-center lg:justify-start text-2xl">
            {{ article?.title }}
          </div>
          <!-- 文章信息 -->
          <div class="w-full flex space-x-4 justify-center lg:justify-start flex-wrap items-center">
            <span class="text-primary-content flex">发表于{{ formatDate(article?.createdAt || '') }}</span>
            <span class="text-primary-content flex">更新于{{ formatDate(article?.updatedAt || '') }}</span>
          </div>
          <div class="flex items-center text-primary-content lg:justify-start justify-center">
            <IpIcon />贵州
          </div>
        </div>
      </div>
      <!-- 封面 -->
      <div
        class="absolute h-full w-full will-change-transform inset-0 transition-all duration-300 ease-in-out backdrop-blur-3xl bg-linear-to-b  overflow-hidden">
        <div
          class="absolute inset-0 group-hover:h-0 duration-300 ease-in bg-blur  bg-gradient-to-b from-white-500/5 to-base-200 z-10">
        </div>
        <img class="w-full h-full duration-300 ease-in-out group-hover:scale-125 object-center" :src="article?.cover" />
      </div>
    </div>
    <!-- <img class="w-full h-full  object-center" :src="article?.cover" /> -->
  </section>
</template>


<style scoped lang="scss">
.bg-blur {
  backdrop-filter: blur(20px);
}
</style>
