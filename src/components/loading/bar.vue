<script setup lang="ts">
import { onMounted } from 'vue';
import { useLoadingBar } from '@/components/hooks/loadingBar'

const { startSpeed } = useLoadingBar()
onMounted(() => {
  startSpeed()
})
</script>

<template>
  <section class="bar w-full fixed top-0 left-0 z-50">
    <progress id="bar_id_key" class="progress h-1 w-full absolute top-0 left-0" value="100" max="100" />
  </section>
</template>
