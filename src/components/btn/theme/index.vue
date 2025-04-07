<script setup lang="ts">
import Rbtn from '../rbtn.vue';
import LineMdSunnyFilledLoop from '~icons/line-md/sunny-filled-loop';
import DarkIcon from '~icons/line-md/sunny-filled-loop-to-moon-filled-alt-loop-transition';
import { useThemeStore } from '@/store/index'
import { computed } from 'vue';
const theme = useThemeStore()

console.log(theme.getTheme());

const changeTheme = () => {
  if (theme.getTheme() === 'dark') {
    theme.setTheme('light')
  } else {
    theme.setTheme('dark')
  }
}
// 计算属性：判断当前主题是否为 dark
const isDark = computed(() => {
  return theme.getTheme() === 'dark'
})

</script>
<template>
  <Rbtn @click="changeTheme">
    <DarkIcon v-if="isDark" class=" w-10"></DarkIcon>
    <LineMdSunnyFilledLoop v-else class=" w-10"></LineMdSunnyFilledLoop>
  </Rbtn>
</template>
