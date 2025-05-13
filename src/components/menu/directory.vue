<script setup lang="ts">
import type { ArticleTypeVo } from '@/apis'
import { pageData } from '@/events/event'
import { nextTick, onMounted, ref } from 'vue'


const h1Cont = ref<Array<string>>([])
const title = ref()
const ulRef = ref<HTMLUListElement | null>(null)
// 监听文章详情数据
pageData.on('data', (data: ArticleTypeVo) => {
  console.log(data, '目录收到消息')
  title.value = data.title
  const cont = data.content
  const regex = /<h1[^>]*>(.*?)<\/h1>/gi
  let matches;
  while ((matches = regex.exec(cont)) !== null) {
    h1Cont.value.push(matches[1])
  }

})

</script>

<template>
  <ul ref="ulRef" class="list bg-blur bg-base-300/70 rounded-box relative shadow-md">
    <li class="p-4 pb-2 text-md font-bold opacity-60 tracking-wide text-primary">{{ title }}</li>
    <li v-for="(item, index) in h1Cont" :key="item" class="list-row ">
      <span class="mx-2">
        {{ item }}
      </span>
    </li>
  </ul>
</template>


<style scoped lang="scss">
.list {
  --ph: 0;
  --progress: 0;

  &::after {
    transform: rotate(90deg);
    transform-origin: calc(0);
    top: 40px;
    left: 18px;
    content: '';
    width: var(--ph);
    height: 2px;
    border-radius: 10px;
    background: var(--color-primary-content);
    position: absolute;

  }

  &::before {
    z-index: 1;
    transform: rotate(90deg);
    transform-origin: calc(0);
    top: 40px;
    left: 18px;
    content: '';
    width: calc(var(--progress) / 100 * var(--ph));
    height: 2px;
    border-radius: 10px;
    background: var(--color-primary);
    position: absolute;
  }

}
</style>
