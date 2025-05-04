<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoadingBar from '@/components/loading/bar.vue'
</script>

<template>
  <LoadingBar></LoadingBar>
  <!-- 内容 -->
  <RouterView :key="$route.fullPath" />



</template>
