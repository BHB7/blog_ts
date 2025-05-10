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
  <div ref="contRef" class="container mx-auto p-4">
    <div class="card card-border bg-base-100 shadow-xl overflow-hidden">
      <div ref="obsRef" class="card-body prose max-w-full">
        <!-- 动态渲染提取后的内容 -->
        <div v-for="(item, index) in extractedContent" :key="index">
          <div v-if="item.type === 'text'" class="prose max-w-full text-wrap con " v-html="item.content"></div>
          <highlightjs class="mockup-code bg-base-100" v-else :language="item.language" :code="item.content" />
        </div>
      </div>
    </div>
    <!-- 版权声明 -->
    <Copyright />
  </div>
</template>

<style scoped lang="scss">
::v-deep .con {
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: normal;
  max-width: 100%;

  // 基础样式定义
  $h1-size: 2rem;
  $h2-size: 1.75rem;
  $h3-size: 1.5rem;
  $h4-size: 1.25rem;
  $h5-size: 1rem;
  $h6-size: 0.875rem;

  $base-line-height: 1.2; // 标题的行高比例
  $margin-bottom: 1em; // 标题底部的默认间距

  @mixin heading-base {
    margin-top: 0;
    margin-bottom: $margin-bottom;
    font-weight: bold;
    line-height: $base-line-height;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @include heading-base;
  }

  h1 {
    font-size: $h1-size;
  }

  h2 {
    font-size: $h2-size;
  }

  h3 {
    font-size: $h3-size;
  }

  h4 {
    font-size: $h4-size;
  }

  h5 {
    font-size: $h5-size;
  }

  h6 {
    font-size: $h6-size;
  }

  // 响应式调整
  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.25rem;
    }

    h4 {
      font-size: 1.125rem;
    }

    h5 {
      font-size: 1rem;
    }

    h6 {
      font-size: 0.875rem;
    }
  }
}
</style>
