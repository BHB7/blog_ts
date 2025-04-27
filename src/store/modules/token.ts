import type { Data } from '@/apis'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useTokenStore = defineStore('token', () => {
  const token = ref('')


  const setToken = (val: string) => {
    token.value = val
  }

  const getToken = () => {
    return token.value
  }


  return {
    token,
    setToken,
    getToken
  } as const
}, {
  persist: true
})
