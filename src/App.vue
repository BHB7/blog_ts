<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoadingBar from '@/components/loading/bar.vue'

</script>

<template>
  <LoadingBar></LoadingBar>


  <!-- 内容 -->
  <RouterView v-slot="{ Component, route }" :key="$route.fullPath">
    <transition name="animate__animated animate__fadeInUp">
      <component :is="Component" :key="route.path"></component>
    </transition>
  </RouterView>


</template>
