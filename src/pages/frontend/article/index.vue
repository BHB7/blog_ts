<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import hljs from 'highlight.js/lib/core'
import { getArticleByIdApi, type ArticleTypeVo } from '@/apis'
import Copyright from '@/components/article/copyright.vue'
import { pageData } from '@/events/event'

const route = useRoute()
const article = ref<ArticleTypeVo | null>(null)
const aid = ref<number | null>(null)

// 存储提取后的内容
const extractedContent = ref<
  { type: 'text' | 'code'; content: string; language?: string }[]
>([])

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
    extractAndClean(res.content || '')
    pageData.emit('data', res)
  } catch (e) {
    console.error('获取文章失败:', e)
  }
}

// 提取代码块和普通文本
function extractAndClean(content = '') {
  // 清空之前的内容
  extractedContent.value = []

  // 正则表达式匹配代码块
  const codeBlockRegex = /<pre>\s*<code\s+class="language-(.*?)">([\s\S]*?)<\/code>\s*<\/pre>/g

  // 匹配普通文本
  const textRegex = /([^<]+)(?=<|$)/g

  let lastIndex = 0

  // 匹配代码块
  let codeMatch
  while ((codeMatch = codeBlockRegex.exec(content)) !== null) {
    const [fullMatch, language, codeContent] = codeMatch

    // 添加代码块前的普通文本
    const precedingText = content.slice(lastIndex, codeMatch.index).trim()
    if (precedingText) {
      extractedContent.value.push({ type: 'text', content: precedingText })
    }

    // 添加代码块
    extractedContent.value.push({
      type: 'code',
      language,
      content: codeContent,
    })

    lastIndex = codeMatch.index + fullMatch.length
  }

  // 添加剩余的普通文本
  const remainingText = content.slice(lastIndex).trim()
  if (remainingText) {
    extractedContent.value.push({ type: 'text', content: remainingText })
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="card bg-base-100 shadow-xl overflow-hidden">
      <div class="card-body prose max-w-full">
        <!-- 动态渲染提取后的内容 -->
        <div v-for="(item, index) in extractedContent" :key="index">
          <div v-if="item.type === 'text'" class="prose max-w-full con" v-html="item.content"></div>
          <highlightjs v-else :language="item.language" :code="item.content" />
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
