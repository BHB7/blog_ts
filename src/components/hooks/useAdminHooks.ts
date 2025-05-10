import { getAdminInfoApi, type UserVo } from "@/apis"
import { useUserInfoStore } from "@/store"
import Msg from "@/utils/showMsg"
import { ref } from "vue"

const useAdminHooks = () => {
  const getAdminInfo = async () => {
    try {
      return await getAdminInfoApi()
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

