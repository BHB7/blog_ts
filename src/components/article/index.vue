<script setup lang="ts">
import SolarHashtagCircleBoldDuotone from '~icons/solar/hashtag-circle-bold-duotone';
import IconoirClock from '~icons/iconoir/clock';
import ViewIcon from '~icons/hugeicons/view';
import LikeIcon from '~icons/stash/thumb-up-light';
// 定义文章 Props 类型
export interface ArticlePropsTypeVO {
  title: string; // 标题
  cover: string; // 封面图片 URL
  tags: string[]; // 标签数组
  desc: string; // 描述
  updateTime: string | Date // 更新时间
  like: number | string // 点赞
  view: number | string // 浏览量
  index?: number | string
}

// 设置默认值
const props = withDefaults(defineProps<ArticlePropsTypeVO>(), {
  title: '标题  条测试 标题 内容 ||',
  cover: () => new URL('@/assets/03.webp', import.meta.url).href,
  tags: () => [],
  desc: '描述...| 这里是描述信息嘻嘻嘻嘻嘻嘻嘻',
  like: 0,
  updateTime: '2025/03/02',
  view: 888,
  index: 0
});

</script>
<template>
  <div :title="props.title"
    class="group w-full card shadow-sm card-border max-w-md overflow-hidden bg-base-200 dark:bg-primary md:max-w-2xl hover:border-2 hover:border-accent border-1 border-neutral  hover:shadow-lg transition-all">
    <div class="md:flex" :class="{ 'md:flex-row-reverse': +index % 2 !== 0 }">
      <!-- 封面 -->
      <div class="relative lg:w-2/5">
        <!-- 标题 -->
        <!-- <div
          class="absolute group-hover:opacity-0 text-4xl z-10 top-1/2 left-1/2 translate-[-50%] text-white font-semibold tracking-wide card-title uppercase">
          {{ props.title }}
        </div> -->
        <!-- 勋章 -->
        <!-- <img
          class="h-48 w-full absolute -z-0 inset-0 blur blur-sm object-cover md:h-full  w-full dark:brightness-50 transition-transform duration-300 ease-in-out group-hover:blur-2xl"
          src="../../../public/favicon.ico" alt="Modern building architecture" /> -->
        <img
          class="h-48 w-full  object-cover md:h-full  w-full dark:brightness-50 transition-transform duration-300 ease-in-out group-hover:scale-105"
          :src="props.cover" alt="Modern building architecture" />
      </div>
      <!-- 内容 -->
      <div class="p-8 w-full card-body">

        <!-- 标题 -->
        <a href="#" class="mt-1 group-hover:text-accent block text-xl leading-tight font-medium text-pretty">
          {{ props.title }}
        </a>
        <!-- 描述信息 -->
        <p class="mt-2 text-accent-content text-sm">
          {{ props.desc }}
        </p>
        <div class="flex text-sm w-full justify-between flex-col space-y-2 " v-if="props.tags.length > 0">
          <div class="flex space-x-3 items-center">
            <!-- 标签 -->
            <div class="flex  items-center">
              <SolarHashtagCircleBoldDuotone class=" mr-2" />
              <span>{{ props.tags.join(' ') }}</span>
            </div>
            <!-- 更新时间 -->
            <div class="flex items-center text-accent-content">
              <IconoirClock class=" text-accent-content mr-2"></IconoirClock>
              <span>{{ props.updateTime }}</span>
            </div>
          </div>

          <!-- 点赞 | 浏览量 -->
          <div class="flex space-x-3 text-info-content">
            <!-- 浏览量 -->
            <div class="flex items-center ">
              <ViewIcon class="text-accent-content mr-2"></ViewIcon>
              <span>{{ props.view }}</span>
            </div>
            <!-- 点赞 -->
            <div class="flex items-center">
              <LikeIcon class="text-accent-content mr-2"></LikeIcon>
              <span>{{ props.like }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.blur {
  filter: blur(8px);
}
</style>
