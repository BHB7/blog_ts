<script setup lang="ts">
import User from '@/components/user/index.vue'
import pageHeader from '@/components/header/pageHeader.vue'
import Footer from '@/components/footer/index.vue'
import Nav from '@/components/nav/index.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { music } from '@/events/event'
import Music from '@/components/music/index.vue'
import MusicBox from '@/components/music/box/index.vue'

const route = useRoute()
const pageHeaderIsShow = ref<Boolean>(false)

watch(route, (newRoute) => {
  console.log(newRoute.path);
  if (newRoute.path !== '/home') {
    pageHeaderIsShow.value = true
  }
}, {
  immediate: true,
  deep: true
})

</script>
<template>
  <Nav></Nav>

  <pageHeader v-if="pageHeaderIsShow"></pageHeader>
  <div class="lg:flex w-full p-4 lg:px-40 grid grid-cols-1 lg:grid-cols-[80%_20%] gap-4">
    <!-- 左侧内容 -->
    <div class="cont flex-1">
      <div class="flex flex-col items-center space-y-4">
        <slot name="cont">
          <RouterView class=" lg:max-w-4xl "></RouterView>

        </slot>
      </div>
    </div>
    <!-- 右侧菜单 -->
    <div class="r hidden lg:grid w-1/3 grid grid-cols-1 gap-4 h-full">
      <slot name="menus">
        <!-- <Music class="sticky top-20"></Music> -->
        <div class="sticky top-20">asd</div>
        <User></User>

      </slot>
    </div>
  </div>

  <Footer></Footer>
</template>
