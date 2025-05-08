import { ref } from "vue"
import { getUserInfoApi, type ResVo, type UserVo } from '@/apis'
import { useUserInfoStore } from "@/store"
import Msg from "@/utils/showMsg"
const userStor = useUserInfoStore()

const useLayoutHook = () => {
  const userData = ref<UserVo>()
  const getUserInfo = async () => {
    try {
      userData.value = await getUserInfoApi()
      userStor.setUserInfo(userData.value)
    } catch (error) {
      Msg.error('获取用户信息失败')
      throw new Error("获取用户信息失败")
    }
  }
  return {
    getUserInfo,
    userData
  }
}



export default useLayoutHook
