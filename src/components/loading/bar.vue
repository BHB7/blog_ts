<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useLoadingBar } from '@/components/hooks/loadingBar'
interface LoadingBarType {
  h?: string
}
const props = withDefaults(defineProps<LoadingBarType>(), {
  h: '2px',
  from_bg: 'rgba(0,0,0, .2)',
  to_bg: 'rgba(0,0,0, .9)'
})
const bar = ref<HTMLElement>()
const { startSpeed } = useLoadingBar()
onMounted(() => {
  startSpeed()
})
</script>

<template>
  <section class="bar w-full fixed top-0 left-0 z-50">
    <div id="bar_id_key" class="bar bg-amber-900 w-0" ref="bar"
      :class="{ 'bg-linear-to-t from-sky-500 to-indigo-500': true }" :style="{ height: props.h }"></div>
  </section>
</template>
