<script setup lang="ts">
import Article from '@/components/article/index.vue'
import Tabs from '@/components/tabs/index.vue'
import router from '@/routers'
import Pagination from '@/components/pagination/index.vue'
import { music } from '@/events/event'
import { type ArticleTypeVo } from '@/apis/index'
import { ref } from 'vue';
import { getArticlesApi } from '@/apis';

const pageList = ref<Array<ArticleTypeVo>>()
const isLoading = ref(true)
async function init() {
  isLoading.value = true
  try {
    const res = await getArticlesApi()
    pageList.value = res.list
  } catch (error) {
    console.error('获取文章失败:', error)
    pageList.value = []
  } finally {
    isLoading.value = false
  }
}


init()
</script>

<template>
  <Tabs :tabs="[{ path: '/l', name: '热门' }, { path: '/s', name: '最新' }]"></Tabs>
  <Article :isLoading="isLoading" :list="pageList" />
  <Pagination></Pagination>
</template>
