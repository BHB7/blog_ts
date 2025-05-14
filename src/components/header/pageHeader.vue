<script setup lang="ts">
import SolarHashtagCircleBoldDuotone from '~icons/solar/hashtag-circle-bold-duotone'
import IpIcon from '~icons/line-md/map-marker-alt-twotone-loop'
import LineMdTelegram from '~icons/line-md/telegram'
import LineMdUploadLoop from '~icons/line-md/upload-loop'
import { ref, watch } from 'vue'
import { pageData } from '@/events/event'
import { getIpAddress, type ArticleTypeVo } from '@/apis'
import formatDate from '@/utils/formatDate'

const article = ref<ArticleTypeVo | null>(null)
const ipInfo = ref()
pageData.on('articleData', async (data: ArticleTypeVo) => {
  // console.log('收到文章信息', data)
  article.value = data
  const ipInfoData = await getIpAddress(article.value.ip)
  // console.log(ipInfoData.province);
  ipInfo.value = ipInfoData.province
})

</script>

<template>
  <section class="card  rounded-b-none group w-full max-h-86 overflow-hidden">
    <div class="avatar w-full lg:h-96 h-50 relative overflow-hidden">
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
          <div
            class="w-full text-white-800 text-md flex space-x-4 justify-center lg:justify-start flex-wrap items-center">
            <span class="flex">
              <LineMdTelegram class="mx-2" />发表于 {{ formatDate(article?.createdAt || '') }}
            </span>
            <span class="flex">
              <LineMdUploadLoop class="mx-2" />更新于 {{ formatDate(article?.updatedAt || '') }}
            </span>
          </div>
          <div class="flex items-center text-white-800 text-md lg:justify-start justify-center">
            <IpIcon class="mx-2" />{{ ipInfo || '未知' }}
          </div>
        </div>
      </div>
      <!-- 封面 -->
      <div
        class="absolute h-full w-full will-change-transform inset-0 transition-all duration-300 ease-in-out backdrop-blur-3xl bg-linear-to-b  overflow-hidden">
        <div
          class="absolute inset-0 group-hover:to-base-100  duration-300 ease-in bg-blur  bg-gradient-to-b from-white-500/5 to-base-200 z-10">
        </div>
        <img
          class="w-full h-full duration-300 ease group-hover:scale-102 object-center bg-gradient-to-b from-blue-500 to-primary"
          :src="article?.cover" />
      </div>
    </div>
  </section>
</template>


<style scoped lang="scss"></style>
