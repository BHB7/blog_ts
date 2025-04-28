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
    pageData.emit('data', res)
  } catch (e) {
    console.error('获取文章失败:', e)
  }
}

// 解码 HTML 实体
function decodeHtmlEntities(html = ''): string {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value || txt.textContent || ''
}

// 提取代码块并清理正文
function extractAndClean(content = '') {
  const regex = /<pre>\s*<code\s+class="language-(.*?)">(.*?)<\/code>\s*<\/pre>/gims
  const blocks: { language: string; code: string }[] = []
  let cleaned = content
  let m: RegExpExecArray | null
  while ((m = regex.exec(content)) !== null) {
    blocks.push({ language: m[1], code: m[2] })
    cleaned = cleaned.replace(m[0], '')
  }
  return { cleaned, blocks }
}

const cleanedContent = ref('')
const codeBlocks = ref<{ language: string; code: string }[]>([])

watch(article, (art) => {
  if (!art?.content) return
  const { cleaned, blocks } = extractAndClean(art.content)
  cleanedContent.value = decodeHtmlEntities(cleaned)
  codeBlocks.value = blocks
})


// ----- 新增：根据主题切换高亮样式表 -----
function applyHighlightTheme(theme: string) {
  const lightLink = document.getElementById('hljs-light') as HTMLLinkElement
  const darkLink = document.getElementById('hljs-dark') as HTMLLinkElement
  if (lightLink && darkLink) {
    lightLink.disabled = (theme !== 'light')
    darkLink.disabled = (theme !== 'dark')
  }
}


// 监听主题变化：切换样式 + 重新高亮
watch(() => themeStore.theme, async (t) => {
  applyHighlightTheme(t)
  // 等样式表切换后，再次高亮已渲染的代码块
  await nextTick()
  document.querySelectorAll('pre code').forEach(el =>
    hljs.highlightElement(el as HTMLElement)
  )
}, { immediate: true })
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="card bg-base-100 shadow-xl overflow-hidden">
      <div class="card-body prose max-w-full">
        <!-- 正文（已解码） -->
        <div v-if="cleanedContent" class="prose max-w-full con" v-html="cleanedContent"></div>
        <!-- 高亮代码块 -->
        <div v-if="codeBlocks.length" class="mt-8">
          <h2 class="text-2xl font-bold mb-4">代码块</h2>
          <div v-for="(blk, i) in codeBlocks" :key="i" class="my-4">
            <h3 class="text-lg font-bold">{{ blk.language }}</h3>
            <highlightjs :language="blk.language" :code="blk.code" />
          </div>
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
