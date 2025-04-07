<script setup lang="ts">
import Article from '@/components/article/index.vue'
import Tabs from '@/components/tabs/index.vue'
import router from '@/routers';
import { music } from '@/events/event'

music.on('test', (e: any) => {
  console.log('测试', e);
})
</script>

<template>
  <Tabs :tabs="[{ path: '/l', name: '测试' }, { path: '/s', name: '测试我' }]"></Tabs>
  <Article @click="router.push('/article')" v-up v-for="(index, item) in 5" :key="item" :index="index"
    :title="index.toString()"></Article>
</template>
