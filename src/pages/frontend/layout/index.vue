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
const scrollbarRef = ref<HTMLElement | null>(null)
watch(route, (newRoute) => {
  console.log(newRoute.path);
  if (newRoute.path !== '/home') {
    pageHeaderIsShow.value = true
  } else {
    pageHeaderIsShow.value = false
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
    <!-- 视差滚动效果 -->
    <HomeHeader v-if="!pageHeaderIsShow"></HomeHeader>
    <pageHeader v-if="pageHeaderIsShow"></pageHeader>
    <section class="lg:flex w-full darkbg bg-transparent p-4 lg:px-40 grid grid-cols-1 lg:grid-cols-[80%_20%] gap-4">
      <!-- 左侧内容 -->
      <div class="cont flex-1">
        <div class="flex flex-col items-center space-y-4">
          <slot name="cont">
            <RouterView class=" lg:max-w-4xl "></RouterView>
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
    <Footer></Footer>
  </el-scrollbar>
</template>


<style scoped lang="scss">
section {
  background-image: url('../../../assets/02.webp');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
