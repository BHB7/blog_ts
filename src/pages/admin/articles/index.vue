<script setup lang="ts">
import LineMdPlus from '~icons/line-md/plus'
import LineMdCogFilled from '~icons/line-md/cog-filled'
import LineMdMinus from '~icons/line-md/minus';
import ViewIcon from '~icons/hugeicons/view'
import LikeIcon from '~icons/stash/thumb-up-light'
import LineMdChat from '~icons/line-md/chat'
import EditIcon from '~icons/line-md/edit-full-twotone'
import LineMdTrash from '~icons/line-md/trash'
import LineMdTelegram from '~icons/line-md/telegram'
import useArticleHook from './hooks/useAriclesHooks'
import type { Tag } from '@/apis'
import { ref } from 'vue'
const {
  tagList,
  getTagList,
  createTag,
  articleList,
  getArticleList,
  delArticle,
  changeArticleState,
  btnState,
  articleParams
} = useArticleHook()




const state = ref('010')
const getState = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (articleParams.value) {
    articleParams.value.state = input.value
  }
  getArticleList()
}
const clickDel = async (aid: string | number) => {
  await delArticle(aid)
}
// TODO
// 创建标签处理事件
const clickHanelTag = (tag: Tag) => {
  createTag(tag)
}


const clickChangeArticleState = (aid: number | string, state: string) => {
  changeArticleState(aid, state)
}
const init = () => {
  getTagList()
  getArticleList()
}
init()

</script>

<template>

  <!-- name of each tab group should be unique -->
  <div class="space-x-2 my-2 flex">
    <label class="input ">
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search" class="grow" placeholder="Search" />
      <kbd class="kbd kbd-sm">⌘</kbd>
      <kbd class="kbd kbd-sm">K</kbd>
    </label>
    <div class="tooltip tooltip-bottom" data-tip="创建文章">
      <button @click="$router.push('/admin/posts')" class="btn btn-md btn-ghost hover:text-warning">
        <LineMdPlus />
      </button>
    </div>
  </div>
  <div class="tabs tabs-box justify-between p-3">
    <form @change="getState">
      <input type="radio" value="010" name="my_tabs_1" class="tab" aria-label="待审核" checked />
      <input type="radio" value="000" name="my_tabs_1" class="tab" aria-label="已发布" />
      <input type="radio" value="100" name="my_tabs_1" class="tab" aria-label="草稿" />
    </form>
  </div>

  <!-- 内容 -->
  <div class="flex flex-col xl:flex-row gap-4 mt-2">
    <!-- 左侧 -->
    <div class="w-full xl:w-2/3 space-y-4 pb-20">

      <!-- 文章item -->
      <div v-for="(article) in articleList" :key="article.id"
        class="card card-side bg-base-100 shadow-sm hover:shadow-md transition-all my-4 flex-col lg:flex-row">
        <!-- 左侧封面 -->
        <div
          class="relative lg:w-50 h-38 min-w-40 border-2 border-accent-content w-full lg:rounded-l-xl overflow-hidden rounded-t-box">
          <img class="object-cover  w-full h-full" :src="article.cover" alt="封面" />
          <div
            :class="{ 'to-error/70': article.state === '010' ? true : false, 'to-success/70': article.state === '000' }"
            class="absolute bottom-0 from-primary h-10 w-full bg-linear-20  text-white text-center text-md font-light">
            {{ article.state === '010' ? '未审核' : article.state === '100' ? '草稿' : '已发布' }}
          </div>
        </div>
        <div class="card-body py-4 px-4 card-border">
          <!-- 标题 -->
          <h2 class="card-title text-base sm:text-lg font-semibold">{{ article.title }}</h2>

          <!-- 摘要 -->
          <p class="text-sm text-gray-500 leading-snug line-clamp-2">
            {{ article.desc }}
          </p>

          <!-- 分类 + 时间 + 统计 + 操作 -->
          <div class="flex flex-wrap items-center justify-between text-xs text-gray-400 mt-2 gap-2">
            <!-- 分类和时间 -->
            <div class="flex items-center gap-2">
              <span>所见/旅游 西北</span>
              <span class="text-gray-300">|</span>
              <span>{{ article.createdAt }}</span>
            </div>

            <!-- 阅读、点赞、评论 -->
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <ViewIcon /> {{ article.view }}
              </span>
              <span class="flex items-center gap-1">
                <LikeIcon /> 0
              </span>
              <span class="flex items-center gap-1">
                <LineMdChat /> {{ article.view }}
              </span>
            </div>

            <!-- 操作按钮 -->
            <div class="ml-auto flex gap-2 text-gray-400">
              <div class="tooltip"
                :data-tip="article.state === '010' ? '发布文章' : article.state === '100' ? '发布' : '撤销文章'">
                <!-- 发布 -->
                <button v-if="article.state !== '000'"
                  @click="clickChangeArticleState(article.id, article.state === '010' ? '000' : '010')"
                  :disabled="btnState" class="btn btn-md btn-ghost hover:text-warning">
                  <LineMdTelegram />
                </button>
                <!-- 撤销文章 不可见  草稿-->
                <button v-if="article.state === '000'" @click="clickChangeArticleState(article.id, '100')"
                  :disabled="btnState" class="btn btn-md btn-ghost hover:text-warning">
                  <LineMdMinus />
                </button>
              </div>
              <button :disabled="btnState" class="btn btn-md btn-ghost hover:text-info">
                <EditIcon />
              </button>
              <button :disabled="btnState" class="btn btn-md btn-ghost hover:text-error">
                <LineMdTrash @click="(e: Event) => clickDel(article.id || '')" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧菜单 -->
    <div class="w-full xl:w-1/3 space-y-4 hidden xl:block">
      <div class="card w-full card-border card-side bg-base-100 shadow-sm hover:shadow-md transition-all">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <h1 class="text-md font-bold">标签</h1>
            <LineMdPlus class="btn" />
          </div>
          <div class=" grid grid-cols-3 gap-3">
            <button v-for="(item, index) in tagList" :key="item.id" class="btn btn-sm">{{ item.name }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped lang="scss">
.bg-blur {
  backdrop-filter: blur(60px);
}
</style>
