<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Copyright from '@/components/article/copyright.vue'
import useArticleHook from '@/pages/frontend/article/hooks/useArticle'
import { pageData } from '@/events/event'
const route = useRoute()
const aid = ref<number | null>(null)
const flagRef = ref<HTMLElement | null>(null)
const obsRef = ref<HTMLElement | null>(null)

const { fetchArticle, extractedContent } = useArticleHook()
const hList = ref()
// 解析 aid，只执行一次
onMounted(() => {
  const q = route.query.aid
  const raw = Array.isArray(q) ? q[0] : q
  const n = Number(raw)
  if (!isNaN(n)) {
    aid.value = n
    fetchArticle(n)
  } else {
    console.error('无效的 aid 参数:', raw)
  }
  // TODO 获取所有标题DOM 传递给子组件 渲染
  // nextTick(() => {
  //   console.log(extractedContent.value[0])
  // })

})

</script>

<template>
  <div ref="flagRef" id="nav" class=" fixed z-2 left-20 top-30 w-40 bg-amber-300 transform-fill">000</div>
  <div ref="contRef" class="container mx-auto p-4">
    <div class="card card-border bg-base-100 shadow-xl overflow-hidden">
      <div ref="obsRef" class="card-body prose max-w-full">
        <!-- 动态渲染提取后的内容 -->
        <div v-for="(item, index) in extractedContent" :key="index">
          <div v-if="item.type === 'text'" class="prose max-w-full con" v-html="item.content"></div>
          <highlightjs class="mockup-code bg-base-100" v-else :language="item.language" :code="item.content" />
        </div>
      </div>
    </div>
    <!-- 版权声明 -->
    <Copyright />
  </div>
</template>

<style scoped lang="scss">
.con {
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: normal;
  max-width: 100%;
}
</style>
