<script setup lang="ts">
import LineMdMenu from '~icons/line-md/menu'
import Theme from '@/components/btn/theme/index.vue'
import { onMounted, onUnmounted, ref, useAttrs } from 'vue'
import { pageData } from '@/events/event'
import type { ArticleTypeVo } from '@/apis'
import { useUserInfoStore } from '@/store'
import sidebarMenu from '../menu/sidebarMenu.vue'
// 定义响应式变量存储滚动状态
const isScrolled = ref(false)
const drawer = ref(false)
const attrs = useAttrs()
// 监听el scrollbar 事件
pageData.on('scrollbar', (event: any) => {
  updateScrollState(event.scrollTop, event.scrollHeight)
})

const userInfoStore = useUserInfoStore()
const article = ref<ArticleTypeVo | null>(null)
// 监听文章详情数据事件
pageData.on('articleData', (data: ArticleTypeVo) => {
  if (data) {
    article.value = data
  }
})

// 计算滚动百分比的函数
const calculateScrollPercentage = (scrollTop: number, scrollHeight: number): number => {
  return scrollTop / (scrollHeight - window.innerHeight) * 100;
}

// 更新滚动状态的函数
const updateScrollState = (scrollTop: number, scrollHeight: number) => {
  isScrolled.value = calculateScrollPercentage(scrollTop, scrollHeight) > 10;
}

const openDrawer = () => {
  console.log('Drawer toggle triggered');
  drawer.value = !drawer.value
}

const menuList = [
  { icon: LineMdMenu, path: '/', name: '文章' },
  { icon: LineMdMenu, path: '/admin/articles', name: '我的' },
  { icon: LineMdMenu, path: '/login', name: '关于' },
]
</script>

<template>
  <div v-bind="attrs" class="navbar fixed z-10 bg-blur bg-base-300/70  overflow-hidden  max-h-[4.1rem] shadow-sm">
    <div class="navbar-start">
      <div>
        <!-- 直接在 div 上绑定 click 事件 -->
        <div tabindex="0" role="button" class="lg:hidden btn btn-ghost btn-circle" @click="openDrawer">
          <LineMdMenu />
        </div>
      </div>
    </div>
    <div class="navbar-center text-xl flex flex-col items-center ">
      <div :class="{ 'dw': isScrolled, 'up': !isScrolled }" class="h-[4rem]">
        <div class=" h-full flex items-center">
          <span class="lg:hidden text-center w-full">{{ userInfoStore.userInfo.user.name }}</span>
          <ul class="menu menu-horizontal space-x-4 px-1 lg:flex hidden">
            <li><a>文章</a></li>
            <li><a>我的</a></li>
            <li><a>本站</a></li>
          </ul>
        </div>
        <div class=" h-full font-bold flex justify-center items-center">{{ article?.title ||
          userInfoStore.userInfo.user.name }}
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <Theme></Theme>
    </div>
  </div>
  <sidebarMenu :list="menuList" v-model="drawer"></sidebarMenu>

</template>

<style scoped lang="scss">
.up {
  transition: all .3s ease-in-out;
  transform: translateY(0);
}

.dw {
  transition: all .3s ease-in-out;
  transform: translateY(-4rem);
}
</style>
