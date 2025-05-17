<script setup lang="ts">
import User from '@/components/user/index.vue'
import pageHeader from '@/components/header/pageHeader.vue'
import Footer from '@/components/footer/index.vue'
import Nav from '@/components/nav/index.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import directory from '@/components/menu/directory.vue'
import HomeHeader from '@/components/header/homeHeader.vue'
import { pageData } from '@/events/event'
const route = useRoute()
const pageHeaderIsShow = ref<Boolean>(false)
const homeHeaderIsShow = ref<Boolean>(false)
const scrollbarRef = ref<HTMLElement | null>(null)
watch(route, (newRoute) => {
  console.log(newRoute.path);
  if (newRoute.path === '/article') {
    homeHeaderIsShow.value = false
    pageHeaderIsShow.value = true
  } else if (newRoute.path === '/home') {
    pageHeaderIsShow.value = false
    homeHeaderIsShow.value = true
  }
}, {
  immediate: true,
  deep: true
})
const handleScroll = (event: any) => {
  if (scrollbarRef.value) {
    pageData.emit('scrollbar', { ...event, scrollHeight: document.body.scrollHeight })
  }
}

</script>
<template>

  <Nav></Nav>

  <el-scrollbar ref="scrollbarRef" @scroll="handleScroll" height="100vh">
    <HomeHeader v-if="homeHeaderIsShow"></HomeHeader>
    <pageHeader class="mt-50" v-if="pageHeaderIsShow"></pageHeader>
    <div v-else class="mt-16"></div>
    <section class="lg:flex  w-full p-4 bg-base-100/50 lg:px-40 grid grid-cols-1 lg:grid-cols-[80%_20%] gap-4">
      <!-- 左侧内容 -->
      <div class="cont flex-1">
        <div class="flex flex-col items-center space-y-4">
          <slot name="cont">
            <RouterView class="lg:max-w-4xl"></RouterView>
          </slot>
        </div>
      </div>
      <!-- 右侧菜单 -->
      <div class="r lg:grid lg:w-1/3 grid grid-cols-1 gap-4 h-full">
        <slot name="menus">
          <!-- <Music class="sticky top-20"></Music> -->
          <User></User>
          <directory></directory>
        </slot>
      </div>
    </section>
    <!-- 视差滚动效果 -->
    <div class="main-bg"></div>
    <Footer></Footer>
  </el-scrollbar>
</template>


<style scoped lang="scss">
.main-bg {
  top: 0;
  left: 0;
  z-index: -10;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-image: url('../../../assets/02.webp');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
