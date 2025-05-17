<script setup lang="ts">
import Article from '@/components/article/index.vue'
import router from '@/routers'
import Pagination from '@/components/pagination/index.vue'
import { music } from '@/events/event'
import { type ArticleTypeVo } from '@/apis/index'
import { onMounted, ref } from 'vue';
import { getArticlesApi } from '@/apis';
import HomeHeader from '@/components/header/homeHeader.vue'

const pageList = ref<Array<ArticleTypeVo>>()
const isLoading = ref(true)
async function init() {
  isLoading.value = true
  try {
    const res = await getArticlesApi({ state: '000' })
    pageList.value = res.list
  } catch (error) {
    console.error('获取文章失败:', error)
    pageList.value = []
  } finally {
    isLoading.value = false
  }
}


onMounted(() => {
  console.log('111');

  init()
})
</script>

<template>

  <Article :isLoading="isLoading" :list="pageList" class="mx-auto w-full space-y-5" />

</template>
