<script setup lang="ts">
import useLayoutHooks from '@/pages/admin/layout/hooks/useLayoutHooks'
import { useUserInfoStore } from '@/store'
import useAdminHooks from '../hooks/useAdminHooks'
import { onMounted } from 'vue'
const { getAdminInfo } = useAdminHooks()

const userInfoStore = useUserInfoStore()

onMounted(() => {
  getAdminInfo()
})
</script>
<template>
  <div
    class="group w-full card p-4 before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-80 h-72 relative bg-base-300 flex flex-col items-center justify-center gap-2 text-center rounded-box overflow-hidden">
    <div
      class="w-28 h-28  bg-primary mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500">
      <el-avatar :size="104" :src="userInfoStore.getUserInfo().imgurl" />
    </div>
    <div class="z-10  group-hover:-translate-y-10 transition-all duration-500">
      <span class="text-2xl font-semibold">{{ userInfoStore.getUserInfo().name }}</span>
      <p>{{ userInfoStore.getUserInfo().motto }}</p>
    </div>
    <button class="btn btn-primary">留言</button>
  </div>
</template>
