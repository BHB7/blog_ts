import { pageData } from '@/events/event'
import { useThemeStore } from '@/store'
import { getArticleByIdApi, type ArticleTypeVo } from '@/apis'
import { ref, watch } from 'vue'


const useArticleHook = () => {
  const themeStore = useThemeStore()
  const article = ref<ArticleTypeVo | null>(null)
  // 缓存 link 元素
  let highlightStyle: any = null
  // 存储提取后的内容
  const extractedContent = ref<
    { type: 'text' | 'code'; content: string; language?: string }[]
  >([])


  // 请求文章并发出事件
  async function fetchArticle(id: number) {
    try {
      const res = await getArticleByIdApi(id)
      article.value = res
      extractAndClean(res.content || '')
      pageData.emit('articleData', res)
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
  watch(
    () => themeStore.theme,
    (newTheme) => {
      const href =
        newTheme === 'dark'
          ? 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/vs2015.min.css'
          : 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/a11y-light.min.css';

      if (!highlightStyle) {
        highlightStyle = document.createElement('link');
        highlightStyle.rel = 'stylesheet';
        document.head.appendChild(highlightStyle);
      }

      highlightStyle.href = href;
    },
    {
      immediate: true
    })

  return {
    article,
    extractedContent,
    fetchArticle
  }
}

export default useArticleHook
