<script setup lang="ts">
import SolarHashtagCircleBoldDuotone from '~icons/solar/hashtag-circle-bold-duotone';
import IconoirClock from '~icons/iconoir/clock';
import ViewIcon from '~icons/hugeicons/view';
import LikeIcon from '~icons/stash/thumb-up-light';
import { computed, ref } from 'vue';
// 定义文章 Props 类型
interface ArticlePropsTypeVO {
  id: string | number
  title: string; // 标题
  cover: string; // 封面图片 URL
  tags: string[]; // 标签数组
  desc: string; // 描述
  updateTime: string | Date // 更新时间
  like: number | string // 点赞
  view: number | string // 浏览量
  index?: number | string,
  isLoading: boolean
}

interface ArticlePropsListVO {
  list: any
  isLoading: boolean
}


// 设置默认值
const props = withDefaults(defineProps<ArticlePropsListVO>(), {
  list: () => [],
});


// const isLoading = computed(() => props.isLoading)

</script>
<template>
  <!-- 骨架屏 -->
  <div v-if="isLoading" v-for="index in 5"
    class="group w-full card shadow-sm card-border max-w-md overflow-hidden bg-base-200 dark:bg-primary md:max-w-2xl hover:border-2 hover:border-accent border-1 border-neutral  hover:shadow-lg transition-all">
    <div class="md:flex" :class="{ 'md:flex-row-reverse': +index % 2 !== 0 }">
      <div class="skeleton h-48 lg:w-2/5 w-full lg:m-2"></div>
      <!-- 内容 -->
      <div class="p-8 w-full card-body">

        <!-- 标题 -->
        <!-- <div class="skeleton h-32 w-full"></div> -->
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
    </div>
  </div>

  <template v-else>
    <div v-for="(item, index) in list" @click="$router.push(`/article?aid=${item?.id}`)" :title="item?.title"
      class="group w-full card shadow-sm card-border min-h-40 lg:max-h-44 max-w-md overflow-hidden bg-base-200 dark:bg-primary md:max-w-2xl hover:border-2 hover:border-accent border-1 border-neutral  hover:shadow-lg transition-all">
      <div class="md:flex" :class="{ 'md:flex-row-reverse': +index % 2 !== 0 }">
        <!-- 封面 -->
        <div class="relative lg:w-2/5">
          <img
            class="h-48 w-full  object-cover md:h-full  w-full dark:brightness-50 transition-transform duration-300 ease-in-out group-hover:scale-105"
            :src="item.cover" alt="Modern building architecture" />
        </div>
        <!-- 内容 -->
        <div class="p-8 w-full card-body">

          <!-- 标题 -->
          <a href="#" class="mt-1 group-hover:text-accent block text-xl leading-tight font-medium text-pretty">
            {{ item.title }}
          </a>
          <!-- 描述信息 -->
          <p class="mt-2 text-accent-content text-sm">
            {{ item.desc }}
          </p>
          <div class="flex text-sm w-full justify-between flex-col space-y-2 " v-if="item.tags.length > 0">
            <div class="flex space-x-3 items-center">
              <!-- 标签 -->
              <div class="flex  items-center">
                <SolarHashtagCircleBoldDuotone class=" mr-2" />
                <span>{{ item.tags.join(' ') }}</span>
              </div>
              <!-- 更新时间 -->
              <div class="flex items-center text-accent-content">
                <IconoirClock class=" text-accent-content mr-2"></IconoirClock>
                <span>{{ item.updateTime }}</span>
              </div>
            </div>

            <!-- 点赞 | 浏览量 -->
            <div class="flex space-x-3 text-info-content">
              <!-- 浏览量 -->
              <div class="flex items-center ">
                <ViewIcon class="text-accent-content mr-2"></ViewIcon>
                <span>{{ item.view }}</span>
              </div>
              <!-- 点赞 -->
              <div class="flex items-center">
                <LikeIcon class="text-accent-content mr-2"></LikeIcon>
                <span>{{ item.like }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>


</template>
<style scoped lang="scss">
.blur {
  filter: blur(8px);
}
</style>
