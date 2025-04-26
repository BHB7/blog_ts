import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { type Data } from '@/apis/index'


export const useUserInfoStore = defineStore('userInfo', () => {
  let userInfo = reactive({})


  const setUserInfo = (val: Data) => {
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
