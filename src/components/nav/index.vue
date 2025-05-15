<script setup lang="ts">
import LineMdMenu from '~icons/line-md/menu'
import LineMdFileDocument from '~icons/line-md/file-document'
import LineMdAccountSmall from '~icons/line-md/account-small'
import Theme from '@/components/btn/theme/index.vue'
import { onMounted, onUnmounted, ref, useAttrs } from 'vue'
import { pageData } from '@/events/event'
import type { ArticleTypeVo } from '@/apis'
import { useUserInfoStore } from '@/store'
import sidebarMenu from '../menu/sidebarMenu.vue'
import Menu from '@/components/menu/index.vue'
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
  console.log('Drawer toggle triggered')
  drawer.value = !drawer.value
}

const menuList = [
  {
    name: '文章',
    icon: LineMdFileDocument,
    children: [
      { name: '分类', path: 'article/categorys' },
      { name: '标签', path: 'article/tags' }
    ]
  }, {
    name: '我的',
    icon: LineMdAccountSmall,
    children: [
      { name: '相册', path: 'account/photos' },
      { name: '音乐', path: 'account/links' }
    ]
  },
  {
    name: '本站',
    icon: LineMdAccountSmall,
    children: [
      { name: '留言', path: 'local/guestbook' },
      { name: '友链', path: 'local/links' }
    ]
  },

]

</script>

<template>
  <div v-bind="attrs" class="navbar fixed z-10 bg-blur bg-base-300/70 max-h-[4.1rem] shadow-sm">
    <div class="navbar-start">
      <div>
        <!-- 直接在 div 上绑定 click 事件 -->
        <div tabindex="0" role="button" class="lg:hidden btn btn-ghost btn-circle" @click="openDrawer">
          <LineMdMenu />
        </div>
      </div>
    </div>
    <div class="navbar-center text-xl flex justify-center">
      <!-- 隐藏滚动内容 -->
      <div class="overflow-hidden flex flex-col items-center  justify-center">
        <div :class="{ 'dw': isScrolled, 'up': !isScrolled }" class="h-[4rem]">
          <div class="h-full flex items-center">
            <span class="lg:hidden text-center w-full">{{ userInfoStore.userInfo.user.name }}</span>
          </div>
          <div class=" h-full font-bold flex justify-center items-center">{{ article?.title ||
            userInfoStore.userInfo.user.name }}
          </div>
        </div>
      </div>
      <!-- 菜单 -->
      <div class="h-full absolute space-x-2 hidden lg:flex items-center justify-center"
        :class="{ 'dw': isScrolled, 'up': !isScrolled }">
        <div v-for="(item) in menuList">
          <el-dropdown placement="bottom">
            <a class="cursor-pointer font-bold px-4 py-2"> {{ item.name }} </a>
            <template v-if="item.children" #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(sub, index) in item.children">{{ sub.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <Theme class=" hidden lg:flex"></Theme>
    </div>
  </div>
  <sidebarMenu v-model="drawer">
    <template #body>
      <Menu :list="menuList"></Menu>
    </template>
  </sidebarMenu>

</template>

<style scoped lang="scss">
a {
  font-size: 1.2rem;
}

.up {
  transition: all .3s ease-in-out;
  transform: translateY(0);
}

.dw {
  transition: all .3s ease-in-out;
  transform: translateY(-4rem);
}
</style>
