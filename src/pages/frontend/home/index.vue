<script setup lang="ts">
import Article from '@/components/article/index.vue'
import Tabs from '@/components/tabs/index.vue'
import router from '@/routers';
import { music } from '@/events/event'
import { getArticlesApi, type ArticleTypeVo } from '@/apis/index'
import { ref } from 'vue';

music.on('test', (e: unknown) => {
  console.log('测试', e);
})

const pageList = ref<Array<ArticleTypeVo>>()

async function init() {
  const res = await getArticlesApi()
  console.log(res);

  pageList.value = res.list
  console.log(pageList.value);

}
init()
</script>

<template>
  <Tabs :tabs="[{ path: '/l', name: '热门' }, { path: '/s', name: '最新' }]"></Tabs>
  <Article v-for="(item, index) in pageList" :cover="item.cover" :like="0" :tags="['vue']"
    :update-time="item.updatedAt || ''" :view="item.view || ''" :key="item.id" :desc="item.desc" :index="index"
    :title="item.title">
  </Article>
</template>
