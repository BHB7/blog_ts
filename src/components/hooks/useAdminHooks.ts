import { getAdminInfoApi, type UserVo } from "@/apis"
import { useUserInfoStore } from "@/store"
import Msg from "@/utils/showMsg"
import { ref } from "vue"

const userStor = useUserInfoStore()
const useAdminHooks = () => {
  const getAdminInfo = async () => {
    try {
      const userInfo = await getAdminInfoApi()
      userStor.setUserInfo(userInfo)
      return userInfo
    } catch (error) {
      Msg.error('获取用户信息失败')
      throw new Error("获取用户信息失败")
    }
  }


  return {
    getAdminInfo
  }
}


export default useAdminHooks

