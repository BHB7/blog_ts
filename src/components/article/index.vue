<script setup lang="ts">
import SolarHashtagCircleBoldDuotone from '~icons/solar/hashtag-circle-bold-duotone';

// 定义 Props 类型
export interface ArticlePropsType {
  title: string; // 标题
  cover: string; // 封面图片 URL
  tags: string[]; // 标签数组
  desc: string;
  index?: number | string
}

// 设置默认值
const props = withDefaults(defineProps<ArticlePropsType>(), {
  title: '标题',
  cover: () => new URL('@/assets/03.webp', import.meta.url).href,
  tags: () => [],
  desc: '描述...',
  index: 0
});


</script>
<template>
  <div :title="props.title"
    class="group w-full card  max-w-md overflow-hidden bg-base-200 dark:bg-primary md:max-w-2xl  hover:shadow-lg transition-all">
    <div class="md:flex" :class="{ 'md:flex-row-reverse': +index % 2 !== 0 }">
      <!-- 封面 -->
      <div class="relative lg:w-2/5">
        <!-- 标题 -->
        <div
          class="absolute group-hover:opacity-0 text-4xl z-10 top-1/2 left-1/2 translate-[-50%] text-white font-semibold tracking-wide card-title uppercase">
          {{ props.title }}
        </div>
        <!-- 勋章 -->
        <img
          class="h-48 w-full absolute -z-0 inset-0 blur-sm object-cover md:h-full  w-full dark:brightness-50 transition-transform duration-300 ease-in-out group-hover:blur-2xl"
          :src="props.cover" alt="Modern building architecture" />
        <img
          class="h-48 w-full  object-cover md:h-full  w-full dark:brightness-50 transition-transform duration-300 ease-in-out group-hover:scale-105"
          :src="props.cover" alt="Modern building architecture" />
      </div>
      <!-- 内容 -->
      <div class="p-8 w-full card-body">

        <!-- 描述标题 -->
        <a href="#" class="mt-1 block text-lg leading-tight font-medium dark:text-sky-300">
          {{ props.title }}
        </a>
        <!-- 描述信息 -->
        <p class="mt-2 text-gray-500">
          {{ props.desc }}
        </p>
        <!-- 标签 -->
        <div class="flex items-center mt-4" v-if="props.tags.length > 0">
          <SolarHashtagCircleBoldDuotone class="dark:text-sky-200 mr-2" />
          <span>{{ props.tags.join(' ') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
