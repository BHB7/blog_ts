import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { type Data } from '@/apis/index'


export const useUserInfoStore = defineStore('userInfo', () => {
  let userInfo = reactive<Data>({ user: '', token: '' })


  const setUserInfo = (val: Data) => {
    userInfo.user = val
  }

  const getUserInfo = (): { id: string } => {
    return userInfo?.user
  }


  return {
    userInfo,
    setUserInfo,
    getUserInfo
  } as const
}, {
  persist: true
})
