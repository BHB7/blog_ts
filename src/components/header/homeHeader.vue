<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TypeIt from 'typeit'
import useAdminHooks from '../hooks/useAdminHooks'
import type { UserVo } from '@/apis'
const { getAdminInfo } = useAdminHooks()
const userInfo = ref<UserVo | null>(null)
const descRef = ref<HTMLElement | null>(null)
onMounted(async () => {
  userInfo.value = await getAdminInfo()
  if (descRef.value) {
    new (TypeIt)(descRef.value, {
      strings: [userInfo.value?.motto || ''],
      cursorChar: "<span class='text-white'>|<span>",//用于光标的字符。HTML也可以
      speed: 200,
      lifeLike: true,// 使打字速度不规则
      cursor: true,//在字符串末尾显示闪烁的光标
      breakLines: false,// 将多个字符串打印在彼此之上，还是删除这些字符串并相互替换
      loop: true,//是否循环
    }).go()
  }
})

</script>
<template>
  <section class=" relative h-lvh w-full ">
    <!-- <img class=" absolute top-0 darkbg left-0 w-full h-full object-cover" src="../../assets/02.webp" alt=""> -->
    <main class=" absolute w-full px-8 left-1/2 top-1/2 translate-[-50%] text-center space-y-4">
      <h1 class="title font-bold text-4xl  text-white">{{ userInfo?.name }}</h1>
      <p ref="descRef" class="text-md h-40 line-clamp-2 font-mono text-white">desc</p>
    </main>
  </section>
</template>

<style scoped lang="scss">
section {
  // &::after {
  //   width: 100%;
  //   height: 4rem;
  //   filter: blur(1rem);
  //   background: linear-gradient(180deg, rgba(0, 0, 0, .1), var(--color-base-300));
  //   content: '';
  //   left: 50%;
  //   bottom: 10rem;
  //   transform: translateX(-50%);
  //   transform: scale(4);
  //   position: absolute;
  // }
}

.title {
  position: relative;

  &::after {
    width: inherit;
    content: '0000';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(10px);
    position: absolute;
  }
}
</style>
