<script setup lang="ts">
import MyBtn from '@/components/btn/index.vue'
import Theme from '@/components/btn/theme/index.vue'

const scrollWork = (): string | number => {
  const pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight
  const screenHeight = document.documentElement.clientHeight || document.body.clientHeight
  const scrollHeight = pageHeight - screenHeight
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop

  return (scrollTop / scrollHeight) * 100
}

console.log(scrollWork());

</script>
<template>
  <div class="nbox  top-0.5 left-0 relative lg:px-40 lg:p-0 p-4 w-full ">
    <section class="nav  overflow-hidden py-2 flex container justify-between items-center">
      <!-- 左侧 -->
      <div class="lname leading-10">
        <MyBtn title="回到首页" @click="$router.replace('/')">7z'is HOME</MyBtn>
      </div>

      <!-- 中间部分 -->
      <div class="midi flex h-full flex-wrap ">
        <div class="title lg:flex w-full h-full justify-center items-center  hidden text-[var(--color-primary)]">标题
        </div>
      </div>
      <!-- 右侧 -->
      <div class="r flex">
        <Theme />
      </div>
    </section>
  </div>
</template>
