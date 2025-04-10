<script setup lang="ts">
import MyBtn from '@/components/btn/index.vue'
import Theme from '@/components/btn/theme/index.vue'
import { onMounted, onUnmounted, ref } from 'vue';
// 定义响应式变量存储滚动状态
const isScrolled = ref(false);

// 计算滚动百分比的函数
const calculateScrollPercentage = (): number => {
  const pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
  const screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
  const scrollHeight = pageHeight - screenHeight;
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

  return (scrollTop / scrollHeight) * 100;
};

const timer = ref(0)
// 更新滚动状态的函数
const updateScrollState = () => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
  timer.value = setTimeout(() => {
    isScrolled.value = calculateScrollPercentage() > 50;
  }, 50)
};

// 监听滚动事件
onMounted(() => {
  updateScrollState(); // 初始化滚动状态
  window.addEventListener('scroll', updateScrollState);
});

// 移除滚动事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState);
});
</script>
<template>
  <div class="fixed z-50 lg:px-40 transition-all duration-300 ease-in-out lg:p-0 p-4 w-full"
    :class="{ ' glass': isScrolled }">
    <section class="nav  overflow-hidden py-2 flex container justify-between items-center">
      <!-- 左侧 -->
      <div class="lname leading-10">
        <MyBtn title="回到首页" @click="$router.replace('/')">7z'is HOME</MyBtn>
      </div>

      <!-- 中间部分 -->
      <div class="midi flex h-full flex-wrap ">
        <div class="title lg:flex w-full h-full justify-center items-center  hidden text-pretty">标题
        </div>
      </div>
      <!-- 右侧 -->
      <div class="r flex">
        <Theme />
      </div>
    </section>
  </div>
  <div class="py-10"></div>
</template>
