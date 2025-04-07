<script setup lang="ts">
import { ref } from 'vue';

interface TabType {
  path: string;
  name: string;
}

// 使用 withDefaults 定义默认值
const props = withDefaults(
  defineProps<{
    tabs: Array<TabType>; // 明确声明 props 名称为 tabs
  }>(),
  {
    tabs: () => [
      { path: '/', name: '首页' }, // 默认值是一个函数返回的数组
    ],
  }
);

// 当前选中的标签路径
const activePath = ref<string>(props.tabs[0]?.path || '/');

// 点击切换选中标签
const setActiveTab = (path: string) => {
  activePath.value = path;
};
</script>

<template>
  <div role="tablist" class="tabs">
    <!-- 动态渲染 tabs -->
    <a v-for="(tab, index) in props.tabs" :key="index" role="tab" class="tab"
      :class="{ 'tab-active': activePath === tab.path }" @click="setActiveTab(tab.path)">
      {{ tab.name }}
    </a>
  </div>
</template>
