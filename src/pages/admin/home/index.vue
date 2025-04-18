<script setup lang="ts">
import curve from '@/components/chart/index.vue';
import { useRouter } from 'vue-router';
import { showModal } from '@/utils/showModal';
import type { EChartsOption } from 'echarts';
const router = useRouter()
const option: EChartsOption = {
  xAxis: {
    type: 'category' as const, // 👈 加上 `as const` 保证是字面量
    data: ['1', '2', '3', '4', '5', '6', '7'],
  },
  yAxis: {
    type: 'value' as const,
  },
  series: [
    {
      data: [500, 100, 100, 300, 400],
      type: 'line' as const,
      smooth: true,
    },
  ],
};

const optionPie: EChartsOption = {
  baseOption: {
    title: [
      {
        text: '234',
        subtext: '设备总数',
        left: '25%',
        top: 'center',
        textAlign: 'center',
        textStyle: {
          fontSize: 32,
          fontWeight: 'bold',
          color: '#ccc',
        },
        subtextStyle: {
          fontSize: 16,
          color: '#666',
        },
      },
      {
        text: '24',
        subtext: '访问总数',
        left: '75%',
        top: 'center',
        textAlign: 'center',
        textStyle: {
          fontSize: 32,
          fontWeight: 'bold',
          color: '#ccc',
        },
        subtextStyle: {
          fontSize: 16,
          color: '#666',
        },
      },
    ],
    tooltip: { show: false },
    legend: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['75%', '90%'],
        center: ['25%', '50%'],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 180, name: '正常', itemStyle: { color: '#296CFF' } },
          { value: 54, name: '异常', itemStyle: { color: '#FF4E4E' } },
        ],
      },
      {
        type: 'pie',
        radius: ['75%', '90%'],
        center: ['75%', '50%'],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 6, name: 'A', itemStyle: { color: '#FFD166' } },
          { value: 6, name: 'B', itemStyle: { color: '#296CFF' } },
          { value: 6, name: 'C', itemStyle: { color: '#FF4E4E' } },
          { value: 6, name: 'D', itemStyle: { color: '#06D6A0' } },
          { value: 6, name: 'E', itemStyle: { color: '#EF476F' } },
        ],
      },
    ],
  },
  media: [
    {
      query: {
        maxWidth: 500, // 小屏（移动端）适配
      },
      option: {
        title: [
          {
            left: '50%',
            top: '25%',
            textAlign: 'center',
          },
          {
            left: '50%',
            top: '75%',
            textAlign: 'center',
          },
        ],
        series: [
          {
            radius: ['50%', '65%'],
            center: ['50%', '25%'], // 👈 第一个圆移动到上方
          },
          {
            radius: ['50%', '65%'],
            center: ['50%', '75%'], // 👈 第二个圆移动到下方
          },
        ],
      },
    },
  ],
};


</script>

<template>
  <div class="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <!-- item 列 -->
    <div v-for="item in 4" :key="item" class=" bg-base-200 space-y-3 p-5 rounded-2xl flex items-center justify-between">
      <div class=" space-y-2">
        <p class=" text-base-content min-w-18">本地文件</p>
        <div class=" text-nowrap text-2xl font-bold">{{ item }}M</div>
      </div>
      <div class="mx-2" v-if="item > 1">
        <button class="btn">+</button>
      </div>
    </div>
  </div>

  <Layout>

  </Layout>
  <!-- 内容 -->
  <div class="flex flex-col xl:flex-row gap-4">
    <div class="w-full xl:w-2/3 space-y-4">
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


</template>
