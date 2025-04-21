<script setup lang="ts">
import LineMdPlus from '~icons/line-md/plus';
import LineMdCogFilled from '~icons/line-md/cog-filled';
import ViewIcon from '~icons/hugeicons/view';
import LikeIcon from '~icons/stash/thumb-up-light';
import LineMdChat from '~icons/line-md/chat';
import EditIcon from '~icons/line-md/edit-full-twotone';
import LineMdTrash from '~icons/line-md/trash';
import LineMdTelegram from '~icons/line-md/telegram';
</script>

<template>
  <!-- name of each tab group should be unique -->
  <div class=" space-x-2 my-2 flex">
    <label class="input">
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
    <div>
      <input type="radio" name="my_tabs_1" class="tab" aria-label="Tab 1" />
      <input type="radio" name="my_tabs_1" class="tab" aria-label="Tab 2" checked />
      <input type="radio" name="my_tabs_1" class="tab" aria-label="Tab 3" />
    </div>


    <div class="lg:block hidden space-x-2">

      <button class="btn btn-primary">
        <LineMdPlus />
        新增
      </button>

      <button class="btn">
        <LineMdCogFilled />管理分组
      </button>
    </div>
  </div>

  <!-- 内容 -->
  <div class="flex flex-col xl:flex-row gap-4 mt-2">
    <!-- 左侧 -->
    <div class="w-full xl:w-2/3 space-y-4">

      <div class="card card-side bg-base-100 shadow-sm hover:shadow-md transition-all my-4 flex-col lg:flex-row">
        <!-- 左侧封面 -->
        <div
          class="relative lg:w-32 border-2 border-accent-content w-full lg:rounded-l-xl overflow-hidden rounded-t-box">
          <img class="object-cover w-full h-full" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="封面" />
          <div class="absolute bottom-0 h-10 w-full bg-blue-500 text-white text-center text-md font-light">
            未发布
          </div>
        </div>
        <!-- 文章item -->
        <div class="card-body py-4 px-4 card-border">
          <!-- 标题 -->
          <h2 class="card-title text-base sm:text-lg font-semibold">我所知道的你的事情</h2>

          <!-- 摘要 -->
          <p class="text-sm text-gray-500 leading-snug line-clamp-2">
            很高心见到了你，你是那么的美丽动人！很高心见到了你，你是那么的美丽动人是，很高心到你。很高心见到了你，你是那么的美丽动人！
          </p>

          <!-- 分类 + 时间 + 统计 + 操作 -->
          <div class="flex flex-wrap items-center justify-between text-xs text-gray-400 mt-2 gap-2">
            <!-- 分类和时间 -->
            <div class="flex items-center gap-2">
              <span>所见/旅游 西北</span>
              <span class="text-gray-300">|</span>
              <span>2023-01-15</span>
            </div>

            <!-- 阅读、点赞、评论 -->
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <ViewIcon /> 2343
              </span>
              <span class="flex items-center gap-1">
                <LikeIcon /> 243
              </span>
              <span class="flex items-center gap-1">
                <LineMdChat /> 43
              </span>
            </div>

            <!-- 操作按钮 -->
            <div class="ml-auto flex gap-2 text-gray-400">
              <div class="tooltip" data-tip="发布文章">
                <button class="btn btn-md btn-ghost hover:text-warning">
                  <LineMdTelegram />
                </button>
              </div>
              <button class="btn btn-md btn-ghost hover:text-info">
                <EditIcon />
              </button>
              <button class="btn btn-md btn-ghost hover:text-error">
                <LineMdTrash />
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
          <h1 class="text-md font-bold">标签</h1>
          <div class=" grid grid-cols-3 gap-3">
            <button class="btn btn-sm">vue</button>
            <button class="btn btn-sm">vue</button>
            <button class="btn btn-sm">vue</button>
            <button class="btn btn-sm">vue</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
