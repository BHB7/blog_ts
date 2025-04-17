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
    setToken,
    getToken
  }
}, {
  persist: {
    key: 'use_token',
    storage: localStorage
  }
})
