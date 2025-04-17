<script setup lang="ts">
import Article from '@/components/article/index.vue'
import Tabs from '@/components/tabs/index.vue'
import router from '@/routers';
import { music } from '@/events/event'
import { getArticles, type ArticleTypeVo } from '@/apis/index'
import { ref } from 'vue';

music.on('test', (e: unknown) => {
  console.log('测试', e);
})

const pageList = ref<Array<ArticleTypeVo>>()

const init = async () => {
  const res = await getArticles()
  console.log(res.data);

  pageList.value = res.data.list
  console.log(pageList.value);

}
init()
</script>

<template>
  <Tabs :tabs="[{ path: '/l', name: '测试' }, { path: '/s', name: '测试我' }]"></Tabs>
  <Article v-for="(item, index) in pageList" :tags="['vue']" :update-time="item.updatedAt" :view="item.view"
    :key="item.id" :desc="item.desc" :index="index" :title="item.title">
  </Article>
</template>
