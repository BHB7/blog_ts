<script setup lang="ts">
import SolarHashtagCircleBoldDuotone from '~icons/solar/hashtag-circle-bold-duotone';
import IconoirClock from '~icons/iconoir/clock';
import ViewIcon from '~icons/hugeicons/view';
import LikeIcon from '~icons/stash/thumb-up-light';
import { computed, ref, useAttrs } from 'vue';
import formatTime from '@/utils/formatDate';

// 定义文章 Props 类型
interface ArticlePropsTypeVO {
  id?: string | number;
  view?: string | number;
  updatedAt: string | Date;
  createdAt: string | Date;
  tags: { id: string | number; name: string; des: string }[];
  title: string; // 标题
  cover: string; // 封面图片 URL
  desc: string; // 描述
  like?: number | string; // 点赞
  index?: number | string;
}

interface ArticlePropsListVO {
  list?: Array<ArticlePropsTypeVO>;
  isLoading?: boolean;
}

// 设置默认值
const props = withDefaults(defineProps<ArticlePropsListVO>(), {
  list: () => [],
  isLoading: true
});

// 使用 attrs 来处理非 prop 的属性（例如 class）
const attrs = useAttrs()
</script>

<template>
  <!-- 包裹成单个根节点 -->
  <div>
    <!-- 骨架屏 -->
    <div v-bind="attrs" v-if="props.isLoading" v-for="index in 5"
      class="group w-full card shadow-sm card-border max-w-md overflow-hidden  bg-base-300/70 md:max-w-2xl hover:border-2 hover:border-accent border-1 border-neutral hover:shadow-lg transition-all">
      <div class="md:flex" :class="{ 'md:flex-row-reverse': +index % 2 !== 0 }">
        <div class="skeleton h-48 lg:w-2/5 w-full lg:m-2"></div>
        <!-- 内容 -->
        <div class="p-8 w-full card-body">
          <div class="skeleton h-4 w-28"></div>
          <div class="skeleton h-4 w-full"></div>
          <div class="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>

    <template v-else>
      <div v-bind="attrs" v-for="(item, index) in props.list" @click="$router.push(`/article?aid=${item.id}`)"
        :title="item.title"
        class="group w-full card shadow-sm card-border max-w-md overflow-hidden bg-base-300/80 md:max-w-2xl hover:border-2 hover:border-accent border-1 border-neutral hover:shadow-lg transition-all">
        <div class="md:flex" :class="{ 'md:flex-row-reverse': +index % 2 !== 0 }">
          <!-- 封面 -->
          <div class="relative lg:w-2/4 w-full h-52 lg:h-58 overflow-hidden">
            <img
              class="w-full h-full object-cover darkbg transition-transform duration-300 ease-in-out group-hover:scale-105"
              :src="item.cover" alt="Modern building architecture" />
          </div>
          <!-- 内容 -->
          <div class="p-8 w-full card-body">
            <!-- 标题 -->
            <a href="#" class="mt-1 group-hover:text-accent block text-xl leading-tight font-medium text-pretty">
              {{ item.title }}
            </a>
            <!-- 描述信息 -->
            <p class="mt-2 text-accent-content line-clamp-2 text-sm">
              {{ item.desc }}
            </p>
            <div class="flex text-sm w-full flex-col space-y-2 ">
              <div class="flex space-x-3 items-center">
                <!-- 标签 -->
                <div v-if="item.tags.length > 0" class="flex items-center">
                  <SolarHashtagCircleBoldDuotone class="mr-2" />
                  <span>{{item.tags.map(tag => tag.name).join(' ')}}</span> <!-- 修改为显示标签名 -->
                </div>
                <!-- 更新时间 -->
                <div class="flex items-center text-accent-content">
                  <IconoirClock class="text-accent-content mr-2"></IconoirClock>
                  <span>{{ formatTime(item.updatedAt || item.createdAt) }}</span>
                </div>
              </div>
              <!-- 点赞 | 浏览量 -->
              <div class="flex space-x-3 text-info-content">
                <!-- 浏览量 -->
                <div class="flex items-center">
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
  </div>
</template>

<style scoped lang="scss">
.blur {
  filter: blur(8px);
}

html[data-theme="dark"] .darkbg {
  --tw-brightness: brightness(50%);
  filter: var(--tw-blur, ) var(--tw-brightness, ) var(--tw-contrast, ) var(--tw-grayscale, ) var(--tw-hue-rotate, ) var(--tw-invert, ) var(--tw-saturate, ) var(--tw-sepia, ) var(--tw-drop-shadow, );
}
</style>
