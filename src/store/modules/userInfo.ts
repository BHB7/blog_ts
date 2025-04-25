import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { type LoginTypeVo } from '@/apis/index'


export const useUserInfoStore = defineStore('userInfo', () => {
  let userInfo = reactive({})


  const setUserInfo = (val: LoginTypeVo) => {
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
