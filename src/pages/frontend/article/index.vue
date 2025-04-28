<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import hljs from 'highlight.js/lib/core'
import { getArticleByIdApi, type ArticleTypeVo } from '@/apis'
import Copyright from '@/components/article/copyright.vue'
import { pageData } from '@/events/event'
import { useThemeStore, type ThemeType } from '@/store'
const themeStore = useThemeStore()

const route = useRoute()
const article = ref<ArticleTypeVo | null>(null)
const aid = ref<number | null>(null)

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
})

// 请求文章并发出事件
async function fetchArticle(id: number) {
  try {
    const res = await getArticleByIdApi(id)
    article.value = res
    console.log(extractAndClean(article.value?.content));
    pageData.emit('data', res)
  } catch (e) {
    console.error('获取文章失败:', e)
  }
}

// 提取代码块并清理正文
function extractAndClean(content = '') {
  // 正则表达式
  const regex = /<pre>\s*<code\s+class="language-(.*?)">([\s\S]*?)<\/code>\s*<\/pre>/g;
  // 提取内容
  let match;
  while ((match = regex.exec(content)) !== null) {
    const language = match[1]; // 语言类型
    const codeContent = match[2]; // 代码内容
    console.log("语言类型:", language);
    console.log("代码内容:\n", codeContent);
  }
}


const cleanedContent = ref('')
const codeBlocks = ref<{ language: string; code: string }[]>([])


</script>

<template>
  <div class="container mx-auto p-4">
    <div class="card bg-base-100 shadow-xl overflow-hidden">
      <div class="card-body prose max-w-full">
        <!-- 正文（已解码） -->
        <div v-if="cleanedContent" class="prose max-w-full con" v-html="cleanedContent"></div>
        <!-- 高亮代码块 -->
        <highlightjs language='javascript' code="const s = new Date().toString()" />
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
