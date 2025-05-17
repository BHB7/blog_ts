<script setup lang="ts">
import curve from '@/components/chart/index.vue'
import { useRouter } from 'vue-router'
import useAdminHomeHook from './hooks/useAdminHomeHook'


const { isLoading, overallList, getOverallList, option, optionPie } = useAdminHomeHook()
const router = useRouter()
getOverallList()
</script>

<template>
  <div class=" space-y-4">

    <div class="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      <!-- loading... 骨架屏 -->
      <template v-if="isLoading">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-32 w-full"></div>
      </template>
      <!-- item 列 加载完毕 -->
      <template v-else>
        <div v-for="(item) in overallList"
          :class="{ 'bg-accent border-2 border-accent bg-primary-b bg-from-amber ': item.canAdd }" :key="item.name"
          class=" bg-base-200 space-y-3 p-5 rounded-2xl flex items-center justify-between">
          <div class=" space-y-2">
            <p class=" text-base-content min-w-18">{{ item.zh }}</p>
            <div class="text-nowrap text-2xl font-bold">{{ item.total }}</div>
          </div>
          <div class="mx-2" v-if="item.addPath" @click="router.push(item.addPath)">
            <button class="btn">+</button>
          </div>
        </div>
      </template>
    </div>
    <!-- 内容 -->
    <div class="flex flex-col xl:flex-row gap-4">
      <div class="w-full xl:w-2/3 space-y-4 pb-20">
        <div class="w-full max-w-full min-h-[280px] md:min-h-[340px] bg-base-100 rounded-xl shadow p-4">
          <curve show-tabs title="访问量" :option="option" />
        </div>
        <div class="w-full max-w-full min-h-[280px] md:min-h-[340px] bg-base-100 rounded-xl shadow p-4">
          <curve show-tabs title="数据监测" :option="optionPie" />
        </div>
      </div>

      <!-- 右侧菜单 -->
      <div class="w-full xl:w-1/3 space-y-4 hidden xl:block">
        <div class="p-4 bg-base-100 rounded-box shadow space-y-4 w-full">
          <!-- 顶部标题 + 删除 -->
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">评论 1234</h2>
            <button class="btn btn-sm btn-ghost text-gray-400 hover:text-error">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m6-3v3" />
              </svg>
            </button>
          </div>

          <!-- 评论主体 -->
          <div class="flex gap-4">
            <!-- 头像 -->
            <div class="avatar placeholder">
              <div class="bg-base-200 text-neutral-content rounded-full w-12 h-12">
                <span class="text-2xl">👤</span>
              </div>
            </div>

            <!-- 内容部分 -->
            <div class="flex-1 space-y-1">
              <!-- 名称 + 时间 -->
              <div class="text-sm text-gray-500">
                <span class="font-semibold text-base-content">哈举办</span>
                <span class="ml-2 text-xs">2024–01–18 14:32:32</span>
              </div>

              <!-- 评论内容 -->
              <p class="text-base">很高心见到了你，你是那么的美丽动人！</p>

              <!-- 文章链接 tag -->
              <div class="mt-1">
                <span class="badge badge-outline badge-primary">逸刻时光</span>
              </div>
            </div>
          </div>

          <div class="join">
            <button class="join-item btn">1</button>
            <button class="join-item btn">2</button>
            <button class="join-item btn btn-disabled">...</button>
            <button class="join-item btn">99</button>
            <button class="join-item btn">100</button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
