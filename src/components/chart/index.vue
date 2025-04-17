<script setup lang="ts">
// 引入 ECharts 核心模块
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import type { EChartsOption } from 'echarts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import debonce from '@/utils/debonce'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  LegendComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const props = withDefaults(defineProps<{
  option?: EChartsOption
  height?: string
  width?: string
  title?: string
  showTabs?: boolean
}>(), {
  option: () => ({}), // 避免未定义
  height: '240px',
  width: '100%',
  title: '',
  showTabs: false
});

const chart_cont = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

const initChart = () => {
  if (chart_cont.value) {
    chart = echarts.init(chart_cont.value);
    chart.setOption(props.option);
  }
};

onMounted(() => {
  initChart();

  const handleResize = () => {
    chart?.resize();
  };
  window.addEventListener('resize', debonce(handleResize, 200));

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    chart?.dispose();
  });
});

// 响应式更新 option（可选）
watch(() => props.option, (newOption) => {
  if (chart) chart.setOption(newOption);
}, { deep: true });

</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-2" v-if="title || showTabs">
      <div v-if="title" class="text-lg font-semibold">{{ title }}</div>
      <div v-if="showTabs" class="tabs tabs-box">
        <input type="radio" name="tabs" class="tab" aria-label="近一周" />
        <input type="radio" name="tabs" class="tab" aria-label="近一月" checked />
      </div>
    </div>
    <div ref="chart_cont" class="rounded-xl" :style="{ height: height, width: width }" />
  </div>
</template>

<style scoped>
.tabs-box {
  display: flex;
  gap: 0.5rem;
}

.tab {
  cursor: pointer;
}
</style>
