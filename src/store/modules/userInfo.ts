import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { type Data, type UserVo } from '@/apis/index'


export const useUserInfoStore = defineStore('userInfo', () => {
  let userInfo = reactive<Data>({ user: '', token: '' })


  const setUserInfo = (val: UserVo) => {
    userInfo.user = val
  }

  const getUserInfo = (): UserVo => {
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
