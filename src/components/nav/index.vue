<script setup lang="ts">
import LineMdMenu from '~icons/line-md/menu'
import Theme from '@/components/btn/theme/index.vue'
import { onMounted, onUnmounted, ref } from 'vue';
import { pageData } from '@/events/event'

// 定义响应式变量存储滚动状态
const isScrolled = ref(false)
const drawer = ref(false)

// 监听el scrollbar 事件
pageData.on('scrollbar', (event: any) => {
  updateScrollState(event.scrollTop, event.scrollHeight)
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
</script>

<template>
  <div class="navbar bg-base-100 overflow-hidden  max-h-[4.1rem] shadow-sm">
    <div class="navbar-start">
      <div>
        <!-- 直接在 div 上绑定 click 事件 -->
        <div tabindex="0" role="button" class="lg:hidden btn btn-ghost btn-circle" @click="openDrawer">
          <LineMdMenu />
        </div>
      </div>
    </div>
    <div class="navbar-center flex flex-col items-center ">
      <div :class="{ 'dw': isScrolled, 'up': !isScrolled }" class="h-[4rem]">
        <div class=" h-full flex items-center">
          <span class="lg:hidden text-center w-full">7z</span>
          <ul class="menu menu-horizontal space-x-4 px-1 lg:flex hidden">
            <li><a>文章</a></li>
            <li><a>我的</a></li>
            <li><a>本站</a></li>
          </ul>
        </div>
        <div class=" h-full flex justify-center items-center">文章信息 | 个性签名...</div>
      </div>
    </div>
    <div class="navbar-end">
      <Theme></Theme>
    </div>
  </div>

  <el-drawer direction="ltr" v-model="drawer" title="I am the title" :with-header="false">
    <span>Hi there!</span>
  </el-drawer>
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
