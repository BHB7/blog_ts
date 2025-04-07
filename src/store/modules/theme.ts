import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeType = 'dark' | 'light'

export const useThemeStore = defineStore(
  'theme',
  () => {
    // 响应式主题状态
    const theme = ref<ThemeType>('dark')

    // 获取当前主题
    const getTheme = (): ThemeType => {
      return theme.value
    }

    // 设置主题
    const setTheme = (newTheme: ThemeType) => {
      theme.value = newTheme
    }

    // 监听主题变化并更新 DOM 类名
    watch(
      theme,
      (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme)
      },
      { immediate: true } // 立即执行一次，确保初始状态正确
    )

    return {
      theme,
      getTheme,
      setTheme,
    } as const
  },
  {
    persist: {
      key: 'theme', // 自定义存储键名
      storage: localStorage, // 使用 localStorage 存储
    },
  }
)
