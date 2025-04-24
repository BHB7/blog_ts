import { defineStore } from 'pinia'
import { reactive } from 'vue'


export const useUserInfoStore = defineStore('userInfo', () => {
  let userInfo = reactive({})


  const setUserInfo = (val: string) => {
    userInfo = val
  }

  const getUserInfo = () => {
    return userInfo
  }


  return {
    userInfo,
    setUserInfo,
    getUserInfo
  } as const
}, {
  persist: true
})
